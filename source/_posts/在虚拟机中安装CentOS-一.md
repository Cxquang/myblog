---
title: 在虚拟机中安装CentOS(一)
date: 2020-10-02 15:49:37
tags:
- 环境搭建
- VirtualBox
- CentOS7
categories:
- 大数据学习
- 大数据集群环境搭建
keywords:
- 环境搭建
- VirtualBox
- CentOS7
description: 集群搭建准备工作，使用VirtualBox安装CentOS7并能够在多台虚拟机之间进行通信。
cover: /2020/10/02/在虚拟机中安装CentOS-一/在虚拟机中安装CentOS7首页.jpg
---

# 安装VirtualBox
- 下载地址：https://www.virtualbox.org/wiki/Downloads

直接安装即可

# 安装虚拟机
1. 点击新建，填写虚拟机名称和指定文件夹
![填写虚拟机名称](1、填写虚拟机名称.png)

2. 指定内存大小为4096MB，创建虚拟硬盘
{% asset_img 2、创建虚拟硬盘.png %}
{% asset_img 3、现在创建硬盘.png %}
 - 默认类型VDI即可
![默认类型](4、默认类型.png)
 - 动态分配硬盘大小
![动态分配硬盘大小](5、动态分配硬盘大小.png)

3. 指定虚拟硬盘文件存放位置和大小
![指定虚拟硬盘文件存放位置和大小](6、指定虚拟硬盘文件存放位置和大小.png)
4. 启动虚拟机，指定光驱存放位置，开始安装CentOS7系统
![指定光驱](7、指定光驱.png)

## 创建虚拟机时报错问题
![创建虚拟机时报错问题](8、创建虚拟机时报错问题.png)

{% note warning %}
由于Hyper-V 虚拟化在 windows 中已经被启用，故需要关闭Hyper-V，直接在控制面板中关闭重启电脑即可
{% endnote %}

# 安装CentOS系统
1. 在进入系统引导后，会进入文字界面，选择install CentOS7
<font color=red size=3>**（用键盘上的方向键↑、↓来选择要执行的操作，白色字体表示选中，按下回车，进入下一步操作）**</font>
![进入安装界面](9、进入安装界面.png)
2. 按回车执行安装过程
![执行安装过程](10、执行安装过程.png)
3. 选择安装的语言
![选择安装的语言](11、选择安装的语言.png)
4. 设置安装类型
![设置安装类型](12、设置安装类型.png)
5. 点击“软件选择”，默认是最小安装，只有系统功能，完全使用命令行操作
![软件选择](13、软件选择.png)
6. 按照下图选择，点击上方“完成”返回到前一个页面即可，点击“开始安装”开始安装服务器
![开始安装](14、开始安装.png)
7. 设置用户密码
![设置用户密码](15、设置用户密码.png)
8. 成功进入CentOS系统，默认选择的是“汉语”，直接“前进”即可
![选择语言](16、选择语言.png)
9. 选择输入法为“汉语(Intelligent Pinyin)”,汉语智能拼音输入法，否则无法输入汉字
10. 关闭定位（默认是打开的）
![关闭定位](17、关闭定位.png)
![位置服务](18、位置服务.png)
11. 时区定位北京，跳过登录账号
![定位北京](19、定位北京.png)
![跳过在线账号](20、跳过在线账号.png)

# 使用复制创建另外两个虚拟机
1. 选择创建好的虚拟机右键复制，如下，修改虚拟机名称，存储位置、MAC地址初始化如下图所示
![复制虚拟机](21、复制虚拟机.png)

2. 选择完全复制，就可以得到另外两个虚拟机
![完全复制](22、完全复制.png)
![产生两个虚拟机](23、产生两个虚拟机.png)

## 修改Slave1和Slave2
1. 修改内存大小为2048MB
![修改内存](24、修改内存.png)
2. 修改用户名分别为Slave1和Slave2
 - 举例Slave1：
 - 以root身份进入系统
```shell
usermod  -l  新用户名  -d  /home/新用户名  -m  老用户名   （英文L）
如：usermod -l caixianquan-Slave1 -d /home/caixianquan-Slave1 -m caixianquan-Master
```
此时登录界面还是caixianquan-Master显示的用户名，这时登录这个普通用户，在设置-->详细信息-->用户里面的账号修改用户名即可，如示图
![修改登录界面用户名](25、修改登录界面用户名.png)

# 主机与虚拟机实现复制粘贴
1. 打开虚拟机，菜单栏中点击设备，选择共享文件夹，共享粘贴板，拖动都选择双向，然后点击安装增强功能，出现如下问题

