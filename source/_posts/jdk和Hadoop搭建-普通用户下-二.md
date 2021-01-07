---
title: jdk和Hadoop搭建--普通用户下(二)
date: 2020-10-03 17:12:42
tags:
- jdk1.8
- Hadoop 2.7
- 环境搭建
categories: 
- 大数据学习
- 大数据集群环境搭建
keywords:
- jdk1.8
- Hadoop 2.7
- 环境搭建
description: 紧接上一步安装好虚拟机后，对hadoop2.7与jdk1.8的安装
cover: /2020/10/03/jdk和Hadoop搭建-普通用户下-二/jdk和Hadoop搭建首页.jpg
---

# 虚拟机环境准备
## 创建虚拟机
参考上一节创建虚拟机：https://www.caixianquan.tk/2020/10/02/在虚拟机中安装CentOS-一/
## 导入虚拟机
- 从移动硬盘中导入虚拟机，这时虚拟机保存位置的文件名是不能更改的，可以直接从这台导入的虚拟机另外复制出想要的虚拟机，然后重命名，就可以将虚拟机保存的位置更改名字了。如下：
![导入虚拟机](1、导入虚拟机.png)

## 关闭防火墙
{% note primary %}
<font color=red size=3>**大数据工作环境一般也是关闭防火墙的，需要对外服务，再从集群与外界环境交互中增加防火墙**</font>
{% endnote %}
```shell
sudo service iptables stop //服务关闭
sudo chkconfig iptables off //关闭开机自启
service iptables status  //查看防火墙状态
chkconfig --list iptables  //显示防火墙的运行状态信息
等级0表示：表示关机 
等级1表示：单用户模式 
等级2表示：无网络连接的多用户命令行模式 
等级3表示：有网络连接的多用户命令行模式 
等级4表示：不可用 
等级5表示：带图形界面的多用户模式 
等级6表示：重新启动 

CentOS7防火墙
启动： systemctl start firewalld
关闭： systemctl stop firewalld
查看状态： systemctl status firewalld 
开机禁用  ： systemctl disable firewalld
开机启用  ： systemctl enable firewalld
```


## 添加普通用户
{% note primary %}
生产环境下需要使用普通用户来操作集群，实验环境可以使用root用户
{% endnote %}
```shell
useradd caixianquan
passwd caixianquan
```
假设虚拟机中已经存在一个普通用户，这里修改用户名及家目录
```shell
更改用户名：
usermod -l 新用户名 旧用户名
更新家目录：
usermod -d /home/新家目录 -m 新用户名
```

## 配置这个用户为sudoers
<font color=red size=3>**为用户授予能够使用root命令**</font>
```shell
 vim /etc/sudoers
    在root    ALL=(ALL)       ALL
    添加caixianquan    ALL=(ALL)       NOPASSWD:ALL
    保存时wq!强制保存
```
比如使用普通用户创建用户，则需要在前面加上sudo即可
```shell
[caixianquan@localhost opt]$ userdel -r ahhahaha
bash: /usr/sbin/userdel: 权限不够
[caixianquan@localhost opt]$ sudo userdel -r ahhahaha
```

## 在/opt目录下创建software和module两个文件夹，并更改所有权
{% note primary %}
这里主要是为后面的集群搭建设置目录以及安装位置
{% endnote %}
```shell
mkdir /opt/module /opt/software
chown caixianquan:caixianquan /opt/module /opt/software
```

## 配置hosts文件【添加域名，后面免登录】
```shell
vim /etc/hosts
=============================
192.168.56.100   hadoop100
192.168.56.101   hadoop101
192.168.56.102   hadoop102
192.168.56.103   hadoop103
192.168.56.104   hadoop104
192.168.56.105   hadoop105
192.168.56.106   hadoop106
192.168.56.107   hadoop107
192.168.56.108   hadoop108
192.168.56.109   hadoop109
=============================
```
小技巧：使用shell来做：
```shell
#! /bin/bash
for((i = 100;i < 110; i++))
do
        echo "192.168.56.$i hadoop$i" >> /etc/hosts
done
```

## 改静态IP
<font color=red size=3>**【每次克隆新虚拟机，需要从这开始修改，使用一般用户登录】**</font>
```shell
DEVICE=eth0
TYPE=Ethernet
ONBOOT=yes
BOOTPROTO=static
NAME="eth0"
IPADDR=192.168.5.101
PREFIX=24
GATEWAY=192.168.5.2
DNS1=192.168.5.2
```

