/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-01-13 17:04:54 
 * @LastEditors: TanXinFeng
 * @LastEditTime: 2020-03-10 13:32:31  
 */   
const Koa = require('koa')      
const Router = require('koa-router')     
const router = new Router();    
const bodyParser = require('koa-bodyparser')  
const app = new Koa();
const koajwt = require('koa-jwt')   
const static = require('koa-static')   
const path = require('path')

const router_login = require('../router/login/login');
const router_petbnb = require('../router/petbnb/petbnb');
const router_user = require('../router/user/user');
const router_upload = require('../public/uploadFile');
const router_community = require('../router/communication/communication') 


  
  
  
   
// 错误处理           
app.use((ctx, next) => { 
  return next().catch((err) => {
    if (err.status === 401) {  
      ctx.status = 401; 
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {  
      throw err;     
    }  
  })  
})  
  
app.use(static(path.join(path.dirname(__dirname), './static')))  
  
   
app.use(koajwt({ 
  secret: 'my_token' 
}).unless({
  path: [/\/API\/Login\/login/, /\/API\/Login\/register/, /\/API\/Login\/captcha/, /\/API\/Login\/setPassword/, /\/image/]
})); 


app.use(bodyParser())  

app.use(router_login.routes());   //导入登录注册模块路由 
app.use(router_petbnb.routes());   //导入养宠模块路由  
app.use(router_user.routes());   //导入个人中心模块路由  
app.use(router_upload.routes()); //导入上传图片模块路由 
app.use(router_community.routes()); //导入社区模块路由 
    
 
app.use(router.routes()).listen(3000, () => {
  console.log('3000端口已开启');
})   