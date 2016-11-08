
class ArrayEx<T> extends Array<T>{
    last():T|undefined{
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