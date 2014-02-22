"use strict";

(function(window, document, Math){

    if (arguments.length !== 3){
        return new Error ({
            message :"Not suitable environment"
        });
    }

    if (typeof MYAPP === "undefined"){
        window.MYAPP = {};
    }

    MYAPP.dragMaster = MYAPP.dragMaster || (function(){

        function fixEvent(e) {
            // получить объект событие для IE
            e = e || window.event;

            // добавить pageX/pageY для IE
            if ( e.pageX == null && e.clientX != null ) {
                var html = document.documentElement;
                var body = document.body;
                e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
                e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
            }

            // добавить which для IE
            if (!e.which && e.button) {
                e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
            }

            return e
        }

        function getPosition(target){
            var left = 0;

            left += target.offsetLeft;

            return {
                x:left
            }
        }

        function getMouseOffset(target, event) {
            var docPos	= getPosition(target);
            return {
                x:event.pageX - docPos.x
            }
        } // получить сдвиг target относительно курсора мыши

        function makeDraggable(element, extensionUp, extensionMove){

            if (typeof element !== "object" || !element){

                return new Error ({
                    message :"Not suitable element"
                });
            }

            var mouseOffset = 0,
                mouseDown,
                mouseMove,
                mouseUp;


            mouseMove = function (event){
                event = fixEvent(event);

                var left = event.pageX - mouseOffset.x;

                if (extensionMove){
                    if(extensionMove(left, event)){
                        element.style.left = left + 'px';
                        return false
                    }
                }
            }

            mouseUp = function (event){
                event = fixEvent(event);

                var left = event.pageX - mouseOffset.x;

                if (extensionUp){
                    if(extensionUp(left, event)){
                        // очистить обработчики, т.к перенос закончен
                        document.onmousemove = null;
                        document.onmouseup = null;
                        document.ondragstart = null;
                        document.body.onselectstart = null;

                        return false;
                    }
                }
            }

            mouseDown = function (event) {
                event = fixEvent(event);

                if (event.which!=1) {
                    return;
                }

                // получить сдвиг элемента относительно курсора мыши
                mouseOffset = getMouseOffset(this, event);

                // эти обработчики отслеживают процесс и окончание переноса
                document.onmousemove = mouseMove;
                document.onmouseup = mouseUp;

                // отменить перенос и выделение текста при клике на тексте
                document.ondragstart = function() { return false };
                document.body.onselectstart = function() { return false };

                return false;
            }


            element.onmousedown = mouseDown;
        }

        return {
            makeDraggable: makeDraggable
        }
    }());

    MYAPP.slider = MYAPP.slider || (function(){
        var TIME = 1, /*for ie8*/
            makeDraggable = MYAPP.dragMaster.makeDraggable,
            pos = [-7, 135, 363, 746];

        function nearValue(left){
            return pos.reduce(function(x,y){
                return Math.abs(x-left) < Math.abs(y-left)? x : y
            })
        }

        function indexPosition(value){
            return pos.indexOf(value);
        }

        return {
            init : function(){
                var slider = document.getElementById('slider'),
                    activeElement = slider.getElementsByTagName('img')[0],
                    input = slider.getElementsByTagName('input')[0];

                function animate(from, to){
                    from = parseInt(from, 10);
                    to = parseInt(to, 10);

                    var abs = Math.abs(from - to);

                    if (from === to){
                         return;
                    }

                    var direct = from > to ? -1 : 1,
                        id;

                    id = setInterval(function(){

                        from += direct;

                        activeElement.style.left = from + 'px';
                        if (from === to){
                            clearInterval(id);
                        }
                    }, TIME)
                }

                function setActiveElement(){
                    var from = 0 /* or from activeElement.style.left*/ ,
                        to = pos[input.getAttribute('value')-1];

                    animate(from, to);
                }

                function extensionUp(left){

                    var value = nearValue(left),
                        inputValue = indexPosition(value);

                    setTimeout(function(){
                        animate(activeElement.style.left, value);
                    }, 0);
                    input.value = inputValue;
                    input.setAttribute('value', inputValue);
                    return true;
                }

                function extensionMove(left){
                     if(left >= pos[0] && left <= pos[pos.length-1]){
                         return true;
                     }
                }

                makeDraggable(activeElement, extensionUp, extensionMove);

                setActiveElement();

                return input;
            }
        }

    }());

    MYAPP.init = MYAPP.init || (function(){

        window.onload = function(){
            MYAPP.slider.init();
        };

        return true;
    }());

    return 'complete';
}(window, document, Math));


