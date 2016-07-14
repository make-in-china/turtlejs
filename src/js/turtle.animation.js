(function(){
    if("msDoNotTrack" in window.navigator){
        return;
    }
    var animationGroup={};
    $t.renderParser.attributeParser.animgroup=function(node,outerChildNodes,outerElement){
        json = node.getAttribute("animgroup");
        node.removeAttribute("animgroup");
        setAnimationGroup($t.scriptToJSON(json));
    }
    $t.renderParser.attributeParser.anim=function(node,outerChildNodes,outerElement){
        json = node.getAttribute("anim");
        var animation=$t.scriptToJSON(json);
        if($t.isArray(animation)){
            for(var i=0;i<animation.length;i++){
                parseAnimationGroup(node, animation[i]);    
            }
        }else{
            parseAnimationGroup(node, animation);
        }
    }
    function setAnimationGroup(json){
        if(!json.name)json.name="__default__";
        var group;
        if (json.name in animationGroup) {
            group=animationGroup[json.name];
        }else{
            group = new Group();
            animationGroup[json.name]=group;
        }
        with(group.setup){
            if(json.repeatCount)
                repeatCount=json.repeatCount;
            if(json.runBeforeClass)
                runBeforeClass=json.runBeforeClass;
            if(json.class)
                group.setup.class=json.class;
            if(json.autoReturnBeforeState)
                autoReturnBeforeState=json.autoReturnBeforeState;
        }
    }
    function Group(){
        var t={};
        Object.defineProperty(t,'setup', {
            value:{repeatCount:0
                  ,runBeforeClass:""
                  ,class:""
                  ,autoReturnBeforeState:false
            },
            writable : false,
            enumerable : false,
            configurable : false
        });
        Object.defineProperty(t,'stop', {
            value : function() {
                for (e in this) {
                    this[e].stop();
                }
            },
            writable : false,
            enumerable : false,
            configurable : false
        });
        Object.defineProperty(t, 'returnBefore', {
            value : function() {
                for (e in this) {
                    this[e].returnBefore();
                }
            },
            writable : false,
            enumerable : false,
            configurable : false
        });
        return t;
    }
    function parseAnimationGroup(elem, json){
        
        var group,
            tags;
        if(!json.group)json.group="__default__";
        if (json.group in animationGroup) {
            group = animationGroup[json.group];
            if (json.index in group) {
                tags = group[json.index];
            } else {
                tags = [];
                group[json.index] = tags;
            }
        } else {
            group = new Group();
            animationGroup[json.group] = group;
            tags = [];
            group[json.index] = tags;
        }
        var cls,runBeforecls;
        cls = json.class?json.class:group.setup.class;
        runBeforecls=json.runBeforeClass?json.runBeforeClass:group.setup.runBeforeClass;
        cls = cls.replace(/\s{2,}/g, " ")
        if(cls){
            cls=cls.split(" ");
        }else{
            cls=[];
        }
        runBeforecls=runBeforecls.replace(/\s{2,}/g, " ")
        if(runBeforecls){
            runBeforecls=runBeforecls.split(" ");
            addClasses(elem,runBeforecls);   
        }else{
            runBeforecls=[];
        }
        if(!$t.isIE){
            var duration='webkitAnimationDuration';
        }else{
            var duration='animationDuration';
        }
        elem.animation = {
            class : cls,
            elem : elem,
            sync : json.sync===false ? false : true,
            isRun : false,
            autoRun : json.autoRun ? true : false,
            autoReturnBeforeState:json.autoReturnBeforeState?json.autoReturnBeforeState:group.setup.autoReturnBeforeState,
            _state:{
                runTimeID : null,
                runBeforeClass:runBeforecls
            },
            start:function(reverse){
                var timeoutMax = 0;
                var timeout;
                if (this.sync) {
                    for (var i = 0; i < tags.length; i++) {
                        var t = tags[i];
                        if (!t.isRun) {
                            t.isRun = true;
                            addClasses(t.elem, t.class);
                            removeClasses(t.elem,t._state.runBeforeClass);
                            timeout = parseInt(window.getComputedStyle(t.elem)[duration].replace('ms', '').replace('s', '000'));
                            if (timeout > timeoutMax)
                                timeoutMax = timeout;
                            ( function(t) {
                                t._state.runTimeID = setTimeout(function() {
                                    t.isRun = false;
                                    removeClasses(t.elem, t.class);
                                    if(t.autoReturnBeforeState)
                                        addClasses(t.elem,runBeforecls);
                                }, timeout);
                            }(t));
                        }
                    }
                    var me = this;
                    tags.nextRunTimeID = setTimeout(function() {
                        if (reverse) {
                            me.startPrev();
                        } else {
                            me.startNext();
                        }
                    }, timeoutMax);
                }
            },
            startNext : function() {
                var t = group[json.index + 1];
                if (!t){
                    if(group.setup.repeatCount==-1){
                        t=group[0];
                        t[0].start();
                    }
                }else{
                    t[0].start();
                }
            },
            startPrev : function() {
                var t = group[json.index - 1];
                if (!t)
                    return;
                t[0].start(1);
            },
            stop : function() {
                if (this.sync) {
                    for (var i = 0; i < tags.length; i++) {
                        var t = tags[i];
                        if (t.isRun) {
                            clearTimeout(t._state.runTimeID);
                            clearTimeout(tags.nextRunTimeID);
                            t.isRun = false;
                            removeClasses(t.elem, t.class);
                        }
                    }
                }
            },
            getTags : function() {
                return tags;
            },
            getGroup : function() {
                return group;
            }
        }
        tags.push(elem.animation);
        tags.stop = function() {
            for (var i = 0; i < tags.length; i++) {
                tags[i].stop();
            }
        }
        tags.returnBefore = function() {
            for (var i = 0; i < tags.length; i++) {
                addClasses(tags[i].elem,tags[i]._state.runBeforeClass);
            }
        }
        elem.removeAttribute("anim");
    }
    $t.animation={runAuto:function(){
            for (var e in animationGroup) {
                var t = animationGroup[e];
                for (var f in t) {
                    var u = t[f];
                    for (var h in u) {
                        if (u[h].autoRun)
                            u[h].start();
                    }
                }
            }
        },
        animationGroup:animationGroup
    }
    $t.readyByRenderDocument.on(function(){
        $t.animation.runAuto();  
    });
})();
