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

        function _fixEvent(e) {
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

        function _getPosition(target){
            var left = 0;

            left += target.offsetLeft;

            return {
                x:left
            }
        }

        function _getMouseOffset(target, event) {
            var docPos	= _getPosition(target);
            return {
                x:event.pageX - docPos.x
            }
        } // получить сдвиг target относительно курсора мыши

        function makeDraggable(element, _extensionUp, _extensionMove){

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
                event = _fixEvent(event);

                var left = event.pageX - mouseOffset.x;

                if (_extensionMove){
                    if(_extensionMove(left, event)){
                        element.style.left = left + 'px';
                        return false
                    }
                }
            }

            mouseUp = function (event){
                event = _fixEvent(event);

                var left = event.pageX - mouseOffset.x;

                if (_extensionUp){
                    if(_extensionUp(left, event)){
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
                event = _fixEvent(event);

                if (event.which!=1) {
                    return;
                }

                // получить сдвиг элемента относительно курсора мыши
                mouseOffset = _getMouseOffset(this, event);

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

        function _animate(value){
            _animate.id && clearInterval(_animate.id);

            var current =  parseInt(this.activeElement.style.left || 0, 10),
                to = pos[value-1];

            var that = this.activeElement,
                direct;

            if (current === to){
                return;
            }

            direct = current > to ? -1 : 1;

            _animate.id = setInterval(function(){
                current += direct;
                that.style.left = current + 'px';
                if (current === to){
                    clearInterval(_animate.id);
                }
            }, TIME)
        }

        /*
         * Условие для обработки события Up
         *
         * @param {Number} left текущая левая позиция
         * */

        function _extensionUp(left){

            var value = _nearPosition(left),
                inputValue = _indexPosition(value),
                that = this;

            setTimeout(function(){
                _animate.call(that, inputValue);
            }, 0);

            this.inputNode.value = inputValue;
            this.inputNode.setAttribute('value', inputValue);
            return true;
        }

        /*
         * Вычисление ближней позиции
         *
         * @param {Number} left текущая левая позиция
         * */

        function _nearPosition(left){
            return pos.reduce(function(x,y){
                return Math.abs(x-left) < Math.abs(y-left)? x : y
            })
        }

        function _indexPosition(value){
            return pos.indexOf(value) + 1;
        }

        /*
        * Условие для обработки события Move
        *
        * @param {Number} left текущая левая позиция
        * */

        function _extensionMove(left){
            if(left >= pos[0] && left <= pos[pos.length-1]){
                return true;
            }
        }

        function _isNumber(value){
            return typeof  value === "number" && isFinite(value);
        }

        return {

            inputNode: null,
            activeElement: null,

            set: function(value){
                if (!_isNumber(value)) {
                    return new Error('Bad argument');
                }
                if (value < 1 || value > pos.length){
                    return new Error('Bad value');
                }
                this.inputNode.value = value;
                _animate.call(this, value);
                return this;
            },
            get: function(){
                return this.inputNode.value;
            },
            init : function(){
                var slider = document.getElementById('slider');

                this.inputNode = slider.getElementsByTagName('input')[0];
                this.activeElement = slider.getElementsByTagName('img')[0];

                makeDraggable(this.activeElement, _extensionUp.bind(this), _extensionMove.bind(this));

                _animate.call(this, this.inputNode.value);

                return this.inputNode;
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


