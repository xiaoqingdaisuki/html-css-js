//  canvas初始化 
//  <canvas id="canvas"></canvas>
//  var canvas = document.getElementById('canvas')
//  var context = canvas.getContext('2d')
var canvas = document.getElementById('demo1')
canvas.width = 1024
canvas.height = 768
var context = canvas.getContext('2d')
//  线条绘制 开始context.moveTo与结束context.lineTo
context.beginPath()
context.moveTo(10,10)
context.lineTo(10,90)
context.moveTo(10,10)
context.lineTo(90,10)
context.lineTo(10,90)
//  beginPath不一定与closePath同时出现, beginPath开始一个新的路径, closePath会在结束时连接非封闭线段
context.closePath()
//  线条宽度 context.lineWidth
context.lineWidth = 2
//  线条颜色 context.strokeStyle
context.strokeStyle = '#66ccff'
//  图形颜色填充 context.fillStyle与context.fill()
context.fillStyle='#ccc'
context.fill()
//  图形绘制 context.stroke()
context.stroke()
//  绘制圆形弧线 context.arc(centerX,centerY,radius,开始角度startingAngle,结束角度endingAngle,anticlockwise = false;) 
context.beginPath()
context.arc(140,50,40,0,2*Math.PI,false)
context.fillStyle = '#ccc'
//  fill填充
context.fill()
//  stroke绘制边框
context.stroke()
context.closePath()
//  demo1
for (var i = 0; i < 10; i++){
    context.beginPath()
    context.arc(50 + i*100,140,40,0,2*Math.PI*(i+1)/10,false)
    context.stroke()
    context.closePath()
}
for (var i = 0; i < 10; i++){
    context.beginPath()
    context.arc(50 + i*100,230,40,0,2*Math.PI*(i+1)/10,false)
    context.closePath()
    context.stroke()
}
for (var i = 0; i < 10; i++){
    context.beginPath()
    context.arc(50 + i*100,320,40,0,2*Math.PI*(i+1)/10,true)
    context.closePath()
    context.stroke()
}
for (var i = 0; i < 10; i++){
    context.beginPath()
    context.arc(50 + i*100,410,40,0,2*Math.PI*(i+1)/10,false)
    context.fill()
    context.stroke()
}
for (var i = 0; i < 5; i++){
    context.beginPath()
    context.arc(50 + i*80,500 + i*40,40 + i*10,0,2*Math.PI,false)
    context.fill()
    context.stroke()
}
//  绘制曲线
context.beginPath()
//  x0,y0为起点坐标,x1,y1为圆弧起点坐标,x2,y2为终点坐标
context.moveTo(600,500)
//  arcTo(x1,y1,x2,y2,radiusx横向半径,[纵向半径,旋转角度])
context.arcTo(800,500,800,700,100)
context.stroke()

context.beginPath()
context.arc(800,500,2,0,2*Math.PI,false)
context.fill()
context.stroke()

context.beginPath()
context.arc(800,700,2,0,2*Math.PI,false)
context.fill()
context.stroke()
//  画布动画初始化
window.onload = function(){
    // 设置画布基本属性
    let canvas = document.getElementById('demo2')
    let context = demo2.getContext('2d')
    demo2.width = window_width
    demo2.height = window_height
    curShowTimeSeconds = getCurShowTimeSeconds()
    // 倒计时动画函数
    setInterval(
        function(){
            ditgitrender(context)
            ditgitupdate()
        }, 50
    )
}
//  demo3垂直落体运动绘制 
    var ballcanvas = document.getElementById("demo3")
    ballcanvas.width = 800
    ballcanvas.height = 600
    var ballcxt = ballcanvas.getContext("2d")
    setInterval(
        function(){
            ballrender(ballcxt)
            ballupdate(ball)
        }, 50
    )

//  demo2数组处理图像绘制
let radius = 8
let margin_top = 100
let margin_left = 30
let window_width = 1024
let window_height = 768

const endTime = new Date(2018,3,1,00,00,00)
let curShowTimeSeconds = 0
let timeBall = []
const timeBallColor = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

//  距离显示时间还有多少秒
function getCurShowTimeSeconds(){
    let curTime = new Date()
    //  倒计时效果 let ret = endTime.getTime() - curTime.getTime() 
    //            ret = Math.round( ret/1000 )
    //  时钟效果 let ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds()
    let ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds()
    return ret >= 0 ? ret : 0
} 

