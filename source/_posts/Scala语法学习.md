---
title: Scala语法学习
date: 2021-08-31 10:10:50
tags:
- Scala
- 大数据
categories:
- 大数据学习
- Scala
keywords:
- Scala
- 大数据
description: 参考尚学堂scala视频学习笔记，方便复习scala语法知识点
cover: /2021/08/31/Scala语法学习/Scala语法学习首页.jpg
---


# Scala与Java语法区别点
1. java是面向对象语言【有基本类型，int，null值，static】，Scala是完全面向对象语言
2. scala中没有public关键字，默认所有的访问权限都是公共的。
3. scala中没有void关键字，采用特殊的对象模拟：Unit
4. scala中声明方法采用关键字def
5. scala中参数列表的声明方式是变量名在前，类型在后
	- java：String 参数名
	- Scala：参数名：类型
6. scala中方法的声明和方法体是通过等号连接；方法的返回值类型放置在方法声明的后面使用冒号连接
7. 不需要分号结尾，编译器自动添加
8. java变量使用之前必须初始化，但可以声明变量不用初始化，而scala声明变量必须显示的初始化变量。
9. 增加了<font color=red size=3>**val和var**</font>关键字，可以对变量进行是否能够进行修改进行限定
10. Scala没有基本数据类型，数据类型都是对象
11. <font color=red size=3>**Scala中没有++、--操作符，需要通过+=、-=来实现**</font>
12. Scala中任意表达式都是有返回值的
13. Scala中没有三元运算符
14. scala中在任意语法中都可以声明其他语法，比如方法中可以声明方法，类里面可以声明类，包里面可以有包

# Scala概述
![Scala概述](1、Scala概述.png)

## Scala与java、jvm关系图
![Scala与java、jvm关系图](2、Scala与java、jvm关系图.png)

## Scala特点
1. Scala是一门以java虚拟机（JVM）为目标运行环境并将面向对象和函数式
	- 编程的最佳特性结合在一起的静态类型编程语言【完全面向对象】。
2. Scala 是一门多范式 (multi-paradigm) 的编程语言，Scala支持面向对象和函数式编程
3. Scala源代码(.scala)会被编译成Java字节码(.class)，然后运行于JVM之上，并可以调用现有的Java类库，实现两种语言的无缝对接。
4. Scala 单作为一门语言来看， 非常的简洁高效

## Scala开发环境
1. 退出scala解释器【REPL】：  :q
2. 执行程序：scala Hello.scala  这个是不产生文件，直接解析到内存中执行程序，运行结果慢
3. 一般是先scalac编译后scala执行

### 演示代码
```Scala
//说明
//1、object表示一个伴生对象【即有$的字节码文件，伴生对象中的内容可以通过类名访问】，这里可以简单理解为一个对象
//2、HelloScala就是对象名字，底层真正对应的类名是HelloScala$,
//对象是HelloScala$类型的一个静态对象MODULE$
//3、当我们编写一个object HelloScala底层会生成两个.class文件，分别是HelloScala和HelloScala$
//4、scala在运行时的流程如下：
//（1）先从HelloScala的main开始执行
//public static void main(String[] paramArrayOfString)
//{
//    HelloScala$.MODULE$.main(paramArrayOfString);
//}
//(2)然后调用HelloScala$类的方法 HelloScala$.MODULE$.main
//(3)即执行了下面的代码
//public void main(String[] args)
//{
//    Predef..MODULE$.println("Hello,Scala!~~");
//}
 
object HelloScala{
// 说明
//1、def表示一个方法，这是一个关键字
//2、main表示方法名字，表示程序入口
//3、args: Array[String]表示形参，scala的特点是参数名在前，类型在后
//4、Array[String]表示类型数组
//5、: Unit= 表示该函数的返回值为空(void)
//6、println("Hello,Scala!~~")输出一句话
    def main(args: Array[String]): Unit = {
        println("Hello,Scala!~~")
    }
}
```


### Scala语言输出的三种方式
1. 字符串通过+号连接（类似 java）。
2. printf 用法 （类似 C 语言）字符串通过`%`传值。
3. 字符串通过`$`引用(类似 PHP）。
```scala
object TestPrint {
    
def main(args: Array[String]): Unit = {
            //使用+
            var name : String = "tom"
            var sal : Double = 1.2
            println("hello" + sal + name )
            //使用格式化的方式 printf
            printf("name=%s sal=%f\n", name, sal)
            //使用$引用的方式，输出变量，类似 php
            println(s"第三种方式 name=$name sal = ${sal + 1}")
            println(f"可以格式化：name=$name sal = $sal%.2f \n")
            println(raw"原始数据：name=$name sal = $sal%.2f \n")
        }
}

//输出结果
hello1.2tom
name=tom sal= 1.200000
第三种方式：name=tom sal = 2.2
可以格式化：name= tom  sal = 1.20 

原始数据：name=tom sal = 1.2%.2f \n
```


### 从控制台输入内容
```Scala
import scala.io.StdIn
object HelloWorld {
  def main(args: Array[String]): Unit = {
    val name = StdIn.readLine("Your name: ")
    print("Your age: ")
    val age = StdIn.readInt()
    printf("Hello,%s! Next year,your will be %d.\n",name,age+1)
  }
}
```


### idea开发Scala
- 需要安装Scala插件：参考地址，https://blog.csdn.net/qq_43147136/article/details/83817703
采用本地安装插件

# 变量
## 声明变量基本语法
1. <font color=red size=3>**var**</font> | <font color=red size=3>**val**</font> 变量名[: 变量类型] = 变量值

2. <font color=black size=3>**var【variable】关键字是可以修改值，val【value】关键字是不可修改值，val修饰的对象属性在编译后，等同于加上final**</font>
3. <font color=black size=3>**这里不可修改的是内存地址，如果对一个类使用val关键字，而里面的成员变量使用var，那么成员变量可以修改值**</font>
4. 声明变量时，类型可以省略（就是叫 类型推断）
5. 类型确定后，就不能修改，说明Scala 是强数据类型语言

变量声明
```scala
var name : String = "caixianquan"
val age = 20
```
```scala
object Hello123 {
  def main(args: Array[String]): Unit = {
    var name : String = "caixianquan"
    var age : Int = 24
    //Scala声明变量必须显示的初始化
 
    val dog = new Dog();
    dog.name = "wangcai"
    println(dog.name)
    //dog = new Dog() 报错
 
  }
class Dog{
  var name : String = ""
}
 
}
```

## 数据类型

### scala 数据类型体系一览图
![数据类型体系](3、数据类型体系.png)
![根类型Any](4、根类型Any.png)
1. 在scala中有一个根类型Any，是所有类的父类
2. scala中一切皆为对象，分为两类：Any（值类型），AnRef（引用类型），他们都是Any子类
3. Null类型是scala的特别类型，它只有一个值null,他是bottom class，是所有AnyRef类型的子类
4. Nothing类型也是bottom class，他是所有类的了类，在开发中通常可以将Nothing类型的值返回给任意变量或者函数，这里抛出异常使用很多、
![数据类型](5、数据类型.png)
![Unit、NUll以及Nothing类型](6、Unit、NUll以及Nothing类型.png)

### 注意事项
1. Byte和Short类型再进行算术运算时会转换为Int类型，而Char、Float、Double、Int类型进行运算时会提升为最大数据类型
2. 把"12.5"转成Int类型，因为12.5是字符串，转成Int类型会无法判断小数点，如果转成Double类型，那么会将小数点区分开而可以运行

# 运算符
## 算术运算符
{% note info %}
Scala中没有++、--操作符，需要通过+=、-=来实现
{% endnote %}

## 位运算符
![位运算符](7、位运算符.png)
```Scala
&: 两个位都是1，结果才是1，否则为0
|: 两个位只要有一个为1，结果就为1，否则为0
^: 两个位相同为0，不同则为1
~: 按位取反
<<: 将运算符左边的对象向左移动运算符右边指定的位数（在低位补0）
>>: "有符号"右移运算 符，将运算符左边的对象向右移动运算符右边指定的位数。使用符号扩展机制，也就是说，如果值为正，则在高位补0，如果值为负，则在高位补1.
>>>: "无符号"右移运算 符，将运算符左边的对象向右移动运算符右边指定的位数。采用0扩展机制，也就是说，无论值的正负，都在高位补0.
```


# 程序流程控制
## 分支控制 if-else 
Scala 中<font color=red size=3>**任意表达式都是有返回值**</font>的，也就意味着 if else 表达式其实是有返回结果的，
具体返回 <font color=red size=3>**结果的值取决于满足条件的代码体的最后一行内容**</font>

可以通过右大括号后.var给出返回类型，如下。这是Scala插件自动添加的类型，不根据if条件来看是否
执行那个语句。如果true：string，false：string，那么返回类型为Any，
如果true和false里面为空那么是Unit类型。一般返回类型可以不写，插件自动判断
```Scala
object Exercise03 {   
 def main(args: Array[String]): Unit = {
    var sumVal = 9
    val result = if(sumVal > 20)
      println("结果大于20")
    println("result: " + result) //返回的是() 即 Unit
 
	val unit: Any = if(sumVal > 20) {
	      "abac"
	    }
	
  }
}
```


## for循环控制
### “to”的使用
- 说明
1. i 表示循环的变量， <- 规定好 to 规定
2. i 将会从 1-3 循环， 前后闭合，即[1,3]
```Scala
for(i <- 1 to 3){
    print(i + " ")
}
println()
```


### “until”的使用
```Scala
for(i <- 1 until 3) {
    print(i + " ")
}
println()
```
说明:
1) 这种方式和前面的区别在于 i 是从 1 到 3-1
2) 前闭合后开的范围,和 java 的 arr.length() 类似
```Scala
for (int i = 0; i < arr.lenght; i++){}
```


### 循环守卫
循环守卫，即循环保护式（也称条件判断式，守卫）。
保护式为 true 则进入循环体内部，为 false则跳过，类似于 continue
```Scala
for(i <- 1 to 3 if i != 2) {
    print(i + " ")
}
println()
 
//等价于
for (i <- 1 to 3) {
    if (i != 2) {
        println(i+"")
    }
}
```


