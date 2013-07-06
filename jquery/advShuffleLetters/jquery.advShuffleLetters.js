/*
 * jquery.advShuffleLetters.js by cocu
 * licence: MIT license
 *
 * | inspired by Martin Angelov's Shuffle Letters
 * | http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/
 *
 * params
 * "inout"     means in effect or out effect.
 *   ->"inout"   :"in" or "out".
 * "direction" means in effect right or left or "random".
 *   ->"direction: "right" or "left" or "random".
 * "charpool" is custom charactor.
 * "charpat" means character pattern. when "charpoool"="" activated.
 *   ->"l":lower case, "u":Upper case, "n":number, "s":symbol
 */
(function ($) {
    $.fn.advShuffleLetters = function (params) {
        var options = $.extend({
            "step": 5,
            "fps": 25,
            "text": "",
            "charpool": "",
            "charpat": "luns",
            "inout": "in",
            "direction": "right",
            "nullchar": ""
        }, params);

        return this.each(function () {
            var elem = $(this);
            var strarray = (options.text) ? options.text.split("") : elem.text().split('');
            var length = strarray.length;

            if (options.inout == "in") {
                elem.html("");
            }

            var charpool = options.charpool;
            var charpat = options.charpat;
            if (charpool == "") {
                charpool += (charpat.indexOf("l") == -1) ? "" : "abcdefghijklmnopqrstuvwxyz";
                charpool += (charpat.indexOf("u") == -1) ? "" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                charpool += (charpat.indexOf("n") == -1) ? "" : "1234567890";
                charpool += (charpat.indexOf("s") == -1) ? "" : "/*-+.,?';:][}{=_)(!@#$%^&";
            }
            function randomChar() {
                return charpool[Math.floor(Math.random() * charpool.length)];
            }

            function generatePattern() {
                // i<0   : none
                // i<step: shaffled
                // else  : raw

                //initialize
                var pat = [];
                var i;
                for (i = 0; i < length; i++) {
                    pat[i] = i;
                }

                //in or out pattern
                i = 0;
                if (options.inout == "in") {
                    pat.forEach(function (x) {
                        pat[i++] = -x - 1;
                    });
                } else {
                    pat.forEach(function (x) {
                        pat[i++] = x + options.step
                    });
                }

                // toright or toleft or random
                //shuffle strarray Fisher-Yates Algorithm
                if (options.direction == "random") {
                    i = length;
                    while (i) {
                        var j = Math.floor(Math.random() * i);
                        var t = pat[--i];
                        pat[i] = pat[j];
                        pat[j] = t;
                    }
                } else if (options.direction == "left") {
                    pat.reverse();
                } else {
                    //
                }
                return pat
            }

            var pat = generatePattern();

            (function shuffle(start) {
                if (start > length + options.step) {
                    //exception
                    return;
                }
                var tmp = strarray.slice(0);
                var i;
                for (i = 0; i < length; i++) {
                    if (pat[i] < 0) {
                        //none
                        tmp[i] = options.nullchar;
                    } else if (pat[i] < options.step) {
                        //shuffled
                        tmp[i] = randomChar()
                    } else {
                        //raw
                    }
                }

                i = 0;
                if (options.inout == "in") {
                    pat.forEach(function (x) {
                        pat[i++] = x + 1;
                    })
                } else {
                    pat.forEach(function (x) {
                        pat[i++] = x - 1;
                    })
                }
                elem.text(tmp.join(""));
                setTimeout(function () {
                    shuffle(start + 1);
                }, 1000 / options.fps);
            })(0);
        });
    };
})(jQuery);