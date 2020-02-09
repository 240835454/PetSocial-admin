const ZhenzismsClient = require('../public/zhenzisms');
const Connection = require('../connection/index')

const con = new Connection();

class Login {
    constructor() {}
    // 注册
    register(account, msgCaptcha) {
        return new Promise((resolve, reject) => {
            let that = this;
            let result = '';
            var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefjhigklmnopqrstuvwxyz";
            for (let i = 0; i < 4; i++) {
                var num = parseInt(Math.random() * str.length);
                result = result + str.charAt(num);
            }
            if (this.result == msgCaptcha) {
                let sql = "select * from User where phoneNumber='" + account + "'";
                con.select(sql).then(res => {
                    // resolve(res);
                    if (res.length == 0) {
                        let addSql = "insert into User(phoneNumber,gender,name) values (?)";
                        let addSqlParams = [];
                        addSqlParams.push(account);
                        addSqlParams.push(1);
                        addSqlParams.push(result);
                        con.insert(addSql, [addSqlParams]).then(res => {
                            resolve(that.account);
                        }) 
                        that.account = account;
                    } else {
                        reject({
                            code: -1,
                            message: '该号码已注册'
                        });
                    }
                    // console.log(res);
                })
            } else {
                reject({
                    code: -2,
                    message: '验证码错误'
                });
            }
        })
    }
    // 获取手机验证码 type: 1=登录，2=注册
    getCaptcha(account, type) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefjhigklmnopqrstuvwxyz";
        this.result = '';
        this.loginResult = '';
        if (type == 2) {
            for (let i = 0; i < 4; i++) {
                var num = parseInt(Math.random() * str.length);
                this.result = this.result + str.charAt(num);
            }
            return new Promise((resolve, reject) => {
                var client = new ZhenzismsClient('sms_developer.zhenzikj.com', '104410', 'NzZkODhhYTktODU2Mi00MDgwLWFjYzYtMzg3ZWFiMDQ0MjI3');
                var params = {
                    message: "验证码: " + this.result + "，您正在注册萌宠账号，验证码在5分钟内有效。",
                    number: account
                };
                var res = client.send(params);
                resolve(res);
            })
        } else {
            for (let i = 0; i < 4; i++) {
                var num = parseInt(Math.random() * str.length);
                this.loginResult = this.loginResult + str.charAt(num);
            }
            return new Promise((resolve, reject) => {
                var client = new ZhenzismsClient('sms_developer.zhenzikj.com', '104410', 'NzZkODhhYTktODU2Mi00MDgwLWFjYzYtMzg3ZWFiMDQ0MjI3');
                var params = {
                    message: "验证码: " + this.loginResult + "，您正在登录萌宠账号，验证码在5分钟内有效。",
                    number: account
                };
                var res = client.send(params);
                resolve(res);
            })
        }

    }
    // 设置密码
    setPassword(password, confirmPassword) {
        return new Promise((resolve, reject) => {
            if (password == confirmPassword) {
                let that = this;
                let sql = "select * from User where phoneNumber='" + this.account + "'";
                con.select(sql).then(res => {
                    if (res.length != 0) {
                        let updateSql = "update User set password= ? where phoneNumber = ?";
                        let updateSqlParams = [];
                        updateSqlParams.push(password);
                        updateSqlParams.push(that.account);
                        con.update(updateSql, updateSqlParams).then(res => {
                            resolve(that.account);
                        })
                    } else {
                        reject({
                            code: -1,
                            message: '未知错误'
                        });
                    }
                    // console.log(res);
                })
            } else {
                reject({
                    code: -2,
                    message: '密码不一致！'
                })
            }
        })
    }
    // 登录
    async login(account, password, msgCaptcha) {
        let that = this;
        let sql = "select * from User where phoneNumber='" + account + "'";
        await con.select(sql).then(res => {
            if(res.length != 0 ){
                that.password = res[0].password 
            }else{
                return new Promise((resolve,reject) => {
                    reject({
                        code: -1,
                        message: '该号码不存在'
                    })
                })
            }
        })
        return new Promise((resolve, reject) => {
            if (this.loginResult == msgCaptcha) {
                // let sql = "select * from User where phoneNumber='" + account + "'";
                con.select(sql).then(res => {
                    if (res.length != 0) {
                        resolve(that.account);
                    } else {
                        reject({
                            code: -1,
                            message: '该号码不存在'
                        });
                    }
                    // console.log(res);
                })
            }
            else if(password == that.password){
                 resolve(account) 
            } 
            else {
                reject({
                    code: -2,
                    message: '验证码错误'
                });
            }
        })
    }
}

module.exports = Login