// window.onload复用
function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func;
    } else {
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

// 在某元素之后插入一个新的元素
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        // 如果不是最后一个子元素,则插入到目标元素与目标元素下一个元素之间.nextSibling可以获取目标元素的下一个元素.
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

// 定位元素
function positonMessage(){
    if (!document.getElementById) return false;
    if (!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    elem.style.position = "absolute";
    elem.style.left = "100px";
    elem.style.top = "250px";
    var elem2 = document.getElementById("message2");
    elem2.style.position = "absolute";
    elem2.style.left = "100px";
    elem2.style.top = "100px";
    // 在这里movement并没有var声明 所以它是一个全局变量 可以被该函数之外的函数使用 实际工作中要尽量避免全局变量防止产生不可控的错误
    // movement = setTimeout("moveMessage()",1000)
}

// 抽象移动函数
function moveElement(elem,x,y,interval){
    if (!document.getElementById) return false;
    if (!document.getElementById(elem)) return false;
    var e = document.getElementById(elem);
    // 这里为元素创建了一个属性element.property = value 检测对于已经拥有属性的元素进行clearTimeout操作
    if (e.movement){
        clearTimeout(e.movement);
    }
    // 检测元素默认style
    if (!e.style.left){
        e.style.left = "0px";
    }
    if (!e.style.top){
        e.style.top = "0px";
    }
    var xpos = parseInt(e.style.left);
    var ypos = parseInt(e.style.top);
    var dist;
    if (xpos == x && ypos == y){
        return true;
    }
    // 1px得移动虽然平滑但是速度缓慢,可以通过增减前进距离得百分比来加快运动速度 例如x每次改变为总距离的1/30 y每次改变为1px
    if (xpos < x){
        dist = Math.ceil((x - xpos)/30);
        xpos = xpos + dist;
    }
    if (xpos > x){
        dist = Math.ceil((xpos - x)/30);
        xpos = xpos - dist;
    }
    if (ypos < y){
        ypos++;
    }
    if (ypos > y){
        ypos--;
    }
    e.style.left = xpos + "px";
    e.style.top = ypos + "px";
    var repeat = "moveElement('"+elem+"',"+x+","+y+","+interval+")";
    // 这里为元素赋予一个 移动 的属性
    e.movement = setTimeout(repeat,interval);
}

// 绑定按钮点击事件
function startMove(){
    if (!document.getElementById) return false;
    if (!document.getElementById("btn")) return false;
    // <button> 这个按钮放在 form 中也会点击自动提交，比前两个的优点是按钮的内容不光可以有文字，还可以有图片等多媒体内容.缺点是不同的浏览器得到的value值不同；可能还有其他的浏览器兼容问题.
    var btn = document.getElementById("btn");
    // <input type="button" /> 这就是一个按钮。如果你不写javascript 的话，按下去什么也不会发生。
    var btn2 = document.getElementById("btn2")
    btn.onclick = function(){
        moveElement("message",250,100,20)
        moveElement("message2",250,250,20)
    }
    btn2.onclick = function(){
        moveElement("message",250,100,20)
        moveElement("message2",250,250,20)
    }
}

// 鼠标滑动显示overflow隐藏内容函数
function prepareSlideshow(){
    // 对象检测
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("linklist")) return false;
    // 创建元素
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src","images/select.png");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    var list = document.getElementById("linklist")
    insertAfter(slideshow,list);
    // 取得列表中链接
    var links = list.getElementsByTagName("a");
    // 添加mouseover动画
    links[0].onmouseover = function(){
        moveElement("preview",0,0,10);
    }
    links[1].onmouseover = function(){
        moveElement("preview",-100,0,10);
    }
    links[2].onmouseover = function(){
        moveElement("preview",-220,0,10);
    }
}

addLoadEvent(positonMessage)
addLoadEvent(startMove)
addLoadEvent(prepareSlideshow)