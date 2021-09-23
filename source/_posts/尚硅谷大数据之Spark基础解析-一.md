---
title: 尚硅谷大数据之Spark基础解析(一)
date: 2020-08-08 17:22:38
tags: 
- 大数据
- spark
- spark运行模式
categories: 
- 大数据学习
- Spark
- 尚硅谷大数据之Spark学习
keywords: 
- 大数据
- spark
- spark运行模式
description: 从本章开始是学习尚硅谷的大数据技术之Spark---该笔记主要是了解Spark概述、运行模式以及安装方式。
cover:  /2020/08/08/尚硅谷大数据之Spark基础解析-一/尚硅谷大数据之Spark基础解析首页.jpg
---

# Spark概述
## 什么是Spark
### 定义
- Spark是一种基于<font color=red size=3>**内存**</font>的快速、通用、可扩展的大数据分析引擎。

### 历史
![Hadoop历史](1、Hadoop历史.png)
- MR的缺点．
 1. mr基于数据集的计算，所以面向数据
 2. 基本运算规则从存储介质中获取（采集）数据，然后进行计算，最后将结果存储到介质中，所以主要应用于一次性计算，不适合于数据挖掘和机器学习这样的迭代计算和图形挖掘计算。
 3. MR基于文件存储介质的操作，所以性能非常的慢
 4. MR和hadoop紧密耦合在一起，无法动态替换

- 2009年诞生于加州大学伯克利分校AMPLab，项目采用<font color=red size=3>**Scala编写**</font>。
- 2010年开源;
- 2013年6月成为Apache孵化项目(基于Hadoop问题，将资源和任务调度分开)
- 2014年2月成为Apache顶级项目。
![Spark历史](2、Spark历史.png)
- Yarn解决了MR和hadoop的耦合性过高问题，将MR作为yarn上的一个热插拔的组件。可以与其他组件一起使用。
- Spark将资源与计算分开来，降低耦合性，而没考虑是否能够替换组件问题。Yarn可以支持Spark的计算。
- 当使用Yarn和Spark时，master和worker就使用Yarn上的RM和NM
- Yarn是为了其他框架也可以使用，所以用了container，兼容性更好
- spark的资源调度框架就是为了自己使用，所以没有必要用container，效率更高
- 一般都是使用HDFS作为存储，Yarn作为资源的管理和调度，spark作为计算

### Hadoop MR框架和Spark框架
- spark框架中间结果不落盘，但是shuffle操作还是会落盘
- 支持迭代式计算，图形计算
![spark框架和Hadoop MR框架](36、spark框架和Hadoop MR框架.png)

## Spark内置模块
![spark内置模块](3、spark内置模块.png)
- <font color=red size=3>**Spark Core**</font>：实现了Spark的基本功能，包含任务调度、内存管理、错误恢复、与存储系统交互等模块。Spark Core中还包含了对弹性分布式数据集(Resilient Distributed DataSet，简称RDD)的API定义。 
- <font color=red size=3>**Spark SQL**</font>：是Spark用来操作结构化数据的程序包。通过Spark SQL，我们可以使用 SQL或者Apache Hive版本的SQL方言(HQL)来查询数据。Spark SQL支持多种数据源，比如Hive表、Parquet以及JSON等。 
- <font color=red size=3>**Spark Streaming**</font>：是Spark提供的对实时数据进行流式计算的组件。提供了用来操作数据流的API，并且与Spark Core中的 RDD API高度对应。 
- <font color=red size=3>**Spark MLlib**</font>：提供常见的机器学习(ML)功能的程序库。包括分类、回归、聚类、协同过滤等，还提供了模型评估、数据 导入等额外的支持功能。 
- <font color=red size=3>**Spark GraphX**</font>：主要用于图形并行计算和图挖掘系统的组件。
- <font color=red size=3>**集群管理器**</font>：Spark 设计为可以高效地在一个计算节点到数千个计算节点之间伸缩计 算。为了实现这样的要求，同时获得最大灵活性，Spark支持在各种集群管理器(Cluster Manager)上运行，包括Hadoop YARN、Apache Mesos【国外使用比较多】，以及Spark自带的一个简易调度器，叫作独立调度器。 

 Spark得到了众多大数据公司的支持，这些公司包括Hortonworks、IBM、Intel、Cloudera、MapR、Pivotal、百度、阿里、腾讯、京东、携程、优酷土豆。当前百度的Spark已应用于大搜索、直达号、百度大数据等业务；阿里利用GraphX构建了大规模的图计算和图挖掘系统，实现了很多生产系统的推荐算法；腾讯Spark集群达到8000台的规模，是当前已知的世界上最大的Spark集群。

