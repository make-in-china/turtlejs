
class PartParamFilter{
    static bool(v){
        return parseBool(v);
    }
    static intmin(v,p){
        v=parseInt(v);
        p=parseInt(p);
        if(v<p||isNaN(v)){
            v=p;
        }
        return v;
    }
    static string(v){
        return '"'+v+'"';
    }
    static floatmin(v,p){
        v=parseFloat(v);
        p=parseFloat(p);
        if(v<p||isNaN(v)){
            v=p;
        }
        return v;
    }
    static int(v){
        return parseInt(v);
    }
    static float(v){
        return parseFloat(v);
    }
    static pxtoem(v,p){
        p=parseFloat(p);
        if(isNaN(p)){
            p=0;
        }
        return (parseFloat(v)/16+p)+'em';
    }
    static color(v){
        
        if(colorRE.test(v)){
            return v;
        }else{
            return 'transparent';    
        }
    }
    static date(v,p){
        let d=new Date(v);
        if(d.toDateString()==='Invalid Date'){
            d=new Date();
        }
        return dateFormat(p,d);
    }
    static only(v,p){
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
    static udftotrue(v){
        return v===undefined?true:v;
    }
    static anytotrue(v){
        return v!==undefined?true:v;
    }
    static udftofalse(v){
        return v===undefined?false:v;
    }
    static anytofalse(v){
        return v!==undefined?false:v;
    }
    static udftonull(v){
        return v===undefined?null:v;
    }
    static anytonull(v){
        return v!==undefined?null:v;
    }
    static udftoemptystr(v){
        return v===undefined?"":v;
    }
    static anytoemptystr(v){
        return v!==undefined?"":v;
    }
}