### 步长控制
```Scala
//第一种：range（start，end，step）
for (i <- Range(1, 10, 2)) {
    println("i=" + i)
}
// 控制步长的第二种方式-for 循环守卫
println("**************************")
for (i <- 1 to 10 if i % 2 == 1) {
    println("i=" + i)
}
```


### 引入变量
- for循环中可以使用一行代码声明变量，也可以使用多行来声明变量，但是需要将小括号变成大括号
```Scala
  def main(args: Array[String]): Unit = {
    for{i <- Range(1,18,2)
        j = (18 - i ) / 2}{
      println(" "*j + "*"*i + " "* j)
    }
  }
```
- 表达式如果有多行代码，那么可以采用大括号声明


### 循环返回值
1. 默认情况下，for循环的返回值为(),unit类型
```Scala
def main(args: Array[String]): Unit = {

  //无论for循环最后一条语句是什么，都默认返回() ,unit
  val unit1: Unit = for(i <- 1 to 3){
    println(i)
  }
  val unit: Unit = for(i <- 1 to 3){
    "abc"
  }
}
 ```

2. 使用yield关键字修改默认的返回值类型
3. 将遍历过程中处理的结果返回到一个新 Vector 集合中，使用 yield 关键字
```Scala
/*
* 对 1 to 10 进行遍历
* 【yield i】将每次循环得到 i 放入到集合 Vector 中，并返回给 res
* 【i】这里是一个代码块，这就意味我们可以对【i】进行处理
*/
val res = for(i <- 1 to 10) yield i * 2
println(res)
```
![yield关键字](8、yield关键字.png)

## while 循环控制
因为 while 中没有返回值,所以当要用该语句来计算并返回结果时,就不可避免的使用变量 ，而变量需要声明在 while 循环的外部，那么就等同于循环的内部对外部的变量造成了影响，所以不推荐使用，而是 推荐使用 for  循环。

### break()和breakable()
- 中断循环，java中采用break语法实现，scala中没有break关键字，但是可以采用对象的方式进行中断
![break实现](9、break实现.png)
- 由于Scala使用抛出异常来中断for循环，那么就无法继续执行
```Scala
package com.caixianquan.scalaToLearn
 
import scala.util.control.Breaks
 
object Hello123 {
  def main(args: Array[String]): Unit = {
 
    Breaks.breakable{
      for(i <- 1 to 5){
        if ( i == 3)
          Breaks.break()
        println(s"${i}")
      }
    }
    println("循环结束")
  }
 
}
```
```Scala
import scala.util.control.Breaks._
// breakable 对 break()抛出的异常做了处理,代码就继续执行
breakable {
    while (n <= 20) {
        n += 1
        println("n=" + n)
        if (n == 18) {
            //中断 while
            //说明
            //1. 在 scala 中使用函数式的 break 函数中断循环
            //2. def break(): Nothing = { throw breakException }
            break()
        }
    }
}
```


# 函数式编程基础
1. 在 scala 中，方法和函数几乎可以等同(比如他们的定义、使用、运行机制都一样的)，只是函数 的使用方式更加的灵活多样。
2. 函数式编程是从编程方式(范式)的角度来看，函数式编程把函数当做一等公民，<font color=red size=3>**充分利用函数、 支持的函数的多种使用**</font>方式，如同在面向对象编程中将对象作为基本单位
![函数式编程](10、函数式编程.png)
3. "函数式编程"是一种"编程范式"（programming paradigm）。【面向对象：解决问题的时候是将
问题拆解成一个一个小问题（形成了对象），分别解决。对象关系：继承，实现，重写，多态】
4. 它属于"结构化编程"的一种，主要思想是把运算过程尽量写成一系列嵌套的函数调用。
5. 函数式编程中，将函数也当做数据类型，因此可以接受函数当作输入（参数）和输出（返回值）。
（增强了编程的粒度）
6. java中的方法和scala中函数都可以进行功能的封装，但是方法必须和类型绑定，即从属于哪个类，但函数不需要
7. 函数式编程中，最重要的就是函数。关心的是问题的解决方案（封装功能），重点在于（功能）函数的入参，出参

