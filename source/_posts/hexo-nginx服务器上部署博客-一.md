---
title: hexo+nginx服务器上部署博客(一)
date: 2020-06-29 16:33:10
tags: 
- hexo
- nginx
- 服务器
- git
categories: 
- hexo博客
keywords: 
- hexo
- nginx
- 服务器
- git
description: 参考网上文章，结合自己服务器情况，搭建一个hexo博客方便自己总结笔记。
cover: /2020/06/29/hexo-nginx服务器上部署博客-一/hexo-nginx服务器上部署博客-一首页.png
---

# 操作环境
{% note info %}
- VPS服务器，CentOS7【搬瓦工官网服务器】
- Windows PC（本地环境使用win 10）
{% endnote %}

# 本章重点
- 服务器CentOS上安装git
- 服务器CentOS上安装和配置nginx
- 本地Windows安装node.js与git

# 服务器上安装Git
## 服务器上创建用户
{% note danger %}
这里创建一个普通用户来对接本地的git，进行之后的push等操作，避免使用root，以防风险。同时也为了使后面使用ssh免密登录而做准备。
{% endnote %}

### 创建用户
```bash 创建用户
[root@107  ~]# useradd caixianquan
[root@107  ~]# passwd caixianquan
Changing  password  for user caixianquan.
New  password:
Retype  new  password:
passwd: all authentication tokens updated successfully.
```

### 授予权限
```bash 授予用户权限
#查看sudoers文件权限，只有read权限
[root@107  ~]# ll /etc/sudoers
-r--r-----  1  root  root  4328  Nov  28  2019  /etc/sudoers
#修改文件权限为700，可以在root下修改文件内容
[root@107  ~]# chmod 700 /etc/sudoers
[root@107  ~]# ll /etc/sudoers
-rwx------  1  root  root  4328  Nov  28  2019  /etc/sudoers
[root@107  ~]# vim /etc/sudoers
```
找到以下内容
```bash
##  Allow  root  to  run  any  commands  anywhere
root  ALL=(ALL)  ALL
```
在其下面添加一行
```bash
caixianquan  ALL=(ALL)  ALL
```

保存退出，将权限修改回来
```bash
[root@107  ~]# chmod 400 /etc/sudoers
[root@107  ~]# ll /etc/sudoers
-r--------  1  root  root  4360  Jun  5  10:15  /etc/sudoers
```

## 服务器上安装Git
```bash
[root@107 ~]# yum install git
[root@107 ~]# git config --global user.name "caixianquan"
[root@107 ~]# git config --global user.email "854191181@qq.com"
```
{% note info %}
网上解释：因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。你也许会担心，如果有人故意冒充别人怎么办？这个不必担心，首先我们相信大家都是善良无知的群众，其次，真的有冒充的也是有办法可查的。

注意git config命令的--global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
{% endnote %}

# 服务器上安装和配置Nginx

## 安装Nginx
```bash
[root@107 ~]# yum install nginx # 安装nginx
[root@107 ~]# systemctl start nginx # 启动nginx
[root@107 ~]# systemctl enable nginx.service # 设置为开机启动
[root@107 ~]# systemctl status nginx # 查看nginx服务状态
```
{% note primary %}
1. 报错一：
yum安装nginx报错信息如下：
```shell
[root@server_centos8 etc]# yum install -y nginx
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: mirrors.dgut.edu.cn
 * extras: mirrors.dgut.edu.cn
 * updates: mirrors.dgut.edu.cn
No package nginx available.
Error: Nothing to do
```
**解决办法：安装一个源**
```shell
yum install epel-release -y
yum install nginx -y
```
解释：
EPEL (Extra Packages for Enterprise Linux)是基于Fedora的一个项目，为“红帽系”的操作系统提供额外的软件包，适用于RHEL、CentOS和Scientific Linux.

