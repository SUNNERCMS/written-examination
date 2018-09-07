//非递归
function dp(arr){
	var opt=new Array(arr.length);
	opt[0]=arr[0];
	opt[1]=Math.max(arr[0],arr[1]);
	for(var i=2,len=arr.length;i<len;i++){
		A=opt[i-2]+arr[i];
		B=opt[i-1];
		opt[i]=Math.max(A,B);
	}
	return opt[arr.length-1];
}
arr=[1,2,4,1,7,8,3];
dp(arr);


问题：从一组数中匹配出和为S的数，如能找到这样的一组数返回true，否则返回false
//递归写法
var arr=[3,34,4,12,5,2];
function subset(arr,i,s){
	if(s===0){
		return true;
	}else if(i===0){
		return arr[0]===s;
	}else if(arr[i]>s){
		return subset(arr,i-1,s);
	}else{
		return subset(arr,i-1,s-arr[i])||subset(arr,i-1,s)?true:false;
	}
}
subset(arr,arr.length,69);//false