## 声明函数以及调用
{% note primary %}
<font color=red>def</font> 函数名 <font color=red>([</font>参数名: 参数类型<font color=red>]</font>, ...<font color=red>)[</font><font color=blue>[</font>: 返回值类型<font color=blue>]</font> =<font color=red>] {</font>
	语句... //完成某个功能
return 返回值
{% endnote %}

1. [参数名: 参数类型], ...：表示函数的输入(就是参数列表), 可以没有。 如果有，多个参数使用逗号间隔
2. 函数可以有返回值,也可以没有
	- 返回值形式1:  // def 函数名(参数列表) : 数据类型 = {函数体}  // 返回值确定,清晰   
	- 返回值形式2:  // def 函数名(参数列表) = {函数体}  // 有返回值, 类型是推断出来的，<font color=red>**不能有return关键字**</font>
	- 返回值形式3:  // def 函数名(参数列表) {函数体}  // 无返回值 Unit
	- <font color=blue>如果没有return ,默认以执行到最后一行的结果作为返回值</font>
3. 函数没有重载的概念，如果在同一个作用域中，函数不能同名
4. 如果函数体中只有一行代码，大括号可以省略
	- def test() = "caixianquan"
5. 如果函数声明中没有参数列表，小括号可以省略
	- def test = "caixianquan"
6. 如果函数声明小括号省略，那么访问函数时<font color=red>**不能增加小括号**</font>

## 可变参数
```Scala
def main(args: Array[String]): Unit = {

   def test(name: String*) : Unit = {
     println(name)
   }
   //调用函数时，可传多个参数，也可以不传参数
   test("zhangsan","list","wangwu")
   test()

}
```
`传入值的个数不同封装类型不同`
![可变参数](11、可变参数.png)

## 默认参数--带名参数
```Scala
object Hello123 {
  def main(args: Array[String]): Unit = {
 
    //默认参数
    def test(name: String, age: Int = 20) : Unit = {
      println("name: " + name + ", " + "age: " + age)
    }
    test("caixianquan")
    test("caixianquan",30)
 
  }
    //带名参数
  def test1(name2: String = "lisi", name1: String) : Unit = {
    println("name2: " + name2 + ", " + "name1: " + name1)
  }
  test1(name1 = "zhangsan")
 
}
```
![默认参数](12、默认参数.png)

## 函数式编程高级用法
1. 函数在scala可以做任何的事情
2. 函数可以赋值给变量
3. <font color=red size=3>**函数可以作为函数的参数**</font>
```Scala
object Hello123 {
  def main(args: Array[String]): Unit = {
 
    // 无参函数作为参数
    def f4(f : () => (Int)) : Int = {
      f() + 5
    }
    def f5() : Int = {
      10
    }
    println(f4(f5))
 
    //有参函数作为参数
 
    def f3(age: Int , f : (Int) => (Int)) ={
      f(age) + 5
    }
    def f2(i : Int) : Int ={
      i + 6
    }
    println(f3(4, f2))
 
    //使用匿名函数改善代码
 
    def f1(f : () => Unit) ={
      f()
    }
    f1(()=>{println("xxxxxxxxx")})
  }
 
}

```
4. 函数可以作为函数的返回值
```Scala
object Hello123 {
  def main(args: Array[String]): Unit = {
 
    def f() = {
      println("function")
    }
 
    def f0() = {
      //如果直接写上函数，那么将会执行这个函数，就无法返回这个函数而返回这个函数执行后的结果
      //f
      //想要返回这个函数，需要增加特殊符号：下划线
      f _
    }
 
    //这里执行后的结果是返回f()这个函数，那么可以再加上一个括号执行f()函数
    //f0()
    f0()()




    def f1(i : Int) = {
      def f2(j : Int) = {
        i * j
      }
      f2 _
    }
    println(f1(2)(3))  //6

  }
 
}

```
5. 函数柯里化
	- 对上述的函数嵌套进行简化，即为函数柯里化
```Scala
object Hello123 {
  def main(args: Array[String]): Unit = {
 
    def f3(i: Int)(j: Int) : Int = {
      i * j
    }
    println(f3(2)(3)) //6
 
  }
 
}

```
6. 一个函数在实现逻辑时，将外部的变量引入到函数的内容，改变了这个变量的生命周期，称之为闭包，柯里化使用了闭包概念
```Scala
 def f1(i : Int) = {
      def f2(j : Int) = {
        i * j
      }
      f2 _
    }
    println(f1(2)(3))  //6

//这里由于f2函数使用f1的变量，所以这个变量不能释放掉，从而改变了这个变量的生命周期，即为闭包
```


# 面向对象编程（基础部分）
## 简单入门
```Scala
object Hello123 {
  def main(args: Array[String]): Unit = {
 
    class User{
      //声明属性
      //下划线可以理解为默认初始化
      var username : String = _
 
      var age : Int = _
 
      def login() : Boolean = {
        true
      }
    }
 
    //创建类的对象
    val user: User = new User()
 
    //调用对象的属性或方法
    user.username = "caixianquan"
    println(user.username)
  }
 
}
```
```Scala
package com.caixianquan.scalaToLearn
 
import com.caixianquan.scalaToLearn.test.test1.Emp1
 
 
object Test {
  def main(args: Array[String]): Unit = {
    val emp = new Emp()
    val emp1 = new Emp1()
  }
}
```


## package
1. 在同一个源码文件可以多次声明package，声明的类在最后声明的包中
如下例子是折叠来写，找到这个Emp类是通过com.caixianquan.scalaToLearn.test包下的
```Scala
package com.caixianquan.scalaToLearn
package test
 
object Hello123 {
  def main(args: Array[String]): Unit = {
 
    println("zzzz")
 
  }
  class Emp{
 
  }
 
}
```
![package](13、package.png)
```Scala
package com.caixianquan.scalaToLearn
 
import com.caixianquan.scalaToLearn.test.Hello123.Emp
 
object Test {
  def main(args: Array[String]): Unit = {
    val emp = new Emp()
  }
}
```
2. package后可以加花括号，表示如果在花括号里面声明的类就在这个package下，如果在外面声明的类那么就在当前包下
```Scala
package com.caixianquan.scalaToLearn
package test{
  package test1{
    //在test.test1包下声明的类
    class Emp1{}
  }
}
 
object Hello123 {
  def main(args: Array[String]): Unit = {
 
    println("zzzz")
 
  }
}
//在ScalaToLearn下声明的类
class Emp{
 
}
```
<font color=red size=3>注意要使用包对象，必须得使用包的全称路径，import只是用来导入类</font>
```Scala
package com.caixianquan.scala
 
object test {
  def main(args: Array[String]): Unit = {
    println(com.caixianquan.scalaToLearn.test.test.test)
  }
}
```
3. scala中可以声明父包和子包，父包中的类，子类可以直接访问，不需要引入，即作用域的概念
```Scala
package com.caixianquan.scalaToLearn
package test{
  class Emp1{
 
  }
  package test1{
    object Hello123{
      def main(args: Array[String]): Unit = {
        //在父包中声明的类直接在子包中使用而不需要导入
        val emp1 = new Emp1;
        println(emp1)
        println("zzzz")
 
      }
    }
 
  }
}
```
4. scala中package下只能声明类，但是无法声明变量和函数（方法），scala为了弥补包的不足，使用了包对象的概念，可以声明属性和方法
```Scala
package com.caixianquan.scalaToLearn
package test{
  class Emp1{
 
  }
  package object test{
    val test = "123"
    def test1(): Unit ={
 
    }
  }
  package test1{
    object Hello123{
      def main(args: Array[String]): Unit = {
      }
    }
 
  }
}
```


## import
1. 用于导入类
2. 可以在任意的地方使用
3. 可以导入一个包中的所有类，比如java.util._
4. 导入相同包中的多个类，可以采用大括号进行包含处理: `import java.util.{ArrayList, List, Date}`
5. 在包名前加上`_root_`表示全路径，如：`import _root_.java.util._`，这样子就会使用java.util下的包，例子说明：
```Scala
package com.caixianquan.scalaToLearn
package java{
  package util{
 
 
    class HashMap{
 
    }
    object Hello123{
      def main(args: Array[String]): Unit = {
        //如果不加上_root_，那么使用的是当前自定义的HashMap类
        val root_hashMap = new _root_.java.util.HashMap[Int, Int]()
        val hashMap = new HashMap
        println(root_hashMap)
        println(hashMap)
      }
    }
 
  }
}
```
6. 在导入类的时候给类起别名
```Scala
package com.caixianquan.scalaToLearn
 
import java.util.{HashMap=>JavaHashMap}
 
object Hello123{
  def main(args: Array[String]): Unit = {
    new JavaHashMap()
  }
}
```


## field属性
1. scala中给类声明属性，默认为私有的，但是底层提供了公共的setter和getter方法，在使用类时直接调用属性即可为属性赋值
2. 如果给属性增加private修饰符，那么属性无法在外部访问，因为底层生成的setter和getter方法都是私有的
3. 如果声明的属性使用val，那么属性是私有的，并且底层使用final修饰，底层只提供getter方法，而没有setter方法
4. 为了和java bean规范统一，scala提供了注解，生成java中对应的set、get方法
```Scala
package com.caixianquan.scalaToLearn
 
import scala.beans.BeanProperty
 
 
object Hello123{
  def main(args: Array[String]): Unit = {
    val hello123 = new Hello123
    hello123.setAddress("xxxx")
    println(hello123.getAddress)
  }
}
 
class Hello123{
  @BeanProperty var address: String = _
}
```


## 访问权限
1. 所谓的权限其实是方法的提供者和方法的调用者之间的关系
```Scala
package com.caixianquan.java;
 
/**
 * @ClassName Access
 * @Description TODO
 * @Author Administrator
 * @Data 2019/12/8 20:52
 * @Version 1.0
 **/
public class Java10_Access {
    public static void main(String args []){
        //这里的含义是Java10_Access这个类创建了A类的对象，然后调用了A类对象的clone方法,即clone是从属于A这个类
              //而Java10_Access和A中的clone是没有任何关系
        //是否能够调用有几个条件：同类，同包，或者是父子关系
        //方法的提供者：java.lang.Object
        //方法的调用者：com.caixianquan.java.Access
        A a = new A();
        A.clone();  //报错
    }
 
}
class A{
 
}
```
![访问权限](14、访问权限.png)
而A类重写了Object里的clone方法后，如下
那么方法的提供者就为com.caixianquan.java.A
方法的调用者为：com.caixianquan.java.Access，这样子是在同包里面，调用clone就不会报错
![调用关系](15、调用关系.png)
2. 伴生对象可以访问伴生类的私有属性（因为底层伴生对象和伴生类是在同一个类中）
3. 四种访问权限：public,protected,default(package),private
4. public：默认的访问权限，没有关键字
5. protected，只能子类访问，同包访问不了
6. private，私有访问权限，只能当前类访问
7. default，包访问权限，特殊的语法规则，private[包名]，指定的包可以访问
```Scala
package com.caixianquan.scalaToLearn
 
 
package p1{
  package p2{
    class UserP2{
      var username = "caixianquan"
      private var password = "123"
      protected var email = "@qq.com"
      //可以在p2包下访问
      private[p2] var address = "xxxx"
       
      def test2(): Unit ={
        println(username)
        println(password)
        println(email)
        println(address)
      }
    } 
     
    class UserP3{
      def test1(): Unit ={
        val user1 = new UserP2;
        //可以访问address和username
        println(user1.address)
        println(user1.username)
      }
    }
  }
   
  package p3{
 
    import com.caixianquan.scalaToLearn.p1.p2.UserP2
 
    class EmpP3{
      def test(): Unit ={
        val user = new UserP2
        //只能访问username
        println(user.username)
      }
    }
     
    class UserP2Child extends UserP2{
      def test4: Unit ={
        println(email)
      }
    }
  }
}
 
 
object Hello123{
  def main(args: Array[String]): Unit = {
  }
}
```


## 方法
1. 伴生对象和伴生类，伴生类和伴生对象的名字相同，关键字为class和object，成员属性和方法写在class中，静态属性和方法写在伴生对象object中
2. 在伴生对象中可以创建伴生类对象，使用系统提供的apply方法
```Scala
package com.caixianquan.scala
 
//伴生类（成员）
class Student {
  private val sname = "caixianquan";
}
 
//伴生对象（静态）
//伴生对象可以访问伴生类的私有属性
//创建伴生类对象
object Student{
  def test(): Unit ={
    def apply: Student = new Student()
  }
}
```
```Scala
package com.caixianquan.scalaToLearn
 
import com.caixianquan.scala.Student
 
 
object Hello123{
  def main(args: Array[String]): Unit = {
    //自动调用Student.apply方法
    val student = Student
    println(student)
  }
}
```


## 构造方法
1. scala中的构造方法分为两类：主构造方法和辅助构造方法
2. scala构建对象可以通过辅助构造方法创建，但是必须调用主构造方法
3. scala是完全面向函数的语言，所以类也是函数，可以使用小括号作为函数的参数列表
4. 类所代表的函数就是这个类的构造方法，默认情况下，scala也是给类提供无参构造方法，所以小括号可以省略
```Scala
class Hello123(s:String){
  //类体&构造方法体
  println(s)
}
```
5. 在类的后面声明的构造方法就是主构造方法
6. 在主构造方法中声明的构造方法就是辅助构造方法
```Scala
package com.caixianquan.scalaToLearn
 
 
 
object Hello123{
  def main(args: Array[String]): Unit = {
    val hello123 = new Hello123()
  }
}
 
class Hello123(s:String){
 
  println(s)
  //声明辅助构造方法，方法名为this,辅助构造方法必须调用主构造方法,在方法内显示调用
  def this(){
    this("lisi")
  }
}
```
7. 多次调用辅助构造方法
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val hello123 = new Hello123()
  }
}
 
class Hello123(s:String){
 
  println("主构造方法")
  println(s)
 
  def this(){
    this("辅助构造方法1", "xxx")
  }
 
  def this(s:String, ss:String){
    this(s)
    println("辅助构造方法2")
  }
 
}
```
{% note info %}
但这样子会报以下错误：
Error:(17, 5) called constructor's definition must precede calling constructor's definition
    this("辅助构造方法1", "xxx")
<font color=red size=3>这是因为构造方法调用其他的构造方法时必须声明在前，调用在后</font>
{% endnote %}
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val hello123 = new Hello123()
  }
}
 
class Hello123(s:String){
 
  println("主构造方法")
  println(s)
   
 
  def this(s:String, ss:String){
    this(s)
    println("辅助构造方法2")
  }
  def this(){
    this("辅助构造方法1", "xxx")
  }
 
}
```
![调用构造方法](16、调用构造方法.png)
8. 父类有参数构造方法时
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val user : User = new User("caixianquan")
  }
}
 class Person(s:String){
  println("Person 主构造方法 : " + s)
 
 
}
//如果父类主构造方法有参数,那么必须显示的传递参数
//可以在继承父类的后面增加小括号，传递参数，等同于调用父类的构造方法
class User extends Person("zhangsan"){
  println("User 主构造方法")
 
  def this(s:String){
    this()
    println("User 辅助构造方法")
  }
}
```
9. 类构造方法的参数的作用域默认为整个类的主体，但是如果想要参数作为属性来使用，可以采用特殊方式声明
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val person = new Person("123")
    println(person.name)
  }
}
 class Person(var name:String){
    
}
```


### 父类的构造方法
1. 父类无参数构造方法时
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val user : User = new User("caixianquan")
  }
}
 class Person{
  println("Person 主构造方法")
    
 
}
class User extends Person{
  println("User 主构造方法")
 
  def this(s:String){
    this()
    println("User 辅助构造方法")
  }
}
```


# 面向对象编程（中级部分）
## 继承
1. 子类会继承父类的所有东西，private是指访问权限，子类也会继承，但是能不能访问是另一回事
2. 一个类中有抽象方法说明这个类是抽象类，如果一个抽象类中有一个方法不一定是抽象方法
3. 重写方法需要override修饰
4. 多态中调用的是子类的方法
5. 动态绑定机制：成员方法在执行的过程中，JVM将方法和当前调用对象实际内存进行绑定
```Scala
package com.caixianquan.java;
 
