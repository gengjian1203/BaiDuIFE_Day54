////////////////////////////////////////////////////////////////////////////////
// 运动员类
////////////////////////////////////////////////////////////////////////////////

function Player(x, y, num) {
    // private:
    // 运动员当前位置
    var nX = 0;
    var nY = 0;
    // 运动员起始位置
    var nSetX = Global.getInstance().getStartX() + x;
    var nSetY = Global.getInstance().getStartY() + y;
    // 运动员编号
    var strNum = num;
    // 运动员队伍颜色
    var clrCircle = "white";
    var clrFill = "red";
    var clrText = "white";
    var styleText = "14px bold 黑体";
    // 运动员跑步状态
    var bGo = false;
    // 按下停止的即时速度，用于计算惯性减速距离
    var fVHistory = 0;
    // 运动目标距离
    var nWatchSum = 0;
    // 每次运动的距离小计，用于控制奔跑距离
    var nTotalSum = 0;
    // 运动保存距离
    var nSaveSum = 0;

    // 运动员属性
    // 速度属性 (1 - 99)
    var nVNum = Math.floor(Math.random() * 98) + 1;
    // 即时速度
    var fVNow = 0;
    // 最大速度 (0.003m/ms - 0.012m/ms)
    var fVMax = (3 + (nVNum - 1) * (8 / 98)) / 1000;
    // 爆发力属性
    var nPower = Math.floor(Math.random() * 98) + 1;
    // 达到最大速度时间（毫秒）
    var fPowerTime = ((-3 / 98) * nPower + (395 / 98)) * 1000;
    // 体力属性
    var nKeep = Math.floor(Math.random() * 98) + 1;
    // 能保持最大速度时间（毫秒）
    var fKeepTime = ((5 / 98) * nKeep + (975 / 98)) * 1000;
    // 力量
    var nStrong = Math.floor(Math.random() * 98) + 1;
    // 技巧
    var nSkill = Math.floor(Math.random() * 98) + 1;
    // 运动员奔跑方向
    var direction = (2 * Math.PI / 360) * 0;

    // 起跑时间（毫秒）
    var tStart = new Date();
    var nStartTime = tStart.getTime();

    ////////////////////////////////////////////////////////////////////////////////
    // private:
    // 提升速度，二次贝塞尔曲线
    ////////////////////////////////////////////////////////////////////////////////
    function bezier2Up() {
        // fVNow = (-fVMax / fPowerTime) * t^2 + ((2 * fVMax) / fPowerTime) * t
    }

    ////////////////////////////////////////////////////////////////////////////////
    // private:
    // 降低速度，二次贝塞尔曲线
    ////////////////////////////////////////////////////////////////////////////////
    function bezier2Down() {

    }


    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 监察函数，用于控制运动员奔跑距离
    ////////////////////////////////////////////////////////////////////////////////
    this.watch = function() {
        // 监察是否达到目标米数（当nWatchSum为0时，为一直奔跑）
        if (0 != nWatchSum) {
            if (nWatchSum <= nTotalSum) {
                // 运动员奔跑完指定距离
                this.stop();
            }
        }

        // 监察是否与足球接触
        var nDistance = Math.sqrt(Math.pow(Football.getInstance().getPositionY() - nSetY ,2) + Math.pow(Football.getInstance().getPositionX() - nSetX, 2));
        
        // 如果距离小于 运动员与足球半径之和，即为接触
        var fScale = Global.getInstance().getScale();
        if (nDistance <= (1 * fScale + 0.75 * fScale)) {
            // 运动员与足球全部停止
            this.stopMust();
            Football.getInstance().stop();
        }
    }

    this.setDirection = function() {
        // 设定奔跑方向。默认为朝向足球奔跑
        var dir = Math.atan2(Football.getInstance().getPositionY() - nSetY, Football.getInstance().getPositionX() - nSetX);
        direction = dir * 180 / Math.PI;
        // console.log(direction);
    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 起跑
    ////////////////////////////////////////////////////////////////////////////////
    this.run = function(nSum) {
        // 设定起跑时间戳
        var tNow = new Date();
        nStartTime = tNow.getTime();
        // 重置基准点
        nSetX += nX;
        nX = 0;
        nSetY += nY;
        nY = 0;

        nWatchSum = nSum;
        nTotalSum = 0;
        nSaveSum = 0;
        // 
        bGo = true;

        this.setDirection();
    }


    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 立即停止
    ////////////////////////////////////////////////////////////////////////////////
    this.stopMust = function() {
        // 重置基准点
        nSetX += nX;
        nX = 0;
        nSetY += nY;
        nY = 0;
        nTotalSum = 0;
        nSaveSum = 0;
        fVHistory = 0;
        // 
        bGo = false;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 停止
    ////////////////////////////////////////////////////////////////////////////////
    this.stop = function() { 
        // 设定起跑时间戳
        var tNow = new Date();
        nStartTime = tNow.getTime();
        // 重置基准点
        nSetX += nX;
        nX = 0;
        nSetY += nY;
        nY = 0;
        nTotalSum = 0;
        nSaveSum = 0;
        fVHistory = fVNow;
        // 
        bGo = false;

    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 更新运动员位置
    ////////////////////////////////////////////////////////////////////////////////
    this.update = function() {
        // 检测跑步距离
        this.watch();

        this.setDirection();

        if (bGo) {
            // 跑步前进
            // 获取当前时间
            var tNow = new Date();
            nNowTime = tNow.getTime();
            // 得到时间差
            var nTime = nNowTime - nStartTime;
            // 移动的总位移
            var nSum = 0;

            nMultiple = Math.floor(nTime / (fKeepTime + (2 * fPowerTime)));
            nTime = nTime % (fKeepTime + (2 * fPowerTime));
            if ((0 <= nTime) && (nTime <= fPowerTime)) {
                // S1阶段
                fVNow = (fVMax * nTime) / fPowerTime;
                nSum = (fVMax * nTime * nTime) / (2 * fPowerTime);
            } else if ((fPowerTime < nTime) && (nTime <= (fPowerTime + fKeepTime))) {
                // S2阶段
                fVNow = fVMax;
                nSum = (fVMax * fPowerTime) / 2 + 
                        fVMax * (nTime - fPowerTime);
            } else if (((fPowerTime + fKeepTime) < nTime) && (nTime <= (2 * fPowerTime + fKeepTime))) {
                // S3阶段
                fVNow = (fVMax * (2 * fPowerTime + fKeepTime)) / fPowerTime - (fVMax * nTime) / fPowerTime;
                nSum = (fVMax * fPowerTime) / 2 + 
                        fKeepTime * fVMax + 
                        ((fVMax + ((fVMax * (2 * fPowerTime + fKeepTime - nTime)) / fPowerTime)) * (nTime - fPowerTime - fKeepTime)) / 2;
            } else {
                // 错误
                console.log("Error.");
            }
            // console.log(nSum + " : " + (fVMax * (fPowerTime + fKeepTime)) + ":" + nMultiple);
            nSum += nMultiple * (fVMax * (fPowerTime + fKeepTime));
            nTotalSum = nSum;

        } else {
            // 惯性停跑
            var tNow = new Date();
            nNowTime = tNow.getTime();
            // 得到时间差
            var nTime = nNowTime - nStartTime;
            // 移动的总位移
            var nSum = 0;

            if ((0 <= nTime) && (nTime <= ((fVHistory * fPowerTime) / fVMax))) {
                // 如果在停跑区间内
                fVNow = fVHistory - ((fVMax * nTime) / fPowerTime);
                nSum = (((2 * fVHistory) - ((fVMax * nTime) / fPowerTime)) * nTime) / 2;
            } else {
                // 此时已经静止      
                fVNow = 0;
                nSum = (fVHistory * fVHistory * fPowerTime) / (2 * fVMax);
            }
        }
        
        nSum -= nSaveSum;
        // 米数换算成像素点
        var dir = direction * Math.PI * 2 / 360;
        nX = nSum * Global.getInstance().getScale() * Math.cos(dir);
        nY = nSum * Global.getInstance().getScale() * Math.sin(dir);

        nSetX += nX;
        nSetY += nY;
        nSaveSum += nSum;
        
    }

    ////////////////////////////////////////////////////////////////////////////////
    // 绘制运动员
    ////////////////////////////////////////////////////////////////////////////////
    this.show = function() {
        var canvas = Global.getInstance().getCanvas();
        if (canvas) {
            var ctx = canvas.getContext("2d");
            var fScale = Global.getInstance().getScale();
            var strText = "";

            // 绘制同心圆
            ctx.beginPath();
            ctx.strokeStyle = clrCircle;
            ctx.fillStyle = clrFill;
            ctx.lineWidth = "2";
            ctx.arc(nSetX, nSetY, 1 * fScale, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            
            // 绘制为球员编号
            ctx.font = styleText;
            ctx.fillStyle = clrText;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(strNum, nSetX, nSetY);
            
            // 绘制球员属性
            // ctx.textAlign = "left";
            // ctx.font = "12px bold 黑体";
            // strText = "速度: " + nVNum;
            // ctx.fillText(strText, nSetX + nX - 10, nSetY + nY + 12);
            // strText = "即时: " + (fVNow * 1000).toFixed(2) + "m/s 最高: " + (fVMax * 1000).toFixed(2) + "m/s";
            // ctx.fillText(strText, nSetX + nX - 10, nSetY + nY + 24);
            // strText = "爆发力: " + nPower;
            // ctx.fillText(strText, nSetX + nX - 10, nSetY + nY + 36);
            // strText = "需要 " + (fPowerTime / 1000).toFixed(2) + " 秒达到最大速度";
            // ctx.fillText(strText, nSetX + nX - 10, nSetY + nY + 48);
            // strText = "体力: " + nKeep;
            // ctx.fillText(strText, nSetX + nX - 10, nSetY + nY + 60);
            // strText = "最大速度能坚持 " + (fKeepTime / 1000).toFixed(2) + " 秒";
            // ctx.fillText(strText, nSetX + nX - 10, nSetY + nY + 72);
             

        }
    }
}