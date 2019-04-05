function toggleProblemLeft() {
    const store = new Storage();
    store.set(STORE.SHOWN, !isProblemLeftVisible(), () => {
        toggleProblemLeftResult();
    });
}

function toggleProblemLeftResult(visibility) {
    if (visibility !== undefined) {
        $('.problem_wrap').addClass(visibility ? SHOW_CLASS : HIDE_CLASS)
    } else {
        $('.problem_wrap').toggleClass(SHOW_CLASS);
        $('.problem_wrap').toggleClass(HIDE_CLASS);
    }
    $(`.${LEFT_WINDOW_BTN}`).text(isProblemLeftVisible() ? HIDE_LEFT_ICON : SHOW_LEFT_ICON);
    $(document).trigger(EVENT.TOGGLE, isProblemLeftVisible());
}

function isProblemLeftVisible() {
    return $('.problem_wrap').hasClass(SHOW_CLASS);
}

function updateInputOutputBox(store) {
    /**
     * Problem Solving page
     */
    if (window.location.pathname.includes('solvingProblem.do')) {
        // 왼쪽 "제출 결과"를 고정 상태에서 메뉴로써 사용할 수 있도록 변경

        // 헤더 부분에 버튼 추가
        const $button = $(`
            <div class="samsungext-toggle">
                ${isProblemLeftVisible() ? HIDE_LEFT_ICON : SHOW_LEFT_ICON}
            </div>`);
        const $header = $('.header');
        $header.css({
            'display': 'flex',
            'align-items': 'center'
        });
        $button.prependTo($header);

        // 버튼 추가로 인한 css 수정
        $header.find('h1').css('flex', 'auto');
        $('.club_name').css({
            'position': 'static',
            'margin': '10px 10px 0px'
        });

        // 버튼 클릭 이벤트
        $button.click(toggleProblemLeft);
        key.filter = () => $button.is(':visible');
        key(store.get(STORE.HOTKEYS), toggleProblemLeft);

        toggleProblemLeftResult(store.get(STORE.SHOWN));
    }
    addCopyFunc();
}