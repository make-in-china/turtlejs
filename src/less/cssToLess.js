var cssToLess=function(css){
    var count=0;
    return css.replace(/\(.*?\)|@.*?{|\..*?{|{|[};]?}/g,function(s){
        if(s=='{'){
            count++;
            return s;
        }
        if(s=='}'){
            if(count>0){
                count--;
                return s+'\r\n';
            }else{
                return ';}");\r\n'
            }
        }
        if(s=='}}'){
            count--;
            return '}\r\n}\r\n';
        }
        if(s==';}'){
            return ';}");\r\n'
        }
        if(s.substr(0,1)=='('){
            return s;
        }
        if(s.substr(0,1)=='@'){
            return s+'\r\n';
        }
        if(s.substr(0,1)=='.'){
            return '.parse("'+s.substring(1,s.length);
        }
        console.log(s);
    });
};
var getCSSByURL=function(url,fn){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4){ 
        if (xmlhttp.status == 200 || xmlhttp.status == 0){
          fn(xmlhttp.responseText);
        }
      }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}
getCSSByURL('css\Button.css',function(css){
    copy(cssToLess(css));
});