public class Access {
    public static void main(String args []){
 
        A a = new A();
        System.out.println("当声明类型为A，构造类为A时：" + a.getResult());  //结果为20，不含子类
//        A b = new B();
//        System.out.println("当声明类型为A，构造类为B时：" + b.getResult());  //结果为50，多态调用的是子类的方法
        //注释掉子类B中的方法时
        A c = new B();
        //使用了动态绑定机制，当前调用对象的实际内存为B类，那么会检查B类中是否有getResult方法，由于B中注释掉了，
//        那么直接继承A中的getResult方法，也即执行了A中的getResult方法。而属性是没有动态绑定机制
        //那么属性是在哪声明就在哪里使用，所以用到的是A类中的i属性
        System.out.println("当声明类型为A，构造类为B且注释掉B中的方法时：" + c.getResult());   //结果为20
         
        //新问题：B继承了A中的i，自己声明了一个i，那么在B中就存在两个i【调试中可以看到B类中的信息】，B中的方法会使用哪个变量i
        //这是因为这里省略了一个关键字：this，在B中方法里，this代指当前对象被省略了，而super是指父类对象
    }
 
}
class A{
    public int i = 10;
    public int getResult(){
        return i + 10;
    }
}
class B extends A{
    public int i = 30;
//    public int getResult(){
//        return i + 20;
//    }
}
```
6. 只要是成员方法就一定会遵循动态绑定机制
```Scala
public class Access {
    public static void main(String args []){
 
        A c = new B();
        //这里的getI方法也是成员方法，一定遵循动态绑定机制，使用的还是实际内存对象B中的getI方法
        System.out.println("当声明类型为A，构造类为B且注释掉B中的方法时：" + c.getResult());   //结果为40
 
    }
 
}
class A{
    public int i = 10;
    public int getResult(){
        return getI() + 10;
    }
    public int getI(){
        return  i;
    }
}
class B extends A{
    public int i = 30;
//    public int getResult(){
//        return i + 20;
//    }
    public int getI(){
        return i;
    }
}
```
7. 在scala中，属性也是可以重写的，因为属性也是可以抽象的，因为Scala把这些抽象属性也是在底层由方法实现
8. 抽象属性在编译为class文件时，不产生属性，但是产生抽象getter方法
```Scala
abstract class Person{
  var name : String = _
  //属性可以抽象
  var sex : String
   
}
class User extends Person{
  //重写属性
   var sex: String = _
}
```
9. 属性可以被重写，需要override修饰，<font color=red size=3>但不能重写父类var声明的变量，即可以重写val声明的变量</font>
10. 不能重写var声明的变量原因是底层使用了java的动态绑定机制，var声明的变量是由方法实现，如果能够重写，那么父类的变量就访问不到了；而val声明的变量是因为底层是final修饰的，只有get方法，所以不会造成无法获取父类val声明的变量

## 特质Trait
1. 特质可以被继承，使用extends，多个trait使用with关键字
2. 如果类同时存在父类和trait，依然采用继承方式，但是继承的是父类，连接【混入】特质使用with
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val user = new User
    println(user)
  }
}
trait TestTrait{
 
}
trait TestTraitOther{
 
}
trait TestTrait1{
 
}
class Person{
   
}
class User1 extends TestTrait with TestTraitOther {

}
//特质可以继承，使用extends,多个trait使用关键字with
class User extends Person with TestTrait with TestTraitOther with TestTrait1 {
 
}
```
3. java中的接口无法直接构建对象，必须使用类，<font color=red>trait也无法构建对象</font>
4. scala中的trait可以执行代码
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val user = new User
    println(user)
  }
}
trait TestTrait{
  println("trait test...")
}
class User extends TestTrait{
 
}
```
5. java中的接口可以声明方法，早期版本声明的方法都是抽象，新版本可以有默认实现，也可以声明属性，属性值无法修改
6. <font color=red>scala中的trait可以声明方法及实现，也可以声明属性，，属性值可以修改，都可以在混入的类中调用</font>
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val user = new User
    println("username: " + user.username)
    user.username = "wangwu"
    println("username1: " + user.username)
    user.test
  }
}
trait TestTrait{
  var username : String = "zhansan"
  def test: Unit ={
    println("xxxx")
  }
}
class User extends TestTrait{
 
}
```
![trait](15、trait.png)
7. 特质中可以声明抽象方法
8. 引入一个java接口的例子说明：接口只与实现类有关，跟父子类没有关系
```Scala
public class Access {
    public static void main(String args []){
        A a = new C();
        //判断C类是否实现了接口A，如果长度为0说明没有实现任何接口
        System.out.println(C.class.getInterfaces().length);
    }
 
}
interface A{
     
}
class B implements A{
     
}
class C extends B{
     
}
```
![接口与实现类有关](17、接口与实现类有关.png)
9. 上述例子可以判断如果一个类同时继承父类和trait，那么由于trait只和这个类有关，跟父类无关，程序会先执行父类，因为实现了trait会再执行trait，最后执行这个类
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    new User
  }
}
trait TestTrait{
  println("trait code...")
}
class Person{
  println("Parent code...")
}
class User extends Person with TestTrait{
  println("child code...")
}
```
![trait的执行顺序](18、trait的执行顺序.png)
10. 如果父类混入了相同的特质，那么特质的代码只会执行一遍【trait一旦被实现，就不会再次初始化】
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    new User
  }
}
trait TestTrait{
  println("trait code...")
}
class Person extends TestTrait {
  println("Parent code...")
}
class User extends Person with TestTrait{
  println("child code...")
}
```
![父类混入相同的特质](19、父类混入相同的特质.png)
11. 特质可以继承其他的特质，重写父特质的方法
12. 多特质混入时，代码执行【声明】顺序为从左到右，如果有父特质，会优先执行
13. 多特质混入时，方法调用的顺序为从右到左
14. 特质中super关键字不是指父特质，指代的是上一级特质，如DB到File，因为File左边没有特质了，最后才到父特质Operate
15. 如果希望super指向父特质，需要在增加特殊操作。`super[Operate].insert`
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val mysql = new Mysql
    mysql.insert
  }
}
trait Operate{
  println("Operate...")
  def insert: Unit ={
    println("插入数据")
  }
}
trait DB extends Operate{
 
  println("DB...")
  override def insert: Unit = {
    println("向数据库")
    super.insert
  }
}
trait File extends Operate{
  println("File...")
  override def insert: Unit = {
    println("向文件")
    super.insert
  }
}
class Mysql extends File with DB {
 
}
```
![多特质混入1](20、多特质混入1.png)
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val mysql = new Mysql
    mysql.insert
  }
}
trait Operate{
  println("Operate...")
  def insert: Unit ={
    println("插入数据")
  }
}
trait DB extends Operate{
 
  println("DB...")
  override def insert: Unit = {
    println("向数据库")
    super.insert
  }
}
trait File extends Operate{
  println("File...")
  override def insert: Unit = {
    println("向文件")
    super.insert
  }
}
class Mysql extends DB with File {
 
}
```
![多特质混入2](21、多特质混入2.png)
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    val mysql = new Mysql
    mysql.insert
  }
}
trait Operate{
  println("Operate...")
  def insert: Unit ={
    println("插入数据")
  }
}
trait DB extends Operate{
 
  println("DB...")
  override def insert: Unit = {
    println("向数据库")
    super.insert
  }
}
trait File extends Operate{
  println("File...")
  override def insert: Unit = {
    println("向文件")
    super[Operate].insert
  }
}
class Mysql extends DB with File {
 
}
```
![多特质混入3](22、多特质混入3.png)
16. java的接口可以在scala中当成特质来用
17. <font color=red>动态混入，扩展性强，在构建对象时直接混入特质</font>
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    //动态混入
    val mysql = new Mysql with Operate
    mysql.insert
  }
}
trait Operate{
  println("Operate...")
  def insert: Unit ={
    println("插入数据")
  }
}
 
//现在Mysql类是没有插入的方法，想要扩展这个类的功能而不修改这个类，使用动态混入
 
//class Mysql extends File{   不允许
//  
//}
class Mysql  {
 
}
```
18. 特质继承类
	- 特质如果想使用某个类，可以继承
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    //动态混入
    val mysql = new Mysql 
    mysql.getMessage
  }
}
//特质继承类
trait Operate extends Exception{
 
  def insert: Unit ={
    println("插入数据")
    this.getMessage
  }
}
class Mysql extends Operate {
 
}
```
	- 如果不想要用过继承来使用某个类，如Exception，可以限定特质的范围
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    //动态混入
    val mysql = new  Mysql
    mysql.getMessage
  }
}
trait Operate{
  //特质使用范围
  this:Exception =>
  def insert: Unit ={
    println("插入数据")
    this.getMessage
  }
}
class Mysql extends Exception with Operate {
 
}
```


## 类信息
1. 获取类的信息，需要采用特殊的方法：classOf[类型]
2. classOf可以直接使用的原因是因为scala.Predef伴生对象默认导入到当前开发环境中
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
    //java中：User.class
    //object.getClass
 
    //获取类信息
    val userClass: Class[User] = classOf[User]
    userClass.getInterfaces
  }
}
class User {
 
}
```
3. 可以给类起别名
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
     
    type xxx = User
    new xxx
  }
}
class User {
 
}
```
4. 类型判断与转换
```Scala
object Hello123{
  def main(args: Array[String]): Unit = {
 
    val user: Object = new User1
     
    //判断类型
    val bool = user.isInstanceOf[User1]
    if(bool){
      //转换类型
      val user1 = bool.asInstanceOf[User1]
    }
  }
}
class User1 {
 
}
```
5. scala中可以不适用main方法作为入口来执行程序
```Scala
//scala会自动导入scala包中的类
object Hello123 extends App {
  println("xxxxx")
}
```
6. 枚举：开发不太常用，因为需要频繁修改代码，不方便

