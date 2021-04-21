---
title: Java高级机制学习
date: 2021-04-20 03:04:07
tags:
- Java
- 大数据
categories:
- 大数据学习
- Java
keywords:
- Java
- 大数据
description: 学习Java核心语法特性
cover: /2021/04/20/Java高级机制学习/Java高级机制学习首页.jpg
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
{% note info %}

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

# 多线程
## 线程和进程基本概念
1. <font color=red size=3>***程序( progran)***</font>是为完成特定任务、用某种语言编写的一组指令的集合。即指一段静态的代码，静态对象。
2. <font color=red size=3>***进程( process)***</font>是程序的一次执行过程，或是正在运行的一个程序。是一个动态的过程：有它自身的产生、存在和消亡的过程。————生命周期
	- 如：运行中的QQ,运行中的MP3播放器
	- 程序是静态的，进程是动态的
	- <font color=red size=3>***进程作为资源分配的单位***</font>，系统在运行时会为每个进程分配不同的内存区域
3. 线程( thread),进程可进一步细化为线程，是一个程序内部的一条执行路径。
	- 若一个进程同一时间<font color=blue size=3>***并行***</font>执行多个线程，就是支持多线程的
	- <font color=red size=3>***线程作为调度和执行的单位，每个线程拥有独立的运行栈和程序计数器(pc)***</font>,线程切换的开销小。
	- 一个进程中的多个线程共享相同的内存单元/内存地址空间->它们从同一堆中分配对象，可以访问相同的变量和对象。这就使得线程间通信更简便、高效。但多个线程操作共享的系统资源可能就会带来<font color=red size=3>***安全的隐患***</font>

	- 线程安全：两个线程访问一个变量时，如果未加锁造成的安全问题。比如有两个线程同时访问一个变量，如果该变量的值等于5000，则将其-1，那么当线程A确认刚变量为5000再将其修改-1时，线程B也访问了该变量，此时该变量还是为5000，那么也会执行-1操作，此时就会造成变量值-2的情况。

### 使用多线程的优点
1. 背景：以单核CPU为例，只使用单个线程先后完成多个任务（调用多个方法），肯定比用多个线程来完成用的时间更短，为何仍需多线程呢？
2. 多线程程序的优点：
	- 提高应用程序的响应。对图形化界面更有意义，可增强用户体验
	- 提高计算机系统CPU的利用率
	- 改善程序结构。将既长又复杂的进程分为多个线程，独立运行，利于理解和修改

### 何时需要多线程
	- 程序需要同时执行两个或多个任务
	- 程序需要实现一些需要等待的任务时，如用户输入、文件读写操作、网络操作、搜索等。
	- 需要一些后台运行的程序时。

## 创建多线程
1. Java语言的JVM允许程序运行多个线程，它通过java.lang.Thread类来体现。
2. Thread类的特性
	- 每个线程都是通过某个特定Thread对象的run()方法来完成操作的，经常把run()方法的主体称为线程体
	- 通过该 Thread对象的 start（）方法来启动这个线程，而非直接调用run（）

# <font color=red size=3>***Java反射机制***</font>
{% note primary %}
各个框架的底层都会涉及到反射，会写代码，也要能够理解
{% endnote %}

## Java反射机制概述
### 反射的定义
1. Reflection（反射）是被视为<font color=red size=3>***动态语言***</font>的关键，反射机制允许程序在执行期借助于 Reflection API取得任何类的内部信息，并能直接操作任意对象的内部属性及方法。
2. 加载完类之后，在堆内存的方法区中就产生了一个Cass类型的对象（一个类只有一个Clas对象），这个对象就包含了完整的类的结构信息。我们可
以通过这个对象看到类的结构。<font color=red size=3>***这个对象就像一面镜子，透过这个镜子看到类的结构，所以，我们形象的称之为：反射***</font>
![反射方式与正常方式](1、反射方式与正常方式.png)	

### Java反射机制研究及应用
1. Java反射机制提供的功能
	- 在运行时判断任意一个对象所属的类
	- 在运行时构造任意一个类的对象
	- 在运行时判断任意一个类所具有的成员变量和方法
	- 在运行时获取泛型信息
	- 在运行时调用任意一个对象的成员变量和方法
	- 在运行时处理注解
	- 生成动态代理

2. 反射相关的主要API
	- <font color=red size=3>***java.lang.Class***</font>: 代表一个类【比如通用的构造方法，属性等】
	- java.lang.reflect.Method: 代表类的方法
	- java.ang.reflect.Fild: 代表类的成员变量
	- java.ang.reflect.Constructor: 代表类的构造器

