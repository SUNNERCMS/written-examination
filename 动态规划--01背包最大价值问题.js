//问题描述：
有n件物品和1个容量为W的背包。每种物品均只有一件，第i件物品的重量为weights[i]，价值为values[i]，
求解将哪些物品装入背包可使价值总和最大。

function beibao(weights,values,W){
	var n=weights.length-1;
	var f=[[]];
	for(var j=0;j<=W;j++){
		if(j<weights[0]){
			f[0][j]=0;
		}else{
			f[0][j]=values[0];
		}
	};
	for(var j=0;j<=W;j++){
		for(var i=1;i<=n;i++){
			if(!f[i]){
				f[i]=[];
			}
			if(j<weights[i]){
				f[i][j]=f[i-1][j];
			}else{
				f[i][j]=Math.max(f[i-1][j],f[i-1][j-weights[i]]+values[i]);	
			}
		}
	}
return f[n][W];
}
var a = beibao([2,2,6,5,4],[6,3,5,4,6],10);
console.log(a);
--->15
