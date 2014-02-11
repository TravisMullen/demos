var App = App || {};

App.Kit = {
    //supporting functions
    addClass: function (el,className){
        if (el.classList) {
          el.classList.add(className);
        } else {
          el.className += ' ' + className;
        }
    },
    fixPageXY :function (e, parent) {
        if (e.pageX == null && e.clientX != null ) {
            var html = document.documentElement;
            console.log(parent);
            var body = parent;

            e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
            e.pageX -= html.clientLeft || 0;

            e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
            e.pageY -= html.clientTop || 0;
        }
    },
    outerWidth: function(el, includeMargin){
        var width = el.offsetWidth;

        if(includeMargin){
            var style = getComputedStyle(el);
            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        }
        return width;
    }//,  :: start polyfills
    // getCharCode : function(event) {
    //     if (typeof event.charCode === "number") {
    //         return event.charCode;
    //     } else {
    //         return event.keyCode;
    //     }
    // }

};


//start application
App.Slidebar = {
    init: function() {
        this.slideBar = document.getElementById("slidebar"),
        this.slideData = document.getElementById("position-data"),
        this.buttonClass = 'button',
        this.button = this.createButton(),
        this.maxBar = App.Kit.outerWidth( this.slideBar ),
        this.unit = 5;

        this.createInterface(this.slideBar,this.button);
        this.updateDataDisplay("0");
        this.bindEvents();


    },
    bindEvents: function() {
        var that = this;
        this.button.onmousedown = function() {

          var self = this;

          document.onmousemove = function(e) {
            e = e || event;

            if (e.pageX > 0 && e.pageX <= App.Slidebar.maxBar) {

                self.style.left = e.pageX+'px';
                that.updateDataDisplay(e.pageX);

            }

          },
          document.onkeydown = function(e) {
            e = e || window.event;
            var leftPosition = parseInt(self.style.left);


            if (leftPosition > 1 && leftPosition < App.Slidebar.maxBar) {
                if (e.keyCode == "39" && (leftPosition+App.Slidebar.unit < App.Slidebar.maxBar) ) { // leftPosition button

                    // make this own function
                    leftPosition = leftPosition+App.Slidebar.unit;

                    self.style.left = (leftPosition) + "px";
                    that.updateDataDisplay(leftPosition);
                }
                if (e.keyCode == "37" && (leftPosition-App.Slidebar.unit > 1) ) { //right button

                    leftPosition = leftPosition-App.Slidebar.unit;

                    self.style.left = leftPosition + "px";
                    that.updateDataDisplay(leftPosition);
                }
            }
          },
          document.onmouseup = function() {
            document.onmousemove = null;
          }
        }
    },
    createInterface: function() {
        this.slideBar.appendChild(this.button);
    },
    createButton: function() {
        var button = document.createElement("div");
        App.Kit.addClass(button, 'button');
        return button;
    },
    updateDataDisplay: function(unit) {
        var percentage = Math.floor((unit / this.maxBar) * 100); //find percent\
        this.slideData.innerHTML = percentage + "%";
    }
};

App.Slidebar.init();