## 修改主机名
```shell
CentOS6下：编辑vim /etc/sysconfig/network
    改HOSTNAME=hadoop100
CentOS下：编辑vim /etc/hostname
        改hostname=hadoop100
        
或者直接使用命令：hostnamectl  set-hostname hadoop100
【退出重新登录即可】
```

## 备份环境
保存为快照，下次直接从这个快照克隆其他节点
![备份环境](2、备份环境.png)

# SSH无密登录配置
## 免密登录原理
1. ssh身份验证：本机A向远程主机B发送一个登录请求，B向A发送一个秘钥用来加密数据流。
A通过秘钥加密本机密码发送给B，然后B通过配对秘钥解密核对密码，认证成功即可登录

2. ssh首次连接过程中需要输入yes，这时因为远程主机在向本机发送公钥时，要确保是否是目标主机，需要人工核对。
![免密登录原理](3、免密登录原理.png)

## 步骤
1. 生成公钥和私钥
```shell
[caixianquan@localhost ~]$ ssh-keygen -t rsa
```
	- 然后敲（三个回车），就会生成两个文件id_rsa（私钥）、id_rsa.pub（公钥）
	- 其中在\~/.ssh目录下还有一个known_hosts文件，保存之前使用ssh登录过的主机ip，即首次连接时需要输入yes的过程，如果删除该文件，那么下次连接还是首次连接，得人工核对输入yes

2. 将公钥拷贝到要免密登录的目标机器上
{% note primary %}
注意：本身节点的authorized_keys文件也需要保存公钥
{% endnote %}
```shell
[caixianquan@localhost .ssh]$ ssh-copy-id hadoop103
```
在目标机器上就会保存对应的公钥，文件为：authorized_keys【可以有多把公钥】
注意.ssh文件夹自动生成不会有权限问题

3. 在其他hadoop103、hadoop102上
    - 也需要在各自的主机上生成对应的私钥和公钥
    - 然后在hadoop103和hadoop102通过ssh-copy-id命令将公钥发送给hadoop101上，那么hadoop101上的authorized_keys文件就保存包括本身的所有公钥，直接通过xsync将authorized_keys文件分发给其他节点上即可实现所有机器免密互相登录

4. .ssh文件夹下（\~/.ssh）的文件功能解释
![文件说明](4、文件说明.png)

# xsync集群分发脚本
## 需求
循环复制文件到所有节点的相同目录下

## 需求分析
1. rsync命令原始拷贝：
```shell
rsync  -av     /opt/module  root@hadoop103:/opt/
```

2. 期望脚本：
    - xsync要同步的文件名称
3. <font color=red size=3>**说明：在/home/caixianquan/bin这个目录下存放的脚本，caixianquan用户可以在系统任何地方直接执行。**</font>

## 脚本实现
1. 在/home/caixianquan目录下创建bin目录，并在bin目录下xsync创建文件，在root用户下，/root目录下创建bin目录
```shell
[caixianquan@hadoop101 ~]$ mkdir bin
[caixianquan@hadoop101 ~]$ cd bin/
[caixianquan@hadoop101 bin]$ touch xsync
[caixianquan@hadoop101 bin]$ vi xsync
```
在该文件中编写如下代码
```shell
#!/bin/bash
#1 获取输入参数个数，如果没有参数，直接退出
pcount=$#
if ((pcount==0)); then
echo no args;
exit;
fi
 
#2 获取文件名称
p1=$1
fname=`basename $p1`
echo fname=$fname
 
#3 获取上级目录到绝对路径
pdir=`cd -P $(dirname $p1); pwd`
echo pdir=$pdir
 
#4 获取当前用户名称
user=`whoami`
 
#5 循环
for((host=101; host<103; host++)); do
        echo ------------------- hadoop$host --------------
        rsync -av $pdir/$fname $user@hadoop$host:$pdir
done
```
2. 修改脚本 xsync 具有执行权限
```shell
[caixianquan@hadoop101 bin]$ chmod 777 xsync
```
3. 调用脚本形式：xsync 文件名称
```shell
[caixianquan@hadoop101 bin]$ xsync /home/atguigu/bin
```
<font color=red size=3>**注意：如果将xsync放到/home/caixianquan/bin目录下仍然不能实现全局使用，可以将xsync移动到/usr/local/bin目录下【或者/bin下】。**</font>

