

class XHR{
    private send(type:'POST'|'GET',url:string,data:string,async:boolean,fn:(s:string)=>void,fnerror?:Fun){
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
        xhr.onerror=fnerror;
        xhr.send(data);
    }
    get(url:string,async:boolean,fn:(s:string)=>void,fnerror?:Fun){
        this.send('GET',url,undefined,async,fn,fnerror);
    }
    post(url:string,data:string,async:boolean,fn:(s:string)=>void,fnerror?:Fun){
        this.send('POST',url,data,async,fn,fnerror);
    }
}