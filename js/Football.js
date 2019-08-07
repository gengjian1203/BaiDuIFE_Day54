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
    var direction = 0;// (2 * Math.PI / 360) * 92;
    // 加速度(摩擦力、阻力)
    var fVAcc = -0.000005;
    // 初速度
    var fVSta = 0;
    // 即时速度
    var fVNow = 0;
    // 保护状态(真为保护，不被抢球)
    var m_bProtect = false;

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

    // 设置足球角度
    this.setDirection = function(nDir) {
        direction = nDir;
    }

    // 设置足球初速度
    this.setVStart = function(nV) {
        fVSta = nV;
    }

    // 设置足球的保护状态
    this.setProtect = function(bProtect) {
        m_bProtect = bProtect;
    }

    // 获取足球的保护状态
    this.getProtect = function() {
        return m_bProtect;
    }

    // 监察函数
    this.watch = function() {
        var global = Global.getInstance();
        // 如果红队进球
        if ((this.getPositionX() >= global.getStartX() + global.getWidth() - (1 * global.getScale())) && 
            (this.getPositionX() <= global.getStartX() + global.getWidth() + (10 * global.getScale())) && 
            (this.getPositionY() >= global.getStartY() + (global.getHeight() / 2) - (3.66 * global.getScale())) && 
            (this.getPositionY() <= global.getStartY() + (global.getHeight() / 2) + (3.66 * global.getScale()))) {
            global.MyLog("红队进球，红队分数加1，裁判将足球重新置于球场中央。");
            // 所有队员、足球停止
            this.setPosition(global.getWidth() / 2 + Math.pow(-1, Math.floor(Math.random() * 10)) * 2.64 * global.getScale(), 
                             global.getHeight() / 2 + Math.pow(-1, Math.floor(Math.random() * 10)) * 2.64 * global.getScale());
            this.stop();
            global.stopAllPlayers();
            
            // 更新分数
            global.addRedScore();
            updateScore();
            Goal.getInstance().setShow(true);
            Football.getInstance().setProtect(true);

            // 等待1秒后，并且恢复队员运动
            setTimeout(() => {
                Goal.getInstance().setShow(false);
                Football.getInstance().setProtect(false);
                if (global.getGameState()) {
                    global.startAllPlayers();
                }
            }, global.getBaseTime() * 20);
            
            return;
        }

        // 如果蓝队进球
        if ((this.getPositionX() >= global.getStartX() - (10 * global.getScale())) && 
            (this.getPositionX() <= global.getStartX() + (1 * global.getScale())) && 
            (this.getPositionY() >= global.getStartY() + (global.getHeight() / 2) - (3.66 * global.getScale())) && 
            (this.getPositionY() <= global.getStartY() + (global.getHeight() / 2) + (3.66 * global.getScale()))) {
            global.MyLog("蓝队进球，蓝队分数加1，裁判将足球重新置于球场中央。");
            // 所有队员、足球停止
            this.setPosition(global.getWidth() / 2 + Math.pow(-1, Math.floor(Math.random() * 10)) * 2.64 * global.getScale(), 
            global.getHeight() / 2 + Math.pow(-1, Math.floor(Math.random() * 10)) * 2.64 * global.getScale());
            this.stop();
            global.stopAllPlayers();

            // 更新分数
            global.addBlueScore();
            updateScore();
            Goal.getInstance().setShow(true);
            Football.getInstance().setProtect(true);

            // 等待1秒后，恢复队员运动
            setTimeout(() => {
                Goal.getInstance().setShow(false);
                Football.getInstance().setProtect(false);
                if (global.getGameState()) {
                    global.startAllPlayers();
                }
            }, global.getBaseTime() * 20);
                        
            return;
        }

        // 如果足球左出界，则裁判发出角球
        if (this.getPositionX() < global.getStartX()) {
            if (this.getPositionY() <= global.getStartY() + (global.getHeight() / 2)) {
                // 左上角角球
                global.MyLog("足球出界，裁判将在左上角旗区，随机角度发出角球。");
                this.setPosition(0, 0);
                this.stop();
                global.stopAllPlayers();

                // 等待1秒后，队员
                setTimeout(() => {
                    if (global.getGameState()) {
                        global.startAllPlayers();
                        direction = (2 * Math.PI / 360) * Math.floor(Math.random() * 90);
                        fVSta = 0.015;
                        this.run(); 
                    }
                }, global.getBaseTime() * 20);
                            
            } else {
                // 左下角角球
                global.MyLog("足球出界，裁判将在左下角旗区，随机角度发出角球。");
                this.setPosition(0, global.getHeight());
                this.stop();
                global.stopAllPlayers();

                // 等待1秒后，队员
                setTimeout(() => {
                    if (global.getGameState()) {
                        global.startAllPlayers();
                        direction = (2 * Math.PI / 360) * (Math.floor(Math.random() * 90) + 270);
                        fVSta = 0.015;
                        this.run(); 
                    }
                }, global.getBaseTime() * 20);
                            
            }
        }
        // 如果足球右边界，则裁判发出角球
        if (this.getPositionX() > global.getStartX() + global.getWidth()) {
            if (this.getPositionY() <= global.getStartY() + (global.getHeight() / 2)) {
                // 右上角角球
                global.MyLog("足球出界，裁判将在右上角旗区，随机角度发出角球。");
                this.setPosition(global.getWidth(), 0);
                this.stop();
                global.stopAllPlayers();

                // 等待1秒后，队员
                setTimeout(() => {
                    if (global.getGameState()) {
                        global.startAllPlayers();
                        direction = (2 * Math.PI / 360) * (Math.floor(Math.random() * 90) + 90);
                        fVSta = 0.015;
                        this.run(); 
                    }
                }, global.getBaseTime() * 20);
                            
            } else {
                // 右下角角球
                global.MyLog("足球出界，裁判将在右下角旗区，随机角度发出角球。");
                this.setPosition(global.getWidth(), global.getHeight());
                this.stop();
                global.stopAllPlayers();

                // 等待1秒后，队员
                setTimeout(() => {
                    if (global.getGameState()) {
                        global.startAllPlayers();
                        direction = (2 * Math.PI / 360) * (Math.floor(Math.random() * 90) + 180);
                        fVSta = 0.015;
                        this.run(); 
                    }
                }, global.getBaseTime() * 20);
                       
            }
        }
        // 如果足球上出界，则裁判发出角球
        if (this.getPositionY() < global.getStartY()) {
            if (this.getPositionX() <= global.getStartX() + (global.getWidth() / 2)) {
                // 左上角角球
                global.MyLog("足球出界，裁判将在左上角旗区，随机角度发出角球。");
                this.setPosition(0, 0);
                this.stop();
                global.stopAllPlayers();

                // 等待1秒后，队员
                setTimeout(() => {
                    if (global.getGameState()) {
                        global.startAllPlayers();
                        direction = (2 * Math.PI / 360) * Math.floor(Math.random() * 90);
                        fVSta = 0.015;
                        this.run(); 
                    }
                }, global.getBaseTime() * 20);

            } else {
                // 右上角角球
                global.MyLog("足球出界，裁判将在右上角旗区，随机角度发出角球。");
                this.setPosition(global.getWidth(), 0);
                this.stop();
                global.stopAllPlayers();

                // 等待1秒后，队员
                setTimeout(() => {
                    if (global.getGameState()) {
                        global.startAllPlayers();
                        direction = (2 * Math.PI / 360) * (Math.floor(Math.random() * 90) + 90);
                        fVSta = 0.015;
                        this.run(); 
                    }
                }, global.getBaseTime() * 20);
                   
            }
        }

        // 如果足球下出界，则裁判发出角球
        if (this.getPositionY() > global.getStartY() + global.getHeight()) {
            if (this.getPositionX() <= global.getStartX() + (global.getWidth() / 2)) {
                // 左下角角球
                global.MyLog("足球出界，裁判将在左下角旗区，随机角度发出角球。");
                this.setPosition(0, global.getHeight());
                this.stop();
                global.stopAllPlayers();

                // 等待1秒后，队员
                setTimeout(() => {
                    if (global.getGameState()) {
                        global.startAllPlayers();
                        direction = (2 * Math.PI / 360) * (Math.floor(Math.random() * 90) + 270);
                        fVSta = 0.015;
                        this.run(); 
                    }
                }, global.getBaseTime() * 20);

            } else {
                // 右下角角球
                global.MyLog("足球出界，裁判将在右下角旗区，随机角度发出角球。");
                this.setPosition(global.getWidth(), global.getHeight());
                this.stop();
                global.stopAllPlayers();

                // 等待1秒后，队员
                setTimeout(() => {
                    if (global.getGameState()) {
                        global.startAllPlayers();
                        direction = (2 * Math.PI / 360) * (Math.floor(Math.random() * 90) + 180);
                        fVSta = 0.015;
                        this.run(); 
                    }
                }, global.getBaseTime() * 20);

            }
        }

        // if (!((this.getPositionX() >= global.getStartX()) && 
        //       (this.getPositionX() <= global.getStartX() + global.getWidth()) && 
        //       (this.getPositionY() >= global.getStartY()) && 
        //       (this.getPositionY() <= global.getStartY() + global.getHeight()))) {
        //     global.MyLog("足球出界，裁判将角球发出。");
        //     this.setPosition(global.getWidth() / 2, 
        //                      global.getHeight() / 2);
        //     this.stop();
        //     // // 随机开球
        //     // this.run(); 
        //     // direction = (2 * Math.PI / 360) * Math.floor(Math.random() * 360);
        //     return;
        // }
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
        //fVSta = 0.06; //0.03;
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