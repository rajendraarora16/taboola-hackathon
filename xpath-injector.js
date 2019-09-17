(function(window, document){

  'use strict';

  // inject the selector CSS and JS
  function toggleAssets(tab) {
    var injector = '';

    // logic test if the injected assets exists
    injector += 'if (document.getElementById("selectorCSS") && document.getElementById("selectorJS") ) {';

    //if they exist, remove them
    injector += 'document.getElementsByTagName("head")[0].removeChild(document.getElementById("selectorCSS"));';
    injector += 'document.getElementsByTagName("head")[0].removeChild(document.getElementById("selectorJS"));';
    injector += 'document.getElementsByTagName("head")[0].removeChild(document.getElementById("mouseJS"));';
    injector += 'mouseEnableJS = document.createElement("script");';
    injector += 'mouseEnableJS.type = "text/javascript";';
    injector += 'mouseEnableJS.src = chrome.extension.getURL("/enable_mouse_event.js");';
    injector += 'mouseEnableJS.id = "mouseEnableJS";';
    injector += 'document.getElementsByTagName("body")[0].appendChild(mouseEnableJS);';
    injector += 'document.getElementsByTagName("body")[0].removeChild(document.getElementById("selector-for-chrome-result"));';

    //if they don't exist, inject them
    injector += '} else {';

    injector += 'selectorCSS = document.createElement("link");';
    injector += 'selectorCSS.rel = "stylesheet";';
    injector += 'selectorCSS.type = "text/css";';
    injector += 'selectorCSS.href = chrome.extension.getURL("/selector.min.css");';
    injector += 'selectorCSS.id = "selectorCSS";';
    injector += 'document.getElementsByTagName("head")[0].appendChild(selectorCSS);';
    injector += 'selectorJS = document.createElement("script");';
    injector += 'selectorJS.type = "text/javascript";';
    injector += 'selectorJS.src = chrome.extension.getURL("/taboola_selector.js");';
    injector += 'selectorJS.id = "selectorJS";';
    injector += 'document.getElementsByTagName("head")[0].appendChild(selectorJS);';
    injector += 'mouseJS = document.createElement("script");';
    injector += 'mouseJS.type = "text/javascript";';
    injector += 'mouseJS.src = chrome.extension.getURL("/mouse_event.js");';
    injector += 'mouseJS.id = "mouseJS";';
    injector += 'document.getElementsByTagName("head")[0].appendChild(mouseJS);';
    injector += 'selectorResult = document.createElement("div"),';
    injector += 'selectorResult.id = "selector-for-chrome-result",';
    injector += 'document.getElementsByTagName("body")[0].appendChild(selectorResult)';

    //close logic test
    injector += '}';

    chrome.tabs.executeScript({code: injector});
  }

  chrome.browserAction.onClicked.addListener(function(tab){
    toggleAssets(tab);
  });

}(window, document));
