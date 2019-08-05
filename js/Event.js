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
                                "待计算");
                break;
            case "nSkill":
                var nSkill = parseInt(document.getElementById("red_nSkill").value);
                showBecareful(target, "技巧", "技巧值决定踢球方向的准确性", 
                                "待计算");
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
                break;
            }
        }
        console.log(nIndex);
        // 将信息显示在界面
        var objDiv = document.getElementById("red_show");
        var obj = objDiv.getElementsByTagName("div");
        obj.nID.innerHTML = "编号：" + g_arrRedPlayer[nIndex].getID();
        //
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
                                "待计算");
                break;
            case "nSkill":
                var nSkill = parseInt(document.getElementById("blue_nSkill").value);
                showBecareful(target, "技巧", "技巧值决定踢球方向的准确性", 
                                "待计算");
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
                
                for (var index in g_arrRedPlayer) {
                    g_arrRedPlayer[index].run(0);
                }
                for (var index in g_arrBluePlayer) {
                    g_arrBluePlayer[index].run(0);
                }
                break;
            case "player_stop":
                // 点击运动员、停止按钮
                document.getElementById("player_start").disabled = "";
                document.getElementById("player_stop").disabled = "disabled";
                
                for (var index in g_arrRedPlayer) {
                    g_arrRedPlayer[index].stop();
                }
                for (var index in g_arrBluePlayer) {
                    g_arrBluePlayer[index].stop();
                }
                break;
            case "football_start":
                // 点击足球、开始按钮
                document.getElementById("football_start").disabled = "disabled";
                document.getElementById("football_stop").disabled = "";

                Football.getInstance().run();

                break;
            case "football_stop":
                // 点击足球、停止按钮
                document.getElementById("football_start").disabled = "";
                document.getElementById("football_stop").disabled = "disabled";

                Football.getInstance().stop();
                break;
            case "test":
                Global.getInstance().MyLog("123123123aabbc");
                break;
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
}
