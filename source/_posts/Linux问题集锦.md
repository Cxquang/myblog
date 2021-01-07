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
