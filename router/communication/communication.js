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
    await community.getDynamicList(index,size).then(res => {
        // console.log(res);
        res = res.sort(function(a,b){ 
            return b.timestamp - a.timestamp;
        }) 
        for(let i of res){
            // console.log(i)
            i.content = JSON.parse(i.content)  
            i.timestamp = formatTime.timeAgo(i.timestamp)
            i.likeList = JSON.parse(i.likeList)
            i.comments = JSON.parse(i.comments) 
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
    let {post_id,likeList} = ctx.request.body;
    await community.isLike(post_id,likeList).then(res => { 
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
    let {post_id,comments} = ctx.request.body;
    await community.comments(post_id,comments).then(res => {
        ctx.body = {
            code: 1,
            data: {
                
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

 
module.exports = router;
