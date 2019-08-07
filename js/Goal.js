function Goal() {
    this.instance = null;
    var m_bShow = false;

    // 设置是否展示
    this.setShow = function(bShow) {
        m_bShow = bShow;
    }

    // 展示
    this.show = function() {
        if (m_bShow) {
            var global = Global.getInstance();
            var ctx = global.getCanvas().getContext("2d");
            ctx.beginPath();
            ctx.font = "80px bold 黑体";
            ctx.strokeStyle = "red";
            ctx.fillStyle = "yellow";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Goal!!!", global.getStartX() + global.getWidth() / 2, global.getStartY() + global.getHeight() / 2 - 40);
            ctx.stroke();
        }
    }
}

Goal.getInstance = function() {
    if (!this.instance) {
        this.instance = new Goal();
    }
    return this.instance;
}