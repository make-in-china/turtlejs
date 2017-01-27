class AttributeParser {
    ref(node: IElement, outerChildNodes: IElement[], outerElement, props, part) {
        let refName = node.getAttribute('ref');
        node.removeAttribute('ref');
        KeyArrayHashObjectManage.push($t.refs, refName.split(','), node);
    }
    ":"(node, outerChildNodes, outerElement, props, part) {
        execNodeQuestion(node, outerChildNodes, outerElement, props, part);
        setQuestionAtrr(node, outerChildNodes, outerElement, props, part);
    }
    'p-ref'(node, outerChildNodes, outerElement, props, part) {
        let refName = takeAttr(node, 'p-ref');
        let arrRefName: string[]
        if (part && refName) {
            arrRefName = refName.split(',');
            for (var i = 0; i < arrRefName.length; i++) {
                part['$' + arrRefName[i]] = node;
            }
        }
    }
    // bind(node, outerChildNodes, outerElement, props, part) {
    //     let v= takeAttr(node, 'bind');
    //     if(v){
    //         bindNodeByCondition(node,v);
    //     }
    // }
    // remove(node, outerChildNodes, outerElement, props, part) {
    //     var bindInfo = bindEval(node, takeAttr(node, 'remove'), outerChildNodes, outerElement, props, part, function (v) {
    //         if (!v) return;
    //         if(!bindInfo) return;
    //         removeBind(this, bindInfo.targetName, bindInfo.name);
    //         removeNode(node);
    //     });
    // }
    // add(node, outerChildNodes, outerElement, props, part) {
    //     var placeholder = $$$('', ENodeType.Comment);
    //     replaceNodeByNode(node, placeholder);
    //     var bindInfo = bindEval(node, takeAttr(node, 'add'), outerChildNodes, outerElement, props, part, function (v) {
    //         if (!v) return;
    //         if(!bindInfo) return;
    //         removeBind(this, bindInfo.targetName, bindInfo.name);
    //         replaceNodeByNode(placeholder, node);
    //     });
    // }
    // show(node, outerChildNodes, outerElement, props, part) {
    //     bindShowHide(node, takeAttr(node, 'show'), true, outerChildNodes, outerElement, props, part);
    // }
    // hide(node, outerChildNodes, outerElement, props, part) {
    //     bindShowHide(node, takeAttr(node, 'hide'), false, outerChildNodes, outerElement, props, part);
    // }
    cls(node, outerChildNodes, outerElement, props, part) {
        $t.replaceClassStore.push(node);
        /*不要删node.removeAttribute('cls');*/
    }
    'p-main'(node, outerChildNodes, outerElement, props, part) {
        if (part && !part.partMain) {
            part.partMain = node;
        }
    }
};
