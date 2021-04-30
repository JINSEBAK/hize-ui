$(document).ready(function() {
    // gnb 동작
    $('.nav-sidebar > li > a').on('click', function(e) {
        e.preventDefault();

        if ( $(this).parent('li').hasClass('active') ) {
            $(this).parent('li').removeClass('active');
        } else {
            $('.nav-sidebar > li').removeClass('active');
            $(this).parent('li').addClass('active');
        }
    });
});