# 隐式转换和隐式参数
1. scala支持数值类型的自动转换，short -> int -> long
2. 支持多态语法中的类型自动转换,child -> parent -> trait(interface)
3. 可以自定义类型转换规则，将两个无关的类型通过编译手段让它们可以自动转换
4. 使用隐式函数，关键字implicit
```Scala
object Hello123 extends App {
  implicit  def  transform(d: Double) : Int ={
    d.toInt
  }
  //上述函数将5.0自动转换为5，故不会报错
  val i : Int = 5.0
  println(i)
 
  /*
  手动实现一个隐式转换函数与5.0.toInt的区别？
  OCP：Open Close原则，开闭原则允许功能的扩展，但不允许对之前的代码有任何修改
   */
}
```
5. 隐式转换函数的函数名可以任意，隐式转换与函数名无关，只与函数签名（函数参数类型和返回值类型）有关。
6. 隐式函数可以有多个(即：隐式函数列表)，但是需要保证在当前环境下，只有一个隐式函数能被识别
7. 在相同的作用域内，不能含有多个相同类型的转换规则
8. 使用隐式函数为类扩展功能，相当于动态混入特质
```Scala
object Hello123 extends App {
   
  implicit def transform(a:Mysql): Operater ={
    new Operater
  }
  val mysql = new Mysql
  mysql.select
  //这里就可以使用delete方法
  mysql.delete
 
}
 
class Mysql{
  def select: Unit ={
     
  }
}
 
class Operater{
  def delete: Unit ={
     
  }
}
```
9. 隐式参数：可以修改默认参数
传入参数织入隐式值，隐式参数只能在最后
```Scala
object test {
  def main(args: Array[String]): Unit = {
     
    implicit val username : String = "wangwu"
    def test(age : Int)(implicit s : String) : Unit = {
      println("Hello: " + s + " Your age :" + age)
    }
 
    test(5)
 
  }
}
```
```Scala
object Hello123 extends App {
  def test(s:String = "zhangsan"): Unit ={
    println("Hello: "+ s)
  }
  //不传参数时使用默认参数
  test()
}
```
![隐式转换](23、隐式转换.png)
```Scala
object Hello123 extends App {
   
  //使用隐式参数
  def test(implicit s:String = "zhangsan"): Unit ={
    println("Hello: "+ s)
  }
  //增加了implicit关键字，如果没有声明隐式值那么调用时可以省略小括号
  //test()
  test
}
```
![隐式转换1](24、隐式转换1.png)
```Scala
object Hello123 extends App {
  //隐式值
  implicit val username : String = "wangwu"
  //使用隐式参数
  def test(implicit s:String = "zhangsan"): Unit ={
    println("Hello: "+ s)
  }
  //声明了隐式值那么调用时可以有无小括号有本质区别
  //不加括号时会将隐式值传入到参数中
  print("不加括号时织入隐式值：")
  test
  //加括号后由于程序任务括号内需要填写参数，那么会将原先的默认参数带上
  print("加括号时使用默认参数：")
  test()
}
```
![隐式转换2](25、隐式转换2.png)
10. 隐式值不能有多个

## 隐式类
1. 其所带的构造参数有且只能有一个
2. 隐式类必须被定义在“类”或“伴生对象”或“包对象”里，即<font color=red size=3>**隐式类不能是 顶级的(top-level  objects)**</font>。
3. 隐式类不能是case class（case class在后续介绍 <font color=black>**样例类**</font>）
4. 作用域内不能有与之相同名称的标识符
```Scala
object Hello123 extends App {
  implicit class Person(u:User4){
    def delete: Unit ={
       
    }
  }
  val user = new User4
  user.insert
  user.delete
}
class User4{
  def insert: Unit ={
     
  }
}
```
5. 隐式转换的时机
	- 当方法中的参数的类型与目标类型不一致时
	- 当对象调用所在类中不存在的方法或成员时，编译器会自动将对象进行隐式转换（根据类型）
6. 如果T被定义为T with A with B with C,那么A,B,C都是T的部分，在T的隐式解析过程中，它们的伴生对象都会被搜索
```Scala
object Hello123 extends App {
  val user = new User4
  user.insert
  user.delete
}
class User4 extends Test {
  def insert: Unit ={
 
  }
}
 
trait Test{
   
}
object Test{
  implicit class Person(u:User4){
    def delete: Unit ={
 
    }
  }
}
```


# 集合（上）-基本使用
```Scala
object Hello123 extends App {
  //Java中的集合：List，Set，Map（可变）
  //List：有序，可重复，LinkedList，ArrayList
  //Set：无序，不重复，HashSet，TreeSet
  //Map：无序，可重复，K-V，key不能重复，value可重复，HashMap，HashTable，TreeMap
}
```
1. 集合分两大类：可变集合和不可变集合
2. 不可变集合：scala.collection.immutable。scala不可变集合，就是这个集合本身不能动态变化。(类似java的数组，是不可以动态增长的)
![不可变集合](26、不可变集合.png)
3. 可变集合：  scala.collection.mutable。可变集合，就是这个集合本身可以动态变化的。(比如:ArrayList , 是可以动态增长的) 
![可变集合](27、可变集合.png)
4. Scala默认采用不可变集合，对于几乎所有的集合类，Scala都同时提供了可变(mutable)和不可变(immutable)的版本
5. Scala的集合有三大类：序列Seq、集Set、映射Map，所有的集合都扩展自Iterable特质，在Scala中集合有可变（mutable）和不可变（immutable）两种类型

## scala中的数组
1. Scala中的数组使用Array对象实现，使用中括号声明数组的类型
2. Array[String]
3. Scala可以使用简单的方式来创建数组
4. Array可以通过apply方法来创建数组对象
5. 可变数组：ArrayBuffer
```Scala
object Hello123 extends App {
  private val ints: Array[Int] = Array(1,2,3,4)
  //访问数组,使用小括号，增加索引的方式来访问数组
  println(ints(0))
  //数组长度
  println("数组长度："+ints.length)
 
  println("+: "+ints.+("sssss"))    //+: [I@35f983a6sssss
  //将数组转换为字符串以逗号分隔打印出来
  println(ints.mkString(","))
 
  //将数组中的每个元素打印
  for (elem <- ints) {
    println(elem)
  }
 
  //另一种遍历
  //foreach方法会将数组中的每一个元素进行循环遍历，执行指定函数实现逻辑
  def printlnxxx(i:Int ):Unit = {
    println(i)
  }
  ints.foreach(printlnxxx)
 
  //匿名函数使用
  ints.foreach((i:Int)=>{println(i)})
  //继续简化,因为每个元素只使用一次，故
  ints.foreach({println(_)})
  //又由于只有一行代码，所以可以省略花括号
  ints.foreach(println(_))
  //如果参数只有一个的，在当前场合下可以省略
  ints.foreach(println)
 
 
  //增加元素,采用方法向数组中增加新的元素但是不会对原有数组造成影响，而是产生新的数组
  val ints1 : Array[Int] = ints :+(5) //如果数组在前，那么5会追加到数组末尾
  val ints2 : Array[Int] = 5 +: (ints) //如果数字在前，那么5会追加到数组最前
  println(ints1.mkString(","))
  println(ints1 == ints)
 
  //修改数据
  //数组不可变是内存地址不可变，但里面的值可以修改
  ints.update(1,5)
  println(ints.mkString(","))
}
```
```Scala
object Hello123 extends App {
  //可变数组
   val arrayBuffer: ArrayBuffer[Int] = ArrayBuffer(1,2,3,4)
   
  //访问可变数组
  println(arrayBuffer(0))
   
  //修改值
  arrayBuffer(0) = 9
   
  //打印字符串
  println(arrayBuffer.mkString(","))
   
  //循环遍历
  arrayBuffer.foreach(println)
   
  //增加数据
   val buffer1: ArrayBuffer[Int] = arrayBuffer :+ 5
   val buffer: ArrayBuffer[Int] = arrayBuffer+=(9)
   
  //向指定的位置，增加元素
  arrayBuffer.insert(1,9)
   
  //删除数据,参数为索引值
   val i: Int = arrayBuffer.remove(1)
   
  //删除数据,第一个参数索引值，第二个参数，从指定索引开始删除的个数
  private val unit: Unit = arrayBuffer.remove(1, 2)
}
```
6. 可变数组与不可变数组的转变
```Scala
object Hello123 extends App {
  //可变数组
   val arrayBuffer: ArrayBuffer[Int] = ArrayBuffer(1,2,3,4)
   
  //可变数组转为不可变数组
   val array: Array[Int] = arrayBuffer.toArray
   
  //不可变数组
   val ints = Array(1,2,3,4)
   
  //不可变数组转为可变数组
   val buffer: mutable.Buffer[Int] = ints.toBuffer
}
```


## 序列-Seq相关集合
### 不可变集合List
```Scala
object Hello123 extends App {
  //序列 Seq,不可变集合
  //默认scala提供的集合都是不可变（immutable）
   val list: List[Int] = List(1,2,3,4)
 
  //通过索引获取数据
  println(list(0))  //1
 
  //增加数据
   val list1: List[Int] = list :+ 1
  println(list1.mkString(","))  //1,2,3,4,1
  println(list == list1)  //false
 
  //往list中存放增加list
   val list2: List[Int] = List(5,6,7,8)
   val list3: List[Int] = list.++(list2)
  // val list4: List[Int] = list ++ list2
  println(list3.mkString(","))  //1,2,3,4,5,6,7,8
 
  //list中的冒号运算符的运算顺序从右到左
   val list5: List[Int] = 7::8::9::list
  println(list5.mkString(",")) //7,8,9,1,2,3,4
 
 
  val list6: List[Any] = 9::list1::list
  println(list6.mkString(","))  //9,List(5,6,7,8),1,2,3,4,不是预期想要的结果
 
  //使用三个冒号运算符，将list拆开
  val list7: List[Int] = 9::list1:::list
  println(list7.mkString(","))  //9,5,6,7,8,1,2,3,4
 
  //特殊集合:空集合
  println(List()) //List()
  println(Nil)  //List()
  1::2::3::Nil
 
  //修改
   val list8: List[Int] = list.updated(2,5)
  println(list8.mkString(","))  //1,2,5,4
 
  //删除数据,参数指从删除的个数，从第一个开始
   val list9: List[Int] = list.drop(3)
  println(list9.mkString(",")) //4
}
```


### 可变集合ListBuffer
```Scala
object Hello123 extends App { 
  //可变集合
  private val listBuffer: ListBuffer[Int] = ListBuffer(1,2,3,4)
  /*
  listbuffer.insert()
  listBuffer.update()
  listBuffer.drop()
  listBuffer.remove()
   */
 
  //集合的属性
  //头部
  println(listBuffer.head)  //1
  //尾部（除了头以外）
  println(listBuffer.tail)  //ListBuffer(2,3,4),除了头部以外都是尾部
  //最后一个元素
  println(listBuffer.last)  //4
  //初始化（除了最后一个）
  println(listBuffer.init)  //ListBuffer(1,2,3)
}
```


