import { Game } from '../js/game';
import { debug} from "../js/core/core";

export function mainMenu(){
    let mainMenu = {
        html:`<div id="startscreen_main" class="startscreen">
                <h1>BINGO!</h1>
                <div id="inicio" class="startscreen__menu--inicio">
                    <div class="startscreen__menu__games">
                        <h2>START</h2>
                        <div class="startscreen__menu__games startscreen__menu__games__list" id="games"></div>

                    </div>
                    <button class="btn" id="joingame">Join game</button>
                    <button class="btn" id="newgame">New game</button>
                </div>
            </div>`,
        functions: ()=> {
            //new game click
            document.getElementById('newgame').onclick = function() {
                new Game();//start new game
                //ocultamos menu inicio y mostramos menu de add players
                document.getElementById('startscreen_main').style.display = "none";
                document.getElementById('menu').style.display = "block";
            }
        } 
    }
    return mainMenu
}

export function addPlayersMenu(){
    let addPlayersMenu = {
        html:`<div id="startscreen_add" class="startscreen">
                <div id="menu" class="startscreen__menu--addplayers" style="display: none;">
                    <div class="startscreen__menu__players">
                        <h2>PLAYERS</h2>
                        <div class="startscreen__menu__players startscreen__menu__players__list" id="players"></div>
                    </div>
                    <button class="btn" id="addplayer">ADD PLAYER</button>
                    <button class="btn" id="startgame" disabled>Start game</button>
                </div>
            </div>`,
        //tenemos que recojer el callback START para poder iniciar el juego en la clase
        functions: (start)=> {
            let menu=document.getElementById('startscreen_add');
            let addplayer=document.getElementById('addplayer');
            let startgame=document.getElementById('startgame');
            let players=document.getElementById('players'),
                inputs = players.getElementsByTagName('input')
            let count_players=0;
            document.getElementsByClassName('players')

            //funcion para borrar inputs
            function remove(){
                // console.log(this.parentElement.nodeName);
                this.parentElement.remove();
                if (inputs.length > 0 ){
                    startgame.disabled = false;
                    // console.log(count_players);
                }else{
                    startgame.disabled = true;
                } 
            }
    
            addplayer.onclick= function(){
                // let player = new Player();
                let player = document.createElement('div');
                player.innerHTML += "<div class='player_div'><input class='input_player' type='text' value='Player "+count_players+"' placeholder='Introduce el nombre del player' class='player_input''/><button class='delete'>X</button></div>";
                count_players++;
                players.appendChild(player);
                //activamos el boton start
                if (inputs.length > 0 ){
                    startgame.disabled = false;
                    // console.log(count_players);
                }else{
                    startgame.disabled = true;
                } 
    
                //esto añade el evento click a los botones x (al presionar en uno de ellos podemos saber cual es)
                Array.from(document.getElementsByClassName("delete")).forEach(function(element) {
                    element.addEventListener('click', remove);
                  });
    
            }
    
            startgame.onclick = () =>{
                let ok=true;
                let players_name=[];
                //primero comprobamos que todos los inputs esten rellenados
                for (let index = 0; index < inputs.length; index++) {
                    if(inputs[index].value.length == 0){
                        ok=false
                    }else{
                        players_name.push(inputs[index].value);
                    }
                }
                if (ok== true){
                    menu.style.display = "none"
                    start(players_name);
                }else{
                    alert("Revisa todos los campos")
                }
    
                
            }
        }   
    }
    return addPlayersMenu;
}