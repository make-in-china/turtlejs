
class ClientHelper{
	private data={};
    private isListen=false;
    private events=[];
    private emit(){
        for(var i=0;i<this.events.length;i++){
            this.events[i]();
        }
    }
    private setSizeProperty(name:'onResize'|'width'|'height'|'left'|'top'|'bottom'|'right',fn){
        this.data[name]=undefined;
        this[name]=function(this:ClientHelper,v){
            /*此属性用于被绑定*/
            if(this.data[name]===undefined&&this.__bind__){
                if(this.isListen===false){
                    this.isListen=true;
                    window.addEventListener('resize',this.emit);
                }
                var bind=this.__bind__;
                var getV=function(this:ClientHelper){
                    this[name]=fn();
                }
                this.data[name]=fn();
                this.events.push(getV);
            }
            if(v){
                this.data[name]=v;
            }
            return this.data[name];
        }
    }
    constructor(){
        
        this.setSizeProperty('onResize',function(){
            return {
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight
            };
        });
        this.setSizeProperty('width',function(){
            return document.documentElement.clientWidth;
        });
        this.setSizeProperty('height',function(){
            return document.documentElement.clientHeight;
        });
        
        this.setSizeProperty('left',function(){
            return document.documentElement.clientLeft;
        });
        this.setSizeProperty('top',function(){
            return document.documentElement.clientTop;
        });
            
        this.setSizeProperty('right',function(){
            return document.documentElement.clientLeft+document.documentElement.clientWidth;
        });
        this.setSizeProperty('bottom',function(){
            return document.documentElement.clientTop+document.documentElement.clientHeight;
        });
    }
    
}

let $clientHelper=new ClientHelper;