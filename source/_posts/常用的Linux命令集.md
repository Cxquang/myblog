---
title: 常用的Linux命令集
date: 2020-12-13 22:32:23
tags:
- Linux
- 常用命令
categories:
- Linux学习

keywords:
- Linux
- 常用命令
description: 收集常用的Linux命令集，方便查询
cover: /2020/12/13/常用的Linux命令集/常用的Linux命令集首页.jpg
---

# CentOS yum源
## yum安装常用软件
```shell
#安装sz、rz
yum install -y lrzsz

#安装网络工具netcat，可以使用测试:nc -lk
yum install -y nc

#安装文件传输工具：rsync
yum install -y rsync

#安装ifconfig
#查看ifconfig是否已安装
[root@hadoop101 ~]# ls /sbin/ifconfig
ls: 无法访问/sbin/ifconfig: 没有那个文件或目录
#查看ifconfig匹配的包
[root@hadoop101 ~]# yum search ifconfig
已加载插件：fastestmirror
Loading mirror speeds from cached hostfile
 * base: mirrors.aliyun.com
 * extras: mirrors.aliyun.com
 * updates: mirrors.aliyun.com
============================================================== 匹配：ifconfig ==============================================================
net-tools.x86_64 : Basic networking tools
#安装net-tools工具包
[root@hadoop101 ~]# yum install net-tools.x86_64 -y
```


# 解压/压缩
## tar
### 命令格式
tar\[必要参数\]\[选择参数\]\[文件\] 

### 命令功能
用来压缩和解压文件。tar本身不具有压缩功能。他是调用压缩功能实现的 

### 命令参数
```shell
必要参数有如下：

-A 新增压缩文件到已存在的压缩

-B 设置区块大小

-c 建立新的压缩文件

-d 记录文件的差别

-r 添加文件到已经压缩的文件

-u 添加改变了和现有的文件到已经存在的压缩文件

-x 从压缩的文件中提取文件

-t 显示压缩文件的内容

-z 支持gzip解压文件

-j 支持bzip2解压文件

-Z 支持compress解压文件

-v 显示操作过程

-l 文件系统边界设置

-k 保留原有文件不覆盖

-m 保留文件不被覆盖

-W 确认压缩文件的正确性

可选参数如下：

-b 设置区块数目

-C 切换到指定目录【解压到指定目录】

-f 指定压缩文件

--help 显示帮助信息

--version 显示版本信息
```


### 常见解压/压缩命令
```shell
tar 
解包：tar xvf FileName.tar
打包：tar cvf FileName.tar DirName

（注：tar是打包，不是压缩！）

.gz
解压1：gunzip FileName.gz
解压2：gzip -d FileName.gz
压缩：gzip FileName

.tar.gz 和 .tgz
解压：tar zxvf FileName.tar.gz
压缩：tar zcvf FileName.tar.gz DirName
.bz2
解压1：bzip2 -d FileName.bz2
解压2：bunzip2 FileName.bz2
压缩： bzip2 -z FileName

.tar.bz2
解压：tar jxvf FileName.tar.bz2
压缩：tar jcvf FileName.tar.bz2 DirName
.bz
解压1：bzip2 -d FileName.bz
解压2：bunzip2 FileName.bz
压缩：未知

.tar.bz
解压：tar jxvf FileName.tar.bz
压缩：未知
.Z
解压：uncompress FileName.Z
压缩：compress FileName

.tar.Z
解压：tar Zxvf FileName.tar.Z
压缩：tar Zcvf FileName.tar.Z DirName

.zip
#将FileName.zip解压到指定目录/home/html/下
解压：unzip -d /home/html/ FileName.zip
#将 /home/html/ 这个目录下所有文件和文件夹打包为当前目录下的 html.zip：
压缩：zip -q -r html.zip /home/html/
.rar
解压：rar x FileName.rar
压缩：rar a FileName.rar DirName 
```


# shell使用技巧
## vim中执行shell命令
1. :!command : 不退出vim，并执行shell命令command，将命令输出显示在vim的命令区域，不会改变当前编辑的文件的内容
```shell
:!ls -l
```


## vim 删除指定行
1. 删除第10行到第20行的内容：先用20G转到第20行，然后使用下面命令：
```shell
:9,.d
```
2. 删除所有内容：先用G 转到文件尾，然后使用下面命令：
```shell
:1,.d
```
3. 关于删除的一些说明：
	- 在vi中，"."表示当前行，“1,.”表示从第一行到当前行，“d ” 表示删除。
	- 如果只是想删除某一行，那么把光标指到该行，然后输入dd 即可。

4. 设置行号
```shell
:set number
```


# 命令行下的文本操作
## 去掉首行
1. sed命令
    - -i : 直接在文件上编辑 （edit files in place）
    - -e[默认选项]：只在命令行输出，而文件不改变
```shell
#删除首行
sed -i '1d' filename
#删除特定行号
sed -i 'Nd' filename
```


# Linux命令操作(杂)
## 查询某个文件夹下的文件数量
1. 查看当前目录下的文件数量（不包含子目录中的文件）
```shell
ls -l|grep "^-"| wc -l
```
2. 查看当前目录下的文件数量（包含子目录中的文件） 注意：R，代表子目录
```shell
ls -lR|grep "^-"| wc -l
```
3. 查看当前目录下的文件夹目录个数（不包含子目录中的目录），同上述理，如果需要查看子目录的，加上R
```shell
ls -l|grep "^d"| wc -l
```
4. 查询当前路径下的指定前缀名的目录下的所有文件数量
	- 例如：统计所有以“20161124”开头的目录下的全部文件数量
```shell
ls -lR 20161124*/|grep "^-"| wc -l
```

5. 对每个命令参数做一下说明备注：
	- ls -lR： 该命令表示以长列表输出指定目录下的信息（未指定则表示当前目录），R代表子目录中的“文件”，这个“文件”指的是目录、链接、设备文件等的总称
	- grep "^d"表示目录，"^-"表示文件
	- wc -l： 表示统计输出信息的行数，因为经过前面的过滤已经只剩下普通文件，一个目录或文件对应一行，所以统计的信息的行数也就是目录或文件的个数