## Spark特点
1. <font color=red size=3>**快**</font>：与Hadoop的MapReduce相比，Spark基于<font color=red size=3>**内存**</font>的运算要<font color=red size=3>**快100倍以上**</font>，基于<font color=red size=3>**硬盘**</font>的运算也要<font color=red size=3>**快10倍**</font>以上。Spark实现了高效的DAG（有向无环图）执行引擎，可以通过基于内存来高效处理数据流。计算的中间结果是存在于内存中的。
2. <font color=red size=3>**易用**</font>：Spark支持<font color=red size=3>**Java、Python和Scala的API**</font>，还支持超过80种高级算法，使用户可以快速构建不同的应用。而且Spark支持交互式的Python和Scala的Shell，可以非常方便地在这些Shell中使用Spark集群来验证解决问题的方法。
3. <font color=red size=3>**通用**</font>：Spark提供了统一的解决方案。Spark可以用于，交互式查询（<font color=red size=3>**Spark SQL**</font>）、实时流处理（<font color=red size=3>**Spark Streaming**</font>）、机器学习（<font color=red size=3>**Spark MLlib**</font>）和图计算（<font color=red size=3>**GraphX**</font>）。这些不同类型的处理都可以在同一个应用中无缝使用。减少了开发和维护的人力成本和部署平台的物力成本。
4. <font color=red size=3>**兼容性**</font>：Spark可以非常方便地与其他的开源产品进行融合。比如，Spark<font color=red size=3>**可以使用Hadoop的YARN**</font>和Apache Mesos作为它的资源管理和调度器，并且可以<font color=red size=3>**处理所有Hadoop支持的数据**</font>，包括HDFS、HBase等。这对于已经部署Hadoop集群的用户特别重要，因为不需要做任何数据迁移就可以使用Spark的强大处理能力。


# Spark运行模式
## Spark安装地址
- 官网地址
http://spark.apache.org/
- 文档查看地址
https://spark.apache.org/docs/2.1.1/
- 下载地址
https://spark.apache.org/downloads.html

## 重要角色
### Driver（驱动器）【管理者】
Spark的驱动器是执行开发程序中的main方法的进程。它负责开发人员编写的用来创建SparkContext、创建RDD，以及进行RDD的转化操作和行动操作代码的执行。如果你是用spark shell，那么当你启动Spark shell的时候，系统后台自启了一个Spark驱动器程序，就是在Spark shell中预加载的一个叫作 sc的SparkContext对象。如果驱动器程序终止，那么Spark应用也就结束了。主要负责：
1. 把用户程序转为作业（JOB）
2. 跟踪Executor的运行状况
3. 为执行器节点调度任务
4. UI展示应用运行状况

### Executor（执行器）
Spark Executor是一个工作进程，负责在 Spark 作业中运行任务，任务间相互独立。Spark 应用启动时，Executor节点被同时启动，并且始终伴随着整个 Spark 应用的生命周期而存在。如果有Executor节点发生了故障或崩溃，Spark 应用也可以继续执行，会将出错节点上的任务调度到其他Executor节点上继续运行。主要负责：
1. 负责运行组成 Spark 应用的任务，并将结果返回给驱动器进程；
2. 通过自身的块管理器（Block Manager）为用户程序中要求缓存的RDD提供内存式存储。RDD是直接缓存在Executor进程内的，因此任务可以在运行时充分利用缓存数据加速运算。

## Local模式

### 概述
1. Local模式就是运行在<font color=red size=3>**一台计算机上的模式**</font>，通常就是用于在本机上练手和测试。它可以通过以下集中方式设置Master。

2. local: 所有计算都运行在一个线程当中，没有任何并行计算，通常我们在本机执行一些测试代码，或者练手，就用这种模式;