### 队列，可变集合——Queue
```Scala
//队列（一定可变）
  val q = mutable.Queue(1,2,3,4)
  println("add Before = " + q)
  q.enqueue(5)
  println("add after " + q)
  val i: Int = q.dequeue()
  println("i= " + i)
  println("delete after" + q)
  q.dequeue()
  q.dequeue()
  q.dequeue()
  println("delete after" + q)
```


## Set相关集合
```Scala
object Hello123 extends App {
  //不可变Set集合，无序，不可重复
  val set: Set[Int] = Set(1,2,3,4,1)
 
  println(set.mkString(","))  //1,2,3,4,不可重复，也是无序
 
  //增加数据
  println(set + 11)
  //删除数据
  println(set - 3)
 
  //可变set集合
  val mset : mutable.Set[Int] = mutable.Set(1,2,3,4)
}
```


## Map相关集合
```Scala
object Hello123 extends App {
  //Map集合：K-V对
  //HashMap.put("k","v")
  //Scala中k-v对数据采用特殊的方式声明
  //默认Map集合不可变
  val map : Map[String, Int] = Map("a"->1,"b"->2,"c"->3)
 
  //增加数据
  val map1 : Map[String, Int] = map + ("d"->4)
  println(map1.mkString(",")) //a -> 1,b -> 2,c -> 3,d -> 4
  println(map == map1)  //false
  //删除数据
  private val map2 : Map[String, Int] = map - ("e")
  println(map2.mkString(",")) //如果key为e的找不到，不会报错，找到就删之
 
  //循环遍历
  //Scala为了防止集合出现空指针问题，提供了一个特殊的类：Option，有两个特殊的对象，Some，None
  //如果确实没有获取到数据，为了不出现异常，Option提供了有默认值的方法
  println(map.get("d").get) //报错：.NoSuchElementException: None.get
  println(map.get("d").getOrElse(0))  //如果没有找到key为d，那么就会返回0
 
 
  //可变Map集合
  val mmap : mutable.Map[String, Int] = mutable.Map("a"->1,"b"->2,"c"->3)
}
```


## 元组
```Scala
object Hello123 extends App {
  //将无关的数据当成一个整体来使用
  //如empid,email,ordernum
  //三个数据不相关联，也无法使用map集合，那么可以使用元组
  //使用小括号将数据关联在一起，形成了一个整体
  //元组中最多的元素数据的个数为22
  private val tuple : (String, Int, String) = ("zhangsan",11111,"xxxxxxx")
 
  //访问元组中的数据,调用相应的顺序编号：_顺序号
  println(tuple._1) //"zhangsan"
  println(tuple._2) //1111
  println(tuple._3) //"xxxxxxx"
 
  //循环遍历
  for (elem <- tuple.productIterator) {
    println(elem)
  }
 
  //如果元组中元素的个数为2，那么称之为对偶,类似于Map中键值对
  val tuple1: (Int,String) = (1, "zhangsan" )
  //将元组转为map
  private val tupleMap : Map[Int, String] = Map((1,"zhangsan"))
 
  tupleMap.foreach(t=>println(t))
  tupleMap.foreach(t=>println(t._1 + "= " + t._2))
}
```


# 集合（下）-应用操作
## 常用方法
```Scala
object Hello123 extends App {
  //集合常用方法
  val list = List(1,2,4,3)
 
  //TODO 求和
  println("sum= "+list.sum) //sum= 10
 
  //TODO 最大值
  println("max= "+list.max) //max= 4
 
  //TODO 最小值
  println("min= "+list.min) //min= 1
 
  //TODO 乘积
  println("product= "+list.product) //product= 24
 
 //TODO 反转(无排序)
  println("reverse= " + list.reverse) //reverse= List(3, 4, 2, 1)
 
  //分组（通过指定函数的返回值进行分组）
  val list1 = List(1,2,4,3,2,1)
  val intToInts: Map[Int, List[Int]] = list1.groupBy(t=>t)
  /*
  2=List(2, 2)
  4=List(4)
  1=List(1, 1)
  3=List(3)
   */
  intToInts.foreach(t=>println(t._1 + "=" + t._2))
  //根据每个字符串的第一个字符来进行分组
  val stringList = List("11","22","33","12","23")
  val stringToStrings: Map[String, List[String]] = stringList.groupBy(x=>x.substring(0,1))
  /*
  2= List(22, 23)
  1= List(11, 12)
  3= List(33)
   */
  stringToStrings.foreach(t=>println(t._1 + "= "+ t._2))
  // 根据奇偶来分组
  val intToInts1: Map[Int, List[Int]] = list1.groupBy(t=>{t % 2})
  /*
  1=List(1, 3, 1)
  0=List(2, 4, 2)
   */
  intToInts1.foreach(t=>println(t._1 + "=" + t._2))
 
  //TODO 排序（按照指定的规则进行排序）
 
  val sortList: List[Int] = list.sortBy(x=>x)
  println(sortList.mkString(",")) //1,2,3,4
 
  //TODO 排序
  /*
  left:a, right:b
  a < b,从左边到右边，是从小到大，升序，true
  a > b,从左边到右边，是从大到小，降序看，false
   */
  val sortList1 : List[Int] = list.sortWith((a, b)=>{true})
  println(sortList1.mkString(","))
 
  /*
  将val stringList = List("11","22","33","12","23")里面的第二个字符按照降序排列
   */
  val sortList2 : List[String] = stringList.sortWith((left, right)=>(left.substring(1) > right.substring(1)))
  println(sortList2.mkString(","))
 
  //TODO 获取集合的前n个
  list.take(2)
 
  //TODO 迭代
  for (elem <- list.iterator) {
    println(elem)
  }
 
  //TODO 映射（转换）
  //x=>(x,x)
  val tuples: List[(Int, Int)] = list.map(x=>{(x,x)})
  println(tuples.mkString(",")) //(1,1),(2,2),(4,4),(3,3)
 
  /*
  val list1 = List(1,2,4,3,2,1)
   */
  val intToTuples2: Map[Int, Int] = list1.map(x=>{(x,x)}).groupBy(x=>x._1).map(t=>(t._1, t._2.size))
  println(intToTuples2.mkString(","))
 
  //TODO WorldCount
  val list4  = List("Hello","Scala","Hello","World","Hbase","Hadoop","Kafka","Scala","World")
  //对集合中的单词字符串进行统计出现的次数，并且按照出现次数降序排列，取前三名
 
  //1) 将相同单词放置在一起（分组）
  //    (Hello,List("Hello","Hello"))
  val wordToListMap : Map[String, List[String]] = list4.groupBy(word=>word)
  //2） 将数据结构进行转换
  //    (Hello,wordCount=list.size)
  val wordToCountMap : Map[String, Int] = wordToListMap.map(x=>{(x._1,x._2.size)})
  //3) 将数据进行排序（降序）
  //(Hbase,1),(Scala,2),(Hello,2),(Kafka,1),(Hadoop,1),(World,2),list包裹着每一个元组
  val wordToCountSort : List[(String, Int)] = wordToCountMap.toList.sortWith((left, right)=>(left._2 > right._2))
  //4) 取排序完成后的前3条数据
  val resultList : List[(String, Int)] = wordToCountSort.take(3)
  println(resultList.mkString(","))
 
  //TODO 扁平化操作
  //将一个整体中的内容拆成一个一个的个体
  val lineList = List("Hello World","Hello Scala","Hello Hadoop")
 
  //list => 1,2,3
  val flatMapList : List[String] = lineList.flatMap(x=>x.split(" "))
  /*
  List(Hello World, Hello Scala, Hello Hadoop)
  List(Hello, World, Hello, Scala, Hello, Hadoop)
   */
  println(lineList)
  println(flatMapList)
 
 
  //TODO 对集合的数据进行筛选过滤，true保留，false不保留
  val filterList : List[Int] = list.filter(x=>x % 2 == 0)
  println(filterList.mkString(","))
 
  //TODO 拉链：zip
  val list6 = List(1,2,3)
  val list7 = List(4,5,6)
 
  //将两个集合数据进行关联，关联后的数据形成了元组
  val tuples7: List[(Int, Int)] = list6.zip(list7)
  println(tuples7.mkString(","))  //(1,4),(2,5),(3,6)
 
  //如果list中多了一个元素，那么结果就是舍弃多于的元素
  val list8 = List(1,2,3,7)
  val tuples11 : List[(Int, Int)] = list7.zip(list8)
  println(tuples11.mkString(",")) //(1,4),(2,5),(3,6)   -- (4,1),(5,2),(6,3)
 
  //TODO 集合并集
  val unionList : List[Int] = list6.union(list7)
  println(unionList.mkString(","))  //1,2,3,4,5,6
 
  //TODO 交集
  val list9 = List(1,2,3,7)
  val list10 = List(1,2,4,8)
  val intersectList : List[Int] = list9.intersect(list10)
  println(intersectList.mkString(","))  //1,2
 
  //TODO 差集
  val diffList1 : List[Int] = list9.diff(list10)
  val diffList2 : List[Int] = list10.diff(list9)
  println(diffList1.mkString(","))  //3,7
  println(diffList2.mkString(","))  //4,8
   
}
```


