# Test ChubaoFS's sequential read and write performance with `fio`

In this part, a tool we made can be used to run test and retrieve logs on running `fio` tests on cluster. After setup the configurations in this tool, it can automatically connect to each machines and run `fio` testing on various numbers of machines synchrony.

This tool is attached with file `await-exec.js`. After placing it on a machine with `nodejs >= 12.0` and npm package `ssh2-promise`, change the `IP_LIST` to the IP of client nodes and run it with command `node await-exec.js`. 