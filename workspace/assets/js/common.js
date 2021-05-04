$(function() {
    // gnb 동작
    $('.nav-sidebar > li > a').on('click', function(e) {
        e.preventDefault();
        if ( $(this).parent('li').hasClass('active') ) {
            $(this).parent('li').removeClass('active');
            $(this).next('.sub-menu').slideUp();
        } else {
            $('.nav-sidebar').find('li').removeClass('active');
            $('.nav-sidebar li').find('.sub-menu').slideUp();
            $(this).parent('li').addClass('active');
            $(this).next('.sub-menu').slideDown();
        }
        
    });
});



// alert 호출
function callAlert(msg) {
    console.log(msg);
    const _html = '<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="alertModalLabel" aria-hidden="true">'
                +   '<div class="modal-dialog" role="document">'
                +       '<div class="modal-content">'
                +           '<div class="modal-header">'
                +               '<h5 class="modal-title" id="alertModalLabel">모달 제목 - 불필요하면 삭제 가능</h5>'
                +           '</div>'
                +           '<div class="modal-body text-center">'
                +               '내용을 작성합니다.'
                +           '</div>'
                +           '<div class="modal-footer">'
                +               '<button type="button" class="btn btn-primary" data-dismiss="modal">확인</button>'
                +           '</div>'
                +       '</div>'
                +   '</div>'
                +'</div>';

    $('body').append(_html);
    $('#alertModal').find('.modal-title').text('모달 제목, 불필요시 삭제');
    $('#alertModal').find('.modal-body').html(msg.title + '<p>' + msg.description + '</p>');

    $('#alertModal').modal('show');
}


// date format
function getChatDate() {
    var now = new Date();
    var nowHour = now.getHours();
    var nowMinutes = now.getMinutes();
    var meridiem = '';
    if ( 0 <= nowHour && nowHour < 12 ) {
        meridiem = '오전';
    } else {
        meridiem = '오후';
    }

    if ( nowMinutes.toString().length < 2) {
        nowMinutes = '0' + nowMinutes;
    }

    return meridiem + ' ' + (nowHour % 12) + ':' + nowMinutes;
}