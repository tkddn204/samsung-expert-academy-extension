/**
 * 헤더의 사용자 이름을 화면 크기에 따라 숨기고 표시하는 jquery 함수
 */
const toggleUserName = () => {
    if ($(window).width() < 990) {
        $('.navbar-right').find('.name').hide();
    } else {
        $('.navbar-right').find('.name').show();
    }
}

/**
 * 검색 아이콘을 화면 크기에 따라 숨기고 표시하는 jquery 함수
 */
const toggleSearchIcon = () => {
    if ($(window).width() < 990) {
        $('.navbar-right').find('.input-icon').hide();
    } else {
        $('.navbar-right').find('.input-icon').show();
    }
};

function updateHeader() {

    // 네비게이션 있는 헤더 조정
    $('.gnb_top').find('.row').css('width', '100%');
    const $headerContainer = $('.gnb-common-inner');
    $headerContainer.css({
        display: 'flex',
        width: '100%'
    });

    // 헤더 맨왼쪽
    const $headerBrand = $headerContainer.find('.navbar-brand');
    $headerBrand.css({
        margin: '10px -30px 0px 0px',
        paddingLeft: '5px'
    });

    // 헤더 중간 메뉴
    const $headerMenu = $headerContainer.find('.navbar-collapse');
    $headerMenu.css({
        marginLeft: 0
    });
    $headerMenu.find('.navbar-nav').css('display', 'flex');
    $headerMenu.find('.navbar-nav').children().css({
        flexGrow: 1
    });
    $headerMenu.find('.navbar-nav').find('.dropdown-toggle').css({
        margin: 0
    });
    toggleUserName();
    $(window).on('resize', toggleUserName);

    // 헤더 오른쪽부분
    const $headerRight = $headerContainer.find('.navbar-right');
    $headerRight.css({
        display: 'flex',
        flexGrow: '1',
        justifyContent: 'flex-end'
    });
    const $myLogin = $headerRight.find('.my-login');
    $myLogin.css({
        display: 'flex',
        marginRight: '5px'
    });
    $myLogin.find('.name').css('margin', '6px');
    $headerContainer.find('.msg_pop').css('top', '40px');

    toggleSearchIcon();
    $(window).on('resize', toggleSearchIcon);

    // Problem 메뉴 크기 조정
    const $subHeader = $('.sub_header');
    $subHeader.css('width', '100%');
    $subHeader.find('.code-menu').css('width', '100%');
}