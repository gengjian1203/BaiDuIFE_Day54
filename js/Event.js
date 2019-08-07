// 红队点击
function eventRedClick(e) {
    var ev = e || window.event;
    var target = ev.event || ev.srcElement;
    if ("button" == target.nodeName.toLowerCase()) {
        switch (target.id) {
            case "red_roll":
                // console.log("roll");
                redAddRoll();
                break;
            case "red_sure":
                redAddSure();
                break;
            default:
                break;
        }
    }
}

// 红队鼠标移入
function eventRedMouseOver(e) {
    var ev = e || window.event;
    var target = ev.event || ev.srcElement;
    if ("img" == target.nodeName.toLowerCase()) {
        switch (target.name) {
            case "nID":
                showBecareful(target, "编号", "这是一名球员的唯一标识。", "注：不可修改");
                break;
            case "nVNum":
                var nVNum = parseInt(document.getElementById("red_nVNum").value);
                showBecareful(target, "速度", "速度值决定运动员的最高速度", 
                                "运动员奔跑可达到的最高速度约为" + (3 + (nVNum - 1) * (8 / 98)).toFixed(2) + "m/s");
                break;
            case "nPower":
                var nPower = parseInt(document.getElementById("red_nPower").value);
                showBecareful(target, "爆发", "爆发力决定运动员的加速能力", 
                                "运动员起步后，约" + ((-3 / 98) * nPower + (395 / 98)).toFixed(2) + "s后，可达到最大速度");
                break;
            case "nKeep":
                var nKeep = parseInt(document.getElementById("red_nKeep").value);
                showBecareful(target, "体力", "体力值决定保持最大速度时间", 
                                "运动员达到最大速度后，大约能保持" + ((5 / 98) * nKeep + (975 / 98)).toFixed(2) + "s");
                break;
            case "nStrong":
                var nStrong = parseInt(document.getElementById("red_nStrong").value);
                showBecareful(target, "力量", "力量值决定踢出球的最大速度", 
                                "运动员射门时，给球的初始速度为" + ((45 / 98) * nStrong + (445 / 98)).toFixed(2) + "m/s");
                break;
            case "nSkill":
                var nSkill = parseInt(document.getElementById("red_nSkill").value);
                showBecareful(target, "技巧", "技巧值决定踢球方向的准确性", 
                                "运动员射门时，球方向会偏移-" + ((-9 / 98) * nSkill + (989 / 98)).toFixed(2) + "°~+" + ((-9 / 98) * nSkill + (989 / 98)).toFixed(2) + "°");
                break;
            default:
                break;
        }
    }
}

// 红队鼠标划出
function eventRedMouseOut(e) {
    var ev = e || window.event;
    var target = ev.event || ev.srcElement;
    if ("img" == target.nodeName.toLowerCase()) {
        hideBecareful();
    }
}

// 红队点击队员，展示队员属性
function eventRedPlayersClick(e) {
    var ev = e || window.event;
    var target = ev.event || ev.srcElement;
    if ("button" == target.nodeName.toLowerCase()) {
        var nIndex = 0;
        var nID = parseInt(target.innerHTML);
        // 获取ID指定的运动员
        for (nIndex in g_arrRedPlayer) {
            if (nID == g_arrRedPlayer[nIndex].getID()) {
                Global.getInstance().setIndexRedPlayer(nIndex);
                break;
            }
        }
        // console.log(nIndex);
        // 将信息显示在界面
        var objDiv = document.getElementById("red_show");
        var obj = objDiv.getElementsByTagName("div");
        // 更新界面数据 
        obj.nID.innerHTML = "编号：" + g_arrRedPlayer[nIndex].getID();
        obj.nVNum.innerHTML = "速度：" + g_arrRedPlayer[nIndex].getVNum();
        obj.nPower.innerHTML = "爆发：" + g_arrRedPlayer[nIndex].getPower();
        obj.nKeep.innerHTML = "体力：" + g_arrRedPlayer[nIndex].getKeep();
        obj.nStrong.innerHTML = "力量：" + g_arrRedPlayer[nIndex].getStrong();
        obj.nSkill.innerHTML = "技巧：" + g_arrRedPlayer[nIndex].getSkill();
        obj.nVNow.innerHTML = "当前速度：" + g_arrRedPlayer[nIndex].getVNow() + "m/s";

        // 球场标记选中队员
        for (var i in g_arrRedPlayer) {
            g_arrRedPlayer[i].setSignCircle(false);
        }
        g_arrRedPlayer[nIndex].setSignCircle(true);
    }
}

