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
		return target.m();
	}
	var str='target[m](';
	for(var i=0,len=arg.length;i<len;i++){
		str+=i!==len-1?arg[i]+',':arg[i];
	}
	var str1=str+')';
	var result=eval(str1); //（3）指定方法存在返回值时，用变量将计算的结果进行缓存返回
	delete target.m;
	return result;
};
jawil.sayHello.applyone(lulin,[24,32,34,54]);