![安装增强功能出现问题](26、安装增强功能出现问题.png)
{% note primary %}
解决方法：进入系统在侧边找到如图加载的虚拟光驱，右击，点击弹出，然后就可正常安装增强功能了
{% endnote %}
![弹出虚拟光驱](27、弹出虚拟光驱.png)

2. 安装完成之后重启即可使用增强功能

# 虚拟机上网，相互之间可以ping通，和主机ping通
{% note primary %}
<font color=red size=3>**需要两个网卡才可以同时上网和ping通主机，一个使用NAT模式，一个使用Host-only模式【按照下图可以通过设置直接使用Host-only实现包含NAT模式中的所有功能，未测试】**</font>
<font color=red size=3>**或者直接使用桥接模式，但需要独立的真实IP**</font>
{% endnote %}

1. VirtualBox中有4中网络连接方式:
 - NAT 
 - Bridged Adapter 
 - Internal 
 - Host-only Adapter
![四种网络连接方式](28、四种网络连接方式.png)
参考地址：https://blog.csdn.net/java_zjh/article/details/81147572

## NAT
1. NAT：Network Address Translation，网络地址转换
2. NAT模式是最简单的实现虚拟机上网的方式，你可以这样理解：
 - Guest访问网络的所有数据都是由主机提供的，Guest并不真实存在于网络中，主机与网络中的任何机器都不能查看和访问到Guest的存在。
 - Guest可以访问主机能访问到的所有网络，但是对于主机以及主机网络上的其他机器，Guest又是不可见的，甚至主机也访问不到Guest。
3. 虚拟机与主机的关系：只能单向访问，虚拟机可以通过网络访问到主机，主机无法通过网络访问到虚拟机。
4. 虚拟机与网络中其他主机的关系：只能单向访问，虚拟机可以访问到网络中其他主机，其他主机不能通过网络访问到虚拟机。
5. 虚拟机与虚拟机的关系：相互不能访问，虚拟机与虚拟机各自完全独立，相互间无法通过网络访问彼此。

## Bridged Adapter（网桥模式）
- 网桥模式，你可以这样理解：
- 它是通过主机网卡，架设了一条桥，直接连入到网络中了。因此，它使得虚拟机能被分配到一个网络中独立的IP，所有网络功能完全和在网络中的真实机器一样。
- 网桥模式下的虚拟机，你把它认为是真实计算机就行了。
- 虚拟机与主机的关系：可以相互访问，因为虚拟机在真实网络段中有独立IP，主机与虚拟机处于同一网络段中，彼此可以通过各自IP相互访问。
- 虚拟机于网络中其他主机的关系：可以相互访问，同样因为虚拟机在真实网络段中有独立IP，虚拟机与所有网络其他主机处于同一网络段中，彼此可以通过各自IP相互访问。
- 虚拟机与虚拟机的关系：可以相互访问，原因同上。

## Internal（内网模式）
- 内网模式，顾名思义就是内部网络模式：
- 虚拟机与外网完全断开，只实现虚拟机于虚拟机之间的内部网络模式。
- 虚拟机与主机的关系：不能相互访问，彼此不属于同一个网络，无法相互访问。
- 虚拟机与网络中其他主机的关系：不能相互访问，理由同上。
- 虚拟机与虚拟机的关系：可以相互访问，前提是在设置网络时，两台虚拟机设置同一网络名称。如上配置图中，名称为intnet。

##、Host-only Adapter（主机模式）

- 主机模式，这是一种比较复杂的模式，需要有比较扎实的网络基础知识才能玩转。可以说前面几种模式所实现的功能，在这种模式下，通过虚拟机及网卡的设置都可以被实现。
- 我们可以理解为Guest在主机中模拟出一张专供虚拟机使用的网卡，所有虚拟机都是连接到该网卡上的，我们可以通过设置这张网卡来实现上网及其他很多功能，比如（网卡共享、网卡桥接等）。
- 虚拟机与主机的关系：默认不能相互访问，双方不属于同一IP段，host-only网卡默认IP段为192.168.56.X 子网掩码为255.255.255.0，后面的虚拟机被分配到的也都是这个网段。通过网卡共享、网卡桥接等，可以实现虚拟机于主机相互访问。
- 虚拟机与网络主机的关系：默认不能相互访问，原因同上，通过设置，可以实现相互访问。
- 虚拟机与虚拟机的关系：默认可以相互访问，都是同处于一个网段。

