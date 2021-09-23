---
title: jVM入门学习之内存与垃圾回收篇
date: 2021-02-14 23:22:30
tags: 
- JVM
- 大数据
- Java
categories: 
- 大数据学习
- JVM学习
- 尚硅谷--JVM从入门到精通
keywords: 
- JVM
- 大数据
- Java
description: 学习JVM从入门到精通视频总结知识笔记
cover: /2021/02/14/jVM入门学习之内存与垃圾回收篇/jVM入门学习之内存与垃圾回收篇首页.png
---


# JVM与Java体系结构
## 基本概念
1. 基于JDK1.8，该版本为LTS，长期支持
2. JVM在实际开发中处于底层，基于JVM运行程序
![JVM与应用程序的关系](1、JVM与应用程序的关系.png)
3. 如何看待上层框架
	- SSM、微服务等上层技术才是重点，基础技术并不重要--本末倒置
	- 核心类库的API比作数学公式，Java虚拟机的知识好比公式的推导过程
4. 中高级程序员必备技能
	- 项目管理、调优的需要
	- 追求极客的精神，比如垃圾回收算法、JIT、底层原理
5. 参考书籍
![参考书籍](2、参考书籍.png)
6. 主要以HotSpot(TM)为代表学习
7. java--跨平台语言，write once ，run anywhere
![跨平台语言](3、跨平台语言.png)
8. JVM--跨语言的平台
![跨语言的平台](4、跨语言的平台.png)
9. <font color=red size=3>**Java不是最强大的语言，但是JVM是最强大的虚拟机**</font>
10. java字节码指的是用java语言编译成的字节码。任何能在JVM平台上执行的字节码格式都是一样的，所以可以统称为JVM字节码
11. 虚拟机
	- visual box，vmare属于系统虚拟机，<font color=red size=3>**完全是对物理计算机的仿真**</font>
	- Java虚拟机，<font color=red size=3>**专门为执行单个计算程序而设计，在Java虚拟机中执行的指令称为Java字节码指令**</font>


## Java虚拟机
1. 作用：二进制字节码的运行环境
2. 特点：一次编译，到处运行；自动内存管理，自动垃圾回收功能
3. JVM的位置
![JVM的位置](5、JVM的位置.png)
![JDK体系架构](6、JDK体系架构.png)


## JVM的整体结构
![JVM的整体架构](7、JVM的整体架构.png)
![JVM架构详细图英文版](8、JVM架构详细图英.jpg)
![JVM架构详细图中文版](8、JVM架构详细图中.jpg)
{% note primary %}
上述为JVM的简图和详细图，熟记后方便于理解JVM原理
{% endnote %}
1. 多线程共享方法区和堆，每个线程自己拥有一份虚拟机栈（Java栈）、本地方法栈，程序计数器
2. 执行引擎分为解释器、JIT即时编译器（后端编译器，将字节码文件的字节码指令编译成机器指令，并将反复用到的机器指令缓存到内存中。class文件编译器为前端编译器），垃圾回收器三个部分，执行引擎实际就是将class字节码文件翻译成机器能够识别的机器语言文件
3. Java代码执行流程
![Java代码执行流程](9、Java代码执行流程.png)


## JVM的架构模型
1. Java编译器的指令集
	- 基于<font color=red size=3>**栈的指令集架构**</font>
		- 设计和实现简单，适用于资源受限的系统
		- 避开了寄存器的分配难题：使用零地址指令方式分配
		- 指令流中的指令大部分是零地址指令，其执行过程依赖于操作栈。指令集更小【8位】，编译器容易实现
		- 不需要硬件支持，可移植性更好，更好<font color=red size=3>**实现跨平台**</font>
	- 基于<font color=red size=3>**寄存器的指令集架构**</font>
		- 典型的应用是x86的二进制指令集：比如传统的PC以及Android的Davlik虚拟机
		- <font color=red size=3>**指令集架构则完全依赖硬件，可移植性差**</font>
		- <font color=red size=3>**性能优秀和执行更高效**</font>
		- 花费更少的指令去完成一项操作【16位指令集】
		- 在大部分情况下，基于寄存器架构的指令集往往都是以一地址指令、二地址指令和三地址指令为主，而基于栈式架构的指令集确实以零地址指令为主。
	![两种指令集架构举例说明](10、两种指令集架构举例说明.png)