3. 举例说明反射机制
```Java Person类
package com.caixianquan.Java;

/**
 * @author shkstart
 * @create 2019 上午 10:38
 */
public class Person {

    private String name;
    public int age;

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Person(String name, int age) {

        this.name = name;
        this.age = age;
    }

    private Person(String name) {
        this.name = name;
    }

    public Person() {
        System.out.println("Person()");
    }

    public void show(){
        System.out.println("你好，我是一个人");
    }

    private String showNation(String nation){
        System.out.println("我的国籍是：" + nation);
        return nation;
    }
}

```
```Java 反射使用
package com.caixianquan.Java;

import org.junit.Test;

import java.lang.annotation.ElementType;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * @author shkstart
 * @create 2019 上午 10:38
 */
public class ReflectionTest {


    //反射之前，对于Person的操作
    @Test
    public void test1() {

        //1.创建Person类的对象
        Person p1 = new Person("Tom", 12);

        //2.通过对象，调用其内部的属性、方法
        p1.age = 10;
        System.out.println(p1.toString());

        p1.show();

        //在Person类外部，不可以通过Person类的对象调用其内部私有结构。
        //比如：name、showNation()以及私有的构造器
    }

    //反射之后，对于Person的操作
    @Test
    public void test2() throws Exception{
        Class personClass = Person.class;  //Person类作为Class类的一个对象
        //1.通过反射，创建Person类的对象
        Constructor cons = personClass.getConstructor(String.class,int.class);
        Object obj = cons.newInstance("Tom", 12);
        Person p = (Person) obj;
        System.out.println(p.toString());
        //2.通过反射，调用对象指定的属性、方法
        //调用属性
        Field age = personClass.getDeclaredField("age");
        age.set(p,10);
        System.out.println(p.toString());

        //调用方法
        Method show = personClass.getDeclaredMethod("show");
        show.invoke(p);

        System.out.println("*******************************");

        //通过反射，可以调用Person类的私有结构的。比如：私有的构造器、方法、属性
        //调用私有的构造器
        Constructor cons1 = personClass.getDeclaredConstructor(String.class);
        cons1.setAccessible(true);
        Person p1 = (Person) cons1.newInstance("Jerry");
        System.out.println(p1);

        //调用私有的属性
        Field name = personClass.getDeclaredField("name");
        name.setAccessible(true);
        name.set(p1,"HanMeimei");
        System.out.println(p1);

        //调用私有的方法
        Method showNation = personClass.getDeclaredMethod("showNation", String.class);
        showNation.setAccessible(true);
        String nation = (String) showNation.invoke(p1,"中国");//相当于String nation = p1.showNation("中国")
        System.out.println(nation);


    }
    //疑问1：通过直接new的方式或反射的方式都可以调用公共的结构，开发中到底用那个？
    //建议：直接new的方式。
    //什么时候会使用：反射的方式。 反射的特征：动态性
    //疑问2：反射机制与面向对象中的封装性是不是矛盾的？如何看待两个技术？
    //不矛盾。

    /*
    关于java.lang.Class类的理解
    1.类的加载过程：
    程序经过javac.exe命令以后，会生成一个或多个字节码文件(.class结尾)。
    接着我们使用java.exe命令对某个字节码文件进行解释运行。相当于将某个字节码文件
    加载到内存中。此过程就称为类的加载。加载到内存中的类，我们就称为运行时类，此
    运行时类，就作为Class的一个实例。

    2.换句话说，Class的实例就对应着一个运行时类。
    3.加载到内存中的运行时类，会缓存一定的时间。在此时间之内，我们可以通过不同的方式
    来获取此运行时类。
     */
    //获取Class的实例的方式（前三种方式需要掌握）
    @Test
    public void test3() throws ClassNotFoundException {
        //方式一：调用运行时类的属性：.class
        Class clazz1 = Person.class;
        System.out.println(clazz1);
        //方式二：通过运行时类的对象,调用getClass()
        Person p1 = new Person();
        Class clazz2 = p1.getClass();
        System.out.println(clazz2);

        //方式三：调用Class的静态方法：forName(String classPath)
        Class clazz3 = Class.forName("com.atguigu.java.Person");
//        clazz3 = Class.forName("java.lang.String");
        System.out.println(clazz3);

        System.out.println(clazz1 == clazz2);
        System.out.println(clazz1 == clazz3);

        //方式四：使用类的加载器：ClassLoader  (了解)
        ClassLoader classLoader = ReflectionTest.class.getClassLoader();
        Class clazz4 = classLoader.loadClass("com.atguigu.java.Person");
        System.out.println(clazz4);

        System.out.println(clazz1 == clazz4);

    }


    //万事万物皆对象？对象.xxx,File,URL,反射,前端、数据库操作


    //Class实例可以是哪些结构的说明：
    @Test
    public void test4(){
        Class c1 = Object.class;
        Class c2 = Comparable.class;
        Class c3 = String[].class;
        Class c4 = int[][].class;
        Class c5 = ElementType.class;
        Class c6 = Override.class;
        Class c7 = int.class;
        Class c8 = void.class;
        Class c9 = Class.class;

        int[] a = new int[10];
        int[] b = new int[100];
        Class c10 = a.getClass();
        Class c11 = b.getClass();
        // 只要数组的元素类型与维度一样，就是同一个Class
        System.out.println(c10 == c11);

    }
}

```

## 理解Class类并<font color=red size=3>***获取Class实例***</font>

## 类的加载与 Class Loader的理解
## <font color=red size=3>***创建运行类的对象***</font>
## 获取运行时类的完整结构
## <font color=red size=3>***调用运行时类的指定结构***</font>（开发使用）
## 反射的应用：动态代理
