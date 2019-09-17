/**
 * Disable mouse click
 */
// document.oncontextmenu=RightMouseDown;
// function RightMouseDown() { return false;}

/**
 * Add click listener event
 */
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    console.log('enalbles')
    updateSidebarMenu(event);
 }, true); 