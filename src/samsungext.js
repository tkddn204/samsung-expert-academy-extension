$(document).ready(() => {
    const store = new Storage();

    parallel(Object.keys(STORE), (key, cb) => store.setIfNull(STORE[key], DEFAULTS[key], cb), loadExtension);

    async function loadExtension() {
        const $container = $('.container.sub');
        if ($container) {
            $container.css('width', '100%');
            const $btnRight = $('.btn_right');
            $btnRight.find('#mobileSolveBtn').remove();$btnRight.find('.hidden_solve_btn')
                .removeClass('hidden_solve_btn');
            // if ($(window).width() > 1120) {
            //     $('.hidden_solve_htn').css('display', 'inline block');
            // }
        }

        const $left = $('.problem_left');
        const $right = $('.problem_right');
        if ($left && $right) {
            $left.css('visibility', 'hidden');
            $('.problem_box').css('margin', '100px 0px 0px 0px');
            const $button = $('<div href="#" class="samsungext-toggle">▶</div>');
            $('.panel-group').before($button);
            $button.css('font-size', '30px');

            $button.on('click', (e) => {
                e.stopPropagation();
                const $left = $('.problem_left');
                const $right = $('.problem_right');
                if ($left.css('visibility') === 'hidden') {
                    $('.problem_box').css('margin', '30px 0px 0px 0px');
                    $left.css('visibility', 'visible');
                    $right.css('position', 'fixed').css('overflow-y', 'scroll');
                    $button.text('◀');
                } else {
                    $('.problem_box').css('margin', '100px 0px 0px 0px');
                    $left.css('visibility', 'hidden');
                    $right.css('position', 'initial');
                    $button.text('▶');
                }
                return false;
            });
            $right.css('position', 'initial');
            $right.css('padding', '10px');
        }
    }
});