//  动画更新函数
function ditgitupdate(){
    let nextShowTimeSeconds = getCurShowTimeSeconds()

    let nextHours = parseInt( nextShowTimeSeconds / 3600)
    let nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600) / 60)
    let nextSeconds = nextShowTimeSeconds % 60

    let curHours = parseInt( curShowTimeSeconds / 3600)
    let curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600) / 60)
    let curSeconds = curShowTimeSeconds % 60

    //  判断时间不同时生成不同颜色的小球
    if ( nextSeconds != curSeconds){
        if ( parseInt(curHours/10) != parseInt(nextHours/10)){
            addTimeBall ( margin_left + 0, margin_top, parseInt(curHours/10))
        }
        if ( parseInt(curHours%10) != parseInt(nextHours%10)){
            addTimeBall ( margin_left + 15*(radius+1), margin_top, parseInt(curHours/10))
        }
        if ( parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addTimeBall ( margin_left + 39*(radius+1), margin_top, parseInt(curMinutes/10))
        }
        if ( parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addTimeBall ( margin_left + 54*(radius+1), margin_top, parseInt(curMinutes%10))
        }
        if ( parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addTimeBall ( margin_left + 78*(radius+1), margin_top, parseInt(curSeconds/10))
        }
        if ( parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addTimeBall ( margin_left + 93*(radius+1), margin_top, parseInt(curSeconds%10))
        }
        curShowTimeSeconds = nextShowTimeSeconds
    }
    //  更新小球的动画
    updateBall();
    console.log(timeBall.length)
}

//  添加小球初始属性
function addTimeBall( x, y, num){
    for (var i = 0; i < digit[num].length ; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if ( digit[num][i][j] == 1){
                var aBall = {
                    x: x+j*2*(radius+1)+(radius+1),
                    y: y+i*2*(radius+1)+(radius+1),
                    g: 1+Math.random(),
                    vx: Math.pow( -1, Math.ceil(Math.random()*1000))*5,
                    vy: -5,
                    color: timeBallColor[Math.floor(Math.random()*timeBallColor.length)],
                }
                timeBall.push(aBall)
            }
}

//  小球运动以及碰撞检测
function updateBall(){
    for (var i = 0; i < timeBall.length; i++){
        timeBall[i].x += timeBall[i].vx
        timeBall[i].y += timeBall[i].vy
        timeBall[i].vy += timeBall[i].g

        if (timeBall[i].y >= window_height-radius) {
            timeBall[i].y = window_height - radius;
            timeBall[i].vy = - timeBall[i].vy*0.8;
        }
    }
    //  防止大量计算进行小球数组检测 前cnt的小球保留在画面中
    var cnt = 0
    for (var i = 0; i < timeBall.length; i++){
        if (timeBall[i].x + radius > 0 && timeBall[i].x - radius < window_width){
            timeBall[cnt++] = timeBall[i]
        }
    }
    while (timeBall.length > Math.min(300,cnt)){
        timeBall.pop()
    }
}

function ditgitrender(cxt){
    // context.clearRect对一个空间内的图像进行刷新操作
    cxt.clearRect(0, 0, window_width, window_height)

    let hours = parseInt( curShowTimeSeconds / 3600)
    let minutes = parseInt( (curShowTimeSeconds - hours * 3600) / 60)
    let seconds = curShowTimeSeconds % 60
    // 绘制小时
    renderDigit(margin_left, margin_top, parseInt(hours/10), cxt)
    renderDigit(margin_left + 15*(radius+1), margin_top , parseInt(hours%10), cxt)
    // 绘制冒号
    renderDigit(margin_left + 30*(radius+1), margin_top , 10, cxt)
    // 绘制分钟
    renderDigit(margin_left + 39*(radius+1), margin_top , parseInt(minutes/10), cxt)
    renderDigit(margin_left + 54*(radius+1), margin_top , parseInt(minutes%10), cxt)
    renderDigit(margin_left + 69*(radius+1), margin_top , 10, cxt)
    // 绘制秒钟
    renderDigit(margin_left + 78*(radius+1), margin_top , parseInt(seconds/10), cxt)
    renderDigit(margin_left + 93*(radius+1), margin_top , parseInt(seconds%10), cxt)
    // 绘制小球
    for (var i = 0; i < timeBall.length; i++){
        cxt.fillStyle = timeBall[i].color;
        cxt.beginPath()
        cxt.arc( timeBall[i].x, timeBall[i].y, radius, 0 ,2*Math.PI, true)
        cxt.closePath()
        cxt.fill()
    }
}

function renderDigit(x, y, num, cxt){
    cxt.fillStyle = "#66ccff"
    // 遍历数组 寻找符合条件的数字并输出
    for (let i = 0; i < digit[num].length; i++)
        for (let j = 0; j < digit[num][i].length ; j++)
            if(digit[num][i][j] == 1){
                cxt.beginPath()
                // 每个像素绘制圆形输出
                cxt.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1) , radius , 0 , 2*Math.PI)
                cxt.closePath()
                cxt.fill()
            }  
}

