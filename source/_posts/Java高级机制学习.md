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

# 枚举类


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
3. 继承Thread类
```Java
package com.caixianquan.Java.Thread;

/**
 * 多线程的创建，方式一：继承于Thread类
 * 1. 创建一个继承于Thread类的子类
 * 2. 重写Thread类的run() --> 将此线程执行的操作声明在run()中
 * 3. 创建Thread类的子类的对象
 * 4. 通过此对象调用start()
 * <p>
 * 例子：遍历100以内的所有的偶数
 *
 * @author shkstart
 * @create 2019-02-13 上午 11:46
 */

//1. 创建一个继承于Thread类的子类
class MyThread extends Thread {
    //2. 重写Thread类的run()
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if(i % 2 == 0){
                System.out.println(Thread.currentThread().getName() + ":" + i);
            }
        }
    }
}


public class ThreadTest2 {
    public static void main(String[] args) {
        //3. 创建Thread类的子类的对象
        MyThread t1 = new MyThread();

        //4.通过此对象调用start():①启动当前线程 ② 调用当前线程的run()
        t1.start();
        //问题一：我们不能通过直接调用run()的方式启动线程。
//        t1.run();

        //问题二：再启动一个线程，遍历100以内的偶数。不可以还让已经start()的线程去执行。会报IllegalThreadStateException
//        t1.start();
        //我们需要重新创建一个线程的对象
        MyThread t2 = new MyThread();
        t2.start();


        //如下操作仍然是在main线程中执行的。
        for (int i = 0; i < 100; i++) {
            if(i % 2 == 0){
                System.out.println(Thread.currentThread().getName() + ":" + i + "***********main()************");
            }
        }
    }

}

```
	- Thread类的常用方法
		- void start() :启动线程，并执行对象的run（）方法
		- run():线程在被调度时执行的操作
		- String getName():返回线程的名称
		- void setName(String name): 设置该线程名称
		- static Thread currentThread():返回当前线程。在 Thread子类中就是this,通常用于主线程和 Runnable实现类
		- static void yield() :线程让步
			- 暂停当前正在执行的线程，把执行机会让给优先级相同或更高的线程
			- 若队列中没有同优先级的线程，忽路此方法
		- join() :当某个程序执流中调用其他线程的join（）方法时，调用线程将被阻塞，直到join（）方法加入的join线程执行完为止
			- 低优先级的线程也可以获得执行
		- static void sleep(long millis):(指定时间：毫秒)
			- 令当前活动线程在指定时间段内放弃对CPU控制，使其他线程有机会被执行，时间到后重排队。
			- 抛出 InterruptedException异常
		- stop() :强制线程生命期结束，不推荐使用
		- boolean isAlive() :返回 boolean,判断线程是否还活着

4. 实现Runnable接口
```Java
package com.caixianquan.Java.Thread;

/**
 * 创建多线程的方式二：实现Runnable接口
 * 1. 创建一个实现了Runnable接口的类
 * 2. 实现类去实现Runnable中的抽象方法：run()
 * 3. 创建实现类的对象
 * 4. 将此对象作为参数传递到Thread类的构造器中，创建Thread类的对象
 * 5. 通过Thread类的对象调用start()
 *
 *
 * @author shkstart
 * @create 2019-02-13 下午 4:34
 */
//1. 创建一个实现了Runnable接口的类
class MThread implements Runnable{

    //2. 实现类去实现Runnable中的抽象方法：run()
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if(i % 2 == 0){
                System.out.println(Thread.currentThread().getName() + ":" + i);
            }

        }
    }
}


public class ThreadTest1 {
    public static void main(String[] args) {
        //3. 创建实现类的对象
        MThread mThread = new MThread();
        //4. 将此对象作为参数传递到Thread类的构造器中，创建Thread类的对象
        Thread t1 = new Thread(mThread);
        t1.setName("线程1");
        //5. 通过Thread类的对象调用start():① 启动线程 ②调用当前线程的run()-->调用了Runnable类型的target的run()
        t1.start();

        //再启动一个线程，遍历100以内的偶数
        Thread t2 = new Thread(mThread);
        t2.setName("线程2");
        t2.start();
    }

}

```

