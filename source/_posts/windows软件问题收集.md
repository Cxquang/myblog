---
title: windows软件问题收集
date: 2020-12-07 16:50:18
tags:
- windows软件
categories:
- windows
- windows软件
keywords:
- windows软件
description: 总结在windows下使用的软件的各种问题及解决方法
cover: /2020/12/07/windows软件问题收集/windows软件问题收集首页.jpg
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

# Sublime Text 3增加最近打开的文件数量（Windows）
1. 参考地址：[Text 3增加最近打开的文件数量（Windows）](https://www.jianshu.com/p/51400de20b0b)

## 具体步骤
1. 找到Sublime Text 3安装目录下的`Default.sublime-package`文件，在我电脑上的路径为：`D:\Program Files\Sublime Text 3\Packages\Default.sublime-package`，复制一份该文件，把文件扩展名改为`zip`，比如改为：`Default.zip`。

![sublimetext3目录](1、sublimetext3目录.png)

2. 解压该zip文件，在解压出的目录中找到文件`Main.sublime-menu`，用文本编辑器打开：

![Main.sublime-menu](2、Main.sublime-menu.png)



3. 找到如图所示的文本，增加几行`{ "command": "open_recent_file", "args": {"index": n } },`。
![增加command](3、增加command.png)

4. 例如把最近打开的文件和文件夹数量都改为15：
![增加15条记录](4、增加15条记录.png)

5. 保存修改的文件`Main.sublime-menu`，找到`Sublime Text 3`的配置文件目录，在我电脑为`C:\Users\zhangchao\AppData\Roaming\Sublime Text 3\Packages\`，新建文件夹Default，把修改后的`Main.sublime-menu`文件复制到Default目录中即可。
![复制到Default目录](5、复制到Default目录.png)

# Chrome神器Vimium快捷键学习记录
j: 向下移动。
k：向上移动。（不明白默认的<c-y>表示是啥用法，使用了c-y这三个键没有效果）
h：向左移动。
l：向右移动。
zH：一直移动到左部。
zL:一直移动到右部。
gg：跳转到页面的顶部。
G：跳转到页面的底部。
d：向下翻页（相当于PageDown被按下了）
u：向上翻页（相当于PageUp被按下了）
r：重新载入该页（相当于F5刷新页面）
gs：查看页面源代码
yy：拷贝当前页面的URL到剪贴板
yf：拷贝某一个URL到剪贴板（实际上是相当于输入了f，然后出现很多编码的URL，选择某个之后，相当于拷贝了某个，因为一个页面中可能有很多超链接）
gu：跳转到父页面（比如http://www.douban.com/group/vim/，输入后跳转到父页面即http://www.douban.com/group/，所以不同于H的快捷键是回到上个历史页面）

i：输入模式（如果发现命令不起作用，可能是进入输入模式了，此时按Esc回到命令模式）
gi：将焦点集中到第一个输入框（输入gNi则焦点集中到第N个输入框）
f：在当前的页面打开一个新的链接。
F：在新的页面打开一个新的链接。
\<a-f>:在当前页面打开多个链接（没感觉使用到了多个标签，不过表示的是输入af）
b：在当前页打开一个书签。（输入部分网址会自动进行搜索）
B：在新的标签页打开一个书签
gf：循环到当前页面的下一个框层（可能跟页面制作有关，目前没用到）

查找模式：（和Vim相似）
/ : 查找
n: 向下查找匹配内容
N：向上查找匹配内容

导航历史：
H：回退上一个历史页面（相当于浏览器中的向左箭头）
L：回到下一个历史页面（相当于浏览器的向右箭头）

标签页操作：
K，gt：跳转到右边的一个标签页
J，gT：跳转到左边的一个标签页
t：创建一个新的标签页
x：关闭当前的标签页
X：恢复刚刚关闭的标签页
？：显示命令的帮助提示（再按一次关闭）