
var Global = function() {
    // 单例对象
    this.instance = null;

    // 足球场轮廓起始位置
    var m_nStartX = 40;
    var m_nStartY = 30;
    // 足球场宽高
    var m_nWidth = 0;
    var m_nHeight = 0;

    // 像素 / 米 的比值
    var m_fScale;

    // 基本时间
    var m_nBaseTime = 60;

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

    // 设置足球场宽度
    this.getHeight = function() {
        return m_nHeight;
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
}

Global.getInstance = function() {
    if (!this.instance) {
        this.instance = new Global();
    }
    return this.instance;
}