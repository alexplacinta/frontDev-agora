var Utility = {
    addEvent: function(elem, event, fn) {
        if (typeof elem == "string") {
            elem = document.getElementById(elem);
        }

        if (elem.attachEvent) {
            return elem.attachEvent('on' + type, fn);
        } else if (elem.addEventListener) {
            elem.addEventListener(event, fn, false);
        } else {
            elem['on' + event] = fn;
        }
    },

    stopEvent: function (e) {
        e = e || window.event;
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false;
    },

    hide: function (el) {
        if (el.style.visibility != "hidden") {
            el.style.visibility = "hidden";
        }
    },

    show: function (el) {
        if (el.style.visibility != "visible") {
            el.style.visibility = "visible";
        }
    },

    getCoord: function (el) {
        //console.log($(el).offset())
        return $(el).offset();

    },

    setCoord: function (el, x, y) {
        $(el).offset({
            top: y,
            left: x
        });

    },

    setSize: function (el, width, height) {
        el.style.width = width + "px";
        el.style.height = height + "px";
    },

    getSize: function (el) {
        return {
            w: el.style.width,
            h: el.style.heigh
        }
    },

    setStyle: function (el, styles) {
        for (var style in styles) {
            if (styles.hasOwnProperty(style)) {
                value = styles[style];
                el.style[style] = value;
            }
        }
    }

};