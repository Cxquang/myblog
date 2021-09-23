---
title: Docker基础
date: 2021-03-16 10:16:21
tags: 
- Docker
categories:
- Docker学习
keywords:
- Docker
description: 学习了解Docker，便于环境搭建开发以及项目调试等等
cover: /2021/03/16/Docker基础/Docker基础首页.png
---

{% note info %}
```Text
--头部属性说明：
title	【必需】文章标题【需要】
date	【必需】文章创建日期【需要】
tags	【可选】文章标签【需要】
categories	【可选】文章分类【需要】
keywords	【可选】文章关键字【需要，同标签】
description	【可选】文章描述【需要】
top_img	【可选】文章顶部图片
cover	【可选】文章缩略图(如果没有设置top_img,文章页顶部将显示缩略图，可设为false/图片地址/留空)【需要，地址为：/年/月/日/文章生成的文件夹名/图片名称.后缀名】
comments	【可选】显示文章评论模块(默认 true)
toc	【可选】显示文章TOC(默认为设置中toc的enable配置)
toc_number	【可选】显示
toc_number	(默认为设置中toc的number配置)
copyright	【可选】显示文章版权模块(默认 true)
mathjax	【可选】显示mathjax(当设置mathjax的per_page: false时，才需要配置，默认 false)
katex	【可选】显示katex(当设置katex的per_page: false时，才需要配置，默认 false)

--标签外挂
样式：
[class] : default | primary | success | info | warning | danger.
{% note info %}
编辑内容
{% endnote %}

--图片插入示例：
不显示描述，可以插入【舍弃不用】：
{% asset_img example.png %}
显示描述的：
![example](example.png)	不用添加路径，直接填图片名称即可，将图片放入对应文件夹内

-- 插入链接
{% link text url [external] [title] %}

--
参考地址：[git 无法添加文件夹下文件](https://www.cnblogs.com/howdop/p/5583342.html)
```
{% endnote %}

# Docker概念
## 什么是Docker
1. Docker 是一个开源的应用容器引擎，基于Go语言 并遵从 Apache2.0 协议开源。
2. Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。
3. 容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。
4. 虚拟机是系统级的隔离，对硬件资源进行虚拟化；Docker是应用级别的隔离，直接使用硬件资源。

