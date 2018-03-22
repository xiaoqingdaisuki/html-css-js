// 当window.onload时加载多个函数.
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

function preparePlaceholder(){
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/holder.jpg");
    placeholder.setAttribute("alt","my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext)
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder,gallery)
    insertAfter(description,placeholder)

}

function prepareGallery(){
    // 对象检测
    if (!document.getElementById || !document.getElementsByClassName) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    // 声明node list
    var links = gallery.getElementsByTagName("a");
    for (var i=0; i < links.length; i++){
        links[i].onclick = function() {
            // 返回true或false应当有showPic()决定,返回成功则false,返回图片失败则true.
            return showPic(this) ? false : true;
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

function showPic(node){
    if (!document.getElementById("placeholder")) return false;
    // 获取传入节点的href属性值,以及获取占位符图片id,再使用setAttribute对placeholder的src属性进行刷新.
    var source = node.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    // 这里使用了DOM Core的方式,同理你可以使用html-dom,比如 placeholoder.src = source;
    placeholder.setAttribute("src",source);
    // 当链接被点击时,这个链接的title属性值被提取并保存在text中,得到decription的<p>元素,保存在变量里,吧decription对象的第一个子节点属性值设为变量text的值.
    if (document.getElementById("description")) {
        var text = node.getAttribute("title") ? node.getAttribute("title") : "";
        var description = document.getElementById("description");
        if (description.firstChild.nodeType == 3){
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);