var Cache={};
function cacheCall(){
    var cache=[];
    var hash={};
    for(var i in arguments){
        hash[arguments[i]]=null;
    }
    for(var i in hash){
        cache.push(i);
    }
    cache=cache.join(',');
    if(Cache[cache]){
        console.log('cache')
        return Cache[cache];
    }else{
        var v=arguments[0];
        var len=arguments.length;
        for(var i=1;i< len;i++){
            v*=arguments[i];
        }
        return Cache[cache]=v;
    }
}
console.log(cacheCall(1,2,4,8));
console.log(cacheCall(4,8,2,1));
console.log(cacheCall(1,2,33));
console.log(cacheCall(33,2,1));