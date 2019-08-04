// 创建足球场工厂对象
var g_factoryF = new FootballFieldFactory();
// 通过工厂生成一个世界杯足球场
var fbField = g_factoryF.building("WorldCup");

// 创建运动员工厂对象
var g_factoryP = new PlayerFactory();
// 红、蓝队运动员对象
var g_arrRedPlayer = [];
var g_arrBluePlayer = [];


// 主函数
window.onload = function() {
    // 绘制足球场
    fbField.show();

    // 生成运动员
    g_arrRedPlayer.push(g_factoryP.signing("red",[1, 10, 20, 30, 40, 50]));
    g_arrRedPlayer.push(g_factoryP.signing("red",[3, 10, 20, 30, 40, 50]));
    g_arrRedPlayer.push(g_factoryP.signing("red",[6, 10, 20, 30, 40, 50]));
    g_arrRedPlayer.push(g_factoryP.signing("red",[10, 10, 20, 30, 40, 50]));

    g_arrBluePlayer.push(g_factoryP.signing("blue", [1, 33, 44, 22, 11, 65]));
    g_arrBluePlayer.push(g_factoryP.signing("blue", [2, 33, 44, 22, 11, 65]));
    g_arrBluePlayer.push(g_factoryP.signing("blue", [5, 33, 44, 22, 11, 65]));
    g_arrBluePlayer.push(g_factoryP.signing("blue", [8, 33, 44, 22, 11, 65]));
    g_arrBluePlayer.push(g_factoryP.signing("blue", [4, 33, 44, 22, 11, 65]));
    g_arrBluePlayer.push(g_factoryP.signing("blue", [10, 33, 44, 22, 11, 65]));
    g_arrBluePlayer.push(g_factoryP.signing("blue", [9, 33, 44, 22, 11, 65]));

    // 绘制运动员
    for(var index in g_arrRedPlayer) {
        g_arrRedPlayer[index].show();
    }
    for(var index in g_arrBluePlayer) {
        g_arrBluePlayer[index].show();
    }

    // 绘制足球
    Football.getInstance().setPosition(Global.getInstance().getWidth() / 2, Global.getInstance().getHeight() / 2);
    Football.getInstance().show();

    // 控件属性初始化
    redAddRoll();
    blueAddRoll();
    document.getElementById("player_stop").disabled = "disabled";
    document.getElementById("football_stop").disabled = "disabled";
    Global.getInstance().MyLog("欢迎来到“足球小将”");

    // 红队面板事件绑定
    var objRed = document.getElementById("red_add");
    // 点击
    objRed.onclick = function(e) {
        var ev = e || window.event;
        var target = ev.event || ev.srcElement;
        if ("button" == target.nodeName.toLowerCase()) {
            switch (target.id) {
                case "red_roll":
                    console.log("roll");
                    redAddRoll();
                    break;
                case "red_sure":
                    redAddSure();
                    break;
                case "red_delete":
                    redAddDelete();
                    break;
                default:
                    break;
            }
        }
    }

    // 鼠标划入
    objRed.onmouseover = function(e) {
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

    // 鼠标划出
    objRed.onmouseout = function(e) {
        var ev = e || window.event;
        var target = ev.event || ev.srcElement;
        if ("img" == target.nodeName.toLowerCase()) {
            hideBecareful();
        }
    }

    // 蓝队面板事件绑定
    var objBlue = document.getElementById("blue_add");
    // 点击
    objBlue.onclick = function(e) {
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
                case "blue_delete":
                    blueAddDelete();
                    break;
                default:
                    break;
            }
        }
    }

    // 鼠标划入
    objBlue.onmouseover = function(e) {

    }

    // 鼠标划出
    objBlue.onmouseout = function(e) {

    }


    
    // 控制面板事件绑定
    var objDiv = document.getElementById("control");
    objDiv.onclick = function(e) {
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

    // 定时器
    setInterval(update, Global.getInstance().getBaseTime());        
}

