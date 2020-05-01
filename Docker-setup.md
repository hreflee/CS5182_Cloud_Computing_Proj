# Docker environment setup

Docker offers a loosely isolated environment for contained application. And it is realatively easy for us to come up with new cluster network through `Docker-compose`, which is suitable for doing some fast trials.

### 1. Install Docker in the system

```shell
#!/bin/bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates \
    curl gnupg-agent software-properties-common
# Add Docker's GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose
```

### 2. Design the cluster components in `docker/docker-compose.yml`.

In docker-compose configure file, set up the desiring components in `servers` under `services`

```YAML
services:
  ...
  servers:
      image: chubaofs/cfs-base:1.0
      depends_on:
          - master1
          - master2
          - master3
          - metanode1
          - metanode2
          - metanode3
          - metanode4
          - datanode1
          - datanode2
          - datanode3
          - datanode4
          - nginx
  ...
```

Then setup the corresponding node services, assign ip address per your scheme.

```yaml
services:
  ...
  master1:
    image: chubaofs/cfs-base:1.0
    ...
    networks:
        extnetwork:
            ipv4_address: 192.168.0.11

```

Then the cluster is ready to go by typing:

```shell
# /disk should be at least 30GB
sudo docker/run_docker.sh -r -d /disk
```

You could setup more connecting clients by running:

```shell
sudo docker/run_docker.sh -c
```

