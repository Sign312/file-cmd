let fs = require('fs')
let ph = require('path')

let fileCmd = {}

//递归删除一个文件夹
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

//复制文件夹
function copyDir(path, pathTo) {
    let files = fs.readdirSync(path)
    files.forEach((file, index) => {
        let curPath = path + "/" + file
        if (fs.statSync(curPath).isDirectory()) {
            fs.mkdirSync(pathTo + "/" + file)
            copyDir(curPath, pathTo + "/" + file)
        } else {
            let filedata = fs.readFileSync(curPath)
            let filename = file
            fs.writeFileSync(ph.join(pathTo, filename), filedata)
        }
    })
}

//根据路径获取文件或文件夹的名称
function getName(path) {
    let names = path.split('/')
    return names[names.length - 1].length > 0 ? names[names.length - 1] : names[names.length - 2]
}

fileCmd.ls = function (path) {
    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(path)) {
            reject(path + '不存在')
            return
        }
        if (!fs.statSync(path).isDirectory()) {
            reject(path + '不是一个目录')
            return
        }
        let files = fs.readdirSync(path)
        resolve(files)
    })
}

fileCmd.cp = function (path, pathTo, rename) {
    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(path)) {
            reject(path + '不存在')
            return
        }
        if (!fs.existsSync(pathTo)) {
            reject(pathTo + '不存在')
            return
        }
        if (fs.statSync(path).isFile()) {
            //若被复制的是文件
            let filedata = fs.readFileSync(path)
            let filename = rename ? rename : getName(path)
            fs.writeFileSync(ph.join(pathTo, filename), filedata)
            resolve(filedata)
        } else if (fs.statSync(path).isDirectory()) {
            //若被复制的是文件夹
            let c_pathTo = rename ? ph.join(pathTo, rename) : ph.join(pathTo, getName(path))
            if (fs.existsSync(c_pathTo)) {
                reject(c_pathTo + '已存在')
            } else {
                fs.mkdirSync(c_pathTo)
                copyDir(path, c_pathTo)
                resolve()
            }
        } else {
            reject(path + '不是正确路径')
        }
    })
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
                        resolve(data)
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