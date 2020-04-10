// 精选文章
const Connection = require('../../connection/index')

const con = new Connection();

class Article{
    constructor(){

    }
    // 获取文章列表
    getArticleList(index,size){
        let p1 = new Promise((resolve, reject) => {
            let start = (index - 1) * size;
            let sql = "select * from article ORDER BY createDate DESC limit " + start + "," + size + "";
            con.select(sql).then(res => {
                resolve(res); 
            })
        })
        let p2 = new Promise((resolve, reject) => {
            let sql = "select count(*) as total from article";
            con.select(sql).then(res => {
                resolve(res);
            })
        })
        return Promise.all([p1, p2]);
    }
}

module.exports = Article;