//  定义小球起始坐标和重力加速度以及水平竖直方向速度
var ball = { x:300, y:300, r:30, g:2, vx:4, vy:-20, color:"#66ccff"}
//  下落位移
function ballupdate(){
    ball.x += ball.vx
    ball.y += ball.vy
    ball.vy += ball.g

//  落地碰撞检测
    //下
    if( ball.y >= 600 - ball.r){
        ball.y = 600 - ball.r
        ball.vy = - ball.vy*1.05
    }
    //右
    if( ball.x >= 800 - ball.r){
        ball.x = 800 - ball.r
        ball.vx = - ball.vx*1.05
    }
    //上
    if( ball.y <= 0 + ball.r){
        ball.y = 0 + ball.r
        ball.vy = - ball.vy*0.8
    }
    //左
    if( ball.x <= 0 + ball.r){
        ball.x = 0 + ball.r
        ball.vx = - ball.vx*1.05
    }
}

function ballrender(cxt){
    cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height)
    cxt.fillStyle = ball.color
    cxt.beginPath()
    cxt.arc(ball.x , ball.y, ball.r, 0 , 2*Math.PI)
    cxt.closePath()
    cxt.fill()
}

//  绘制横向渐变图像
var gradientcanvas = document.getElementById("demo4")
gradientcanvas.width = 1024
gradientcanvas.height = 768
var gradientcontext = gradientcanvas.getContext("2d")
//  设置渐变起始坐标X1,Y1以及结束坐标X2,Y2
var g1 = gradientcontext.createLinearGradient(0,0,0,400)
//  追加渐变的颜色,接受2个参数,0-1的偏移量和颜色值.
g1.addColorStop(0,"rgb(255,255,0)")
g1.addColorStop(0.5,"rgb(128,128,128)")
g1.addColorStop(1,"rgb(0,255,255)")
gradientcontext.fillStyle = g1
gradientcontext.fillRect(0,0,640,480)
var g2 = gradientcontext.createLinearGradient(0,0,300,0)
g2.addColorStop(0,"rgba(0,0,255,0.5)")
g2.addColorStop(1,"rgba(255,0,0,0.2)")
for (var i = 0; i < 10; i++){
    gradientcontext.beginPath()
    gradientcontext.fillStyle = g2
    gradientcontext.arc(i*50, i*35, i*15, 0, Math.PI*2,false)
    gradientcontext.closePath()
    gradientcontext.fill()
}
//  绘制径向渐变图像
gradientcontext.beginPath()
var g3 = gradientcontext.createRadialGradient(600,700,0,600,700,400)
g3.addColorStop(0.1,"rgb(255,255,0)")
g3.addColorStop(0.3,"rgb(255,0,255)")
g3.addColorStop(1,"rgb(0,255,255)")
context.fillStyle =  g3;
context.fillRect(500,500,600,600)
//  起点圆心X,起点圆心Y,起点半径R1,结束圆心X,结束圆心Y,结束半径R2
var g4 = gradientcontext.createRadialGradient(650,650,0,800,650,200)
g4.addColorStop(0.1,"rgba(255,0,0,0.5)")
g4.addColorStop(0.7,"rgba(255,255,0,0.5)")
g4.addColorStop(1,"rgba(0,0,255,0.5)")
for (var i = 0; i < 10; i++){
    gradientcontext.beginPath()
    gradientcontext.fillStyle = g4
    gradientcontext.arc(450+i*50, 450+i*35, i*15, 0, Math.PI*2,false)
    gradientcontext.closePath()
    gradientcontext.fill()
}

//  绘制坐标变换图像
var translatecanvas = document.getElementById("demo5")
translatecanvas.width = 1024
translatecanvas.height = 768
var translatecontext = translatecanvas.getContext("2d")
//  图形绘制第一个起始点
translatecontext.translate(400,100)
translatecontext.fillStyle = "rgba(255,0,0,0.25)"
for (var i = 0; i < 50; i++){
    //  平移多少单位,将X,Y分别向左向下平移
    translatecontext.translate(40,40)
    //  放大图形,将X,Y分别按倍数扩大
    translatecontext.scale(0.95,0.95)
    //  旋转图形 接受一个旋转的角度作为参数
    translatecontext.rotate(Math.PI / 10)
    translatecontext.fillRect(0,0,120,50)
}

//  绘制多边形坐标变换
for (var i = 0; i < 50; i++){
    //  平移多少单位,将X,Y分别向左向下平移
    translatecontext.translate(50,50)
    //  放大图形,将X,Y分别按倍数扩大
    translatecontext.scale(1.05,1.05)
    //  旋转图形 接受一个旋转的角度作为参数
    translatecontext.rotate(Math.PI / 10)
    createStar(translatecontext)
    translatecontext.fill()
}
function createStar(ctx){
    var dx = 100
    var dy = 100
    var s = 50
    //  创建路径
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,0,0,0.5)"
    var x = Math.sin(0)
    var y = Math.cos(0)
    var dig = Math.PI / 5 * 4
    for (var i = 0; i < 5; i++){
        var x = Math.sin(i*dig)
        var y = Math.cos(i*dig)
        ctx.lineTo(dx+x*s, dy+y*s)
    }
    ctx.closePath()
}