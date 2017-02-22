/**
 * 遍历树回调函数返回值的枚举:
    c_stopEach 结束枚举,
    c_repeat 重复本次,
    c_noIn 不进入子集,
    c_noRepeat 不重复（默认）
 */
const enum eTreeEach {
    c_stopEach = 1,
    c_repeat = 2,
    c_noIn = 4,
    c_noRepeat = 8
}
interface ITreeEachState<T> {
    stack: [T[] | IArray<T>, number]
    nextStepLength: number
    currentIndex: number
}



interface ITreeEachReturn<T> {
    stack: [IArray<T> | T[], number];
    return: eTreeEach | undefined;
    array: IArray<T> | T[];
    index: number;
}

/**
 * 遍历树
 * @param {T[]|IArray} array 数组或类数组
 * @param {string} propertyName 数组元素包含的属性名
 * @param {(node:T,step?:ITreeEachStep)=>eTreeEach|undefined} fn 回调函数
 * @param {number} beginIndex 遍历起始位置
 */
function treeEach<T extends Object>(array: T[] | IArray<T>, propertyName: string, fn: (node: T, state: ITreeEachState<T>) => (eTreeEach | void), beginIndex: number = 0): ITreeEachReturn<T> | undefined {
    if (!isArrayLike(array)) {
        return;
    }
    let
        arr = array,
        i = beginIndex,
        state: ITreeEachState<T> = <any>{
            stack: [array, beginIndex],
            nextStepLength: 1,
            currentIndex: 0
        },
        stack = state.stack,
        obj: T,
        obj2: T,
        ret: eTreeEach | undefined;
    while (true) {
        if (i < arr.length) {
            obj = arr[i];
            state.nextStepLength = 1;
            state.currentIndex = i;
            ret = <eTreeEach | undefined>fn(obj, state);
            if (ret == undefined) {
                ret = 0
            } else if (ret == eTreeEach.c_stopEach) {
                break;
            }
            obj2 = arr[i];
            if (obj2 && obj2 != obj && !(eTreeEach.c_noRepeat & ret)) {
                ret = ret | eTreeEach.c_repeat;
            }
            if (obj2 && obj2[propertyName] && obj2[propertyName].length > 0 && !(ret & eTreeEach.c_noIn) && propertyName) {
                stack.push(arr);
                stack.push(i + (ret & eTreeEach.c_repeat ? 0 : state.nextStepLength));
                i = 0;
                arr = obj2[propertyName];
            } else {
                i += (ret & eTreeEach.c_repeat ? 0 : state.nextStepLength);
            }
        } else if (stack.length > 2) {
            i = <number>stack.pop();
            arr = <T[] | IArray<T>>stack.pop();
        } else {
            break;
        }
    }
    return {
        stack: stack,
        return: ret,
        array: arr,
        index: i
    }
}
