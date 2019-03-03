function updateMyPage() {
    const $myPageContainer = $('.mypage_wrap');
    if ($myPageContainer.length) {
        const $tab = $('.tab_type1').find('ul');
        $tab.css('display', 'flex');
        $tab.children().css('flex-grow', '1');
        $tab.find('li').children().css('min-width', '100%');

        // Todo: mypage 화면 개선
    }
}