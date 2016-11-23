/// <reference path='JavaScriptStatement.ts'/>
interface IJavaScriptParseState{
    condition:string
    index: number
    action: string
    length: number
    statement:JavaScriptStatement
    rootStatement:JavaScriptStatement
    keyWordStart:number
    commentStart:number
    stringStart:number
}
class JavaScript{
    private static getInitData(condition:string):IJavaScriptParseState{
        let rootStatement:JavaScriptStatement=new JavaScriptStatement("root");
        return {
            condition:condition,
            index: 0,
            action: '',
            length: condition.length,
            statement:rootStatement,
            rootStatement:rootStatement,
            keyWordStart:-1,
            commentStart:-1,
            stringStart:-1
        }
    }
    private static ''(m:IJavaScriptParseState){
        switch(m.condition[m.index]){
            case " ":
            case "\n":
                m.index++;
            default:
                m.action="keyWord";
                m.keyWordStart=m.index;
                m.index++;
        }
    }
    private static parseKeyWord(m:IJavaScriptParseState):JavaScriptStatement|null{
        
        let keyWordEnd=m.index-1;
        let keyWord=m.condition.substring(m.keyWordStart,keyWordEnd);
        m.keyWordStart=-1;
        switch(keyWord){
            case "break":
            case "case":
            case "catch":
            case "continue":
            case "debugger":
            case "default":
            case "delete":
            case "do":
            case "else":
            case "finally":
            case "for":
            case "function":
            case "if":
            case "in":
            case "instanceof":
            case "new":
            case "return":
            case "switch":
            case "this":
            case "throw":
            case "try":
            case "typeof":
            case "var":
            case "void":
            case "with":
            case "while":
                throw new Error("不支持该关键词："+keyWord);
            default:
                if(keyWord!==""){
                    let statement:JavaScriptStatement=new JavaScriptStatement("variable",keyWord);
                    if(m.statement.isBlock){
                        m.statement.push(statement);
                    }else{
                        m.statement.addNext(statement);
                    }
                    m.statement=statement;
                    return statement;
                }
                return null;
        }
    }
    private static '+'(m:IJavaScriptParseState){
        this['+-'](m,"+");
    }
    private static '-'(m:IJavaScriptParseState){
        this['+-'](m,"-");
    }
    private static '*'(m:IJavaScriptParseState){
        this['*/<>'](m,'*');
    }
    private static '<'(m:IJavaScriptParseState){
        this['*/<>'](m,'<');
    }
    private static '>'(m:IJavaScriptParseState){
        this['*/<>'](m,'>');
    }
    private static '*/<>'(m:IJavaScriptParseState,keyWord:string){
        if(!this['?='](m,keyWord)){
            this.parseKeyWord(m);
            m.statement.addNext(new JavaScriptStatement(keyWord));
            m.action='';
            m.index++;
        }
    }
    private static comment(m:IJavaScriptParseState){
        if(m.condition[m.index]==='\n'){
            let statement=new JavaScriptStatement("comment",m.condition.substring(m.commentStart,m.index-1));
            m.statement.addNext(statement);
            //不更新m.statement
        }
        m.index++;
        m.action="";
    }   
    private static comment2(m:IJavaScriptParseState){
        if(m.condition[m.index]==='*'&&m.condition[m.index+1]==='/'){
            let statement=new JavaScriptStatement("comment",m.condition.substring(m.commentStart,m.index+1));
            m.statement.addNext(statement);
            //不更新m.statement
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
                    m.statement.addNext(new JavaScriptStatement('/'));
                    m.index+=2;
                    m.action="";
                }
        }
    }
    private static '+-'(m:IJavaScriptParseState,keyWord:string){
        if(m.condition[m.index+1]===keyWord){
            this.parseKeyWord(m);
            m.index+=2;
            m.action="";
        }else{
            if(!this['?='](m,keyWord)){
                this.parseKeyWord(m);
                m.statement.addNext(new JavaScriptStatement(keyWord));
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
            m.statement.addNext(new JavaScriptStatement(keyWord+"="));
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
            m.statement.addNext(new JavaScriptStatement(keyWord+"=="));
            m.index+=3;
            m.action='';
            return true;
        }
        return false
    }
    private static ','(m:IJavaScriptParseState){
        if(!this.parseKeyWord(m)){
            throw new Error("此处不该有','");
        }
        m.statement.addNext(new JavaScriptStatement(","));
        m.action="";
        m.index++;
    }
    private static ';'(m:IJavaScriptParseState){
        this.parseKeyWord(m);
        // m.statement.setParentClose();
        m.statement=<JavaScriptStatement>m.statement.parent;
        m.action="";
        m.index++;
    }
    private static '.'(m:IJavaScriptParseState){
        if(!this.parseKeyWord(m)){
            throw new Error("此处不该有'.'");
        }
        m.statement.addNext(new JavaScriptStatement("."));
        m.action="";
        m.index++;
    }
    private static '!'(m:IJavaScriptParseState){
        this['!~'](m,"!");
    }
    private static '~'(m:IJavaScriptParseState){
        this['!~'](m,"~");
    }
    private static '!~'(m:IJavaScriptParseState,keyWord:string){
        if(this.parseKeyWord(m)){
            //不能在keyword后面出现!
            throw new Error("此处不该有'"+keyWord+"'");
        }
        m.statement.addNext(new JavaScriptStatement(keyWord));
        m.action="";
        m.index++;
    }
    private static ' '(m:IJavaScriptParseState){
        //终止
        this.parseKeyWord(m);
        m.index++;
        m.action="";
    }
    private static '\n'(m:IJavaScriptParseState){
        //终止
        this.parseKeyWord(m);
        m.index++;
        m.action="";
    }
    private static '('(m:IJavaScriptParseState){
        this['({['](m,'(');
    }
    private static ')'(m:IJavaScriptParseState){
        this[')}]'](m,')','(');
    }
    private static '{'(m:IJavaScriptParseState){
        this['({['](m,'{');
    }
    private static '}'(m:IJavaScriptParseState){
        this[')}]'](m,'}','{');
    }
    private static '['(m:IJavaScriptParseState){
        this['({['](m,'[');
    }
    private static ']'(m:IJavaScriptParseState){
        this[')}]'](m,']','[');
    }
    private static '({['(m:IJavaScriptParseState,keyWord:string){
        //终止
        this.parseKeyWord(m);
        let statement=new JavaScriptStatement(keyWord);
        statement.isBlock=true;
        m.statement.addNext(statement);
        m.statement=statement;
        m.index++;
        m.action="";
    }
    private static ')}]'(m:IJavaScriptParseState,keyWord:string,keyWordBegin:string){
        //终止
        this.parseKeyWord(m);
        if((<JavaScriptStatement>m.statement.parent).type!==keyWordBegin){
            throw new Error("缺少'"+keyWordBegin+"'");
        }
        let statement=new JavaScriptStatement(keyWord);
        (<JavaScriptStatement>m.statement.parent).addNext(statement);
        m.statement=statement;
        m.index++;
        m.action="";
    }
    private static '='(m:IJavaScriptParseState){
        if(!this['?='](m,'=')){
            //赋值
            if(!this.parseKeyWord(m)){
                throw new Error("此处不该有'='");
            }
            m.statement.addNext(new JavaScriptStatement('='));
            m.action="";
            m.index++;
        }
    }
    private static keyWord(m:IJavaScriptParseState){
        switch(m.condition[m.index]){
            case "!":
            case "~":
            case ",":
            case ".":
            case "=":
            case ";":
            case "+":
            case "-":
            case "*":
            case " ":
            case "/":
            case "<":
            case ">":
            case "\n":
            case "(":
            case ")":
            case "{":
            case "}":
            case "[":
            case "]":
                this[m.action](m,m.condition[m.index]);
                break;
            case '"':
            case "'":
            case "`":
                m.action='string';
                break;
            default:
                m.index++;
        }
    }
    static parse(condition:string):JavaScriptStatement{
        let m=this.getInitData(condition);
        let length=condition.length;
        while (m.index < length) {
            this[m.action](m,condition);
        }
        return m.rootStatement;
    }
}