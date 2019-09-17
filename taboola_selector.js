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

    var resultContent = '<div class="ts-wrapper"><p class="title">Taboola Selector</p>';
    resultContent += '<p class="sub-title">Meta</p>';
    resultContent += '<p>title: ' + 'title' + '</p>';
    resultContent += '<p>desc: ' + 'desc' + '</p>';
    resultContent += '<p>img: ' + 'img' + '</p>';
    resultContent += '<p>url: ' + 'url' + '</p>';
    resultContent += '<p class="sub-title">Selector</p>';
    resultContent += '<p>node: ' + node + '</p>';
    resultContent += '<p>classes: ' + classList + '</p>';
    resultContent += '<p>ids: ' + id + '</p>';
    resultContent += '<p class="sub-title">Xpath</p>';
    resultContent += '<p>' + xpath + '</p>';
    resultContent += '<p class="sub-title">BlahBlahBlah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
    resultContent += '<p>blah</p>';
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

/**
 * Add click listener event
 */
document.addEventListener('mousedown', updateSidebarMenu, false);
window.addEventListener('keydown', showSidebarMenu, false);
window.addEventListener('keyup', showSidebarMenu, false);
