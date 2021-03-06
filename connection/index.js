/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-01-17 16:09:20
 * @LastEditors: TanXinFeng
 * @LastEditTime: 2020-02-24 18:07:52
 */
const mysql = require('mysql')

class Connection {
    constructor() {}
    // 初始化 mysql 连接 
    connection() {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'pet_miniprogram',
        })
    } 
    // 新增 
    insert(addSql,addSqlParams) {
        let con = this.connection();
        return new Promise((resolve,reject) => {
            con.connect();
            con.query(addSql,addSqlParams,function (err, result) {
                if (err) {
                    reject(err); 
                } 
                resolve(result);
            })
            con.end();
        })
    }
    // 删除
    delete(deleteSql) {
        let con = this.connection();
        return new Promise((resolve,reject) => {
            con.connect();
            con.query(deleteSql,function(err,result){
                if(err){
                    reject(err);
                }
                resolve(result);
            })
            con.end();
        })
    }
    // 修改
    update(updateSql,updateSqlParams) {
        let con = this.connection();
        return new Promise((resolve,reject) => {
            con.connect();
            con.query(updateSql,updateSqlParams,function (err, result) {
                if (err) {
                    reject(err); 
                } 
                resolve(result);
            })
            con.end();
        })
    }
    // 查询
    select(sql) {
        let con = this.connection();
        return new Promise((resolve,reject) => {
            con.connect();
            con.query(sql,function (err, result) {
                if (err) {
                    reject(err); 
                } 
                resolve(result);
            })
            con.end();
        })
    }
}


module.exports = Connection;
// console.log('pool',connection);

// connection.connect();



// connection.end();