function Football () {
    // 单例对象
    this.instance = null;
    // 图片对象
    var img = new Image();
    img.src = "img/football.png";
    // 当前位置信息
    var nX = 0;
    var nY = 0;
    // 起始位置信息
    var nSetX = Global.getInstance().getStartX();
    var nSetY = Global.getInstance().getStartY();

    // 方向
    var direction = (2 * Math.PI / 360) * Math.floor(Math.random() * 360);
    // 加速度(摩擦力、阻力)
    var fVAcc = -0.000006;
    // 初速度
    var fVSta = 0;
    // 即时速度
    var fVNow = 0;

    // 初始时间（毫秒）
    var tStart = new Date();
    var nStartTime = tStart.getTime();
    
    // 获取足球X轴位置
    this.getPositionX = function() {
        return (nSetX + nX + 0.75 * Global.getInstance().getScale());
    }
    
    // 获取足球Y轴位置
    this.getPositionY = function() {
        return (nSetY + nY + 0.75 * Global.getInstance().getScale());
    }

    // 设置足球位置
    this.setPosition = function(x, y) {
        nSetX = Global.getInstance().getStartX() + x - 0.75 * Global.getInstance().getScale();
        nSetY = Global.getInstance().getStartY() + y - 0.75 * Global.getInstance().getScale();
        nX = 0;
        nY = 0;
    }

    // 监察函数
    this.watch = function() {
        // 如果足球越界则，放回中点
        var global = Global.getInstance();

        if (!((nSetX + nX >= global.getStartX()) && 
              (nSetX + nX <= global.getStartX() + global.getWidth()) && 
              (nSetY + nY >= global.getStartY()) && 
              (nSetY + nY <= global.getStartY() + global.getHeight()))) {
            console.log("足球出界");
            this.setPosition(global.getWidth() / 2, 
                             global.getHeight() / 2);
            this.stop();
            
            // 随机开球
            this.run();
            direction = (2 * Math.PI / 360) * Math.floor(Math.random() * 360);
        }
    }

    // 足球被踢
    this.run = function() {
        // 设定起跑时间戳
        var tNow = new Date();
        nStartTime = tNow.getTime();
        // 重置基准点
        nSetX += nX;
        nX = 0;
        nSetY += nY;
        nY = 0;

        // 给定一个初速度
        fVSta = 0.03;
    }

    // 足球强制停止
    this.stop = function() {
        // 重置基准点
        nSetX += nX;
        nX = 0;
        nSetY += nY;
        nY = 0;

        fVSta = 0;
    }

    // 足球位置更新
    this.update = function() {
        this.watch();

        // 获取当前时间
        var tNow = new Date();
        nNowTime = tNow.getTime();
        // 得到时间差
        var nTime = nNowTime - nStartTime;
        // 移动的总位移
        var nSum = 0;

        if ((0 <= nTime) && (nTime <= ((-fVSta) / fVAcc))) {
            fVNow = fVSta + fVAcc * nTime;
            nSum = (((2 * fVSta) + (fVAcc * nTime)) * nTime) / 2;
        } else {
            fVNow = 0;
            nSum = (-fVSta * fVSta) / (2 * fVAcc);
        }
        
        nX = nSum * Global.getInstance().getScale() * Math.cos(direction);
        nY = nSum * Global.getInstance().getScale() * Math.sin(direction);
    }

    // 足球重新绘制
    this.show = function() {
        var fScale = Global.getInstance().getScale();
        // console.log(fScale);
        Global.getInstance().getCanvas().getContext("2d").drawImage(img, nSetX + nX, nSetY + nY, 1.5 * fScale, 1.5 * fScale);
    }
}

Football.getInstance = function() {
    if (!this.instance) {
        this.instance = new Football();
    }
    return this.instance;
}