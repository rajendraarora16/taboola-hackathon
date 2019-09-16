/**
 * Updates the info banner at the bottom of the page
 **/ 
function updateBanner(event) {

  if (event===undefined) event= window.event;                     // IE hack
  var target= 'target' in event? event.target : event.srcElement; // another IE hack

  var id = event.target.id.toString() || '';
  var classList = event.target.classList.toString() || '';
  var node = event.target.nodeName.toLowerCase() || '';
  var xpath= getPathTo(target) || '';

  console.log('Node: ', node);
  console.log('\nClasses: ', classList);
  console.log('\nId: ', id);
  console.log('\nxpath: ', xpath);

  //Idea behind to use ID selector whether it is unique or not!
  // document.querySelectorAll('#js-repo-pjax-container').length;

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
}

/**
 * Add click listener event
 */
document.addEventListener('click', updateBanner, false);
