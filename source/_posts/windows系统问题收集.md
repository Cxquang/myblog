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

```
{% endnote %}

# 电脑无法进入睡眠模式
## 问题描述

INDOWS 10专业版64位，系统版本：1511 OS版本：10586.420

问题描述：

通过上面的方法，dell 15R 5110笔记本在接通电源的情况下点击开始菜单关机-睡眠依然无法睡眠，只是关闭屏幕但是硬盘CPU依然在工作。

在更新系统之前是可以睡眠的，只要合上盖子就自动睡眠了，而且很快。自从这次就像装系统一样的大更新后，发现合上盖子后无法睡眠，必须拔掉电源，然后重新再合上盖子，才会自动睡眠。

## 解决方法
1. 问题的核心都围绕着“离开模式”而产生，题主所描述的只关闭屏幕而不关闭CPU的情况正是离开模式的表现。一般来说能够操改变到离开模式的软件有：a)迅雷：离开模式下载 ；b)百度网盘：传输时不休眠。

2. 通过软件的方式毕竟不是主流，控制离开模式最核心的方法还在于注册表。通过运行——regedit我们打开注册表编辑器，定位到“计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Power”，在右侧找到AwayModeEnabled，当它的值为1时表明当前处于离开模式，无法正常睡眠，将其值改为0即可正常睡眠。
