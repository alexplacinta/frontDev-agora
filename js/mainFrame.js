var Frames = {
    windowW: window.innerWidth,
    windowH: window.innerHeight,
    grid_block: 10,
    grid_widget: 10,
    grid_image: 2,
    grid_mainFrame: 25,
    grid_text: 2,
    block: {
        w: 200,
        h: 200,
        background: "lightpink",
        position1: "relative",
        position2: "absolute",
        display: "inline-block",
        event: function () {
            var self = this,
                mainFrame = document.getElementById("mainFrame"),
                mouseDown = false,
                grid = Frames.grid_block,
                offElX,
                offElY,
                x,
                y,
                roundX,
                roundY,
                clone;
            var xClone, yClone;

            Utility.addEvent(this, "mousedown", function (e) {

                var target = e.target;
                //console.log(target)
                ContextMenu.hideMenus();
                Utility.stopEvent(e);
                if (e.which == 1) {
                    offElX = parseInt(e.clientX) - Utility.getCoord(self).left;
                    offElY = parseInt(e.clientY) - Utility.getCoord(self).top;
                    mouseDown = true;
                    self.style.position = "relative";
                    // self.style.border = "solid 1px red";
                    self.style.cursor = "grabbing";
                    self.style['z-index'] = 40;

                    clone = document.createElement("div");
                    clone.className = "clone";
                    clone.style.width = this.style.width;
                    clone.style.height = this.style.height;

                    clone.style.background = "white";
                    clone.style.border = "dotted black";
                    clone.style.position = "relative";
                    clone.style.top = 0;
                    clone.style.left = 0;
                    clone.style.display = "inline-block";
                    clone.style["vertical-align"] = "top";
                    clone.style["z-index"] = 1;
                    self.style["vertical-align"] = "top";
                    $(clone).insertBefore(self);
                    xClone = Utility.getCoord(clone).left - Utility.getCoord(clone.parentNode).left + 7;
                    yClone = Utility.getCoord(clone).top - Utility.getCoord(clone.parentNode).top + 7;
                    clone.style.position = "absolute";
                    // $(clone).appendTo(mainFrame);
                    clone.style.left = xClone;
                    clone.style.top = yClone;



                }
            });
            
            Utility.addEvent(window, "mousemove", function (e) {

                //console.log(target)
                Utility.stopEvent(e);
                if (!mouseDown) {
                    return;
                }
                x = parseInt(e.clientX);
                y = parseInt(e.clientY);
                roundX = (x - offElX - Utility.getCoord(mainFrame).left) % grid >= (grid - 1) / 2 ? (x - offElX) - (x - offElX - Utility.getCoord(mainFrame).left) % grid + grid: (x - offElX) - (x - offElX - Utility.getCoord(mainFrame).left) % grid;
                roundY = (y - offElY - Utility.getCoord(mainFrame).top) % grid >= (grid - 1) / 2 ? (y - offElY) - (y - offElY - Utility.getCoord(mainFrame).top) % grid + grid: (y - offElY) - (y - offElY - Utility.getCoord(mainFrame).top) % grid;
                //x = Utility.getCoord(e).left;
                //y = Utility.getCoord(e).top;
                $(self).hide();
                var target = document.elementFromPoint(x,y);
                //console.log(target)
                $(self).show();
                
                
                //console.log(target)
                if (target.className.indexOf("resBar") == -1 &&
                    target.className.indexOf("mainFrame") == -1 &&
                    target.className.indexOf("clone") == -1) {
                    self.style.position = "relative";
                    if(x - Utility.getCoord(target).left < $(target).width()/4){
                        $(self).insertBefore($(target));
                    } else if((x - Utility.getCoord(target).left > $(target).width()*3/4)){
                        $(self).insertAfter($(target));
                    } else if((self.className.indexOf("widget") !== -1) && 
                                (target.className.indexOf("block") !== -1)){
                        $(self).appendTo($(target));
                    }

                    clone.style.position = "relative";
                    clone.style.top = 0;
                    clone.style.left = 0;


                    $(clone).insertBefore(self);

                    xClone = Utility.getCoord(clone).left - Utility.getCoord(clone.parentNode).left + 7;
                    yClone = Utility.getCoord(clone).top - Utility.getCoord(clone.parentNode).top + 7;
                    clone.style.position = "absolute";
                    // $(clone).appendTo(mainFrame);
                    clone.style.left = xClone;
                    clone.style.top = yClone;
                    // console.log(self.style.)

                }

                //console.log(x, y)
                Utility.setCoord(self, roundX, roundY);
                


            });



            Utility.addEvent(window, "mouseup", function (e) {
                Utility.stopEvent(e);
                mouseDown = false;
                self.style.position = "relative";
                Utility.setStyle(self, {
                    left: 0,
                    top: 0,
                    border: "",
                    "z-index": 1,
                    cursor: ""
                });
                $(clone).remove();

            });

        }
    },
    widget: {
        w: 100,
        h: 100,
        background: "cyan",
        position1: "relative",
        position2: "absolute",
        display: "inline-block",
        event: function () {
            var self = this,
                mainFrame = document.getElementById("mainFrame"),
                mouseDown = false,
                grid = Frames.grid_widget,
                offElX,
                offElY,
                x,
                y,
                roundX,
                roundY;
            Utility.addEvent(this, "mousedown", function (e) {
                ContextMenu.hideMenus();
                Utility.stopEvent(e);
                if (e.which == 1) {
                    offElX = parseInt(e.clientX) - Utility.getCoord(self).x;
                    offElY = parseInt(e.clientY) - Utility.getCoord(self).y;
                    mouseDown = true;
                    self.style.position = "absolute";
                }
            });
            Utility.addEvent(window, "mousemove", function (e) {
                Utility.stopEvent(e);
                if (!mouseDown) {
                    return;
                }
                x = parseInt(e.clientX);
                y = parseInt(e.clientY);
                roundX = (x - offElX - Utility.getCoord(mainFrame).x) % grid >= (grid - 1) / 2 ? (x - offElX) - (x - offElX - Utility.getCoord(mainFrame).x) % grid + grid: (x - offElX) - (x - offElX - Utility.getCoord(mainFrame).x) % grid;
                roundY = (y - offElY - Utility.getCoord(mainFrame).y) % grid >= (grid - 1) / 2 ? (y - offElY) - (y - offElY - Utility.getCoord(mainFrame).y) % grid + grid: (y - offElY) - (y - offElY - Utility.getCoord(mainFrame).y) % grid;
                Utility.setCoord(self, roundX, roundY);

            });

            Utility.addEvent(window, "mouseup", function (e) {
                Utility.stopEvent(e);
                mouseDown = false;
                self.style.position = "relative";
                Utility.setStyle(self, {
                    left: 0,
                    top: 0
                });
            });

        }
    },

    image: {
        h: 40,
        w: 40,
        event: function () {
            var self = this,
                mainFrame = document.getElementById("mainFrame"),
                mouseDown = false,
                grid = Frames.grid_image,
                offElX,
                offElY,
                x,
                y,
                roundX,
                roundY;
            Utility.addEvent(this, "mousedown", function (e) {
                ContextMenu.hideMenus();
                Utility.stopEvent(e);
                if (e.which == 1) {
                    offElX = parseInt(e.clientX) - Utility.getCoord(self).x;
                    offElY = parseInt(e.clientY) - Utility.getCoord(self).y;
                    mouseDown = true;
                    self.style.position = "absolute";
                }
            });
            Utility.addEvent(window, "mousemove", function (e) {
                Utility.stopEvent(e);
                if (!mouseDown) {
                    return;
                }
                x = parseInt(e.clientX);
                y = parseInt(e.clientY);
                roundX = (x - offElX - Utility.getCoord(mainFrame).left) % grid >= (grid - 1) / 2 ? (x - offElX) - (x - offElX - Utility.getCoord(mainFrame).left) % grid + grid: (x - offElX) - (x - offElX - Utility.getCoord(mainFrame).left) % grid;
                roundY = (y - offElY - Utility.getCoord(mainFrame).top) % grid >= (grid - 1) / 2 ? (y - offElY) - (y - offElY - Utility.getCoord(mainFrame).top) % grid + grid: (y - offElY) - (y - offElY - Utility.getCoord(mainFrame).top) % grid;
                Utility.setCoord(self, roundX, roundY);

            });

            Utility.addEvent(window, "mouseup", function (e) {
                Utility.stopEvent(e);
                mouseDown = false;
                self.style.position = "relative";
                Utility.setStyle(self, {
                    left: 0,
                    top: 0
                });

            });

        }
    },

    corner: {
        rd: {
            event: function () {
                var self = this,
                    mainFrame = document.getElementById("mainFrame"),
                    mouseDown = false,
                    parent = self.parentNode,
                    grid = Frames["grid_" + parent.className],
                    offElX,
                    offElY,
                    x,
                    y,
                    roundX,
                    roundY;
                //console.log(grid);
                Utility.addEvent(this, "mousedown", function (e) {
                    ContextMenu.hideMenus();
                    Utility.stopEvent(e);
                    if (e.which == 1) {
                        offElX = parseInt(e.clientX) - Utility.getCoord(parent).left;
                        offElY = parseInt(e.clientY) - Utility.getCoord(parent).top;
                        mouseDown = true;
                        self.style.position = "absolute";
                    }
                });
                Utility.addEvent(window, "mousemove", function (e) {
                    Utility.stopEvent(e);
                    if (!mouseDown) {
                        return;
                    }
                    x = parseInt(e.clientX) - Utility.getCoord(parent).left;
                    y = parseInt(e.clientY) - Utility.getCoord(parent).top;
                    roundX = x % grid >= (grid - 1) / 2 ? x - x % grid + grid: x - x % grid;
                    roundY = y % grid >= (grid - 1) / 2 ? y - y % grid + grid: y - y % grid;
                    Utility.setSize(parent, roundX, roundY);
                    Frames.resetResizeBox(parent);

                });

                Utility.addEvent(window, "mouseup", function (e) {
                    Utility.stopEvent(e);
                    mouseDown = false;
                });
            }
        },
        lu: {
            event: function () {
                var self = this,
                    mainFrame = document.getElementById("mainFrame"),
                    mouseDown = false,
                    parent = self.parentNode,
                    grid = Frames["grid_" + parent.className],
                    offElX,
                    offElY,
                    x,
                    y,
                    roundX,
                    roundY,
                    lastW,
                    lastH,
                    coordX,
                    coordY;
                //console.log(grid);
                Utility.addEvent(this, "mousedown", function (e) {
                    ContextMenu.hideMenus();
                    Utility.stopEvent(e);
                    if (e.which == 1) {
                        offElX = parseInt(e.clientX) - Utility.getCoord(parent).left;
                        offElY = parseInt(e.clientY) - Utility.getCoord(parent).top;
                        mouseDown = true;
                        self.style.position = "absolute";
                        lastW = parseInt(parent.style.width);
                        lastH = parseInt(parent.style.height);
                        coordX = Utility.getCoord(parent).left;
                        coordY = Utility.getCoord(parent).top;
                    }
                });
                Utility.addEvent(window, "mousemove", function (e) {
                    Utility.stopEvent(e);
                    if (!mouseDown) {
                        return;
                    }

                    x = parseInt(e.clientX) - coordX;
                    y = parseInt(e.clientY) - coordY;
                    roundX = x % grid >= (grid - 1) / 2 ? x - x % grid: x - x % grid - grid;
                    roundY = y % grid >= (grid - 1) / 2 ? y - y % grid: y - y % grid - grid;
                    Utility.setSize(parent, lastW - roundX, lastH - roundY);
                    Utility.setCoord(parent, coordX + roundX, coordY + roundY);

                    Frames.resetResizeBox(parent);

                });

                Utility.addEvent(window, "mouseup", function (e) {
                    Utility.stopEvent(e);
                    mouseDown = false;
                });
            }
        },
        ru: {
            event: function () {
                var self = this,
                    mainFrame = document.getElementById("mainFrame"),
                    mouseDown = false,
                    parent = self.parentNode,
                    grid = Frames["grid_" + parent.className],
                    offElX,
                    offElY,
                    x,
                    y,
                    roundX,
                    roundY,
                    lastW,
                    lastH,
                    coordX,
                    coordY;
                //console.log(grid);
                Utility.addEvent(this, "mousedown", function (e) {
                    ContextMenu.hideMenus();
                    Utility.stopEvent(e);
                    if (e.which == 1) {
                        offElX = parseInt(e.clientX) - Utility.getCoord(parent).left;
                        offElY = parseInt(e.clientY) - Utility.getCoord(parent).top;
                        mouseDown = true;
                        self.style.position = "absolute";
                        lastW = parseInt(parent.style.width);
                        lastH = parseInt(parent.style.height);
                        coordX = Utility.getCoord(parent).left;
                        coordY = Utility.getCoord(parent).top;
                    }
                });
                Utility.addEvent(window, "mousemove", function (e) {
                    Utility.stopEvent(e);
                    if (!mouseDown) {
                        return;
                    }

                    x = parseInt(e.clientX) - coordX;
                    y = parseInt(e.clientY) - coordY;
                    roundX = x % grid >= (grid - 1) / 2 ? x - x % grid + grid: x - x % grid;
                    roundY = y % grid >= (grid - 1) / 2 ? y - y % grid: y - y % grid - grid;
                    Utility.setSize(parent, roundX, lastH - roundY);
                    Utility.setCoord(parent, coordX, coordY + roundY);

                    Frames.resetResizeBox(parent);

                });

                Utility.addEvent(window, "mouseup", function (e) {
                    Utility.stopEvent(e);
                    mouseDown = false;
                });
            }
        },
        ld: {
            event: function () {
                var self = this,
                    mainFrame = document.getElementById("mainFrame"),
                    mouseDown = false,
                    parent = self.parentNode,
                    grid = Frames["grid_" + parent.className],
                    offElX,
                    offElY,
                    x,
                    y,
                    roundX,
                    roundY,
                    lastW,
                    lastH,
                    coordX,
                    coordY;
                //console.log(grid);
                Utility.addEvent(this, "mousedown", function (e) {
                    ContextMenu.hideMenus();
                    Utility.stopEvent(e);
                    if (e.which == 1) {
                        offElX = parseInt(e.clientX) - Utility.getCoord(parent).left;
                        offElY = parseInt(e.clientY) - Utility.getCoord(parent).top;
                        mouseDown = true;
                        self.style.position = "absolute";
                        lastW = parseInt(parent.style.width);
                        lastH = parseInt(parent.style.height);
                        coordX = Utility.getCoord(parent).left;
                        coordY = Utility.getCoord(parent).top;
                    }
                });
                Utility.addEvent(window, "mousemove", function (e) {
                    Utility.stopEvent(e);
                    if (!mouseDown) {
                        return;
                    }

                    x = parseInt(e.clientX) - coordX;
                    y = parseInt(e.clientY) - coordY;
                    roundX = x % grid >= (grid - 1) / 2 ? x - x % grid: x - x % grid - grid;
                    roundY = y % grid >= (grid - 1) / 2 ? y - y % grid + grid: y - y % grid;
                    Utility.setSize(parent, lastW - roundX, roundY);
                    Utility.setCoord(parent, coordX + roundX, coordY);

                    Frames.resetResizeBox(parent);

                });

                Utility.addEvent(window, "mouseup", function (e) {
                    Utility.stopEvent(e);
                    mouseDown = false;
                });
            }
        },
        u: {
            event: function () {
                var self = this,
                    mainFrame = document.getElementById("mainFrame"),
                    mouseDown = false,
                    parent = self.parentNode,
                    grid = Frames["grid_" + parent.className],
                    offElX,
                    offElY,
                    x,
                    y,
                    roundX,
                    roundY,
                    lastW,
                    lastH,
                    coordX,
                    coordY;
                //console.log(grid);
                Utility.addEvent(this, "mousedown", function (e) {
                    ContextMenu.hideMenus();
                    Utility.stopEvent(e);
                    if (e.which == 1) {
                        offElX = parseInt(e.clientX) - Utility.getCoord(parent).left;
                        offElY = parseInt(e.clientY) - Utility.getCoord(parent).top;
                        mouseDown = true;
                        self.style.position = "absolute";
                        lastW = parseInt(parent.style.width);
                        lastH = parseInt(parent.style.height);
                        coordX = Utility.getCoord(parent).left;
                        coordY = Utility.getCoord(parent).top;
                    }
                });
                Utility.addEvent(window, "mousemove", function (e) {
                    Utility.stopEvent(e);
                    if (!mouseDown) {
                        return;
                    }

                    //x = parseInt(e.clientX) - coordX;
                    y = parseInt(e.clientY) - coordY;
                    //roundX = x % grid >= (grid - 1) / 2 ? x - x % grid: x - x % grid - grid;
                    roundY = y % grid >= (grid - 1) / 2 ? y - y % grid: y - y % grid - grid;
                    Utility.setSize(parent, lastW, lastH - roundY);
                    Utility.setCoord(parent, coordX, coordY + roundY);

                    Frames.resetResizeBox(parent);

                });

                Utility.addEvent(window, "mouseup", function (e) {
                    Utility.stopEvent(e);
                    mouseDown = false;
                });
            }
        },
        r: {
            event: function () {
                var self = this,
                    mainFrame = document.getElementById("mainFrame"),
                    mouseDown = false,
                    parent = self.parentNode,
                    grid = Frames["grid_" + parent.className],
                    offElX,
                    offElY,
                    x,
                    y,
                    roundX,
                    roundY;
                //console.log(grid);
                Utility.addEvent(this, "mousedown", function (e) {
                    ContextMenu.hideMenus();
                    Utility.stopEvent(e);
                    if (e.which == 1) {
                        offElX = parseInt(e.clientX) - Utility.getCoord(parent).left;
                        offElY = parseInt(e.clientY) - Utility.getCoord(parent).top;
                        lastW = parseInt(parent.style.width);
                        lastH = parseInt(parent.style.height);
                        mouseDown = true;
                        self.style.position = "absolute";
                    }
                });
                Utility.addEvent(window, "mousemove", function (e) {
                    Utility.stopEvent(e);
                    if (!mouseDown) {
                        return;
                    }
                    x = parseInt(e.clientX) - Utility.getCoord(parent).left;
                    //y = parseInt(e.clientY) - Utility.getCoord(parent).top;
                    roundX = x % grid >= (grid - 1) / 2 ? x - x % grid + grid: x - x % grid;
                    //roundY = y % grid >= (grid - 1) / 2 ? y - y % grid + grid: y - y % grid;
                    Utility.setSize(parent, roundX, lastH);
                    Frames.resetResizeBox(parent);

                });

                Utility.addEvent(window, "mouseup", function (e) {
                    Utility.stopEvent(e);
                    mouseDown = false;
                });
            }
        },
        d: {
            event: function () {
                var self = this,
                    mainFrame = document.getElementById("mainFrame"),
                    mouseDown = false,
                    parent = self.parentNode,
                    grid = Frames["grid_" + parent.className],
                    offElX,
                    offElY,
                    x,
                    y,
                    roundX,
                    roundY;
                //console.log(grid);
                Utility.addEvent(this, "mousedown", function (e) {
                    ContextMenu.hideMenus();
                    Utility.stopEvent(e);
                    if (e.which == 1) {
                        offElX = parseInt(e.clientX) - Utility.getCoord(parent).left;
                        offElY = parseInt(e.clientY) - Utility.getCoord(parent).top;
                        lastW = parseInt(parent.style.width);
                        lastH = parseInt(parent.style.height);
                        mouseDown = true;
                        self.style.position = "absolute";
                    }
                });
                Utility.addEvent(window, "mousemove", function (e) {
                    Utility.stopEvent(e);
                    if (!mouseDown) {
                        return;
                    }
                    //x = parseInt(e.clientX) - Utility.getCoord(parent).left;
                    y = parseInt(e.clientY) - Utility.getCoord(parent).top;
                    //roundX = x % grid >= (grid - 1) / 2 ? x - x % grid + grid: x - x % grid;
                    roundY = y % grid >= (grid - 1) / 2 ? y - y % grid + grid: y - y % grid;
                    Utility.setSize(parent, lastW, roundY);
                    Frames.resetResizeBox(parent);

                });

                Utility.addEvent(window, "mouseup", function (e) {
                    Utility.stopEvent(e);
                    mouseDown = false;
                });
            }
        },
        l: {
            event: function () {
                var self = this,
                    mainFrame = document.getElementById("mainFrame"),
                    mouseDown = false,
                    parent = self.parentNode,
                    grid = Frames["grid_" + parent.className],
                    offElX,
                    offElY,
                    x,
                    y,
                    roundX,
                    roundY,
                    lastW,
                    lastH,
                    coordX,
                    coordY;
                //console.log(grid);
                Utility.addEvent(this, "mousedown", function (e) {
                    ContextMenu.hideMenus();
                    Utility.stopEvent(e);
                    if (e.which == 1) {
                        offElX = parseInt(e.clientX) - Utility.getCoord(parent).left;
                        offElY = parseInt(e.clientY) - Utility.getCoord(parent).top;
                        mouseDown = true;
                        self.style.position = "absolute";
                        lastW = parseInt(parent.style.width);
                        //lastH = parseInt(parent.style.height);
                        coordX = Utility.getCoord(parent).left;
                        //coordY = Utility.getCoord(parent).top;
                    }
                });
                Utility.addEvent(window, "mousemove", function (e) {
                    Utility.stopEvent(e);
                    if (!mouseDown) {
                        return;
                    }

                    x = parseInt(e.clientX) - coordX;
                    //y = parseInt(e.clientY) - coordY;
                    roundX = x % grid >= (grid - 1) / 2 ? x - x % grid: x - x % grid - grid;
                    Utility.setSize(parent, lastW - roundX, lastH);
                    Utility.setCoord(parent, coordX + roundX, coordY);

                    Frames.resetResizeBox(parent);

                });

                Utility.addEvent(window, "mouseup", function (e) {
                    Utility.stopEvent(e);
                    mouseDown = false;
                });
            }
        }
    },

    step: 5,


    //functions

    setImage: function (input, elem) {
        var file    = input.files[0];
        var reader  = new FileReader();

        reader.onloadend = function () {
            elem.style.background = "url(" + reader.result + ") no-repeat";
            //elem.style['background-size'] = "100% 100%";
            //$(elem).css("background-size", "100% 100%");
            elem.style.border = "";
            ContextMenu.hideMenus();
        }

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            elem.style.background = "";
            elem.style.border = "1px solid";
        }
    },

    setText: function (input, elem) {
        var self = this,
            value = input.value,
            len = value.length;
        if (len != 0){
            elem.style.border ="";
        } else {
            elem.style.border ="solid 1px black";
        }
    },

    setResizable: function (el) {
        this.constructResBars(el);

        //this.bindBoxes(el);
    },

    constructResBars: function (el) {
        var self = this,
            w = parseInt(el.style.width),
            h = parseInt(el.style.height),
            corners = ["lu", "ru", "rd", "ld", "u", "r", "d", "l"],
            len = corners.length,
            corn = {},
            key;
        //console.log(w,h)

        for (var i = 0; i < len; i++) {
            key = corners[i];
            corn[key] = document.createElement("div");
            corn[key].className = "resBar " + key;
        }


        for (key in corn) {
            el.appendChild(corn[key]);
            if (!(el.className == "mainFrame" && key.indexOf("l") != -1)){
                Frames.bindCorner(corn[key], key);
            }

        }

        Frames.resetResizeBox(el);
    },

    bindCorner: function (corn, key) {
        Frames.corner[key].event.call(corn);
    },

    resetResizeBox: function (el) {
        var children = el.children,
            len = children.length,
            corn = {},
            className,
            w = parseInt(el.style.width),
            h = parseInt(el.style.height);

        for( var i = 0; i < len; i++) {
            className = children[i].className;
            if (className.indexOf("resBar") != -1) {
                corn[className.slice(7,className.length)] = children[i];
            }
        }

        //lu
        Utility.setStyle(corn["lu"],{
            width: 5 + "px",
            height: 5 + "px",
            position: "absolute",
            top: 0,
            left: 0
        });
        //ru
        Utility.setStyle(corn["ru"],{
            width: 5 + "px",
            height: 5 + "px",
            position: "absolute",
            top: 0,
            left: w - 5 + "px"
        });
        //rd
        Utility.setStyle(corn["rd"],{
            width: 5 + "px",
            height: 5 + "px",
            position: "absolute",
            top: h - 5 + "px",
            left: w - 5 + "px"
        });
        //ld
        Utility.setStyle(corn["ld"],{
            width: 5 + "px",
            height: 5 + "px",
            position: "absolute",
            top: h - 5 + "px",
            left: 0
        });
        //u
        Utility.setStyle(corn["u"],{
            width: w - 10 + "px",
            height: 5 + "px",
            position: "absolute",
            top: 0,
            left: 5 + "px"
        });
        //r
        Utility.setStyle(corn["r"],{
            width: 5 + "px",
            height: h - 10 + "px",
            position: "absolute",
            top: 5 + "px",
            left: w - 5 + "px"
        });
        //d
        Utility.setStyle(corn["d"],{
            width:  w - 10 + "px",
            height: 5 + "px",
            position: "absolute",
            top: h - 5 + "px",
            left: 5 + "px"
        });
        //l
        Utility.setStyle(corn["l"],{
            width: 5 + "px",
            height: h - 10 + "px",
            position: "absolute",
            top: 5 + "px",
            left: 0
        });

    }
};