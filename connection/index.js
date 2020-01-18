const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pet_miniprogram'
})
 
// console.log('pool',connection);

connection.connect();

let sql = 'insert into test(id,name) values(0,?)';
let params = ['张三']

connection.query(sql,params,(err,result)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
})
 

connection.end();