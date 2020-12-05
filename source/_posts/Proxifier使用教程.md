---
title: Proxifier使用教程
date: 2020-06-29 11:47:01
tags: 
- Proxifier
- 科学上网
categories: 
- 我的服务器
keywords: 
- Proxifier
- 科学上网
description: Proxifier使用教程，全局或者代理，比较详细，之前收藏的文章404了，特此记录一下
cover: /2020/06/29/Proxifier使用教程/Proxifier使用教程首页.png
---


# 配置顺序--三步
-   代理服务器配置
-   代理规则设置
-   域名解析设置

![配置顺序](1、配置顺序.png)

# 代理服务器配置
-   点击Proxy Server按钮
-   add
-   输入本地shadowshocks的ip（默认127.0.0.1）和端口（默认1080）
-   选择SHOCKS Versin 5
-   然后点击check
-   OK

![代理服务器配置](2、代理服务器配置.png)

显示Proxy is ready to work with Proxfier! 则此步骤配置成功，否则认真检查端口是否正确以及shadowsocks是否运行。


![检查是否能够连接上服务器](3、检查是否能够连接上服务器.png)

{% note  primary  %}
接下来的两步配置至关重要，配置错误可能导致全局代理失败或者循环代理。
{% endnote %}

# 代理规则设置
-   点击Proxification Rule
-   选中localhost,点击Edit
-   Target hosts处添加shadowshocks代理服务器的IP地址（以123.123.123.123示例）
-   Action选择Direct(直连)
-   OK

![代理规则配置](4、代理规则配置.png)

{% note info %}
注：此配置步骤允许发送到代理服务器的数据包通过，防止循环代理错误
{% endnote %}

配置后如图
![配置localhost防止循环代理](5、配置localhost防止循环代理.png)

# 域名解析设置
-   点击Name Resolution
-   选择第二个Resolve hostnames through proxy（通过代理服务器解析域名）
-   OK

![域名解析设置](6、域名解析设置.png)

至此，全局代理已经配置完毕，用CMD命令nslookup [www.google.com](www.google.com)测试是否成功获取其IP地址，也可以直接访问[www.ip138.com](www.ip138.com)查看当前外网IP地址。

{% note warning %}
注意：如果未配置localhost，那么也可以单独配置科学上网使用的应用程序，我这里使用的是trojan，如下：
![添加trojan过滤规则](7、添加trojan过滤规则.png)	
{% endnote %}
