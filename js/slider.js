const slider = (function() {

    function slide() {

        const $frames = $('#slide-main .slide-frame');
        const $left = $('#slide-main .slide-left-arrow');
        const $right = $('#slide-main .slide-right-arrow');
        const len = $frames.length;

        $left.click(function(ev) {
            moveFrames('left');
        });

        $right.click(function(ev) {
            moveFrames('right');
        });

        function moveFrames(dir) {
            for (let i = 0; i < len; i++) {
                const frame = $($frames[i]);
                const cls = frame.attr('class')
                    .split(' ')
                    .find(function(x) {
                        return (x.indexOf('frame-') >= 0);
                    });

                const num = +cls.split('-')[1];

                $(frame).removeClass(cls);

                if (dir === 'left') {
                    if (num === 0) {
                        $(frame).addClass('frame-' + (len - 1));
                    } else {
                        $(frame).addClass('frame-' + (num - 1));
                    }
                } else {
                    if (num === len - 1) {
                        $(frame).addClass('frame-' + 0);
                    } else {
                        $(frame).addClass('frame-' + (num + 1));
                    }
                }
            }
        }
    }
    return {
        slide: slide
    }

})();