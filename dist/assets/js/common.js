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

    $('.datepicker').datepicker();
});



// alert 호출
function callAlert(msg, actions) {

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
                +               '<button type="button" class="btn btn-primary btn-act" data-dismiss="modal">확인</button>'
                +           '</div>'
                +       '</div>'
                +   '</div>'
                +'</div>';

    $('body').append(_html);
    $('#alertModal').find('.modal-title').text('모달 제목, 불필요시 삭제');
    $('#alertModal').modal('show');

    $('#alertModal').find('.btn-act').on('click', function() {
        if ( actions !== undefined ) {
            actions();
        }
    });
}


// confirm 호출
function callConfirm(msg, actions, buttons) {

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

    // 버튼명을 지정
    if ( buttons !== undefined ) {
        $('#confirmModal').find('.btn-default').text(buttons.cancel);
        $('#confirmModal').find('.btn-act').text(buttons.confirm);
    }
    // ok 버튼 이벤트 바인딩
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

// yyyymmdd -> object date
function getDateObject(date) {
    const year = date.substr(0,4);
    const month = date.substr(4,2) - 1;
    const day = date.substr(6,2);

    return new Date(year, month, day);
}

// 시작일~종료일 사이 날짜 배열로 가져오기
function getDateRangeData(startDate, endDate) {
    var resultArray = [];

    var sDate = new Date(startDate);
    var eDate = new Date(endDate);

    while(sDate.getTime() <= eDate.getTime()) {
        var _month = sDate.getMonth() + 1;
        _month = _month < 10 ? '0' + _month : _month;

        var _day = sDate.getDate();
        _day = _day < 10 ? '0' + _day : _day;

        resultArray.push( sDate.getFullYear() + '-' + _month + '-' + _day);
        sDate.setDate(sDate.getDate() + 1);
    }
    console.log(resultArray);

    return resultArray;

}
