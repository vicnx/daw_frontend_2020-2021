import {Bombo} from './bombo.js';
import {BingoCard} from './card.js';
import { PubSub } from './core/pubSub.js';
import {bingolineaTemplate} from './../templates/modal.js'
import {debug} from './core/core.js'; 
import {addPlayersMenu} from './../templates/menus.js'; 
import {loaderMenus,loaderAlerts} from './core/loader.js'; 


export class Game{    
    constructor(){
        debug("New game created");
        // this.id = Math.round(Math.random() * 100000);
        this.players = [];
        let bombo;
        let pubSub = new PubSub();
        let myApp;
        let stateApp="stop";

        let play = () =>{    
            let num=bombo.pickNumber();
           
            if (num){           
                pubSub.publish("New Number",bombo.getExtractedNumbers());
            }else{
                stop();
            }
        };
        let stop = () => {
            stateApp="stop";
            clearInterval(myApp);
        }

        let start = (players) => {
            bombo = new Bombo(document.getElementById('balls'),document.getElementById('caja'));
            // console.log(bombo)
            stateApp = "run";
            pubSub.subscribe("LINIA",(player) => {
                debug("Linea");
                pubSub.unsubscribe("LINIA");
                setTimeout(function(){
                    loaderAlerts(bingolineaTemplate("line",player),null,"line");
                    // alert("Linia Player "+player)
                }, 1);
                document.getElementById('info').innerHTML= "Linia Player "+player+"<br>";
            })
            
            pubSub.subscribe("BINGO",(player) => {
                debug("Bingo");
                pubSub.unsubscribe("BINGO");
                //primero paramos el juego y despues mostramos la alerta
                stop();
                //set timeout para que le de tiempo a pintar el ultimo numero
                setTimeout(function(){
                    //  alert("Bingo Player "+player); 
                    loaderAlerts(bingolineaTemplate("bingo",player),stop,"bingo");
                }, 1);
                document.getElementById('info').innerHTML+= "WINNER "+player+"<br>";
                
            });
    
            //por cada jugador pintamos una tarjeta
            players.map(function(player) {
                new BingoCard(player,pubSub);      
            });    
            myApp = setInterval(play,200); 
        }
        //menu de añadir jugadores
        let menu = () =>{
            loaderMenus(addPlayersMenu,start);
        }

        menu();
    }   
}