---
title: Hello World
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)


## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

```scala

 //只需要dqbm，xlxdbs，gddwbm
    //dataZbGsdxxDf1.select("XLXDBS","DQBM","GDDWBM").createOrReplaceTempView("rxs_data1")
    val rxsXlCshxxDf = RxsColumnsUdf.getcshDF().select("XLXDBS","DQBM","GDDWBM")



    val rxsxlCshxx1: Array[(String, String, String)] = rxsXlCshxxDf.collect().map(f => (f.getAs[String](0), f.getAs[String](1), f.getAs[String](2)))
   // val arrayDf:Array[DataFrame] = new Array[DataFrame](rxsxlCshxx1.length)
   val arrayDf:Array[(String, String, String, BigDecimal)] = new Array[(String, String, String,BigDecimal)](rxsxlCshxx1.length)
  //  val arrayCount:Array[Long] = new Array[Long](rxsxlCshxx1.length)

    println("初始化表总共行数: "+ rxsxlCshxx1.length)
    //针对dqbm，xlxdbs，gddwbm进行插数

    for (i <- 0 until rxsxlCshxx1.length){

      //bqsdl所在的gddwbm下的所有下级单位集合进行sum,操作一行
      arrayDf(i) = spark.sql(
        s"""
           |select BQSDL,
           |       XLXDBS,
           |       DQBM
           |    from rxs_dataZbGsdxx E
           |    where E.GDDWBM like '${rxsxlCshxx1(i)._3}%'
           |        and E.XLXDBS = ${rxsxlCshxx1(i)._1}
           |        and E.DQBM = ${rxsxlCshxx1(i)._2}
          """.stripMargin)

```
![default_cover](/images/default_cover.jpg)