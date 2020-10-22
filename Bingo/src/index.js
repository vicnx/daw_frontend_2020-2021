
import './css/style.css';
import './css/menu.css';
import './css/modal.css';
import {docReady,showModal,debug} from './js/core/core.js'; 
import './js/card.js';
import { Game } from './js/game';

const app = (() => {
    //inicio
    let inicio = () =>{
        debug("start")
        document.getElementById('newgame').onclick = function() {
            new Game();//start new game
            //ocultamos menu inicio y mostramos menu de add players
            document.getElementById('inicio').style.display = "none";
            document.getElementById('menu').style.display = "block";
        }
    }

    return {inicio:inicio};
        
})();

docReady(app.inicio);

export {app};