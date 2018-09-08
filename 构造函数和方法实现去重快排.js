var arr1=[11,1,2,3,4,2.5];
var arr2=[10,8,9,4,999];
function Arr(arr1,arr2){
    this.add=function(){
        return arr1.concat(arr2).filter(function(val,index,self){
            return self.indexOf(val)===index;
        });	
    };
	this.sort=function(b){
        return b.sort(function(n,m){
            return n-m;
        });
	};
}

var arr1=[11,1,2,3,4,2.5];
var arr2=[10,8,9,4,999];
var a=new Arr(arr1,arr2);
var b=a.add();
var c=a.sort(b);
console.log(c);
VM330:21 (10) [1, 2, 2.5, 3, 4, 8, 9, 10, 11, 999]
