const Router = require('koa-router')
const router = new Router();

const encyclopedia = require('../../petbnb/encyclopedia/petTypeList')
const enc = new encyclopedia(); // 宠物百科

const Pet = require('../../petbnb/pet/index')
const pet = new Pet(); // 宠物信息

const Account = require('../../petbnb/account/index')
const _account = new Account(); // 账单信息

const Verify = require('../../public/verify')
const verify = new Verify(); // 解析token 

const fs = require('fs')


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

// 添加宠物信息
const addPet = async ctx => {
  let token = ctx.header.authorization;
  let account = verify.decode(token);
  let {
    name,
    gender,
    birthDay,
    avatar,
    breed,
    state
  } = ctx.request.body;
  await pet.addPet(account, name, gender, birthDay, avatar, breed, state).then(res => {
    ctx.body = {
      code: 1,
      data: {

      },
      message: '新增成功!'
    }
  })
}

// 获取用户宠物列表
const getPetList = async ctx => {
  let token = ctx.header.authorization;
  let account = verify.decode(token);
  await pet.getPetList(account).then(res => {
    const myDate = new Date();
    for (let i of res) {
      i.day = GetNumberOfDays(i.birthDay, myDate.getTime())
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

// 获取用户账单列表
const getAccountList = async ctx=>{
  let token = ctx.header.authorization;
  let account = verify.decode(token);
  let {date} = ctx.request.query; 
  await _account.getAccountList(account,date).then(res => { 
    ctx.body = {
      code: 1,
      data: {
        list: [
          ...res[0]
        ],
        sum: res[1][0].sum
      },
      message: ''
    }
  })
}

// 添加账单
const addAccount = async ctx => {
  let token = ctx.header.authorization;
  let account = verify.decode(token);
  let { 
    color,
    name,
    icon,
    id,
    date,
    cost
  } = ctx.request.body;
  await _account.addAccount(account,color, name, icon, id, date, cost).then(res => {
    ctx.body = {
      code: 1,
      data: {

      },
      message: '新增成功!'
    }
  })
}

function GetNumberOfDays(date1, date2) { //获得天数
  //date1：开始日期，date2结束日期
  var a1 = Date.parse(new Date(date1));
  var a2 = Date.parse(new Date(date2));
  var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
  return day
};


router.get('/API/petbnb/encyclopedia/petTypeList', petTypeList)
router.get('/API/petbnb/encyclopedia/petDetail', petDetail)
router.post('/API/petbnb/addPet', addPet)
router.get('/API/petbnb/getPetList', getPetList)
router.post('/API/petbnb/addAccount', addAccount)
router.get('/API/petbnb/getAccountList', getAccountList)

module.exports = router; 