////////////////////////////////////////////////////////////////////////////////
// 工厂类
////////////////////////////////////////////////////////////////////////////////
var FootballFieldFactory = function() { };

FootballFieldFactory.prototype = {
    building : function (mode) {
        var fbField;
        switch (mode) {
            case "WorldCup":
                fbField = new FootballField(105, 68);
                // fbField = new FootballField(400, 1000);
                break;
        
            default:
                break;
        }
        return fbField;
    }
}

////////////////////////////////////////////////////////////////////////////////
// 足球场类
////////////////////////////////////////////////////////////////////////////////
function FootballField(X, Y) {
    ////////////////////////////////////////////////////////////////////////////////
    // private:
    ////////////////////////////////////////////////////////////////////////////////

    // public:


    ////////////////////////////////////////////////////////////////////////////////
    // private:
    // 绘制足球场
    ////////////////////////////////////////////////////////////////////////////////
    function draw() {
        var nStartX = Global.getInstance().getStartX();
        var nStartY = Global.getInstance().getStartY();
        var nWidth = Global.getInstance().getWidth();
        var nHeight = Global.getInstance().getHeight();
        var canvas = Global.getInstance().getCanvas();
        var fScale = Global.getInstance().getScale();
        var ctx = canvas.getContext("2d");

        // 绘制足球场底色
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.stroke();

        // 绘制足球场轮廓
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "white";
        ctx.rect(nStartX, nStartY, nWidth, nHeight);
        ctx.stroke();

        // 绘制足球场中线
        ctx.beginPath();
        ctx.moveTo(nStartX + (nWidth / 2), nStartY);
        ctx.lineTo(nStartX + (nWidth / 2), nStartY + nHeight);
        ctx.stroke();
        
        // 绘制足球场中间圆形 半径9.15米
        ctx.beginPath();
        ctx.arc(nStartX + (nWidth / 2), nStartY + (nHeight / 2), 
                 9.15 * fScale, 0 , 2 * Math.PI);
        ctx.stroke();

        // 绘制左上角球区 半径1米
        ctx.beginPath();
        ctx.arc(nStartX, nStartY, 
                1 * fScale, 0, 0.5 * Math.PI);
        ctx.stroke();

        // 绘制右上角球区 半径1米
        ctx.beginPath();
        ctx.arc(nStartX + nWidth, nStartY, 
                1 * fScale, 0.5 * Math.PI, 1 * Math.PI);
        ctx.stroke();

        // 绘制右下角球区 半径1米
        ctx.beginPath();
        ctx.arc(nStartX + nWidth, nStartY + nHeight, 
                1 * fScale, 1 * Math.PI, 1.5 * Math.PI);
        ctx.stroke();

        // 绘制左下角球区 半径1米
        ctx.beginPath();
        ctx.arc(nStartX, nStartY + nHeight, 
                1 * fScale, 1.5 * Math.PI, 2 * Math.PI);
        ctx.stroke();

        // 弧顶 罚球点半径9.15米
        // 左
        ctx.beginPath();
        ctx.arc(nStartX + (11 * fScale), nStartY + (nHeight / 2), 9.15 * fScale, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillRect(nStartX, nStartY + (nHeight / 2) - (20.16 * fScale), 16.5 * fScale, 40.32 * fScale);
        ctx.fill();
        // 右
        ctx.beginPath();
        ctx.arc(nStartX + nWidth - (11 * fScale), nStartY + (nHeight / 2), 9.15 * fScale, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillRect(nStartX + nWidth - (16.5 * fScale), nStartY + (nHeight / 2) - (20.16 * fScale), 16.5 * fScale, 40.32 * fScale);
        ctx.fill();

        // 绘制球门 两根柱子之间的距离是7.32米  = 3.66m
        // 左
        ctx.beginPath();
        ctx.rect(nStartX - (1 * fScale), nStartY + (nHeight / 2) - (3.66 * fScale), 1 * fScale, 7.32 * fScale);
        ctx.stroke();
        // 右
        ctx.beginPath();
        ctx.rect(nStartX + nWidth, nStartY + (nHeight / 2) - (3.66 * fScale), 1 * fScale, 7.32 * fScale);
        ctx.stroke();

        // 绘制球门区 5.5米 * （7.32 + (5.5 * 2)）
        // 左 3.66 + 5.5
        ctx.beginPath();
        ctx.rect(nStartX, nStartY + (nHeight / 2) -  (9.16 * fScale), 5.5 * fScale, 18.32 * fScale);
        ctx.stroke();
        // 右
        ctx.beginPath();
        ctx.rect(nStartX + nWidth - (5.5 * fScale), nStartY + (nHeight / 2) - (9.16 * fScale), 5.5 * fScale, 18.32 * fScale);
        ctx.stroke();

        // 绘制罚球区 16.5米 * (7.32 + (16.5 * 2))
        // 左 3.66 + 16.5
        ctx.beginPath();
        ctx.rect(nStartX, nStartY + (nHeight / 2) - (20.16 * fScale), 16.5 * fScale, 40.32 * fScale);
        ctx.stroke();
        // 右
        ctx.beginPath();
        ctx.rect(nStartX + nWidth - (16.5 * fScale), nStartY + (nHeight / 2) - (20.16 * fScale), 16.5 * fScale, 40.32 * fScale);
        ctx.stroke();

        // 罚球点 11米
        // 左
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(nStartX + (11 * fScale), nStartY + (nHeight / 2), 2, 0, 2 * Math.PI);
        ctx.fill();
        // 右
        ctx.beginPath();
        ctx.arc(nStartX + nWidth - (11 * fScale), nStartY + (nHeight / 2), 2, 0, 2 * Math.PI);
        ctx.fill();

        // 长度 数值
        ctx.fillText(X + "m", nStartX + (nWidth / 2) - 10, nStartY - 10);
        ctx.fillText(X + "m", nStartX + (nWidth / 2) - 10, nStartY + nHeight + 17);
        // 宽度 数值
        ctx.save();
        ctx.translate(nStartX - 20, nStartY + (nHeight / 2) + 10);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(Y + "m", 0, 0);
        ctx.restore();
        ctx.save();
        ctx.translate(nStartX + nWidth + 20, nStartY + (nHeight / 2) - 10);
        ctx.rotate(Math.PI / 2);
        ctx.fillText(Y + "m", 0, 0);
        ctx.restore();
        
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    // public:
    // 确认足球场尺寸
    ////////////////////////////////////////////////////////////////////////////////
    this.show = function() {
        var bg = document.getElementById("bg");
        var canvas = document.getElementById("footballfield");

        var fXY = X / Y;
        var fbgXY = bg.offsetWidth / bg.offsetHeight;
        var fScale = 0;
        var nStartX = Global.getInstance().getStartX();
        var nStartY = Global.getInstance().getStartY();

        // 足球场宽高
        var nWidth;
        var nHeight;
        if (fbgXY < fXY) {
            var nWidth = bg.offsetWidth - (nStartX * 2);
            var nHeight = nWidth / fXY;
            fScale = nWidth / X;

        } else {
            var nHeight = bg.offsetHeight - (nStartY * 2);
            var nWidth = nHeight * fXY;
            fScale = nHeight / Y;
        }

        // 画布宽高
        canvas.width = nWidth + (nStartX * 2);
        canvas.height = nHeight + (nStartY * 2);
        
        if (canvas.getContext) {
            // 该浏览器支持canvas
            // 将计算值给Global类
            Global.getInstance().setScale(fScale);
            Global.getInstance().setWidth(nWidth);
            Global.getInstance().setHeight(nHeight);
            Global.getInstance().setGoalPosition([nStartX, nStartY + (nHeight / 2)], [nStartX + nWidth, nStartY + (nHeight / 2)]);

            // 绘制足球场
            draw();

        } else {
            // 该浏览器不支持canvas
            
        }
    }

}