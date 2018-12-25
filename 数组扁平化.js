利用generator函数和yield* 命令实现数组扁平化

// yield*命令可以很方便的取出嵌套在数组中的所有成员
  function* iterTree(tree）{
         if(Array.isArray(tree)){
              for(let i=0;i<tree.length;i++){
                  yield* iterTree(tree[i]);
                }
         }else{
            yield tree;
         }
    }
const tree=['a',['b','c'],['d','e']];
for(let x of iterTree(tree)){
  console.log(x);
}
--->
  //a
  //b
  //c
  //d
