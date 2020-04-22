/*
 * 测试/开发环境的服务器需要自己配置，线上的可保持不变
 * */

const Client = require("ssh2").Client;

/**
 * ssh连接
 */

let localPath = 'C:\\Users\\Administrator\\Desktop\\dist.zip'
let remotePath = '/tmp/dist'
class SSH {
    constructor() {
        this.conn = new Client();
    }

    // 连接服务器
    connectServer() {
        return new Promise((resolve, reject) => {
            let conn = this.conn;
            conn.on("ready", () => {
                resolve({
                    success: true
                });
            }).on('error', (err) => {
                reject({
                    success: false,
                    error: err
                });
            }).on('end', () => {
                console.log('----SSH连接已结束----');
            }).on('close', (had_error) => {
                console.log('----SSH连接已关闭----');
            }).connect({
                host: '119.29.189.114', // 服务器ip地址或域名
                port: '22',
                username: 'root',
                password: '!a258456',
            });
        })
    }

    // 上传文件
    uploadFile({
        localPath,
        remotePath
    }) {
        return new Promise((resolve, reject) => {
            return this.conn.sftp((err, sftp) => {
                if (err) {
                    reject({
                        success: false,
                        error: err
                    });
                } else {
                    console.log(localPath, remotePath)
                    sftp.fastPut(localPath, remotePath, (err, result) => {
                        if (err) {
                            reject({
                                success: false,
                                error: err
                            });
                        }
                        resolve({
                            success: true,
                            result
                        });
                    });
                }
            })
        })
    }
    // 执行ssh命令
    execSsh (command) {
        return new Promise((resolve, reject) => {
            return this.conn.exec(command, (err, stream)=>{
                if (err || !stream) {
                    reject({
                        success: false, error: err
                    });
                } else {
                    stream.on('close', (code, signal) => {
                        resolve({
                            success: true
                        });
                    }).on('data', function (data) {
                        console.log(data.toString());
                    }).stderr.on('data', function (data) {
                        resolve({
                            success: false,
                            error: data.toString()
                        });
                    });
                }
            });
        })
    }
    // 结束连接
    endConn() {
        this.conn.end();
    }
}

async function connect() {
    let sshCon = new SSH();
    let sshRes = await sshCon.connectServer();
    if (!sshRes || !sshRes.success) {
        console.error('----连接服务器失败，请检查用户名密码是否正确以及服务器是否已开启远程连接----');
        return false;
    }
    console.log('----连接服务器成功，开始上传文件----');
    let uploadRes = await sshCon.uploadFile({
        localPath: localPath,
        remotePath: remotePath
    }).catch(e => {
        console.error(e);
    });
    if (!uploadRes || !uploadRes.success) {
        console.error('----上传文件失败，请重新上传----');
        return false;
    }
    console.log('----上传文件成功----');

    let zipRes = await sshCon.execSsh(`unzip -o /tmp/dist -d /tmp`)
        .catch((e) => {});
    if (!zipRes || !zipRes.success) {
        console.error('----解压文件失败，请手动解压zip文件----');
        console.error(`----错误原因：${zipRes.error}----`);
    }
    // if (Config.deleteFile) {
        console.log('----解压文件成功，开始删除上传的压缩包----');
        // let deleteZipRes = await sshCon.execSsh(`rm -rf ${sshConfig.catalog + '/' + fileName}`).catch((e) => {});
        // if (!deleteZipRes || !deleteZipRes.success) {
        //     console.error('----删除文件失败，请手动删除zip文件----');
        //     console.error(`----错误原因：${deleteZipRes.error}----`);
        // }
    // }
    // 结束ssh连接
    sshCon.endConn();
}

connect()