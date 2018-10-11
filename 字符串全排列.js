js递归实现全排列：
例如：输入'123'，输出为['123','132','213','231','312','321']

function anagrams(str){
	if(str.length<=2){
		return str.length===2?[str,str[1]+str[0]]:[str];
	}else{
		return str.split('').reduce((acc,letter,i)=>
			acc.concat(anagrams(str.slice(0,i)+str.slice(i+1)).map(item=>letter+item)),[]);
	}
}
anagrams('123');
