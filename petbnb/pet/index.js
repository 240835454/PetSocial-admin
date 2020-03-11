// 添加宠物头像
const mysql = require('mysql');
const Connection = require('../../connection/index')

const con = new Connection();

class Pet {
    constructor() {

    }
    addPet(uid,name,gender,birthDay,avatar,breed,state) {
        return new Promise((resolve, reject) => {
            let sql = "insert into pet(uid,name,gender,birthDay,avatar,breed,state) values (?)";
            let params = [uid,name,gender,birthDay,avatar,breed,state];
            con.insert(sql, [params]).then(res=>{
                resolve(res);
            })
        })
    }
    getPetList(uid){
        return new Promise((resolve,reject) => {
            let sql = "select * from pet where uid ="+uid;
            con.select(sql).then(res => {
                resolve(res); 
            })
        })
    }
}


module.exports = Pet;