let fileCmd = require('./index')
let path = require('path')
let co = require('co')

co(function* () {
    try {
        // yield fileCmd.mkdir(path.join(__dirname, 'tttt'))
        // yield fileCmd.cat(path.join(__dirname, 'package.jso'), 'hello')
        yield fileCmd.rm(path.join(__dirname, 'te'))
    } catch (e) {
        console.error(e)
    }
    yield fileCmd.wait(2000)
    console.log('end')
})