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
