import {start} from "../main.js";
'use strict'
export function stopball(stateApp=false,interval){
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            if (stateApp=="run"){
                stateApp="stop";
                clearInterval(interval);
            }else{            
                start();
            }
        }
    }
}

// export { stopball }; 
