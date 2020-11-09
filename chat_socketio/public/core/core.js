//debug option
const debugOption = true;

let debug = (text) =>{
    if(debugOption) console.log(text);
}

/**  Checks if DOM is already loades afterwards we call fn */
let docReady = (fn) => {
    

    if (document.readyState === "complete" || document.readyState === "interactive") {        
        fn();             
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    
export {docReady,debug};