---
title: 大数据spark等组件搭建(三)
date: 2020-11-16 10:27:35
tags:
- 组件部署
categories:
keywords:
- 组件部署
description: 大数据各个组件部署安装总结
cover: /2020/11/16/大数据spark等组件搭建-三/大数据spark等组件搭建-三首页.jpg
---

# Flink部署
## Standalone模式
### 安装
1. 解压缩: flink-1.10.0-bin-scala_2.11.tgz，进入conf目录中。
```shell
tar -zxvf flink-1.10.0-bin-scala_2.11.tgz
```
2. 修改 flink-1.10.0/conf/flink-conf.yaml 文件：
```shell
jobmanager.rpc.address: hadoop101
```

3. 修改 /conf/slaves文件：
```shell
hadoop101
hadoop102
hadoop103
```

4. 分发给另外两台机子：
```shell
xsync flink-1.10.0
```
5. 启动：
```shell
[root@hadoop101 ~]# /opt/module/flink-1.10.0/bin/start-cluster.sh 
Starting cluster.
Starting standalonesession daemon on host hadoop101.
Starting taskexecutor daemon on host hadoop102.
Starting taskexecutor daemon on host hadoop103.
```
![启动flink-Standalone模式](1、启动flink-Standalone模式.png)
访问http://hadoop101:8081可以对flink集群和任务进行监控管理。
![Flink集群管理页面](2、Flink集群管理页面.png)

6. 执行自带例子：
```shell
/opt/module/flink-1.10.0/bin/flink run   /opt/module/flink-1.10.0/examples/batch/WordCount.jar
```

## Flink on yarn模式
参考例子：[Flink On Yarn安装部署笔记（flink-1.10.0，Hadoop2.10.1）](https://www.cnblogs.com/quchunhui/p/12463455.html)
### 设置环境变量
```shell /etc/profile
#hadoop需要增加如下环境变量,可能会报错误： java.lang.ClassNotFoundException: org.apache.hadoop.yarn.exceptions.YarnException
export HADOOP_CONF_DIR=/opt/module/hadoop-2.7.2/etc/hadoop
export HADOOP_CLASSPATH=`hadoop classpath`

#FLINK_HOME
export FLINK_HOME=/opt/module/flink-1.10.0
export PATH=$PATH:$FLINK_HOME/bin
```
分发到其他节点并source该文件

### 导入对应flink集成对应的hadoop的jar包
要操作hdfs的话，必须要在flink安装目录的 lib 下加上额外的jar包
参考地址：https://ci.apache.org/projects/flink/flink-docs-release-1.8/release-notes/flink-1.8.html
测试集群hadoop为2.7.2，对应jar包为：flink-shaded-hadoop-2-uber-2.7.5-10.0.jar
下载地址：https://repo.maven.apache.org/maven2/org/apache/flink/flink-shaded-hadoop-2-uber/2.7.5-10.0/flink-shaded-hadoop-2-uber-2.7.5-10.0.jar

将该jar包导入到各个节点的flink的lib目录下

### yarn-site.xml配置
```shell  增加配置
<property>
<name>yarn.nodemanager.resource.memory-mb</name>
<value>10240</value>
</property>

<property>
<name>yarn.scheduler.minimum-allocation-mb</name>
<value>1024</value>
</property>

<property>
<name>yarn.scheduler.maximum-allocation-mb</name>
<value>10240</value>
</property>

<!-- 是否启动一个线程检查每个任务正使用的虚拟内存量，如果任务超出分配值，则直接将其杀掉，默认是true。由于使用虚拟机内存不够可能会报错，所以不启动 -->
<property>
<name>yarn.nodemanager.vmem-check-enabled</name>
<value>false></value>
</property>

<!-- 任务每使用1MB物理内存，最多可使用虚拟内存量 -->
<property>
<name>yarn.nodemanager.vmem-pmem-ratio</name>
<value>4</value>
</property>

```

### 启动
启动组件顺序：zookeeper集群【如果有】，hadoop 集群，历史服务器，Flink集群




![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)
![example](example.png)