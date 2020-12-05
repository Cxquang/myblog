---
title: hexo+nginx服务器上部署博客(二)
date: 2020-07-03 14:18:25
tags: 
- ssh
- git
- hexo
categories: 
- hexo博客
keywords: 
- ssh
- git
- hexo
description: 完成hexo博客部署到VPS上，并且能够实现在新电脑上继续编辑博客并发布部署。
cover: /2020/07/03/hexo-nginx服务器上部署博客-二/hexo-nginx服务器上部署博客-二首页.jpg
---

# 本章重点
- ssh免密登录
- 创建git仓库，配置hooks
- 安装hexo
- 部署hexo并发布
- 在新电脑上继续使用hexo

# ssh免密登录

服务器由于是在国外，使用密码登录容易遭受攻击，服务器上现有两个账号，一个root账号和一个普通用户账号caixianquan，将两个账号都设置为ssh免密登录，更具安全性，也在git连接远程仓库时不会有问题。

## root下免密登录

- 首先需要生成公钥和私钥，在`root账户`下输入：`ssh-keygen -t rsa`，然后如下操作。
```bash
Generating public/private rsa key pair.  
Enter file in which to save the key (/root/.ssh/id_rsa): 建议直接回车使用默认路径  
Created directory '/root/.ssh'  
Enter passphrase (empty for no passphrase): 输入密码短语（留空则直接回车）  
Enter same passphrase again: 重复密码短语  
Your identification has been saved in /root/.ssh/id_rsa.  
Your public key has been saved in /root/.ssh/id_rsa.pub.  
The key fingerprint is:  
05:71:53:92:96:ba:53:20:55:15:7e:5d:59:85:32:e4 root@test  
The key's randomart image is:  
+--[ RSA 2048]----+  
| o o .. |  
| . o oo.+ . |  
| o.+... = |  
| ...o |  
| o S |  
| . |  
| |  
| |  
| |  
+--------------------+
```
此时在/root/.ssh/目录下生成了2个文件，id_rsa为私钥，id_rsa.pub为公钥。私钥自己下载到本地电脑妥善保存（丢了服务器可就没法再登陆了），为安全，建议删除服务器端的私钥。公钥则可以任意公开。【这里我保存私钥到坚果云的我的服务器目录下，删除了服务器上面的私钥】

- 使用以下命令将公钥导入到VPS：
```bash
cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys
```
{% note info %}
如果没有.ssh目录和authorized_keys文件，可以手动创建
{% endnote %}

- 修改 /etc/ssh/sshd_config 文件，找到其中这几行配置注释，并指定需要的值：
```bash
#允许root认证登录
PermitRootLogin yes
#允许密钥认证
RSAAuthentication yes
PubkeyAuthentication yes
#默认公钥存放的位置
AuthorizedKeysFile .ssh/authorized_keys
```
- 保存后重启SSH服务。
```bash
systemctl restart sshd
```
{% note info %}
```bash
如果没有RSAAuthentication这行注释或者配置项，就不用理会，这是因为：
为什么在 CentOS7.4 的配置文件中没有 RSAAuthentication 这一行？

CentOS7.4相对于之前版本，做了一些与sshd相关的安全更新来加强sshd的安全性。其中之一就是弃用RSAAuthentication支持。从CentOS7.3升级上来的用户会在升级时被告知这一变化。
作为从CentOS7.4直接开始使用，也没有阅读过发行说明的我，自然是不清楚这一改动。

看到这里又产生了新的问题：
什么是弃用 RSAAuthentication 支持，明明还可以使用密钥对进行ssh登录，是默认开启不允许关闭的意思吗？

要回答这个问题，首先要了解ssh通讯协议，目前SSH的通讯协议分为第一代和第二代，不用多说第二代有更多功能、选项、和更高的安全性，它是在2006 正式由IETF发表，至今已有十年。由于两代SSH协定并不兼容，我们只能二选其一，CentOS 7的SSH预设使用第二代协定，所以无需做任何设定。
在同时支持这两个协议的系统中，可以通过 /etc/ssh/sshd_config 配置文件中的
Protocol 2
来制定使用哪一个版本。

RSAAuthentication （rsa认证）是只支持第1代ssh通讯协议使用的配置项，在CentOS7.4中被废除了，而且前面提到过CentOS7开始预设使用第二代通讯协议，在CentOS7.4中没有找到指定协议版本的配置行，个人猜测是CentOS7.4全面抛弃第1代协议。

第2代ssh通讯协议的密钥验证选项是
#PubkeyAuthentication yes

这个选项默认是注释掉的，并且是默认开启的，因此我们在使用第二代ssh通讯协议时不需要再去纠结 RSAAuthentication 选项了，在CentOS7.4中其强行添加 RSAAuthentication 配置会触发系统对它的废除提示。

reprocess config line 38: Deprecated option RSAAuthentication
看到这里所有的疑惑就都解开了，将这个小坑记录下来希望后来的同学能少走弯路。
```
{% endnote %}
在使用SSH Key登录验证成功后，还是为了安全，建议关闭root用户使用密码登陆，关闭的方法如下：