## JVM的生命周期
1. 虚拟机的启动
	- Java虚拟机的启动是通过引导类加载器（bootstrap class loader）创建一个初始类（initial class）来完成，这个类是由虚拟机的具体实现指定。
2. 虚拟机的执行
	- 一个运行中的Java虚拟机有着一个清晰的任务：执行Java 程序。
	- 程序开始执行时他才运行，程序结束时他就停止。
	- <font color=red size=3>**执行一个所谓的Java程序的时候，真真正正在执行的是一个叫做Java虚拟机的进程。**</font>
3. 虚拟机的退出
	- 程序正常执行结束
	- 程序在执行过程中遇到了异常或错误而异常终止
	- 由于操作系统出现错误而导致Java虚拟机进程终止
	- 某线程调用 Runtime=类或 System类的exit方法，或 Runtime类的halt方法，并且Java安全管理器也允许这次exit或halt操作
	- 除此之外，JNI( Java Native Interface)规范描述了用JNI Invocation API来加载或卸载Java虚拟机时，Java虚拟机的退出情况。


## JVM发展历程
1. 第一款商用Java虚拟机--Sun Classic VM虚拟机，1.4版本被淘汰，只提供解释器，效率低下，逐行解释
2. 现在的执行引擎是解释器和JIT编译器同时工作，好比从A点到B点，JIT将字节码翻译成机器指令需要时间，就相当于等公交车，而解释器是逐行解释直接运行，好比做步行，那么换乘时需要等公交车，可以走一段到下个站点就可以坐公交，这样效率就高很多
3. Exact VM , jdk1.2  Exact Memory  Management:准确式内存管理，可以知道内存中某个位置的数据具体是什么类型
	- 具备现代高性能虚拟机的雏形：（1）热点探测；（2）编译器与解释器混合工作模式
4. HotSpot,JDK1.3,默认虚拟机
	- 独有的方法区概念
	- 名称中的 Hot Spot指的就是它的热点代码探测技术。
	- 通过计数器找到最具编译价值代码，触发即时编译或栈上替换
	- 通过编译器与解释器协同工作，在最优化的程序响应时间与最佳执行性能中取得平衡
5. BEA JRockit,专注于服务器端应用
	- 它可以不太关注程戶启动速度，因此 Jrockit内部不包含解析器实现，全部代码都靠即时编译器编译后执行。
	- 大量的行业基准测试显示， <font color=red size=3>**Jrockit JVM是世界上最快的JVM.**</font>
	- 使用 Jrockit产品，客户已经体验到了显著的性能提高(一些超过了70%)和硬件成本的减少(达50%).
	- 优势：全面的Java运行时解决方案组合
	- Jrockiti面向延迟敏感型应用的解决方案 Jrockit Rea1Time提供以毫秒或微秒级的JM响应时间，适合财务、军事指挥、电信网络的需要Missioncontro1服务套件，它是一组以极低的开销来监控、管理和分析生产
环境中的应用程序的工具。
	- 2008年，BEA被Orac1e收购
	- Oracle表达了整合两大优秀虛拟机的工作，大致在JDK8中完成。整合的方式是在Hotspotl的基础上，移植 Jrockitl的优秀特性
6. IBM J9
	- 全称： IBM Technology for Java Virtual Machine,简称IT4J,内部代号：J9
	- 市场定位与 Hotspot接近，服务器端、桌而应用、嵌入式等多用途VM
	- 广泛用于IBM的各种Java产品
	- 目前，<font color=red size=3>**有影响力的三大商用虚拟机之一**</font>，也号称是世界上最快的Java虚拟机(在IBM自己的产品上，通用性不如JRockit)。
	- 2017年左右，エBM发布了开源J9 VM,命名为 Open9,交给Ec1ipse基金会管理，也称为Ec1ipse OpenJ9
