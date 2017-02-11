let fs = require('fs')

let fileCmd = {}

function deleteFolder(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

fileCmd.mkdir = function (path) {
    return new Promise(function (resolve, reject) {
        fs.mkdir(path, function (err) {
            if (!err) {
                resolve()
            } else {
                reject(err)
            }
        })
    })
}

fileCmd.rmdir = function (path) {
    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(path)) {
            reject(path + '不存在')
        } else {
            if (!fs.statSync(path).isDirectory()) {
                reject(path + '不是目录')
            } else {
                deleteFolder(path)
                resolve()
            }
        }
    })
}

fileCmd.rm = function (path) {
    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(path)) {
            reject(path + '不存在')
        } else {
            if (fs.statSync(path).isDirectory()) {
                deleteFolder(path)
                resolve()
            } else if (fs.statSync(path).isFile()) {
                fs.unlinkSync(path)
                resolve()
            } else {
                reject(path + '路径错误')
            }
        }
    })
}

fileCmd.cat = function (path, text) {
    return new Promise(function (resolve, reject) {
        if (!text) {
            //若没有text参数则获取文件内容
            if (!fs.statSync(path).isFile()) {
                reject(path + '不是正确文件路径')
            } else {
                fs.readFile(path, function (err, data) {
                    if (!err) {
                        resolve(data.toString())
                    } else {
                        reject(err)
                    }
                })
            }
        } else {
            //若有text参数则写入文件
            if (fs.existsSync(path)) {
                if (fs.statSync(path).isFile()) {
                    fs.appendFile(path, text, err => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve()
                        }
                    })
                } else {
                    reject(path + '是目录或错误文件路径')
                }
            } else {
                fs.writeFile(path, text, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            }
        }
    })
}

fileCmd.wait = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, time)
    })
}

module.exports = fileCmd