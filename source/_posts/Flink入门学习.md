---
title: Flink入门学习
date: 2020-12-13 18:21:57
tags:
- flink
- 大数据
categories:
- 大数据学习
- 尚硅谷大数据之Flink学习
keywords:
- flink
- 大数据
description: 学习尚硅谷Flink视频，总结Flink知识点，入门学习
cover: /2020/12/13/Flink入门学习/Flink入门学习首页.png
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

# Flink简介
## 大数据框架的发展历程
![大数据框架的发展历程](1、大数据框架的发展历程.png)
- Flink已经是一个实时计算框架，而spark中的spark Streaming其实还是一个伪实时的计算框架【处理数据一般在500ms以内,开窗口最小的窗口也需要500ms】，属于微批处理。

## 初识Flink
1. Flink项目的理念是：“<font color=red size=3>**Apache Flink是为分布式、高性能、随时可用以及准确的流处理应用程序打造的开源流处理框架**</font>”。
2. Apache Flink是一个框架和分布式处理引擎，用于对<font color=red size=3>**无界和有界数据流**</font>进行有<font color=red size=3>**状态**</font>计算。Flink被设计在所有常见的集群环境中运行，以内存执行速度和任意规模来执行计算。

### 选择Flink的理由
1. 流数据更真实地反映了我们的生活方式
2. 传统的数据架构是基于有限数据集的
3. 我们的目标
 - 低延迟【spark stream的延迟是秒级，Flink延迟是毫秒级】
 - 高吞吐【阿里每秒钟使用Flink处理4.6PB，双十一大屏】
 - 结果的准确性和良好的容错性【exactly-once】

### 哪些行业需要处理流数据
{% note primary %}
基本全部行业都需要流处理数据
{% endnote %}
1. 电商和市场营销
    - 数据报表、广告投放、业务流程需要
2. 物联网（IOT）
    - 传感器实时数据采集和显示、实时报警，交通运输业
3. 电信业
    - 基站流量调配
4. 银行和金融业
    - 实时结算和通知推送，实时检测异常行为

## Flink的重要特点
### 事件驱动型(Event-driven)
事件驱动型应用是一类具有状态的应用，它从一个或多个事件流提取数据，并根据到来的事件触发计算、状态更新或其他外部动作。比较典型的就是以kafka为代表的消息队列几乎都是事件驱动型应用。
- 与之不同的就是SparkStreaming微批次，如图：
![SparkStreaming微批次](2、SparkStreaming微批次.png)
- 事件驱动型：
![事件驱动型](3、事件驱动型.png)

### 流与批的世界观
1. **批处理**的特点是有界、持久、大量，非常适合需要访问全套记录才能完成的计算工作，一般用于离线统计。
2. **流处理**的特点是无界、实时,  无需针对整个数据集执行操作，而是对通过系统传输的每个数据项执行操作，一般用于实时统计。
    - 在**spark** 的世界观中，一切都是由批次组成的，离线数据是一个大批次，而实时数据是由一个一个无限的小批次组成的。
    - 而在**flink** 的世界观中，一切都是由流组成的，离线数据是有界限的流，实时数据是一个没有界限的流，这就是所谓的有界流和无界流。
3. **无界数据流**：无界数据流有一个开始但是没有结束，它们不会在生成时终止并提供数据，必须连续处理无界流，也就是说必须在获取后立即处理event。对于无界数据流我们无法等待所有数据都到达，因为输入是无界的，并且在任何时间点都不会完成。处理无界数据通常要求以特定顺序（例如事件发生的顺序）获取event，以便能够推断结果完整性。
4. **有界数据流**：有界数据流有明确定义的开始和结束，可以在执行任何计算之前通过获取所有数据来处理有界流，处理有界流不需要有序获取，因为可以始终对有界数据集进行排序，有界流的处理也称为批处理。
![有界和无界数据流](4、有界和无界数据流.png)
<font color=red size=3>**这种以流为世界观的架构，获得的最大好处就是具有极低的延迟。**</font>

