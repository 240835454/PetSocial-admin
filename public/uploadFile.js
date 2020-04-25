/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-02-20 12:17:59
 * @LastEditors: TanXinFeng
 * @LastEditTime: 2020-02-26 14:17:46
 */
const Router = require('koa-router')
const router = new Router();
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')


// 上传图片 
const uploadFile = ctx => {
    return new Promise((resolve,reject) => { 
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        let uploadDir = path.join(__dirname, '../static/tmp');
        form.uploadDir = uploadDir;
        form.parse(ctx.req, function (err, fields, files) {
            let fileExt = files.file.name.substring(files.file.name.lastIndexOf('.'));
            let fileName = new Date().getTime() + fileExt;
            let targetDir = path.join(__dirname, '../static/image')
            let targetFile = path.join(targetDir, fileName);
            fs.rename(files.file.path, targetFile, function (err) {
                if (err) {
    
                } else {
                    let Url = '/image/' + fileName;
                    resolve({
                        name: files.file.name,
                        saveName: fileName,
                        path: Url,
                        exName: fileExt,
                        size: files.file.size,
                    });
                }
            })
        })
    }) 
}

const result = async ctx => {
    let result = await uploadFile(ctx);
        ctx.body = {
            code: 1,
            data:{
                ...result
            },
            message: ''
        }
}


router.post('/image', result)
 
module.exports = router; 