/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-02-20 12:17:59
 * @LastEditors: TanXinFeng
 * @LastEditTime: 2020-02-26 14:39:54
 */
const Router = require('koa-router')
const router = new Router();

const User = require('../../user/index')
const user = new User();  // 用户类

const Verify = require('../../public/verify')
const verify = new Verify(); // 解析token 

const Community = require('../../communication/index')
const community = new Community(); // 用户类

const FormatTime = require('../../public/formatTime');
const formatTime = new FormatTime(); 


// 获取用户基本信息 
const getUserInfo = async ctx => {
  let token = ctx.header.authorization;
  let account = verify.decode(token);
  await user.getUserInfo(account).then(res => {
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
  let { name, gender, region } = ctx.request.body;
  await user.changeUserInfo(name, gender, region, account).then(res => {
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
  let { path } = ctx.request.body;
  await user.changeAvatar(path, account).then(res => {
    ctx.body = {
      code: 1,
      data: {

      },
      message: '修改成功！'
    }
  })
}

// 获取我的相册
const myAlbum = async ctx => {
  let token = ctx.header.authorization;
  let account = verify.decode(token);
  await user.myAlbum(account).then(async res => {
    res = res.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    })
    for (const i of res) { 
      i.content = JSON.parse(i.content)
      // i.timestamp = formatTime.timeAgo(i.timestamp)
      i.timestamp = formatTime.getDate('yyyy-mm-dd',i.timestamp) 
      i.likeList = await community.getLikeList(i.post_id);
      i.comments = await community.getCommentsList(i.post_id);
    }
    ctx.body = {
      code: 1,
      data: {
        list: [
          ...res
        ]
      },
      message: ''
    }
  })
}

// 获取我的点赞
const myCollection = async ctx=> {
  let token = ctx.header.authorization;
  let account = verify.decode(token);
  await user.myCollection(account).then(res=>{
    ctx.body = {
      code: 1,
      data: {
        list: [
          ...res 
        ]
      } 
    }
  })
}

router.get('/API/User/userInfo', getUserInfo)
router.post('/API/User/changeUserInfo', changeUserInfo)
router.put('/API/User/changeAvatar', changeAvatar)
router.get('/API/User/myAlbum', myAlbum)
router.get('/API/User/myCollection', myCollection)


module.exports = router;
