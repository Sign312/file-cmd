let fs = require('fs')

let fileCmd = {}

fileCmd.mkdir = function () {
    return new Promise(function (resolve, reject) {
        fs.mkdir
    })
}

module.exports = fileCmd