3. local[K]: 指定使用几个线程来运行计算，比如local[4]就是运行4个Worker线程。<font color=red size=3>**通常我们的Cpu有几个Core，就指定几个线程**</font>，最大化利用Cpu的计算能力;

4. `local[*]`: 这种模式直接帮你按照Cpu最多Cores来设置线程数了。


### 安装使用
1. 上传并解压spark安装包
```shell
[caixianquan@hadoop102 sorfware]$ tar -zxvf spark-2.1.1-bin-hadoop2.7.tgz -C /opt/module/
[caixianquan@hadoop102 module]$ mv spark-2.1.1-bin-hadoop2.7 spark
```
2. 官方求PI案例
【反斜杠 \ 表示连接，太长换行】
```shell
[caixianquan@hadoop102 spark]$ bin/spark-submit \
--class org.apache.spark.examples.SparkPi \
--master local[2] \
./examples/jars/spark-examples_2.11-2.1.1.jar \
100
```
{% note info %}
（1）基本语法
```shell
bin/spark-submit \
--class <main-class>
--master <master-url> \
--deploy-mode <deploy-mode> \
--conf <key>=<value> \
# other options
<application-jar> \
[application-arguments]
```
（2）参数说明：
```shell
--master 指定Master的地址，默认为Local
--class: 表示要执行的的主类 (如 org.apache.spark.examples.SparkPi)
--deploy-mode: 是否发布你的驱动到worker节点(cluster) 或者作为一个本地客户端 (client) (default: client)*
--conf: 任意的Spark配置属性， 格式key=value. 如果值包含空格，可以加引号“key=value” 
application-jar: 打包好的应用jar,包含依赖. 这个URL在集群中全局可见。 比如hdfs:// 共享存储系统， 如果是 file:// path， 那么所有的节点的path都包含同样的jar
application-arguments: 传给main()方法的参数
--executor-memory 1G 指定每个executor可用内存为1G
--total-executor-cores 2 指定每个executor使用的cup核数为2个
```
{% endnote %}

3. 结果展示
该算法是利用蒙特·卡罗算法求PI【<font color=red size=3>**后面的100是传入的参数，计算100次**</font>】
![蒙特·卡罗算法](4、蒙特·卡罗算法.png)

4. 准备文件
```shell
[caixianquan@hadoop102 spark]$ mkdir input
```
在input下创建文件1.txt和2.txt，并输入以下内容
|1.txt|2.txt|
|:-|:-|
|Hello World<br>Hello Spark|Hello Spark|

5. 启动spark-shell
```shell
[caixianquan@hadoop102 spark]$ bin/spark-shell
Using Spark's default log4j profile: org/apache/spark/log4j-defaults.properties
Setting default log level to "WARN".
To adjust logging level use sc.setLogLevel(newLevel). For SparkR, use setLogLevel(newLevel).
18/09/29 08:50:52 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
18/09/29 08:50:58 WARN ObjectStore: Failed to get database global_temp, returning NoSuchObjectException
Spark context Web UI available at http://192.168.9.102:4040
Spark context available as 'sc' (master = local[*], app id = local-1538182253312).
Spark session available as 'spark'.
Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /___/ .__/\_,_/_/ /_/\_\   version 2.1.1
      /_/
         
Using Scala version 2.11.8 (Java HotSpot(TM) 64-Bit Server VM, Java 1.8.0_144)
Type in expressions to have them evaluated.
Type :help for more information.

scala>
```
{% note primary %}
注意：sc是SparkCore程序的入口；spark是SparkSQL程序入口；`master = local[*]`表示本地模式运行。
{% endnote %}
开启另一个CRD窗口

```shell
[caixianquan@hadoop102 spark]$ jps
3627 SparkSubmit
4047 Jps
```
可登录hadoop102:4040查看程序运行
![查看程序运行](5、查看程序运行.png)


###  运行WordCount程序
```scala
scala>sc.textFile("input").flatMap(_.split(" ")).map((_,1)).reduceByKey(_+_).collect
res0: Array[(String, Int)] = Array((Hello,3), (World,1), (Scala,1), (Spark,1))

scala>
```
<font color=red size=3>**可登录hadoop102:4040查看程序运行**</font>
![查看WordCount程序](6、查看WordCount程序.png)

- WordCount程序分析

