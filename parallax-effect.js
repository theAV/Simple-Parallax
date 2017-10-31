$(function() {
    function Parallax(element, options) {
        this.element = element;
        this.setting = $.extend({}, Parallax.Defaults, options);
        this.document = $(document);
        this.multiplier = 1 - this.setting.friction;
        this.$parentHeight = $(this.element).closest(this.setting.parent).outerHeight();
    };
    Parallax.Defaults = {
        'friction': 0.8,
        'height': true,
        'parent': '.parallax-wrapper'
    };

    Parallax.prototype.init = function() {
        if (this.setting.height) this.element.height(this.$parentHeight);
        this._Parallax();
    };

    Parallax.prototype._Parallax = function() {
        var self = this;
        $(window).scroll(function() {
            var fromTop = $(this.document).scrollTop();
            self.element.css({
                "transform": "translate3d(0," + (self.multiplier * fromTop) + "px, 0)",
                "background-position": "0px " + (Math.round((self.multiplier * fromTop))) + "px"
            })
        });
    };

    // plugin defination
    function Plugin(option) {
        return this.each(function() {
            var ths = $(this),
                data = ths.data('vParallax');
            if (!data) ths.data('vParallax', (data = new Parallax(ths, option)));
            data['init']();
        });
    };
    $.fn.vParallax = Plugin;
    $.fn.vParallax.constructor = Parallax;
});