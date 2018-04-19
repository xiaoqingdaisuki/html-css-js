# html-css-js  

# es6 基础  

Javascript的类型有:**数字 字符串 布尔值 函数 对象 undefined null 数组 日期 正则表达式**  
声明变量有六种方法:**var function let const import class**  

**模板字面量**  
```
var book = {
    name: '这是一本书'
};
console.log('你在阅读' + book.name + '.\n这是新的一行\n 这也是.');
```
同理可以使用
```
console.log(`你正在阅读${book.name}.
这是新的一行
这也是`);
```

**箭头函数**  
```
var circle = function circle(r){
    var PI = 3.14;
    var c = PI*r*r;
    return c;
}
```
等同于
```
let circle = (r) => {
    var PI = 3.14;
    var c = PI*r*r;
    return c;
}
```

**函数默认参数**  
```
function sum(x = 1, y = 2, z = 3){
    return x+y+z
};
console.log(sum(3,3)) // 输出9
```

**声明展开**  
```
var params = [3,4,5];
console.log(sum(...params));
```
以上与下面相同
```
var params = [3,4,5];
console.log(sum.apply(undefined, params));
```

```
function func(x, y, ...a){
    return (x + y) * a.length;
};
console.log(func(1,2,'hello',true,7)); // 输出9;
```
以上与下面相同
```
function func(x, y){
    var a = Array.prototype.slice.call(arguments, 2);
    return (x + y) * a.length;
};
```

**数组解构**  
初始变量
```
var [x, y] = ['a', 'b'];
```
值的互换
```
[x, y] = [y, x]
```
属性简写
```
var [x, y] = ['a', 'b'];
var obj = { x, y };
console.log(obj); // { x: "a", y: "b" }
```

**面向对象**  
ES5
```
function Book(title, pages){
    this.title = title;
    this.pages = pages;
}
Book.prototype.printTitle = function(){
    console.log(this.title);
};
```
ES6
```
class Book{
    constructor (title, pages){
        this.title = title;
        this.pages = pages;
    }
    printTitle(){
        console.log(this.title);
    }
}

let book = new Book('title','pag');
console.log(book.title);
```
只需要使用class关键字,声明一个有constructor函数和其他函数类

**继承**
```
class ITBook extends Book{
    constructor (title, pages, technology){
        super(title, pages);
        this.technology = technology;
    }
    printTechnology(){
        console.log(this.technology);
    }
}

let jsBook = new ITBook('学习JS', '200', 'Javascript')
console.log(jsBook.title)
```
可以用extends关键字扩展一个类并继承. 在构造函数中我们也可以用super关键字引用父类的构造函数  
尽管JavaScript声明类的方式新语法与C++ JAVA很类似,但js面向对象编程还是基于原型实现.

**属性存储**
```
class Person{
    constructor (name){
        this._name = name;
    }
    get name(){
        return this._name;
    }
    set name(value){
        this._name = value;
    }
}

let lotrChar = new Person('Frodo');
console.log(lotrChar.name);
```
声明set和get函数,只需要在需要暴露和使用的函数名前面加上get或set,然后可以用普通属性一样,引用他们名字,可以执行get和set函数  
注意: 这里_name并不是真正的私有属性,我们仍可以引用它
