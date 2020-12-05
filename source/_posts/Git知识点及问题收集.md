---
title: Git知识点及问题收集
date: 2020-08-16 05:08:57
tags: 
- git
categories: 
- Git学习
keywords: 
- git
description: 在学习和使用git过程中对遇到的问题及各种知识点的收集积累记录，方便查找和定位问题。
cover: /2020/08/16/Git知识点及问题收集/Git知识点及问题收集首页.jpg
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
cover	【可选】文章缩略图(如果没有设置top_img,文章页顶部将显示缩略图，可设为false/图片地址/留空)【需要，地址为：/年/月/日/文章生成的目录名/图片名称.后缀名】
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

强调模板：<font color=red size=3>***（提示：机器学习最好要看一下《数学之美》这本书）***</font>

```
{% endnote %}

# Git拉取指定远程分支
{% note primary %}
git clone -b 分支名称 代码仓库地址
{% endnote %}

# Git重命名分支
{% note primary %}
git branch -m  旧分支名称 新分支名称
{% endnote %}

# Git查看远程仓库路径
{% note primary %}
git remove -v
{% endnote %}

# Git添加远程仓库
{% note primary %}
git remote add origin 仓库地址
{% endnote %}

# Git移除远程仓库【更换仓库】
{% note primary %}
git remote rm 远程仓库别名
{% endnote %}

# 服务端仓库无法即时检出更新
参考地址：[对于git init 初始化服务端仓库无法即时检出更新的问题](https://blog.csdn.net/sinat_34349564/article/details/52486886)

<font color=red size=3>**提示：使用的是新建一个post-receive文件**</font>
之前用git init初始化服务端的git仓库，在本地推送更新后发现一个问题，当我在本地推送更新到远程仓库后，我在远程仓库也就是服务端查看文件，发现文件并没有更改，然后我git status了一下，发现推送的更新在暂存区，需要我检出更新git checkout -f 或着释放暂存区的更新git stash一下，这样每次更新我都要在服务器端进行检出更新的操作，其实更新已经推送到服务端远程仓库了，如果我将更新推送到另一个分支，然后再服务器端切换到对应的分支，也是可以看到更新的。那么怎么将推送到当前分支的更新马上检出而不用自己在服务器端进行检出操作呢。这里可以使用hooks钩子来设置。
先进入到仓库的.git/hooks/文件目录下，然后新建一个post-receive文件，并写入配置信息
```shell
[root@www ~]# cd /home/caixianquan/repos/blog.git/hooks/
[root@www hooks]# touch post-receive

#!/bin/sh
git --work-tree=/opt/blog --git-dir=/home/caixianquan/repos/blog.git checkout -f

```
或者将hooks文件目录下的post-update.sample文件更名为post-update，然后打开文件，
在exec git update-server-info这一行代码前面加上一个# 号，即改成
{% note primary %}
#exec git update-server-info
{% endnote %}

然后再在下面加上
{% note primary %}
unset GIT_DIR
cd ..
git checkout -f
{% endnote %}

保存一下
这样我们在本地再推送一次更新，可以在服务端查看，发现文件已经更新了，不用再手动检出更新了。

# git无法push某个文件夹且没提示错误
在commit、push hexo源文件时发现一切正常，登到服务器查看却缺少了themes下的Butterfly主题的资源，这个是从git上clone下来的，其中已经删除了.git和.gitignore等类似文件。但还是无法push上去，可以尝试一下命令：
{% note primary %}
 git rm --cached directory
{% endnote %}
该命令的directory必须是未push上去的文件夹，这里的示例为：themes/Butterfly.
之后使用git status就可以看到未跟踪的文件夹了。