## 基本概念
1. <font color=red size=3>**镜像（Image）**</font>：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。
2. <font color=red size=3>**容器（Container）**</font>：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
3. <font color=red size=3>**仓库（Repository）**</font>：仓库可看成一个代码控制中心，用来保存镜像。
![Docker基本概念](1、Docker基本概念.png)
4. Docker 客户端(Client)：Docker客户端通过命令行或者其他工具使用Docker SDK(https://docs.docker.com/develop/sdk/)与Docker的守护进程通信。
5. Docker 主机(Host)：一个物理或者虚拟的机器用于执行Docker守护进程和容器。
6. Docker Registry: Docker仓库用来保存镜像，可以理解为代码控制中的代码仓库。Docker Hub(https://hub.docker.com) 提供了庞大的镜像集合供使用。一个 Docker Registry中可以包含多个仓库（Repository）；每个仓库可以包含多个标签（Tag）；每个标签对应一个镜像。通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 <仓库名>:<标签> 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 latest 作为默认标签。
7. Docker Machine: Docker Machine是一个简化Docker安装的命令行工具，通过一个简单的命令行即可在相应的平台上安装Docker，比如VirtualBox、 Digital Ocean、Microsoft Azure。

# Docker安装
- 安装docker最好在Linux环境中安装，否则后面可能会有各种问题，如网络不通等，现在virtualbox等虚拟机中创建Linux系统，通过xshell连接来安装docker
- Docker安装依赖于Linux环境，如果想要在Windows上安装，需要先安装虚拟机，在虚拟机安装Linux，然后再运行docker
- win10有Hyper-V虚拟机，安装Docker Desktop 需要启动Hyper-V，但会导致QEMU、VirtualBox 或 VMWare Workstation 15 及以下版本将无法使用
- 也可以安装docker toolbox，不必要依赖于Hyper-V，也可以使用virtualbox等虚拟机
- 如果启动中遇到因 WSL 2 导致地错误，请安装[WSL 2](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)
- 镜像加速：在系统右下角托盘 Docker 图标内右键菜单选择 Settings，打开配置窗口后左侧导航菜单选择 Daemon。在 Registrymirrors 一栏中填写加速器地址 https://docker.mirrors.ustc.edu.cn/ ，之后点击 Apply 保存后 Docker 就会重启并应用配置的镜像地址了。
![配置镜像加速](3、配置镜像加速.png)
- 在命令行中运行：`docker run hello-world`,出现如下信息代表安装没问题
![Docker验证安装是否成功](2、Docker验证安装是否成功.png)

# Docker使用
## 运行交互式的容器 
1. `docker run -i -t ubuntu:15.10 /bin/bash`
	- 参数解析：
	- ubuntu:15.10： 指定要运行的镜像
	- /bin/bash: 在启动的容器里执行的命令,这里是进入一个伪终端
	- -t: 在新容器内指定一个伪终端或终端。-i: 允许你对容器内的标准输入 (STDIN) 进行交互。
	- -v: 将宿主机目录挂载到容器里,如： -v data/hadoopdata1:/opt/hadoopdata1, 将本地data/hadoopdata1的目录映射到容器中的/opt/hadoopdata1目录中

## 常用命令
1. 一般命令中文解释
```shell
docker run -d [镜像名称]: 后台运行容器，不在前台显示
docker ps: 查看容器的运行状态
docker logs [容器id]：查看容器内的标准输出
docker stop [容器id]：停止容器
```
2. CMD 、RUN 和 ENTRYPOINT的区别和使用时机
	- CMD和RUN的区别
        - 两者都是用于执行命令，区别在于执行命令的时机不同，RUN命令适用于在 docker build 构建docker镜像时执行的命令，而CMD命令是在 docker run 执行docker镜像构建容器时使用，可以动态的覆盖CMD执行的命令。
	- CMD 和 ENTRYPOINT的区别
		- 首先，CMD命令是用于默认执行的，且如果写了多条CMD命令，则只会执行最后一条，如果后续存在ENTRYPOINT命令，则CMD命令或被充当参数或者覆盖，而且Dockerfile中的CMD命令最终可以被在执行 docker run命令时添加的命令所覆盖。而ENTRYPOINT命令则是一定会执行的，一般用于执行脚本。根据写法分析，这里涉及到执行命令的两种写法，第一种使用 shell，第二种使用 exec，例如: 
```shell

#shell写法
FROM centos
CMD echo 'hello'

#exec写法
FROM centos
CMD ["echo","hello"]
```
	- 参考地址：[Dockerfile 中 CMD 、RUN 和 ENTRYPOINT的区别和使用时机](https://blog.csdn.net/u010900754/article/details/78526443)


# Docker安装大数据环境
## ~~镜像准备~~
1. 创建带有ssh，jdk以及各种大数据组件的镜像dockerfile【<font color=red size=3>**不用dockerfile，直接用centos创建后面通过容器生成镜像**</font>】
	- 新建一个空目录，在其中新建一个文件名为dockerfile
```shell
#选择一个已有的os镜像作为基础：
FROM centos
#镜像作者
MAINTAINER caixianquan
#安装相应的支持的软件包,openssh-server/clients 和 sudo
RUN yum install -y openssh-server sudo && sed -i 's/UsePAM yes/UsePAM no/g' /etc/ssh/sshd_config && yum install -y openssh-clients net-tools lrzsz vim && echo "root:root" | chpasswd && echo "root ALL=(ALL)    ALL" >> /etc/sudoers && ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key && ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key && mkdir /var/run/sshd /opt/software /opt/module
#添加相应的镜像系统下的root用户，这个是必须的操作
#给SSH生成密钥对
#启用sshd服务并且暴露相关的端口信息
EXPOSE 22
# 启动容器时启动/usr/sbin/sshd脚本，后台运行
CMD [ "/usr/sbin/sshd","-D"] 
#FROM docker/centos-ssh-root
ADD ./* /opt/module/
RUN mv /opt/module/jdk1.8.0_144 /opt/module/jdk1.8 && mv /opt/module/apache-zookeeper-3.6.2-bin /opt/module/zookeeper-3.6.2 && mv /opt/module/spark-2.1.1-bin-hadoop2.7 /opt/module/spark-2.1.1-hadoop-2.7
COPY flink-shaded-hadoop-2-uber-2.7.5-10.0.jar /opt/module/flink-1.10.0/lib
ENV JAVA_HOME=/opt/module/jdk1.8 HADOOP_HOME=/opt/module/hadoop-2.7.2 HADOOP_CONF_DIR=/opt/module/hadoop-2.7.2/etc/hadoop HADOOP_CLASSPATH=$HADOOP_HOME/lib SPARK_HOME=/opt/module/spark-2.1.1-hadoop-2.7 FLINK_HOME=/opt/module/flink-1.10.0 PATH=$JAVA_HOME/bin:$PATH PATH=$HADOOP_HOME/bin:$PATH PATH=$SPARK_HOME/bin:$PATH PATH=$FLINK_HOME/bin:$PATH
```

2. 构建镜像
	- 将用到的压缩包放到dockerfile所在当前目录下，执行以下语句：
		- `docker build -t docker/centos-ssh-root-jdk-hadoop-spark .`

## 拉取centos镜像
```shell
#拉取centos7镜像
docker pull centos:centos7
#查看本地镜像
docker images
#创建自定义网络
docker network create --subnet=192.168.123.0/24 --gateway 192.168.123.1 mynetwork
b30b0138fee2aa2bb940b98a6c745a9f3331597970d59c3c3fcc0f71b948445e
#运行容器,-v参数表示指定一个与宿主共享的目录，宿主目录必须存在，容器目录会自动创建
docker run -itd --name centos --hostname hadoop101 --net mynetwork --ip 192.168.123.101 --privileged=true -v /opt/hadoopdata1:/opt/hadoopdata1 centos:centos7
#进入容器
docker exec -it centos /bin/bash
```


## 安装必要工具
```shell
#&& sed -i 's/UsePAM yes/UsePAM no/g' /etc/ssh/sshd_config  在企业red Linux 总是提示不支持，故验证不取消
yum install -y openssh-server sudo  && yum install -y openssh-clients net-tools lrzsz vim && echo "root:root" | chpasswd && echo "root ALL=(ALL)    ALL" >> /etc/sudoers && ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key && ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key && ssh-keygen -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key && ssh-keygen -t ed25519 -f  /etc/ssh/ssh_host_ed25519_key
#编辑hosts文件，/etc/hosts
#添加：
127.0.0.1       localhost
192.168.123.101 hadoop101
192.168.123.102 hadoop102
192.168.123.103 hadoop103

#关闭防火墙(centos) 由于docker对centos7有bug，systemctl服务无法使用，推测应该也没有防火墙
启动： systemctl start firewalld
关闭： systemctl stop firewalld
查看状态： systemctl status firewalld 
开机禁用  ： systemctl disable firewalld
开机启用  ： systemctl enable firewalld

#查看sshd是否已经安装
rpm -qa |grep ssh
openssh-7.4p1-21.el7.x86_64
openssh-server-7.4p1-21.el7.x86_64
openssh-clients-7.4p1-21.el7.x86_64
libssh2-1.8.0-4.el7.x86_64

#后台运行sshd
#第一种方式，将其父进程改为init进程（进程号为0）
setsid /usr/sbin/sshd
#第二种方式，使用nohup命令，打印信息会输出到当前目录下的nohup.out中
nohup /usr/sbin/sshd

#ssh服务的网络连接情况:
[root@hadoop101 ~]# netstat -ntlp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      160/sshd            
tcp6       0      0 :::22                   :::*                    LISTEN      160/sshd

#查看后台进程

[root@hadoop101 ~]# ps -ef 
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 02:23 pts/0    00:00:00 /bin/bash
root        15     0  0 02:23 pts/1    00:00:00 /bin/bash
root       160     0  0 02:48 ?        00:00:00 /usr/sbin/sshd
root       163    15  0 02:51 pts/1    00:00:00 ps -ef

#开机自动启用ssh服务
#由于systemctl无法使用，所以通过~/.bashrc写入命令来启用ssh服务
vim ~/.bashrc
#在文件末尾追加
setsid /usr/sbin/sshd
# 由于每次重启容器/etc/profile无法自动加载，只能在.bashrc中source该文件
source /etc/profile

完整.bashrc文件内容如下：
#=========================我是分割线=========================
# .bashrc

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi
setsid /usr/sbin/sshd
source /etc/profile
#=========================我是分割线=========================

#免密登录设置
#由于三个容器是从同一个镜像中产生的，所以只弄一个密钥即可
#生成密钥对
ssh-keygen -t rsa
#发送到本身的节点上
ssh-copy-id hadoop101

#vim下中文可能乱码问题
$ vim /etc/vimrc
#在文件首行添加如下内容：
set fileencodings=utf-8,gb2312,gbk,gb18030  
set termencoding=utf-8  
set fileformats=unix  
set encoding=prc
```


## 导出导入容器
```shell
#指定容器id
docker export 1e560fca3906 > centos.tar
docker import - docker/hadoop_v1.0 < centos.tar
```


## 创建自定义网络 
1. ~~自定义网络~~
	- 拉取centos镜像时已经提前操作完成，这里仅做说明即可
	- docker自定义网络后使得每个容器可以有固定的ip，这样重启容器时ip不会发生变化。
	- 参考地址：[Docker如何固定IP设置的方法](https://www.jb51.net/article/118396.htm)
2. 创建自定义网络，并且指定网段：192.168.56.0/24
```shell
C:\Users\Xquan>docker network create --subnet=192.168.123.0/24 --gateway 192.168.123.1 mynetwork
b30b0138fee2aa2bb940b98a6c745a9f3331597970d59c3c3fcc0f71b948445e

C:\Users\Xquan>docker network ls
NETWORK ID     NAME        DRIVER    SCOPE
004fa2d3f3e8   bridge      bridge    local
10c4f8d791da   host        host      local
b30b0138fee2   mynetwork   bridge    local
1f579d94536b   none        null      local
```


## 网络问题： docker容器使用自定义网络无法ping通网关，也无法ping通外网以及其他docker容器
参考地址：[Docker 容器不能ping通默认网关(172.17.0.1)--已解决](https://blog.csdn.net/coolfishbone_joey/article/details/107146839)
参考地址：[Centos7 升级内核版本](https://www.cnblogs.com/xzkzzz/p/9627658.html)
<font color=red size=3>**查看宿主机内核发现是3.10的，需要升级内核**</font>
```shell
#查看当前内核版本
[root@docker module]# uname -r
3.10.0-862.el7.x86_64
[root@docker module]# uname -a
Linux docker 3.10.0-862.el7.x86_64 #1 SMP Fri Apr 20 16:44:24 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux

[root@docker module]# cat /etc/redhat-release 
CentOS Linux release 7.9.2009 (Core)


#更新yum源仓库
yum -y update
#导入ELRepo仓库的公共密钥
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org

#安装ELRepo仓库的yum源
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm

#查看可用的系统内核包 可以看到4.4和4.18两个版本
yum --disablerepo="*" --enablerepo="elrepo-kernel" list available
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * elrepo-kernel: mirrors.tuna.tsinghua.edu.cn
elrepo-kernel                                                                                                                                                                 | 2.9 kB  00:00:00     
elrepo-kernel/primary_db                                                                                                                                                      | 1.8 MB  00:00:03     
Available Packages
kernel-lt.x86_64                                                                                  4.4.155-1.el7.elrepo                                                                  elrepo-kernel
kernel-lt-devel.x86_64                                                                            4.4.155-1.el7.elrepo                                                                  elrepo-kernel
kernel-lt-doc.noarch                                                                              4.4.155-1.el7.elrepo                                                                  elrepo-kernel
kernel-lt-headers.x86_64                                                                          4.4.155-1.el7.elrepo                                                                  elrepo-kernel
kernel-lt-tools.x86_64                                                                            4.4.155-1.el7.elrepo                                                                  elrepo-kernel
kernel-lt-tools-libs.x86_64                                                                       4.4.155-1.el7.elrepo                                                                  elrepo-kernel
kernel-lt-tools-libs-devel.x86_64                                                                 4.4.155-1.el7.elrepo                                                                  elrepo-kernel
kernel-ml.x86_64                                                                                  4.18.7-1.el7.elrepo                                                                   elrepo-kernel
kernel-ml-devel.x86_64                                                                            4.18.7-1.el7.elrepo                                                                   elrepo-kernel
kernel-ml-doc.noarch                                                                              4.18.7-1.el7.elrepo                                                                   elrepo-kernel
kernel-ml-headers.x86_64                                                                          4.18.7-1.el7.elrepo                                                                   elrepo-kernel
kernel-ml-tools.x86_64                                                                            4.18.7-1.el7.elrepo                                                                   elrepo-kernel
kernel-ml-tools-libs.x86_64                                                                       4.18.7-1.el7.elrepo                                                                   elrepo-kernel
kernel-ml-tools-libs-devel.x86_64                                                                 4.18.7-1.el7.elrepo                                                                   elrepo-kernel
perf.x86_64                                                                                       4.18.7-1.el7.elrepo                                                                   elrepo-kernel
python-perf.x86_64                                                                                4.18.7-1.el7.elrepo                                                                   elrepo-kernel

#安装最新版本内核
$ yum --enablerepo=elrepo-kernel install kernel-ml
--enablerepo 选项开启 CentOS 系统上的指定仓库。默认开启的是 elrepo，这里用 elrepo-kernel 替换。

#设置 grub2
#内核安装好后，需要设置为默认启动选项并重启后才会生效
查看系统上的所有可用内核：
$ sudo awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg
0 : CentOS Linux (4.18.7-1.el7.elrepo.x86_64) 7 (Core)
1 : CentOS Linux (3.10.0-862.11.6.el7.x86_64) 7 (Core)
2 : CentOS Linux (3.10.0-514.el7.x86_64) 7 (Core)
3 : CentOS Linux (0-rescue-063ec330caa04d4baae54c6902c62e54) 7 (Core)

#设置新的内核为grub2的默认版本
#服务器上存在4 个内核，我们要使用 4.18 这个版本，可以通过 grub2-set-default 0 命令或编辑 /etc/default/grub 文件来设置
#方法1、通过 grub2-set-default 0 命令设置
#其中 0 是上面查询出来的可用内核

$ grub2-set-default 0

#方法2、编辑 /etc/default/grub 文件
#设置 GRUB_DEFAULT=0，通过上面查询显示的编号为 0 的内核作为默认内核：

$ vim /etc/default/grub
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="$(sed 's, release .*$,,g' /etc/system-release)"
GRUB_DEFAULT=0
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="crashkernel=auto rd.lvm.lv=cl/root rhgb quiet"
GRUB_DISABLE_RECOVERY="true"

#生成 grub 配置文件并重启
$ grub2-mkconfig -o /boot/grub2/grub.cfg
Generating grub configuration file ...
Found linux image: /boot/vmlinuz-4.18.7-1.el7.elrepo.x86_64
Found initrd image: /boot/initramfs-4.18.7-1.el7.elrepo.x86_64.img
Found linux image: /boot/vmlinuz-3.10.0-862.11.6.el7.x86_64
Found initrd image: /boot/initramfs-3.10.0-862.11.6.el7.x86_64.img
Found linux image: /boot/vmlinuz-3.10.0-514.el7.x86_64
Found initrd image: /boot/initramfs-3.10.0-514.el7.x86_64.img
Found linux image: /boot/vmlinuz-0-rescue-063ec330caa04d4baae54c6902c62e54
Found initrd image: /boot/initramfs-0-rescue-063ec330caa04d4baae54c6902c62e54.img
done

$ reboot


#验证
$ uname -r
4.18.7-1.el7.elrepo.x86_64

#删除旧内核（可选）
#查看系统中全部的内核：
$ rpm -qa | grep kernel
kernel-3.10.0-514.el7.x86_64
kernel-ml-4.18.7-1.el7.elrepo.x86_64
kernel-tools-libs-3.10.0-862.11.6.el7.x86_64
kernel-tools-3.10.0-862.11.6.el7.x86_64
kernel-3.10.0-862.11.6.el7.x86_64

#方法1、yum remove 删除旧内核的 RPM 包
$ yum remove kernel-3.10.0-514.el7.x86_64 \
kernel-tools-libs-3.10.0-862.11.6.el7.x86_64 \
kernel-tools-3.10.0-862.11.6.el7.x86_64 \
kernel-3.10.0-862.11.6.el7.x86_64

#方法2、yum-utils 工具
#如果安装的内核不多于 3 个，yum-utils 工具不会删除任何一个。只有在安装的内核大于 3 个时，才会自动删除旧内核。

#安装yum-utils

$ yum install yum-utils

#删除旧版本　　

package-cleanup --oldkernels
```


## 启动容器
1. 首先因为是一个3节点的hadoop集群环境，因此先创建3个hadoop的节点：（创建的节点需要带有本地同步目录）,hadoop1作为主节点master
`使用VOLUME卷，将数据保存到宿主机，这样子就可以只保留一个镜像，而hdfs数据保存到宿主机上而不影响节点`
```shell
docker run --name hadoop101 --hostname hadoop101 --add-host hadoop101:192.168.123.101 --add-host hadoop102:192.168.123.102 --add-host hadoop103:192.168.123.103 --net mynetwork --ip 192.168.123.101 -itd -P -p 50070:50070  -p 18080:18080 -v /opt/hadoopdata1:/opt/module docker/hadoop_v1.0 /bin/bash
docker run --name hadoop102 --hostname hadoop102 --add-host hadoop101:192.168.123.101 --add-host hadoop102:192.168.123.102 --add-host hadoop103:192.168.123.103 --net mynetwork --ip 192.168.123.102 -itd -P -p 8088:8088 -p 8042:8042 -v /opt/hadoopdata2:/opt/module docker/hadoop_v1.0 /bin/bash
docker run --name hadoop103 --hostname hadoop103 --add-host hadoop101:192.168.123.101 --add-host hadoop102:192.168.123.102 --add-host hadoop103:192.168.123.103 --net mynetwork --ip 192.168.123.103 -itd -P -p 19888:19888 -v /opt/hadoopdata3:/opt/module docker/hadoop_v1.0 /bin/bash
```
2. 端口解释：18080是启动spark程序查看spark运行情况比如task任务情况等等的页面；8088是yarn的任务界面；19888是hdfs收集的日志界面;8042是yarn界面的任务的具体日志


## hadoop搭建
1. 参考地址：
	- [jdk和Hadoop搭建--普通用户下(二)](https://cxquang.github.io/myblog/2020/10/03/jdk%E5%92%8CHadoop%E6%90%AD%E5%BB%BA-%E6%99%AE%E9%80%9A%E7%94%A8%E6%88%B7%E4%B8%8B-%E4%BA%8C/)
	- [Hadoop学习（一）构建docker的hadoop集群](https://zhuanlan.zhihu.com/p/40650348)

2. 配置步骤
	- 配置环境变量，在/etc/profile中，防止使用docker ENV命令配置失效
	- 配置hosts文件
	- SSH无密登录配置(重新生成密钥，如果重镜像生成是一样的)
	- 。。。【参考jdk和Hadoop搭建即可】

## ~~保存容器状态为新镜像~~
<font color=red size=3>**使用导出导入镜像，删除时比较方便，没有前面依赖镜像等**</font>
1. 重启开启容器centos中的/etc/profile可能不会生效，得手动source一下，可以将命令`source /etc/profile`添加在~/.bashrc的文本末尾中，要注意不要添加到/etc/bashrc中，否则会卡死Linux，未找出原因
2. 为了能够保存当前容器的状态，修改后的配置文件等，可以保存为镜像，下次直接从镜像中启动容器即可
```shell
docker commit -a "caixianquan" -m "hadoop101 v1.0" f507fdc5549f docker/hadoop101_v1.0
```
2. 由于大数据集群每个节点的配置文件、jar包等都是相同的，~~可以只需要保存其中一个，用这个镜像分别启动三个容器~~,hdfs文件系统的文件会保存在三个节点，所以如果想要保留hdfs文件系统，最好还是对每个节点容器进行保存
```shell
docker run --name hadoop101 --hostname hadoop101 --add-host hadoop101:192.168.123.101 --add-host hadoop102:192.168.123.102 --add-host hadoop103:192.168.123.103 --net mynetwork --ip 192.168.123.101 -itd -P -p 50070:50070  -p 18080:18080 -v /opt/hadoopdata1:/opt/module docker/hadoop_v1.0 /bin/bash
docker run --name hadoop102 --hostname hadoop102 --add-host hadoop101:192.168.123.101 --add-host hadoop102:192.168.123.102 --add-host hadoop103:192.168.123.103 --net mynetwork --ip 192.168.123.102 -itd -P -p 8088:8088 -p 8042:8042 -v /opt/hadoopdata2:/opt/module docker/hadoop_v1.0 /bin/bash
docker run --name hadoop103 --hostname hadoop103 --add-host hadoop101:192.168.123.101 --add-host hadoop102:192.168.123.102 --add-host hadoop103:192.168.123.103 --net mynetwork --ip 192.168.123.103 -itd -P -p 19888:19888 -v /opt/hadoopdata3:/opt/module docker/hadoop_v1.0 /bin/bash
```
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
