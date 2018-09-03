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
