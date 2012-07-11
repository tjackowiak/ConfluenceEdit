// Full page edit in Confluence
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey:
// https://addons.mozilla.org/pl/firefox/addon/greasemonkey/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Full page edit in Confluence", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Full page edit in Confluence
// @author        kef
// @namespace     http://github.com/tjackowiak
// @description   Removes those pesky toolbars
// @include       *pages/editpage.action*
// @version       0.1.1
// ==/UserScript==

/**
 * Kilka pomocnych metod
 */
var tools = {
   /**
    * Metoda wykonuje wstrzykniecie kodu funkcji w cialo dokumentu
    */
   injectFunction: function (functionName){
      var inject = document.createElement("script");
      inject.setAttribute("type", "text/javascript");
      inject.appendChild(document.createTextNode("(" + functionName + ")()"));
      document.body.appendChild(inject);
   },

   /**
    * Hej hej hej, hej hej hej 
    * Inni mają jeszcze gorzej 
    * Hej hej hej, hej hej hej 
    * Ale nie da ukryć się, że są tacy, którym jest lepiej 
    *
    * I tym co mają gorzej staramy się wyrownać szanse
    */
   browsersCompatibility: function (){
      // Define GM_addStyle for compatibility with opera 
      // http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js
      if(typeof GM_addStyle == "undefined"){
         this.GM_addStyle=function (css){
            var heads = document.getElementsByTagName("head");
            if(heads.length > 0){
               var node = document.createElement("style");
               node.type = "text/css";
               node.appendChild(document.createTextNode(css));
               heads[0].appendChild(node); 
            }
         }
      }
   },
}

function makeMagic(){

    $=window.jQuery;
    toolbarHidden=false;

    $('#toolbar div.toolbar-split-right').css('max-width', '160px').prepend(
        $('<ul class="toolbar-group"/>').html('<li class="toolbar-item"><a class="toolbar-trigger" href="#" title="Full Screen"><span class="icon icon-fullscreenedit22">Full Screen</span></a></li>')
    ).click(function () {
        
        $("#header").fadeToggle();
        $('#editor-precursor').fadeToggle();
        $('#rte-savebar').slideToggle();
        if(toolbarHidden) {
            $('#toolbar').css('position','static').css('width', '100%').animate({'top':'0px'}, 500)
            $('#rte-toolbar').css('overflow', 'visible').css('height', 'auto')
            toolbarHidden=false;
        }
        else {
            $('#toolbar').css('position','fixed').css('width', '100%').animate({'top':'-35px'}, 500)
            $('#rte-toolbar').css('overflow', 'hidden').css('height', '35px')
            toolbarHidden=true;
        }
    })

    $('#toolbar').hover(
    function() {
        $('#toolbar').animate({'top':'0px'}, {queue:false, duration:500})
    },
    function() {
        $('#toolbar').animate({'top':'-35px'}, {queue:false, duration:500})
    })
}

/**
 * Zapewniamy kompatybilnosc z Opera
 */
tools.browsersCompatibility();
/**
 * Wstrzykujemy nasz kod w DOM strony
 */
tools.injectFunction(makeMagic)

GM_addStyle([
'.icon-fullscreenedit22 { ',
'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAAGDSURBVDhP5ZNXqsJQFEXvLDJIOyoigth7ReyK7cMCBsuP/ojidPKTEWzPvuDzoeZN4AVC4OasffY9RS0WC/Cdz+eYzWaYTCZQDk+r1UKz2US9Xke1WkW5XIYifL/fcbvd/oSpKbBBkf1+j8PhgEKhAMXM1+sV5/MZ2+0Wo9HI/GaAsGS2Gb9cLmGaJnK5HNR0OtX2d7sdLpcLNpsN+v3+h4jAFq/IOPmPbDaLdDoNxTuPx2NjOBzadED1TqdzendRqVSOEoNer0dYJ0gmk696DQYDQ35aAh+dipjP509P2Cnm359Lpc1SqfTRgWdhYrHYMRqNWpFIxPgpVqPR0K0gzP52u1226aMTAp9EHBKHcDhsB4NBIxAIQNVqNX1IeL1e668MiPXeDslscnSl3XqERQQ+nw+KC7FarThMekgEtmVAXhZ/KYVCITOTyYBOuBNerxeqWCxqAS4VZzuRSHyFnzp+v1/D7XYbHo8HihBVU6kUYcTjccd1JkzbzOx2u+FyufAAskosbjmoCekAAAAASUVORK5CYII=) !important;',
' }'].join("\n"));