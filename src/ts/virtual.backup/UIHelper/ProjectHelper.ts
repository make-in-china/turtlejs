

namespace UIHelper {
    export let fs = typeof require !== "undefined" && require('fs');
    export function buildProject(this: void, className: string, path: string) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }

        let htmlPath = path + '/View.html';
        let testHtmlPath=path+'/View.test.html'
        let testPath=path+'/View.test.ts'
        let classPath = path + '/Class.ts';
        let scriptPath = path + '/Script.ts';
        className = className[0].toUpperCase() + className.substr(1).toLowerCase();

        fs.writeFileSync(htmlPath,
            `<div>
    <div ref="${className}"></div>
</div>`);

        fs.writeFileSync(testHtmlPath,
            `<!DOCTYPE html>
<html>
  <head>
    <title>Turtlejs</title>
    <meta charset="utf-8">
    <script src="../../../dest/js/turtle.0.1.js"></script>
  </head>
  <body>
        <script src="../../../dest/ui/${className}/index.js"></script>
        <script src="../../../dest/ui/${className}/View.test.js"></script>
  </body>
</html>`);

        fs.writeFileSync(testPath,
            `/// <reference path="Script.ts" no-default-lib="true"/>

let part=new ${className}({});
part.insertTo(document.body);`);


        fs.writeFileSync(classPath, getClassString(className));
        fs.writeFileSync(scriptPath, getScriptString(className));
        makeClass(htmlPath, className);
    }
}