修改SSH的配置文件/etc/ssh/sshd_config，找到下面1行：
`PasswordAuthentication yes`
修改为：
`PasswordAuthentication no`
保存后重启SSH服务。
`systemctl restart sshd`

{% note success %}
之后只要在个人电脑上下载坚果云上的私钥，使用该私钥即可登录服务器root账号。
{% endnote %}

## 普通账户下免密登录
- 之前在root下已经生成了私钥和公钥，直接将公钥复制到普通账户下的.ssh目录下的authorized_keys文件下，如果没有该目录及文件则手动创建。
- 在本地windows下在使用ssh的客户端软件中修改配置文件，如git工具，在安装目录下有ssh的配置文件，如下：
![修改ssh客户端配置文件](1、修改ssh客户端配置文件.png)
修改ssh_config文件两处地方【如果前有#注释，去掉】：
![填入私钥和修改端口号](2、填入私钥和修改端口号.png)
{% note primary %}
如果有需要就修改端口号，否则默认是22端口登录，且在git连接远程仓库push时也是用默认端口，无法指定【暂未知】
{% endnote %}

这样就可以在git bash中使用ssh免密登录普通账号，使用命令如下：
```bash
ssh 用户名@ip地址
```

# 创建git仓库，配置hooks

{% note warning %}
注意在普通用户下操作
{% endnote %}

```bash
cd ~
mkdir repos
cd repos
git init --bare blog.git	#创建一个裸仓库
vim blog.git/hooks/post-receive	#直接编辑post-receive文件【没有则自动创建】
```

输入以下内容：
```bash
#!/bin/sh
git --work-tree=/opt/blog --git-dir=/home/caixianquan/repos/blog.git checkout -f
```
{% note warning %}
/opt/blog文件夹最好已经创建存在，未测试不存在情况
{% endnote %}

保存退出后授予文件权限：
```bash
chmod +x blog.git/hooks/post-receive
```

# 安装Hexo

{% note info %}
npm 的仓库在国外，这就意味着下载可能非常慢，或者不可以下载。因此我的解决方案是用淘宝的镜像源替代。

替代方案很简单只需要在命令行输入 `npm install -g cnpm --registry=https://registry.npm.taobao.org` 即可，然后每次需要使用 `npm` 命令时，将 `npm` 换成 `cnpm` 即可。
{% endnote %}

## 安装hexo
`npm install -g hexo-cli`
安装完成后依旧使用 `hexo -v` 查看以下版本号。
![查看hexo版本](3、查看hexo版本.png)

## 初始化一个 Hexo 博客
在任意位置创建一个文件夹，hexo博客将出现在这个文件夹。在该文件夹下右键使用git bash打开，输入命令`hexo init .`，然后程序会自动克隆一个 Hexo 项目到当前目录。
{% note warning %}
注意有一个点代表当前文件夹！！
{% endnote %}

查看hexo博客，通过`hexo s`启动本地服务器，访问：http://localhost:4000即可查看博客。

## 安装主题，hexo优化
可以修改默认主题，并制定个性化界面，这里不展开叙述。

# 部署hexo并发布

- 配置博客根目录下的`_config.yml` 文件
```bash
deploy:
  type: git   #必须为git
  repo: caixianquan@www.caixianquan.tk:/home/caixianquan/repos/blog.git  #Git仓库
  branch: master #分支
```
- 在 `package.json` 中添加 npm 脚本
【暂且添加一行，后面同步hexo源文件时再修改】
```bash
 "scripts": {
    "deploy": "hexo clean && hexo g -d",
    "start": "hexo clean && hexo g && hexo s"
  },
```
以后本地调试使用`npm start`,即可调用以上命令，快速调试，部署到服务器时使用命令`npm deploy`。

