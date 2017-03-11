/// <reference path='JavaScriptStatement.ts'/>
namespace JS{
    export interface IJavaScriptParseState{
        condition:string
        index: number
        action: keyof typeof Parser
        length: number
        block:JavaScriptBlock<keyof IBreakes>
        root:JavaScriptBlock<keyof IBreakes>
        keyWordStart:number
        commentStart:number
        stringStart:number
        stringStartBy:string
    }
    export abstract class Parser{
        protected static getInitData(condition:string,start:number=0):IJavaScriptParseState{
            let root=new JavaScriptBlock('','');
            return {
                condition:condition,
                index: start,
                action: '',
                length: condition.length,
                block:root,
                root:root,
                keyWordStart:-1,
                commentStart:-1,
                stringStart:-1,
                stringStartBy:""
            }
        }
        static ''(this:typeof Parser,m:IJavaScriptParseState){
            switch(m.condition[m.index]){
                case " ":
                    m.action="space";
                    m.index++;
                    break;
                case "\n":
                    m.index++;
                    break;
                default:
                    m.action="keyWord";
                    m.keyWordStart=m.index;
                    break;
                    // m.index++;
            }
        }
        /**是否跟随回车换行 */
        static isFollowCarriageReturnOrLineFeed(this:typeof Parser,m:IJavaScriptParseState):boolean{
            let statement=last.call(m.block.children);
            if(!statement){
                return false;
            }
            let keyWords=statement.children;
            
            let length=keyWords.length;
            if(length===0){
                return false;
            }
            let lastKeyWord=keyWords[length-1];
            switch(lastKeyWord){
                case '\r':
                case '\n':
                    return true;
                case ' ':
                    break;
                default:
                    return false;
            }
            if(length===1){
                return false;
            }
            let beforeLastKeyWord=keyWords[length-2];
            switch(beforeLastKeyWord){
                case '\r':
                case '\n':
                    return true;
                default:
                    return false;
            }
        }
        static parseKeyWord(this:typeof Parser,m:IJavaScriptParseState):boolean{
            
            let keyWordEnd=m.index;
            let keyWord=m.condition.substring(m.keyWordStart,keyWordEnd);
            m.keyWordStart=-1;
            if(keyWord===""){
                return false;
            }
            
            if(this.isFollowCarriageReturnOrLineFeed(m)){
                this.pushKeyWord(m,';');
                this.getLastStatement(m).isEnd=true;
            }
            // switch(keyWord){
            //     case "break":
            //     case "for":
            //     case "var":
            //     case "case":
            //     case "catch":
            //     case "continue":
            //     case "debugger":
            //     case "default":
            //     case "delete":
            //     case "do":
            //     case "else":
            //     case "finally":
            //     case "function":
            //     case "if":
            //     case "in":
            //     case "instanceof":
            //     case "new":
            //     case "return":
            //     case "switch":
            //     case "this":
            //     case "throw":
            //     case "try":
            //     case "typeof":
            //     case "void":
            //     case "with":
            //     case "while":
            // }
            this.pushKeyWord(m,keyWord);
            return true;
        }
        static pushComment(this:typeof Parser,m:IJavaScriptParseState,comment:JavaScriptComment){
            this.pushKeyWordOrBlock(m,comment);
        }
        static pushKeyWord(this:typeof Parser,m:IJavaScriptParseState,keyWord:string){
            this.pushKeyWordOrBlock(m,keyWord);
        }
        static pushString(this:typeof Parser,m:IJavaScriptParseState,string:JavaScriptString){
            this.pushKeyWordOrBlock(m,string);
        }
        static pushBlock(this:typeof Parser,m:IJavaScriptParseState,block:JavaScriptBlock<keyof IBreakes>){
            this.pushKeyWordOrBlock(m,block);
            m.block=block;
        }
        static pushKeyWordOrBlock(this:typeof Parser,m:IJavaScriptParseState,keyWordOrBlockOrComment:TJavaScriptStatementChild){
            this.getLastStatement(m).push(keyWordOrBlockOrComment)
        }
        static getLastStatement(this:typeof Parser,m:IJavaScriptParseState):JavaScriptStatement{
            if(m.block.isEnd){
                m.block=m.block.parent.parent;
            }

            let statement:JavaScriptStatement;
            let old=last.call(m.block.children);
            if(old){
                statement=old
            }else{
                statement=new JavaScriptStatement();
                m.block.push(statement);
            }
            if(statement.isEnd){
                statement=new JavaScriptStatement();
                m.block.push(statement);
            }
            return statement;
        }
        static '*/<>'(this:typeof Parser,m:IJavaScriptParseState,keyWord:string){
            if(!this['?='](m,keyWord)){
                this.parseKeyWord(m);
                this.pushKeyWord(m,keyWord);
                m.action='';
                m.index++;
            }
        }
        static '<>'(this:typeof Parser,m:IJavaScriptParseState,keyWord:string){
            if(!this['<<>>'](m,keyWord)&&!this['?='](m,keyWord)){
                this.parseKeyWord(m);
                this.pushKeyWord(m,keyWord);
                m.action='';
                m.index++;
            }
        }
        static '<<>>'(this:typeof Parser,m:IJavaScriptParseState,keyWord:string):boolean{
            if(m.condition[m.index+1]===keyWord){
                if(this['<<<>>>'](m,keyWord)){
                    return true;
                }
                if(!this.parseKeyWord(m)){
                    throw new Error("此处不该有'"+keyWord+keyWord);
                }
                this.pushKeyWord(m,keyWord+keyWord);
                m.action='';
                m.index+=2;
            }
            return false;
        }
        static '<<<>>>'(this:typeof Parser,m:IJavaScriptParseState,keyWord:string):boolean{
            if(m.condition[m.index+2]===keyWord){
                if(!this.parseKeyWord(m)){
                    throw new Error("此处不该有'"+keyWord+keyWord+keyWord);
                }
                this.pushKeyWord(m,keyWord+keyWord+keyWord);
                m.action='';
                m.index+=3;
                return true;
            }
            return false;
        }
        static comment(this:typeof Parser,m:IJavaScriptParseState){
            if(m.condition[m.index]==='\n'){
                this.pushComment(m,new JavaScriptComment(m.condition.substring(m.commentStart,m.index)));
            }
            m.index++;
            m.action="";
        }   
        static comment2(this:typeof Parser,m:IJavaScriptParseState){
            if(m.condition[m.index]==='*'&&m.condition[m.index+1]==='/'){
                this.pushComment(m,new JavaScriptComment(m.condition.substring(m.commentStart,m.index+2)));
            }
            m.index+=2;
            m.action="";
        }
        static '/'(this:typeof Parser,m:IJavaScriptParseState){
            switch(m.condition[m.index+1]){
                case "/":
                    //注释
                    this.parseKeyWord(m);
                    m.commentStart=m.index;
                    m.index+=2;
                    m.action="comment";
                    break;
                case "*":
                    /*注释*/
                    this.parseKeyWord(m);
                    m.commentStart=m.index;
                    m.index+=2;
                    m.action="comment2";
                    break;
                default:
                    this['*/<>'](m,'/');
            }
        }
        static '+-%'(this:typeof Parser,m:IJavaScriptParseState,keyWord:string){
            if(m.condition[m.index+1]===keyWord){
                this.parseKeyWord(m);
                this.pushKeyWord(m,keyWord+keyWord);
                m.index+=2;
                m.action="";
            }else{
                if(!this['?='](m,keyWord)){
                    this.parseKeyWord(m);
                    this.pushKeyWord(m,keyWord);
                    m.index++;
                    m.action="";
                }
            }
        }
        static '?='(this:typeof Parser,m:IJavaScriptParseState,keyWord:string):boolean{
            if(m.condition[m.index+1]==='='){
                if(this['?=='](m,keyWord)){
                    return true;
                }
                if(!this.parseKeyWord(m)){
                    throw new Error("此处不该有'"+keyWord+"='");
                }
                this.pushKeyWord(m,keyWord+'=');
                m.action='';
                m.index+=2;
                return true;
            }
            return false;
        }
        static '=>'(this:typeof Parser,m:IJavaScriptParseState):boolean{
            if(m.condition[m.index+1]==='>'){
                this.parseKeyWord(m);
                this.pushKeyWord(m,'=>');
                m.action='';
                m.index+=2;
                return true;
            }
            return false;
        }
        