4. 分发脚本到其他节点的/bin目录上
```shell
[caixianquan@hadoop101 bin]$ sudo rsync -av /bin/xsync hadoop102:/bin
```
5. 将/etc/profile文件发送到其他节点上，注意要使用sudo命令【普通用户下】
```shell
[caixianquan@hadoop101 opt]$ sudo xsync /etc/profile
```
使用source命令执行配置文件profile

# jpsall脚本
1. 编写jpsall脚本，实现观察多台节点的jps进程
2. 在/home/caixianquan目录下创建bin目录，并在bin目录下xsync创建文件，文件内容如下：
```shell
[caixianquan@hadoop101 ~]$ mkdir bin
[caixianquan@hadoop101 ~]$ cd bin/
[caixianquan@hadoop101 bin]$ touch jpsall
[caixianquan@hadoop101 bin]$ vi jpsall
```
在该文件中编写如下代码
```shell
#!/bin/bash
for i in hadoop101 hadoop102 hadoop103
do
echo --------------------- $i -------------------------------
ssh $i  "source /etc/profile && jps | grep -v Jps "
done
```
3. 修改脚本 jpsall具有执行权限
```shell
[caixianquan@hadoop101 bin]$ chmod 777 xsync
```
4. 调用脚本形式：jpsall文件名称
```shell
[caixianquan@hadoop101 bin]$ jpsall
--------------------- hadoop102 -------------------------------
5153 QuorumPeerMain
--------------------- hadoop103 -------------------------------
5300 QuorumPeerMain
--------------------- hadoop104 -------------------------------
5298 QuorumPeerMain
```
5. 分发脚本到其他节点的/bin目录上
```shell
[caixianquan@hadoop101 ~]$ xsync bin/
```

# 安装JDK
## 解压
1. JDK版本：jdk-8u144-linux-x64.tar.gz
2. 查询是否已安装Java【能否使用命令java】，如果有就先卸载
```shell
[caixianquan@localhost software]$ java -version
openjdk version "1.8.0_161"
OpenJDK Runtime Environment (build 1.8.0_161-b14)
OpenJDK 64-Bit Server VM (build 25.161-b14, mixed mode)
[caixianquan@localhost software]$ rpm -qa | grep java
python-javapackages-3.4.1-11.el7.noarch
java-1.8.0-openjdk-headless-1.8.0.161-2.b14.el7.x86_64
javapackages-tools-3.4.1-11.el7.noarch
tzdata-java-2018c-1.el7.noarch
java-1.8.0-openjdk-1.8.0.161-2.b14.el7.x86_64

【卸载java】
[caixianquan@localhost software]$ rpm -qa | grep java | xargs sudo rpm -e --nodeps
[caixianquan@localhost software]$ rpm -qa | grep java
[caixianquan@localhost software]$ java
-bash: /usr/bin/java: 没有那个文件或目录
```
3. 解压压缩包
 - 将java压缩包解压到/opt/module目录下，hadoop安装包同理
 - 其中参数：z、压缩编码，x、解压，v、打印信息，f、指定文件
```shell
[caixianquan@localhost software]$ tar -zxvf jdk-8u144-linux-x64.tar.gz  -C /opt/module
[caixianquan@localhost software]$ cd /opt/module/
[caixianquan@localhost module]$ ls
hadoop-2.7.2  jdk1.8.0_144
```

## 配置环境变量
1. 编辑/etc/profile文件
```shell
#如果不使用sudo命令，打开的文件是只读方式
[caixianquan@localhost module]$ sudo vim /etc/profile
```
2. 往profile文件追加内容：【export为设置全局变量关键字，即当前shell和子shell都有这个文件】
```shell
#JAVA_HOME
export JAVA_HOME=/opt/module/jdk1.8.0_144
export PATH=$PATH:$JAVA_HOME/bin
```
3. 执行环境配置文件
```shell
[caixianquan@localhost module]$ source /etc/profile
```
4. 查看配置状态
```shell
[caixianquan@localhost module]$ echo $JAVA_HOME
/opt/module/jdk1.8.0_144
[caixianquan@localhost module]$ java -version
java version "1.8.0_144"
Java(TM) SE Runtime Environment (build 1.8.0_144-b01)
Java HotSpot(TM) 64-Bit Server VM (build 25.144-b01, mixed mode)
```

# 安装Hadoop
## 配置环境变量

1. 同上述配置Java环境变量，追加内容为：
```shell
#HADOOP_HOME
export HADOOP_HOME=/opt/module/hadoop-2.7.2
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```

