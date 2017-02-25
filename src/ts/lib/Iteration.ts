
abstract class IterationValues<T>{
    abstract next():{
        value:T
        done:boolean
    }
}
/**
 *  for of es5 (can stop)
 * 
 * @template T 
 * @param {Iteration<T>} t 
 * @param {(data:T)=>(boolean|void)} fn if return true stop for of
 */
function forOf<T>(t:IterationValues<T>,fn:(data:T)=>(boolean|void)){
    let v:{value:T,done:boolean}
    while(true){
        v=t.next();
        if(!v.done){
            if(fn(v.value)){
                break;
            }
        }else{
            break;
        }
    }
}
