/**
 * Initialize toggle side bar
 */
var resultBanner = document.getElementById('selector-for-chrome-result');
function init() {
    resultBanner.innerHTML = '<p>Ready to kill some bugs!</p>';
}

/**
 * Updates the info banner at the bottom of the page
 **/ 
function updateSidebarMenu(event) {

    if (event===undefined) event= window.event;                     // IE hack
    var target= 'target' in event? event.target : event.srcElement; // another IE hack
    
    /**
     * Meta tag info
     */
    var metaTagTitle = document.querySelector('meta[property="og:title"]') && document.querySelector('meta[property="og:title"]').content ? document.querySelector('meta[property="og:title"]').content : document.querySelector('meta[property="twitter:title"]') && document.querySelector('meta[property="twitter:title"]').content ? document.querySelector('meta[property="twitter:title"]').content : 'Unavailable';
    var metaTagImage = document.querySelector('meta[property="og:image"]') && document.querySelector('meta[property="og:image"]').content ? document.querySelector('meta[property="og:image"]').content : document.querySelector('meta[property="twitter:image"]') && document.querySelector('meta[property="twitter:image"]').content ? document.querySelector('meta[property="twitter:image"]').content : 'Unavailable';
    var metaTagUrl = document.querySelector('meta[property="og:url"]') && document.querySelector('meta[property="og:url"]').content ? document.querySelector('meta[property="og:url"]').content : document.querySelector('meta[property="twitter:url"]') && document.querySelector('meta[property="twitter:url"]').content ? document.querySelector('meta[property="twitter:url"]').content : 'Unavailable';
    var metaTagDescription = document.querySelector('meta[property="og:description"]') && document.querySelector('meta[property="og:description"]').content ? document.querySelector('meta[property="og:description"]').content : document.querySelector('meta[property="twitter:description"]') && document.querySelector('meta[property="twitter:description"]').content ? document.querySelector('meta[property="twitter:description"]').content : 'Unavailable';
    var metaTagCategory = document.querySelector('meta[property="og:category"]') && document.querySelector('meta[property="og:category"]').content ? document.querySelector('meta[property="og:category"]').content : document.querySelector('meta[property="twitter:category"]') && document.querySelector('meta[property="twitter:category"]').content ? document.querySelector('meta[property="twitter:category"]').content : 'Unavailable';

    /**
     * Meta tag xpath info
     */
    var metaTagTitleXpath = 'Xpath Unavailable'; 
    var metaTagImageXpath = 'Xpath Unavailable';
    var metaTagUrlXpath = 'Xpath Unavailable';
    var metaTagDescriptionXpath = 'Xpath Unavailable';
    var metaTagCategoryXpath = 'Xpath Unavailable';
    if(metaTagTitle != 'Unavailable') {
        metaTagTitleXpath = '//html:meta[@property="og:title"]/@content';
    }
    if(metaTagImage != 'Unavailable') {
        metaTagImageXpath = '//html:meta[@property="og:image"]/@content';
    }
    if(metaTagUrl != 'Unavailable') {
        metaTagUrlXpath = '//html:meta[@property="og:url"]/@content';
    }
    if(metaTagDescription != 'Unavailable') {
        metaTagDescriptionXpath = '//html:meta[@property="og:description"]/@content';
    }
    if(metaTagCategory != 'Unavailable') {
        metaTagCategoryXpath = '//html:meta[@property="og:category"]/@content';
    }

    /**
     * Debugging purpose, remove it once we are done with console.
     */
    console.log('meta: ', metaTagTitleXpath)
    console.log('meta: ', metaTagImageXpath)
    console.log('meta: ', metaTagUrlXpath)
    console.log('meta: ', metaTagDescriptionXpath)
    console.log('meta: ', metaTagCategoryXpath)


    /**
     * Selector info
     */
    var id = event.target.id.toString() || '';
    var classList = event.target.classList.toString() || '';
    var node = event.target.nodeName.toLowerCase() || '';
    var xpath= getPathTo(target).toLowerCase() || '';
    var isClassUnique = isClassUnique(classList) === true ? '(Unique)' : '(Not Unique)';
    var isIdUnique = isIdUnique(id) === true ? '(Unique)' : '(Not Unique)';

  /**
   * Check class is unique or not
   */
    console.log('Node: ', node);
    console.log('\nClasses: ' + classList + '', classList != '' ? isClassUnique : ' No class name found');
    console.log('\nId: ' + id + '', id != '' ? isIdUnique : 'No id name found');
    console.log('\nxpath: ', xpath);


    /**
     * Update sidebar menu with the changes
     */
    if (!!!resultBanner)
    return false;

    var resultContent = '<div class="ts-wrapper"><p class="title"><img class="logo-img-ts" src="https://i.stack.imgur.com/mC7lr.png" alt="Taboola selector"> Taboola Selector</p>';
    resultContent += '<p class="sub-title">Meta</p>';
    resultContent += '<div class="contents-wrapper"><p class="meta"><span>title: </span><input id="meta-title" type="text" value="' + JSON.stringify(metaTagTitle) + '"></input><button class=\'ts-button\' onclick=\'tscopyselector("meta-title")\'>Cop</button>' + '</p>';
    resultContent += '<p class="meta"><span>desc: </span><input id="meta-desc" type="text" value="' + metaTagDescription + '"></input><button class=\'ts-button\' onclick=\'tscopyselector("meta-desc")\'>Cop</button>' + '</p>';
    resultContent += '<p class="meta"><span>img: </span><input id="meta-img" type="text" value="' + metaTagImage + '"></input><button class=\'ts-button\' onclick=\'tscopyselector("meta-img")\'>Cop</button>' + '</p>';
    resultContent += '<p class="meta"><span>url: </span><input id="meta-url" type="text" value="' + metaTagUrl + '"></input><button class=\'ts-button\' onclick=\'tscopyselector("meta-url")\'>Cop</button>' + '</p></div>';
    resultContent += '<p class="sub-title">Selector</p>';
    resultContent += '<div class="contents-wrapper"><p>node: ' + node + '</p>';
    resultContent += '<p>classes: ' + classList + ' ' + isClassUnique + '</p> ';
    resultContent += '<p>ids: ' + id + ' ' + isIdUnique + '</p></div>';
    resultContent += '<p class="sub-title">Xpath</p>';
    resultContent += '<div class="contents-wrapper"><p>' + xpath + '</p></div>';
    resultContent += '</div>';

    resultBanner.innerHTML = resultContent;

   

    function getPathTo(element) {
        if (element.id!=='')
            return 'id("'+element.id+'")';
        if (element===document.body)
            return element.tagName;

        var ix= 0;
        var siblings= element.parentNode.childNodes;
        for (var i= 0; i<siblings.length; i++) {
            var sibling= siblings[i];
            if (sibling===element)
                return getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
            if (sibling.nodeType===1 && sibling.tagName===element.tagName)
                ix++;
        }
    }

    /**
     * isClassUnique() - to check whether class name is unique in DOM or not
     * @param {*} className 
     */
    function isClassUnique(className) {
        if(document.getElementsByClassName(className).length === 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * isIdUnique() - to check whether id name is unique in DOM or not
     * @param {*} id 
     */
    function isIdUnique(id) {
        if(id && document.querySelectorAll("[id='"+id+"']") && document.querySelectorAll("[id='"+id+"']").length === 1) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * showSidebarMenu() - toggles the visibility of the side bar banner
 * @param {*} event 
 */
function showSidebarMenu(event) {
    resultBanner.className = '';
    if (event.ctrlKey)
      resultBanner.className = 'show';
  }

// /**
//  * Add click listener event
//  */
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    updateSidebarMenu(event);
 }, true); 
 
 function tscopyselector(elm){
    var copyText = document.getElementById(elm);
    copyText.select();
    document.execCommand("copy");
}

window.addEventListener('keydown', showSidebarMenu, false);
window.addEventListener('keyup', showSidebarMenu, false);