### 分层api
![分层API](5、分层API.png)
1. 最底层级的抽象仅仅提供了有状态流，它将通过过程函数（Process Function）被嵌入到DataStream API中。底层过程函数（Process Function） 与 DataStream API 相集成，使其可以对某些特定的操作进行底层的抽象，它允许用户可以自由地处理来自一个或多个数据流的事件，并使用一致的容错的状态。除此之外，用户可以注册事件时间并处理时间回调，从而使程序可以处理复杂的计算。
2. 实际上，大多数应用并不需要上述的底层抽象，而是针对核心API（Core APIs） 进行编程，比如DataStream API（有界或无界流数据）以及DataSet API（有界数据集）。这些API为数据处理提供了通用的构建模块，比如由用户定义的多种形式的转换（transformations），连接（joins），聚合（aggregations），窗口操作（windows）等等。DataSet API 为有界数据集提供了额外的支持，例如循环与迭代。这些API处理的数据类型以类（classes）的形式由各自的编程语言所表示。
3. Table API 是以表为中心的声明式编程，其中表可能会动态变化（在表达流数据时）。Table API遵循（扩展的）关系模型：表有二维数据结构（schema）（类似于关系数据库中的表），同时API提供可比较的操作，例如select、project、join、group-by、aggregate等。Table API程序声明式地定义了什么逻辑操作应该执行，而不是准确地确定这些操作代码的看上去如何。
4. 尽管Table API可以通过多种类型的用户自定义函数（UDF）进行扩展，其仍不如核心API更具表达能力，但是使用起来却更加简洁（代码量更少）。除此之外，Table API程序在执行之前会经过内置优化器进行优化。
5. 你可以在表与 DataStream/DataSet 之间无缝切换，以允许程序将 Table API 与 DataStream 以及 DataSet 混合使用。
6. Flink提供的最高层级的抽象是 SQL 。这一层抽象在语法与表达能力上与 Table API 类似，但是是以SQL查询表达式的形式表现程序。SQL抽象与Table API交互密切，同时SQL查询可以直接在Table API定义的表上执行。
7. 目前Flink作为批处理还不是主流，不如Spark成熟，所以DataSet使用的并不是很多。Flink Table API和Flink SQL也并不完善，大多都由各大厂商自己定制。所以我们主要学习DataStream API的使用。实际上Flink作为最接近Google DataFlow模型的实现，是流批统一的观点，所以基本上使用DataStream就可以了。
8. Flink几大模块
    - Flink Table & SQL(还没开发完)
    - Flink Gelly(图计算)
    - Flink CEP(复杂事件处理)

### Flink的其他特点
1. 支持事件时间（event-time）和处理时间（processing-time）语义
2. 精确一次（exactly-once）的状态一致性保证
3. 低延迟，每秒处理数百万个事件，毫秒级延迟
4. 与众多常用存储系统的连接
5. 高可用，动态扩展，实现7\*24小时全天候运行

# wordCount程序
## 需求说明
1. 通过nc命令产生测试数据，flink监听端口，开启一个5s的滚动窗口，5s内统计一次wordcount

