const Router = require('koa-router')
const router = new Router();

const Community = require('../../communication/index')
const community = new Community(); // 用户类

const Verify = require('../../public/verify')
const verify = new Verify(); // 解析token 

const FormatTime = require('../../public/formatTime');
const formatTime = new FormatTime();


// 修改社区用户背景图片
const changeBgImage = async ctx => {
    let token = ctx.header.authorization;
    let account = verify.decode(token);
    let {
        path
    } = ctx.request.body;
    await community.changeBgImage(path, account).then(res => {
        ctx.body = {
            code: 1,
            data: {

            },
            message: '修改成功！'
        } 
    })
}

// 获取社区动态列表
const getDynamicList = async ctx => {
    let {index,size} = ctx.request.query; 
    console.log(index,size); 
    await community.getDynamicList(index,size).then(async Data => {
        let res = Data[0];  
        res = res.sort(function(a,b){    
            return b.timestamp - a.timestamp;  
        })   
        for(const i of res){ 
            i.content = JSON.parse(i.content)  
            i.timestamp = formatTime.timeAgo(i.timestamp)
            i.likeList = await community.getLikeList(i.post_id);
            i.comments = await community.getCommentsList(i.post_id); 
        }
        ctx.body = {
            code: 1,  
            data: {
                total: Data[1][0].total,
                list: [
                    ...res,
                ]
            },  
            message: ''
        }
    })
}

// 发布社区动态
const postDynamic = async ctx => {
    let token = ctx.header.authorization;
    let account = verify.decode(token);
    let {
        avatar,
        name,
        content,
        timestamp
    } = ctx.request.body;
    await community.postDynamic(account,avatar,name,content,timestamp).then(res => {
        ctx.body = {
            code: 1,
            data: {

            },
            message: '发布成功！'
        }
    })
}

// 点赞
const isLike = async ctx => {
    let token = ctx.header.authorization;
    let account = verify.decode(token);
    let {post_id,uid,avatar,name,post_uid,post_avatar,post_name,post_content,timestamp} = ctx.request.body;
    await community.isLike(post_id,uid,avatar,name,post_uid,post_avatar,post_name,post_content,timestamp).then(res => { 
        ctx.body = {
            code: 1,
            data: { 
                
            }, 
            message: ''
        }
    })
}
 
// 评论
const comments = async ctx => {
    let token = ctx.header.authorization;
    let account = verify.decode(token);
    let {post_id,uid,avatar,name,content,timestamp,to_uid,to_name,to_avatar} = ctx.request.body;
    await community.comments(post_id,uid,avatar,name,content,timestamp,to_uid,to_name,to_avatar).then(res => {
        ctx.body = {
            code: 1, 
            data: { 
                
            }, 
            message: ''
        }
    })
}

// 取消点赞
const unLike = async ctx => {
    let {like_id} = ctx.request.body;
    await community.unLike(like_id).then(res => {
        ctx.body = {
            code: 1,
            data: {

            },
            message: ''
        }
    })
}

// 获取用户详情
const getUserDetail = async ctx => {
    let {uid} = ctx.request.query;
    await community.getUserDetail(uid).then(res => {
        ctx.body = {
            code: 1,
            data: {
                ...res[0]
            },
            message: ''
        }
    })
}

// 获取用户列表
const getUserDynamic = async ctx => {
    let {uid} = ctx.request.query;
    await community.getUserDynamic(uid).then(async res => {
        for(const i of res){ 
            i.content = JSON.parse(i.content)  
            i.timestamp = formatTime.timeAgo(i.timestamp)
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
    
    
 


router.get('/API/token', openId) 

router.put('/API/User/changeBgImage',changeBgImage)
router.post('/API/Community/postDynamic',postDynamic)
router.get('/API/Community/dynamic',getDynamicList)
router.post('/API/Community/like',isLike)
router.post('/API/Community/comments',comments)
router.put('/API/Community/like',unLike) 
router.get('/API/Community/userDetail',getUserDetail)
router.get('/API/Community/userDynamic',getUserDynamic)

 
module.exports = router;
