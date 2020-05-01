# Set up steps

Since AWS education account is not allowed to create CentOS machines, so we do our deployment on Google Cloud.

## Config user for ChubaoFS

### 1. Enable ssh login with password and allows root login

```shell
sudo vim /etc/ssh/sshd_config
```

And then find the config item `PasswordAuthentication`, change it's value to `yes`, and find the config item `PermitRootLogin`, change it's value to `yes`

```shell
sudo service sshd restart
```

### 2. change root password

```shell
sudo passwd root
```

### 3. Change user to root and install ChubaoFS installer

There are some problem to directly use the Yum commands in the offcial website of ChubaoFS, so some modification is made.

```shell
sudo yum install wget -y
wget http://storage.jd.com/chubaofsrpm/latest/cfs-install-latest-el7.x86_64.rpm
sudo yum install cfs-install-latest-el7.x86_64.rpm -y
```

### 4. Build file system on new disk and mount it

Create a new SSD disk and add it to all data node instances. Run following commands. (Assume the new disk is mount at `/dev/sdb`)

```shell
mkfs.xfs -f /dev/sdb
mkdir /data0
mount /dev/sdb /data0
```

### 5. Edit configuration and start all nodes

Change ip in file `/cfs/install/iplist` and root password. Copy them to each machines. And run following command.

```shell
bash install.sh -r all
```

### 6. Valid install

Check following key points:
- The mount point `/cfs/mountpoint` is created on clients.
- Creat a file in mount point, and this file will appear in other client's mount point soon