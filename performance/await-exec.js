const ssh2 = require('ssh2-promise');

const username = 'root';
const password = 'xxx';
const IP_LIST = [
    '10.148.0.12',
    '10.148.0.13',
    '10.148.0.14',
    '10.148.0.15',
];

/**
 * This is an example of setting up commands to run.
 * 
 * *In our evaluation, we use some automatically command generation method. Which can be found in the final part of this file.*
 * 
 */
// const COMMANDS = [
//     (index, ip) => `echo 'I am ${ip}' && ifconfig`,
//     (index, ip) => `yum install fio -y`,
// ];

async function batchExec(sockets, ipList, commandGenerator) {
    try {
        return (await Promise.all(
            sockets.map(
                (socket, index) => socket.exec(commandGenerator(index, ipList[index]))
            )
        ));
    } catch (e) {
        console.error(`run command "${commandGenerator('{index}', '{ip}')}" failed.`);
        console.error(String(e));
        throw e;
    }
}

async function checkSync(sockets, ipList) {
    for (let i = 0; i < 10; i++) {
        try {
            const result = (await batchExec(sockets, ipList, () => `echo $(($(date +%s%N)/1000000))`)).map(s => parseFloat(s));
            if ((Math.max(...result) - Math.min(...result)) > 1000) {
                console.log(`check sync fail at attempt ${i}`);
            } else {
                console.log(`check sync success at attempt ${i}`);
                return true;
            }
        } catch (e) {}
    }
    console.error(`check sync fail`);
    return false;
}

async function runCommandsOnCluster(sockets, ipList, commands) {
    for (let index = 0; index < commands.length; index++) {
        try {
            const sync = await checkSync(sockets, ipList);
            const generator = commands[index];
            console.log('=======================================');
            console.log(`run: ${generator('{index}', '{ip}')}`);
            !sync && console.warn('NOT SYNC');
            console.log('=======================================');
            (await batchExec(sockets, ipList, generator)).forEach((result, ipIndex) => {
                console.log('---------------------------------------');
                console.log(`output at ${ipList[ipIndex]}`);
                console.log('---------------------------------------');
                console.log(String(result));
                console.log('\n---------------------------------------');
            });
        } catch (e) {
            console.error(String(e));
        }
    }
}

(async () => {
    const connections = IP_LIST.map(ip => new ssh2({
        host: ip,
        username,
        password,
        keepaliveInterval: 10000
    }));
    const sockets = await Promise.all(connections.map((item) => item.connect()));
    for (let i = 0; i < IP_LIST.length; i++) {
        const COMMANDS = [
            (index, ip) => `echo 'I am ${ip}' && ifconfig`
        ];
        COMMANDS.push(() => `mkdir -p ~/test-cfs/sequence_write_${i + 1}clients`);
        [2, 4, 8, 12, 16, 32].forEach(numjobs => {
            (() => {
                COMMANDS.push(
                    (index, ip) => `fio -directory=/cfs/mountpoint -ioengine=psync -rw=write -bs=128k -direct=1 -group_reporting=1 -fallocate=none -name=test_file_c${index} -numjobs=${numjobs} -nrfiles=1 -size=500M | tee ~/test-cfs/sequence_write_${i + 1}clients/s_w_${numjobs}.log`
                )
            })()
        });
        await runCommandsOnCluster(sockets.slice(0, i + 1), IP_LIST.slice(0, i + 1), COMMANDS);
    }
})();