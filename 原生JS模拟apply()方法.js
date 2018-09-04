//参考链接：https://segmentfault.com/a/1190000009265185?utm_source=tuicool&utm_medium=referral
//f.call(o)其原理就是先通过 o.m = f 将 f作为o的某个临时属性m存储，然后执行m，执行完毕后将m属性删除。
//  o.m=f;
//  o.m();
//  delete o.m;
//第一个版本，没有传入参数的情况下
var jawil={
	name:"jawil",
	sayHello:function(){
		console.log(this.name);
	}
};
var lulin={
	name:"lulin"
};
Function.prototype.applyone=function(target){ //target是目标对象
	target.m=this;  //这里的this我的理解是指向了applyone被调用的对象，也就是jawil.sayHello方法
	target.m();    //相当与lulin此时也有了sayHello的方法
	delete target.m;
};
jawil.sayHello.applyone(lulin);
VM310:4 lulin

//第二个版本,传入了一个数组参数，数组中参数个数只有一个的情况
var jawil={
	name:"jawil",
	sayHello:function(age){ //这里的age形参刚好对应下面的arg传入的值
		console.log(this.name+':'+age);
	}
};
var lulin={
	name:"lulin"
};
Function.prototype.applyone=function(target){
	var arg=arguments[1][0];//利用arguments获取到数组参数，然后取出该数字
	target.m=this;
	target.m(arg);    //将该参数传入了this所指的方法中，相当与lulin对象多了一个sayHello的方法，并且可以接受参数
	delete target.m;
};
jawil.sayHello.applyone(lulin,[24]);
VM327:4 lulin:24
//当传入的数组参数里面的元素不止一个时，怎么把这些值以参数的形式传递给指定方法，第三种情况
 var jawil={
	name:"jawil",
	sayHello:function(age){
		console.log(this.name+":"+age);
	}
};
var lulin={
	name:"lulin"
};
Function.prototype.applyone=function(target){
	var arg=arguments[1];
	var str='target.m(';
	for(var i=0,len=arg.length;i<len;i++){
		str+=i!==len-1?arg[i]+',':arg[i];
	}
	var str1=str+')'; //得到"target.m(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
	target.m=this;
	eval(str1); //可以处理字符串中的表达式
	delete target.m;
};
jawil.sayHello.applyone(lulin,[24,32,34,54]);
//全面考虑了以下四种情况：（1）第一个参数没有或者为null时（2）没有参数传入时（3）指定方法存在返回值时，用变量将计算的结果进行缓存返回
//（4）当目标对象中已经存在了要指定的属性名或方法名
 var jawil={
	name:"jawil",
	sayHello:function(age){
		return {
			name:this.name,
			age:age
		}
	}
};
var lulin={
	name:"lulin"
};
Function.prototype.applyone=function(target){
	target=target||window;  //第一个参数没有或者为null时
	var m=Symbol();	       //（4）当目标对象中已经存在了要指定的属性名或方法名
	target[m]=this;
	var arg=arguments[1];
	if(arg.length===0){   //（2）没有参数传入时
		return target[m]();
	}
	var str='target[m](';
	for(var i=0,len=arg.length;i<len;i++){
		str+=i!==len-1?arg[i]+',':arg[i];
	}
	var str1=str+')';
	var result=eval(str1); //（3）指定方法存在返回值时，用变量将计算的结果进行缓存返回
	delete target[m];
	return result;
};
jawil.sayHello.applyone(lulin,[24,32,34,54]);
---{name: "lulin", age: 24}
//借用ES6语法的扩展运算符可以把数组转化为参数序列，简化上面的循环拼接的eval计算过程
Function.prototype.applyone=function(target){
	target=target||window;  //第一个参数没有或者为null时
	var m=Symbol();	       //（4）当目标对象中已经存在了要指定的属性名或方法名
	target[m]=this;
	var arg=arguments[1];
	if(arg.length===0){   //（2）没有参数传入时
		return target[m]();
	}
	var result=target[m](...Array.from(arg)); //（3）指定方法存在返回值时，用变量将计算的结果进行缓存返回
	delete target[m];
	return result;
};
//call方法的原生Js实现
Function.prototype.newCall=function(target){
	target=target||window;  //第一个参数没有或者为null时
	var m=Symbol();	       //（4）当目标对象中已经存在了要指定的属性名或方法名
	target[m]=this;
	var arg=Array.from(arguments).slice(1);  //call中的参数是一个一个的，不是数组
	if(arg.length===0){   //（2）没有参数传入时
		return target[m]();
	}
	var result=target[m](...arg); //利用扩展运算符把数组转换成参数序列
	delete target[m];
	return result;
};
var person = {
  name: 'Abiel'
}
function sayHi(age,sex) {
  console.log(this.name, age, sex);
}
sayHi.newCall (person,25,'男'); // Abiel 25 男
//bind的模拟方法：主要是用到了apply方法，以及初始参数和实际参数的传参处理，另外兼容了绑定函数作为构造函数的情况
var sun={
	name:"aaa"
}
var rrr={
	name:"ddd",
	show:function(age){
		console.log(this.name,age);
	}
}
Function.prototype.newbind=function(target){
	var fn=this;
	var outargs=Array.prototype.slice.call(arguments,1);
	var F=function(){};
	F.prototype=this.prototype;
	var bound=function(){
		var innerargs=Array.prototype.slice.call(arguments);
		var totalargs=outargs.concat(innerargs);
		return fn.apply(this instanceof F?this:target,totalargs);
	}
	bound.prototype=new F();
	return bound;
}
rrr.show.newbind(sun,23)();
VM262:7 aaa 23