## NAT模式实现
1. 安装完 CentOS 7 之后，关闭三个虚拟机系统
2. 【全局设置网卡】在 VirtualBox 主控制界面点击 【管理】--【全局设定】--【网络】--【添加新NAT网络】
![全局设置网卡](29、全局设置网卡.png)
3. 在弹出的对话框中，设置【网络CIDR】为【192.168.100.0/24】，【确定】
![设置网络CIDR](30、设置网络CIDR.png)
4. 【单独对每一个虚拟机设置】在管理界面点击【设置】--【网络】--【网卡1】，【连接方式】选择【NAT网络】，【界面名称】选【NATNetwork】，【确定】
![单独设置虚拟机](31、单独设置虚拟机.png)
![单独设置虚拟机](32、单独设置虚拟机.png)
![单独设置虚拟机](33、单独设置虚拟机.png)
5. 【启动】，登进系统，运行：
```shell
# vi /etc/sysconfig/network-scripts/ifcfg-enp0s3
```
6. 修改ifcfg-eth0配置文件：
```shell
需要的信息：
BOOTPROTO=static
NM_CONTROLLED=no
IPADDR=192.168.100.10  #Master
#IPADDR=192.168.100.20  #Slave1
#IPADDR=192.168.100.30  #Slave2
NETMASK=255.255.255.0
GATEWAY=192.168.100.1  #默认网关，在网段为192.168.100.0/24的时候
DNS1=114.114.114.114 	#宿主主机的DNS信息
```
7. 重启网络服务：
```shell
# service network restart
```
8. 此时可以正常联网了
## Host-only Adapter（主机模式）
1. 关闭系统，在【管理】--【全局设定】--【网络】中，应该能看到【仅主机（Host-Only）网络】的选项卡。在安装完 VirtualBox后，在计算机的【网络和共享中心】--【更改适配器设置】中可以看到【VirtualBox Host-Only Network】：
![更改适配器设置](34、更改适配器设置.png)
2. 回到 VirtualBox，点击菜单栏上的管理按键，然后选择主机网络管理器，可以看到：
![主机网络管理器](35、主机网络管理器.png)
3. 对每一台虚拟机，【设置】--【网络】--【网卡2】--【启用网络连接】，【连接方式】选【仅主机（Host-Only）网络】：
![对每一台虚拟机进行设置](36、对每一台虚拟机进行设置.png)
4. 开机，执行如以下命令
<font color=red size=3>**（注意：在CentOS7中的网卡配置文件有所改变，看下面的命令）**</font>
```shell
# cd /etc/sysconfig/network-scripts/
# cp ifcfg-enp0s3 ifcfg-enp0s8  #将原先NAT模式网卡复制一份位ifcfg-enp0s8
# vi ifcfg-enp0s8
```
5. 删除【HWADDR】行，删除【UUID】行，添加【IPADDR】和【NETMASK】，修改【DEVICE】为【eth1】，【BOOTPROTO】为【static】：
```shell
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s8
DEVICE=enp0s8
ONBOOT=yes
 
NM_CONTROLLED=no
IPADDR=192.168.56.30  #Slave2
#IPADDR=192.168.56.10   #Master
#IPADDR=192.168.56.20   #Slave1
NETMASK=255.255.255.0
```
6. 重启网络服务，即可与主机互相ping通
{% note primary %}
在公司虚拟网中或者家庭网中容易实现
{% endnote %}

