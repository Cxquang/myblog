---
title: kafka入门学习
date: 2020-12-08 14:25:02
tags:
- kafka
- 大数据
categories:
- 大数据学习
- kafka
keywords:
- kafka
- 大数据
description: 学习尚硅谷kafka视频，对kafka入门简单总结
cover: /2020/12/08/kafka入门学习/kafka入门学习首页.png
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
cover	【可选】文章缩略图(如果没有设置top_img,文章页顶部将显示缩略图，可设为false/图片地址/留空)【需要，地址为：/年/月/日/文章标题/图片名称.后缀名】
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

# kafka概述
## 定义
- Kafka是一个分布式的<font color=red size=3>***基于发布/订阅模式***</font>的<font color=red size=3>***消息队列***</font>，主要应用于大数据实时处理领域。

## 消息队列（Message Queue）
- 三个作用：异步，消峰，解耦

### 传统消息队列的应用场景
1. MQ传统应用场景之异步处理
 - 发送短信通知用户注册成功
 ![发送短信通知用户注册成功](1、发送短信通知用户注册成功.png)

2. MQ传统应用场景之流量消峰
![MQ传统应用场景之流量消峰](2、MQ传统应用场景之流量消峰.png)

### 消息队列的两种模式
1. 点对点模式（<font color=red size=3>***一对一***</font>，消费者主动拉取数据，消息收到后消息清除）

 - 消息生产者生产消息发送到Queue中，然后消息消费者从Queue中取出并且消费消息。消息被消费以后，queue中不再有存储，所以消息消费者不可能消费到已经被消费的消息。Queue支持存在多个消费者，但是对一个消息而言，只会有一个消费者可以消费。
![点对点模式](3、点对点模式.png)

2. 发布/订阅模式（<font color=red size=3>***一对多***</font>，消费者消费数据之后不会清除消息）
 - 消息生产者（发布）将消息发布到topic中，同时有多个消息消费者（订阅）消费该消息。和点对点方式不同，发布到topic的消息会被所有订阅者消费。
![发布/订阅模式](4、发布_订阅模式.png)

## Kafka基础架构
![Kafka基础架构](5、Kafka基础架构.png)
![一个topic分为多个partition](6、一个topic分为多个partition.png)

- 一个组负责消费一个topic，每个分区对应一个消费者，
- 分区数超过组内消费者数时，需要怎么做，<font color=red size=3>***一个消费者可以消费多个分区***</font>；
- 而一个分区不能被两个消费者消费，如果消费者数多于分区数，那么<font color=red size=3>***多出的消费者会消费不了数据***</font>。

![消费组概念](7、消费组概念.png)
![增加多个副本](8、增加多个副本.png)

# Kafka快速入门
# Kafka架构深入
# Kafka API
# Flume对接Kafka
# Kafka监控
# Kafka面试题