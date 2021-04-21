---
title: Java基础
date: 2021-04-20 23:02:55
tags:
- Java
- 大数据
categories: 
- Java
- 大数据
keywords:
- Java
- 大数据
description: Java基础语法
cover: /2021/04/20/Java基础/Java基础首页.jpg
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

# 设计模式
{% note info %}
具体可以查看书籍，比如：大话设计模式
{% endnote %}
1. 创建型模式，共5种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式
2. 结构型模式，共7种：适配模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。
3. 行为型模式，共11种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式

## 单例(Singleton)设计模式
1. 设计模式<font color=red size=3>***是在大量的实践中总结和理论化之后优选的代码结构、编程风格、以及解决问题的思考方式。***</font>设计模免去我们自己再思考和摸索。就像是经典的棋谱，不同的棋局，我们用不同的棋谱，”套路”

2. 所谓类的单例设计模式，就是采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例，并且该类只提供一个取得其对象实例的方法。如果我们要让类在一个虚拟机中只能产生一个对象，我们首先必须将类的构
造器的访问权限设置为 private,这样，就不能用new作符在类的外部产生类的对象了，但在类内部仍可以产生该类的对象。因为在类的外部开始还无法得到类的对象，只能调用该类的某个静态方法以返回类内部创建的对象，静态方法只能访问类中的静态成员变量，所以，指向类内部产生的该类对象的变量也必须定义成静态的。

### 饿汉式与懒汉式代码说明
1. 单例设计模式： 所谓类的单例设计模式，就是采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例。
2. 如何实现？ 饿汉式  vs 懒汉式
3. 区分饿汉式 和 懒汉式
	- 饿汉式：
		- 坏处：对象加载时间过长。
		- 好处：饿汉式是线程安全的
  
	- 懒汉式：好处：延迟对象的创建。
		- 目前的写法坏处：线程不安全。--->到多线程内容时，再修改



```Java 饿汉式实现，提供公共的静态方法返回对象实例
package com.caixianquan.Java.singleton;

public class SingletonTest1 {
	public static void main(String[] args) {
//		Bank bank1 = new Bank();
//		Bank bank2 = new Bank();
		
		Bank bank1 = Bank.getInstance();
		Bank bank2 = Bank.getInstance();
		
		System.out.println(bank1 == bank2);  //true
	}
}

//饿汉式
class Bank{
	
	//1.私有化类的构造器
	private Bank(){
		
	}
	
	//2.内部创建类的对象
	//4.要求此对象也必须声明为静态的
	private static Bank instance = new Bank();
	
	//3.提供公共的静态的方法，返回类的对象
	public static Bank getInstance(){
		return instance;
	}
}
```

```Java 懒汉式实现，公共静态方法内再实例化对象
package com.caixianquan.Java.singleton;
/*
 * 单例模式的懒汉式实现
 * 
 */
public class SingletonTest2 {
	public static void main(String[] args) {
		
		Order order1 = Order.getInstance();
		Order order2 = Order.getInstance();
		
		System.out.println(order1 == order2);
		
	}
}


class Order{
	
	//1.私有化类的构造器
	private Order(){
		
	}
	
	//2.声明当前类对象，没有初始化
	//4.此对象也必须声明为static的
	private static Order instance = null;
	
	//3.声明public、static的返回当前类对象的方法
	public static Order getInstance(){
		
		if(instance == null){	//如果不判断，那么就不是单例模式，每次都会new一个新的对象
			
			instance = new Order();
			
		}
		return instance;
	}
	
}
```

### 单例模式优点
1. 由于单例模式只生成一个实例，<font color=red size=3>***减少了系统性能开销***</font>，当一个对象的产生需要比较多的资源时，如读取配置、产生其他依赖对象时，则可以通过在应用启动时直接产生一个单例对象，然后永久驻留内存前方
来解决
2. 举例：java.lang.Runtime

### 单例模式-应用场景
1. <font color=red size=3>***网站的计数器***</font>，般也是单例模式实现，否则难以同步
2. <font color=red size=3>***应用程序的日志应用***</font>，一般都使用单例模式实现，这一般是由于共享的日志文件一直处于打开状态，因为只能有一个实例去操作，否则内容不好追加
3. <font color=red size=3>***数据库连接池***</font>的设计一般也是采用单例模式，因为数据库连接是一种数据库资源。
4. 项目中，<font color=red size=3>***读取配置文件的类***</font>，一般也只有一个对象。没有必要每次使用配置文件数据，都生成一个对象去读取。
<font color=red size=3>***Application也是单例的典型应用***</font>
5. Windows的 <font color=red size=3>***Task Manager（任务管理器）***</font>就是很典型的单例模式
6. Windows的 <font color=red size=3>***Recycle Bin（回收站）***</font>也是典型的单例应用。在整个系统运行过程中，回收站一直维护着仅有的一个实例

