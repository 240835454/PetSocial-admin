/*
 * @Description: 
 * @Version: 2.0
 * @Author: TanXinFeng
 * @Date: 2020-01-09 14:20:36
 * @LastEditors  : TanXinFeng
 * @LastEditTime : 2020-01-10 16:32:22
 */
const puppeteer = require('puppeteer');
const {
  screenshot
} = require('../public/default');
const fs = require('fs');



// const Test = function (){
//     return 3;
// }

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  })

  const page = await browser.newPage();
  await page.goto('http://www.yc.cn/pet/qita', {
    waitUntil: 'networkidle2' //网络空闲说明已加载完毕
  });

  console.log('前往目标网页');

  //   const imgList = await page.$$('.s-rs-ul li a .pic');


  //   for(let item of imgList){
  //       try{
  //           console.log(await ( await item.getProperty('src')).jsonValue());
  //       }catch(e){
  //           console.log(e.message)
  //       }

  //   }

  console.log('当前页码:1');


  let imgList = await page.$$eval('img[class=pic]', item => {
    let list = [];
    for (let i = 0; i < item.length; i++) {
      list.push(item[i].src)
    }
    return list;
  })

  let nameList = await page.$$eval('.info-t', item => {
    let list = [];
    for (let i = 0; i < item.length; i++) {
      list.push(item[i].innerText)
    }
    return list;
  })

  console.log(imgList);
  console.log(nameList);

  await page.waitFor(5000);



  // 点击下一页
  for (let i = 2; i < 3; i++) {
    // console.log('点击下一页')
    console.log('当前页码:' + i);
    await page.click("[data-page='" + i + "']");
    // await page.click("[class=laypage_last]");


    await page.waitFor(5000);

    let currentNameList = await page.$$eval('.info-t', item => {
      let list = [];
      for (let i = 0; i < item.length; i++) {
        list.push(item[i].innerText)
      }
      return list;
    })

    let currentImgList = await page.$$eval('img[class=pic]', item => {
      let list = [];
      for (let i = 0; i < item.length; i++) {
        list.push(item[i].src)
      }
      return list;
    })
    // console.log(currentNameList);
    //   console.log(imgList);
    nameList = await nameList.concat(currentNameList);
    imgList = await imgList.concat(currentImgList);
    console.log(nameList);
    console.log(imgList);

    // await page.waitFor(5000);
  }



  //   const nextPage = await page.$$('.laypage_curr')
  //       for(let item of nextPage){
  //         try{
  //             console.log(await ( await item.getProperty('innerText')).jsonValue());
  //         }catch(e){
  //             console.log(e.message)
  //         }
  //     }


  // console.log(nameList);
  //   console.log(nameList);
  //   console.log(nextPage);



  //   await page.click('.laypage_main a')

  //   const imgList2 = await page.$$eval('img[class=pic]', item => {
  //     let list = [];
  //     for (let i = 0; i < item.length; i++) {
  //       list.push(item[i].src)
  //     }
  //     return list;
  //   })

  //   const nameList2 = await page.$$eval('.info-t', item => {
  //     let list = [];
  //     for (let i = 0; i < item.length; i++) {
  //       list.push(item[i].innerText)
  //     }
  //     return list;
  //   })



  //   console.log(imgList2);
  //   console.log(nameList2);

  let dataList = {};
  dataList.nameList = nameList;
  dataList.imgList = imgList;

  let data = JSON.stringify(dataList);


  // 狗
  // await fs.writeFile('./dog.json',data,(err)=>{
  //   if(err){
  //     throw err;
  //   }
  //   console.log('写入成功');
  // })

  // 猫
  // await fs.writeFile('./cat.json',data,(err)=>{
  //   if(err){
  //     throw err;
  //   }
  //   console.log('写入成功');
  // })

  // 兔子
  // await fs.writeFile('./rabbit.json',data,(err)=>{
  //   if(err){
  //     throw err;
  //   }
  //   console.log('写入成功');
  // })

  // 鼠
  await fs.writeFile('./qita.json',data,(err)=>{
    if(err){
      throw err;
    }
    console.log('写入成功');
  })

  // await fs.appendFile('./dog.json',data,(err)=>{
  //   if(err){
  //     throw err;
  //   }
  //   console.log('追加写入成功');
  // })

  await browser.close();
})();
