function updateInputOutputBox() {
    /**
     * Problem Solving page
     */
    const $left = $('.problem_left');
    const $right = $('.problem_right');
    if ($left.length && $right.length) {
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

        // 버튼 클릭 이벤트
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

    addCopyFunc();
}