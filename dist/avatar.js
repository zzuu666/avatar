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
 */ 
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
function queryCanvas(el) {
    if (typeof el === 'string') {
        var selected = document.querySelector(el);
        if (!selected) {
            console.warn("The selector " + el + " isn't a canvas element");
            return document.createElement('canvas');
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


function absolute(el) {
    el.style.position = 'absolute';
    el.style.top = '0';
    el.style.left = '0';
}
//# sourceMappingURL=util.js.map

var Preview = (function () {
    function Preview(ava, options) {
        this.el = queryCanvas(options.el);
        this.size = options.size;
        this.shape = options.shape || 'circle';
        this.ava = ava;
        this.initSize();
    }
    Preview.prototype.initSize = function () {
        this.el.width = this.el.height = this.size;
        if (this.shape === 'circle') {
            this.el.style.borderRadius = '50%';
        }
    };
    Preview.prototype.update = function () {
        var ctx = this.el.getContext('2d');
        var ava = this.ava;
        ctx.clearRect(0, 0, this.size, this.size);
        // ctx.drawImage(ava.image, ava.x, ava.y, ava.d, ava.d, 0, 0, this.size, this.size)
        var sx = (ava.x - ava.xfrom) * ava.scale;
        var sy = (ava.y - ava.yfrom) * ava.scale;
        var sSzie = ava.d * ava.scale;
        ctx.drawImage(ava.image, sx, sy, sSzie, sSzie, 0, 0, this.size, this.size);
    };
    return Preview;
}());

//# sourceMappingURL=preview.js.map

function MixinInit(Avatar) {
    Avatar.prototype._init = function (options) {
        var ava = this;
        ava.$el = query(options.el);
        ava.size = options.size;
        initRootStyle(ava.$el, ava.size);
        ava.image = createImage(ava.$el);
        ava.canvas = createCanvas(ava.size, ava.$el);
        // todo file now just support HTMLInputElement
        ava.file = options.file || null;
        if (ava.file) {
            initFileInput(ava);
        }
        initEvent(ava);
        ava.previews = options.previews.length ? initPrivew(ava, options.previews) : [];
    };
}
function initRootStyle(root, size) {
    root.style.position = 'relative';
    root.style.background = '#000';
    root.style.width = size + 'px';
    root.style.height = size + 'px';
}
function createCanvas(size, root) {
    var canvas = document.createElement('canvas');
    canvas.height = size;
    canvas.width = size;
    root.appendChild(canvas);
    absolute(canvas);
    return canvas;
}
function initPrivew(ava, arr) {
    var previews = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var preview = new Preview(ava, arr[i]);
        previews.push(preview);
    }
    return previews;
}
function drawVisibel(ava) {
    var ctx = ava.canvas.getContext('2d');
    var size = ava.size;
    var x = ava.x;
    var y = ava.y;
    var d = ava.d;
    var r = ava.d / 2;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, size, size);
    ctx.clearRect(x, y, d, d);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0)';
    ctx.beginPath();
    ctx.moveTo(x + d, y + r); //e
    ctx.arc(x + r, y + r, r, 0, Math.PI / 2, false); // e to s
    ctx.moveTo(x + r, y + d); //s
    ctx.lineTo(x + d, y + d); // s to es
    ctx.lineTo(x + d, y + r); // es to e
    ctx.moveTo(x + d, y + r); // e
    ctx.arc(x + r, y + r, r, 0, Math.PI * 3 / 2, true);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + d, y);
    ctx.lineTo(x + d, y + r);
    ctx.moveTo(x + d, y + r);
    ctx.moveTo(x, y + r);
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 3 / 2, false);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + r);
    ctx.moveTo(x, y + r);
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI / 2, true);
    ctx.moveTo(x + r, y + d);
    ctx.lineTo(x, y + d);
    ctx.lineTo(x, y + r);
    ctx.moveTo(x, y + r);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.arc(x + r * 1.707, y + r * 1.707, 5, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    notify(ava);
}
function initEvent(ava) {
    var ox = 0;
    var oy = 0;
    var canvas = ava.canvas;
    var canMove = false;
    var canResize = false;
    canvas.addEventListener('mousemove', function (e) {
        if ((Math.pow(e.offsetX - (ava.x + ava.d / 2 * 1.707), 2) + Math.pow(e.offsetY - (ava.y + ava.d / 2 * 1.707), 2)) <= 25) {
            canvas.style.cursor = 'nwse-resize';
        }
        else if ((Math.pow(e.offsetX - (ava.x + ava.d / 2), 2) + Math.pow(e.offsetY - (ava.y + ava.d / 2), 2)) <= Math.pow(ava.d / 2, 2)) {
            canvas.style.cursor = 'move';
        }
        else {
            canvas.style.cursor = 'auto';
        }
        if (canResize) {
            ava.d = e.offsetY - (ava.y + ava.d / 2 * 1.707) + ava.d;
            if (ava.d > Math.min((ava.xend - ava.x), (ava.yend - ava.y))) {
                // todo optimize the max ava.d
                ava.d = Math.min((ava.xend - ava.x), (ava.yend - ava.y));
            }
            drawVisibel(ava);
        }
        else if (canMove) {
            if (ava.y + ava.d > ava.yend) {
                ava.y = Math.floor(ava.yend - ava.d);
            }
            if (ava.x + ava.d > ava.xend) {
                ava.x = Math.floor(ava.xend - ava.d);
            }
            if (ava.x < ava.xfrom) {
                ava.x = Math.floor(ava.xfrom);
            }
            if (ava.y < ava.yfrom) {
                ava.y = Math.floor(ava.yfrom);
            }
            ava.x = e.offsetX - ox + ava.x;
            ava.y = e.offsetY - oy + ava.y;
            drawVisibel(ava);
            ox = e.offsetX;
            oy = e.offsetY;
        }
    });
    canvas.addEventListener('mouseout', function (e) {
        if ((ava.d > Math.min((ava.xend - ava.xfrom), (ava.yend - ava.yfrom))) && canResize) {
            ava.d = Math.min((ava.xend - ava.xfrom), (ava.yend - ava.yfrom));
            drawVisibel(ava);
        }
        canResize = false;
        canMove = false;
    });
    canvas.addEventListener('mouseup', function (e) {
        if ((ava.d > Math.min((ava.xend - ava.xfrom), (ava.yend - ava.yfrom))) && canResize) {
            ava.d = Math.min((ava.xend - ava.xfrom), (ava.yend - ava.yfrom));
            drawVisibel(ava);
        }
        canResize = false;
        canMove = false;
    });
    canvas.addEventListener('mousedown', function (e) {
        if ((Math.pow(e.offsetX - (ava.x + ava.d / 2 * 1.707), 2) + Math.pow(e.offsetY - (ava.y + ava.d / 2 * 1.707), 2)) <= 25) {
            canResize = true;
            canvas.style.cursor = 'nwse-resize';
        }
        else if ((Math.pow(e.offsetX - (ava.x + ava.d / 2), 2) + Math.pow(e.offsetY - (ava.y + ava.d / 2), 2)) <= Math.pow(ava.d / 2, 2)) {
            canMove = true;
            canvas.style.cursor = 'move';
            ox = e.offsetX;
            oy = e.offsetY;
        }
        else {
            canvas.style.cursor = 'auto';
        }
    });
}
function createImage(el) {
    var img = new Image();
    el.appendChild(img);
    absolute(img);
    return img;
}
function initFileInput(ava) {
    var el = ava.file;
    el.addEventListener('change', function (e) {
        var file = e.target.files[0];
        ava.$setBlob(file);
    });
}
function notify(ava) {
    for (var i = 0, len = ava.previews.length; i < len; i++) {
        ava.previews[i].update();
    }
}

