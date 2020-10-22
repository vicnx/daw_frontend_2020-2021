import {debug} from "./core";

export let loaderMenus = (template,params) => {
    document.getElementById('caja').innerHTML = "";
    document.getElementById('bingoboard').innerHTML = "";
    document.getElementById('info').innerHTML = "";
    // debug(template);
    let parser = new DOMParser();
    let menu = parser.parseFromString(template().html, "text/html");
    let el = menu.body.firstChild;
    document.body.appendChild(el);
    //params es por si queremos mandar algun callback a las funciones internaas de la plantilla
    template().functions(params); //cargamos las funciones de los botones de la plantilla de ese menu
    
}

export let loaderAlerts = (templateHtml,callback,type) => {
    let parser = new DOMParser();
    let modal = parser.parseFromString(templateHtml, "text/html");
    let el = modal.body.firstChild;
    document.body.appendChild(el);
    el.style.display = "block";
    let span = document.getElementsByClassName("close")[0];
    
    if(type == "line"){
        setTimeout(function(){ el.remove(); }, 2000);
    }

    if(type=="bingo"){
        document.getElementById("info").innerHTML += '<button style="display: none"class="btn" id="bingo_btn">Main Menu</button>'
        document.getElementById("bingo_btn").style.display = "block"
        document.getElementById("bingo_btn").onclick = function(){
            if(callback != null){
                callback();
            }     
        };
    }
    

    span.onclick = function() {
        el.remove();
        // el.style.display = "none"; 
        if(callback != null){
            debug("span onclcik")
            // callback();
        }      
        
    }
    // window.onclick = function(event) {
    //     el.remove();
        
    //     // el.style.display = "none"; 
    //     if(callback != null){
    //         debug("span onclcik")
    //         callback();
    //     } 
    // }
    
}

//para cargar las cards
export let loaderCards = (template,player,cardMatrix,extractedBalls) => {
    // debug(template(player,cardMatrix,extractedBalls).html);
    let parser = new DOMParser();
    let menu = parser.parseFromString(template(player,cardMatrix,extractedBalls).html, "text/html");
    let el = menu.body.firstChild;
    document.getElementById('bingoboard').appendChild(el);
    //params es por si queremos mandar algun callback a las funciones internaas de la plantilla
    // template().functions(params); //cargamos las funciones de los botones de la plantilla de ese menu
    
}