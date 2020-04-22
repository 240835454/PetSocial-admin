const axios = require('axios');
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    })

    const page = await browser.newPage();
    // await page.goto('https://www.ixiupet.com/zixun', { 
    //     // waitUntil: 'networkidle2' //网络空闲说明已加载完毕
    //     'timeout': 0
    // }); 

    console.log('前往目标网页');
    console.log('当前页码:1');

    let dataList = fs.readFileSync('./test.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
    })

    let contentList = [];
    for (let i = 0; i < 60; i++) {
        let urlList = JSON.parse(dataList);
        await page.goto(urlList.imgList[i].url,{
            'timeout': 0
        });
        let currentContentList = await page.$$eval('.article-content', item => {
            let list = [];
            for (let i = 0; i < item.length; i++) {
                list.push({
                    content: item[i].innerHTML
                })
            }
            return list;
        })

        contentList = await contentList.concat(currentContentList);
    }


    console.log('结束')

    let data = JSON.stringify(contentList);


    await fs.writeFile('./content.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log('写入成功');
    })
    await browser.close();
})();