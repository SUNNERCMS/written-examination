//58同城笔试选择题
setTimeout(function(){
	console.log(1);
},0);
new Promise(function(resolve){
	console.log(2);
	for(var i=0;i<10;i++){
		i==9&&resolve();//&&的短路用法，只要当前面的值满足条件时才执行后面的
	}
	console.log(3);
}).then(function(){
	console.log(4);
});
console.log(5);
//分析：promise中只有当栈中的所有的语句执行完之后，才会调用resolve回调函数
//promise属于微任务，而setTimeout属于宏任务，在任务队列中微任务优先于宏任务执行
//输出结果为2 3 5 4 1

//拼多多
promise=new Promise((resolve,reject)=>{
	console.log('a');
	resolve();
	console.log('b');
});
promise.then(()=>{console.log('c');});
console.log('d');
//输出结果为a b d c

//深信服
for(var i=0;i<5;i++){
	setTimeout(function(){
		console.log(i);
	},1000)
}
//疑问点在于是一次性输出5个5，还是间隔输出5个5

