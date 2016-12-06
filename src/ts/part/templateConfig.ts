
class NameItem{
    constructor(name:string){
        this.name=name;
    }
    name:string
}


class BasePath{
    private paths={};
    push(v:string|Array<string>){
        if(isString(v)){
            this.parseUIPath(<string>v);    
        }else if(isArray(v)){
            
            for(var i=0;i<v.length;i++){
                if(isString(v[i])){
                    this.parseUIPath(v[i])
                }
            }
        }
    }
    parseUIPath(s:string){
        // try{
            var o=exec('('+s+')');
            if(isObject(o)&&o.hasOwnProperty('name')&&o.hasOwnProperty('path')){
                this.paths[o.name]=o;
                this.push(o);
            }
        // }catch(e){_catch(e);}
    }
    getPathBySortPath(sortPath){
        return this.paths[sortPath].path;
    }
    hasSortPath(sortPath){
        return this.paths.hasOwnProperty(sortPath);
    }
    toString(){
        var arr:string[]=[];
        for(var i in this.paths){
            arr.push("{name:'"+this.paths[i].name+"',path:'"+this.paths[i].path+"'}")
        }
        return arr.join(';');
    }
}
class TemplateConfig{
    [index:string]:Object
    XMP         ={};
    TEMPLATE    ={};
    TITLE       ={getData:function(node:IHTMLTitleElement):string{return node.innerText;}};
    STYLE       ={xmp:undefined};
    SCRIPT      ={xmp:undefined};
    TEXTAREA    ={xmp:undefined,getData:function(node:IHTMLTextAreaElement):string{return node.defaultValue;}};
    toString(){
        let arr:string[]=[];
        let desc:string;
        for(let i in this){
            if(!this.hasOwnProperty(i)){
                continue;
            }
            desc='<'+i.toLowerCase();
            if(this[i].hasOwnProperty("xmp")){
                desc+=' xmp';
            }
            desc+='>';
            arr.push(desc);
        }
        return arr.join("\n");
    }
    get items():NameItem[]{
        let items:NameItem[]=[];
        for(let i in this){
            if(!this.hasOwnProperty(i)){
                continue;
            }
            let item=new NameItem(i.toLowerCase());
            extend(item,this[i]);
            items.push(item);
        }
        return items;
    }
    findByString(str:string):RegExpMatchArray|undefined{
        if(str.length===0){
            return ;
        }
        let ts=this.items;
        let regExes:string[]=[];
        for(let i=0;i<ts.length;i++){
            let s='(<'+ts[i].name;
            if(ts[i].hasOwnProperty('xmp')){
                s+='[\\s\\S]*? +xmp';
            }
            s+="([\\s\\S]*?)>([\\s\\S]*?)<\\/"+ts[i].name+">";
            s+=')';
            regExes.push(s);
        }
        let re=new RegExp(regExes.join("|"),"g");//exec(`(/${regExes.join("|")}/g)`);
        return str.match(re);
    }
}
let templateConfig=new TemplateConfig;
let baseUIPath=new BasePath;