var str1="1A2C3D4B56";
var str2="B1D23CA45B6A";
function dp(str1,n,str2,m){
	var fn=[[]];
	for(var j=0;j<n;j++){
		if(str1[0]===str2[j]){
			dp[0][j]=1;
		}
	}
	for(var i=0;i<n;i++){
		if(!fn[i]){
			fn[i]=[];
		}
		if(str1[i]===str2[0]){
			dp[i][0]=1;
		}
	}
	for(var j=1;j<m;j++){
		for(var i=1;i<n;i++){
			if(!fn[i]){
                fn[i]=[];
			}
			if(str1[i]===str[j]){
				dp[i][j]=dp[i-1][j-1]+1;
			}else{
				dp[i][j] = Math.max(dp[i - 1][j],dp[i][j - 1]);
			}
		}
	}
return dp[n-1][m-1];
}
dp(str1,10,str2,12);
