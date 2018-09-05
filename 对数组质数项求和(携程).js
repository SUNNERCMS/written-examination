//常规方法判断一个数是否是素数
function isPrime(num){
    // 不是数字或者数字小于2
    if(typeof num !== "number" || !Number.isInteger(num)){　　　　　　
    // Number.isInterget 判断是否为整数
        return false
    }
	 if(num<2){return false;}
    //2是质数
    if(num == 2){
        return true
    }else if(num % 2 == 0){  //排除偶数
        return false
    }
    //依次判断是否能被奇数整除，最大循环为数值的开方
    let squareRoot = Math.sqrt(num)
    //因为2已经验证过，所以从3开始；且已经排除偶数，所以每次加2
    for(let i = 3; i <= squareRoot; i += 2) {
      if (num % i === 0) {
         return false
      }
    }
    return true
}


//携程的题目：数组的构成规则是每一项都是前一项的索引和当前项索引的和，当数组长度设为N时，找对数组中质数项元素进行求和
//例如：N=3 数组为[0,1,3],质数项和：3
//N=5 数组为[0,1,3,5,7],质数项和：3+5=8
function isPrime(num){
    // 不是数字,不是整数，数字小于2,  // Number.isInterget 判断是否为整数
    if(typeof num !== "number" || !Number.isInteger(num)||num<2){　　　　　　
        return false
    }
    //2是质数
    if(num == 2){
        return true
    }else if(num % 2 == 0){  //排除偶数
        return false
    }
    //依次判断是否能被奇数整除，最大循环为数值的开方
    let squareRoot = Math.sqrt(num)
    //因为2已经验证过，所以从3开始；且已经排除偶数，所以每次加2
    for(let i = 3; i <= squareRoot; i += 2) {
      if (num % i === 0) {
         return false
      }
    }
    return true
}
function sun(N){
	var arr=[],sum=0;
    for(var i=0;i<N;i++){
        arr.push(2*i-1<0?0:2*i-1);	
    }
	console.log(arr);
    arr.forEach(function(val,index){
    	if(isPrime(index)){
			sum+=val;
		}
	},0);
	return sum;
}
sun(5);
