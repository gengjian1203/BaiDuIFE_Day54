////////////////////////////////////////////////////////////////////////////////
// 工厂类
////////////////////////////////////////////////////////////////////////////////
var PlayerFactory = function() { };

PlayerFactory.prototype = {
    signing : function (strMode, arrAttribute) {
        var player;
        switch (strMode) {
            case "red":
                player = new Player(0, arrAttribute);
                
                break;
            case "blue":
                player = new Player(1, arrAttribute);
        
            default:
                break;
        }
        return player;
    }
}

////////////////////////////////////////////////////////////////////////////////
// 运动员类
////////////////////////////////////////////////////////////////////////////////

function Player(nTeam, arrAttribute) {
    // private:
    // 全局单例
    var m_global = Global.getInstance();
    // 运动员当前位置
    var nX = 0;
    var nY = 0;
    // 运动员起始位置（在自己半场内随机位置）
    var x = m_global.getWidth() * m_global.getAdmissionX()[nTeam][0] + Math.floor(Math.random() * (m_global.getWidth() * m_global.getAdmissionX()[nTeam][1]));
    var y = m_global.getHeight() * m_global.getAdmissionY()[nTeam][0] + Math.floor(Math.random() * (m_global.getHeight() * m_global.getAdmissionY()[nTeam][1]));
    var nSetX = Global.getInstance().getStartX() + x;
    var nSetY = Global.getInstance().getStartY() + y;
    // 运动员队伍颜色
    var m_nTeam = nTeam;
    var clrCircle = "white";
    var clrFill = m_global.getTeamColor()[nTeam];
    var clrText = "white";
    var styleText = "10px bold 黑体";
    var bSignCircle = false;
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
    // 运动员编号
    var nID = arrAttribute[0];
    // 速度属性 (1 - 99)
    var nVNum = arrAttribute[1];//Math.floor(Math.random() * 98) + 1;
    // 即时速度
    var fVNow = 0;
    // 最大速度 (0.003m/ms - 0.012m/ms)
    var fVMax = (3 + (nVNum - 1) * (8 / 98)) / 1000;
    // 爆发力属性
    var nPower = arrAttribute[2];//Math.floor(Math.random() * 98) + 1;
    // 达到最大速度时间（毫秒）
    var fPowerTime = ((-3 / 98) * nPower + (395 / 98)) * 1000;
    // 体力属性
    var nKeep = arrAttribute[3];//Math.floor(Math.random() * 98) + 1;
    // 能保持最大速度时间（毫秒）
    var fKeepTime = ((5 / 98) * nKeep + (975 / 98)) * 1000;
    // 力量
    var nStrong = arrAttribute[4];//Math.floor(Math.random() * 98) + 1;
    // 运动员给足球的初速度
    var fStrongVMax = ((45 / 98) * nStrong + (445 / 98)) / 1000;
    // 技巧
    var nSkill = arrAttribute[5];//Math.floor(Math.random() * 98) + 1;
    // 运动员对踢出足球的偏移最大量（99最大偏移角度1°，1最大偏移角度10°）
    var fSkillAngleMax = ((-9 / 98) * nSkill + (989 / 98));// * (2 * Math.PI / 360);
    // 运动员奔跑方向
    var direction = (2 * Math.PI / 360) * 0;

    // 起跑时间（毫秒）
    var tStart = new Date();
    var nStartTime = tStart.getTime();

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 获取球员的位置X
    ////////////////////////////////////////////////////////////////////////////////
    this.getPositionX = function() {
        return nSetX;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 获取球员的位置Y
    ////////////////////////////////////////////////////////////////////////////////
    this.getPositionY = function() {
        return nSetY;
    }

    // 设置球员的位置X
    this.setPositionX = function(nX) {
        x = nX;
        nSetX = Global.getInstance().getStartX() + x;
    }

    // 设置球员的位置Y
    this.setPositionY = function(nY) {
        y = nY;
        nSetY = Global.getInstance().getStartY() + y;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 设置选中标记
    ////////////////////////////////////////////////////////////////////////////////
    this.setSignCircle = function(bSign) {
        bSignCircle = bSign;
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 获取球员ID
    ////////////////////////////////////////////////////////////////////////////////
    this.getID = function() {
        return nID;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 获取速度属性
    ////////////////////////////////////////////////////////////////////////////////
    this.getVNum = function() {
        return nVNum;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 获取爆发力属性
    ////////////////////////////////////////////////////////////////////////////////
    this.getPower = function() {
        return nPower;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 获取体力属性
    ////////////////////////////////////////////////////////////////////////////////
    this.getKeep = function() {
        return nKeep;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 获取力量属性
    ////////////////////////////////////////////////////////////////////////////////
    this.getStrong = function() {
        return nStrong;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 获取技巧属性
    ////////////////////////////////////////////////////////////////////////////////
    this.getSkill = function() {
        console.log(nSkill);
        return nSkill;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 获取当前速度
    ////////////////////////////////////////////////////////////////////////////////
    this.getVNow = function() {
        // console.log(fVNow);
        return (fVNow * 1000).toFixed(2);
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

        var global =  Global.getInstance();
        // 监察是否与足球接触
        if (!Football.getInstance().getProtect()) {
            var nDistance = Math.sqrt(Math.pow(Football.getInstance().getPositionY() - nSetY ,2) + Math.pow(Football.getInstance().getPositionX() - nSetX, 2));
            // 如果距离小于 运动员与足球半径之和，即为接触
            var fScale = global.getScale();
            if (nDistance <= (1 * fScale + 0.75 * fScale)) {
                // 运动员与足球全部停止
                // this.stopMust();
                // Football.getInstance().stop();
    
                // 判断阵营
                if (0 == m_nTeam) {
                    global.MyLog("红队的" + nID + "号球员抢到了球。");
                    // 红队抢到球后，射门
                    var dir = Math.atan2(global.getGoalPosition()[0][1] - this.getPositionY(), global.getGoalPosition()[0][0] - this.getPositionX());
                    direction = dir * 180 / Math.PI;
                    direction1 = Math.pow(-1, Math.floor(Math.random() * 10)) * fSkillAngleMax;
                    var dir1 = (direction + direction1) * Math.PI * 2 / 360;
                    Football.getInstance().setDirection(dir1);
                    // console.log(fStrongVMax);
                    Football.getInstance().setVStart(fStrongVMax);
                    Football.getInstance().setProtect(true);
                    Football.getInstance().run();
                    setTimeout(() => {
                        Football.getInstance().setProtect(false);
                    }, 5 * global.getBaseTime());
                } else {
                    global.MyLog("蓝队的" + nID + "号球员抢到了球。");
                    // 蓝队抢到球后，射门
                    var dir = Math.atan2(global.getGoalPosition()[1][1] - this.getPositionY(), global.getGoalPosition()[1][0] - this.getPositionX());
                    direction = dir * 180 / Math.PI;
                    direction1 = Math.pow(-1, Math.floor(Math.random() * 10)) * fSkillAngleMax;
                    var dir1 = (direction + direction1) * Math.PI * 2 / 360;
                    Football.getInstance().setDirection(dir1);
                    // console.log(fStrongVMax);
                    Football.getInstance().setVStart(fStrongVMax);
                    Football.getInstance().setProtect(true);
                    Football.getInstance().run();
                    setTimeout(() => {
                        Football.getInstance().setProtect(false);
                    }, 5 * global.getBaseTime());
                }
            }
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

            // 绘制选中标记
            if (bSignCircle) {
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.lineWidth = "2";
                ctx.arc(nSetX, nSetY, 1.5 * fScale, 0, 2 * Math.PI);
                ctx.stroke();
            }

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
            ctx.fillText(String(nID), nSetX, nSetY);
            
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