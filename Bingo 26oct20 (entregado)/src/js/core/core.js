let docReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {        
        fn();        
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

const db = true;

let debug = (text) =>{
    if(db) console.log(text);
}

export {docReady,debug};