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
    await page.goto('https://www.ixiupet.com/zixun', {
        waitUntil: 'networkidle2' //网络空闲说明已加载完毕
    });

    console.log('前往目标网页');
    console.log('当前页码:1');

    let imgList = await page.$$eval('.viewimg img', item => {
        let list = [];
        for (let i = 0; i < item.length; i++) {
            list.push({
                img: item[i].src
            })
        }
        return list;
    })
    console.log(imgList);

    let titleList = await page.$$eval('.viewimg a[class=zzsz]', item => {
        let list = [];
        for (let i = 0; i < item.length; i++) {
            list.push({
                title: item[i].title,
                url: item[i].href
            })
        }
        return list;
    })

    let contentList = await page.$$eval('.listl ul li p', item => {
        let list = [];
        for (let i = 0; i < item.length; i++) {
            list.push({
                content: item[i].innerText
            })
        }
        return list;
    })

    let dateList = await page.$$eval('.listl ul li span[class=zzsj]', item => {
        let list = [];
        for (let i = 1; i < item.length; i = i + 2) {
            list.push({
                createDate: item[i].innerText
            })
        }
        return list;
    })


    await page.waitFor(5000);

    // 点击下一页
    for (let i = 2; i < 5; i++) {
        // console.log('点击下一页')
        console.log('当前页码:' + i);
        await page.click("[href='list_1_" + i + ".html']");
        // await page.click("[class=laypage_last]");


        await page.waitFor(5000);
        let currentImgList = await page.$$eval('.viewimg img', item => {
            let list = [];
            for (let i = 0; i < item.length; i++) {
                list.push({
                    img: item[i].src
                })
            }
            return list;
        })

        let currentTitleList = await page.$$eval('.viewimg a[class=zzsz]', item => {
            let list = [];
            for (let i = 0; i < item.length; i++) {
                list.push({
                    title: item[i].title,
                    url: item[i].href
                })
            }
            return list;
        })

        let currentContentList = await page.$$eval('.listl ul li p', item => {
            let list = [];
            for (let i = 0; i < item.length; i++) {
                list.push({
                    content: item[i].innerText
                })
            }
            return list;
        })

        let currentDateList = await page.$$eval('.listl ul li span[class=zzsj]', item => {
            let list = [];
            for (let i = 1; i < item.length; i = i + 2) {
                list.push({
                    createDate: item[i].innerText
                })
            }
            return list;
        })

        imgList = await imgList.concat(currentImgList);
        titleList = await titleList.concat(currentTitleList);
        contentList = await contentList.concat(currentContentList);
        dateList = await dateList.concat(currentDateList);
    }

    for (let i in imgList) {
        imgList[i].title = titleList[i].title
        imgList[i].url = titleList[i].url
        imgList[i].content = contentList[i].content
        imgList[i].createDate = dateList[i].createDate
    }

    let dataList = {};
    dataList.imgList = imgList;
    // dataList.titleList = titleList;

    let data = JSON.stringify(dataList);


    await fs.writeFile('./test.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log('写入成功');
    })
    await browser.close();
})();