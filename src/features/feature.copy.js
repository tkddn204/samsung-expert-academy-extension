function addCopyFunc() {
    /**
     * Input/Output Copy function
     */
    const $inOutBox = $('.box_type1').not('.mt-12');

    if ($inOutBox.length) {
        // 입출력 복사하는 부분 추가
        const $copyDescription = $('<span class="copy-description"><b>★ 코드를 누르면 코드가 복사됩니다 ★</b></span>');
        $copyDescription.insertBefore($inOutBox);

        const $inputBox = $inOutBox.children().first();
        const $outputBox = $inOutBox.children().eq(1);

        // 입력 복사 버튼 추가
        const $inputCopyButton = $('<button>입력 코드 복사</button>');
        $inputCopyButton.appendTo($inputBox.find('.title1'));
        $inputCopyButton.addClass('copy-code-input');
        $inputCopyButton.attr({
            'data-clipboard-target': '.input-code',
            type: 'button'
        });
        $inputCopyButton.css('float', 'right');

        // 출력 복사 버튼 추가
        const $outputCopyButton = $('<button>출력 코드 복사</button>');
        $outputCopyButton.appendTo($outputBox.find('.title1'));
        $outputCopyButton.addClass('copy-code-output');
        $outputCopyButton.attr({
            'data-clipboard-target': '.output-code',
            type: 'button'
        });
        $outputCopyButton.css('float', 'right');

        // 레퍼런스 코드일 경우
        if ($('.reference_box').length) {
            const $inoutBoxes = $inOutBox.find('.box5').find('p');
            const inputText = $inoutBoxes.first().text().replace(/\/[^\n]+/g, '');
            const outputText = $inoutBoxes.eq(1).text().replace(/\/[^\n]+/g, '');

            $(`<span class="input-code" hidden>${inputText}</span>`)
                .insertBefore($inOutBox);
            setClipboard('.copy-code-input', '입력 복사 완료!!', true);

            $(`<span class="output-code" hidden>${outputText}</span>`)
                .insertBefore($inOutBox);
            setClipboard('.copy-code-output', '출력 복사 완료!!', true);
        } else {
            $.ajax({
                url: $inputBox.find('.down_area').find('a[href*="?"]').attr('href'),
                success: (data) => {
                    $(`<span class="input-code" hidden>${data}</span>`)
                        .insertBefore($inOutBox);
                    setClipboard('.copy-code-input', '입력 복사 완료!!', true);
                }
            });
            $.ajax({
                url: $outputBox.find('.down_area').find('a[href*="?"]').attr('href'),
                success: (data) => {
                    $(`<span class="output-code" hidden>${data}</span>`)
                        .insertBefore($inOutBox);
                    setClipboard('.copy-code-output', '출력 복사 완료!!', true);
                }
            });
        }
    }
    /**
     * 클립보드 객체를 생성하고, 복사에 성공하면 class 속성이 copy-description인
     * html 엘리먼트의 내용을 바꿈.
     * @param what 복사할 css 선택자 이름
     * @param text copy-description class를 가지고 있는 엘리먼트의 텍스트
     * @param isHidden what의 속성 중 hidden이 있으면 true
     */
    const setClipboard = (what, text, isHidden = false) => {
        let inputClipboard;
        if (!isHidden) {
            inputClipboard = new ClipboardJS(what);
        } else {
            inputClipboard = new ClipboardJS(what, {
                text: () => $(what === '.copy-code-input' ?
                    '.input-code' : '.output-code').text()
            });
        }

        inputClipboard.on('success', (e) => {
            $('.copy-description').html(`<b>${text}</b>`);
            /* .
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);
            */
            e.clearSelection();
        });
    }
}