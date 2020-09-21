import {start} from "/home/xente/Documentos/Cliente/daw_frontend_2020-2021/dancing_hello_world/js/main.js";
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
