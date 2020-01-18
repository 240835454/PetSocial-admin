/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-01-13 17:04:54
 * @LastEditors  : TanXinFeng
 * @LastEditTime : 2020-01-18 17:57:47
 */

const mysql = require('mysql');



class Encyclopedia {
    constructor() {

    }
    connection() {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'pet_miniprogram',
        })
    }
    petTypeList(id) {
        let connection = this.connection();
        return new Promise((resolve, reject) => {
            connection.connect();
            let sql = "select petBreedId,name,icon,firstWord from qita where petRaceId='" + id + "'";
            connection.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
            connection.end();
        })
    }
    petDetail(id) {
        let connection = this.connection();
        return new Promise((resolve, reject) => {
            connection.connect();
            let sql = "select * from qita where petBreedId='" + id + "'";
            connection.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
            connection.end();
        })
    }
}


module.exports = Encyclopedia;