提交任务分析：
![WordCount程序分析](7、WordCount程序分析.png)
数据流分析：

textFile("input")：读取本地文件input文件夹数据；
flatMap(_.split(" "))：压平操作，按照空格分割符将一行数据映射成一个个单词；
map((_,1))：对每一个元素操作，将单词映射为元组；
reduceByKey(_+_)：按照key将值进行聚合，相加；
collect：将数据收集到Driver端展示。
![wordCount代码分析](8、wordCount代码分析.png)

## Standalone模式
### 概述
构建一个由Master+Slave构成的Spark集群，Spark运行在集群中。
![Standalone运行模式](9、Standalone运行模式.png)

### 安装使用
1. 进入spark安装目录下的conf文件夹
```shell
[atguigu@hadoop102 module]$ cd spark/conf/
```
2. 修改配置文件名称
```shell
[atguigu@hadoop102 conf]$ mv slaves.template slaves
[atguigu@hadoop102 conf]$ mv spark-env.sh.template spark-env.sh
```
3. 修改slave文件，添加work节点：
```shell
[atguigu@hadoop102 conf]$ vim slaves

hadoop102
hadoop103
hadoop104
```
4. 修改spark-env.sh文件，添加如下配置：
```shell
[atguigu@hadoop102 conf]$ vim spark-env.sh

SPARK_MASTER_HOST=hadoop102
SPARK_MASTER_PORT=7077
```
5. 分发spark包
```shell
[atguigu@hadoop102 module]$ xsync spark/
```

6. 启动
```shell
[atguigu@hadoop102 spark]$ sbin/start-all.sh
[atguigu@hadoop102 spark]$ util.sh 
================atguigu@hadoop102================
3330 Jps
3238 Worker
3163 Master
================atguigu@hadoop103================
2966 Jps
2908 Worker
================atguigu@hadoop104================
2978 Worker
3036 Jps
```
<font color=red size=3>**网页查看：hadoop102:8080**</font>
{% note primary %}
注意：如果遇到 “JAVA_HOME not set” 异常，可以在sbin目录下的spark-config.sh 文件中加入如下配置：
export JAVA_HOME=XXXX
{% endnote %}

7. 官方求PI案例
```shell
[atguigu@hadoop102 spark]$ bin/spark-submit \
--class org.apache.spark.examples.SparkPi \
--master spark://hadoop102:7077 \
--executor-memory 1G \
--total-executor-cores 2 \
./examples/jars/spark-examples_2.11-2.1.1.jar \
100
```
![官方程序运行结果](10、官方程序运行结果.png)

8. 启动spark shell
```shell
/opt/module/spark/bin/spark-shell \
--master spark://hadoop102:7077 \
--executor-memory 1g \
--total-executor-cores 2
```

参数：`--master spark://hadoop102:7077`指定要连接的集群的master
执行WordCount程序
```scala
scala>sc.textFile("input").flatMap(_.split(" ")).map((_,1)).reduceByKey(_+_).collect
res0: Array[(String, Int)] = Array((hadoop,6), (oozie,3), (spark,3), (hive,3), (atguigu,3), (hbase,6))

scala>
```


### JobHistoryServer配置
1. 修改spark-default.conf.template名称
```shell
[atguigu@hadoop102 conf]$ mv spark-defaults.conf.template spark-defaults.conf
```

2. 修改spark-default.conf文件，开启Log：
<font color=red size=3>**注意：HDFS上的目录需要提前存在。**</font>
```shell
[atguigu@hadoop102 conf]$ vi spark-defaults.conf
spark.eventLog.enabled           true
spark.eventLog.dir               hdfs://hadoop102:9000/directory

[atguigu@hadoop102 hadoop]$ hadoop fs –mkdir /directory
```

