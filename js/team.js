// 初始化球队情况
function initTeam() {
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
}

// 检测是否为合法数据
function isRightfulData(target) {
    var nData = target.value;
    var jsonName = {"nVNum": "速度值：", 
                    "nPower": "爆发力：", 
                    "nKeep": "体力值：", 
                    "nStrong": "力量值：", 
                    "nSkill": "技巧值："};
    // console.log(nData);
    if (isNaN(nData)) {
        target.value = 50;
        alert(jsonName[target.name] + "请输入合法数值。");
        return false;
    } else if (nData > 99) {
        target.value = 99;
        alert(jsonName[target.name] + "属性最大为99。");
        return false;
    } else if (nData < 1) {
        target.value = 1;
        alert(jsonName[target.name] + "属性最小为1。");
        return false;
    }

    return true;
}

// 红队球员显示
function redTeamShow() {
    var objDiv = document.getElementById("red_players");
    objDiv.innerHTML = "";
    for (var index in g_arrRedPlayer) {
        var objBtn = document.createElement("button");
        objBtn.innerHTML = g_arrRedPlayer[index].getID();
        objDiv.appendChild(objBtn);
    }
}

// 蓝队球员显示
function blueTeamShow() {

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
    if (!isRightfulData(document.getElementById("red_nVNum"))) {
        return;
    }
    var nPower = parseInt(document.getElementById("red_nPower").value);
    if (!isRightfulData(document.getElementById("red_nPower"))) {
        return;
    }
    var nKeep = parseInt(document.getElementById("red_nKeep").value);
    if (!isRightfulData(document.getElementById("red_nKeep"))) {
        return;
    }
    var nStrong = parseInt(document.getElementById("red_nStrong").value);
    if (!isRightfulData(document.getElementById("red_nStrong"))) {
        return;
    }
    var nSkill = parseInt(document.getElementById("red_nSkill").value);
    if (!isRightfulData(document.getElementById("red_nSkill"))) {
        return;
    }
    // 添加
    g_arrRedPlayer.push(g_factoryP.signing("red",[nID, nVNum, nPower, nKeep, nStrong, nSkill]));

    // 重置属性
    redAddRoll();
}

// // 红队球员确认删除
// function redAddDelete() {
//     var nID = parseInt(document.getElementById("red_nID").value);
//     for (var index in g_arrRedPlayer) {
//         if (nID == g_arrRedPlayer[index].getID()) {
//             g_arrRedPlayer.splice(index, 1);
//         }
//     }
//     alert("未找到ID为：" + nID + "的球员。");
// }

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
        alert("红队球员编号重复，无法增加");
        return;
    }
    var nVNum = parseInt(document.getElementById("blue_nVNum").value);
    if (!isRightfulData(document.getElementById("blue_nVNum"))) {
        return;
    }
    var nPower = parseInt(document.getElementById("blue_nPower").value);
    if (!isRightfulData(document.getElementById("blue_nPower"))) {
        return;
    }
    var nKeep = parseInt(document.getElementById("blue_nKeep").value);
    if (!isRightfulData(document.getElementById("blue_nKeep"))) {
        return;
    }
    var nStrong = parseInt(document.getElementById("blue_nStrong").value);
    if (!isRightfulData(document.getElementById("blue_nStrong"))) {
        return;
    }
    var nSkill = parseInt(document.getElementById("blue_nSkill").value);
    if (!isRightfulData(document.getElementById("blue_nSkill"))) {
        return;
    }

    // 添加
    g_arrBluePlayer.push(g_factoryP.signing("blue",[nID, nVNum, nPower, nKeep, nStrong, nSkill]));

    // 重置属性
    blueAddRoll();
}

// // 蓝队球员确认删除
// function blueAddDelete() {
//     var nID = parseInt(document.getElementById("blue_nID").value);
//     for (var index in g_arrBluePlayer) {
//         if (nID == g_arrBluePlayer[index].getID()) {
//             g_arrBluePlayer.splice(index, 1);
//         }
//     }
//     alert("未找到ID为：" + nID + "的球员。");
// }

// 显示介绍项
function showBecareful(target, strName, strData1, strData2) {
    var obj = document.getElementById("frame_becareful");
    // 用于显示介绍框
    obj.style.display = "block";
    obj.style.setProperty("left", String(target.offsetLeft - 100) + "px");
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