## Scala wordCount解析
```Scala
  //TODO 使用Scala实现单词数量统计功能：
  val list20  = List(("Hello Scala World", 4),("Hello World", 3),("Hello Hadoop", 2),("Hello Hbase", 1))
  //将上面集合中的单词统计出现次数并按照次数降序排列取前3
```
![wordCount解析](28、wordCount解析.png)
```Scala
object WordCount extends App {
  //TODO 使用Scala实现单词数量统计功能：
  val list20  = List(("Hello Scala World", 4),("Hello World", 3),("Hello Hadoop", 2),("Hello Hbase", 1))
  //将上面集合中的单词统计出现次数并按照次数降序排列取前3
 
  //将一行一行的数据拆分成一个一个的单词数据
  //("Hello Scala World",4)
  //=>[ (Hello), (Scala), (World) ]
  //=>[ (Hello,4), (Scala,4), (World,4) ]
  val flatMapList: List[(String, Int)] = list20.flatMap(t => {
    val line: String = t._1
    val words = line.split(" ")
    words.map(word => {(word, t._2)})
  })
 
  //将单词进行分组
 
  val groupWordMap : Map[String, List[(String, Int)]] = flatMapList.groupBy(t=>t._1)
 
  //求和
  //Hello -> List((Hello,4), (Hello,3), (Hello,2), (Hello,1))
  //=>List((4),(3),(2),(1))
  val sumMap : Map[String, Int] = groupWordMap.map(t => {
    val word: String = t._1
    val sum: Int = t._2.map(num => (num._2)).sum
    (word, sum)
  })
 
  //另一种写法，mapValues方法，可以只针对Map集合中的value做操作，key保持不变
  private val wordToSumMap : Map[String, Int] = groupWordMap.mapValues(datas=>datas.map(t=>t._2).sum)
 
  //将统计的结果进行降序排列
  private val sortList : List[(String, Int)] = wordToSumMap.toList.sortWith((left, right)=>(left._2 > right._2))
 
  //从排序后的集合中取前3条
  private val resultList : List[(String, Int)] = sortList.take(3)
   
  println(resultList)
}
```
- 从文件中获取数据
![文本信息](29、文本信息.png)
```Scala
Hello Scala World, 4
Hello World, 3
Hello Hadoop, 2
Hello Hbase, 1
```
```Scala
//从文件中获取数据，统计数量
  Source.fromFile("in/word.txt").getLines().toList

//从文件中获取数据，统计数量
//通过map转换结构
   val list : List[(String,Int)] = Source.fromFile("in/word.txt").getLines().toList.map(t=>{
    // List(Hello Scala World,  4, Hello World,  3, Hello Hadoop,  2, Hello Hbase,  1)
    // t.split(",")
     val words : Array[String] = t.split(",")
     (words(0),words(1).trim.toInt)
   })
```


## reduce方法
![reduce方法](30、reduce方法.png)
```Scala
//TODO 简化，数据减少，不是结果变少
  val list100 = List(1,2,3,4)
  //从源码角度看，reduce和reduceLeft功能一样
  val result : Int = list.reduce(_+_)
  //等同于
  list.reduce((left ,right)=>{left+right})
 
  list.reduce(_-_)  //相减
  println(result)
 
  //reversed ==> 4,3,2,1
  //reduceLeft ==>((1-2)-3)-4
  //reduceRight ==>1 -(2-(3-4)) ==> -2
  val result1 : Int = list.reduceRight(_-_)
```


## fold方法
![fold方法](31、fold方法.png)
```Scala
//TODO 折叠，也可以对集合数据进行简化，获取最终的一条结果
  //fold方法可以传递2个部分的参数，第一个部分表示集合之外的数据
  //第二部分的参数表示数据进行的逻辑处理
  val list200 = List(1,2,3,4)
  val i: Int = list200.fold(100)(_+_)
  println(i)  //110
  val i1 : Int =list200.fold(100)(_-_)
  println(i1) //90
 
  //reverse ==> 4,3,2,1
  //foldLeft ==> (((10-4)-3)-2)-1
  //foldRight ==>1-(2-(3-(4-10))),交换位置
  val i2 : Int = list200.foldRight(10)(_-_)
  println(i2)
 
  //实际应用
  //将两个Map进行合并,相同的key做累加，不同的key直接增加
  //a->4,b->2,c->5,d->1
  val map1 = mutable.Map("a"->1,"b"->2,"c"->3)
  val map2 = mutable.Map("a"->3,"c"->2,"d"->1)
 
  //t表示tuple，map中的每一个键值对
  private val stringToInt: mutable.Map[String, Int] = map2.foldLeft(map1)((map, t) => {
    //"a"->3
    //map集合设置的方式 map(key)=value
    map(t._1) = map.getOrElse(t._1, 0) + t._2 //Map(b -> 2, d -> 1, a -> 4, c -> 5)
    map
  })
  println(stringToInt)
```


# 模式匹配（match）
1. Scala中的模式匹配类似于Java中的switch语法，但是<font color=red>更加强大</font>。
2. 模式匹配语法中，采用match关键字声明，每个分支采用case关键字进行声明，当需要匹配时，会从第一个case分支开始，如果匹配成功，那么执行对应的逻辑代码，如果匹配不成功，继续执行下一个分支进行判断。如果<font color=red>所有case都不匹配</font>，那么会执行`case _ `分支，类似于Java中default语句。
```Scala
import scala.collection.GenTraversableOnce
 
 
object Hello123 extends App {
  // 模式匹配，类似于Java的switch语法
  val oper = '#'
  val n1 = 20
  val n2 = 10
  var res = 0
  oper match {
      //Scala 中只会匹配上case的语句，执行完后就结束，没有穿透作用，即不会继续执行下面的case语句
    case '+' => res = n1 + n2
    case '-' => res = n1 - n2
    case '*' => res = n1 * n2
    case '/' => res = n1 / n2
    case _ => println("oper error")
  }
  println("res=" + res)
 
  //下划线作用：
  //1、模式匹配的其他场合
  //2、系统给变量赋予初始值
  //3、类似于java导包的*号
  //4、给类起别名，隐藏类
  //5、代替方法的参数，可以让函数不执行
 
 
  val list = List(List(1,2),List(3,4))
  //List(1,2,3,4)
  //每次传入的是一个集合，扁平化操作后返回的也是一个集合，故可以如下写
  val flatList : List[Int] = list.flatMap(x=>x)
  println(flatList) //List(1, 2, 3, 4)
 
  //如果使用下划线代替，会出现歧义
  val intsToOnceToList: (List[Int] => GenTraversableOnce[Nothing]) => List[Nothing] = list.flatMap(_)
  println(intsToOnceToList) //<function1>
  //这里返回的是函数本身，是因为程序无法识别这个_是这个函数还是函数里面的参数
  def test(list: List[Int]): List[Int] ={
    list
  }
  val ints: List[Int] = list.flatMap(test)
  println(ints) //List(1, 2, 3, 4)
 
 
  val list1 = List("Hello Scala","Hello World")
  //List("Hello","Scala","Hello","World")
  val strings: List[String] = list1.flatMap(x=>x.split(" "))
  //这里就可以使用下划线，是因为函数本身没有split方法，故可以推断出来
  val strings1: List[String] = list1.flatMap(_.split(" "))
  println(strings1)  //List(Hello, Scala, Hello, World)
}
```


## match的细节和注意事项
1. 如果所有case都不匹配，那么执行`case _ `分支，类似于Java中default语句
2. 如果所有case都不匹配，又没有写`case _ `分支，那么会抛出MatchError
3. 每个case中，不用break语句，自动中断case
4. 可以在match中使用其它类型，而不仅仅是字符,可以是表达式
5. `=> `类似于 java swtich 的 `:`
`=>` 后面的代码块到下一个case, 是作为一个整体执行，可以使用{} 括起来，也可以不括。 

## 守卫
1. 如果想要表达<font color=red>匹配某个范围的数据</font>，就需要在模式匹配中增加条件守卫
2. 条件守卫需要放在case _分支前面，这样才能匹配上
3. <font color=red size=3>**`case _`分支是所有都满足，如果放在最前面，那么就只会执行这个分支后就退出了，一般将该分支放到最后**</font>
```Scala
object Hello123 extends App {
  for (ch <- "+-3!") {
    var sign = 0
    var digit = 0
    ch match {
      case '+' => sign = 1
      case '-' => sign = -1
      case _ if ch.toString.equals("3") => digit = 3
      case _ => sign = 2
    }
    println(ch + " " + sign + " " + digit)
  }
 
}
```


## 变量
- 如果在case关键字后跟变量名，那么match前表达式的值会赋给那个变量
```Scala
val ch = 'V'
ch match {
    case '+' => println("ok~")
    case mychar => println("ok~" + mychar)
    case _ => println ("ok~~")
}
```


## 类型匹配
- 可以匹配对象的任意类型，这样做避免了使用isInstanceOf和asInstanceOf方法
```Scala
object Hello123 extends App {
  // 类型匹配, obj 可能有如下的类型
  val a = 7
  val obj = if(a == 1) 1
            else if(a == 2) "2"
            else if(a == 3) BigInt(3)
            else if(a == 4) Map("aa" -> 1)
            else if(a == 5) Map(1 -> "aa")
            else if(a == 6) Array(1, 2, 3)    //Array[Int]
            else if(a == 7) Array("aa", 1)    //Array[Any]
            else if(a == 8) Array("aa")   //Array[String]
 
  val result = obj match {
    case a : Int => a
    case b : Map[String, Int] => "对象是一个字符串-数字的Map集合"
      //类型匹配中对泛型不起作用，如果a=5时匹配不上Map[Int,String],只会匹配上Map[String,Int]
    case c : Map[Int, String] => "对象是一个数字-字符串的Map集合"
    case d : Array[String] => "对象是一个字符串数组"
    case e : Array[Int] => "对象是一个数字数组"
    case f : BigInt => Int.MaxValue
    case _ => "啥也不是"
  }
  println(result)
}
```


## 匹配数组
```Scala
object Hello123 extends App {
  for (arr <- Array(Array(0), Array(1, 0), Array(0, 1, 0),
    Array(1, 1, 0), Array(1, 1, 0, 1))) {
    val result = arr match {
      case Array(0) => "0"
      case Array(x, y) => x + "=" + y
      case Array(0, _*) => "以0开头和数组"
      case _ => "什么集合都不是"
    }
    println("result = " + result)
  }
 
}
```
- 应用案例：
```Scala
for (list <- Array(List(0), List(1, 0), List(0, 0, 0), List(1, 0, 0))) {
    val result = list match {
        case 0 :: Nil => "0" //
        case x :: y :: Nil => x + " " + y 
        case 0 :: tail => "0 ..." 
        case _ => "something else"
    }
    println(result)
}
```


## 匹配元组
```Scala
for (pair <- Array((0, 1), (1, 0), (2, 1),(1,0,2))) {
    val result = pair match { 
        case (0, _) => "0 ..." 
        case (y, 0) => y 
        case (a,b) => (b,a)
        case _ => "other" 
    }
    println(result)
}
```