我们在Centos下使用yum安装时往往找不到rpm的情况，官方的rpm repository提供的rpm包也不够丰富，很多时候需要自己编译很痛苦，而EPEL恰恰可以解决这两方面的问题。EPEL的全称叫 Extra Packages for Enterprise Linux 。EPEL是由 Fedora 社区打造，为 RHEL 及衍生发行版如 CentOS、Scientific Linux 等提供高质量软件包的项目。装上了 EPEL之后，就相当于添加了一个第三方源。

2. 报错2：
```shell
[root@server_centos8 yum.repos.d]# systemctl start nginx
Failed to start nginx.service: Access denied
See system logs and 'systemctl status nginx.service' for details.
```
需要执行命令：`systemctl daemon-reexec`，再启动服务

解释：

daemon-reexec Reexecute the systemd manager. This will serialize the manager state, reexecute the process and deserialize the state again. This command is of little use except for debugging and package upgrades. Sometimes, it might be helpful as a heavy-weight daemon-reload.

{% endnote %}
此时用浏览器访问服务器公网ip就可以看到
![浏览器查看nginx是否启动成功](1、浏览器查看nginx是否启动成功.png)

{% note info %}
无法访问页面是防火墙没有开启80端口
开启命令如下：
```shell
[root@centos7 ~]# firewall-cmd --zone=public --add-port=80/tcp --permanent

查询端口号80 是否开启：[root@centos7 ~]# firewall-cmd --query-port=80/tcp

重启防火墙：[root@centos7 ~]# firewall-cmd --reload

查询有哪些端口是开启的:[root@centos7 ~]# firewall-cmd --list-port

命令含义：


--zone #作用域
--add-port=80/tcp #添加端口，格式为：端口/通讯协议
--permanent #永久生效，没有此参数重启后失效

关闭firewall：

systemctl stop firewalld.service #停止firewall

systemctl disable firewalld.service #禁止firewall开机启动
```
{% endnote %}

