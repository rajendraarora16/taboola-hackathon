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
