// 创建工厂对象
var factory = new FootballFieldFactory();
// 通过工厂生成一个世界杯足球场
var fbField = factory.building("WorldCup");
// 生成一个运动员对象
var arrPlayer = [];
arrPlayer.push(new Player(10, 10, 1));
arrPlayer.push(new Player(10, 120, 2));
arrPlayer.push(new Player(10, 240, 3));
arrPlayer.push(new Player(10, 360, 4));


// 主函数
window.onload = function() {
    // 控件属性初始化
    document.getElementById("player_stop").disabled = "disabled";
    document.getElementById("football_stop").disabled = "disabled";
    Global.getInstance().MyLog("欢迎来到“足球小将”");

    // 绘制足球场
    fbField.show();
    // 绘制运动员
    for(var index in arrPlayer) {
        arrPlayer[index].show();
    }
    // 绘制足球
    Football.getInstance().setPosition(300, 10);
    Football.getInstance().show();

    // 红队面板事件绑定

    // 蓝队面板事件绑定

    
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
                    
                    for(var index in arrPlayer) {
                        arrPlayer[index].run(0);
                    }
                    break;
                case "player_stop":
                    // 点击运动员、停止按钮
                    document.getElementById("player_start").disabled = "";
                    document.getElementById("player_stop").disabled = "disabled";
                    
                    for(var index in arrPlayer) {
                        arrPlayer[index].stop();
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


function update() {
    // 绘制足球场
    Global.getInstance().clearCanvas();
    fbField.show();
    for(var index in arrPlayer) {
        arrPlayer[index].update();
        arrPlayer[index].show();
    }
    // 绘制足球
    Football.getInstance().update();
    Football.getInstance().show();
}
