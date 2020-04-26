class formatTime {
    constructor() {

    }

    //补0操作  
    getzf(num) {
        if (parseInt(num) < 10) {
            num = '0' + num;
        }
        return num;
    }

    //转换年月日方法
    getDate(format, str) {
        var oDate = new Date(parseInt(str)),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth() + 1, 
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSec = oDate.getSeconds();
        let oTime = '';
        if (format == 'yyyy-mm-dd') {
            oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSec); //最后拼接时间
        } else if (format == 'yyyyMMddHHmm') {
            // oTime = oYear +'/'+ getzf(oMonth) +'/'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
            oTime = oYear + '' + getzf(oMonth) + '' + getzf(oDay) + '' + getzf(oHour) + '' + getzf(oMin) + '' + getzf(oSec); //最后拼接时间
        }
        return oTime;
    };
    timeAgo(dateTimeStamp) { //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
        var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime(); //获取当前时间毫秒
        // console.log(now)
        var diffValue = now - dateTimeStamp; //时间差
        // console.log(diffValue);
        if (diffValue < 0) {
            return;
        }
        var minC = diffValue / minute; //计算时间差的分，时，天，周，月
        var hourC = diffValue / hour;
        var dayC = diffValue / day;
        var weekC = diffValue / week;
        var monthC = diffValue / month;
        let result = "";
        if (monthC >= 1 && monthC <= 3) {
            result = " " + parseInt(monthC) + "月前"
        } else if (weekC >= 1 && weekC <= 3) {
            result = " " + parseInt(weekC) + "周前"
        } else if (dayC >= 1 && dayC <= 6) {
            result = " " + parseInt(dayC) + "天前"
        } else if (hourC >= 1 && hourC <= 23) {
            result = " " + parseInt(hourC) + "小时前"
        } else if (minC >= 1 && minC <= 59) {
            result = " " + parseInt(minC) + "分钟前"
        } else if (diffValue >= 0 && diffValue <= minute) {
            result = "刚刚"
        } else {
            var datetime = new Date();
            datetime.setTime(dateTimeStamp);
            var Nyear = datetime.getFullYear();
            var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
            var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            result = Nyear + "-" + Nmonth + "-" + Ndate
        }
        return result;
    }
}



module.exports = formatTime;