const Router = require('koa-router')
const router = new Router();

const encyclopedia = require('../../petbnb/encyclopedia/petTypeList')
const enc = new encyclopedia(); // 宠物百科


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


  router.get('/API/petbnb/encyclopedia/petTypeList', petTypeList)
  router.get('/API/petbnb/encyclopedia/petDetail', petDetail)

  module.exports = router;