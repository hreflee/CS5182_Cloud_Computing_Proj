# Set up steps

Since AWS education account is not allowed to create CentOS machines, so we do our virtual machines deployment on Google Cloud.

We use 4 machines of machine type `e2-standard-4` (4 vCPUs, 16 GB memory) with 50GB SSD boot disk and 50GB SSD additional disk in zone `asia-southeast1-b`.

The system image of first machines is `CentOS 7`. And following machines use the machine image of the first machine after step 3.

The following table shows the roles of each machine.

|machine id|roles|
|-|-|
|instance-1|master, metanode, datanode, client|
|instance-2|master, metanode, datanode, client|
|instance-3|master, metanode, datanode, client|
|instance-4|datanode, monitor, client|

Here are the steps we do our machines preparation.

### 1. Enable ssh login with password and allows root login

```shell
sudo vim /etc/ssh/sshd_config
```

And then find the config item `PasswordAuthentication`, change it's value to `yes`, and find the config item `PermitRootLogin`, change it's value to `yes`

```shell
sudo service sshd restart
```

### 2. Change password of root and relogin as root on a virtual machine

```shell
sudo passwd root
```

And then relogin as root of this machine.

### 3. Add new disk, build file system on new disk and mount it

Create a new SSD disk and add it to the machine. Run following commands. (Assume the new disk is attached at `/dev/sdb`)

```shell
mkfs.xfs -f /dev/sdb
mkdir /data0
mount /dev/sdb /data0
```

### 4. Create machine image of first machine, start another 3 machines based on this machine image

### 5. Install ChubaoFS installer

Login the first machine as root.

There are some problem to directly use the Yum commands in the offcial website of ChubaoFS, so some modification is made.

```shell
sudo yum install wget -y
wget http://storage.jd.com/chubaofsrpm/latest/cfs-install-latest-el7.x86_64.rpm
sudo yum install cfs-install-latest-el7.x86_64.rpm -y
```

### 6. Edit configuration and start all nodes

Change nodes ip and root password in file `/cfs/install/iplist`. And run following command.

```shell
bash install.sh -r all
```

### 7. Valid install

Check following key points:

- The mount point `/cfs/mountpoint` is created on clients.
- Creat a file in mount point, and this file will appear in other client's mount point soon