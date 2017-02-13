# file-cmd

> a tool to handle file like cmd , Generator/async friendly !

> LinuxShell命令行一样的Node.js文件系统操作函数库，Generator/async友好，可以放入Generator或Async函数中使用，极大的方便Node.js文件操作 ！

## 安装

```shell
npm install file-cmd --save
```

## 使用

file-cmd 可以单独使用，也可以放入Generator/async函数中使用，因为其函数都返回一个Promise对象

```javascript
let fileCmd = require('file-cmd')
let path = require('path')
let co = require('co')


//类似co的Generator和async函数是Node.js文件IO编程的未来，建议将file-cmd放入之中使用
co(function* () {
    try {
        //mkdir 创建文件夹
        //fileCmd.mkdir(要创建的文件夹的绝对路径)
        yield fileCmd.mkdir(path.join(__dirname, 'tttt'))

        //cat 写入或读取文件
        //fileCmd.cat(要读取的文件的绝对路径)=>返回读取文件获得的数据
        //fileCmd.cat(要写入的文件的绝对路径,要写入的数据)
        let text = yield fileCmd.cat(path.join(__dirname, 'README.md'))
        console.log(text.toString())
        yield fileCmd.cat(path.join(__dirname, 'package.json'), 'hello')

        //rm 删除文件或文件夹
        //fileCmd.rm(要删除的文件或文件夹的绝对路径)
        yield fileCmd.rm(path.join(__dirname, 'te'))

        //rmdir 删除文件夹
        //fileCmd.rmdir(要删除的文件夹的绝对路径)
        yield fileCmd.rmdir(path.join(__dirname, 'testdir'))

        //cp 复制文件或文件夹
        //fileCmd.cp(要复制的文件或文件夹,要复制到的路径)
        //fileCmd.cp(要复制的文件或文件夹,要复制到的路径,对被复制后的文件或文件夹重命名)
        //若不传入第三个参数，复制的文件或文件夹沿用之前的名字
        yield fileCmd.cp(
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'sdf'),
            'test_modules'
        )

        //ls 遍历文件夹
        //fileCmd.ls(要遍历的文件夹的绝对路径)=>返回文件夹下根目录文件/文件夹名组成的数组
        let files = fileCmd.ls(path.join(__dirname, ''))
        console.log(files)

        //mv 移动文件或文件夹
        //fileCmd.cp(要移动的文件或文件夹,要移动到的路径)
        //fileCmd.cp(要移动的文件或文件夹,要移动到的路径,对被移动后的文件或文件夹重命名)
        //若不传入第三个参数，移动后的文件或文件夹沿用之前的名字
        yield fileCmd.mv(path.join(__dirname, 'b'), path.join(__dirname, '../'))

        //wait 暂停程序执行指定时间
        //fileCmd.wait(指定时间,单位ms)
        yield fileCmd.wait(2000)

    } catch (e) {
        console.error(e)
    }
})

//如果想独立使用file-cmd也可以
fileCmd.cat(path.join(__dirname, 'README.md'))
    .then(function (data) {
        console.log(data.toString())
    })
```