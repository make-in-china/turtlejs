
//浏览器兼容
let classSplitRE = /\s+/g
class ClassList {
    constructor(private element: IElement) { }
    add(value) {
        let classes = this.element.className.split(classSplitRE);
        let index = classes.indexOf(value);
        if (!~index) {
            classes.push(value);
            this.element.className = classes.join(' ');
        }

    }
    remove(value) {
        let classes = this.element.className.split(classSplitRE);
        let index = classes.indexOf(value);
        if (~index) {
            classes.splice(index, 1);
            this.element.className = classes.join(' ');
        }
    }
    toggle(value) {
        let classes = this.element.className.split(classSplitRE);
        let index = classes.indexOf(value);
        if (~index) {
            classes.splice(index, 1);
        } else {
            classes.push(value);
        }
        this.element.className = classes.join(' ');
    }
    contains(value) {
        return !!~this.element.className.split(classSplitRE).indexOf(value);
    }
    item(i) {
        return this.element.className.split(classSplitRE)[i] || null;
    }
}
