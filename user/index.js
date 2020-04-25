/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-02-20 12:17:59
 * @LastEditors: TanXinFeng
 * @LastEditTime: 2020-02-26 14:31:53
 */
const Connection = require('../connection/index')
const con = new Connection();

class User {
    constructor() {

    }
    getUserInfo(account) {
        return new Promise((resolve, reject) => {
            let sql = "select * from User where phoneNumber =" + account;
            con.select(sql).then(res => {
                resolve(res[0]);
            })
        })
    }
    async changeUserInfo(name, gender, region, account) {
        let sql = "update User set name=?,gender=?,region=? where phoneNumber=" + account + "";
        let sql2 = "update dynamic set name =? where uid=" + account;
        let sql3 = "update comment set name =? where uid=" + account;
        let params = [name, gender, region];
        let params2 = [name];
        let params3 = [name];
        let p1 = con.update(sql, params).then(res => { })
        let p2 = con.update(sql2, params2).then(res => { })
        let p3 = con.update(sql3, params3).then(res => { })
        return Promise.all([p1, p2, p3]);
    }
    changeAvatar(path, account) {
        let sql = "update User set avatar =? where phoneNumber=" + account;
        let sql2 = "update comment set avatar =? where uid=" + account;
        let sql3 = "update dynamic set avatar =? where uid=" + account;
        let sql4 = "update likes set avatar =? where uid=" + account;
        let params = [path];
        let params2 = [path]; 
        let params3 = [path];
        let params4 = [path] 
        let p1 = con.update(sql, params).then(res => { })
        let p2 = con.update(sql2, params2).then(res => { })
        let p3 = con.update(sql3, params3).then(res => { })
        let p4 = con.update(sql4, params4).then(res => { })
        return Promise.all([p1, p2, p3, p4]);
    }
    // 我的相册
    myAlbum(account) {
        return new Promise((resolve, reject) => {
            let sql = "select * from dynamic where uid =" + account;
            con.select(sql).then(res=>{
                resolve(res);
            })
        })
    }
    // 我的点赞
    myCollection(uid){
        return new Promise((resolve,reject) => {
            let sql = `select * from likes where uid = ${uid} and post_uid != ${uid}`;
            con.select(sql).then(res => {
                resolve(res);
            })
        })
    }
}

module.exports = User;