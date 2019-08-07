////////////////////////////////////////////////////////////////////////////////
// 函   数：initTeam
// 功   能：每队初始化三名队员、并将它们绘制出来
////////////////////////////////////////////////////////////////////////////////
function initTeam() {
    // 生成运动员
    g_arrRedPlayer.push(g_factoryP.signing("red",[1, 96, 72, 45, 53, 79]));
    g_arrRedPlayer.push(g_factoryP.signing("red",[3, 82, 49, 15, 60, 81]));
    g_arrRedPlayer.push(g_factoryP.signing("red",[6, 98, 52, 94, 93, 69]));

    g_arrBluePlayer.push(g_factoryP.signing("blue", [2, 53, 44, 22, 62, 96]));
    g_arrBluePlayer.push(g_factoryP.signing("blue", [4, 73, 99, 72, 81, 57]));
    g_arrBluePlayer.push(g_factoryP.signing("blue", [10, 63, 54, 36, 65, 78]));

    // 绘制运动员
    for(var index in g_arrRedPlayer) {
        g_arrRedPlayer[index].show();
    }
    for(var index in g_arrBluePlayer) {
        g_arrBluePlayer[index].show();
    }
}

////////////////////////////////////////////////////////////////////////////////
// 函   数：updateScore
// 功   能：读取两队分数，通过查找、并且操作DOM，将比分现实出来
////////////////////////////////////////////////////////////////////////////////
function updateScore() {
    var objRed = document.getElementById("red");
    var objH3 = objRed.getElementsByTagName("h3");
    objH3[0].innerHTML = "红队状况 比分：" + Global.getInstance().getRedScore();
    var objBlue = document.getElementById("blue");
    var objH3 = objBlue.getElementsByTagName("h3");
    objH3[0].innerHTML = "蓝队状况 比分：" + Global.getInstance().getBlueScore();
    
}

////////////////////////////////////////////////////////////////////////////////
// 函   数：isRightfulData
// 功   能：添加队员时，检测输入的属性是否为合法数据
// 参   数：HTMLElement : target
// 返回 值：true : 数值合法
//         false : 数值非法
////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////
// 函   数：redTeamShow
// 功   能：将红队的所有球员通过按钮的形式显示出来。
////////////////////////////////////////////////////////////////////////////////
function redTeamShow() {
    var objDiv = document.getElementById("red_players");
    // 清空显示
    objDiv.innerHTML = "";
    for (var index in g_arrRedPlayer) {
        var objBtn = document.createElement("button");
        objBtn.innerHTML = g_arrRedPlayer[index].getID();
        objDiv.appendChild(objBtn);
    }
}

////////////////////////////////////////////////////////////////////////////////
// 函   数：blueTeamShow
// 功   能：将蓝队的所有球员通过按钮的形式显示出来。
////////////////////////////////////////////////////////////////////////////////
function blueTeamShow() {
    var objDiv = document.getElementById("blue_players");
    // 清空显示
    objDiv.innerHTML = "";
    for (var index in g_arrBluePlayer) {
        var objBtn = document.createElement("button");
        objBtn.innerHTML = g_arrBluePlayer[index].getID();
        objDiv.appendChild(objBtn);
    }
}

////////////////////////////////////////////////////////////////////////////////
// 函   数：redAddRoll
// 功   能：红队球员属性随机按钮响应函数
////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////
// 函   数：redAddSure
// 功   能：红队球员确认增加按钮响应函数
////////////////////////////////////////////////////////////////////////////////
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
    // 刷新显示模块
    redTeamShow();
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

////////////////////////////////////////////////////////////////////////////////
// 函   数：blueAddRoll
// 功   能：蓝队球员属性随机按钮响应函数
////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////
// 函   数：blueAddSure
// 功   能：蓝队球员确认增加按钮响应函数
////////////////////////////////////////////////////////////////////////////////
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

    blueTeamShow();
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

////////////////////////////////////////////////////////////////////////////////
// 函   数：showBecareful
// 功   能：鼠标移入介绍区消息响应函数，弹出介绍框，并且介绍对应属性作用，以及预计能力指标。
// 参   数：DOM Element : target 为获取介绍区位置
//         string : strName
//         string : strData1
//         string : strData2
////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////
// 函   数：hideBecareful
// 功   能：隐藏介绍框
////////////////////////////////////////////////////////////////////////////////
function hideBecareful() {
    var obj = document.getElementById("frame_becareful");
    // 用于显示介绍框
    obj.style.display = "none";

    obj.style.setProperty("left", "-999px");
    obj.style.setProperty("top", "-999px");
}
