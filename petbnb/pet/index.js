// 添加宠物头像
const mysql = require('mysql');
const Connection = require('../../connection/index')

const con = new Connection();

class Pet {
    constructor() {

    }
    addPet(uid, name, gender, birthDay, avatar, breed, state) {
        return new Promise((resolve, reject) => {
            let sql = "insert into pet(uid,name,gender,birthDay,avatar,breed,state) values (?)";
            let params = [uid, name, gender, birthDay, avatar, breed, state];
            con.insert(sql, [params]).then(res => {
                resolve(res);
            })
        }) 
    }
    getPetList(uid) {
        return new Promise((resolve, reject) => {
            let sql = "select * from pet where uid =" + uid;
            con.select(sql).then(res => {
                resolve(res);
            })
        })
    }
    getPetDetail(pid) {
        return new Promise((resolve, reject) => {
            let sql = "select * from pet where pid =" + pid;
            con.select(sql).then(res => {
                resolve(res);
            })
        })
    }
    updatePetDetail(pid, name, gender, birthDay, avatar, breed, state) {
        return new Promise((resolve, reject) => {
            let sql = `update pet set name= '${name}',gender='${gender}',birthDay='${birthDay}',avatar='${avatar}',breed='${breed}',state='${state}' where pid=${pid}`;
            con.update(sql).then(res => {
                resolve(res);
            })
        })
    }
}


module.exports = Pet;