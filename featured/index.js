const axios = require('axios');
const fs = require('fs');
const puppeteer = require('puppeteer');

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
    console.log('当前页码:1');

    let imgList = await page.$$eval('.viewimg img', item => {
        let list = [];
        for (let i = 0; i < item.length; i++) {
            list.push(item[i].src)
        }
        return list;
    })

    console.log(imgList);

    await page.waitFor(5000);

    let dataList = {};
    dataList.nameList = nameList;
    dataList.imgList = imgList;

    let data = JSON.stringify(dataList);


    await fs.writeFile('./test.json', data, (err) => {
        if (err) {
            throw err;
        } 
        console.log('写入成功');
    })
    await browser.close();
})();