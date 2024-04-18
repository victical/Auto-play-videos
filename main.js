auto.waitFor();

console.show(); // 显示悬浮窗（需要先打开悬浮窗权限）
sleep(1000); 
console.log("准备就绪！");
// 关闭青少年模式

// 进入赚钱页面

// goMakeMoney();

// 定义随机滑动和点击操作的次数
var actionCount = 500;
console.log("开始刷视频");

// 获取屏幕尺寸
var screenWidth = device.width;
var screenHeight = device.height;

// 打开短视频应用（示例中假设短视频应用已经在前台运行）
for (var i = 0; i < actionCount; i++) {
    console.log("已执行：" + (i + 1)+"次"); // 输出已循环次数
    // 随机选择滑动的方向
    var direction = random(1, 20);
    var DoubleClick = random(1, 30);
    var CommentAndReturn = random(1, 40);
    // console.log("双击"+DoubleClick);
    // console.log("评论"+CommentAndReturn);
    // 从下往上滑
    if (direction > 5) {
        // 随机生成滑动的起始点和终点坐标
        var startX = random(600, 800);
        var startY = random(2100, 2400);
        var endX = random(1100, 1200);
        var endY = random(1100, 1300);

        // 随机生成滑动的持续时间
        var duration = random(200, 210);
        // console.log(duration)
        // 执行贝塞尔曲线滑动操作
        bezierSlide(startX, startY, endX, endY, duration);
        // 随机等待一段时间，模拟用户观看视频的过程
        var waitTime = random(3000, 12000);
        sleep(waitTime);
        // console.log("下一个");
    }

    if (direction <= 3) {
        // 从上往下滑
        // 随机生成滑动的起始点和终点坐标
        var endX = random(600, 800);
        var endY = random(2100, 2400);
        var startX = random(1100, 1200);
        var startY = random(1100, 1300);
        // 随机生成滑动的持续时间
        var duration = random(200, 210);
        // 执行贝塞尔曲线滑动操作
        randomSlideDown(startX, startY, endX, endY, duration);
        // 随机等待一段时间，模拟用户观看视频的过程
        var waitTime = random(2000, 5000);
        sleep(waitTime);
        // console.log("上一个");
    }

    if (DoubleClick <= 3) {
        // 双击
        randomDoubleClick();
    }

    if (CommentAndReturn == 5) {
        // 查看评论
        clickCommentAndReturn();
    }
}

// 封装贝塞尔曲线滑动操作的函数,下一个视频
function bezierSlide(startX, startY, endX, endY, duration) {
    // 随机生成贝塞尔曲线控制点
    var controlX1 = startX + random(80, 120);
    var controlY1 = startY + random(-150, -251);
    var controlX2 = endX + random(-50, -80);
    var controlY2 = endY + random(150, 260);
    // 执行贝塞尔曲线滑动操作
    gesture(duration, [startX, startY], [controlX1, controlY1], [controlX2, controlY2], [endX, endY]);
    // console.log([startX, startY], [controlX1, controlY1], [controlX2, controlY2], [endX, endY]);
}

// 上一个视频
function randomSlideDown(startX, startY, endX, endY, duration) {
    // 随机生成贝塞尔曲线控制点
    var controlX1 = startX + random(80, 120);
    var controlY1 = startY + random(-150, -251);
    var controlX2 = endX + random(-50, -80);
    var controlY2 = endY + random(150, 260);
    // 执行贝塞尔曲线滑动操作
    gesture(duration, [startX, startY], [controlX1, controlY1], [controlX2, controlY2], [endX, endY]);
    // console.log([startX, startY], [controlX1, controlY1], [controlX2, controlY2], [endX, endY]);
}

// 随机双击屏幕的函数，范围为屏幕的40%到60%
function randomDoubleClick() {
    // 计算范围
    var rangeWidth = device.width * 0.2; // 宽度范围为屏幕宽度的20%
    var rangeHeight = device.height * 0.2; // 高度范围为屏幕高度的20%
    var startX = device.width * 0.4; // 起始X坐标为屏幕宽度的40%
    var startY = device.height * 0.4; // 起始Y坐标为屏幕高度的40%

    // 随机生成双击位置
    var x = random(startX, startX + rangeWidth);
    var y = random(startY, startY + rangeHeight);

    // 第一次点击
    click(x, y);
    sleep(random(50, 100)); // 随机等待一段时间
    // 第二次点击
    click(x, y);
    sleep(1000)
    // console.log("双击了(" + x + ", " + y + ")");
}

// 点击评论并停留一段时间后触发返回的函数
function clickCommentAndReturn() {
    // console.log("查看评论并返回");
    // 随机生成点击位置，范围为 (1300, 2100, 1380, 2030)
    var x = random(1300, 1380);
    var y = random(2100, 2030);

    // 点击评论按钮
    click(x, y);
    sleep(100);
    // 在评论界面停留一段时间
    var commentDuration = random(2000, 5000); // 随机停留时间
    sleep(commentDuration);
    if (commentDuration > 3000) {
        // 触发滑动
        bezierSlide(x, y, x + random(-50, 50), y + random(-50, 50), 200);
        // console.log("评论区触发了滑动");
        sleep(200);
        randomClickUpperHalf();
    }
}

// 随机点击屏幕上半部分的函数
function randomClickUpperHalf() {
    back();
    // 计算范围
    // var rangeWidth = device.width/1.5; // 宽度范围为整个屏幕宽度
    // var rangeHeight = device.height / 3; // 高度范围为屏幕高度的一半
    // var startX = 500; // 起始X坐标为屏幕最左边
    // var startY = 200; // 起始Y坐标为屏幕最上边

    // // 随机生成点击位置，限定在屏幕的上半部分
    // var x = random(startX, startX + rangeWidth);
    // var y = random(startY, startY + rangeHeight);

    // // 执行点击操作
    // click(x, y);
    // console.log("点击了屏幕上半部分的位置：(" + x + ", " + y + ")");
    sleep(200);
}


// 去赚钱
function goMakeMoney() {
    // 指定元素的边界坐标
    var elementBounds = bounds(864, 2949, 1152, 3120).findOne();
    // 点击指定边界内的元素
    elementBounds.click();
    console.log("点击了去赚钱");
    // 找到领现金点击返回
    if(text("领现金").findOne()){
        back();
        sleep(3000);
        elementBounds.click();
        console.log("点击了去赚钱");
        // 点击宝箱
        className("android.widget.Image").findOne().click();
        sleep(1000)
        click(1340,590)
        // console.log("点击了宝箱");
    }else{
        // 点击宝箱
        className("android.widget.Image").findOne().click();
        sleep(1000)
        click(1340,590)
        // console.log("点击了宝箱");
    }
}