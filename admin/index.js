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
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const jwt = require('jsonwebtoken') 
const koajwt = require('koa-jwt')


const Verify = require('../public/verify')
const encyclopedia = require('../petbnb/encyclopedia/petTypeList')
const Token = require('../communication/token/index')
const Login = require('../login/index')
const User = require('../user/index') 

const enc = new encyclopedia(); // 宠物百科
const token = new Token(); // 获取openId
const login = new Login(); // 登录类
const user = new User();  // 用户类
const verify = new Verify(); // 解析token 






// 获取手机验证码  
const captcha = async ctx => {
  await login.getCaptcha(ctx.request.query.account, ctx.request.query.type).then(res => {
    if (res.code === 0) {
      ctx.body = {
        code: 1,
        data: {
 
        },
        message: ''
      }
    } else {
      ctx.body = {
        code: -1,
        data: {

        },
        message: res.data
      }
    }
  })
}

// 注册获取token 
const register = async ctx => {
  let {
    account,
    msgCaptcha
  } = ctx.request.body
  await login.register(account, msgCaptcha).then(res => {
      const token = jwt.sign({
        account: res
      }, 'my_token', {
        expiresIn: '2h'
      });
      ctx.body = { 
        code: 1,
        data: {
          token: token
        },
        message: '注册成功!'
      }
    })
    .catch(err => {
      console.log(err);
      ctx.body = err;
    })
}

// 设置密码 
const setPassword = async ctx => {
  let {
    password,
    confirmPassword
  } = ctx.request.body;
  await login.setPassword(password, confirmPassword).then(res => {
      const token = jwt.sign({
        account: res
      }, 'my_token', {
        expiresIn: '2h'
      });
      ctx.body = {
        code: 1,
        data: {
          token: token
        },
        message: '登录成功!'
      }
    })
    .catch(err => {
      console.log(err);
      ctx.body = err;
    })
}

// 登录
const getLogin = async ctx => {
  let {
    account, 
    password,
    msgCaptcha
  } = ctx.request.body;
  await login.login(account, password, msgCaptcha).then(res => {
      const token = jwt.sign({
        account: res
      }, 'my_token', { 
        expiresIn: '2h' 
      }); 
      ctx.body = {  
        code: 1, 
        data: { 
          token: token
        },
        message: '登录成功!' 
      }
    })
    .catch(err => {
      console.log(err);
      ctx.body = err;
    })
}


// 获取openId 
const openId = async ctx => {
  await token.getOpenId(ctx.request.query.code).then(res => {
    console.log(res.data.openid)
    ctx.body = {
      code: 1,
      data: { 

      },
      message: ''
    }
  })
}


// 获取品种百科列表
const petTypeList = async ctx => {
  await enc.petTypeList(ctx.request.query.petRaceId, ctx.request.query.keyWord).then(res => {
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


// 获取品种百科详情  
const petDetail = async ctx => {
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

// 获取用户基本信息 
const getUserInfo = async ctx => {
  let token = ctx.header.authorization;
  let account = verify.decode(token);
  await user.getUserInfo(account).then(res=>{ 
    ctx.body = {
      code: 1, 
      data: {
        ...res
      },
      message: '' 
    }
  })
}


router.get('/API/Login/captcha', captcha)
router.post('/API/Login/register', register)
router.post('/API/Login/login', getLogin)
router.post('/API/Login/setPassword', setPassword)
router.get('/API/token', openId)
router.get('/API/petbnb/encyclopedia/petTypeList', petTypeList)
router.get('/API/petbnb/encyclopedia/petDetail', petDetail)
router.get('/API/User/userInfo',getUserInfo)



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

app.use(koajwt({
  secret: 'my_token'
}).unless({
  path: [/\/API\/Login\/login/, /\/API\/Login\/register/, /\/API\/Login\/captcha/,/\/API\/Login\/setPassword/]
}));


app.use(bodyParser())

app.use(router.routes()).listen(3000, () => {
  console.log('3000端口已开启');
})