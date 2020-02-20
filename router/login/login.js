const Router = require('koa-router')
const router = new Router();
const bodyParser = require('koa-bodyparser')

const Login = require('../../login/index')
const login = new Login(); // 登录类

const jwt = require('jsonwebtoken')  



// 获取验证码
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
                expiresIn: '4h'
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
                expiresIn: '4h'
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
                expiresIn: '4h'
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
 

router.get('/API/Login/captcha', captcha)
router.post('/API/Login/register', register)
router.post('/API/Login/login', getLogin) 
router.post('/API/Login/setPassword', setPassword)


module.exports = router;