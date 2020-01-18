/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-01-13 17:04:54
 * @LastEditors  : TanXinFeng
 * @LastEditTime : 2020-01-18 14:50:28
 */
const Koa = require('koa')
const Router = require('koa-router')
const router = new Router();
const app = new Koa();

const encyclopedia = require('../petbnb/encyclopedia/petTypeList') 
  
const enc = new encyclopedia();  // 宠物百科 

   
   
 
// function mysqlData() {
//   return new Promise((resolve, reject) => {
//     let connection = mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'root',
//       database: 'pet_miniprogram', 
//     })
//     connection.connect();
//     let sql = "select petBreedId,name,icon,firstWord from qita";
//     connection.query(sql, function (err, result) {  
//       if (err) {
//         reject(err);  
//       }
//       resolve(result);
//     })
//     connection.end();
//   }) 
// }



const petTypeList = async ctx => {
  console.log(ctx.request.query)    
  await enc.petTypeList(ctx.request.query.petRaceId).then(res => { 
    ctx.body = {
      code: 1,
      data: {
        list: [...res]
      },
      message: ''
    }
    // ctx.body = res;
  })
}

const petDetail = async ctx => {
  console.log(ctx.request.query)    
  await enc.petDetail(ctx.request.query.petBreedId).then(res => { 
    ctx.body = {
      code: 1,
      data: {
        ...res[0]
      },
      message: '' 
    }
    // ctx.body = res;
  })
} 




router.get('/api/petbnb/encyclopedia/petTypeList', petTypeList)
router.get('/api/petbnb/encyclopedia/petDetail', petDetail)




app.use(router.routes()).listen(3000, () => {
  console.log('3000端口已开启');
})
