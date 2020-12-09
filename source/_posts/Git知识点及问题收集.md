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
- 移除仓库
git remote rm 远程仓库别名（如：origin）
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
在commit、push hexo源文件时发现一切正常，登到服务器查看却缺少了themes下的Butterfly主题的资源，这个是从git上clone下来的，其中已经删除了.git和.gitignore、.github等类似文件夹。但还是无法push上去，可以尝试一下命令：
{% note primary %}
git rm --cached directory
git add directory
{% endnote %}
注：directory为子文件夹的路径。【相对路径或绝对路径】
该命令的directory必须是未push上去的文件夹，这里的示例为：themes/Butterfly.
之后使用git status就可以看到未跟踪的文件夹了。

{% note info %}
但是执行git rm --cached directory时，提示

fatal: Unable to create 'xx/.git/index.lock': File exists.
执行`rm -f xx/.git/index.lock`后解决

参考地址：[git 无法添加文件夹下文件](https://www.cnblogs.com/howdop/p/5583342.html)
{% endnote %}

{% note warning %}
注：如果没有删除掉子git仓库中的.git等文件夹，在push时会报如下错误：
![git仓库嵌套git仓库报错](1、git仓库嵌套git仓库报错.png)
{% endnote %}

# git强制拉取并覆盖本地代码
```bash
git fetch --all
git reset --hard origin/master
git pull
```

# 撤销本地修改【未提交】
如果想要撤销此次本地修改并未提交，并且要恢复到上一次提交后的状态，包括工作区
如果直接`git reset 版本号`恢复上一次提交，这会报如下错误：
![恢复上一次提交](2、恢复上一次提交.png)
这里是删除了这些文件，前面的D代表删除操作
需要如下使用命令：
```bash
git add .
git reset --hard
```

对删除文件进行状态监控，再恢复上次提交

# 拒绝push
![拒绝push](3、拒绝push.png)
这是由于git默认拒绝了push操作，需要进行设置，修改【在服务器上的git仓库中】.git/config文件后面添加如下代码：
```shell
[receive]
    denyCurrentBranch = ignore
```
重新git push即可