2. 查看环境配置
```shell
[caixianquan@localhost module]$ hadoop version
Hadoop 2.7.2
Subversion Unknown -r Unknown
Compiled by root on 2017-05-22T10:49Z
Compiled with protoc 2.5.0
From source with checksum d0fda26633fa762bff87ec759ebe689c
This command was run using /opt/module/hadoop-2.7.2/share/hadoop/common/hadoop-common-2.7.2.jar
```

## 集群配置
### 集群部署规划

![集群部署规划](5、集群部署规划.png)
- DN和NM需要在同一个节点上，DN管理节点上的磁盘，NM管理节点上的CPU和内存等资源
- 一般集群的最小规模需要六台，RM、2NN、NN各自一台，DN和NM分布在三台。

### 配置集群
1. 核心配置文件： 配置core-site.xml
```shell
在该文件中编写如下配置
<!-- 指定HDFS中NameNode的地址 -->
<property>
        <name>fs.defaultFS</name>
      <value>hdfs://hadoop102:9000</value>
</property>
 
<!-- 指定Hadoop运行时产生文件的存储目录 -->
<property>
        <name>hadoop.tmp.dir</name>
        <value>/opt/module/hadoop-2.7.2/data/tmp</value>
</property>
```
2. HDFS配置文件
	- 配置hadoop-env.sh
```shell
export JAVA_HOME=/opt/module/jdk1.8.0_144
```
	- 配置hdfs-site.xml
```shell
在该文件中编写如下配置
<property>
        <name>dfs.replication</name>
        <value>3</value>
</property>
 
<!-- 指定Hadoop辅助名称节点主机配置 -->
<property>
      <name>dfs.namenode.secondary.http-address</name>
      <value>hadoop104:50090</value>
</property>
```
3. YARN配置文件
	- 配置yarn-env.sh
```shell
export JAVA_HOME=/opt/module/jdk1.8.0_144
```
	- 配置yarn-site.xml
```shell
在该文件中增加如下配置
<!-- Reducer获取数据的方式 -->
<property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
</property>
 
<!-- 指定YARN的ResourceManager的地址 -->
<property>
        <name>yarn.resourcemanager.hostname</name>
        <value>hadoop103</value>
</property>
```
4. MapReduce配置文件
	- 配置mapred-env.sh
```shell
export JAVA_HOME=/opt/module/jdk1.8.0_144
```
	- 配置mapred-site.xml
```shell
[atguigu@hadoop102 hadoop]$ cp mapred-site.xml.template mapred-site.xml
[atguigu@hadoop102 hadoop]$ vi mapred-site.xml
在该文件中增加如下配置
<!-- 指定MR运行在Yarn上 -->
<property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
</property>
```

### 在集群上分发配置好的Hadoop配置文件
```shell
[caixianquan@localhost hadoop-2.7.2]$ xsync etc
```

### 查看文件分发情况
```shell
[atguigu@hadoop103 hadoop]$ cat /opt/module/hadoop-2.7.2/etc/hadoop/core-site.xml
```

### 配置历史服务器【先关闭集群】
为了查看程序的历史运行情况，需要配置一下历史服务器。具体配置步骤如下：
- 配置yarn-site.xml
```shell
在该文件里面增加如下配置。
<!-- 历史服务器端地址 -->
<property>
    <name>yarn.log.server.url</name>
    <value>http://hadoop104:19888/jobhistory/logs</value>
</property>
```
- 配置mapred-site.xml
```shell
在该文件里面增加如下配置。
<!-- 历史服务器端地址 -->
<property>
<name>mapreduce.jobhistory.address</name>
<value>hadoop104:10020</value>
</property>
<!-- 历史服务器web端地址 -->
<property>
    <name>mapreduce.jobhistory.webapp.address</name>
    <value>hadoop104:19888</value>
</property>
```

- 分发配置文件：
```shell
[caixianquan@localhost etc]$ xsync hadoop/
```

- 启动历史服务器，在hadoop104上启动【先重启集群后再启动历史服务器】
```shell
[atguigu@hadoop104 hadoop-2.7.2]$ sbin/mr-jobhistory-daemon.sh start historyserver
```
- 查看历史服务器是否启动
```shell
[caixianquan@localhost hadoop-2.7.2]$ jps
14930 NodeManager
14710 DataNode
15097 JobHistoryServer
15145 Jps
14813 SecondaryNameNode
```

- 查看JobHistory
```shell
http://192.168.56.104:19888/jobhistory
```

