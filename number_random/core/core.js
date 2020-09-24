'use strict'
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        console.log("carga");
        // call on next available tick
        fn();
        //setTimeout(fn, 1);
    } else {
        console.log("nose")
        document.addEventListener("DOMContentLoaded", fn);
    }
}   
// export { docReady }; 