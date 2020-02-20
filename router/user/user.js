const Router = require('koa-router')
const router = new Router();

const User = require('../../user/index') 
const user = new User();  // 用户类

const Verify = require('../../public/verify')
const verify = new Verify(); // 解析token 


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

  // 修改用户个人资料
  const changeUserInfo = async ctx => {
    let token = ctx.header.authorization;
    let account = verify.decode(token);
    let {name,gender,region} = ctx.request.body;
    await user.changeUserInfo(name,gender,region,account).then(res=>{ 
        ctx.body = {
          code: 1, 
          data: {
            ...res
          },
          message: '修改成功！' 
        }
      })
  }

  // 修改用户头像
  const changeAvatar = async ctx => {
    let token = ctx.header.authorization;
    let account = verify.decode(token);
    let {path} = ctx.request.body;
    await user.changeAvatar(path,account).then(res=>{
      ctx.body = {
        code: 1,
        data: {

        },
        message: '修改成功！'
      }
    })
  }

router.get('/API/User/userInfo',getUserInfo)
router.post('/API/User/changeUserInfo',changeUserInfo)
router.put('/API/User/changeAvatar',changeAvatar)
 
module.exports = router;
