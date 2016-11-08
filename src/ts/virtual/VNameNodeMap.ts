/// <reference path="../lib/is.ts"/>
class VNamedNodeMap{
    private _length:number=0;
    indexOfName(name:string) {
        var l = this._length;
        for (var i = 0; i < l; i++) {
            if (this[i].name === name) {
                return i;
            }
        }
        return -1;
    }
    indexOf(o) {
        var l = this._length;
        for (var i = 0; i < l; i++) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    }
    getNamedItem(name:string) {
        var idx = this.indexOfName(name);
        if (idx === -1) {
            return null;
        } else {
            return this[idx];
        }
    }
    //getNamedItemNS: getNamedItemNS()
    item(index) {
        return this[index];
    }
    get length() {
        return this._length;
    }
    removeNamedItem(v:string|Object) {
        if (isString(v)) {
            var idx = this.indexOfName(v);
        } else {
            var idx = this.indexOf(v);
        }

        if (idx !== -1) {
            var l = this._length;
            for (var i = idx; i < l; i++) {
                this[i] = this[i + 1];
            }
            this._length--;
            delete this[this._length];
            var hideValueName = '__' + v + '__';
            if (hideValueName in this) {
                this[hideValueName] = "";
            }
        }
    }
    //removeNamedItemNS: removeNamedItemNS()
    setNamedItem(name:string,value) {
        if (!isString(value)) {
            if (isObject(value)) {
                value = value.toString();
            } else if (value === undefined) {
                value = "";
            }
        }
        var idx = this.indexOfName(name);
        if (idx === -1) {
            this[this._length] = { name: name, value: value };
            this._length++;
        } else {
            this[idx].value = value;
        }
        var hideValueName = '__' + name + '__';
        if (hideValueName in this) {
            this[hideValueName] = value;
        }
    }
    //setNamedItemNS: setNamedItemNS()
}