        static '?=='(this:typeof Parser,m:IJavaScriptParseState,keyWord:string):boolean{
            if(m.condition[m.index+2]==='='){
                if(!this.parseKeyWord(m)){
                    throw new Error("此处不该有'"+keyWord+"='");
                }
                
                this.pushKeyWord(m,keyWord+'==');
                m.index+=3;
                m.action='';
                return true;
            }
            return false
        }
        static ';'(this:typeof Parser,m:IJavaScriptParseState){
            this.parseKeyWord(m);
            this.pushKeyWord(m,';');
            this.getLastStatement(m).isEnd=true;
            m.action="";
            m.index++;
        }
        static '.'(this:typeof Parser,m:IJavaScriptParseState){
            if(!this.parseKeyWord(m)){
                let statement=<JavaScriptStatement>last.call(m.block.children);
                if(statement.children.length>0){
                    let lastKeyWord=<TJavaScriptStatementChild>last.call(statement.children);
                    if(!(lastKeyWord instanceof JavaScriptBlock&&lastKeyWord.begin==='(')){
                        throw new Error("此处不该有'.'");
                    }
                }
            }
            this.pushKeyWord(m,'.');
            m.action="";
            m.index++;
        }

        static '!~'(this:typeof Parser,m:IJavaScriptParseState,keyWord:string){
            if(this.parseKeyWord(m)){
                //不能在keyword后面出现!
                throw new Error("此处不该有'"+keyWord+"'");
            }
            this.pushKeyWord(m,keyWord);
            m.action="";
            m.index++;
        }
        static isStatementBegin(m:IJavaScriptParseState):boolean{
            if(m.block.isEnd){
                return true;
            }

            let statement=last.call(m.block.children);
            if(statement){
                return statement.children.length===0;
            }else{
                return true;
            }
        }
        static space(this:typeof Parser,m:IJavaScriptParseState){
            if(m.condition[m.index]===' '){
                m.index++;
                return ;
            }
            //不添加为语句的开始。
            if(!this.isStatementBegin(m)){
                this.pushKeyWord(m,' ');
            }
            m.action='';
        }
        static '({['<T extends keyof IBreakes>(this:typeof Parser,m:IJavaScriptParseState,keyWord:string,keyWordEnd:IBreakes[T]){
            //终止
            this.parseKeyWord(m);
            this.pushBlock(m,new JavaScriptBlock(<T>keyWord,keyWordEnd));
            m.index++;
            m.action="";
        }
        static ')}]'<T extends keyof IBreakes>(this:typeof Parser,m:IJavaScriptParseState,keyWordBegin:T){
            //终止
            this.parseKeyWord(m);
            if(m.block.begin!==keyWordBegin){
                throw new Error("缺少'"+keyWordBegin+"'");
            }
            let block=m.block;
            block.isEnd=true;
            m.block=block.parent.parent;
            m.index++;
            m.action="";
        }