## 程序编写
{% note info %}
本项目使用的Flink版本为最新版本，也就是1.11.0。现在提供maven项目的配置文件。
{% endnote %}
1. 使用Intellij IDEA创建一个Maven新项目
2. 勾选`Create from archetype`，然后点击`Add Archetype`按钮
3. `GroupId`中输入`org.apache.flink`，`ArtifactId`中输入`flink-quickstart-scala`，`Version`中输入`1.11.0`，然后点击`OK`
4. 点击向右箭头，出现下拉列表，选中`flink-quickstart-scala:1.11.0`，点击`Next`
5. `Name`中输入`FlinkTutorial`，`GroupId`中输入`com.caixianquan`，`ArtifactId`中输入`FlinkTutorial`，点击`Next`
6. 最好使用IDEA默认的Maven工具：Bundled（Maven 3），点击`Finish`，等待一会儿，项目就创建好了
7. 新建一个scala文件：WordCount
```scala
package com.caixianquan

//导入一些隐式类型转换，implicit
import org.apache.flink.streaming.api.scala._
import org.apache.flink.streaming.api.windowing.time.Time

object WordCount {

  case class WordWithCount(word: String, count: Int)

  def main(args: Array[String]): Unit = {
    //获取运行时环境，类似SparkContext
    val env: StreamExecutionEnvironment = StreamExecutionEnvironment.getExecutionEnvironment
    //设置分区（并行任务）的数量为1
    env.setParallelism(1)

    //建立数据源
    //需要先启动`nc -lk 9999`, 用来发送数据
    val stream = env.socketTextStream("hadoop101", 9999, '\n')

    //写对流的转换处理逻辑
    val transformed = stream
    //使用空格切分输入的字符串
      .flatMap(line=> line.split("\\s"))
      //类似于MR中的map
      .map(w => WordWithCount(w, 1))
    //使用word字段进行分组， shuffle
      .keyBy("word")
    //开了一个5s钟的滚动窗口
      .timeWindow(Time.seconds(5))
      .sum("count")

    //将计算的结果输出到标准输出
    transformed.print()

    //执行计算逻辑
    env.execute()
  }
}

```