# 在新电脑上继续使用hexo
## 说明
上传到服务器上的hexo.git仓库，后面用没安装过hexo的电脑可以直接clone下来，安装nodejs和hexo，就可以使用
参考：[迁移hexo到新电脑](https://www.jianshu.com/p/153490a029a5)

## 创建非裸仓库
{% note info %}
尝试过在部署的时候使用的是非裸仓库，然后在这个仓库下新建一个分支来保存源文件，但这样会有一个问题，每次checkout时仓库中的文件会发生变化，很莫名其妙，为了尽量减少错误和麻烦，直接创建一个新的非裸仓库来保存源文件，而使用裸仓库来同步博客的资源文件。
{% endnote %}

{% note warning %}
以下最好在普通用户下操作
{% endnote %}

```bash
cd ~
cd repos
mkdir hexo.git
cd hexo.git
git init
```
即可生成一个非裸仓库

## 上传到远程仓库
- 先将远程仓库hexo.git克隆到本地，方便后续上传。在本地找一个文件夹右键点击git bash，执行以下命令

```bash
git clone 用户名@服务器ip:/路径/.git
```
{% note info %}
这里是需要服务器的用户名和密码，如果有免密登录，即可直接下载
{% endnote %}

- 克隆后的本地仓库中除了.git文件夹其他删除，复制之前的博客源文件到该仓库中，除了.deploy_git文件夹，源文件应该包含一个.gitignore文件，如果没有，新建，加入以下内容
{% note info %}
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
{% endnote %}     
![拷贝源文件到本地仓库](7、拷贝源文件到本地仓库.png)

- 如果使用到主题库，比如butterfly，会报如下错误：
![git仓库嵌套git仓库报错](8、git仓库嵌套git仓库报错.png)
那么需要删除掉clone下来的主题库的.git和.github文件夹
![clone下来的主题存在.git和.github文件夹](11、clone下来的主题存在.git和.github文件夹.png)
接着需要删除掉缓存的目录
```bash
 git rm --cached directory
 git add directory
```
{% note warning %}
注：directory为子文件夹的路径。
但是执行git rm --cached directory时，提示

fatal: Unable to create 'xx/.git/index.lock': File exists.
执行`rm -f xx/.git/index.lock`后解决

参考地址：[git 无法添加文件夹下文件](https://www.cnblogs.com/howdop/p/5583342.html)
{% endnote %}
而后，在本地仓库中提交一次
```bash
git add .
git commit –m "add branch"
git push 
```

在push到远程仓库时，报如下错误：
![push时权限拒绝](9、push时权限拒绝.png)
原因可能是不是所在用户创建的仓库，修改所有者即可

新的报错问题：
![拒绝push](10、拒绝push.png)
这是由于git默认拒绝了push操作，需要进行设置，修改【在服务器上的git仓库中】.git/config文件后面添加如下代码：
```shell
[receive]
denyCurrentBranch = ignore
```
重新git push即可
{% note primary %}
若在服务器上看不到同步的文件，需要使用命令`git checkout master`进行切换分支
{% endnote %} 

## 在新电脑上安装git和nodejs
步骤省略，参考hexo安装过程，其中还要设置ssh免密登录

## 安装hexo
```bash
npm install hexo-cli -g
```

- 在任意文件夹下，执行以下命令，注意如果是为hexo.git,那么会生成一个hexo文件夹
```bash
git clone 用户名@服务器ip:/路径/.git
```

- 进入到克隆到的文件夹内，执行：
```bash
npm install
npm install hexo-deployer-git --save
```

{% note info %}
npm install的作用？
每一个rn项目都有一个package.json文件，里面有很多组件信息
使用npm install将按照package.json安装所需要的组件放在生成的node_modules文件夹中
rn项目下的每一个文件中都可以通过import引入node_modules的组件来加以使用
{% endnote %}

### hexo: command not found
如果在命令行下直接使用hexo命令提示该命令无法找到时，可能原因是node_modules下的.bin文件夹没有添加进系统环境变量PATH
![将node_modules添加进环境变量中](6、将node_modules添加进环境变量中.png)


## 生成与部署
在该文件夹内的package.json可以添加脚本，如下
```bash
"scripts": {
    "d": "hexo clean &&  hexo g -d && git status && git add -A && git commit -m 'auto' && git push"
  },
```
{% note warning %}
这里的scripts在package.json 中已经有，增加属性即可，这里是新增了一个命令d，那么在使用时需要执行的命令为`npm run d`，这样就可以直接一键部署到服务器顺带也将源文件也同步到远程仓库中
{% endnote %}

{% note info %}
如果A和B都有clone仓库，而且在电脑A修改过源文件并且已经push到服务器，在电脑B上就需要先git pull一下，再进行博客编写
{% endnote %}

# 收尾
到这里整个hexo搭建算是完成了，最后是将普通用户的shell登录操作禁止掉，仅可以git操作。
```bash
// 如果不是root用户请切换至root用户
su root
// 查看 git-shell 是否在登录方式里面
cat /etc/shells 
// 查看是否安装
which git-shell 
vi /etc/shells
// 添加上2步显示出来的路劲，通常在 /usr/bin/git-shell
```
![添加git-shell](4、添加git-shell.png)
![编辑shells文件](5、编辑shells文件.png)

修改`/etc/passwd`中的权限
```bash
// 修改passwd文件
vi /etc/passwd
```
```bash
// 将原来的
git:x:1000:1000::/home/caixianquan:/bin/bash

// 修改为
git:x:1000:1000::/home/caixianquan:/bin/git-shell
```
