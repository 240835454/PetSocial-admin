const axios = require('axios');

class Token{
    constructor(){

    }
    getOpenId(code){
        return new Promise((resolve,reject)=>{
            let js_code = code;
            console.log(js_code);
            axios.get("https://api.weixin.qq.com/sns/jscode2session?appid=wxc6a48542bbeceaad&secret=da4c72f480d3ac89b81fbe08270a772e&js_code="+ js_code +"&grant_type=authorization_code")
            .then(res=>{
                resolve(res);
            })
            .catch(err=>{
                reject(err); 
            })
        })
    }
    
}

module.exports = Token;