## 对象匹配
1. case中对象的unapply方法(对象提取器)返回Some集合则为匹配成功
2. 返回none集合则为匹配失败
```Scala
object Square {
    def unapply(z: Double): Option[Double] = Some(math.sqrt(z))
    def apply(z: Double): Double = z * z
}
 
// 模式匹配使用：
val number: Double = 36.0
number match {
    case Square(n) => println(n)
    case _ => println("nothing matched")
}
```
3. 构建对象时apply会被调用 ，比如 val n1 = Square(5)
4. 当将 Square(n) 写在 case 后时[case Square(n) => xxx]，会默认调用unapply 方法(对象提取器)
5. number 会被 传递给def unapply(z: Double) 的 z 形参
6. 如果返回的是Some集合，则unapply提取器返回的结果会返回给n这个形参
7. case中对象的unapply方法(提取器)返回some集合则为匹配成功
8. 返回none集合则为匹配失败

## 变量声明中的模式
```Scala
object Hello123 extends App {
  val (x, y) = (1, 2)
  println(x + "=" + y)  //1=2
  val (username, age, email) = ("zhangsan", 20, "xxxx")
  println(username + "=" + age) //zhangsan=20
 
  val (q, r) = BigInt(10) /% 3  // 包含了2个连续的运算符
  println("q = " + q) //q = 3
  println("r = " + r) //r = 1
 
  val arr = Array(1, 7, 2, 9)
  val Array(first, second, _*) = arr
  println(first, second)
}
```


## for表达式中的模式
```Scala
object Hello123 extends App {
  val list = List(("a", 1),("b", 2),("c", 3))
  for (elem <- list) {
    println(elem._1 + "=" + elem._2)
  }
   
  //模式匹配
  for ((k,v) <- list) {
    println(k + "=" + v)
  }
}
```


## 样例类
1. 样例类仍然是类
2. 样例类用<font color=red>case关键字进行声明</font>。
3. 样例类是为<font color=red>模式匹配(对象)而优化</font>的类
4. 构造器中的每一个参数都成为val——除非它被<font color=blue>显式</font>地声明为var
5. 在样例类对应的伴生对象中<font color=red>提供apply方法</font>让你不用new关键字就能构造出相应的对象
6. <font color=red>提供unapply方法</font>让模式匹配可以工作
7. 将<font color=red>自动生成toString、equals、hashCode和copy方法</font>(有点类似<font color=red>模板类</font>，直接给生成，供程序员使用)
8. 除上述外，样例类和其他类完全一样。你可以添加方法和字段，扩展它们
9. <font color=black>**样例类的copy方法和带名参数**</font>
```Scala
object Hello123 extends App {
  for (amt <- Array(Dollar(1000.0), Currency(1000.0, "RMB"), NoAmount)) {
    val result = amt match {
      case Dollar(v) => "$" + v
      case Currency(v, u) => v + " " + u
      case NoAmount => ""
    }
    println(amt + ": " + result)
  }
 
  //copy方法
  val amt = Currency(29.95, "RMB")
 
  val amt1 = amt.copy()
  val amt2 = amt.copy(value = 19.95)
  val amt3 = amt.copy(unit = "英镑")
 
  println(amt)
  println(amt2)
  println(amt3)
 
}
 
//Dollar，Currencry, NoAmount  是样例类。
//可以这样理解样例类，就是样例类会默认其它很多的方法，供程序员直接使用
 
abstract class Amount
case class Dollar(value: Double) extends Amount
case class Currency(value: Double, unit: String) extends Amount
case object NoAmount extends Amount
```
```Scala
val list = List(1, 2, 3, 4, "abc")
def f1(n:Any): Boolean = {
    n.isInstanceOf[Int]
}
def f2(n:Int): Int = {
    n + 1
}
def f3(n:Any): Int ={
    n.asInstanceOf[Int]
}
val list2 = list.filter(f1).map(f3).map(f2)
println("list2=" + list2)
```


## 密封类
1. 如果想让case类的所有子类都必须在申明该类的<font color=red>相同的源文件中定义</font>，可以将样例类的通用超类声明为sealed，这个超类称之为密封类。
2. 密封就是不能在其他文件中定义子类。
```Scala
abstract sealed class Amount
case class Dollar(value: Double) extends Amount
case class Currency(value: Double, unit: String) extends Amount
case object NoAmount extends Amount
```


# 函数式编程（高级部分--补充）
- 将包在<font color=red>**大括号内的一组case语句**</font>封装为函数，我们称之为<font color=red>偏函数</font>，它只对会作用于指定类型的参数或指定范围值的参数实施计算，超出范围的值会忽略.


## 偏函数（partial function）
1. 一个例子
```Scala
object Hello123 extends App {
  /*
  将集合list中的所有数字+1，并返回一个新的集合
  要求忽略掉 非数字 的元素，即返回的 新的集合 形式为 (2, 3, 4, 5)
   */
  val list: List[Any] = List(1, 2, 3, 4, "abc")
  val list1: List[AnyVal] = list.map(x => {
    if (x.isInstanceOf[Int]) {
      x.asInstanceOf[Int] + 1
    }
  })
  val list2 : List[AnyVal] = list1.filter(x=>x.isInstanceOf[Int])
  println(list2)  //List(2, 3, 4, 5)
 
}
```
2. 向上述这种只操作一部分数据的函数，可以使用偏函数
3. 偏函数在Scala中是一个特质PartialFunction
4. map方法不能执行偏函数操作，因为必须对所有的数据进行转换，不能只对其中一部分数据进行操作
5. collect方法支持偏函数，收集满足条件的数据
```Scala
object Hello123 extends App {
  /*
  将集合list中的所有数字+1，并返回一个新的集合
  要求忽略掉 非数字 的元素，即返回的 新的集合 形式为 (2, 3, 4, 5)
   */
  val list = List(1, 2, 3, 4, "abc")
  //说明
  val addOne3= new PartialFunction[Any, Int] {
    def isDefinedAt(any: Any) = {
      if (any.isInstanceOf[Int]) true
      else false
    }
    def apply(any: Any) = any.asInstanceOf[Int] + 1
  }
  val list3 = list.collect(addOne3)
  println("list3=" + list3)
}
```
6. 使用构建特质的实现类(使用的方式是PartialFunction的匿名子类)
7. PartialFunction 是个特质(看源码)
8.  构建偏函数时，参数形式   [Any, Int]是泛型，第一个表示传入参数类型，第二个  表示返回参数
9. 当使用偏函数时，会遍历集合的所有元素，编译器执行流程时先执行isDefinedAt()如果为true ,就会执行 apply, 构建一个新的Int 对象返回
10. 执行isDefinedAt() 为false 就过滤掉这个元素，即不构建新的Int对象.
11. map函数不支持偏函数，因为map底层的机制就是所有循环遍历，无法过滤处理原来集合的元素
12. collect函数支持偏函数

## 偏函数的简化形式
- 声明偏函数，需要重写特质中的方法，有的时候会略显麻烦，而Scala其实提供了简单的方法
```Scala
object Hello123 extends App {
  /*
  将集合list中的所有数字+1，并返回一个新的集合
  要求忽略掉 非数字 的元素，即返回的 新的集合 形式为 (2, 3, 4, 5)
   */
  val list = List(1, 2, 3, 4, "abc")
 
  val list3 = list.collect({
    case i : Int => i+1
  })
  println("list3=" + list3)
}
```


## 控制抽象
1. 函数作为参数传递给另一个函数，如果这个函数不需要参数，也不需要返回值，那么可以直接传递代码逻辑，参考Breakable
2. 声明方式：`=> Unit`
```Scala
object Hello123 extends App {
 def test(f : => Unit): Unit ={
   f
 }
  test{
    println("xxxxx")
  }
}
```


# 泛型-上下界-视图界定-协变逆变不变
1. 泛型是对类型的约束
2. java与Scala中的泛型
```Scala
import java.util.ArrayList;
import java.util.List;
 
public class Access {
    public static void main(String args []){
        //java中的泛型，不变性，即约定类型的泛型之后不能改变，无论是否是父子关系
      List<Person> personList = new ArrayList<Person>();    //List<Person> personList = new ArrayList<User>(); 错误
 
      personList.add(new User());   //User ==> Person ,不变是声明时不能改变，而在添加数据可以改变数据对象
 
 
        //泛型的作用域，对声明泛型后的逻辑操作进行类型的约束，对之前的操作约束不了
        List list = new ArrayList();
        list.add(new Student());
 
        List<Person> personList1 = list;
        System.out.println(personList1);    //[com.caixianquan.java.Student@29453f44]
 
        /*
        约定了类型，但可以存放无关的类型数据？
        java中增加了泛型只能对后续的代码起作用，对之前的代码无效，比如增加、减少数据等操作进行约束
        而直接打印是将每个元素以字符串进行打印，如果如下遍历就会出错
         */
        for (Person person: personList1) {
            System.out.println(person); //会报错
        }
         
        test(Person.class);
        test(User.class);
        //test(Student.class);
 
        test1(Person.class);
        test1(xxx.class);
        //test1(Student.class);
    }
    //extends体现了类的体系树的上限，即Person为父类，只能找Person的子类或它本身
    public static void test(Class<? extends Person> c){
        System.out.println(c);
    }
    //super体现了类的体系树的下限，即Person为子类，只能找Person的父类或它本身
    public static void test1(Class<? super Person> c){
        System.out.println(c);
    }
 
}
class xxx{
     
}
class Person extends xxx{
 
}
class User extends Person{
 
}
class Student{
 
}
```
```Scala
object Hello123 extends App {
 
  test[Person](new Person)
  test1(new Person)
  test2(new Child)
 
  def test[T](t:T): Unit ={
    println(t)
  }
 
  //限定泛型的上限,范围小于User，那么即是User的子类或当前类
  def test1[T <: User](t:T): Unit ={
    println(t)
  }
 
  //限定泛型的下限,和java不太一样，传递数据无论什么都可以传
  def test2[T >: User](t:T): Unit ={
    println(t)
  }
 
 
  //默认情况下，scala中的泛型和java一样，不变
  //在scala中，为了丰富泛型的功能，提供了协变，逆变的类型操作
  val parent : Parent[User] = new Parent[User]
  //协变，即改变为子类，丰富功能
  val parent1 : Parent1[Person] = new Parent1[Child]
  //逆变，修改为父类
  val parent2 : Parent2[Person] = new Parent2[Person]
 
}
class Person{
 
}
class User extends Person{
 
}
class Child extends User{
 
}
class Parent[User]{
 
}
class Parent1[+User]{
 
}
class Parent2[-User]{
 
}
```


# AKKA
