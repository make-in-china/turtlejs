/**
 * 遍历树回调函数返回值的枚举:
    c_stopEach 结束枚举,
    c_repeat 重复本次,
    c_noIn 不进入子集,
    c_noRepeat 不重复（默认）
 */
const enum eTreeEach{
    c_stopEach=1,
    c_repeat=2,
    c_noIn=4,
    c_noRepeat=8
}
interface ITreeEachStep{
    next:number
}



interface IArray{
    length:number
}

interface ITreeEachReturn {
    stack: [IArray | INode[], number];
    state: eTreeEach | undefined;
    array: IArray | INode[];
    index: number;
}

/**
 * 遍历树
 * @param {T[]|IArray} array 数组或类数组
 * @param {string} propertyName 数组元素包含的属性名
 * @param {(node:T,step?:ITreeEachStep)=>eTreeEach|undefined} fn 回调函数
 * @param {number} beginIndex 遍历起始位置
 */
function treeEach<T>(array:T[]|IArray,propertyName:string,fn:(node:T,step:ITreeEachStep)=>(eTreeEach|void),beginIndex:number=0):ITreeEachReturn | undefined{
    if(!isArrayLike(array)){
        return;
    }
    let 
        arr                             =array,
        i                               =beginIndex,
        stack:[T[]|IArray,number]       =<any>[],
        step:ITreeEachStep              ={next:1},
        obj:T,
        obj2:T,
        state:eTreeEach|undefined;
    while(true){
        if(i<arr.length){
            obj=arr[i];
            step.next=1;
            state=<eTreeEach|undefined>fn(obj,step);
            if(state==undefined){
                state=0
            }else if(state==eTreeEach.c_stopEach){
                break;
            }
            obj2=arr[i];
            if(obj2 && obj2!=obj && !(eTreeEach.c_noRepeat&state)){
                    state=state|eTreeEach.c_repeat;
            }
            if(obj2 && obj2[propertyName] && obj2[propertyName].length>0 && !(state&eTreeEach.c_noIn)&&propertyName){
                stack.push(arr);
                stack.push(i+(state&eTreeEach.c_repeat?0:step.next));
                i=0;
                arr=obj2[propertyName];
            }else{
                i+=(state&eTreeEach.c_repeat?0:step.next);
            }
        }else if(stack.length>0){
            i=<number>stack.pop();
            arr=<T[]|IArray>stack.pop();
        }else{
            break;
        }
    }
    return {stack:stack,state:state,array:arr,index:i}
}
