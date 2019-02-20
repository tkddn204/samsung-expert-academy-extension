function updateSearchBar() {
    /**
     * Problem List Page
     */
    const $searchBar = $('.row.list-navbar-form');
    if ($searchBar.length) {
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
}