# Text ChubaoFS's performance with `fio`

## Sequential Write

Run following shell file on `instance-1`

```shell
#!/bin/bash

fio -directory=/cfs/mountpoint -ioengine=psync -rw=write -bs=128k -direct=1 -group_reporting=1 -fallocate=none -name=test_file_c1 -numjobs=2 -nrfiles=1 -size=1G > s_w_2.log

fio -directory=/cfs/mountpoint -ioengine=psync -rw=write -bs=128k -direct=1 -group_reporting=1 -fallocate=none -name=test_file_c1 -numjobs=4 -nrfiles=1 -size=1G > s_w_4.log

fio -directory=/cfs/mountpoint -ioengine=psync -rw=write -bs=128k -direct=1 -group_reporting=1 -fallocate=none -name=test_file_c1 -numjobs=8 -nrfiles=1 -size=1G > s_w_8.log

fio -directory=/cfs/mountpoint -ioengine=psync -rw=write -bs=128k -direct=1 -group_reporting=1 -fallocate=none -name=test_file_c1 -numjobs=12 -nrfiles=1 -size=1G > s_w_12.log

fio -directory=/cfs/mountpoint -ioengine=psync -rw=write -bs=128k -direct=1 -group_reporting=1 -fallocate=none -name=test_file_c1 -numjobs=16 -nrfiles=1 -size=1G > s_w_16.log

fio -directory=/cfs/mountpoint -ioengine=psync -rw=write -bs=128k -direct=1 -group_reporting=1 -fallocate=none -name=test_file_c1 -numjobs=32 -nrfiles=1 -size=1G > s_w_32.log
```

## Sequential Read

Run following shell file on `instance-1` and `instance-4`

```shell
#!/bin/bash

fio -directory=/cfs/mountpoint -ioengine=psync -rw=read -bs=128k -direct=1 -group_reporting=1 -fallocate=none -time_based=1 -runtime=120 -name=test_file_c1 -numjobs=2 -nrfiles=1 -size=1G > s_r_2.log

fio -directory=/cfs/mountpoint -ioengine=psync -rw=read -bs=128k -direct=1 -group_reporting=1 -fallocate=none -time_based=1 -runtime=120 -name=test_file_c1 -numjobs=4 -nrfiles=1 -size=1G > s_r_4.log

fio -directory=/cfs/mountpoint -ioengine=psync -rw=read -bs=128k -direct=1 -group_reporting=1 -fallocate=none -time_based=1 -runtime=120 -name=test_file_c1 -numjobs=8 -nrfiles=1 -size=1G > s_r_8.log

fio -directory=/cfs/mountpoint -ioengine=psync -rw=read -bs=128k -direct=1 -group_reporting=1 -fallocate=none -time_based=1 -runtime=120 -name=test_file_c1 -numjobs=12 -nrfiles=1 -size=1G > s_r_12.log

fio -directory=/cfs/mountpoint -ioengine=psync -rw=read -bs=128k -direct=1 -group_reporting=1 -fallocate=none -time_based=1 -runtime=120 -name=test_file_c1 -numjobs=16 -nrfiles=1 -size=1G > s_r_16.log

fio -directory=/cfs/mountpoint -ioengine=psync -rw=read -bs=128k -direct=1 -group_reporting=1 -fallocate=none -time_based=1 -runtime=120 -name=test_file_c1 -numjobs=32 -nrfiles=1 -size=1G > s_r_32.log
```
