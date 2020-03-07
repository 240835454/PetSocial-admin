/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-02-20 12:17:59
 * @LastEditors: TanXinFeng
 * @LastEditTime: 2020-03-07 13:21:20
 */
const axios = require('axios');
const Connection = require('../connection/index')
const con = new Connection();


class Community {
    constructor() {

    }
    getOpenId(code) {
        return new Promise((resolve, reject) => {
            let js_code = code;
            axios.get("https://api.weixin.qq.com/sns/jscode2session?appid=wxc6a48542bbeceaad&secret=da4c72f480d3ac89b81fbe08270a772e&js_code=" + js_code + "&grant_type=authorization_code")
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
    // 修改社区 用户背景图片 
    changeBgImage(path, account) {
        return new Promise((resolve, reject) => {
            let sql = "update User set bgImage=? where phoneNumber=" + account;
            let params = [path];
            con.update(sql, params).then(res => {
                resolve(res);
            })
        })
    }
    // 发布动态
    postDynamic(account, avatar, name, content, timestamp) {
        return new Promise((resolve, reject) => {
            let sql = "insert into dynamic(uid,avatar,name,content,timestamp,islike,likeList,comments) value (?)";
            let params = [account, avatar, name, content, timestamp, "0", '[]', '{"content":[]}']
            con.insert(sql, [params]).then(res => {
                resolve(res);
            })
        })
    }

    // 获取社区动态列表
    getDynamicList(index, pageSize) {
        let p1 = new Promise((resolve, reject) => {
            let start = (index - 1) * pageSize;
            let sql = "select * from dynamic ORDER BY timestamp DESC limit " + start + "," + pageSize + "";
            // let sql = "select * from dynamic ORDER BY timestamp DESC limit 0,10";
            // let sql = "select * from dynamic ORDER BY 'id' DESC";
            // let sql = "select * from comments"; 
            con.select(sql).then(res => {
                // console.log(res);  
                resolve(res);
            })
        })
        let p2 = new Promise((resolve, reject) => {
            let sql = "select count(*) as total from dynamic";
            con.select(sql).then(res => {
                resolve(res);
            })
        })
        return Promise.all([p1, p2]);
    }

    // 点赞
    isLike(post_id, uid, avatar, name, post_uid, post_avatar, post_name, post_content, timestamp) {
        return new Promise((resolve, reject) => {
            let sql = "insert into likes(post_id,uid,avatar,name,post_uid,post_avatar,post_name,post_content,timestamp) value (?)";
            // let sql = "update User set avatar =? where phoneNumber="+account;
            let params = [post_id, uid, avatar, name, post_uid, post_avatar, post_name, post_content, timestamp];
            con.update(sql, [params]).then(res => {
                resolve(res);
<<<<<<< HEAD
            })
        }) 
=======
            }) 
        })
>>>>>>> 2aa73720bed9a28df7c76ba2f135257b2745e155
    }

    // 评论
    comments(post_id, uid, avatar, name, content, timestamp, to_uid, to_name, to_avatar) {
        return new Promise((resolve, reject) => {
            let sql = "insert into comment(post_id,uid,avatar,name,content,timestamp,to_uid,to_name,to_avatar) value (?)";
            let params = [post_id, uid, avatar, name, content, timestamp, to_uid, to_name, to_avatar];
            con.update(sql, [params]).then(res => {
                resolve(res);
            })
        })
    }

    // 获取评论列表
    getCommentsList(post_id) {
        return new Promise((resolve, reject) => {
            let sql = "select uid,avatar,name,content,to_name,to_avatar,to_uid from comment where post_id=" + post_id;
            con.select(sql).then(res => {
                resolve(res);
            })
        })
    }

    // 获取点赞列表
    getLikeList(post_id) {
        return new Promise((resolve, reject) => {
            let sql = "select like_id,uid,avatar,name from likes where post_id=" + post_id;
            con.select(sql).then(res => {
                resolve(res);
            })
        })
    }

    // 取消点赞
    unLike(like_id) {
        return new Promise((resolve, reject) => {
            let sql = "delete from likes where like_id =" + like_id;
            con.delete(sql).then(res => {
                resolve(res);
            })
        })
    }

    // 获取用户详情
    getUserDetail(uid) {
        return new Promise((resolve, reject) => {
            let sql = "select * from user where phoneNumber=" + uid;
            con.select(sql).then(res => {
                resolve(res);
            })
        })
    }

    // 获取用户动态列表
    getUserDynamic(uid) {
        return new Promise((resolve, reject) => {
            let sql = "select * from dynamic where uid=" + uid; 
            con.select(sql).then(res => {
                resolve(res);
            })
        })
    }
}




module.exports = Community; 