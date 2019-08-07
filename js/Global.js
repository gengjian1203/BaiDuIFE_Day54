
var Global = function() {
    // 单例对象
    this.instance = null;

    // 游戏情况：是否开始
    var m_bGame = false;

    // 足球比分
    var m_nRedScore = 0;
    var m_nBlueScore = 0;

    // 足球场轮廓起始位置
    var m_nStartX = 40;
    var m_nStartY = 30;
    // 足球场宽高
    var m_nWidth = 0;
    var m_nHeight = 0;
    // 球门中心点 [蓝队球门][红队球门];
    var m_goal = [];
    // 像素 / 米 的比值
    var m_fScale;

    // 球员入场位置
    // [[红队起始点比例, 红队可偏移比例], [蓝队起始点比例, 蓝队可偏移比例]]
    var m_arrAdmissionX = [[0.05, 0.35],[0.6, 0.35]];
    var m_arrAdmissionY = [[0.1, 0.8],[0.1, 0.8]];
    // 球员颜色
    var m_clrTeam = ["red", "blue"];

    // 选中球员nIndex
    var m_nIndexRedPlayer = -1;
    var m_nIndexBluePlayer = -1;


    // 基本时间
    var m_nBaseTime = 50;

    this.show = function() {
        console.log("ddd");
    }

    // 设置游戏情况
    this.setGameState = function(bGame) {
        m_bGame = bGame;
    }

    // 获取游戏情况
    this.getGameState = function() {
        return(m_bGame);
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

    // 设置红队得分
    this.addRedScore = function() {
        m_nRedScore++;
    }

    // 获取红队得分
    this.getRedScore = function() {
        return m_nRedScore;
    }

    // 设置蓝队得分
    this.addBlueScore = function() {
        m_nBlueScore++;
    }

    // 获取蓝队得分
    this.getBlueScore = function() {
        return m_nBlueScore;
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

    // 设置球门坐标
    this.setGoalPosition = function(pRed, pBlue) {
        // 球门中心点 [蓝队球门][红队球门];
        m_goal.length = 0;
        m_goal.push(pBlue);
        m_goal.push(pRed);
    }

    // 获取球门坐标
    this.getGoalPosition = function() {
        return m_goal;
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

    // 设置
    this.setIndexRedPlayer = function(nIndex) {
        m_nIndexRedPlayer = nIndex;
    }

    // 获取红队选中球员nIndex
    this.getIndexRedPlayer = function() {
        return m_nIndexRedPlayer;
    }

    // 设置
    this.setIndexBluePlayer = function(nIndex) {
        m_nIndexBluePlayer = nIndex;
    }

    // 获取蓝队选中球员nIndex
    this.getIndexBluePlayer = function() {
        return m_nIndexBluePlayer;
    }
    
    // 获取时间基数
    this.getBaseTime = function() {
        return m_nBaseTime;
    }

    // 全部队员开始
    this.startAllPlayers = function() {
        for (var index in g_arrRedPlayer) {
            g_arrRedPlayer[index].run(0);
        }
        for (var index in g_arrBluePlayer) {
            g_arrBluePlayer[index].run(0);
        }
    }

    // 全部队员停止
    this.stopAllPlayers = function() {
        for (var index in g_arrRedPlayer) {
            g_arrRedPlayer[index].stopMust();
            // g_arrRedPlayer[index].stop();
        }
        for (var index in g_arrBluePlayer) {
            g_arrBluePlayer[index].stopMust();
            // g_arrBluePlayer[index].stop();
        }
    }

    // 右下角日志系统
    this.MyLog = function(strLog) {
        var div = document.getElementById("log_text");
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
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

// 获取单例对象
Global.getInstance = function() {
    if (!this.instance) {
        this.instance = new Global();
    }
    return this.instance;
}