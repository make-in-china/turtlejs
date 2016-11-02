

class ArrayEx<T> extends Array<T>{
    last():T{
        if(this.length>0){
            return this[this.length-1];
        }
    }
    clear(){
        let l=this.length;
        for(let i=0;i<l;i++){
            this.pop();
        }
    }
}

interface IHashObject<T>{
    [index:string]:T
}

class HashObjectManage<T> {
    static clean<T>(data:IHashObject<T>){
        for(var i in data){
            if(!data.hasOwnProperty(i)){
                delete data[i]
            }
        }
    }
    static take<T>(data:IHashObject<T>,name:string):T{
        if(data.hasOwnProperty(name)){
            let ret:T=data[name];
            delete this[name];
            return ret;
        }
        return null;
    }
}



interface IKeyArrayHashObject<T>{
    [index:string]:ArrayEx<T>
}
class KeyArrayHashObjectManage{
    private static isArray<T>(p: T | T[]): p is T[] {
        return typeof p==="array";
    }
    static clean<T>(data:IKeyArrayHashObject<T>){
        for(var i in data){
            if(!data.hasOwnProperty(i)){
                delete data[i]
            }
        }
    }
    static take<T>(data:IKeyArrayHashObject<T>,name:string):ArrayEx<T>{
        if(data.hasOwnProperty(name)){
            let ret:ArrayEx<T>=data[name];
            delete this[name];
            return ret;
        }
        return null;
    }
    static getKeyArray<T>(data:IKeyArrayHashObject<T>):ArrayEx<ArrayEx<T>>{
        let arr:ArrayEx<ArrayEx<T>>=new ArrayEx<ArrayEx<T>>();
        for(var i in data){
            if(!data.hasOwnProperty(i)){
                arr.push(data[i]);
            }
        }
        return arr;
    }
    static pop<T>(data:IKeyArrayHashObject<T>,key:string){
        var keyObject:ArrayEx<T>=<ArrayEx<T>>data[key];
        if(keyObject){
            return keyObject.pop();
        }
    }
    static push<T>(data:IKeyArrayHashObject<T>,key:string|string[],value:T){
        if(KeyArrayHashObjectManage.isArray(key)){
            for(var i=0;i<key.length;i++){
                if(!data.hasOwnProperty(key[i])){
                    data[key[i]]=new ArrayEx<T>();
                }
                data[key[i]].push(value);
            }
        }else{
            if(!data.hasOwnProperty(key)){
                data[key]=new ArrayEx<T>();
            }
            data[key].push(value);
        }
    }
}
// class KeyArrayHashObject<T>{
//     clean(){
//         KeyArrayHashObjectManage.clean(<any>this);
//     }
//     take(name:string):ArrayEx<T>{
//         return <any>KeyArrayHashObjectManage.take(<any>this,name);
//     }
//     getKeyArray():ArrayEx<ArrayEx<T>>{
//         return <any>KeyArrayHashObjectManage.getKeyArray(<any>this);
//     }
//     pop(key:string){
//         KeyArrayHashObjectManage.pop(<any>this,key);
//     }
//     push(key:string|string[],value:T){
//         KeyArrayHashObjectManage.push(<any>this,key,value);
//     }
// }
// function createKeyArrayHashObject<T>():IKeyArrayHashObject<T> & KeyArrayHashObject<T>{
//     return <any>(new KeyArrayHashObject<T>());
// }
