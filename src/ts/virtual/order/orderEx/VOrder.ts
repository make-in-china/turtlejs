
/// <reference path='../VOrder.ts'/>

namespace OrderEx {
    export const tryRun = 'tryRun'
    export const replaceToScriptNode = 'replaceToScriptNode'
    export interface IExtendsOrderFunction {
        <U>(
            clazz: { prototype: U },
            name: 'tryRun',
            fn: (this: U) => void
        ): void

        <U>(
            clazz: { prototype: U },
            name: 'replaceToScriptNode',
            fn: (this: U) => string
        ): void
    }
    export function extendsOrderGet<U extends Order.VOrder>(
        clazz: { prototype: U },
        name: string,
        fn: (this: U) => void
    ) {
        Object.defineProperty(clazz.prototype, name, { get: fn });
    }
    export const extendsOrderFunction: IExtendsOrderFunction = function <U>(
        clazz: { prototype: U },
        name: string,
        fn: (this: U) => any
    ) {
        Object.defineProperty(clazz.prototype, name, { value: fn });
    }


    export function canRunAtService(order: Order.VOrder): boolean {
        try {
            if (tryRun in order) {
                order[tryRun]();
            }
            Order.resetTest();
            return true;
        } catch (e) {
            debugger;
            Order.resetTest();
            return false;
        }
    }

    export function toScriptNode(order: Order.VOrder) {
        if (replaceToScriptNode in order) {
            let str: string = order[replaceToScriptNode]();
            replaceNodeByNode(order.data.placeholder, $$$(str, ENodeType.Script));
        }
    }
}