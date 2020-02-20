const jwt = require('jsonwebtoken')

class Decode{
    constructor(){

    }
    decode(token){
        if(token){
            return jwt.verify(token.split(" ")[1],'my_token').account;
        }
    }
}

module.exports = Decode;