function MixinApi(Avatar) {
    /**
     * set the blob img
     * @param file Blob type
     */
    Avatar.prototype.$setBlob = function (file) {
        var ava = this;
        var size = ava.size;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var img = ava.image;
            img.onload = function () {
                var isVertical = img.naturalHeight > img.naturalWidth;
                img.removeAttribute('width');
                img.removeAttribute('height');
                if (isVertical) {
                    img.height = size;
                    var left = (size - img.width) / 2;
                    img.style.left = left + 'px';
                    setSelectEdge(ava, left, 0, size - left, size);
                }
                else {
                    img.width = size;
                    var top = (size - img.height) / 2;
                    img.style.top = top + 'px';
                    setSelectEdge(ava, 0, top, size, size - top);
                }
                ava.scale = img.naturalHeight / img.height;
                drawVisibel(ava);
            };
            img.src = this.result;
        };
    };
}
/**
 *
 * @param ava
 * @param xf
 * @param yf
 * @param xe
 * @param ye
 */
function setSelectEdge(ava, xf, yf, xe, ye) {
    ava.xend = xe;
    ava.yend = ye;
    ava.xfrom = xf;
    ava.yfrom = yf;
    ava.d = Math.min(xe - xf, ye - yf);
    if (xf) {
        ava.x = xf;
        ava.y = (ye - yf - ava.d) / 2;
    }
    else {
        ava.y = yf;
        ava.x = (xe - xf - ava.d) / 2;
    }
}
//# sourceMappingURL=api.js.map

var Avatar = (function () {
    function Avatar(option) {
        this._init(option);
    }
    return Avatar;
}());
MixinInit(Avatar);
MixinApi(Avatar);

//# sourceMappingURL=index.js.map

return Avatar;

})));
