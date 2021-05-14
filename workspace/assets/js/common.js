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

    $('body').find('#alertModal').remove();
    $('body').find('#confirmModal').remove();

    var _html = '<div class="modal fade modal-alert" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="alertModalLabel" aria-hidden="true">'
                +   '<div class="modal-dialog modal-dialog-centered" role="document">'
                +       '<div class="modal-content">'
                +           '<div class="modal-header">'
                +               '<h5 class="modal-title" id="alertModalLabel"></h5>'
                +           '</div>'
                +           '<div class="modal-body text-center">' + msg.title;
    if ( msg.description !== undefined) {
        _html += '<p>' + msg.description + '</p>';
    } else {
        _html += '';
    }
        _html +=           '</div>'
                +           '<div class="modal-footer">'
                +               '<button type="button" class="btn btn-primary" data-dismiss="modal">확인</button>'
                +           '</div>'
                +       '</div>'
                +   '</div>'
                +'</div>';

    $('body').append(_html);
    $('#alertModal').find('.modal-title').text('모달 제목, 불필요시 삭제');
    $('#alertModal').modal('show');
}


// confirm 호출
function callConfirm(msg, actions) {

    $('body').find('#alertModal').remove();
    $('body').find('#confirmModal').remove();

    var _html = '<div class="modal fade modal-confirm" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">'
                +   '<div class="modal-dialog modal-dialog-centered" role="document">'
                +       '<div class="modal-content">'
                +           '<div class="modal-header">'
                +               '<h5 class="modal-title" id="confirmModalLabel"></h5>'
                +           '</div>'
                +           '<div class="modal-body text-center">' 
                +               msg.title;
    if ( msg.description !== undefined ) {
        _html += '<p>' + msg.description + '</p>';
    }
         _html +=           '</div>'
                +           '<div class="modal-footer">'
                +               '<button type="button" class="btn btn-default" data-dismiss="modal">아니오</button>'
                +               '<button type="button" class="btn btn-primary btn-act">네</button>'
                +           '</div>'
                +       '</div>'
                +   '</div>'
                +'</div>';

    $('body').append(_html);
    $('#confirmModal').find('.modal-title').text('모달 제목, 불필요시 삭제');
    $('#confirmModal').find('.btn-act').on('click', function() {
        if ( actions !== undefined) {
            actions();
        } 
        $('#confirmModal').modal('hide');
    });

    $('#confirmModal').modal('show');
}

// web-toast 호출
function callToast(data) {
  
    const isToast = document.querySelector('.toast');

    // toast가 있으면 삭제
    if ( isToast !== null ) {
        isToast.remove();
    }

    const time = data.type === undefined ? 'short' : data.type;
    const _toast = '<div class="toast ' + time + '">' 
                +       '<div class="msg">' + data.msg + '</div>'
                +   '</div>';

    $('body').append(_toast);
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


