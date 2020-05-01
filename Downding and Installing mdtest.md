Downding and Installing mdtest

1.Installing the dependencies
[root@instance-4 ~]# yum -y install gcc gcc-c++ gcc-gfortran


2.Create the catalog of softare packages
[root@instance-4 ~]# mkdir tools


3.Installing openmpi
[root@instance-4 ~]# cd tools

[root@instance-4 tools]# curl -O https://download.open-mpi.org/release/open-mpi/v1.10/openmpi-1.10.7.tar.gz

[root@instance-4 tools]# tar xf openmpi-1.10.7.tar.gz

[root@instance-4 tools]# cd openmpi-1.10.7

[root@instance-4 openmpi-1.10.7]# ./configure --prefix=/usr/local/openmpi/

[root@instance-4 ~openmpi-1.10.7# make install


4. Adding environmental variable
[root@instance-4 ~]# vim /root/.bashrc

export PATH=$PATH:/usr/local/openmpi/bin/:/usr/local/ior/bin/

export LD_LIBRARY_PATH=/usr/local/openmpi/lib:${LD_LIBRARY_PATH}

export MPI_CC=mpicc

[root@instance-4 ~]# source /root/.bashrc


5. Installing mdtest

[root@instance-4 ~]# cd tools/

[root@instance-4 tools]# mkdir mdtest

[root@instance-4 mdtest]# wget https://nchc.dl.sourceforge.net/project/mdtest/mdtest%20latest/mdtest-1.9.3/mdtest-1.9.3.tgz
 
[root@instance-4 mdtest]# tar xf mdtest-1.9.3.tgz

[root@instance-4 mdtest]# vim /root/.bashrc

export PATH=$PATH:/root/tools/mdtest

[root@instance-4 mdtest]# source /root/.bashrc

[root@instance-4 mdtest]# make

6. Checking
[root@instance-4 mdtest]# ls