// 蓝队点击
function eventBlueClick(e) {
    var ev = e || window.event;
    var target = ev.event || ev.srcElement;
    if ("button" == target.nodeName.toLowerCase()) {
        switch (target.id) {
            case "blue_roll":
                blueAddRoll();
                break;
            case "blue_sure":
                blueAddSure();
                break;
            default:
                break;
        }
    }
}

// 蓝队鼠标划入
function eventBlueMouseOver(e) {
    var ev = e || window.event;
    var target = ev.event || ev.srcElement;
    if ("img" == target.nodeName.toLowerCase()) {
        switch (target.name) {
            case "nID":
                showBecareful(target, "编号", "这是一名球员的唯一标识。", "注：不可修改");
                break;
            case "nVNum":
                var nVNum = parseInt(document.getElementById("blue_nVNum").value);
                showBecareful(target, "速度", "速度值决定运动员的最高速度", 
                                "运动员奔跑可达到的最高速度约为" + (3 + (nVNum - 1) * (8 / 98)).toFixed(2) + "m/s");
                break;
            case "nPower":
                var nPower = parseInt(document.getElementById("blue_nPower").value);
                showBecareful(target, "爆发", "爆发力决定运动员的加速能力", 
                                "运动员起步后，约" + ((-3 / 98) * nPower + (395 / 98)).toFixed(2) + "s后，可达到最大速度");
                break;
            case "nKeep":
                var nKeep = parseInt(document.getElementById("blue_nKeep").value);
                showBecareful(target, "体力", "体力值决定保持最大速度时间", 
                                "运动员达到最大速度后，大约能保持" + ((5 / 98) * nKeep + (975 / 98)).toFixed(2) + "s");
                break;
            case "nStrong":
                var nStrong = parseInt(document.getElementById("blue_nStrong").value);
                showBecareful(target, "力量", "力量值决定踢出球的最大速度", 
                                "运动员射门时，给球的初始速度为" + ((45 / 98) * nStrong + (445 / 98)).toFixed(2) + "m/s");
                break;
            case "nSkill":
                var nSkill = parseInt(document.getElementById("blue_nSkill").value);
                showBecareful(target, "技巧", "技巧值决定踢球方向的准确性", 
                                "运动员射门时，球方向会偏移-" + ((-9 / 98) * nSkill + (989 / 98)).toFixed(2) + "°~+" + ((-9 / 98) * nSkill + (989 / 98)).toFixed(2) + "°");
                break;
            default:
                break;
        }
    }
}

// 蓝队鼠标划出
function eventBlueMouseOut(e) {
    var ev = e || window.event;
    var target = ev.event || ev.srcElement;
    if ("img" == target.nodeName.toLowerCase()) {
        hideBecareful();
    }
}

