(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Avatar = factory());
}(this, (function () { 'use strict';

/**
 * Mixin Helper
 */
/**
 * Mixin Helper
 */ function mixins(target, mix) {
    mix.forEach(function (base) {
        Object.getOwnPropertyNames(base.prototype).forEach(function (name) {
            target.prototype[name] = base.prototype[name];
        });
    });
}
/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
    if (typeof el === 'string') {
        var selected = document.querySelector(el);
        if (!selected) {
            return document.createElement('div');
        }
        return selected;
    }
    else {
        return el;
    }
}
/**
 * Insert a html string after DOM
 */

/**
 * Append a html string in DOM end
 */
function append(target, html) {
    target.insertAdjacentHTML('beforeend', html);
}
function parseStyle(style) {
    var res = '';
    Object.keys(style).forEach(function (key) {
        res += key + ": " + style[key] + ";";
    });
    return res;
}
//# sourceMappingURL=util.js.map

var Init = (function () {
    function Init() {
    }
    Init.prototype.init = function (option) {
        this.$el = query(option.el);
        this.height = option.height;
        this.width = option.width;
        this.radius = this.height / 4;
        this.fileInput = option.file || null;
        if (this.fileInput) {
            initFileInput(this.fileInput, this);
        }
        this.imageEl = createImage(this.$el);
        console.log(this.imageEl);
        this.selectEl = createSelect(this.$el, this.height, this.width);
        bindMoveEvent(this.selectEl, this.radius);
    };
    Init.prototype.setImage = function (file) {
        var self = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var img = self.imageEl;
            img.onload = function () {
                var isVertical = img.height > img.width;
                if (isVertical) {
                    img.height = 400;
                }
                else {
                    img.width = 400;
                }
            };
            img.src = this.result;
        };
    };
    return Init;
}());
function createSelect(el, height, width) {
    var style = {
        'background': 'rgba(0, 0, 0, 0.6)',
        'height': height + 'px',
        'width': width + 'px'
    };
    var visible = {
        'position': 'absolute',
        'top': height / 4 + 'px',
        'left': width / 4 + 'px',
        'background': 'rgba(255, 255, 255, 1)',
        'height': height / 2 + 'px',
        'width': width / 2 + 'px',
        'border-radius': '50%'
    };
    var html = "\n    <div data-role=\"select-container\" style=\"" + parseStyle(style) + "\">\n      <div data-role=\"select-visible\" style=\"" + parseStyle(visible) + "\">\n      </div>\n    </div>\n  ";
    append(el, html);
    return query('div[data-role="select-visible"]');
}
function createImage(el) {
    var img = new Image();
    el.appendChild(img);
    return img;
}
function bindMoveEvent(dom, radius) {
    var isCanMove = false;
    var startX;
    var startY;
    var endX;
    var endY;
    dom.addEventListener('mousedown', function (e) {
        isCanMove = true;
        startX = e.offsetX;
        startY = e.offsetY;
    });
    dom.addEventListener('mouseup', function (e) {
        isCanMove = false;
    });
    dom.addEventListener('mousemove', function (e) {
        if (isCanMove) {
            dom.style.left = parseFloat(dom.style.left) + e.offsetX - startX + 'px';
            dom.style.top = parseFloat(dom.style.top) + e.offsetY - startY + 'px';
        }
    });
}
function initFileInput(el, ctx) {
    el.addEventListener('change', function (e) {
        var file = e.target.files[0];
        console.log(typeof file);
        ctx.setImage(file);
    });
}
//# sourceMappingURL=init.js.map

var Avatar = (function () {
    function Avatar(option) {
        this.$option = option;
        this.init(option);
    }
    return Avatar;
}());
mixins(Avatar, [Init]);

return Avatar;

})));