### 配置日志的聚集【先关闭集群】
日志聚集概念：应用运行完成以后，将程序运行日志信息上传到HDFS系统上。
日志聚集功能好处：可以方便的查看到程序运行详情，方便开发调试。
注意：开启日志聚集功能，需要重新启动NodeManager 、ResourceManager和HistoryManager。
开启日志聚集功能具体步骤如下：
- 配置yarn-site.xml
```shell
[atguigu@hadoop101 hadoop]$ vi yarn-site.xml
```
在该文件里面增加如下配置。
```shell
<!-- 日志聚集功能使能 -->
<property>
<name>yarn.log-aggregation-enable</name>
<value>true</value>
</property>

<!-- 日志保留时间设置7天 -->
<property>
<name>yarn.log-aggregation.retain-seconds</name>
<value>604800</value>
</property>
```
- 分发配置文件：
```shell
[caixianquan@localhost etc]$ xsync hadoop/
```


- 删除HDFS上已经存在的输出文件
```shell
[atguigu@hadoop101 hadoop-2.7.2]$ bin/hdfs dfs -rm -R /user/atguigu/output
```
- 执行WordCount程序
```shell
[atguigu@hadoop101 hadoop-2.7.2]$ hadoop jar
 share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.2.jar wordcount /user/atguigu/input /user/atguigu/output
```
- 查看日志，如图2-37，2-38，2-39所示
http://192.168.56.104:19888/jobhistory

### 集群单点启动
<font color=red size=3>***如果集群是第一次启动，需要格式化NameNode***</font>
{% note primary %}
注意格式化之前，一定要先停止上次启动的所有namenode和datanode进程，然后再删除data和log数据，注意是所有节点的data和log数据
{% endnote %}
```shell
[atguigu@hadoop102 hadoop-2.7.2]$ hdfs namenode -format
```
- 启动集群
```shell
#在hadoop102上启动NameNode
[atguigu@hadoop102 hadoop-2.7.2]$ hadoop-daemon.sh start namenode
[atguigu@hadoop102 hadoop-2.7.2]$ jps
3461 NameNode
#在hadoop102、hadoop103以及hadoop104上分别启动DataNode
[atguigu@hadoop102 hadoop-2.7.2]$ hadoop-daemon.sh start datanode
[atguigu@hadoop102 hadoop-2.7.2]$ jps
3461 NameNode
3608 Jps
3561 DataNode
[atguigu@hadoop103 hadoop-2.7.2]$ hadoop-daemon.sh start datanode
[atguigu@hadoop103 hadoop-2.7.2]$ jps
3190 DataNode
3279 Jps
[atguigu@hadoop104 hadoop-2.7.2]$ hadoop-daemon.sh start datanode
[atguigu@hadoop104 hadoop-2.7.2]$ jps
3237 Jps
3163 DataNode
```

### 群起集群
1. 配置slaves，配置hadoop所有的从主机
```shell
[caixianquan@hadoop102 hadoop-2.7.2]$ vim etc/hadoop/slaves
删除localhost
在该文件中增加如下内容：
hadoop102
hadoop103
hadoop104
```
{% note warning %}
注意：该文件中添加的内容结尾不允许有空格，文件中不允许有空行。
{% endnote %}

2. 同步所有节点配置文件
```shell
[caixianquan@hadoop102 hadoop]$ xsync slaves
```

3. 启动集群
```shell
[caixianquan@hadoop102 hadoop-2.7.2]$ sbin/start-dfs.sh
[caixianquan@hadoop102 hadoop-2.7.2]$ jps
4166 NameNode
4482 Jps
4263 DataNode

----------------------------------------------------------
[caixianquan@hadoop103 hadoop-2.7.2]$ jps
3218 DataNode
3288 Jps

------------------------------------------------------------
[caixianquan@hadoop104 hadoop-2.7.2]$ jps
3221 DataNode
3283 SecondaryNameNode
3364 Jps
```

4. 启动YARN
```shell
[caixianquan@hadoop103 hadoop-2.7.2]$ sbin/start-yarn.sh
```
{% note warning %}
注意：NameNode和ResourceManger如果不是同一台机器，不能在NameNode上启动 YARN，应该在ResouceManager所在的机器上启动YARN。
{% endnote %}

### Web端查看SecondaryNameNode
（a）浏览器中输入：http://192.168.56.104:50090/status.html
（b）查看SecondaryNameNode信息，如图所示。
![查看SecondaryNameNode信息](6、查看SecondaryNameNode信息.png)

![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)

