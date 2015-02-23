/*Classes of context menu:
* -mainFrame -
* -block -
* -widget -  */

var ContextMenu = {
    //data
    menus: {
        //menuMainFrame
        "menuMainFrame": {
            id: "menuMainFrame",
            list: {
                addWidget: {
                    class: "addWidget",
                    content: "Add widget",
                    event: function (el) {
                        ContextMenu.hideMenus();
                        ContextMenu.createWidget(this);
                    }
                },
                addBlock: {
                    class: "addBlock",
                    content: "Add block",
                    event: function () {
                        ContextMenu.hideMenus();
                        ContextMenu.createBlock(this);
                    }
                }
            }
        },
        //menuBlock
        "menuBlock": {
            id: "menuBlock",
            list: {
                addWidget: {
                    class: "addWidget",
                    content: "Add widget",
                    event: function (el) {
                        ContextMenu.hideMenus();
                        ContextMenu.createWidget(this);
                    }
                },
                addBlock: {
                    class: "addBlock",
                    content: "Add block",
                    event: function () {
                        ContextMenu.hideMenus();
                        ContextMenu.createBlock(this);
                    }
                },
                deleteBlock: {
                    class: "deleteBlock",
                    content: "Delete block",
                    event: function () {
                        ContextMenu.hideMenus();
                        this.parentNode.removeChild(this);
                    }
                }
            }
        },
        //menuWidget
        "menuWidget": {
            id: "menuWidget",
            list: {
                addImage: {
                    class: "addImage",
                    content: "Add Image",
                    event: function () {
                        ContextMenu.hideMenus();
                        ContextMenu.createImage(this);
                    }
                },
                addText: {
                    class: "addText",
                    content: "Add Text",
                    event: function () {
                        ContextMenu.hideMenus();
                        ContextMenu.createText(this);
                    }
                },
                deleteWidget: {
                    class: "deleteWidget",
                    content: "Delete widget",
                    event: function () {
                        ContextMenu.hideMenus();
                        this.parentNode.removeChild(this);
                    }
                }
            }
        },

        //menuImage
        "menuImage": {
            id: "menuImage",
            list : {
                setImage: {
                    class: "setImage",
                    content: "Set Image:<br><input type='file' style='border: 1px solid black;'>",
                    event: function () {

                    }
                },
                deleteImage: {
                    class: "deleteImage",
                    content: "Delete Image",
                    event: function () {
                        ContextMenu.hideMenus();
                        this.parentNode.removeChild(this);
                    }
                }
            }
        },

        //menuText
        "menuText": {
            id: "menuText",
            list : {
                setText: {
                    class: "setText",
                    content: "Set Text:<br><input type='text' style='border: 1px solid black;'>",
                    event: function () {

                    }
                },
                deleteText: {
                    class: "deleteText",
                    content: "Delete Text",
                    event: function () {
                        ContextMenu.hideMenus();
                        this.parentNode.removeChild(this);
                    }
                }
            }
        }
    },
    //settings


    //initialization
    _init: function () {
        //localStorage.clear();
        var self = this,
            body = document.getElementsByTagName("body")[0],
            mainFrame = document.getElementById("mainFrame");
        //console.dir(localStorage.getItem("mainFrame"));
        body.appendChild(this.createFragmentOfMenus());
        this.hideMenus();
        this.loadContentFromDB();

        this.outClickEvent(mainFrame);
        this.setResize();
        this.stopContextEvent_ContextMenu();

        this.setTreeOfMainFrame(mainFrame);
        Frames.setResizable(mainFrame);
        this.setSaveButton();
    },

    //functions

    //create and return menu as html list
    createMenu: function (menu) {
        var cMenu = document.createElement("ul"),
            li;

        cMenu.setAttribute("id", menu.id);
        cMenu.setAttribute("class", "contextMenu");
        cMenu.style["z-index"] = 20;
        for (var option in menu.list) {
            option = menu.list[option];
            li = document.createElement("li");
            li.innerHTML = option.content;
            li.className = option.class;
            cMenu.appendChild(li);
        }

        return cMenu;
    },

    //concatenate menu lists into frame and return it
    createFragmentOfMenus: function () {
        var fragmentOfMenus = document.createDocumentFragment(),
            menus = this.menus;

        for (var menu in menus) {
            menu = menus[menu];
            fragmentOfMenus.appendChild(this.createMenu(menu));

        }
        return fragmentOfMenus;
    },

    setContext_Menu: function (elem) {
        var self = this,
            elemClass = elem.className,
            menu;
        //detect which menu correspond
        if (elemClass == "mainFrame") {
            menu = document.getElementById("menuMainFrame");
        } else if (elemClass == "block") {
            menu = document.getElementById("menuBlock");
        } else if (elemClass == "widget") {
            menu = document.getElementById("menuWidget");
        } else if (elemClass == "image") {
            menu = document.getElementById("menuImage");
        } else if (elemClass == "text"){
            menu = document.getElementById("menuText");
        }

        Utility.addEvent(elem, "contextmenu", function (e) {
            Utility.stopEvent(e);
            self.handleRightClick(e, menu, elem);
        });
    },

    handleRightClick: function (e, menu, elem) {
        e = e || window.event;
        var self = this,
            left = parseInt(e.clientX),
            top = parseInt(e.clientY),
            width = menu.clientWidth,
            height = menu.clientHeight;

        if (left + width >= self.windowW) {
            left = self.windowW - width;
        }
        if (top + height >= self.windowH) {
            top = self.windowH - height;
        }
        this.hideMenus();
        this.showMenu(menu, left, top);
        this.bindMenu(menu, elem);
    },

    showMenu: function (menu, left, top) {
        left = left || 0;
        top = top || 0;

        menu.style.top = top + 'px';
        menu.style.left = left + 'px';
        menu.style.visibility = 'visible';
    },

    bindMenu: function (menu, elem) {
        var self = this,
            dataMenu = this.menus[menu.id],
            newLi;

        for (var option in dataMenu.list) {
            if (dataMenu.list.hasOwnProperty(option)) {
                option = dataMenu.list[option];
                li = document.getElementById(dataMenu.id).getElementsByClassName(option.class)[0];
                //remove all event listeners
                newLi = li.cloneNode(true);
                li.parentNode.replaceChild(newLi, li);
                (function (option) {
                    if (option.class == "setImage") {
                        var input = newLi.querySelector('input[type=file]');
                        Utility.addEvent(input, "change", function () {
                            console.log(input)
                            Frames.setImage(input, elem);
                        });
                    }else if(option.class == "setText"){
                        var input = newLi.querySelector('input[type=text]');
                        Utility.addEvent(input, "change", function () {
                            //console.log(input)
                            Frames.setText(input, elem);
                        });
                    } else {
                        Utility.addEvent(newLi, "click", function (e) {
                            if (e.which == 1) {
                                option.event.call(elem);
                            }
                        });
                    }
                })(option);
            }
        }
    },

    hideMenus: function () {
        for (var menu in this.menus) {
            Utility.hide(document.getElementById(menu));
        }
    },

    outClickEvent: function (elem) {
        var self = this;

        Utility.addEvent(elem, "mousedown", function(e) {
            if (e.which == 1) {
                self.hideMenus();
            }
        });
    },

    stopContextEvent_ContextMenu: function () {
        var self = this,
            menusDOM = document.getElementsByClassName("contextMenu"),
            len = menusDOM.length;

        for (var i = 0; i < len; i+=1) {
            Utility.addEvent(document.getElementsByClassName("contextMenu")[i], "contextmenu", function (e) {
                Utility.stopEvent(e);
            });
        }
    },

    setTreeOfMainFrame: function (elem) {
        var self = this,
            children = elem.childNodes,
            lenChildren = children.length;

        this.setContext_Menu(elem);

        if (elem.className !== "mainFrame") {
            Frames.block.event.call(elem);
            Frames.setResizable(elem);
        }
        for (var i = 0; i < lenChildren; i+=1) {
            self.setTreeOfMainFrame(children[i]);
        }
    },

    setResize: function () {
        Utility.addEvent(window, "resize", function (e) {
            this.windowW = window.innerWidth;
            this.windowH = window.innerHeight;
        });
    },

    createBlock: function (parent) {
        var self = this,
            block = document.createElement("div"),
            parentW = parent.clientWidth,
            parentH = parent.clientHeight;

        block.className = "block";
        if(parentW <= Frames.block.w) {
            block.style.width = parentW - 2 * Frames.step - (parentW % Frames.step) + "px";
        } else {
            block.style.width = Frames.block.w + "px";
        }
        if(parentH <= Frames.block.h) {
            block.style.height = parentH - 2 * Frames.step - (parentH % Frames.step) + "px";
        } else {
            block.style.height = Frames.block.h + "px";
        }
        block.style.position = Frames.block.position1;
        block.style.display = Frames.block.display;
        block.style.background = "lightpink";
        block.style.top = 0;
        block.style.left = 0;
        block.style.margin = "10px";
        block.style["vertical-align"]= "top";
        block.style["z-index"] = 1;


        parent.appendChild(block);

        Frames.block.event.call(block);
        ContextMenu.setContext_Menu(block);
        Frames.setResizable(block);
    },

    createWidget: function (parent) {
        var self = this,
            widget = document.createElement("div");

        widget.className = "widget";
        Utility.setStyle(widget, {
            width: Frames.widget.w,
            height: Frames.widget.h,
            position: Frames.position1,
            display: Frames.widget.display,
            background: Frames.widget.background,
            left: 0,
            top: 0,
            margin: "10px",
            "vertical-align": "top",
            "z-index": 1
        });

        Frames.block.event.call(widget);
        parent.appendChild(widget);
        ContextMenu.setContext_Menu(widget);
        Frames.setResizable(widget);
    },

    createImage: function (parent) {
        var self = this,
            image = document.createElement("div");

        image.className = "image";
        Utility.setStyle(image, {
            height: Frames.image.h,
            width: Frames.image.w,
            border: "1px solid",
            position: "absolute",
            display: "inline-block",
            margin: "5px",
            "vertical-align": "top"
        });

        Frames.block.event.call(image);
        parent.appendChild(image);
        ContextMenu.setContext_Menu(image);
        Frames.setResizable(image);

    },

    createText: function (parent) {
        var self = this,
            text = document.createElement("div");

        text.className = "text";
        Utility.setStyle(text, {
            height: Frames.image.h,
            width: Frames.image.w,
            border: "1px solid",
            position: "relative",
            display: "inline-block",
            margin: "5px",
            "vertical-align": "top",
            "text-align": "center"
        });

        Frames.block.event.call(text);
        parent.appendChild(text);
        ContextMenu.setContext_Menu(text);
        Frames.setResizable(text);

    },

    loadContentFromDB: function () {
        var self = this;

        //if (localStorage.getItem("mainFrameContent")) {
        //    this.content = localStorage.getItem("mainFrameContent");
        //} else {
        //    this.content = "";
        //}
        //if (localStorage.getItem("mainFrameSize")) {
        //    this.frameSize = JSON.parse(localStorage.getItem("mainFrameSize"));
        //} else {
        //    this.frameSize = {
        //        w: 1200,
        //        h: 500
        //    }
        //}
        //$("#mainFrame").width(this.frameSize.w);
        //$("#mainFrame").height(this.frameSize.h);
        //$("#mainFrame").html(this.content);

        if (localStorage.getItem("mainFrameTree")) {
            this.tree = JSON.parse(localStorage.getItem("mainFrameTree"));
        } else {
            this.tree = {
                class: "mainFrame",
                children: []
            };
        }
        console.dir(this.tree);
        this.constructDomTree(self.tree, document.getElementById("mainFrame"));
    },
    //
    constructDomTree: function (tree, parent) {
        var self = this,
            len;
        //console.log(len)
        if(tree.class !== "mainFrame"){
            var el = document.createElement(tree.type),
                parent = parent;

            Utility.setStyle(el, tree.styles);
            if (tree.id) {
                el.setAttribute("id", tree.id);
            }
            el.setAttribute("class", tree.class);

            parent.appendChild(el);
            this.setContext_Menu(el);
        } else {
            var el = parent;
            this.setContext_Menu(parent);
        }

        if(tree.children){
        	len = tree.children.length;
        	for(var child = 0; child < len; child++) {
	            var childDom = tree.children[child];
	            var parent = el;
	            self.constructDomTree(childDom, parent);
	        }
        }
        
    },

    setSaveButton: function () {
        var self = this,
            save = document.getElementById("save"),
            mainFrame = document.getElementById("mainFrame");

        Utility.addEvent(save, "click", function (e) {
            self.tree = {};
            self.constructObjectTree(mainFrame, self.tree);
            //console.dir(self.tree)
            localStorage.setItem("mainFrameTree", JSON.stringify(self.tree));
            //var copyElem = $("#mainFrame").clone();
            //copyElem.find(".resBar").remove();


            //copyElem.remove(".resBar");


            //localStorage.setItem("mainFrameContent", copyElem.html());
            //localStorage.setItem("mainFrameSize", JSON.stringify({
            //    w: copyElem.width(),
            //    h: copyElem.height()
            //}));
            //
            //console.dir(copyElem.html());
        });

    },

    constructObjectTree: function (dom, object) {
        var self = this,
            length = dom.children.length;
        //console.log(dom.style)
        object.styles = {
            width: dom.style.width,
            height: dom.style.height,
            position: dom.style.position,
            background: dom.style.background,
            top: dom.style.top,
            left: dom.style.left,
            display: dom.style.display,
            margin: dom.style.margin,
            "vertical-align": dom.style["vertical-align"]
        };
        object.class = dom.className;
        object.type = dom.nodeName;
        if(object.class == "block" || object.class == "mainFrame") {
        	object.children = [];
        	var counter = 0;
	        for (var i = 0; i < length; i++) {
	            //object.children[i] = dom.children[i];
	            if(dom.children[i].className.indexOf("resBar") === -1){
	                object.children[counter] = {};
	                self.constructObjectTree(dom.children[i], object.children[counter]);
	                counter++;
	            }

	        }
        } else {
        	object.content = "";
        }
        
        
        //
        //for(var i = 0; i < length; i++){
        //    console.log(dom.children)
        //    if(dom.children[i].className.indexOf("resBar") != -1) {
        //        dom.children[i].remove()
        //    }
        //}
        
    }
};
ContextMenu._init();