## pom文件修改
1. 自动生成的pom文件依赖包中都带有<scope>provided</scope>属性,该属性表示打包时不带上这些依赖包，环境已提供，故在运行程序时也需要注释掉该属性，程序才能正确调用依赖包
2. pom文件修改后内容
```xml
<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>org.example</groupId>
	<artifactId>FlinkTutorial</artifactId>
	<version>1.0-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>Flink Quickstart Job</name>

	<repositories>
		<repository>
			<id>apache.snapshots</id>
			<name>Apache Development Snapshot Repository</name>
			<url>https://repository.apache.org/content/repositories/snapshots/</url>
			<releases>
				<enabled>false</enabled>
			</releases>
			<snapshots>
				<enabled>true</enabled>
			</snapshots>
		</repository>
	</repositories>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<flink.version>1.11.0</flink.version>
		<scala.binary.version>2.11</scala.binary.version>
		<scala.version>2.11.12</scala.version>
		<log4j.version>2.12.1</log4j.version>
	</properties>

	<dependencies>
		<!-- Apache Flink dependencies -->
		<!-- These dependencies are provided, because they should not be packaged into the JAR file. -->
		<dependency>
			<groupId>org.apache.flink</groupId>
			<artifactId>flink-scala_${scala.binary.version}</artifactId>
			<version>${flink.version}</version>
<!--			<scope>provided</scope>-->
		</dependency>
		<dependency>
			<groupId>org.apache.flink</groupId>
			<artifactId>flink-streaming-scala_${scala.binary.version}</artifactId>
			<version>${flink.version}</version>
<!--			<scope>provided</scope>-->
		</dependency>
		<dependency>
			<groupId>org.apache.flink</groupId>
			<artifactId>flink-clients_${scala.binary.version}</artifactId>
			<version>${flink.version}</version>
<!--			<scope>provided</scope>-->
		</dependency>

		<!-- Scala Library, provided by Flink as well. -->
		<dependency>
			<groupId>org.scala-lang</groupId>
			<artifactId>scala-library</artifactId>
			<version>${scala.version}</version>
<!--			<scope>provided</scope>-->
		</dependency>

		<!-- Add connector dependencies here. They must be in the default scope (compile). -->

		<!-- Example:

		<dependency>
			<groupId>org.apache.flink</groupId>
			<artifactId>flink-connector-kafka_${scala.binary.version}</artifactId>
			<version>${flink.version}</version>
		</dependency>
		-->

		<!-- Add logging framework, to produce console output when running in the IDE. -->
		<!-- These dependencies are excluded from the application JAR by default. -->
		<dependency>
			<groupId>org.apache.logging.log4j</groupId>
			<artifactId>log4j-slf4j-impl</artifactId>
			<version>${log4j.version}</version>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.apache.logging.log4j</groupId>
			<artifactId>log4j-api</artifactId>
			<version>${log4j.version}</version>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.apache.logging.log4j</groupId>
			<artifactId>log4j-core</artifactId>
			<version>${log4j.version}</version>
			<scope>runtime</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<!-- We use the maven-shade plugin to create a fat jar that contains all necessary dependencies. -->
			<!-- Change the value of <mainClass>...</mainClass> if your program entry point changes. -->
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-shade-plugin</artifactId>
				<version>3.1.1</version>
				<executions>
					<!-- Run shade goal on package phase -->
					<execution>
						<phase>package</phase>
						<goals>
							<goal>shade</goal>
						</goals>
						<configuration>
							<artifactSet>
								<excludes>
									<exclude>org.apache.flink:force-shading</exclude>
									<exclude>com.google.code.findbugs:jsr305</exclude>
									<exclude>org.slf4j:*</exclude>
									<exclude>org.apache.logging.log4j:*</exclude>
								</excludes>
							</artifactSet>
							<filters>
								<filter>
									<!-- Do not copy the signatures in the META-INF folder.
									Otherwise, this might cause SecurityExceptions when using the JAR. -->
									<artifact>*:*</artifact>
									<excludes>
										<exclude>META-INF/*.SF</exclude>
										<exclude>META-INF/*.DSA</exclude>
										<exclude>META-INF/*.RSA</exclude>
									</excludes>
								</filter>
							</filters>
							<transformers>
								<transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
									<mainClass>com.caixianquan.WordCount</mainClass>
								</transformer>
							</transformers>
						</configuration>
					</execution>
				</executions>
			</plugin>

			<!-- Java Compiler -->
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.1</version>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
				</configuration>
			</plugin>

			<!-- Scala Compiler -->
			<plugin>
				<groupId>net.alchim31.maven</groupId>
				<artifactId>scala-maven-plugin</artifactId>
				<version>3.2.2</version>
				<executions>
					<execution>
						<goals>
							<goal>compile</goal>
							<goal>testCompile</goal>
						</goals>
					</execution>
				</executions>
				<configuration>
					<args>
						<arg>-nobootcp</arg>
					</args>
				</configuration>
			</plugin>
			<plugin>
				<groupId>org.codehaus.mojo</groupId>
				<artifactId>build-helper-maven-plugin</artifactId>
				<version>1.7</version>
				<executions>
					<!-- Add src/main/scala to eclipse build path -->
					<execution>
						<id>add-source</id>
						<phase>generate-sources</phase>
						<goals>
							<goal>add-source</goal>
						</goals>
						<configuration>
							<sources>
								<source>src/main/scala</source>
							</sources>
						</configuration>
					</execution>
					<!-- Add src/test/scala to eclipse build path -->
					<execution>
						<id>add-test-source</id>
						<phase>generate-test-sources</phase>
						<goals>
							<goal>add-test-source</goal>
						</goals>
						<configuration>
							<sources>
								<source>src/test/scala</source>
							</sources>
						</configuration>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
</project>

```

## 运行程序
1. 在监听的Linux主机上敲下命令：nc -lk 9999
2. idea运行程序
3. 在终端中输入字符串，观察程序输出
![查看程序运行结果](6、查看程序运行结果.png)

# Flink部署

{% note info %}
安装flink参考地址：https://www.caixianquan.tk/2020/11/16/大数据spark等组件搭建-三/
{% endnote %}

