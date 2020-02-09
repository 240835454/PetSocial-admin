const Connection = require('../connection/index')
const con = new Connection();

class User{
    constructor(){
 
    }
    getUserInfo(account){
        return new Promise((resolve,reject) => {
            let sql = "select * from User where phoneNumber ="+account;
            con.select(sql).then(res=>{  
                resolve(res[0]);
            })
        })
    }
}

module.exports = User;