7. TaobaoJVM
	- 由A1iJVM团队发布。阿里，国内使用Java最强大的公司，覆盖云计算、金融、物流、电商等众多领域。
	- 基于 OpenJDK开发了自己的定制版本AliibabaJDK,简称AJDK。是整个阿里Java体系的基石
	- 基于 OPENJDK Hotspot VM发布的国内第一个优化、<font color=red size=3>**深度定制且开源的高性能服务器**</font>版Java虚拟机。
	- 创新的GCIH( GC invisible heap)技术实现了off-heap,<font color=red size=3>**即将生命周期较长的Java对象从heap中移到heap之外，并且GC不能管理GCIH内部的Java对象，以此达到降低GC的回收频率和提升GC的回收效率的目的。**</font>
	- GCIH中的<font color=red size=3>**对象还能够在多个Java虚拟机进程中实现共享**</font>
	- 使用crc32指令实现 JVM intrinsic降低JNI的调用开销
	- PMU hardware的 Java profiling too1和诊断协助功能
	- 针对大数据场景的ZenGC
	- taobao vm应用在阿里产品上性能高，硬件严重依赖 intel的cpu,损失了兼容性，但提高了性能
	- 目前己经在淘宝、天猫上线，把 oracle官方JWM版本全部替换了。


## 类加载子系统(类的加载过程)
![类加载器三个阶段](11、类加载器三个阶段.png)
1. 加载、链接（Linking）、初始化


### 类加载器子系统作用
1. 类加载器子系统负责从文件系统或者网络中加载class文件，class文件在文件开头有特定的文件标识。
2. ClassLoader只负责class文件的加载，至于它是否可以运行，则由Execution Enginer决定
3. 加载的类信息存放于一块称为方法区的内存空间。除了类的信息外，方法区中还会存放运行时常量池信息，可能还包括字符串字面量和数字常量（这部分常量信息是Class文件中常量池部分的内存映射）
	- 类加载器举例说明：
![类的加载过程](12、类的加载过程.jpg)
![类加载器ClassLoader角色](12、类加载器ClassLoader角色.png)


### 加载阶段
1. 通过一个类的全限定名获取定义此类的二进制字节流
2. 将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构
3. <font color=red>**在内存中生成一个代表这个类的java.1ang.C1as对象**</font>，作为方法区这个类的各种数据的访问入口
{% note info %}
补充：加载.class文件的方式
- 从本地系统中直接加载
- 通过网络获取，典型场景：Web Applet
- 从zip压缩包中读取，成为日后jar、war格式的基础
- 运行时计算生成，使用最多的是：动态代理技术
- 由其他文件生成，典型场景：JSP应用
- 从专有数据库中提取.class文件，比较少见
- 从加密文件中获取，典型的防Class文件被反编译的保护措施
{% endnote %}


### 链接阶段
1. 验证（Vejrify）：
	- 目的在于确保Class文件的字节流中包含信息符合当前虚拟机要求，保证被加载类的正确性，不会危害虚拟机自身安全。
	- 主要包括四种验证，文件格式验证，元数据验证，字节码验证，符号引用验证。
2. 准备（Prepare）：
	- 为类变量分配内存并且设置该类变量的默认初始值，即零值。
	- <font color=blue>**这里不包含用final修饰的static，因为final在编译的时候就会分配了，准备阶段会显式初始化；**</font>
	- <font color=blue>**这里不会为实例变量分配初始化**</font>，类变量会分配在方法区中，而实例变量是会随着对象一起分配到Java堆中。
3. 解析（Resolve）：
	- 将常量池内的符号引用转换为直接引用的过程。
	- 事实上，解析操作往往会伴随着JVM在执行完初始化之后再执行。
	- 符号引用就是一组符号来描述所引用的目标。符号引用的字面量形式明确定义在《java虚拟机规范》的Class文件格式中。直接引用就是直接指向目标的指针、相对偏移量或一个间接定位到目标的句柄。
	- 解析动作主要针对类或接口、字段、类方法、接口方法、方法类型等。对应常量池中的CONSTANT_Class_info、CONSTANT_Fieldref_info、CONSTANT_Methodref_info等。


### 初始化阶段
1. <font color=blue>**初始化阶段就是执行类构造器方法＜clinit＞()的过程。**</font>
2. 此方法不需定义，是javac编译器自动收集类中的所有类变量的赋值动作和静态代码块中的语句合并而来。
3. 构造器方法中指令按语句在源文件中出现的顺序执行。
4. <font color=blue>**＜clinit＞()不同于类的构造器。**</font>（关联：构造器是虚拟机视角下的＜init＞()）
5. 若该类具有父类，JVM会保证子类的＜clinit＞()执行前，父类的＜clinit＞()已经执行完毕。(如果类中没有静态代码块或者静态变量，clinit方法不会产生)
6. 虚拟机必须保证一个类的＜clinit＞()方法在多线程下被同步加锁。
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

