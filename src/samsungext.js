$(document).ready(() => {
    const store = new Storage();

    parallel(Object.keys(STORE), (key, cb) => store.setIfNull(STORE[key], DEFAULTS[key], cb), loadExtension);

    async function loadExtension() {

        /**
         * Problem List Page
         */
        const $searchBar = $('.row.list-navbar-form');
        if ($searchBar) {
            // 검색 부분 수정
            $searchBar.css('justify-content', 'flex-end');
            $searchBar.find('.col-lg-2').remove();
            $searchBar.find('.col-lg-3').css('flex', '0');
            $searchBar.find('.col-lg-7').css({
                flex: '0',
                maxWidth: '100%'
            });
            const $difficultyButtons = $searchBar.find('.hidden-sm-down').find('.btn-group');
            $difficultyButtons.children().css({
                width: '100%',
                padding: '3px 5px'
            });
        }

        /**
         * Problem Page
         */
        const $container = $('.container.sub');
        if ($container) {
            $container.css('width', '100%');
            const $btnRight = $('.btn_right');

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
        }


        /**
         * Problem Solving page
         */
        const $left = $('.problem_left');
        const $right = $('.problem_right');
        if ($left && $right) {
            // 왼쪽 "제출 결과"를 고정 상태에서 메뉴로써 사용할 수 있도록 변경
            $left.css('visibility', 'hidden');
            $right.css({
                'left': '0px',
                'right': '0px',
                'bottom': '0px',
                'padding': '10px'
            });

            // 헤더 부분에 버튼 추가
            const $button = $('<div href="#" class="samsungext-toggle">▶</div>');
            const $header = $('.header');
            $header.css({
                'display': 'flex',
                'align-items': 'center'
            });
            $button.prependTo($header);
            $button.css({
                'flex': 'initial',
                'cursor': 'pointer',
                'text-align': 'center',
                'font-size': '30px',
                'width': '50px',
                'height': '50px',
                'margin-left': '10px'
            });

            // 버튼 추가로 인한 css 수정
            $header.find('h1').css('flex', 'auto');
            $('.club_name').css({
                'position': 'static',
                'margin': '10px 10px 0px'
            });

            $button.on('click', (e) => {
                e.stopPropagation();
                const $left = $('.problem_left');
                const $right = $('.problem_right');
                if ($left.css('visibility') === 'hidden') {
                    $left.css('visibility', 'visible');
                    $right.css({
                        'left': '385px',
                        'right': '0px',
                        'bottom': '0px'
                    });
                    $button.text('◀');
                } else {
                    $left.css('visibility', 'hidden');
                    $right.css({
                        'left': '0px',
                        'right': '0px',
                        'bottom': '0px'
                    });
                    $button.text('▶');
                }
                return false;
            });
        }
    }

});