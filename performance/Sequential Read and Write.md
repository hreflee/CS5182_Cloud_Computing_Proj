# Text ChubaoFS's performance with `fio`

## Sequential Read

Run following command with different `numjobs`

```shell
fio -directory=/cfs/mountpoint \
    -ioengine=psync \
    -rw=read \
    -bs=128k \
    -direct=1 \
    -group_reporting=1 \
    -fallocate=none \
    -time_based=1 \
    -runtime=120 \
    -name=test_file_c1 \
    -numjobs={} \
    -nrfiles=1 \
    -size=1G
```

```shell
yum remove cfs-client -y
yum remove cfs-datanode -y
yum remove cfs-master -y
yum remove cfs-metanode -y
yum remove cfs-monitor -y

fio -directory=/cfs/mountpoint -ioengine=psync -rw=read -bs=128k -direct=1 -group_reporting=1 -fallocate=none -time_based=1 -runtime=120 -name=test_file_c1 -numjobs=2 -nrfiles=1 -size=10G
```