function updateSolvePage() {
    /**
     * Problem Page
     */
    // 컨테이너 창을 100%로 유지
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

        // 맨 밑 도움이 되는 문제 크기 조정
        const $helpProblems = $('.tabcon_wrap').find('.state_wrap');
        if ($helpProblems.length) {
            $helpProblems.css('justify-content', 'center');
            $helpProblems.children().css('padding', '5px');
        }
    }
}