/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-01-13 17:04:54
 * @LastEditors  : TanXinFeng
 * @LastEditTime : 2020-01-18 17:57:47
 */

const mysql = require('mysql');
const Connection = require('../../connection/index')

const con = new Connection();



class Encyclopedia {
    constructor() {

    }
    petTypeList(id, keyWord) {
        let sql = "select petBreedId,name,icon,firstWord from Encyclopedia where petRaceId='" + id + "' and name like '%" + keyWord + "%'";
        return new Promise((resolve, reject) => {
            con.select(sql).then(res => {
                resolve(res);
            })
        })
    }
    petDetail(id) {
        let sql = "select * from Encyclopedia where petBreedId='" + id + "'";
        return new Promise((resolve, reject) => {
            con.select(sql).then(res => {
                resolve(res);
            })
        })
    }
}


module.exports = Encyclopedia;