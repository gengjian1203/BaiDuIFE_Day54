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
    document.getElementById("stop").disabled = "disabled";

    // 绘制足球场
    fbField.show();
    for(var index in arrPlayer) {
        arrPlayer[index].show();
    }

    // 事件绑定
    var objDiv = document.getElementById("control");
    objDiv.onclick = function(e) {
        var ev = e || window.event;
        var target = ev.event || ev.srcElement;
        if ("button" == target.nodeName.toLowerCase()) {
            switch (target.id) {
                case "start":
                    console.log("start.");
                    document.getElementById("start").disabled = "disabled";
                    document.getElementById("stop").disabled = "";
                    
                    for(var index in arrPlayer) {
                        arrPlayer[index].run(50);
                    }
                    break;
                case "stop":
                    console.log("stop.");
                    document.getElementById("start").disabled = "";
                    document.getElementById("stop").disabled = "disabled";
                    
                    for(var index in arrPlayer) {
                        arrPlayer[index].stop();
                    }
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
}