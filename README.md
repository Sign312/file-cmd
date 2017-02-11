# file-cmd

> a tool to handle file like cmd , Generator/yield friendly !

> LinuxShell命令行一样的Node.js文件系统操作函数库，Generator/yield友好，可以放入Generator或Async函数中使用，极大的方便Node.js文件操作 ！

## 安装

```shell
    npm install file-cmd --save
```

## 使用

```javascript
    try {
        //创建文件夹
        yield fileCmd.mkdir(path.join(__dirname, 'tttt'))
        //删除文件夹
        yield fileCmd.rmdir(path.join(__dirname, 'te'))
        //读取或写入文件
        yield fileCmd.cat(path.join(__dirname, 'package.jso'), 'hello')
        //删除文件或文件夹
        yield fileCmd.rm(path.join(__dirname, 'te'))
    } catch (e) {
        //捕获异常打印
        console.error(e)
    }
    //暂停一定时间
    yield fileCmd.wait(2000)
    console.log('end')
```