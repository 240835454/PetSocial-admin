/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-01-13 11:16:33
 * @LastEditors  : TanXinFeng
 * @LastEditTime : 2020-01-17 17:31:27
 */
const fs = require('fs');
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pet_miniprogram'
})

connection.connect();

// let data = fs.readFileSync('../encyclopedia/dogInfo.json', 'utf8', (err, data) => {
//     if (err) {
//         throw err;
//     }
// })

let data = fs.readFileSync('../featured/test.json', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
})


let detail = fs.readFileSync('../featured/content.json', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
})


// let addSql = 'insert into qita(id,attentionInfo) values(0,?)';
// let params = JSON.stringify(JSON.parse(data).list[0].attentionInfo);
let dataList = JSON.parse(data).imgList;

let detailList = JSON.parse(detail);

let info = [];

for (let i = 0; i < dataList.length; i++) {
    info.push([
        dataList[i].img,
        dataList[i].title,
        dataList[i].url,
        dataList[i].content,
        dataList[i].createDate,
        detailList[i].content
    ])
}

// for (let i = 200; i < 251; i++) {
//     info.push([
//         JSON.stringify(dataList[i].attentionInfo),
//         JSON.stringify(dataList[i].details),
//         dataList[i].woolColor,
//         dataList[i].fisrtWord,
//         JSON.stringify(dataList[i].baseData),
//         JSON.stringify(dataList[i].feedInfo),
//         dataList[i].petBreedId,
//         dataList[i].smallRace,
//         dataList[i].petRaceId,
//         JSON.stringify(dataList[i].breedInfo),
//         dataList[i].price,
//         JSON.stringify(dataList[i].baseInfo),
//         dataList[i].alisName,
//         dataList[i].showImage,
//         dataList[i].bodyType,
//         dataList[i].woolLength,
//         dataList[i].diseaseIds,
//         JSON.stringify(dataList[i].detail),
//         dataList[i].icon,
//         dataList[i].status,
//         dataList[i].name, 
//     ])
// }


let addSql = "insert into article(img,title,url,content,createDate,detail) values ?"

// let addSql = "insert into qita(attentionInfo,details,woolColor,firstWord,baseData,feedInfo,petBreedId,smallRace,petRaceId,breedInfo,price,baseInfo,alisName,showImage,bodyType,woolLength,diseaseIds,detail,icon,status,name) values ?";

connection.query(addSql, [info],function (err, result) {
    console.log('开始插入')
    if (err) {
        throw err; 
    }
    console.log('插入成功!');
})
 
// let sql = 'select * from qita';

// let result = connection.query(sql,function(err,result){
//     if(err){
//         throw err;
//     }
//     return result;
// })

// console.log(result);

connection.end();