// 球场刷新函数
function update() {
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

// 红队球员属性随机
function redAddRoll() {
    var nEmptyID = 1;
    var arrPlayerID = [];
    var objInput;


    // 获取空闲ID
    for (var index in g_arrRedPlayer) {
        arrPlayerID.push(g_arrRedPlayer[index].getID());
    }
    for (nEmptyID = 1; nEmptyID < 100; nEmptyID++) {
        if (arrPlayerID.indexOf(nEmptyID) < 0) {
            break;
        }
    }

    // ID
    objInput = document.getElementById("red_nID");
    objInput.value = nEmptyID;
    // 速度
    objInput = document.getElementById("red_nVNum");
    objInput.value = Math.floor(Math.random() * 98) + 1;
    // 爆发
    objInput = document.getElementById("red_nPower");
    objInput.value = Math.floor(Math.random() * 98) + 1;
    // 体力
    objInput = document.getElementById("red_nKeep");
    objInput.value = Math.floor(Math.random() * 98) + 1;
    // 力量
    objInput = document.getElementById("red_nStrong");
    objInput.value = Math.floor(Math.random() * 98) + 1;
    // 技巧
    objInput = document.getElementById("red_nSkill");
    objInput.value = Math.floor(Math.random() * 98) + 1;
    
}

// 红队球员确认增加
function redAddSure() {
    var arrPlayerID = [];
    var nID = parseInt(document.getElementById("red_nID").value);
    // ID 查重
    for (var index in g_arrRedPlayer) {
        arrPlayerID.push(parseInt(g_arrRedPlayer[index].getID()));
    }
    if (arrPlayerID.indexOf(nID) >= 0) {
        alert("红队球员编号重复，无法增加");
        return;
    }
    var nVNum = parseInt(document.getElementById("red_nVNum").value);
    var nPower = parseInt(document.getElementById("red_nPower").value);
    var nKeep = parseInt(document.getElementById("red_nKeep").value);
    var nStrong = parseInt(document.getElementById("red_nStrong").value);
    var nSkill = parseInt(document.getElementById("red_nSkill").value);
    g_arrRedPlayer.push(g_factoryP.signing("red",[nID, nVNum, nPower, nKeep, nStrong, nSkill]));

    // 重置属性
    redAddRoll();
}

// 红队球员确认删除
function redAddDelete() {
    var nID = parseInt(document.getElementById("red_nID").value);
    for (var index in g_arrRedPlayer) {
        if (nID == g_arrRedPlayer[index].getID()) {
            g_arrRedPlayer.splice(index, 1);
        }
    }
    alert("未找到ID为：" + nID + "的球员。");
}

// 蓝队球员属性随机
function blueAddRoll() {
    var nEmptyID = 1;
    var arrPlayerID = [];
    var objInput;

    // 获取空闲ID
    for (var index in g_arrBluePlayer) {
        arrPlayerID.push(g_arrBluePlayer[index].getID());
    }
    for (nEmptyID = 1; nEmptyID < 100; nEmptyID++) {
        if (arrPlayerID.indexOf(nEmptyID) < 0) {
            break;
        }
    }

    // ID
    objInput = document.getElementById("blue_nID");
    objInput.value = nEmptyID;
    // 速度
    objInput = document.getElementById("blue_nVNum");
    objInput.value = Math.floor(Math.random() * 98) + 1;
    // 爆发
    objInput = document.getElementById("blue_nPower");
    objInput.value = Math.floor(Math.random() * 98) + 1;
    // 体力
    objInput = document.getElementById("blue_nKeep");
    objInput.value = Math.floor(Math.random() * 98) + 1;
    // 力量
    objInput = document.getElementById("blue_nStrong");
    objInput.value = Math.floor(Math.random() * 98) + 1;
    // 技巧
    objInput = document.getElementById("blue_nSkill");
    objInput.value = Math.floor(Math.random() * 98) + 1;
    
}

// 蓝队球员确认增加
function blueAddSure() {
    var arrPlayerID = [];
    var nID = parseInt(document.getElementById("blue_nID").value);
    // ID 查重
    for (var index in g_arrBluePlayer) {
        arrPlayerID.push(parseInt(g_arrBluePlayer[index].getID()));
    }
    if (arrPlayerID.indexOf(nID) >= 0) {
        alert("蓝队球员编号重复，无法增加");
        return;
    }
    var nVNum = parseInt(document.getElementById("blue_nVNum").value);
    var nPower = parseInt(document.getElementById("blue_nPower").value);
    var nKeep = parseInt(document.getElementById("blue_nKeep").value);
    var nStrong = parseInt(document.getElementById("blue_nStrong").value);
    var nSkill = parseInt(document.getElementById("blue_nSkill").value);
    g_arrBluePlayer.push(g_factoryP.signing("blue",[nID, nVNum, nPower, nKeep, nStrong, nSkill]));

    // 重置属性
    blueAddRoll();
}

// 蓝队球员确认删除
function blueAddDelete() {
    var nID = parseInt(document.getElementById("blue_nID").value);
    for (var index in g_arrBluePlayer) {
        if (nID == g_arrBluePlayer[index].getID()) {
            g_arrBluePlayer.splice(index, 1);
        }
    }
    alert("未找到ID为：" + nID + "的球员。");
}

// 显示介绍项
function showBecareful(target, strName, strData1, strData2) {
    var obj = document.getElementById("frame_becareful");
    // 用于显示介绍框
    obj.style.display = "block";
    console.log(target.offsetLeft - 100);
    obj.style.setProperty("left", String(target.offsetLeft - 100) + "px");
    console.log(target.offsetTop + 10);
    obj.style.setProperty("top", String(target.offsetTop + 16) + "px");
    // 设置名字
    obj.getElementsByTagName("h4")[0].innerHTML = strName;
    // 设置介绍1
    obj.getElementsByTagName("div")[0].innerHTML = strData1;
    // 设置介绍2
    obj.getElementsByTagName("div")[1].innerHTML = strData2;

}

// 隐藏介绍项
function hideBecareful() {
    var obj = document.getElementById("frame_becareful");
    // 用于显示介绍框
    obj.style.display = "none";

    obj.style.setProperty("left", "-999px");
    obj.style.setProperty("top", "-999px");
}
