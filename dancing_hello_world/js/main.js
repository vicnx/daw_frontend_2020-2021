// let myApp
'use strict'

import { docReady } from './core/core.js';
import { stopball } from './controlers/stopball.js';
import "../style/style.css";

let inicia = function(el,incX,incY) {
    let dw=function danceWorld(){
    
        let x =  el.style.left?parseInt(el.style.left,10):350;
        let y =  el.style.top?parseInt(el.style.top,10):400;

        el.style.left =  x + incX +"px";
        el.style.top = y + incY+"px";
    
        //Detect if we reach X coordinates limits
        if (((x+incX) > (window.innerWidth-40)) || ((x+incX)<=0))
            incX = (-1)*incX;
       
        //Detect if we reach Y coordinates limits
        if (((y+incY) > (window.innerHeight-40)) || ((y+incY) <= 0))
            incY = (-1)*incY;
    }
    return dw;    
};



export function start(){
    let speed = 15; //1 to 100
    let incX = speed * (Math.round(Math.random())?1:-1);
    let incY = speed * (Math.round(Math.random())?1:-1);
    let myApp=setInterval(inicia(document.getElementById("ball"),incX,incY),50);
    stopball("run",myApp);
}
docReady(start);
