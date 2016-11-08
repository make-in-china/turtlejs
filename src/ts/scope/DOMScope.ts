/// <reference path="RootScope.ts"/>
/// <reference path="Scope.ts"/>
class DOMScope{
    static stack:Array<Scope|RootScope>=[$rootScope]
    /**
     * 在dom节点上创建变量作用域对象
     * @param {INode} node - dom节点
     * @param {string} name - 名称
     */
    static create(node:INode,name:string){
        let scope=this.get(node);
        if(node.parentNode!==scope.__actionNode__){
            scope=new Scope(node,scope,name);
            this.stack.push(scope);
        }else/* if(scope.__name__!==name)*/{
            throw new Error('当前层不允许重复定义scope:'+name);
        }
        return scope;
    }

    
    /**
     * 获取变量作用域对象
     * @param {INode} node - dom节点
     */
    static get(node:INode):Scope|RootScope{
        if(!node){
            return $rootScope;
        }
        while(node!=null){
            if(node.__scope__){
                return node.__scope__;
            }
            node=node.parentNode;
        }
        return $rootScope;
    }
    /**
     * 切断dom节点和变量作用域对象的链接
     * @param {Scope} scopeVarObject - 变量作用域对象
     */
    static unlink(scope:Scope){
        var p=scope.__parent__;
        if(p){
            scope.__parent__=null;
            removeItem(p.__children__,scope);
            var name=scope.__name__;
            if(!isUndefined(name)){
                delete p[name];
            }
        }
    }

    /**
     * 链接dom节点和变量作用域对象
     * @param {Scope} scopeVarObject - 变量作用域对象
     * @param {INode} node - dom节点
     */
    static link(scope:Scope,node:INode){
        var p:Scope|RootScope=this.get(node);
        if(!p){
            return;
        }
        scope.__parent__=p;
        p.__children__.push(scope);
        if(scope.__name__){
            p[scope.__name__]=scope;
        }
    }
}