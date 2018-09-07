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
