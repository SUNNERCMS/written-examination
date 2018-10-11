js递归实现全排列：
例如：输入'123'，输出为['123','132','213','231','312','321']
//解题思路：依次从字符串中取出一个元素，然后让其余元素全排列，最后进行拼接即可。
function anagrams(str){
	if(str.length<=2){
		return str.length===2?[str,str[1]+str[0]]:[str];          //递归出口：当字符串长度为2时，就只有两种情况
	}else{
		return str.split('').reduce((acc,letter,i)=>
			acc.concat(anagrams(str.slice(0,i)+str.slice(i+1)).map(item=>letter+item)),[]);
	}
}
anagrams('123');
//代码拆分：
anagrams(str.slice(0,i)+str.slice(i+1))//将除了下标为i的字母外，其余的在带入全排列函数进行全排列，返回数组ARR
.map(item=>letter+item)//将得到的全排列数组ARR中的元素和下标为i的字母进行合并，返回一个新数组
acc.concat//字符串的长度可能不止为3，当长度过大时，递归的过程需要用acc进行存储合并。
