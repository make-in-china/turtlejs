

namespace UIHelper {
    export let fs = typeof require !== "undefined" && require('fs');
    export function buildProject(this: void, className: string, path: string) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }

        let htmlPath = path + '/View.html';
        let classPath = path + '/Class.ts';
        let scriptPath = path + '/Script.ts';
        className = className[0].toUpperCase() + className.substr(1).toLowerCase();
        fs.writeFileSync(htmlPath,
            `<div>
    <div ref="${className}"></div>
    </div>`);
        fs.writeFileSync(classPath, getClassString(className));
        fs.writeFileSync(scriptPath, getScriptString(className));
        makeClass(htmlPath, className);
    }
}