
import './css/style.css';
import './css/menu.css';
import './css/modal.css';
import {docReady,debug} from './js/core/core.js'; 
import {loaderMenus} from './js/core/loader.js'; 
import './js/card.js';
import {mainMenu} from './templates/menusTemplate.js'; 
// import { Game } from './js/game';

const app = (() => {
    //inicio
    let inicio = () =>{
        debug("start")
        loaderMenus(mainMenu);
    }

    return {inicio:inicio};
        
})();

docReady(app.inicio);

export {app};