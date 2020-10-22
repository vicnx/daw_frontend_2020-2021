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

let showModalAlert = (templateHtml,callback,type) => {
    let parser = new DOMParser();
    let modal = parser.parseFromString(templateHtml, "text/html");
    let el = modal.body.firstChild;
    document.body.appendChild(el);
    el.style.display = "block";
    let span = document.getElementsByClassName("close")[0];
    
    if(type == "line"){
        setTimeout(function(){ el.remove(); }, 2000);
    }

    span.onclick = function() {
        el.remove();
        // el.style.display = "none"; 
        if(callback != null){
            callback();
        }      
        
    }
  
    window.onclick = function(event) {
        el.remove();
        // el.style.display = "none"; 
        if(callback != null){
            callback();
        } 
    }
    
}

export {docReady,showModalAlert,debug};