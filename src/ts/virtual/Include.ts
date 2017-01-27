
let includeJSFiles = (function () {
    class IncludeTask {
        static jsScript: IHashObject<VMDOM.VScriptElement> = {};
        files: string[];
        constructor(public parent: IncludeTask, files: string[] | string, public callback?: () => void) {
            if (parent) {
                parent.child = this;
            }
            let arr: string[];
            let data = IncludeTask.jsScript;
            if (isArray(files)) {
                arr = <Array<string>>files;
                for (let i in arr) {
                    let url = files[i];
                    if (isString(url) && !(url in data)) {
                        arr.push(url);
                        data[url] = $$$("script");
                    }
                }
            } else if (files) {
                arr = [];
                let url: string = <string>files;
                if (isString(url) && !(url in data)) {
                    arr.push(url);
                    data[url] = $$$("script");
                }
            } else {
                arr = [];
            }
            this.files = arr;
        }
        child: IncludeTask | null = null;
        isallload = false;
        count = 0;
        onallload() {
            this.isallload = true;
            if (this.child == null) {
                setIncludeTaskDone(this, this.callback);
            } else if (this.child.isallload) {
                setIncludeTaskDone(this, this.callback);
            }
            if (this.parent != null) {
                this.parent.onchildallload();
            }
        }
        onchildallload() {
            if (this.isallload) {
                setIncludeTaskDone(this, this.callback);
            }
        }
    }
    let includeTask: IncludeTask;

    function setIncludeTaskDone(task, fn) {
        includeTask = task.parent;
        if (includeTask != null) includeTask.child = null;
        task.child = null;
        if (isFunction(fn)) fn();
    }
    function includeJSFile(task: IncludeTask) {
        if (task.files.length > 0) {
            let url = <string>task.files.shift();
            let scriptNode = IncludeTask.jsScript[url];
            scriptNode.src = url;
            task.count++;
            scriptNode.onload = function () {
                task.count--;
                includeJSFile(task);
            }
            document.head.appendChild(<any>scriptNode);

        } else if (task.count == 0) {
            task.onallload();
        }
    }
    return function (files: Array<string> | string, callback?: () => void) {
        includeTask = new IncludeTask(includeTask, files, callback);
        includeJSFile(includeTask);
    }
} ());
