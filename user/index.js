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
        let sql2 = "update comments set name =? where uid=" + account;
        // let sql3 = "select comments from comments";
        // let res = await con.select(sql3);
        // for (let i of res) {
        //     i.comments = JSON.parse(i.comments);
        //     for (let j of i.comments.content) {
        //         if (name == j.name) {
        //             j.name = name;
        //         }
        //     }
        // }
        // console.log(res);
        let sql4 = "update comments set comments=?";
        let params = [name, gender, region];
        let params2 = [name]; 
        // let params3 = [JSON.stringify(res.comments)];
        let p1 = con.update(sql, params).then(res => {})
        let p2 = con.update(sql2, params2).then(res => {})
        // let p3 = con.update(sql4, params3).then(res => {}) 
        return Promise.all([p1, p2]);
    }
    changeAvatar(path, account) {
        let sql = "update User set avatar =? where phoneNumber=" + account;
        let sql2 = "update comments set avatar =? where uid=" + account;
        let params = [path];
        let params2 = [path];
        let p1 = con.update(sql, params).then(res => {})
        let p2 = con.update(sql2, params2).then(res => {})
        return Promise.all([p1, p2]);
    }
}

module.exports = User;