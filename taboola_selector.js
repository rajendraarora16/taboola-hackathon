/**
 * Initialize toggle side bar
 */
var resultBanner = document.getElementById('selector-for-chrome-result');
function init() {

    var instructHtmlDom = '<div class="ts-wrapper"><p class="title">Taboola Selector</p>';
    instructHtmlDom += '<p class="instruction_ts">Please right click on the element hightlighted to get result</p>';
    resultBanner.innerHTML = instructHtmlDom;
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
    var metaTagTitle = document.querySelector('meta[property="og:title"]') && document.querySelector('meta[property="og:title"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="og:title"]').content.replace(/["']/g, "") : document.querySelector('meta[property="twitter:title"]') && document.querySelector('meta[property="twitter:title"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="twitter:title"]').content.replace(/["']/g, "") : 'Unavailable';
    var metaTagImage = document.querySelector('meta[property="og:image"]') && document.querySelector('meta[property="og:image"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="og:image"]').content.replace(/["']/g, "") : document.querySelector('meta[property="twitter:image"]') && document.querySelector('meta[property="twitter:image"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="twitter:image"]').content.replace(/["']/g, "") : 'Unavailable';
    var metaTagUrl = document.querySelector('meta[property="og:url"]') && document.querySelector('meta[property="og:url"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="og:url"]').content.replace(/["']/g, "") : document.querySelector('meta[property="twitter:url"]') && document.querySelector('meta[property="twitter:url"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="twitter:url"]').content.replace(/["']/g, "") : 'Unavailable';
    var metaTagDescription = document.querySelector('meta[property="og:description"]') && document.querySelector('meta[property="og:description"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="og:description"]').content.replace(/["']/g, "") : document.querySelector('meta[property="twitter:description"]') && document.querySelector('meta[property="twitter:description"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="twitter:description"]').content.replace(/["']/g, "") : 'Unavailable';
    var metaTagCategory = document.querySelector('meta[property="og:category"]') && document.querySelector('meta[property="og:category"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="og:category"]').content.replace(/["']/g, "") : document.querySelector('meta[property="twitter:category"]') && document.querySelector('meta[property="twitter:category"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="twitter:category"]').content.replace(/["']/g, "") : document.querySelector('meta[property="category"]') && document.querySelector('meta[property="category"]').content.replace(/["']/g, "") ? document.querySelector('meta[property="category"]').content.replace(/["']/g, "") : 'Unavailable';

    /**
     * Facebook App ID
     */
    var fbAppId = document.querySelector('meta[property="fb:app_id"]') && document.querySelector('meta[property="fb:app_id"]').content ? document.querySelector('meta[property="fb:app_id"]').content : getFacebookIDTS(document);

    /**
     * Meta tag xpath info
     */
    var metaTagTitleXpath = 'Xpath Unavailable';
    var metaTagImageXpath = 'Xpath Unavailable';
    var metaTagUrlXpath = 'Xpath Unavailable';
    var metaTagDescriptionXpath = 'Xpath Unavailable';
    var metaTagCategoryXpath = 'Xpath Unavailable';
    if(metaTagTitle != 'Unavailable') {
        metaTagTitleXpath = "//html:meta[@property='og:title']/@content";
    }
    if(metaTagImage != 'Unavailable') {
        metaTagImageXpath = "//html:meta[@property='og:image']/@content";
    }
    if(metaTagUrl != 'Unavailable') {
        metaTagUrlXpath = "//html:meta[@property='og:url']/@content";
    }
    if(metaTagDescription != 'Unavailable') {
        metaTagDescriptionXpath = "//html:meta[@property='og:description']/@content";
    }
    if(metaTagCategory != 'Unavailable') {
        metaTagCategoryXpath = "//html:meta[@property='og:category']/@content";
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
     * Google DFP array
     */
    var googleAdDfpArray = [];
    var googleAdDfpIframeArrayLength = document.querySelectorAll("[id^='google_ads_iframe_']").length > 0 ? document.querySelectorAll("[id^='google_ads_iframe_']").length : 'Unavailable';
    var googleAdDfpGptArrayLength = document.querySelectorAll("[id^='div-gpt-ad-']").length > 0 ? document.querySelectorAll("[id^='div-gpt-ad-']").length : 'Unavailable';

    //google_ads_iframe_
    for(var i=0; i<googleAdDfpIframeArrayLength; i++) {
        googleAdDfpArray.push(document.querySelectorAll("[id^='google_ads_iframe_']")[i]);
    }
    //div-gpt-ad-
    for(var i=0; i<googleAdDfpGptArrayLength; i++) {
        googleAdDfpArray.push(document.querySelectorAll("[id^='div-gpt-ad-']")[i]);
    }

    console.log('gogogle: ', googleAdDfpArray);

    /**
     * Selector info
     */
    var id = event.target.id.toString() || '';
    var classList = event.target.classList.toString() || '';
    var node = event.target.nodeName.toLowerCase() || '';
    var xpath= getPathTo(target).toLowerCase() || '';
    var isClassUnique = classList != '' ? isClassUnique(classList) === true ? '(Unique)' : '(Not Unique)' : 'Unavailable';
    var isIdUnique = id != '' ? isIdUnique(id) === true ? '(Unique)' : '(Not Unique)' : 'Unavailable';

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

    var resultContent = '<div class="ts-wrapper"><p class="title">Taboola Selector</p>';
    resultContent += '<p class="sub-title">Meta</p>';
    resultContent += '<div class="contents-wrapper"><p class="meta"><span><strong class="strong inner-text">Title:</strong> <input id="meta-title" type="text" value="' + metaTagTitle + '"></input></span><button class=\'ts-button-title\' onclick=\'tscopyselector("'+escape(metaTagTitleXpath)+'", "ts-button-title")\'>Copy xpath</button>' + '</p>';
   resultContent += '<p class="meta"><span><strong class="strong inner-text">Desc:</strong> <input id="meta-desc" type="text" value="' + metaTagDescription + '"></input></span><button class=\'ts-button-desc\' onclick=\'tscopyselector("'+escape(metaTagDescriptionXpath)+'", "ts-button-desc")\'>Copy xpath</button>' + '</p>';
   resultContent += '<p class="meta"><span><strong class="strong inner-text">Img:</strong> <input id="meta-img" type="text" value="' + metaTagImage + '"></input></span><button class=\'ts-button-img\' onclick=\'tscopyselector("'+escape(metaTagImageXpath)+'", "ts-button-img")\'>Copy xpath</button>' + '</p>';
   resultContent += '<p class="meta"><span><strong class="strong inner-text">Url:</strong><input id="meta-url" type="text" value="' + metaTagUrl + '"></input></span><button class=\'ts-button-url\' onclick=\'tscopyselector("'+escape(metaTagUrlXpath)+'", "ts-button-url")\'>Copy xpath</button>' + '</p>';
   resultContent += '<p class="meta"><span><strong class="strong inner-text">Category:</strong><input id="meta-url" type="text" value="' + metaTagCategory + '"></input></span><button class=\'ts-button-category\' onclick=\'tscopyselector("'+escape(metaTagCategoryXpath)+'", "ts-button-category")\'>Copy xpath</button>' + '</p></div>';
    resultContent += '<p class="sub-title">Selector</p>';
    resultContent += '<div class="contents-wrapper"><p><strong class="strong inner-text">Node:</strong> ' + node + '</p>';
    resultContent += '<p><strong class="strong inner-text">Classes:</strong> ' + classList + ' ' + isClassUnique + '</p> ';
    resultContent += '<p><strong class="strong inner-text">Ids:</strong> ' + id + ' ' + isIdUnique + '</p></div>';
    resultContent += '<p class="sub-title">Xpath</p>';
    resultContent += '<div class="contents-wrapper"><p>' + xpath + '</p><button class=\'ts-button-xpath\' onclick=\'tscopyselector("'+escape(xpath)+'", "ts-button-xpath")\'>Copy Selector</button></div>';
    resultContent += '<p class="sub-title">Facebook App ID</p>';
    resultContent += '<div class="contents-wrapper"><p>' + fbAppId + '</p> <button class=\'ts-button-facebook\' onclick=\'tscopyselector("'+fbAppId+'", "ts-button-facebook")\'>Copy App Id</button></div>';
    resultContent += '<p class="sub-title">Google DFP</p>';
    
    /**
     * Google ad rendering
     */
    if(googleAdDfpArray.length >= 1) {
        for(var i=0; i<googleAdDfpArray.length; i++) {
            resultContent += '<p class="meta"><span><strong class="strong inner-text">Ad '+(i+1)+':</strong><input id="meta-url" type="text" value="' + googleAdDfpArray[i].id + '"></input></span><button class=\'ts-button-category\' onclick=\'jumpToGoogleAdscroll("'+googleAdDfpArray[i].id+'")\'>Jump to Ad</button>' + '</p>';
        }
    }else {
        resultContent += '<p class="meta">Google ad unavailable</p>';
    }
    
    resultContent += '</div>';
    resultContent += '</div>';
    resultContent += '<div class="pinBarTs"><span onclick="showHideTSContainer();" class="collapsing show-container-ts">Hide</span></div>';

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

init();

// /**
//  * Add click listener event
//  */
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    updateSidebarMenu(event);

    /**
     * Apply style to show container
     */
    var resultBannerContainer = document.getElementById('selector-for-chrome-result');
    resultBanner.style.left = '0px';
 }, true);

function showHideTSContainer() {
    var resultBannerContainer = document.getElementById('selector-for-chrome-result');
    if(resultBannerContainer.style.left == '-325px') {
        resultBannerContainer.style.left = '0px';
        document.querySelectorAll('#selector-for-chrome-result .show-container-ts')[0].innerText = 'Hide';
    } else {
        resultBannerContainer.style.left = '-325px';
        document.querySelectorAll('#selector-for-chrome-result .show-container-ts')[0].innerText = 'Show';
    }
}

function tscopyselector(val, btnElm){

    var dummyInput = document.createElement("input");
    document.body.appendChild(dummyInput);
    dummyInput.setAttribute("type", "text");
    dummyInput.setAttribute("id", "dummy_id");
    dummyInput.setAttribute("value", unescape(val));
    dummyInput.focus();
    dummyInput.select();
    document.execCommand("copy");
    document.body.removeChild(dummyInput);

    document.getElementsByClassName(btnElm)[0].innerText="Copied!";
}

/**
 * Google add jump to scroll position function
 */
function jumpToGoogleAdscroll(elm) {
    document.getElementById(elm).scrollIntoView();
    document.getElementById(elm).style.border="5px solid red";
}

/**
 * FB app id function
 */
function getFacebookIDTS(document_root) {
    var html = '',
        node = document_root.head.firstChild,
        ids = Object(),
        vals = [],
        m = null,
        txts = null,
        i = '',
        v = 0,
        ti = 0,
        mi = 0;
    while (node) {
        // if it's in the head, this is the best place to get it.
        if (node.nodeType == Node.ELEMENT_NODE) {
            m = node.outerHTML.match(/content="fb:\/\/page\/\?id=(\d+)"/);
            if (m) {
                if (m[1] in ids) {
                    ids[m[1]] = ids[m[1]] + 100;
                } else {
                    ids[m[1]] = 100;
                }
            }
        }
        node = node.nextSibling;
    }
    if (ids.length == 0 || ids.length === undefined) {
        // Oh: we didn't find what we're looking for in the head. Look in the body.
        node = document_root.body.firstChild;
        while (node) {
            txts = [node.textContent, node.nodeValue, node.outerHTML, node.toString()];
            for (ti = 0; ti < txts.length; ti++) {
                if (txts[ti]) {
                    m = txts[ti].match(/(\d{12,})/g);
                    if (m) {
                        for (mi = 0; mi < m.length; mi++) {
                            if (m[mi] in ids) {
                                ids[m[mi]] = ids[m[mi]] + 1;
                            } else {
                                ids[m[mi]] = 1;
                            }
                        }
                        break;
                    }
                }
            }
            node = node.nextSibling;
        }
    }
    if (Object.keys(ids)
        .length > 0) {
        for (v in ids) { //noinspection JSUnfilteredForInLoop
            vals.push([v, ids[v]]);
        }
        // sort by 1th element, reversed then return first
        vals = vals.sort(function(a, b) {
            return b[1] - a[1]
        });
        return vals[0][0];
    } else {
        return "FB App ID Unavailable";
    }
}

window.addEventListener('keydown', showSidebarMenu, false);
window.addEventListener('keyup', showSidebarMenu, false);