## 桥接模式【需要独立ip】
1. 由于桥接模式能够让虚拟机共享局域网，方便自己可以用一台电脑启动集群，另一台测试和做笔记等，故在此记录桥接模式配置的过程
 - 参考地址：[配置virtualbox虚拟机Linux系统桥接模式上网](https://blog.csdn.net/java_zjh/article/details/81147572)
2. 关闭系统，在【管理】--【主机网络管理器】中创建一个VirtualBox Host-Only Ethernet Adapter网卡【如果本地连接中存在该网卡，则不必添加】，如图所示：
![添加网卡](37、添加网卡.png)
3. 在本地网络连接中可以看到添加了一块网卡
![查看添加的网卡](38、查看添加的网卡.png)
4. 点击本地连接的属性，看是否出现virtualbox bridged networking dirver 选项，如果未出现，点击安装（应该在服务选项中），并且选中，点击确定；
![添加驱动](39、添加驱动.png)
5. 对VirtualBox Host-Only Network网卡进行信息配置
![配置网卡信息](40、配置网卡信息.png)
6. 对每一台虚拟机，【设置】--【网络】--【网卡1】--【启用网络连接】，【连接方式】选【桥接网卡】：
![启用桥接模式](41、启用桥接模式.png)
7. 启动系统，修改linux中的网卡信息
```shell
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s3
DEVICE=enp0s3
ONBOOT=yes
 
NM_CONTROLLED=no
IPADDR=192.168.2.30  #Slave2
#IPADDR=192.168.2.10    #Master
#IPADDR=192.168.2.20    #Slave1
NETMASK=255.255.255.0
GATEWAY=192.168.2.1 #根据本机物理网卡的网关
DNS1=144.144.144.144
```
<font color=red size=3>**注意如果在虚拟机管理器设置中没有启动虚拟网卡或者没有添加网卡，则在linux中的网卡 文件夹中的无效网卡信息文件要删除**</font>

8. 重启网卡服务
```shell
[root@master share_folder]# service network restart
Restarting network (via systemctl):                        [  确定  ]
[root@master share_folder]# ifconfig
enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.2.30  netmask 255.255.255.0  broadcast 192.168.2.255
        inet6 fe80::a00:27ff:fee0:88cc  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:e0:88:cc  txqueuelen 1000  (Ethernet)
        RX packets 3597  bytes 243752 (238.0 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 82  bytes 9939 (9.7 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
【测试网络连接】
【ping通网络】
[root@master share_folder]# ping www.baidu.com
PING www.a.shifen.com (14.215.177.39) 56(84) bytes of data.
64 bytes from 14.215.177.39 (14.215.177.39): icmp_seq=1 ttl=57 time=19.4 ms
64 bytes from 14.215.177.39 (14.215.177.39): icmp_seq=2 ttl=57 time=18.7 ms
64 bytes from 14.215.177.39 (14.215.177.39): icmp_seq=3 ttl=57 time=52.0 ms
^C
--- www.a.shifen.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 18.730/30.074/52.008/15.512 ms
【ping通过宿主主机】
[root@master share_folder]# ping 192.168.2.172
PING 192.168.2.172 (192.168.2.172) 56(84) bytes of data.
64 bytes from 192.168.2.172: icmp_seq=1 ttl=64 time=0.403 ms
64 bytes from 192.168.2.172: icmp_seq=2 ttl=64 time=0.277 ms
^C
--- 192.168.2.172 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 999ms
rtt min/avg/max/mdev = 0.277/0.340/0.403/0.063 ms
【ping通局域网内的其他主机】
[root@master share_folder]# ping 192.168.2.124
PING 192.168.2.124 (192.168.2.124) 56(84) bytes of data.
64 bytes from 192.168.2.124: icmp_seq=1 ttl=64 time=237 ms
64 bytes from 192.168.2.124: icmp_seq=2 ttl=64 time=67.9 ms
^C
--- 192.168.2.124 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 999ms
rtt min/avg/max/mdev = 67.903/152.540/237.178/84.638 ms
```

## 主机模式+共享网络
参考地址：[VMware虚拟机三种网络模式详解 ---------Host-Only（仅主机模式）](https://blog.csdn.net/sunweixiang1002/article/details/84679928)
1. 主机模式配置和上述相同，这里配置共享网络
![共享网络设置](42、共享网络设置.png)
2. 可以看到上图有一个提示，强制将VMware Network Adapter VMnet1的ip设置成192.168.137.1
![自动分配IP](43、自动分配IP.png)
3. 将虚拟机重新设置IP,重启网卡服务
<font color=red size=3>**要设置网关和DNS，与VMware Network Adapter VMnet1的IP相同**</font>
![重新设置虚拟机ip](44、重新设置虚拟机ip.png)
![能够与主机通信并且ping通外网](45、能够与主机通信并且ping通外网.png)

# 关闭防火墙
{% note primary %}
关闭防火墙才能正常使用SSH连接，也可以添加规则（单机环境，只是实验，直接关闭容易点）
{% endnote %}
```shell
#查看防火墙状态
service iptables status
#关闭防火墙
sudo service iptables stop
#查看防火墙开机启动状态
chkconfig iptables --list
#关闭防火墙开机启动
sudo chkconfig iptables off
```
```Shell CentOS下的防火墙
启动： systemctl start firewalld
关闭： systemctl stop firewalld
查看状态： systemctl status firewalld 
开机禁用  ： systemctl disable firewalld
开机启用  ： systemctl enable firewalld
```

# 修改主机名(永久)
```shell
hostnamectl set-hostname <newhostname>
```

