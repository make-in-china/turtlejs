/// <reference path='JavaScriptStatement.ts'/>
namespace JS{
    interface IJavaScriptParseState{
        condition:string
        index: number
        action: string
        length: number
        block:JavaScriptBlock
        root:JavaScriptBlock
        keyWordStart:number
        commentStart:number
        stringStart:number
        stringStartBy:string
    }
    export class Parser{
        private static getInitData(condition:string):IJavaScriptParseState{
            let root=new JavaScriptBlock("","");
            return {
                condition:condition,
                index: 0,
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
        private static ''(m:IJavaScriptParseState){
            switch(m.condition[m.index]){
                case " ":
                    m.action="space";
                    m.index++;
                case "\n":
                    m.index++;
                default:
                    m.action="keyWord";
                    m.keyWordStart=m.index;
                    // m.index++;
            }
        }
        private static parseKeyWord(m:IJavaScriptParseState):boolean{
            
            let keyWordEnd=m.index;
            let keyWord=m.condition.substring(m.keyWordStart,keyWordEnd);
            m.keyWordStart=-1;
            if(keyWord===""){
                return false;
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
        private static pushComment(m:IJavaScriptParseState,comment:JavaScriptComment){
            this.pushKeyWordOrBlock(m,comment);
        }
        private static pushKeyWord(m:IJavaScriptParseState,keyWord:string){
            this.pushKeyWordOrBlock(m,keyWord);
        }
        private static pushString(m:IJavaScriptParseState,string:JavaScriptString){
            this.pushKeyWordOrBlock(m,string);
        }
        private static pushBlock(m:IJavaScriptParseState,block:JavaScriptBlock){
            this.pushKeyWordOrBlock(m,block);
            m.block=block;
        }
        private static pushKeyWordOrBlock(m:IJavaScriptParseState,keyWordOrBlockOrComment:string|JavaScriptBlock|JavaScriptComment|JavaScriptString){
            this.getLastStatement(m).push(keyWordOrBlockOrComment)
        }
        private static getLastStatement(m:IJavaScriptParseState):JavaScriptStatement{
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
        private static '*/<>'(m:IJavaScriptParseState,keyWord:string){
            if(!this['?='](m,keyWord)){
                this.parseKeyWord(m);
                this.pushKeyWord(m,keyWord);
                m.action='';
                m.index++;
            }
        }
        private static comment(m:IJavaScriptParseState){
            if(m.condition[m.index]==='\n'){
                this.pushComment(m,new JavaScriptComment(m.condition.substring(m.commentStart,m.index)));
            }
            m.index++;
            m.action="";
        }   
        private static comment2(m:IJavaScriptParseState){
            if(m.condition[m.index]==='*'&&m.condition[m.index+1]==='/'){
                this.pushComment(m,new JavaScriptComment(m.condition.substring(m.commentStart,m.index+2)));
            }
            m.index+=2;
            m.action="";
        }
        private static '/'(m:IJavaScriptParseState){
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
                    if(!this['*/<>'](m,'/')){
                        this.parseKeyWord(m);
                        this.pushKeyWord(m,'/');
                        m.index+=2;
                        m.action="";
                    }
            }
        }
        private static '+-%'(m:IJavaScriptParseState,keyWord:string){
            if(m.condition[m.index+1]===keyWord){
                this.parseKeyWord(m);
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
        private static '?='(m:IJavaScriptParseState,keyWord:string):boolean{
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
            }
            return false;
        }
        
        private static '?=='(m:IJavaScriptParseState,keyWord:string):boolean{
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
        private static ';'(m:IJavaScriptParseState){
            this.parseKeyWord(m);
            this.pushKeyWord(m,';');
            this.getLastStatement(m).isEnd=true;
            m.action="";
            m.index++;
        }
        private static '.'(m:IJavaScriptParseState){
            if(!this.parseKeyWord(m)){
                throw new Error("此处不该有'.'");
            }
            this.pushKeyWord(m,'.');
            m.action="";
            m.index++;
        }

        private static '!~'(m:IJavaScriptParseState,keyWord:string){
            if(this.parseKeyWord(m)){
                //不能在keyword后面出现!
                throw new Error("此处不该有'"+keyWord+"'");
            }
            this.pushKeyWord(m,keyWord);
            m.action="";
            m.index++;
        }
        
        private static space(m:IJavaScriptParseState){
            if(m.condition[m.index]===' '){
                m.index++;
                return ;
            }
            this.pushKeyWord(m,' ');
            m.action='';
        }
        private static '({['(m:IJavaScriptParseState,keyWord:string,keyWordEnd:string){
            //终止
            this.parseKeyWord(m);
            this.pushBlock(m,new JavaScriptBlock(keyWord,keyWordEnd));
            m.index++;
            m.action="";
        }
        private static ')}]'(m:IJavaScriptParseState,keyWord:string,keyWordBegin:string){
            //终止
            this.parseKeyWord(m);
            if(m.block.begin!==keyWordBegin){
                throw new Error("缺少'"+keyWordBegin+"'");
            }
            m.block.isEnd=true;
            m.index++;
            m.action="";
        }

        private static '"`\''(m:IJavaScriptParseState,keyWord:"'"|'"'|'`'){
            m.stringStart=m.index;
            m.index++;
            m.action='string';
            m.stringStartBy=keyWord;
        }
        private static string(m:IJavaScriptParseState){
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
        private static parseEnd(m:IJavaScriptParseState){
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
        }
        private static keyWord(m:IJavaScriptParseState){
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
                    if(!this['?='](m,'=')){
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
                    this[')}]'](m,keyWord,'{');
                    break;
                case "]":
                    this[')}]'](m,keyWord,'[');
                    break;
                case ")":
                    this[')}]'](m,keyWord,'(');
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
                case "<":
                case ">":
                    this['*/<>'](m,keyWord);
                    break;
                case "\n":
                case "\r":
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
        static parseStructor(condition:string):JavaScriptBlock{
            let m=this.getInitData(condition);
            let length=condition.length;
            while (m.index <= length) {
                this[m.action](m,condition);
            }
            this.parseEnd(m);
            return m.root;
        }
    }
}