5. 比较创建线程的两种方式。
    - 开发中：优先选择：实现Runnable接口的方式
    - 原因：1--实现的方式没有类的单继承性的局限性
        - 2--实现的方式更适合来处理多个线程有共享数据的情况。
    - 联系：public class Thread implements Runnable
    - 相同点：两种方式都需要重写run(),将线程要执行的逻辑声明在run()中。

## 线程的调度
### 调度策略
1. 时间片
![时间片](2、时间片.png)
2. 抢占式：高优先级的线程抢占CPU

### Java的调度方法
1. 同优先级线程组成先进先出队列（先到先服务），使用时间片策略
2. 对高优先级，使用优先调度的抢占式策略

### 线程的优先级
1. 线程的优先级等级
	- MAX_PRIORITY: 10
	- MIN_PRIORITY: 1
	- NORM_PRIORITY: 5

2. 涉及的方法
	- getPriority（）:返回线程优先值
	- setPriority(int newPriority):改变线程的优先级
3. 说明
	- 线程创建时继承父线程的优先级
	- <font color=red size=3>***低优先级只是获得调度的概率低，并非一定是在高优先级线程之后才被调用***</font>

## 线程的生命周期
### JDK中用Thread.State类定义了线程的几种状态

1. 要想实现多线程，必须在主线程中创建新的线程对象。Java语言使用Thread类及其子类的对象来表示线程，在它的一个完整的生命周期中通常要经历如下的五
种状态：
    - 新建： 当一个Thread类或其子类的对象被声明并创建时，新生的线程对象处于新建状态
    - 就绪：处于新建状态的线程被start()后，将进入线程队列等待CPU时间片，此时它已具备了运行的条件，只是没分配到CPU资源
    - 运行：当就绪的线程被调度并获得CPU资源时,便进入运行状态， run()方法定义了线程的操作和功能
    - 阻塞：在某种特殊情况下，被人为挂起或执行输入输出操作时，让出 CPU 并临时中止自己的执行，进入阻塞状态
    - 死亡：线程完成了它的全部工作或线程被提前强制性地中止或出现异常导致结束
![线程的生命周期](3、线程的生命周期.png)

## 线程的同步
### 问题
![多线程的理想状态](5、多线程的理想状态.png)
![多线程的极端状态被阻塞](6、多线程的极端状态被阻塞.png)

### Synchronized的使用方法
1. Java对于多线程的安全问题提供了专业的解决方式：同步机制

    - 同步代码块：
synchronized (同步监视器){
// 需要被同步的代码；
// 说明：操作共享数据的代码，即为需要被同步的代码
//  共享数据：多个线程共同操作的变量。比如：ticket就是共享数据
//  同步监视器，俗称：锁。任何一个类的对象，都可以充当为锁。
}
    - synchronized还可以放在方法声明中，表示整个方法为同步方法。
例如：
public synchronized void show (String name){ 
….
}

2. 窗口卖票代码
```Java
package com.atguigu.java;

/**
 * 例子：创建三个窗口卖票，总票数为100张.使用实现Runnable接口的方式
 *
 * 1.问题：卖票过程中，出现了重票、错票 -->出现了线程的安全问题
 * 2.问题出现的原因：当某个线程操作车票的过程中，尚未操作完成时，其他线程参与进来，也操作车票。
 * 3.如何解决：当一个线程a在操作ticket的时候，其他线程不能参与进来。直到线程a操作完ticket时，其他
 *            线程才可以开始操作ticket。这种情况即使线程a出现了阻塞，也不能被改变。
 *
 *
 * 4.在Java中，我们通过同步机制，来解决线程的安全问题。
 *
 *  方式一：同步代码块
 *
 *   synchronized(同步监视器){
 *      //需要被同步的代码
 *
 *   }
 *  说明：1.操作共享数据的代码，即为需要被同步的代码。  -->不能包含代码多了，也不能包含代码少了。
 *       2.共享数据：多个线程共同操作的变量。比如：ticket就是共享数据。
 *       3.同步监视器，俗称：锁。任何一个类的对象，都可以充当锁。
 *          要求：多个线程必须要共用同一把锁。
 *
 *       补充：在实现Runnable接口创建多线程的方式中，我们可以考虑使用this充当同步监视器。
 *  方式二：同步方法。
 *     如果操作共享数据的代码完整的声明在一个方法中，我们不妨将此方法声明同步的。
 *
 *
 *  5.同步的方式，解决了线程的安全问题。---好处
 *    操作同步代码时，只能有一个线程参与，其他线程等待。相当于是一个单线程的过程，效率低。 ---局限性
 *
 * @author shkstart
 * @create 2019-02-13 下午 4:47
 */
class Window1 implements Runnable{

    private int ticket = 100;
//    Object obj = new Object();
//    Dog dog = new Dog();  生成唯一的对象
    @Override
    public void run() {
//        Object obj = new Object();
        while(true){
            synchronized (this){//此时的this:唯一的Window1的对象   //方式二：synchronized (dog) {//方式三：synchronized(Windows1.class){  直接使用类作为对象

                if (ticket > 0) {

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + ":卖票，票号为：" + ticket);


                    ticket--;
                } else {
                    break;
                }
            }
        }
    }
}


public class WindowTest1 {
    public static void main(String[] args) {
        Window1 w = new Window1();

        Thread t1 = new Thread(w);
        Thread t2 = new Thread(w);
        Thread t3 = new Thread(w);

        t1.setName("窗口1");
        t2.setName("窗口2");
        t3.setName("窗口3");

        t1.start();
        t2.start();
        t3.start();
    }

}


class Dog{

}
```

