
## Random read with 4 processes and 1G file size

``` Shell
nohup fio -directory=/cfs/mountpoint \
    -ioengine=psync \
    -rw=randread \
    -bs=4k \
    -direct=1\
    -group_reporting=1 \
    -fallocate=none \
    -time_based=1 \
    -runtime=120 \
    -name=test_file_c1 \
    -numjobs=4 \
    -nrfiles=1 \
    -size=1G &
```

## Random write with 4 processes and 1G file size

``` Shell
nohup fio -directory=/cfs/mountpoint \
    -ioengine=psync \
    -rw=randwrite \
    -bs=4k \
    -direct=1 \
    -group_reporting=1 \
    -fallocate=none \
    -time_based=1 \
    -runtime=120 \
    -name=test_file_c1 \
    -numjobs=4 \
    -nrfiles=1 \
    -size=1G &
```