// 蓝队点击队员，展示队员属性
function eventBluePlayersClick(e) {
    var ev = e || window.event;
    var target = ev.event || ev.srcElement;
    if ("button" == target.nodeName.toLowerCase()) {
        var nIndex = 0;
        var nID = parseInt(target.innerHTML);
        // 获取ID指定的运动员
        for (nIndex in g_arrBluePlayer) {
            if (nID == g_arrBluePlayer[nIndex].getID()) {
                Global.getInstance().setIndexBluePlayer(nIndex);
                break;
            }
        }
        // console.log(nIndex);
        // 将信息显示在界面
        var objDiv = document.getElementById("blue_show");
        var obj = objDiv.getElementsByTagName("div");
        // 
        obj.nID.innerHTML = "编号：" + g_arrBluePlayer[nIndex].getID();
        obj.nVNum.innerHTML = "速度：" + g_arrBluePlayer[nIndex].getVNum();
        obj.nPower.innerHTML = "爆发：" + g_arrBluePlayer[nIndex].getPower();
        obj.nKeep.innerHTML = "体力：" + g_arrBluePlayer[nIndex].getKeep();
        obj.nStrong.innerHTML = "力量：" + g_arrBluePlayer[nIndex].getStrong();
        obj.nSkill.innerHTML = "技巧：" + g_arrBluePlayer[nIndex].getSkill();
        obj.nVNow.innerHTML = "当前速度：" + g_arrBluePlayer[nIndex].getVNow() + "m/s";

        // 球场标记选中队员
        for (var i in g_arrBluePlayer) {
            g_arrBluePlayer[i].setSignCircle(false);
        }
        g_arrBluePlayer[nIndex].setSignCircle(true);
    }
}

// 控制面板点击事件
function eventControlClick(e) {
    var ev = e || window.event;
    var target = ev.event || ev.srcElement;
    if ("button" == target.nodeName.toLowerCase()) {
        switch (target.id) {
            case "player_start":
                // 点击运动员、开始按钮
                document.getElementById("player_start").disabled = "disabled";
                document.getElementById("player_stop").disabled = "";
                
                Global.getInstance().setGameState(true);
                Global.getInstance().startAllPlayers();
                break;
            case "player_stop":
                // 点击运动员、停止按钮
                document.getElementById("player_start").disabled = "";
                document.getElementById("player_stop").disabled = "disabled";
                
                Global.getInstance().setGameState(false);
                Global.getInstance().stopAllPlayers();
                break;
            // case "football_start":
            //     // 点击足球、开始按钮
            //     document.getElementById("football_start").disabled = "disabled";
            //     document.getElementById("football_stop").disabled = "";

            //     Football.getInstance().run();

            //     break;
            // case "football_stop":
            //     // 点击足球、停止按钮
            //     document.getElementById("football_start").disabled = "";
            //     document.getElementById("football_stop").disabled = "disabled";

            //     Football.getInstance().stop();
            //     break;
            // case "test":
            //     updateScore();
            //     break;
            default:
                break;
        }
    }
}

// 球场刷新函数
function timerUpdate() {
    // 绘制足球场
    Global.getInstance().clearCanvas();
    fbField.show();
    for(var index in g_arrRedPlayer) {
        g_arrRedPlayer[index].update();
        g_arrRedPlayer[index].show();
    }
    for(var index in g_arrBluePlayer) {
        g_arrBluePlayer[index].update();
        g_arrBluePlayer[index].show();
    }
    // 绘制足球
    Football.getInstance().update();
    Football.getInstance().show();

    // 绘制得分特效
    Goal.getInstance().show();

    // 刷新球员的当前速度
    if (Global.getInstance().getIndexRedPlayer() >=  0) {
        var objDiv = document.getElementById("red_show");
        var obj = objDiv.getElementsByTagName("div");
        obj.nVNow.innerHTML = "当前速度：" + g_arrRedPlayer[Global.getInstance().getIndexRedPlayer()].getVNow() + "m/s";
    }
    if (Global.getInstance().getIndexBluePlayer() >=  0) {
        var objDiv = document.getElementById("blue_show");
        var obj = objDiv.getElementsByTagName("div");
        obj.nVNow.innerHTML = "当前速度：" + g_arrBluePlayer[Global.getInstance().getIndexBluePlayer()].getVNow() + "m/s";
    }
}
