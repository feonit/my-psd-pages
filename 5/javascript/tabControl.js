(function($, MYAPP){

    var slider = MYAPP.slider;

    function checkboxCalback(event){
        $(this).prev().click();
        event.preventDefault();
    }

    function sliderCalback(event){
        var value = parseInt($(this).parent().attr('id').slice(2), 10)
        slider.set(value);
        event.preventDefault();
    }

    $('#check-box, #radio-box').on('click', 'a', checkboxCalback);
    $('#slider').on('click', 'a', sliderCalback);


}(jQuery, MYAPP));