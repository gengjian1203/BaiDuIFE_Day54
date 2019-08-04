
var Global = function() {
    // 单例对象
    this.instance = null;

    // 足球场轮廓起始位置
    var m_nStartX = 40;
    var m_nStartY = 30;
    // 足球场宽高
    var m_nWidth = 0;
    var m_nHeight = 0;

    // 球员入场位置
    // [[红队起始点比例, 红队可偏移比例], [蓝队起始点比例, 蓝队可偏移比例]]
    var m_arrAdmissionX = [[0.05, 0.35],[0.6, 0.35]];
    var m_arrAdmissionY = [[0.1, 0.8],[0.1, 0.8]];
    // 球员颜色
    var m_clrTeam = ["red", "blue"];

    // 像素 / 米 的比值
    var m_fScale;

    // 基本时间
    var m_nBaseTime = 50;

    this.show = function() {
        console.log("ddd");
    }

    // 获取canvas对象
    this.getCanvas = function() {
        var canvas = document.getElementById("footballfield");
        if (canvas.getContext) {
            return canvas;
        } else {
            return null;
        }
    }

    // 清除画布图案
    this.clearCanvas = function() {
        var canvas = document.getElementById("footballfield");
        if (canvas.getContext) {
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        } else {
            return ;
        }
        
    }

    // 获取起始位置X
    this.getStartX = function() {
        return m_nStartX;
    }

    // 获取起始位置Y
    this.getStartY = function() {
        return m_nStartY;
    }

    // 设置足球场宽度
    this.setWidth = function(nWidth) {
        m_nWidth = nWidth;
    }

    // 获取足球场宽度
    this.getWidth = function() {
        return m_nWidth;
    }

    // 设置足球场高度
    this.setHeight = function(nHeight) {
        m_nHeight = nHeight;
    }

    // 获取足球场宽度
    this.getHeight = function() {
        return m_nHeight;
    }

    // 获取球员入场位置X数组（百分比）
    this.getAdmissionX = function() {
        return m_arrAdmissionX;
    }

    // 获取球员入场位置Y数组（百分比）
    this.getAdmissionY = function() {
        return m_arrAdmissionY;
    }

    // 获取球队颜色
    this.getTeamColor = function() {
        return m_clrTeam;
    }

    // 设置比例值
    this.setScale = function(fScale) {
        m_fScale = fScale;
    }

    // 获取比例值
    this.getScale = function() {
        return m_fScale;
    }

    // 获取时间基数
    this.getBaseTime = function() {
        return m_nBaseTime;
    }

    // 
    this.MyLog = function(strLog) {
        var div = document.getElementById("log_text");
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        // 补零空位
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }

        div.innerHTML = div.innerHTML + "【" + 
                        year + "-" + month + "-" + day + " " + 
                        hour + ":" + minute + ":" + second + 
                        "】 " + strLog + "<br>";

        div.scrollTop = div.scrollHeight;
    }
}

Global.getInstance = function() {
    if (!this.instance) {
        this.instance = new Global();
    }
    return this.instance;
}