        static '"`\''(this:typeof Parser,m:IJavaScriptParseState,keyWord:"'"|'"'|'`'){
            m.stringStart=m.index;
            m.index++;
            m.action='string';
            m.stringStartBy=keyWord;
        }
        static string(this:typeof Parser,m:IJavaScriptParseState){
            switch(m.condition[m.index]){
                case '\\':
                    m.index+=2;
                    return;
                case m.stringStartBy:
                    this.pushString(m,new JavaScriptString(m.condition.substring(m.stringStart,m.index+1)));
                    m.action='';
                    m.index++;
                    return;
                default:
                    m.index++;
            }
        }
        static parseEnd(this:typeof Parser,m:IJavaScriptParseState){
            switch(m.action){
                case "keyWord":
                    this.parseKeyWord(m);
                    break;
                case "space":
                    this.pushKeyWord(m,' ');
                    break;
                case "string":
                    throw new Error("字符串没有闭合！");
            }
            if(m.block!==m.root){
                if(!m.block.isEnd){
                    throw new Error(m.block.begin+"没有闭合！");
                }
            }
        }
        static keyWord(this:typeof Parser,m:IJavaScriptParseState){
            let keyWord=m.condition[m.index];
            switch(keyWord){
                case ".":
                case ";":
                case "/":
                    this[m.condition[m.index]](m);
                    break;
                case " ":
                    this.parseKeyWord(m);
                    m.stringStart=m.index-1;
                    m.action="space";
                    m.index++;
                    break;
                case "=":
                    if(!this['?='](m,'=')&&!this['=>'](m)){
                        //赋值
                        if(!this.parseKeyWord(m)){
                            throw new Error("此处不该有'='");
                        }
                        this.pushKeyWord(m,'=');
                        m.action="";
                        m.index++;
                    }
                    break;
                case "!":
                case "~":
                    this['!~'](m,keyWord);
                    break;
                case '"':
                case "'":
                case "`":
                    this['"`\''](m,keyWord);
                    break;
                case "}":
                    this[')}]'](m,'{');
                    break;
                case "]":
                    this[')}]'](m,'[');
                    break;
                case ")":
                    this[')}]'](m,'(');
                    break;
                case "(":
                    this['({['](m,keyWord,')');
                    break;
                case "{":
                    this['({['](m,keyWord,'}');
                    break;
                case "[":
                    this['({['](m,keyWord,']');
                    break;
                case "+":
                case "-":
                case "%":
                    this['+-%'](m,keyWord);
                    break;
                case "*":
                    this['*/<>'](m,keyWord);
                    break
                case "<":
                case ">":
                    this['<>'](m,keyWord);
                    break;
                case "\n":
                case "\r":
                case "\t":
                case ",":
                case ":":
                    this.parseKeyWord(m);
                    this.pushKeyWord(m,keyWord);
                    m.action="";
                    m.index++;
                    break;
                case "&":
                case "|":
                case "?":
                    throw new Error("未实现");
                default:
                    m.index++;
            }
        }
        /**解析结构 */
        static parseStructor(this:typeof Parser,condition:string,start:number=0,checkCallback?:(m:IJavaScriptParseState)=>boolean):JavaScriptBlock<keyof IBreakes>{
            let m=this.getInitData(condition,start);
            let length=condition.length;
            if(checkCallback){
                while (m.index < length) {
                    if(checkCallback(m)){
                        break;
                    }
                    this[m.action](m,condition);
                }
            }else{
                while (m.index < length) {
                    this[m.action](m,condition);
                }
                this.parseEnd(m);
            }
            return m.root;
        }
        /**仅从文本流里解析出一个代码块 */
        static parseBlock(condition:string,start:number):{
            length:number,
            block:JavaScriptBlock<keyof IBreakes>
        }{
            let m=this.getInitData(condition,start);
            let length=condition.length;
            let block:JavaScriptBlock<keyof IBreakes>|null=null;
            while (m.index < length) {
                if(!block&&m.block!==m.root){
                    //记录第一个block
                    block=m.block;
                }
                if(block&&block.isEnd){
                    break;
                }
                
                this[m.action](m,condition);
            }
            return {length:m.index-start,block:<any>block};
        }
        static parseStatement(condition:string,start:number):{
            length:number,
            statement:JavaScriptStatement
        }{
            let m=this.getInitData(condition,start);
            let length=condition.length;
            let chds=m.root.children;
            while (m.index < length) {
                this[m.action](m,condition);
                if(chds.length>0&&chds[0].isEnd){
                    break;
                }
            }
            return {length:m.index-start,statement:chds[0]};
        }
    }
}

