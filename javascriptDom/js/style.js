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

// 通过JS根据节点树位置给标签设置样式
function styleElement(tag,theclass){
    if (!document.getElementsByTagName) return false;
    var headers = document.getElementsByTagName(tag);
    var elem;
    for (var i=0; i>headers.length; i++){
        elem = getNextElement(headers[i].nextSibling);
        addClass(elem,theclass)
    }
}

// 得到下一个元素节点
function getNextElement(node){
    if (node.nodeType == 1){
        return node;
    }
    if (node.nextSibling){
        return getNextElement(node.nextSibling);
    }
    return null;
}

// 遍历节点集合设置有关样式:给表格的不同行数上色
function stripeTables(){
    if(!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for (var i=0; i<tables.length; i++) {
        odd = false;
        rows = tables[i].getElementsByTagName("tr");
        for (var j=0; j<rows.length; j++){
            if (odd == true) {
                addClass(rows[j],"odd")
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

// 显示一个缩略语的列表
function displayAbbreviations(){
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    // 取得所有缩略词
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    // 遍历这些缩略词
    for (var i=0; i<abbreviations.length; i++){
        var current_abbr = abbreviations[i];
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    // 创建定义列表
    var dlist = document.createElement("dl");
    for (key in defs) {
    // 创建缩略词节点
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
    // 创建缩略词解释节点
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
    // 添加到列表后面
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    // 创建标题
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    // 把标题和列表添加到页面
    document.body.appendChild(header);
    document.body.appendChild(dlist);
    header.style.margin = "auto";
    dlist.style.margin = "auto";
}

// 事件发生时设置样式:表格高亮
function highlightRows(){
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i=0; i<rows.length; i++){
        rows[i].onmouseover = function(){
            this.style.fontWeight = "bold";
        }
        rows[i].onmouseout = function(){
            this.style.fontWeight = "normal";
        }
    }
}

// JS操作修改classname
function addClass(element,value){
    var newClassName
    if (!element.className){
        element.className = value;
    }else {
        newClassName = element.className;
        newClassName += "";
        newClassName += value;
        element.className = newClassName;
    }
}

addLoadEvent(function(){
    styleElement("h1","intro")
})
addLoadEvent(stripeTables)
addLoadEvent(displayAbbreviations)
addLoadEvent(highlightRows)