### 同步代码块处理继承Thread类的线程安全问题
1. 在继承Thread类创建多线程的方式中，慎用this充当同步监视器，考虑使用当前类充当同步监视器
```java
/**
 * @author shkstart
 * @create 2019-02-15 上午 11:15
 */
/**
 * 使用同步代码块解决继承Thread类的方式的线程安全问题
 *
 * 例子：创建三个窗口卖票，总票数为100张.使用继承Thread类的方式
 *
 * 说明：在继承Thread类创建多线程的方式中，慎用this充当同步监视器，考虑使用当前类充当同步监视器。
 *
 * @author shkstart
 * @create 2019-02-13 下午 4:20
 */
class Window2 extends Thread{


    private static int ticket = 100;

    private static Object obj = new Object();   //将生成的对象声明为static，唯一即可使用该监视器

    @Override
    public void run() {

        while(true){
            //正确的
//            synchronized (obj){
            synchronized (Window2.class){//Class clazz = Window2.class,Window2.class只会加载一次
                //错误的方式：this代表着t1,t2,t3三个对象
//              synchronized (this){

                if(ticket > 0){

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(getName() + "：卖票，票号为：" + ticket);
                    ticket--;
                }else{
                    break;
                }
            }

        }

    }
}


public class WindowTest2 {
    public static void main(String[] args) {
        Window2 t1 = new Window2();
        Window2 t2 = new Window2();
        Window2 t3 = new Window2();


        t1.setName("窗口1");
        t2.setName("窗口2");
        t3.setName("窗口3");

        t1.start();
        t2.start();
        t3.start();

    }
}
```

### 同步代码块处理实现Runnable接口的线程安全问题
### 分析同步原理
![同步原理例子](4、同步原理例子.png)

### 同步机制中的锁
1. 同步锁机制
    - 在《Thinking in Java》中，是这么说的：对于并发工作，你需要某种方式来防止两个任务访问相同的资源（其实就是共享资源竞争）。 防止这种冲突的方法
就是当资源被一个任务使用时，在其上加锁。第一个访问某项资源的任务必须锁定这项资源，使其他任务在其被解锁之前，就无法访问它了，而在其被解锁之时，另一个任务就可以锁定并使用它了。
2. synchronized的锁是什么？
    - 任意对象都可以作为同步锁。所有对象都自动含有单一的锁（监视器）。
    - 同步方法的锁：静态方法（类名.class）、非静态方法（this）
    - 同步代码块：自己指定，很多时候也是指定为this或类名.class
3. 注意：
    - 必须确保使用同一个资源的<font color=red size=3>***多个线程共用一把锁***</font>，这个非常重要，否则就无法保证共享资源的安全
    - 一个线程类中的所有静态方法共用同一把锁（类名.class），所有非静态方法共用同一把锁（this），同步代码块（指定需谨慎）
4. <font color=red size=3>***继承Thread类需要生成多个线程对象，需要考虑锁是否唯一***</font>

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
