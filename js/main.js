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

    // 绘制足球 
    Football.getInstance().setPosition(Global.getInstance().getWidth() / 2, Global.getInstance().getHeight() / 2);
    Football.getInstance().show();

    // 初始化球队情况
    initTeam();

    // 绘制得分特效
    Goal.getInstance().show();

    // 控件属性初始化
    redAddRoll();
    blueAddRoll();
    redTeamShow();
    blueTeamShow();

    document.getElementById("player_stop").disabled = "disabled";
    // document.getElementById("football_stop").disabled = "disabled";
    Global.getInstance().MyLog("欢迎来到“足球小将”");

    // 红队增加面板事件绑定
    var objRed = document.getElementById("red_add");
    // 红队鼠标点击
    objRed.addEventListener("click", function(e) {eventRedClick(e);});
    // 红队鼠标划入
    objRed.addEventListener("mouseover", function(e) {eventRedMouseOver(e);});
    // 红队鼠标划出
    objRed.addEventListener("mouseout", function(e) {eventRedMouseOut(e);});
    
    // 红队队员面板事件绑定
    var objRedPlayers = document.getElementById("red_players");
    // 红队队员点击
    objRedPlayers.addEventListener("click", function(e) {eventRedPlayersClick(e);});
    
    // 蓝队增加面板事件绑定
    var objBlue = document.getElementById("blue_add");
    // 蓝队点击
    objBlue.addEventListener("click", function(e) {eventBlueClick(e);});
    // 蓝队鼠标划入
    objBlue.addEventListener("mouseover", function(e) {eventBlueMouseOver(e);});
    // 蓝队鼠标划出
    objBlue.addEventListener("mouseout", function(e) {eventBlueMouseOut(e);});

    // 蓝队队员面板事件绑定
    var objBluePlayers = document.getElementById("blue_players");
    // 蓝队队员点击
    objBluePlayers.addEventListener("click", function(e) {eventBluePlayersClick(e);});    

    // 控制面板事件绑定
    var objDiv = document.getElementById("control");
    // 控制面板点击
    objDiv.addEventListener("click", function(e) {eventControlClick(e);});
    

    // 定时器
    setInterval(timerUpdate, Global.getInstance().getBaseTime());        
}