3. 修改spark-env.sh文件，添加如下配置：
```shell
[atguigu@hadoop102 conf]$ vi spark-env.sh

export SPARK_HISTORY_OPTS="-Dspark.history.ui.port=18080 
-Dspark.history.retainedApplications=30 
-Dspark.history.fs.logDirectory=hdfs://hadoop102:9000/directory"
```
 <font color=red size=3>**参数描述：**</font>
 1. spark.eventLog.dir：Application在运行过程中所有的信息均记录在该属性指定的路径下； 
 2. spark.history.ui.port=18080  WEBUI访问的端口号为18080
 3. spark.history.fs.logDirectory=hdfs://hadoop102:9000/directory  配置了该属性后，在start-history-server.sh时就无需再显式的指定路径，Spark History Server页面只展示该指定路径下的信息
 4. spark.history.retainedApplications=30指定保存Application历史记录的个数，如果超过这个值，旧的应用程序信息将被删除，这个是内存中的应用数，而不是页面上显示的应用数。

4. 分发配置文件
```shell
[atguigu@hadoop102 conf]$ xsync spark-defaults.conf
[atguigu@hadoop102 conf]$ xsync spark-env.sh
```
5. 启动历史服务
```shell
[atguigu@hadoop102 spark]$ sbin/start-history-server.sh
```
6. 再次执行任务
```shell
[atguigu@hadoop102 spark]$ bin/spark-submit \
--class org.apache.spark.examples.SparkPi \
--master spark://hadoop102:7077 \
--executor-memory 1G \
--total-executor-cores 2 \
./examples/jars/spark-examples_2.11-2.1.1.jar \
100
```
7. 查看历史服务
hadoop102:18080
![查看历史服务](11、查看历史服务.png)


### HA配置
![HA架构图](12、HA架构图.png)

- zookeeper正常安装并启动
- 修改spark-env.sh文件添加如下配置：
```shell
[atguigu@hadoop102 conf]$ vi spark-env.sh
```
注释掉如下内容：
```shell
#SPARK_MASTER_HOST=hadoop102
#SPARK_MASTER_PORT=7077
添加上如下内容：
export SPARK_DAEMON_JAVA_OPTS="
-Dspark.deploy.recoveryMode=ZOOKEEPER 
-Dspark.deploy.zookeeper.url=hadoop102,hadoop103,hadoop104 
-Dspark.deploy.zookeeper.dir=/spark"
```

- 分发配置文件
```shell
[atguigu@hadoop102 conf]$ xsync spark-env.sh
```
- 在hadoop102上启动全部节点
```shell
[atguigu@hadoop102 spark]$ sbin/start-all.sh
```

- 在hadoop103上单独启动master节点【<font color=red size=3>**注意是在hadoop103上**</font>】
```shell
[atguigu@hadoop103 spark]$ sbin/start-master.sh
```

- spark HA集群访问
```shell
/opt/module/spark/bin/spark-shell \
--master spark://hadoop102:7077,hadoop103:7077 \
--executor-memory 2g \
--total-executor-cores 2
```


## Yarn模式（重点）
### 概述
Spark客户端直接连接Yarn，不需要额外构建Spark集群。有yarn-client和yarn-cluster两种模式，<font color=red size=3>**主要区别在于：Driver程序的运行节点。**</font>

- yarn-client：Driver程序运行在客户端，适用于交互、调试，希望立即看到app的输出
- yarn-cluster：Driver程序运行在由RM（ResourceManager）启动的AP（APPMaster）适用于生产环境。
![Yarn运行模式](30、Yarn运行模式.png)
![YarnClient模式任务提交流程](31、YarnClient模式任务提交流程.png)
{% note primary %}
申请资源：ApplicationMaster不清楚哪些节点的资源可以使用，所以需要向RM申请资源
{% endnote %}