## Session Cluster提交任务
在yarn中初始化一个flink集群，开辟指定的资源，以后提交任务都向这里提交。这个flink集群会常驻在yarn集群中，除非手工停止。
1. 先启动hadoop集群
2. 启动flink集群
3. 启动yarn-session【在flink/bin下】：
```shell
./yarn-session.sh -n 2 -s 2 -jm 1024 -tm 1024 -nm test -d
```
其中：
- -n(--container)：TaskManager的数量。
- -s(--slots)：	每个TaskManager的slot数量，默认一个slot一个core，默认每个taskmanager的slot的个数为1，有时可以多一些taskmanager，做冗余。
- -jm：JobManager的内存（单位MB)。
- -tm：每个taskmanager的内存（单位MB)。
- -nm：yarn 的appName(现在yarn的ui上的名字)。 
- -d：后台执行。

4. 执行任务：
```shell
flink run  /opt/module/flink-1.10.0/examples/batch/WordCount.jar
```

## Per Job Cluster提交任务
```shell
flink run -m yarn-cluster /opt/module/flink-1.10.0/examples/batch/WordCount.jar
```

## 查看日志
1. Session Cluster模式下可以通过Yarn UI中的运行任务下的ApplicationMaster进入查看Flink任务管理页面；Job Cluster模式可以通过http://hadoop101:8081来访问任务
2. Session Cluster模式下只有停止所在的yarn任务才能够使用yarn logs 来收集taskmanager中的日志
3. Flink应用暂时无法打印自定义的log日志，只能只能通过print打印出来




# Flink运行架构
## Flink运行时组件

Flink运行时架构主要包括四个不同的组件，它们会在运行流处理应用程序时协同工作：作业管理器（JobManager）【类似于master】、资源管理器（ResourceManager）、任务管理器（TaskManager）【类似于slave】，以及分发器（Dispatcher）。因为Flink是用Java和Scala实现的，所以所有组件都会运行在Java虚拟机（JVMs）上。每个组件的职责如下：

1. 作业管理器（JobManager）是控制一个应用程序执行的主进程，也就是说，每个应用程序都会被一个不同的作业管理器所控制执行。
	- 作业管理器会先接收到要执行的应用程序。这个应用程序会包括：作业图（JobGraph）、逻辑数据流图（logical dataflow graph）和打包了所有的类、库和其它资源的JAR包。
	- 作业管理器会把JobGraph转换成一个物理层面的数据流图，这个图被叫做“执行图”（ExecutionGraph），包含了所有可以并发执行的任务。
	- 作业管理器会向资源管理器（ResourceManager）请求执行任务必要的资源，也就是任务管理器（TaskManager）上的插槽（slot）。一旦它获取到了足够的资源，就会将执行图分发到真正运行它们的TaskManager上。
	- 而在运行过程中，作业管理器会负责所有需要中央协调的操作，比如说检查点（checkpoints）的协调。

2. ResourceManager主要负责管理任务管理器（TaskManager）的插槽（slot）【类似spark中的分区】，TaskManger插槽是Flink中定义的处理资源单元。
	- Flink为不同的环境和资源管理工具提供了不同资源管理器（ResourceManager），比如YARN、Mesos、K8s，以及standalone部署。
	- 当作业管理器申请插槽资源时，ResourceManager会将有空闲插槽的TaskManager分配给作业管理器。如果ResourceManager没有足够的插槽来满足作业管理器的请求，它还可以向资源提供平台发起会话，以提供启动TaskManager进程的容器。
	- 另外，ResourceManager还负责终止空闲的TaskManager，释放计算资源。

3. 任务管理器（TaskManager）是Flink中的工作进程。
	- 通常在Flink中会有多个TaskManager运行，每一个TaskManager都包含了一定数量的插槽（slots）。插槽的数量限制了TaskManager能够执行的任务数量。
	- 启动之后，TaskManager会向资源管理器注册它的插槽；收到资源管理器的指令后，TaskManager就会将一个或者多个插槽提供给作业管理器调用。作业管理器就可以向插槽分配任务（tasks）来执行了。
	- 在执行过程中，一个TaskManager可以跟其它运行同一应用程序的TaskManager交换数据（比如shuffle）。任务的执行和插槽的概念会在“任务执行”一节做具体讨论。
	- 每一个任务管理器是一个JVM进程，每一个插槽是一个线程。