## 配置SSL证书
如果使用yum安装的nginx，一般都会默认安装有SSL模块，手动安装的就可以参考下面文章。
该小节参考地址：[Nginx 配置 HTTPS 完整过程](https://blog.csdn.net/weixin_37264997/article/details/84525444?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.nonecase)

[使用yum安装下的nginx，添加模块的方法](https://blog.csdn.net/GX_1_11_real/article/details/85784689)
### nginx的ssl模块安装
{% note info %}
- 查看 nginx 是否安装 `http_ssl_module` 模块。
注意：这里的V是大写，小写不会显示安装的模块信息
{% endnote %}

```bash
$ /usr/local/nginx/sbin/nginx -V
```
![查看nginx安装模块信息](3、查看nginx安装模块信息.png)
如果出现 `configure arguments: --with-http_ssl_module`, 则已安装。

### SSL证书获取
在阿里云申请免费证书，如果域名不在阿里云，还需要
进行域名解析。百度查找申请SSL证书。

### SSL证书部署
从阿里云上下载ssl证书文件压缩包（包含pem和key文件）。可以放到nginx配置目录下。配置文件nginx.conf在后面列出。

## nginx配置文件

```bash
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;
    gzip                on;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    # include /etc/nginx/conf.d/*.conf;

    server {
        listen       80;
        server_name  www.caixianquan.tk;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /opt/blog;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    # HTTPS server
    #
    server {
        listen       443 ssl;
        server_name  www.caixianquan.tk;

        ssl_certificate      /etc/nginx/4043710_www.caixianquan.tk.pem;
        ssl_certificate_key  /etc/nginx/4043710_www.caixianquan.tk.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location / {
            root   /opt/blog;
            index  index.html index.htm;
        }
    }
}
```
{% note primary %}
可以去掉http的server配置信息，保留也不会出什么问题【如果没有配置SSL证书，就需要配置http信息】；
配置ssl_certificate和ssl_certificate_key属性，使用绝地路径，也可以使用相对路径；
使用yum安装的nginx服务，在配置服务器名称后会在conf.d文件夹下生成一个以域名为名的conf文件，里面是http重定向。如下所示：
```bash
server {
    listen 80;
    server_name www.caixianquan.tk;
    rewrite ^(.*) https://$server_name:4431$1 permanent;
}
```
{% endnote %}

## 问题
如果启动时出现如下错误：
![出现的错误](2、出现的错误.png)	
{% note warning %}
暂未解决，重新安装的Nginx服务。

指定证书后由于无法加载证书而无法启动，报错如下：
```shell
[root@server_centos8 nginx]# systemctl status nginx.service -l
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)
   Active: failed (Result: exit-code) since Tue 2021-09-21 23:45:55 EDT; 18s ago
  Process: 4551 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
  Process: 7755 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=1/FAILURE)
  Process: 7752 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
 Main PID: 4554 (code=exited, status=0/SUCCESS)

Sep 21 23:45:55 server_centos8 systemd[1]: Starting The nginx HTTP and reverse proxy server...
Sep 21 23:45:55 server_centos8 nginx[7755]: nginx: [emerg] cannot load certificate "/home/caixianquan/1_www.caixianquan.tk_bundle.crt": BIO_new_file() failed (SSL: error:0200100D:system library:fopen:Permission denied:fopen('/home/caixianquan/1_www.caixianquan.tk_bundle.crt','r') error:2006D002:BIO routines:BIO_new_file:system lib)
Sep 21 23:45:55 server_centos8 nginx[7755]: nginx: configuration file /etc/nginx/nginx.conf test failed
Sep 21 23:45:55 server_centos8 systemd[1]: nginx.service: control process exited, code=exited status=1
Sep 21 23:45:55 server_centos8 systemd[1]: Failed to start The nginx HTTP and reverse proxy server.
Sep 21 23:45:55 server_centos8 systemd[1]: Unit nginx.service entered failed state.
Sep 21 23:45:55 server_centos8 systemd[1]: nginx.service failed.

```
1. 解决方案一：
这里可以直接先临时关闭setLinux安全子系统，再启动nginx服务，最后再开启setLinux安全子系统
`setenforce 0`
`restart nginx.service`
`setenforce 1`

2. 解决方案二：
方案一如果系统重启，还是得手动才能启动nginx服务，有点麻烦，尝试从setLinux层面入手解决。
安装semanage： 
```shell
#查看semanage在哪个包
[root@server_centos8 ssl]# yum provides semanage
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: mirrors.nju.edu.cn
 * epel: ftp.riken.jp
 * extras: mirrors.nju.edu.cn
 * updates: mirrors.nju.edu.cn
base/7/x86_64/filelists_db                                                                                                        | 7.2 MB  00:00:03     
epel/x86_64/filelists_db                                                                                                          |  12 MB  00:00:58     
extras/7/x86_64/filelists_db                                                                                                      | 259 kB  00:00:00     
updates/7/x86_64/filelists_db                                                                                                     | 6.1 MB  00:00:00     
policycoreutils-python-2.5-34.el7.x86_64 : SELinux policy core python utilities
Repo        : base
Matched from:
Filename    : /usr/sbin/semanage



policycoreutils-python-2.5-34.el7.x86_64 : SELinux policy core python utilities
Repo        : @base
Matched from:
Filename    : /usr/sbin/semanage



[root@server_centos8 ssl]#  yum install policycoreutils-python-2.5-34.el7.x86_64
```
查看setLinux文件权限，如下是`admin_home_t`,将其修改为`httpd_config_t`
```shell
[root@server_centos8 ~]# ls
1_www.caixianquan.tk_bundle.crt  2_www.caixianquan.tk.key  anaconda-ks.cfg  www.caixianquan.tk.key  www.caixianquan.tk.pem
[root@server_centos8 ~]# ls -lrtZ ./
-rw-------. root root system_u:object_r:admin_home_t:s0 anaconda-ks.cfg
-rw-r--r--. root root unconfined_u:object_r:admin_home_t:s0 www.caixianquan.tk.pem
-rw-r--r--. root root unconfined_u:object_r:admin_home_t:s0 www.caixianquan.tk.key
-rw-r--r--. root root unconfined_u:object_r:admin_home_t:s0 2_www.caixianquan.tk.key
-rw-r--r--. root root unconfined_u:object_r:admin_home_t:s0 1_www.caixianquan.tk_bundle.crt

[root@server_centos8 ~]# chcon -t httpd_config_t www.caixianquan.tk.key
[root@server_centos8 ~]# chcon -t httpd_config_t www.caixianquan.tk.pem
[root@server_centos8 ~]# ls -lrtZ ./
-rw-------. root root system_u:object_r:admin_home_t:s0 anaconda-ks.cfg
-rw-r--r--. root root unconfined_u:object_r:httpd_config_t:s0 www.caixianquan.tk.pem
-rw-r--r--. root root unconfined_u:object_r:httpd_config_t:s0 www.caixianquan.tk.key
-rw-r--r--. root root unconfined_u:object_r:admin_home_t:s0 2_www.caixianquan.tk.key
-rw-r--r--. root root unconfined_u:object_r:admin_home_t:s0 1_www.caixianquan.tk_bundle.crt
```
再重新启动nginx服务，报新错：
```shell
[root@server_centos8 ~]# systemctl start nginx.service
Job for nginx.service failed because the control process exited with error code. See "systemctl status nginx.service" and "journalctl -xe" for details.
[root@server_centos8 ~]# systemctl status nginx.service -l
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)
   Active: failed (Result: exit-code) since Thu 2021-09-23 02:10:12 EDT; 11s ago
  Process: 1890 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
  Process: 2482 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=1/FAILURE)
  Process: 2480 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
 Main PID: 1892 (code=exited, status=0/SUCCESS)

Sep 23 02:10:12 server_centos8 systemd[1]: Starting The nginx HTTP and reverse proxy server...
Sep 23 02:10:12 server_centos8 nginx[2482]: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
Sep 23 02:10:12 server_centos8 nginx[2482]: nginx: [emerg] bind() to 0.0.0.0:88 failed (13: Permission denied)
Sep 23 02:10:12 server_centos8 nginx[2482]: nginx: configuration file /etc/nginx/nginx.conf test failed
Sep 23 02:10:12 server_centos8 systemd[1]: nginx.service: control process exited, code=exited status=1
Sep 23 02:10:12 server_centos8 systemd[1]: Failed to start The nginx HTTP and reverse proxy server.
Sep 23 02:10:12 server_centos8 systemd[1]: Unit nginx.service entered failed state.
Sep 23 02:10:12 server_centos8 systemd[1]: nginx.service failed.
```
这是由于修改了端口80为88，仅在firewall-cmd开放了端口，而在setLinux中并没有开放相关策略的端口（setLinux为enforce模式）
```shell
[root@server_centos8 ssl]# semanage port -l | grep http_port_t
http_port_t                    tcp      80, 81, 443, 488, 8008, 8009, 8443, 9000
pegasus_http_port_t            tcp      5988

#添加端口88
[root@server_centos8 ssl]# semanage port -a -t http_port_t  -p tcp 88
ValueError: Port tcp/88 already defined  #该端口存在其他协议报错

#将-a改为-m，即不会影响其他策略使用88端口
[root@server_centos8 ssl]# semanage port -m -t http_port_t  -p tcp 88
```
同理https的端口由于修改为4431，也需要进行添加端口，但用`-m`参数会报端口不存在，所以需要改为用`-a`参数
```shell
[root@server_centos8 ssl]# semanage port -m -t http_port_t  -p tcp 4431
ValueError: Port @tcp/4431 is not defined
[root@server_centos8 ssl]# semanage port -a -t http_port_t  -p tcp 4431
```
重启nginx服务即可完美解决问题
{% endnote %}	

# 本地Windows安装node.js与git

主要是通过软件直接安装，具体直接百度即可。然后在系统环境变量中将node.js和git的安装目录填写到path变量中【如果安装时没有自动添加环境的话】


