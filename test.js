let fileCmd = require('./index')
let path = require('path')
let co = require('co')

co(function* () {
    try {
        //test mkdir
        // yield fileCmd.mkdir(path.join(__dirname, 'tttt'))

        //test cat
        // let text = yield fileCmd.cat(path.join(__dirname, 'README.md'))
        // console.log(text.toString())
        // yield fileCmd.cat(path.join(__dirname, 'package.jso'), 'hello')

        //test rm
        // yield fileCmd.rm(path.join(__dirname, 'te'))

        //test rmdir
        // yield fileCmd.rmdir(path.join(__dirname, 'testdir'))

        // let data = yield fileCmd.cat(path.join(__dirname, 'winteriscoming.jpg'))
        // yield fileCmd.cat(path.join(__dirname, 'test.jpg'), data)

        //test cp
        // yield fileCmd.cp(
        //     path.join(__dirname, 'node_modules'),
        //     path.join(__dirname, 'sdf'),
        //     'test_modules'
        // )

        //test ls
        // let files = fileCmd.ls(path.join(__dirname, ''))
        // console.log(files)

    } catch (e) {
        console.error(e)
    }
    //test wait
    yield fileCmd.wait(2000)
    console.log('end')
})