4. 分发器（Dispatcher）可以跨作业运行，它为应用提交提供了REST接口。
	- 当一个应用被提交执行时，分发器就会启动并将应用移交给一个作业管理器。由于是REST接口，所以Dispatcher可以作为集群的一个HTTP接入点，这样就能够不受防火墙阻挡。
	- Dispatcher也会启动一个Web UI，用来方便地展示和监控作业执行的信息。
	- Dispatcher在架构中可能并不是必需的，这取决于应用提交运行的方式。

## 任务提交流程（独立集群）
![独立集群的任务提交流程](9、独立集群的任务提交流程.png)
1. 程序的并行度设置为10，那么并行任务的数量就是10，作业管理器就会向资源管理器请求10个任务槽
![yarn形式的任务提交流程](10、yarn形式的任务提交流程.png)
![任务调度原理](11、任务调度原理.png)
![TaskManager和Slots](12、TaskManager和Slots.png)
1. Flink中每一个TaskManager都是一个JVM进程，每一个任务插槽都会启动一个线程，它可能会在独立的线程上执行一个或多个子任务【顺序执行】，每一个子任务占用一个任务插槽（Task slot）
2. 为了控制一个TaskManager能接收多少个task，TaskManager通过task slot 来进行控制（一个TaskManager至少有一个slot）
3. 默认情况下，Flink允许子任务共享slot，即使它们是不同任务的子任务。 这样的结果是，一个slot可以保存作业的整个管道。
4. Task Slot是静态的概念，是指TaskManager具有的并发执行能力 
![任务槽数量示例](13、任务槽数量示例.png)
- flink-conf.yaml中配置的任务槽是一个taskmanager有3个slot，而代码中的并行度设置为1，那么任务就只会启动一个slot来执行任务，而设置为2时，那么每一个算子就会在两个slot中执行
![任务槽占满例子](14、任务槽占满例子.png)
- 而如果设置并行度为9，那么三个taskmanager中的三个任务槽都会被占用执行
- 可以单独设置不同算子的并行度，比如sink设置为1，如Example4
- taskmanager安装在几个节点上就会启动多少个taskmanager进程，即可认为是节点的数量

## 程序与数据流（DataFlow）
![程序与数据流](15、程序与数据流.png)
1. 所有的Flink程序都是由三部分组成的：  Source 、Transformation 和 Sink。
2. Source 负责读取数据源，Transformation 利用各种算子进行处理加工，Sink 负责输出
3. 在运行时，Flink上运行的程序会被映射成“逻辑数据流”（dataflows），它包含了这三部分
4. 每一个dataflow以一个或多个sources开始以一个或多个sinks结束。dataflow类似于任意的有向无环图（DAG）
5. 在大部分情况下，程序中的转换运算（transformations）跟dataflow中的算子（operator）是一一对应的关系
![数据流有向无环图](16、数据流有向无环图.png)

## 执行图（ExecutionGraph）
1. Flink中的执行图可以分成四层：StreamGraph -> JobGraph -> ExecutionGraph -> 物理执行图
2. StreamGraph：是根据用户通过 Stream API编写的代码生成的最初的图。用来表示程序的拓扑结构。
3. JobGraph：StreamGraph在编译的阶段经过优化后生成了 JobGraph，提交给 JobManager 的数据结构。主要的优化为，将多个符合条件的节点 chain 在一起作为一个节点
4. ExecutionGraph：JobManager 根据 JobGraph 生成ExecutionGraph。ExecutionGraph是JobGraph的并行化版本，是调度层最核心的数据结构。
5. 物理执行图：JobManager根据ExecutionGraph对Job进行调度后，在各个TaskManager上部署Task后形成的“图”，并不是一个具体的数据结构。
![执行图转换](17、执行图转换.png)

