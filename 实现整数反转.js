//百词斩第一题
var str='100';
var num=parseInt(str);
if(num>=0){
	var str2=str.split('').reverse().join('').replace(/^0*/,'');
	var NUM=parseInt(str2);
}else{
	var str6=str.substr(0,1)+str.substr(1).split('').reverse().join('').replace(/^0*/,'');
	var NUM=parseInt(str6);
}
console.log(NUM);//'100'-->1,'-300'-->-3
