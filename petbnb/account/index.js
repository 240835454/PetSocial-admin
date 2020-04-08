// 账单
const mysql = require('mysql');
const Connection = require('../../connection/index')

const con = new Connection();

class Account { 
    constructor() { 

    }
    addAccount(uid,color,name,icon,id,date,cost) {
        return new Promise((resolve, reject) => {
            let sql = "insert into account(uid,color,name,icon,type_id,date,cost) values (?)";
            let params = [uid,color,name,icon,id,date,cost]; 
            con.insert(sql, [params]).then(res=>{
                resolve(res);
            })
        })
    }  
    getAccountList(uid,date){ 
        let p1 = new Promise((resolve,reject) => {  
            let sql = "select * from account where uid ='" + uid +"' and date like '" + date + "%' ORDER BY date DESC";
            con.select(sql).then(res => {
                resolve(res); 
            })
        })
        let p2 = new Promise((resolve,reject) => {
            let sql = "select sum(cost) as sum from account where uid ='" + uid +"' and date like '" + date + "%'";
            con.select(sql).then(res => {
                resolve(res);
            })
        })
        return Promise.all([p1,p2]);
    }
}


module.exports = Account;