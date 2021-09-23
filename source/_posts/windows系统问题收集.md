---
title: windows系统问题收集
date: 2020-12-06 15:26:02
tags:
- windows小技巧
- windows问题收集
categories:
- windows
- windows系统
keywords:
- windows系统
description: 总结遇到的windows操作系统的各种问题及解决方法
cover: /2020/12/06/windows系统问题收集/windows系统问题收集首页.jpg
---


# 电脑无法进入睡眠模式
## 问题描述

INDOWS 10专业版64位，系统版本：1511 OS版本：10586.420

问题描述：

通过上面的方法，dell 15R 5110笔记本在接通电源的情况下点击开始菜单关机-睡眠依然无法睡眠，只是关闭屏幕但是硬盘CPU依然在工作。

在更新系统之前是可以睡眠的，只要合上盖子就自动睡眠了，而且很快。自从这次就像装系统一样的大更新后，发现合上盖子后无法睡眠，必须拔掉电源，然后重新再合上盖子，才会自动睡眠。

## 解决方法
1. 问题的核心都围绕着“离开模式”而产生，题主所描述的只关闭屏幕而不关闭CPU的情况正是离开模式的表现。一般来说能够操改变到离开模式的软件有：a)迅雷：离开模式下载 ；b)百度网盘：传输时不休眠。

2. 通过软件的方式毕竟不是主流，控制离开模式最核心的方法还在于注册表。通过运行——regedit我们打开注册表编辑器，定位到“计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Power”，在右侧找到AwayModeEnabled，当它的值为1时表明当前处于离开模式，无法正常睡眠，将其值改为0即可正常睡眠。
