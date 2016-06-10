function dropMove(elemTarget,elemMove,arrow,noOut,fn){
    fn=$t.getDebounce(fn);
    elemTarget.addEventListener("mousedown",md);
    elemTarget.addEventListener("touchstart",td);
    elemTarget.movePosition={left:0,top:0};
    with(document.body){
        addEventListener("mouseup",mu);
        addEventListener("touchend",tu);
        addEventListener("touchcancel",tu);
    }
    var start,startLeft,startTop;
    function md(e){
        startLeft=elemMove.offsetLeft;
        startTop=elemMove.offsetTop;
        start=e;
        document.body.addEventListener("mousemove",mm);
    }
    function td(e){
        startLeft=elemMove.offsetLeft;
        startTop=elemMove.offsetTop;
        start=e.changedTouches[0];
        document.body.addEventListener("touchmove",tm);
    }
    function mmove(e){
        switch(arrow){
            case 1:
                setLeft(startLeft+e.x-start.x);
                break;
            case 2:
                setTop(startTop+e.y-start.y);
                break;
            case 3:
                setLeft(startLeft+e.clientX-start.x);
                setTop(startTop+e.clientX-start.x);
                break;
            case 4:
                setLeft(startLeft+e.clientY-start.y);
                setTop(startTop+e.clientY-start.y);
                break;
            default:
                setLeft(startLeft+e.x-start.x);
                setTop(startTop+e.y-start.y);
        }
        fn(30);
    }
    function mm(e){
        if(start){
            mmove(e);
        }
    }
    function setLeft(v){
        if(noOut){
            if(v<0){
                v=0;
            }else if(v+elemMove.scrollWidth>elemMove.parentNode.scrollWidth){
                v=elemMove.parentNode.scrollWidth-elemMove.scrollWidth;
            }
        }
        elemMove.style.left=v+'px';
        elemTarget.movePosition.left=v;
    }
    function setTop(v){
        if(noOut){
            if(v<0){
                v=0;
            }else if(v+elemMove.scrollHeight>elemMove.parentNode.scrollHeight){
                v=elemMove.parentNode.scrollHeight-elemMove.scrollHeight;
            }
        }
        elemMove.style.top=v+'px';
        elemTarget.movePosition.top=v;
    }
    function tmove(e){
        switch(arrow){
            case 1:
                setLeft(startLeft+e.changedTouches[0].clientX-start.changedTouches[0].clientX);
                break;
            case 2:
                setTop(startTop+e.changedTouches[0].clientY-start.changedTouches[0].clientY);
                break;
            case 3:
                setLeft(startLeft+e.changedTouches[0].clientX-start.changedTouches[0].clientX);
                setTop(startTop+e.changedTouches[0].clientX-start.changedTouches[0].clientX);
                break;
            case 4:
                setLeft(startLeft+e.changedTouches[0].clientX-start.changedTouches[0].clientY);
                setTop(startTop+e.changedTouches[0].clientY-start.changedTouches[0].clientY);
                break;
            default:
                setLeft(startLeft+e.changedTouches[0].clientX-start.changedTouches[0].clientX);
                setTop(startTop+e.changedTouches[0].clientY-start.changedTouches[0].clientY);
        }
        fn(30);
    }
    function tm(e){
        if(start){
            tmove(e);
        }
    }
    function mu(e){
        if(start){
            mmove(e);
            start=null;
            document.body.removeEventListener("mousemove",mm);
        }
    }
    function tu(e){
        if(start){
            tmove(e);
            start=null;
            document.body.removeEventListener("touchmove",tm);
        }
    }
}