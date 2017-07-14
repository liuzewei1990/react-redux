
/**
 * 工具集合 @param {持续更新中}
 * 
 *  ---- 使用哪个引用哪个
 */



const MOBILE_REG = /^1[3|4|5|8|7|9][0-9]\d{8}$/,
    EMAIL_REG = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
    MONEY_REG = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
    NAME_REG = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/,
    CHINESE_REG = /^[\u4e00-\u9fa5]+$/,
    BANKNO_REG = /^\d{16,19}$/,
    PWD_REG = /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/;

function isRule(regText, value) {
    if (!value || value.length == 0)
        return true

    const reg = new RegExp(regText)
    if (!reg.test(value)) {
        return false
    }
    return true
}

const tools = {
    GetUrl: function () {
        return encodeURIComponent(window.location.href);
    },
    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    randomString: function (len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },

    /**
     * 判断是否是微信浏览器
     */
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }(),
    getCookie: function (c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    setCookie: function (c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    },
    checkCookie: function () {
        var username = this.getCookie('username');
        if (username != null && username != "") {
            // alert('Welcome again '+username+'!');
            return username;
        }
        else {
            username = this.randomString(10);
            if (username != null && username != "") {
                this.setCookie('username', username, 365);
                return username;
            }
        }
    },

    /**
     * 是否禁用页面滚动
     * @param {Bool} status
     * @param {元素} node
     */
    DisableScroll: function (status, node) {
        let Node = (node && document.querySelector(node)) || '';

        if (status) {
            Node && Node.addEventListener("touchmove", stopTouchmove);
        } else {
            Node && Node.removeEventListener("touchmove", stopTouchmove);
        };
        function stopTouchmove(e) {
            e.preventDefault();
        }
    },

    /**
     * 封装事件绑定的方法
     */
    events: {
        //例：on(ele,"click",function(){})
        on: function (el, type, callback) {
            if (el.addEventListener) {
                el.addEventListener(type, callback);
            } else {
                el.attachEvent('on' + type, function () {
                    callback.call(el);
                });
            }
        },
        //例：off(ele,"click",function(){})
        off: function (el, type, callback) {
            if (el.removeEventListener) {
                el.removeEventListener(type, callback);
            } else {
                el.detachEvent('off' + type, callback);
            }
        },
        //例：once(ele,"click mouseOver mouseOut",function(){})
        once: function (el, type, callback) {
            let typeArray = type.split(' ');
            let recursiveFunction = function (e) {
                e.target.removeEventListener(e.type, recursiveFunction);
                return callback(e);
            };

            for (let i = typeArray.length - 1; i >= 0; i--) {
                this.on(el, typeArray[i], recursiveFunction);
            }
        }
    },
    /**
     * 格式化日期
     * @param {} date
     * @param {} fmt
     */
    date: function (date, fmt) {
        if (!date || !fmt) {
            return date;
        }
        if (date.length == 8) {
            date = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
        }
        date = new Date(date.toString().replace(/-/g, "/"));
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /**
     * 格式化时间
     * @param  {Number} time 时间戳
     * @param  {Number} type 格式化类型
     * @return {String}
     */
    dataTimeFormatter: function (time, type) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let second = date.getSeconds()

        switch (type) {
            case 0: // 01-05
                return `${zerofill(month)}-${zerofill(day)}`
            case 1: // 11:12
                return `${zerofill(hours)}-${zerofill(minutes)}`
            case 2: // 2015-01-05
                return `${year}-${zerofill(month)}-${zerofill(day)}`
            case 3: // 2015-01-05 11:12
                return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}`
            default: // 2015-01-05 11:12:13
                return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
        }
    },
    /**
     * 日期转换周几
     * @param {日期} date
     */
    getConvertWeek: function (date) {
        if (!date) {
            return '';
        }
        var day = new Date(date); //将日期值格式化
        var week = ["日", "一", "二", "三", "四", "五", "六"];
        var result = "周" + week[day.getDay()];
        return result;
    },
    /**
     * 时间转换工具
     * @param {时间戳}
     * @param {"1个小时前"}
     */
    timeToString: function (hisTime) {
        var now = new Date().getTime(),
            diffValue = now - hisTime,
            result = '',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,
            _year = diffValue / year,
            _month = diffValue / month,
            _week = diffValue / (7 * day),
            _day = diffValue / day,
            _hour = diffValue / hour,
            _min = diffValue / minute;
        if (_year >= 1) result = parseInt(_year) + "年前";
        else if (_month >= 1) result = parseInt(_month) + "个月前";
        else if (_week >= 1) result = parseInt(_week) + "周前";
        else if (_day >= 1) result = parseInt(_day) + "天前";
        else if (_hour >= 1) result = parseInt(_hour) + "个小时前";
        else if (_min >= 1) result = parseInt(_min) + "分钟前";
        else result = "刚刚";
        return result;
    },
    /**
     * 检测身份证有效性 格式化身份证为出生日期 性别
     * @param {身份证号码} card
     * @return {birthday: "1989-08-05", sex: "M"}
     * @return false
     */
    isIdCard: function (card) {
        if (!card) return true;
        var num = card.toUpperCase();
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
            return false;
        }
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        //下面分别分析出生日期和校验位
        var len, re;
        var birthday, sex;
        len = num.length;
        if (len == 15) {

            //获取出生日期 
            birthday = '19' + card.substring(6, 8) + "-" + card.substring(8, 10) + "-" + card.substring(10, 12);
            //获取性别
            sex = parseInt(card.substr(14, 1)) % 2 == 1 ? 'M' : 'F';

            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = num.match(re);

            //检查生日日期是否正确
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            } else {
                //将15位身份证转成18位
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0,
                    i;

                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];
            }
        } else if (len == 18) {

            //获取出生日期 
            birthday = card.substring(6, 10) + "-" + card.substring(10, 12) + "-" + card.substring(12, 14);
            //获取性别
            sex = parseInt(card.substr(16, 1)) % 2 == 1 ? 'M' : 'F';

            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = num.match(re);

            //检查生日日期是否正确
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            } else {
                //检验18位身份证的校验码是否正确。
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0,
                    i;
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != num.substr(17, 1)) {
                    return false;
                }
            }
        }
        return {
            birthday: birthday,
            sex: sex
        }
    },
    /**
     * 根据身份证获取出生年月
     * @param {身份证号码} idCard
     * @return "1989-08-05"
     */
    getBirthdayByIdCard: function (idCard) {
        if (!this.isIdCard(idCard)) {
            return;
        }
        let tmpStr;
        if (idCard.length == 15) {
            tmpStr = idCard.substring(6, 12);
            tmpStr = "19" + tmpStr;
            tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
            return tmpStr;
        } else {
            tmpStr = idCard.substring(6, 14);
            tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
            return tmpStr;
        }
    },
    /**
     * 根据身份证获取性别
     * @param {身份证号码} idCard
     * @return 1 || 0
     */
    getSexByIdCard: function (idCard) {
        if (!this.isIdCard(idCard)) {
            return;
        }
        return (parseInt(idCard.substr(16, 1)) % 2)
    },
    /**
     * 加载JS文件
     * @param {src} src
     * @param {回调函数} callback
     */
    loadJS: function (src, callback) {
        let script = document.createElement('script');
        let head = document.getElementsByTagName('head')[0];
        let loaded;

        script.src = src;

        if (typeof callback === 'function') {
            script.onload = script.onreadystatechange = function () {
                if (!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
                    script.onload = script.onreadystatechange = null;
                    loaded = true;
                    callback();
                }
            }
        }

        head.appendChild(script);
    },
    /**
     * MD5加密
     * @param {加密字串}
     */
    md5: function (str) {
        //先加载crypto模块，创建md5哈希算法，指定要加密的字符串，再进行摘要按16进制输出 sha1
        return require('crypto').createHash('md5').update(str).digest('hex')
    },
    /**
     * 检测是否是JSON对象
     * @param {json对象} obj
     * @return {Bool}
     */
    isJSON: function (obj) {
        return typeof (obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
    },
    /**
     * 检测是否是Functioin
     * @param {Functioin} value
     * @return {Bool}
     */
    isFunction: function (value) {
        return ({}).toString.call(value) === "[object Function]";
    },
    /**
     * 检测是否是Array
     * @param {Array} value
     * @return {Bool}
     */
    isArray: function (value) {
        return value instanceof Array;
    },
    isFromWeixin: () => {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    isMobile: (mobile) => {
        return isRule(MOBILE_REG, mobile)
    },

    isEmail: (email) => {
        return isRule(EMAIL_REG, email)
    },

    isMoney: (money) => {
        return isRule(MONEY_REG, money)
    },

    isUsername: (name) => {
        return isRule(NAME_REG, name)
    },
    isChinese: (name) => {
        return isRule(CHINESE_REG, name)
    },
    isBankNo: (name) => {
        return isRule(BANKNO_REG, name)
    },

    isNotEmpty: (data) => {
        return data && (data.length > 0)
    },

    isPwd: (pwd) => {
        return isRule(PWD_REG, pwd)
    },
    /**
     * 获取 url 的 fragment（即 hash 中去掉 # 的剩余部分）
     *
     * 如果没有则返回空字符串
     * 如: http://example.com/path/?query=d#123 => 123
     *
     * @param {String} url url
     * @returns {String}
     */
    getUrlFragment: function (url) {
        var hashIndex = url.indexOf('#');
        return hashIndex === -1 ? '' : url.slice(hashIndex + 1);
    },
    /**
     * 获取一个链接相对于当前页面的绝对地址形式
     *
     * 假设当前页面是 http://a.com/b/c
     * 那么有以下情况:
     * d => http://a.com/b/d
     * /e => http://a.com/e
     * #1 => http://a.com/b/c#1
     * http://b.com/f => http://b.com/f
     *
     * @param {String} url url
     * @returns {String}
     */
    getAbsoluteUrl: function (url) {
        var link = document.createElement('a');
        link.setAttribute('href', url);
        var absoluteUrl = link.href;
        link = null;
        return absoluteUrl;
    },
    /**
     * 获取一个 url 的基本部分，即不包括 hash
     *
     * @param {String} url url
     * @returns {String}
     */
    getBaseUrl: function (url) {
        var hashIndex = url.indexOf('#');
        return hashIndex === -1 ? url.slice(0) : url.slice(0, hashIndex);
    },
    /**
     * 把一个字符串的 url 转为一个可获取其 base 和 fragment 等的对象
     *
     * @param {String} url url
     * @returns {UrlObject}
     */
    toUrlObject: function (url) {
        var fullUrl = this.getAbsoluteUrl(url),
            baseUrl = this.getBaseUrl(fullUrl),
            fragment = this.getUrlFragment(url);

        return {
            base: baseUrl,
            full: fullUrl,
            original: url,
            fragment: fragment
        };
    },
    /**
     * 判断浏览器是否支持 sessionStorage，支持返回 true，否则返回 false
     * @returns {Boolean}
     */
    supportStorage: function () {
        var mod = 'sm.router.storage.ability';
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    }
};



/**
* 检测是否为IOS
* @param {标题} title
*/
export function isIos() {
    let userAgent = navigator.userAgent;
    let IsiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return IsiOS;
}


/**
* 解决IOS在微信内不更新title的bug
* @param {标题} title
*/
export function setWeChatTitle(title) {
    window.document.title = title;
    if (isIos()) {
        var frame = document.createElement('iframe');
        frame.src = '//m.baidu.com/favicon.ico';
        frame.style.display = 'none';
        document.body.appendChild(frame);
        frame.onload = () => {
            setTimeout(() => {
                frame.remove();
            }, 10);
        };
    };
}