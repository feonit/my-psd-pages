(function($){

    //Polyfills for ie 7

    if ('function' !== typeof Array.prototype.reduce) {
        Array.prototype.reduce = function(callback, opt_initialValue){
            'use strict';
            if (null === this || 'undefined' === typeof this) {
                // At the moment all modern browsers, that support strict mode, have
                // native implementation of Array.prototype.reduce. For instance, IE8
                // does not support strict mode, so this check is actually useless.
                throw new TypeError(
                    'Array.prototype.reduce called on null or undefined');
            }
            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }
            var index, value,
                length = this.length >>> 0,
                isValueSet = false;
            if (1 < arguments.length) {
                value = opt_initialValue;
                isValueSet = true;
            }
            for (index = 0; length > index; ++index) {
                if (this.hasOwnProperty(index)) {
                    if (isValueSet) {
                        value = callback(value, this[index], index, this);
                    }
                    else {
                        value = this[index];
                        isValueSet = true;
                    }
                }
            }
            if (!isValueSet) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            return value;
        };
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            if ( this === undefined || this === null ) {
                throw new TypeError( '"this" is null or not defined' );
            }

            var length = this.length >>> 0; // Hack to convert object.length to a UInt32

            fromIndex = +fromIndex || 0;

            if (Math.abs(fromIndex) === Infinity) {
                fromIndex = 0;
            }

            if (fromIndex < 0) {
                fromIndex += length;
                if (fromIndex < 0) {
                    fromIndex = 0;
                }
            }

            for (;fromIndex < length; fromIndex++) {
                if (this[fromIndex] === searchElement) {
                    return fromIndex;
                }
            }

            return -1;
        };
    }

 $(function(){
     var radioBox = $('#radio-box'),
         checkBox = $('#check-box'),
         links;

     checkBox.find('input:checked').next().addClass('yes');

     links = radioBox.find('input:checked').next().addClass('yes')
         .add(   radioBox.find('input:not(:checked)').next() );

     function onClickRadio(e){
         var $this = $(e.target);

         if( !($this.hasClass('yes')) ){
             links.toggleClass('yes');
             $this.prev().select(); // radio
         };
     }

     function onClickCheckbox(e){
         var $this = $(e.target);

         $this.toggleClass('yes');
         $this.prev().select(); // check
     }

     radioBox.on('click','a', onClickRadio);
     checkBox.on('click','a', onClickCheckbox);

 })

}(jQuery));