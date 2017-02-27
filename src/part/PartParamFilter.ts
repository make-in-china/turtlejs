
namespace PartParamFilter{
    
    const colorRE=/^\s*((#[\dabcdefABCDEF]{3,6})|(rgba\(.*\)))\s*$/
    export function bool(v){
        return parseBool(v);
    }
    export function intmin(v,p){
        v=parseInt(v);
        p=parseInt(p);
        if(v<p||isNaN(v)){
            v=p;
        }
        return v;
    }
    export function string(v){
        return '`'+v+'`';
    }
    export function floatmin(v,p){
        v=parseFloat(v);
        p=parseFloat(p);
        if(v<p||isNaN(v)){
            v=p;
        }
        return v;
    }
    export function int(v){
        return parseInt(v);
    }
    export function float(v){
        return parseFloat(v);
    }
    export function pxtoem(v,p){
        p=parseFloat(p);
        if(isNaN(p)){
            p=0;
        }
        return (parseFloat(v)/16+p)+'em';
    }
    export function color(v){
        
        if(colorRE.test(v)){
            return v;
        }else{
            return 'transparent';    
        }
    }
    export function date(v,p){
        let d=new Date(v);
        if(d.toDateString()==='Invalid Date'){
            d=new Date();
        }
        return dateFormat(p,d);
    }
    export function only(v,p){
        if(p.indexOf(';')===-1){
            return v;
        }
        let 
            arr=p.split(';'),
            datas=arr[0].split(','),
            filter:string|Array<string>;
        if(arr.length>0){
            filter=arr[1];
        }else{
            filter='';
        }
        if(datas.indexOf(v)!==-1){
            return v;
        }else{
            return filter;
        }
    }
    /**undefined to true */
    export function udftotrue(v){
        return v===undefined?true:v;
    }
    /**any to true */
    export function anytotrue(v){
        return v!==undefined?true:v;
    }
    /**undefined to false */
    export function udftofalse(v){
        return v===undefined?false:v;
    }
    /**any to false */
    export function anytofalse(v){
        return v!==undefined?false:v;
    }
    /**undefined to null */
    export function udftonull(v){
        return v===undefined?null:v;
    }
    /**any to null */
    export function anytonull(v){
        return v!==undefined?null:v;
    }
    export function udftoemptystr(v){
        return v===undefined?"":v;
    }
    export function anytoemptystr(v){
        return v!==undefined?"":v;
    }
}