### 安装使用
- <font color=red size=3>**和历史日志服务一起配置，不用分开**</font>
- 修改hadoop配置文件yarn-site.xml,添加如下内容：
{% note primary %}
因为测试环境虚拟机内存较少，防止执行过程进行被意外杀死，做如下配置
{% endnote %}
```xml
[caixianquan@hadoop102 hadoop]$ vi yarn-site.xml
        <!--是否启动一个线程检查每个任务正使用的物理内存量，如果任务超出分配值，则直接将其杀掉，默认是true -->
        <property>
                <name>yarn.nodemanager.pmem-check-enabled</name>
                <value>false</value>
        </property>
        <!--是否启动一个线程检查每个任务正使用的虚拟内存量，如果任务超出分配值，则直接将其杀掉，默认是true -->
        <property>
                <name>yarn.nodemanager.vmem-check-enabled</name>
                <value>false</value>
        </property>
```
- 修改spark-env.sh，添加如下配置：
其中/spark/history必须得在hdfs上先建，`hadoop fs -mkdir -p /spark/history`
```shell
[caixianquan@hadoop102 conf]$ vi spark-env.sh
#spark.history.fs.cleaner.enabled 默认为false
#这个参数指定history-server的日志是否定时清除，true为定时清除，false为不清除。这个值一定设置成true啊，不然日志文件会越来越大。

#spark.history.fs.cleaner.interval 默认值为1d
#这个参数指定history-server的日志检查间隔，默认每一天会检查一下日志文件

#spark.history.fs.cleaner.maxAge 默认值为7d
#这个参数指定history-server日志生命周期，当检查到某个日志文件的生命周期为7d时，则会删除该日志文件
#spark.history.retainedApplications 　默认值：50
#在内存中保存Application历史记录的个数，如果超过这个值，旧的应用程序信息将被删除，当再次访问已被删除的应用信息时需要重新构建页面。
export JAVA_HOME=/opt/module/jdk1.8
export YARN_CONF_DIR=/opt/module/hadoop-2.7.2/etc/hadoop
export SPARK_HISTORY_OPTS="-Dspark.history.ui.port=18080 
-Dspark.history.ui.port=18080 -Dspark.history.fs.cleaner.enabled=true
-Dspark.history.fs.cleaner.interval=1d
-Dspark.history.fs.cleaner.maxAge=7d
-Dspark.history.retainedApplications=50
-Dspark.history.fs.logDirectory=hdfs://hadoop101:9000/spark/history"
```

- 修改配置文件spark-defaults.conf
添加如下内容：
```shell
spark.yarn.historyServer.address=hadoop102:18080
spark.history.ui.port=18080
spark.eventLog.enabled           true
spark.eventLog.dir               hdfs://hadoop101:9000/spark/history
```
- 分发配置文件
```shell
[caixianquan@hadoop102 conf]$ xsync /opt/module/hadoop-2.7.2/etc/hadoop/yarn-site.xml
[caixianquan@hadoop102 conf]$ xsync spark-env.sh
[caixianquan@hadoop102 conf]$ xsync spark-defaults.conf
```
- 执行一个程序
```shell
[caixianquan@hadoop102 spark]$ bin/spark-submit \
--class org.apache.spark.examples.SparkPi \
--master yarn \
--deploy-mode client \
./examples/jars/spark-examples_2.11-2.1.1.jar \
100
```
<font color=red size=3>**注意：在提交任务之前需启动HDFS以及YARN集群。**</font>


### 日志查看
- 启动spark历史服务
```shell
[caixianquan@hadoop102 spark]$ sbin/stop-history-server.sh 
stopping org.apache.spark.deploy.history.HistoryServer
[caixianquan@hadoop102 spark]$ sbin/start-history-server.sh 
starting org.apache.spark.deploy.history.HistoryServer, logging to /opt/module/spark/logs/spark-atguigu-org.apache.spark.deploy.history.HistoryServer-1-hadoop102.out
```
- 提交任务到Yarn执行
```shell
[caixianquan@hadoop102 spark]$ bin/spark-submit \
--class org.apache.spark.examples.SparkPi \
--master yarn \
--deploy-mode client \
./examples/jars/spark-examples_2.11-2.1.1.jar \
100
```
- Web页面查看日志
<font color=red size=3>**hadoop102:18080**</font>
![web页面查看日志](32、web页面查看日志.png)
{% asset_img 32、web页面查看日志1.png %}


# 案例实操
## 编写WordCount程序
### 创建一个Maven项目WordCount并导入依赖
```xml
<dependencies>
    <dependency>
        <groupId>org.apache.spark</groupId>
        <artifactId>spark-core_2.11</artifactId>
        <version>2.1.1</version>
    </dependency>
</dependencies>
<build>
        <finalName>WordCount</finalName>
        <plugins>
<plugin>
                <groupId>net.alchim31.maven</groupId>
<artifactId>scala-maven-plugin</artifactId>
                <version>3.4.6</version>
                <executions>
                    <execution>
                       <goals>
                          <goal>compile</goal>
                          <goal>testCompile</goal>
                       </goals>
                    </execution>
                 </executions>
            </plugin>
        </plugins>
</build>
```
{% note primary %}
注意：如果maven版本为3.2.x，插件下载报错，那么修改插件版本为3.3.2
{% endnote %}


