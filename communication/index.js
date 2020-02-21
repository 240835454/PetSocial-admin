/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-02-20 12:17:59
 * @LastEditors  : TanXinFeng
 * @LastEditTime : 2020-02-20 17:21:31
 */
const axios = require('axios');
const Connection = require('../connection/index')
const con = new Connection();


class Community{
    constructor(){

    }
    getOpenId(code){
        return new Promise((resolve,reject)=>{
            let js_code = code;
            axios.get("https://api.weixin.qq.com/sns/jscode2session?appid=wxc6a48542bbeceaad&secret=da4c72f480d3ac89b81fbe08270a772e&js_code="+ js_code +"&grant_type=authorization_code")
            .then(res=>{
                resolve(res);
            })
            .catch(err=>{
                reject(err); 
            })
        })
    } 
    // 修改社区 用户背景图片 
    changeBgImage(path,account){
        return new Promise((resolve,reject) => {
            let sql = "update User set bgImage=? where phoneNumber="+account;
            let params =[path];
            con.update(sql,params).then(res=>{ 
                resolve(res);
            }) 
        })
    }
    // 发布动态
    postDynamic(account,avatar,name,content,timestamp){
        return new Promise((resolve,reject) => {
            let sql = "insert into comments(uid,avatar,name,content,timestamp,islike,likeList,comments) value (?)";
            let params = [account,avatar,name,content,timestamp,"0",'[]','{"content":[]}']
            con.insert(sql,[params]).then(res => {
                resolve(res);
            }) 
        })
    }
 
    // 获取社区动态列表
    getDynamicList(index,pageSize){  
        let p1 = new Promise((resolve,reject) => {
            let start = (index-1)*pageSize; 
            // let sql = "select * from comments ORDER BY 'id' DESC limit "+ start +","+pageSize+"";
            let sql = "select * from comments ORDER BY 'id' DESC";
            // let sql = "select * from comments"; 
            con.select(sql).then(res => {
                // console.log(res);
                resolve(res);  
            }) 
        })
        let p2 = new Promise((resolve,reject) => {
            let sql = "select count(*) as total from comments";
            con.select(sql).then(res => {
                resolve(res);
            })
        })
        return Promise.all([p1,p2]);
    }

    // 点赞
    isLike(post_id,likeList){
        return new Promise((resolve,reject) => {
            let sql = "update Comments set likeList =? where post_id="+post_id;
            // let sql = "update User set avatar =? where phoneNumber="+account;
            let params = [likeList]; 
            con.update(sql,params).then(res => {
                resolve(res); 
            })
        })
    }

    // 评论
    comments(post_id,comments){
        return new Promise((resolve,reject) => {
            let sql = "update Comments set comments =? where post_id="+post_id;
            let params = [comments];
            con.update(sql,params).then(res => {
                resolve(res);
            })
        })
    }
}
 
module.exports = Community;