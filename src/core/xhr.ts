

class XHR{
    private send(type:'POST'|'GET',url:string,data:string|undefined,async:boolean,fn:(s:string)=>void,fnerror?:(this: XMLHttpRequest, ev?: ErrorEvent) => any){
        var xhr=new XMLHttpRequest();
        xhr.open(type,url,!!async);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status === 200 || xhr.status === 0){
                    if(xhr.responseText.length>0){
                        fn(xhr.responseText);    
                    }
                }
            }
        }
        type=='POST' && xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onerror=<any>fnerror;
        xhr.send(data);
    }
    get(url:string,async:boolean,fn:(s:string)=>void,fnerror?:(this: XMLHttpRequest, ev?: ErrorEvent) => any){
        this.send('GET',url,undefined,async,fn,fnerror);
    }
    post(url:string,data:string,async:boolean,fn:(s:string)=>void,fnerror?:(this: XMLHttpRequest, ev?: ErrorEvent) => any){
        this.send('POST',url,data,async,fn,fnerror);
    }
}