### 编写代码
```scala
package com.atguigu

import org.apache.spark.{SparkConf, SparkContext}

object WordCount{

  def main(args: Array[String]): Unit = {

//1.创建SparkConf并设置App名称
    val conf = new SparkConf().setAppName("WC")

//2.创建SparkContext，该对象是提交Spark App的入口
    val sc = new SparkContext(conf)

    //3.使用sc创建RDD并执行相应的transformation和action
    sc.textFile(args(0)).flatMap(_.split(" ")).map((_, 1)).reduceByKey(_+_, 1).sortBy(_._2, false).saveAsTextFile(args(1))

//4.关闭连接
    sc.stop()
  }
}
```


### 打包插件
```xml
<plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-assembly-plugin</artifactId>
                <version>3.0.0</version>
                <configuration>
                    <archive>
                        <manifest>
                            <mainClass>WordCount</mainClass>
                        </manifest>
                    </archive>
                    <descriptorRefs>
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                </configuration>
                <executions>
                    <execution>
                        <id>make-assembly</id>
                        <phase>package</phase>
                        <goals>
                            <goal>single</goal>
                        </goals>
                    </execution>
                </executions>
</plugin>
```


### 打包到集群测试
#### 通过Project Structure方式打包

<font color=red size=3>**以下为示例**</font>
![Project Structure方式打包](13、Project-Structure方式打包.png)
1. 如下图所示，选中需要打包的模块，右键点击，即会出现如下图所示的内容，点击Open Module Settings。
![Open Module Settings](22、Open-Module-Settings.png)
![Project-Structure页面](14、Project-Structure页面.png)
2. 打jar包有两种，一种是依赖jar包，Empty选项，另一种是可执行jar包，第二个选项：from modules with dependencies，会一起打包所需要的依赖jar包
![打包所需要的依赖jar包](15、打包所需要的依赖jar包.png)
![设置主类](16、设置主类.png)
3. 选择需要打jar的module
![选择需要打jar的module](17、选择需要打jar的module.png)
4. 选择主类
![选择主类](18、选择主类.png)
{% asset_img 19、选择主类1.png %}
{% asset_img 20、选择主类2.png %}
5. 将一些资源配置文件放在resources文件夹中
![example](21、资源配置位置.png)
{% asset_img 23、查看资源配置位置.png %}
6. 点击OK，点击Apply，点击OK即可
7. 配置环境之后就可以开始打jar包，如下
![开始打jar包](24、开始打jar包.png)
{% asset_img 25、开始打jar包1.png %}
8. 选择build，构建，成功会有如下提示
![打包成功](26、打包成功.png)
9. 这个文件夹就包含了程序所需的所有依赖jar包
![查看生成的目录](27、查看生成的目录.png)
{% asset_img 28、查看生成的目录1.png %}
10. 将该文件夹放入到linux中
![将jar包放入linux中](29、将jar包放入linux中.png)

#### 在yarn上运行程序
```shell
bin/spark-submit \
--class WordCount \
--master spark://hadoop102:7077 \
WordCount.jar \
/word.txt \
/out
```


## 本地调试
- 本地Spark程序调试需要使用local提交模式，即将本机当做运行环境，Master和Worker都为本机。运行时直接加断点调试即可。如下：
创建SparkConf的时候设置额外属性，表明本地执行：
```scala
val conf = new SparkConf().setAppName("WC").setMaster("local[*]")
```
- 如果本机操作系统是windows，如果在程序中使用了hadoop相关的东西，比如写入文件到HDFS，则会遇到如下异常：
![本地运行spark程序报错](33、本地运行spark程序报错.png)
- 出现这个问题的原因，并不是程序的错误，而是用到了hadoop相关的服务，解决办法是将附加里面的hadoop-common-bin-2.7.3-x64.zip解压到任意目录。
![hadoop目录](34、hadoop目录.png)
- 在IDEA中配置Run Configuration，添加HADOOP_HOME变量
![idea添加HADOOP_HOME变量](35、idea添加HADOOP_HOME变量.png)
