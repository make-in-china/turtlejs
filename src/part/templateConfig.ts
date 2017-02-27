
/// <reference path='BasePath.ts'/>
class NameItem{
    constructor(name:string){
        this.name=name;
    }
    name:string
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