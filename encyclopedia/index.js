/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-01-07 09:31:40
 * @LastEditors  : TanXinFeng
 * @LastEditTime : 2020-01-17 14:04:39
 */
const axios = require('axios');
const fs = require('fs');
// const cheerio = require('cheerio');
// const puppeteer = require('puppeteer');

// (async ()=>{
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.baidu.com');
//     await page.screenshot({
//         path: ''
//     })
// })();

// 获取 狗狗详情列表
function getDogInfo(){
    return new Promise((resolve,reject)=>{
        axios.get('http://www.yc.cn/api/searchPetData.do?petRaceId=1&pageNum=1&pageSize=251&keyword=&baseInfo=&detailInfo=&')
        .then(res=>{ 
            resolve(eval(res.data));
        })
        .catch(err=>{
            reject(err);
        })
    })
};

// 获取 猫猫详情列表
function getCatInfo(){
    return new Promise((resolve,reject)=>{
        axios.get('http://www.yc.cn/api/searchPetData.do?petRaceId=2&pageNum=1&pageSize=109&keyword=&baseInfo=&detailInfo=')
        .then(res=>{
            resolve(eval(res.data));
        })
        .catch(err=>{
            reject(err);
        })
    })
};

// 获取 兔子详情列表
function getRabbitInfo(){
    return new Promise((resolve,reject)=>{
        axios.get('http://www.yc.cn/api/searchPetData.do?petRaceId=3&pageNum=1&pageSize=55&keyword=&baseInfo=&detailInfo=')
        .then(res=>{
            resolve(eval(res.data));
        })
        .catch(err=>{
            reject(err);
        })
    })
};

// 获取 鼠类详情列表
function getMouseInfo(){
    return new Promise((resolve,reject)=>{
        axios.get('http://www.yc.cn/api/searchPetData.do?petRaceId=4&pageNum=1&pageSize=49&keyword=&baseInfo=&detailInfo=')
        .then(res=>{
            resolve(eval(res.data));
        })
        .catch(err=>{
            reject(err);
        })
    })
};

// 获取 宠物鸟列表
function getChongwuniaoInfo(){
    return new Promise((resolve,reject)=>{
        axios.get('http://www.yc.cn/api/searchPetData.do?petRaceId=6&pageNum=1&pageSize=16&keyword=&baseInfo=&detailInfo=')
        .then(res=>{
            resolve(eval(res.data));
        })
        .catch(err=>{
            reject(err);
        })
    })
};

// 获取 宠物龟列表
function getChongwuguiInfo(){
    return new Promise((resolve,reject)=>{
        axios.get('http://www.yc.cn/api/searchPetData.do?petRaceId=7&pageNum=1&pageSize=33&keyword=&baseInfo=&detailInfo=')
        .then(res=>{
            resolve(eval(res.data));
        })
        .catch(err=>{
            reject(err);
        })
    })
};

// 获取 宠物鱼列表
function getChongwuyuInfo(){
    return new Promise((resolve,reject)=>{
        axios.get('http://www.yc.cn/api/searchPetData.do?petRaceId=8&pageNum=1&pageSize=30&keyword=&baseInfo=&detailInfo=')
        .then(res=>{
            resolve(eval(res.data));
        })
        .catch(err=>{
            reject(err);
        })
    })
};

// 获取 其他列表
function getQitaInfo(){
    return new Promise((resolve,reject)=>{
        axios.get('http://www.yc.cn/api/searchPetData.do?petRaceId=5&pageNum=1&pageSize=15&keyword=&baseInfo=&detailInfo=')
        .then(res=>{
            resolve(eval(res.data));
        })
        .catch(err=>{
            reject(err);
        })
    })
};



// getDogInfo().then(res=>{
//     fs.writeFileSync('./dogInfo.json',JSON.stringify(res),(err)=>{
//         if(err){
//             throw err;
//         }
//         console.log('写入成功');
//     })
// })

// getCatInfo().then(res=>{
//     fs.writeFileSync('./catInfo.json',JSON.stringify(res),(err)=>{
//         if(err){
//             throw err;
//         }
//         console.log('写入成功');
//     })
// })

// getRabbitInfo().then(res=>{
//     fs.writeFileSync('./rabbitInfo.json',JSON.stringify(res),(err)=>{
//         if(err){
//             throw err;
//         }
//         console.log('写入成功');
//     })
// })

// getMouseInfo().then(res=>{
//     fs.writeFileSync('./mouseInfo.json',JSON.stringify(res),(err)=>{
//         if(err){
//             throw err;
//         }
//         console.log('写入成功');
//     })
// })

// getChongwuniaoInfo().then(res=>{
//     fs.writeFileSync('./chongwuniaoInfo.json',JSON.stringify(res),(err)=>{
//         if(err){
//             throw err;
//         }
//         console.log('写入成功');
//     })
// })

// getChongwuguiInfo().then(res=>{
//     fs.writeFileSync('./chongwuguiInfo.json',JSON.stringify(res),(err)=>{
//         if(err){
//             throw err;
//         }
//         console.log('写入成功');
//     })
// })

// getChongwuyuInfo().then(res=>{
//     fs.writeFileSync('./chongwuyuInfo.json',JSON.stringify(res),(err)=>{
//         if(err){
//             throw err;
//         }
//         console.log('写入成功');
//     })
// })


getQitaInfo().then(res=>{
    fs.writeFileSync('./aaaInfo.json',JSON.stringify(res),(err)=>{
        if(err){
            throw err;
        }
        console.log('写入成功');
    })
})