---
title: shell脚本学习
date: 2021-01-07 11:29:18
tags: 
- Linux
- shell脚本
categories: 
- Linux学习
keywords: 
- Linux
- shell脚本
description: 学习Linux下的shell脚本编程，知识点总结以及一些技巧解决问题
cover: /2021/01/07/shell脚本学习/shell脚本学习首页.jpg
---

# getopt命令解析shell脚本的命令行选项
参考地址：[使用getopt命令解析shell脚本的命令行选项](https://blog.csdn.net/sofia1217/article/details/52244582)

- getopt可以解析短选项和长选项，附上自己使用的一个例子
```shell
#!/bin/bash
#-o或--options选项后面接可接受的短选项，如ab:c::，表示可接受的短选项为-a -b -c，其中-a选项不接参数，-b选项后必须接参数，-c选项的参数为可选的
#-l或--long选项后面接可接受的长选项，用逗号分开，冒号的意义同短选项。
#-n选项后接选项解析错误时提示的脚本名字
parameters=`getopt -o t::j::d::z::i:: --long JSONConf::,jsonconf::,taskname::,taskName::,jsrq::,dqbm::,zzbm::,inmode::,activeProfile::,activeprofile:: -n "$0" -- "$@"`
[ $? -ne 0 ] && { echo "Try '$0 --help' for more information."; exit 1; }
#将规范化后的命令行参数分配至位置参数（$1,$2,...)
#echo "规范化命令行"$parameters
eval set -- "${parameters}"
while true;do
    case "$1" in
        --JSONConf|--jsonconf) case "$2" in "") jsonconf="";shift 2 ;; *) jsonconf="--JSONConf=$2"; shift 2 ;; esac ;;
        --taskname|--taskName) case "$2" in "") taskname="";shift 2 ;; *) taskname="--taskName=$2"; shift 2 ;; esac ;;
        --jsrq) case "$2" in "") jsrq=""; shift 2 ;; *) jsrq="--jsrq=$2"; shift 2 ;; esac ;;
        --dqbm) case "$2" in "") dqbm=""; shift 2 ;; *) dqbm="--dqbm=$2"; shift 2 ;; esac ;;
        --zzbm) case "$2" in "") zzbm=""; shift 2 ;; *) zzbm="--zzbm=$2"; shift 2 ;; esac ;;
        --inmode) case "$2" in "") inmode=""; shift 2 ;; *) inmode="--inmode=$2"; shift 2 ;; esac ;;
        --activeProfile|--activeprofile) case "$2" in "") inmode=""; shift 2 ;; *) activeProfile="--bigdata.profiles.active=$2"; shift 2 ;; esac ;;
        --)
           shift
           break ;;
        *) echo "Internal error!";exit 1;;
    esac
done

echo "JSONConf: "$jsonconf
echo "taskname: "$taskname
echo "jsrq: "$jsrq
echo "dqbm: "$dqbm
echo "zzbm: "$zzbm
echo "inmode: "$inmode
echo "activeProfiles: "$activeProfile
```


# 字符串分割
参考地址：[Shell_Linux Shell 中实现字符串切割的几种方法](https://blog.csdn.net/u010003835/article/details/80750003)


## 利用shell中变量的字符串替换
1. 原理：${parameter//pattern/string} 
```shell
#!/bin/bash
 
string="hello,shell,split,test"  
array=(${string//,/ })  
 
for var in ${array[@]}
do
   echo $var
done 

#结果
hello
shell
split
test
```


## 设置分隔符通过IFS变量
1. IFS介绍
	- Shell 的环境变量分为 set, env 两种，其中 set 变量可以通过 export 工具导入到 env 变量中。其中，set 是显示设置shell变量，仅在本 shell
中有效；env是显示设置用户环境变量 ，仅在当前会话中有效。换句话说，set 变量里包含了 env 变量，但 set 变量不一定都是 env变量。这两种变量不同之处在于变量的作用域不同。显然，env 变量的作用域要大些，它可以在 subshell 中使用。

	- 而 IFS 是一种 set 变量，当 shell 处理"命令替换"和"参数替换"时，shell 根据 IFS 的值，默认是 space, tab, newline来拆解读入的变量，然后对特殊字符进行处理，最后重新组合赋值给该变量。

2. 自定义IFS变量, 改变分隔符, 对字符串进行切分
	- 查看变量IFS的值
```shell
$ echo $IFS  
  
$ echo "$IFS" | od -b  
0000000 040 011 012 012  
0000004  
```
	- 直接输出IFS是看不到的，把它转化为二进制就可以看到了，"040"是空格，"011"是Tab，"012"是换行符"\n" 。最后一个 012 是因为 echo 默认是会换行的。
3. 改变IFS变量
```shell
#!/bin/bash
 
string="hello,shell,split,test"  
 
#对IFS变量 进行替换处理
OLD_IFS="$IFS"
IFS=","
array=($string)
IFS="$OLD_IFS"
 
for var in ${array[@]}
do
   echo $var
done

#结果
hello
shell
split
test
```

## 利用tr指令实现字符替换（！只能针对单个分隔符）
### 语法
1. tr命令可以对来自标准输入的字符进行替换、压缩和删除。它可以将一组字符变成另一组字符，经常用来编写优美的单行命令，作用很强大。
2. tr(选项)(参数)
	- 选项
  	 - -c或--complerment：取代所有不属于第一字符集的字符；
  	 - -d或--delete：删除所有属于第一字符集的字符；
  	 - -s或--squeeze-repeats：把连续重复的字符以单独一个字符表示；
  	 - -t或--truncate-set1：先删除第一字符集较第二字符集多出的字符。
	- 参数
  	 - 字符集1：指定要转换或删除的原字符集。当执行转换操作时，必须使用参数“字符集2”指定转换的目标字符集。但执行删除操作时，不需要参数“字符集2”；
  	 - 字符集2：指定要转换成的目标字符集。


### 示例
```shell
#!/bin/bash
 
string="hello,shell,split,test"  
array=(`echo $string | tr ',' ' '` )  
 
for var in ${array[@]}
do
   echo $var
done 
 
#结果
hello
shell
split
test
```