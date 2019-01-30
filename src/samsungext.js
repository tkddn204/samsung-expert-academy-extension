$(document).ready(() => {
    const store = new Storage();

    parallel(Object.keys(STORE), (key, cb) => store.setIfNull(STORE[key], DEFAULTS[key], cb), loadExtension);

    async function loadExtension() {
        const $container = $('.container.sub');
        if ($container) {
            $container.css('width', '100%');
            const $btnRight = $('.btn_right');

            $('#orderBy').css('width', 'auto');
            $btnRight.find('#mobileSolveBtn').remove();
            $btnRight.find('.hidden_solve_btn')
                .removeClass('hidden_solve_btn');
        }

        const $left = $('.problem_left');
        const $right = $('.problem_right');
        if ($left && $right) {
            $left.css('visibility', 'hidden');
            $right.css({
                'left': '0px',
                'right': '0px',
                'bottom': '0px',
                'padding': '10px'
            });

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