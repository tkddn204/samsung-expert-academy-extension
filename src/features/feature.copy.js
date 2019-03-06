/**
 * 클립보드 객체를 받아와서 복사에 성공하면 class 속성이 copy-description인
 * html 엘리먼트의 내용을 바꿈.
 * @param {ClipboardJS} clipboard 클립보드 객체(ClipboardJS)
 * @param {string} text copy-description class를 가지고 있는 엘리먼트의 텍스트
 */
function setClipboardEvent(clipboard, text) {
    clipboard.on('success', (e) => {
        $('.copy-description').html(`<b>${text}</b>`);
        /* .
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        */
        e.clearSelection();
    });
}

/**
 * 입력/출력 박스의 텍스트를 가져오는 함수.
 * @param {Jquery} $box 입력/출력 박스의 Jquery 객체
 */
function getBoxText($box) {
    let text;
    if ($box.find('table').length) {
        // 테이블일 경우 = 주석이 있을 경우
        text = $box.find('td').first().text().trim();
    } else {
        // Span일 경우 = 주석이 없을 경우
        text = $box.find('span:not(".title1")').first().text().trim();
    }
    if (text.endsWith('...')) text.substring(0, text.length - 3);

    return text.replace(/\t/g, '');
}

function addCopyFunc() {
    /**
     * Input/Output Copy function
     */
    const $inOutBox = $('.box_type1').not('.mt-12');

    if ($inOutBox.length) {
        // 입출력 복사하는 부분 추가
        const $copyDescription = $('<span class="copy-description"></span>');
        $copyDescription.insertBefore($inOutBox);

        // If ($('.problem_title').text().includes('1868')) {
        //     $inputCopyButton.click((e) => {
        //         E.preventDefault();
        //         Alert('"파핑파핑 지뢰찾기" 문제의 입력을' +
        //             ' 복사할 때 멈추는 버그가 있어 잠시 막아두었습니다. 불편을 드려 죄송합니다.')
        //     });
        // } else {
        //     $inputCopyButton.addClass('copy-code-input');
        //     $inputCopyButton.attr({
        //         'data-clipboard-target': '.input-code',
        //         Type: 'button'
        //     });
        // }

        // $outputCopyButton.addClass('copy-code-output');
        // $outputCopyButton.attr({
        //     'data-clipboard-target': '.output-code',
        //     Type: 'button'
        // });

        // TODO: 복사가 실패할 경우 추가
        let $inputBox, $outputBox;
        let inputText, outputText;
        if ($('.reference_box').length) {
            // 레퍼런스 코드일 경우
            const $inoutBoxes = $inOutBox.find('.box5');

            $inputBox = $inoutBoxes.first();
            $outputBox = $inoutBoxes.eq(1);

            inputText = $inputBox.find('p').text().replace(/\/[^\n]+/g, '');
            outputText = $outputBox.find('p').text().replace(/\/[^\n]+/g, '');
        } else {
            // 일반 문제일 경우
            $inputBox = $inOutBox.children().first();
            $outputBox = $inOutBox.children().eq(1);

            inputText = getBoxText($inputBox);
            outputText = getBoxText($outputBox);

            // 입력 박스의 down_area
            const $inputDownArea = $inputBox.find('.down_area');
            if (!$inputDownArea.text().includes('sample')) {
                const $outputDownArea = $outputBox.find('.down_area');

                // 입력
                $inputDownArea.css('display', 'flex');
                $inputDownArea.find('a').eq(1).css('flex-grow', 1);

                const $realInputCopyButton = $('<button>내부 입력 복사</button>');
                $realInputCopyButton.css('float', 'right');
                $realInputCopyButton.attr({
                    'id': 'down-input',
                    'type': 'button'
                });
                $realInputCopyButton.appendTo($inputBox.find('.down_area'));

                // 출력
                $outputDownArea.css('display', 'flex');
                $outputDownArea.find('a').eq(1).css('flex-grow', 1);

                const $realOutputCopyButton = $('<button>내부 출력 복사</button>');
                $realOutputCopyButton.css('float', 'right');
                $realOutputCopyButton.attr({
                    'id': 'down-output',
                    'type': 'button'
                });
                $realOutputCopyButton.appendTo($outputBox.find('.down_area'));


                // Ajax로 파일(input/output.txt)을 다운받아,
                // 'data-clipboard-text'에 저장해 둠.
                $.ajax({
                    url: $('.down_area').first().find('a[href*="?"]').attr('href')
                }).done((data) => {
                    const $downBtn = $('#down-input');
                    $downBtn.attr({
                        'data-clipboard-text': data,
                    });
                    setClipboardEvent(new ClipboardJS('#down-input'), '내부 입력 복사 완료!!');
                }).fail((error) => {
                    const $downBtn = $('#down-input');
                    console.error(error);
                    $downBtn.attr('disabled', true);
                });
                $.ajax({
                    url: $('.down_area').eq(1).find('a[href*="?"]').attr('href')
                }).done((data) => {
                    const $downBtn = $('#down-output');
                    $downBtn.attr({
                        'data-clipboard-text': data,
                    });
                    setClipboardEvent(new ClipboardJS('#down-output'), '내부 출력 복사 완료!!');
                }).fail((error) => {
                    const $downBtn = $('#down-output');
                    console.error(error);
                    $downBtn.attr('disabled', true);
                });
            }
        }
        // 입력 복사 버튼 추가
        const $inputCopyButton = $('<button>입력 복사</button>');
        $inputCopyButton.css('float', 'right');
        $inputCopyButton.attr({
            'id': 'view-input',
            'data-clipboard-text': inputText,
            'type': 'button'
        });
        $inputCopyButton.appendTo($inputBox.find('.title1'));
        setClipboardEvent(new ClipboardJS('#view-input'), '입력 복사 완료!!');

        // 출력 복사 버튼 추가
        const $outputCopyButton = $('<button>출력 복사</button>');
        $outputCopyButton.css('float', 'right');
        $outputCopyButton.attr({
            'id': 'view-output',
            'data-clipboard-text': outputText,
            'type': 'button'
        });
        $outputCopyButton.appendTo($outputBox.find('.title1'));
        setClipboardEvent(new ClipboardJS('#view-output'), '출력 복사 완료!!');
    }
}