## 并行度（Parallelism）
![并行度](18、并行度.png)
1. 一个特定算子的子任务（subtask）的个数被称之为其并行度（parallelism）。一般情况下，一个stream的并行度，可以认为就是其所有算子中最大的并行度。
2. 程序设置的并行度要小于或等于配置文件中设置的所有taskmanager的slot数量，否则程序会报错。

## 任务链（Operator Chains）
1. Flink采用了一种称为任务链的优化技术，可以在特定条件下减少本地通信的开销。为了满足任务链的要求，必须将两个或多个算子设为相同的并行度，并通过本地转发（local forward）的方式进行连接,即在同一个slot中执行任务。
2. 相同并行度的one-to-one操作，Flink这样相连的算子链接在一起形成一个task，原来的算子成为里面的subtask
3. <font color=red size=3>**并行度相同、并且是 one-to-one 操作，两个条件缺一不可**</font>
![任务链](19、任务链.png)

# Flink DataStream API
## 自定义数据源消费数据例子
1. 编写样例类
```scala
package com.caixianquan.learn2

/**
 * id: 传感器id
 * sensorTimestamp： 时间戳
 * temperature：温度值
 */


case class SensorReading(id: String,
                         sensorTimestamp: Long,
                         temperature: Double)
```

2. 编写自定义数据源
```scala
package com.caixianquan.learn2

import java.util.Calendar

import org.apache.flink.streaming.api.functions.source.SourceFunction.SourceContext
import org.apache.flink.streaming.api.functions.source.{RichParallelSourceFunction, SourceFunction}

import scala.util.Random

// 泛型是`SensorReading`，表明产生的流中的事件的类型是`SensorReading`
class SensorSource extends RichParallelSourceFunction[SensorReading] {
  // 表示数据源是否正常运行
  var running: Boolean = true

  // 上下文参数用来发出数据
  override def run(ctx: SourceContext[SensorReading]): Unit = {
    val rand = new Random

    var curFTemp = (1 to 10).map(
      // 使用高斯噪声产生随机温度值
      i => ("sensor_" + i, (rand.nextGaussian() * 20)) //高斯函数初始化温度值
    )

    // 产生无限数据流
    while (running) {
      curFTemp = curFTemp.map(
        t => (t._1, t._2 + (rand.nextGaussian() * 0.5))
      )

      // 产生ms为单位的时间戳
      val curTime = Calendar.getInstance.getTimeInMillis

      // 使用ctx参数的collect方法发射传感器数据
      curFTemp.foreach(t => ctx.collect(SensorReading(t._1, curTime, t._2)))

      // 每隔100ms发送一条传感器数据
      Thread.sleep(1000)
    }
  }

  // 定义当取消flink任务时，需要关闭数据源
  override def cancel(): Unit = running = false
}

```

3. main方法
```scala
package com.caixianquan.learn2

import org.apache.flink.streaming.api.scala._


object ConsumeFromSensorSource {
  def main(args: Array[String]): Unit = {
    val env = StreamExecutionEnvironment.getExecutionEnvironment
    env.setParallelism(1)
    
    //调用addSource方法
    val stream = env.addSource(new SensorSource)
    
    stream.print()
    
    env.execute()
  }

}

```
![输出结果](20、输出结果.png)

## 转换算子
1. 大部分函数接口被设计为Single Abstract Method（单独抽象方法）接口，并且接口可以使用Java 8匿名函数来实现。Scala DataStream API也内置了对匿名函数的支持。当讲解DataStream API的转换算子时，我们展示了针对所有函数类的接口，但为了简洁，大部分接口的实现使用匿名函数而不是函数类的方式。
2. 四类转换算子：
	- 基本转换算子：将会作用在数据流中的每一条单独的数据上。
	- KeyedStream转换算子：在数据有key的情况下，对数据应用转换算子。
	- 多流转换算子：合并多条流为一条流或者将一条流分割为多条流。
	- 分布式转换算子：将重新组织流里面的事件。

### 基本转换算子
1. map算子




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