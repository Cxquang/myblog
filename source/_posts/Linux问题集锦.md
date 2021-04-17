---
title: Linux问题集锦
date: 2020-12-28 09:56:38
tags:
- Linux
- Xshell
categories:
- Linux学习
keywords:
- Linux
- Xshell
description: 总结遇到的Linux问题，方便日后查询。
cover: /2020/12/28/Linux问题集锦/Linux问题集锦首页.png
---

# Xshell连接虚拟机慢
- 参考地址：[Xshell 连接虚拟机慢 解决方案](http://blog.51cto.com/13566681/2071670)
原来是ssh的服务端在连接时会自动检测dns环境是否一致导致的，修改为不检测即可，操作如下：
```shell
修改文件：/etc/ssh/sshd_config

GSSAPIAuthentication  no  #--->把注释打开，改为no

UseDNS no  #--->把注释打开，改为no，然后重启ssh服务即可

重启ssh服务：service sshd restart
```

# linux 扩展磁盘
1. 如果是虚拟机virtualbox，需要先添加新的虚拟硬盘
![新建虚拟磁盘](1、新建虚拟磁盘.png)
![新建虚拟磁盘1](1、新建虚拟磁盘1.png)
![新建虚拟磁盘2](3、新建虚拟磁盘2.png)
2. 之后选择动态分配，文件位置和大小即可，重新启动Linux

```shell
#启动系统，查看磁盘空间
[root@localhost ~]# fdisk -l
# 如果正常，将看到类似信息：Disk /dev/hdb doesn't contain a valid partition table，这里/dev/hdb就是新增的虚拟硬盘。对虚拟硬盘进行分区：
[root@localhost ~]# fdisk /dev/hdb
# 输入m查看帮助
Command (m for help): m
# 输入n新增分区
Command (m for help): n
# 输入p新建主分区
#键入数字1，新增一个主分区

Partition number (1-4): 1
# 摁回车键【Enter】
First cylinder (1-41610, default 1):Enter
#摁回车键【Enter】
Last cylinder or +size or +sizeM or +sizeK (1-41610, default 41610): 
# 输入w写入并退出
Command (m for help): w

#格式化虚拟硬盘分区,centos7.0开始默认文件系统是xfs，centos6是ext4，centos5是ext3
# 第一次执行mkfs.xfs可能需要安装：apt-get install xfsprogs
mkfs.xfs /dev/sdb1

挂载虚拟分区
创建挂载目录：/mnt/sdb1

[root@localhost dev]# cd /mnt/
[root@localhost mnt]# mkdir sdb1
   挂载虚拟分区/dev/hdb1 到/mnt/sdb1/

[root@localhost mnt]# mount -t xfs /dev/sdb1 /mnt/sdb1/

查看文件系统：

#开机自动挂载新虚拟硬盘
#编辑fstab

[root@localhost ~]# vim /etc/fstab 
#在文件最后新增一行：
/dev/sdb1                   /mnt/sdb1                xfs   defaults        0 0
```

![example](example.png)
![example](example.png)

