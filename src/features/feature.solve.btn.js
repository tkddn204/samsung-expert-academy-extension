function updateSolveBtn() {
    /**
     * Problem Page
     */
    const $container = $('.container.sub');
    if ($container) {
        $container.css('width', '100%');
    }

    const $btnRight = $('.btn_right');
    if ($btnRight.length) {
        // "문제 풀기" 버튼
        $('#orderBy').css('width', 'auto');
        $btnRight.find('#mobileSolveBtn').remove();
        $btnRight.find('.hidden_solve_btn')
            .removeClass('hidden_solve_btn');

        // 문제 정보
        const $infoBox = $('.problem_infobox2');
        $infoBox.css({
            width: '100%',
            padding: '15px'
        });
        $infoBox.find('.master').css({
            width: '100px',
            minWidth: '0px'
        });
        $infoBox.find('.info').css('float', 'none');

        // 입출력 박스
        $('.box_type1').children().css('width', 'calc(50% - 15px)');

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
            maxWidth: '380px',
            marginLeft: '0px'
        });
        $headerMenu.find('.navbar-nav').children().css({
            marginRight: '-30px'
        });

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
        showSearchIcon();
        $(window).on('resize', showSearchIcon);

        const showSearchIcon = () => {
            if ($(window).width() < 990) {
                $('.navbar-right').find('.input-icon').hide();
            } else {
                $('.navbar-right').find('.input-icon').show();
            }
        };

        // Problem 메뉴 크기 조정
        const $subHeader = $('.sub_header');
        $subHeader.css('width', '100%');
        $subHeader.find('.code-menu').css('width', '100%');

        // 맨 밑 도움이 되는 문제 크기 조정
        const $helpProblems = $('.tabcon_wrap').find('.state_wrap');
        if ($helpProblems.length) {
            $helpProblems.css('justify-content', 'center');
            $helpProblems.children().css('padding', '5px');
        }
    }
}