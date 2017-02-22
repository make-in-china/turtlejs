/// <reference path='../javascript/Parser.ts'/>
namespace JS{
    
    export interface IJavaScriptParseXState extends IJavaScriptParseState{
        endStatementBy:"{"|";"|"<"|","|"@"|"\n"|"\r"|""
    }
    export abstract class ParserX extends Parser{
        static keyWord(m:IJavaScriptParseXState){
            let keyWord=m.condition[m.index];
            switch(keyWord){
                case "{":
                case ";":
                case "<":
                case ",":
                case "@":
                case "\n":
                case "\r":
                    
                    this.parseKeyWord(m);
                    this.pushKeyWord(m,';');
                    this.getLastStatement(m).isEnd=true;
                    m.action="";
                    m.endStatementBy=keyWord;
                    m.index++;
                    break;
                default:
                    super.keyWord(m);
            }
        }

        static getInitData(condition:string,start:number=0):IJavaScriptParseXState{
            let m:IJavaScriptParseXState=<any>super.getInitData(condition,start);
            m.endStatementBy='';
            return m;
        }

        static parseSubStatement(condition:string,start:number){
            let m=this.getInitData(condition,start);
            let length=condition.length;
            let chds=m.root.children;
            while (m.index < length) {
                this[m.action](m,condition);
                if(chds.length>0&&chds[0].isEnd){
                    break;
                }
            }
            return {
                length:m.index-start,
                statement:chds[0],
                endBy:m.endStatementBy
            };
        }
    }
}