import {Bombo} from './js/bombo.js';
import {BingoCard} from './js/card.js';

export class Game{    
    constructor(players,pubSub=undefined){
        let bombo = new Bombo(document.getElementById('balls'),document.getElementById('caja'));
        // stateApp = "run";
        pubSub.subscribe("LINIA",(player) => {
            pubSub.unsubscribe("LINIA");
            setTimeout(function(){alert("Linia Player "+player)}, 1);
            document.getElementById('info').innerHTML= "Linia Player "+player+"<br>";
        })
        
        pubSub.subscribe("BINGO",(player) => {
            pubSub.unsubscribe("BINGO");
            //primero paramos el juego y despues mostramos la alerta
            stop();
            // alert("Bingo Player "+player);
            //set timeout para que le de tiempo a pintar el ultimo numero
            setTimeout(function(){ alert("Bingo Player "+player); }, 1);
            document.getElementById('info').innerHTML+= "WINNER "+player+"<br>";
            
        });

        //por cada jugador pintamos una tarjeta
        players.map(function(player) {
            player = new BingoCard(player,pubSub);      
        });    
        myApp = setInterval(play,200); 
    }   
}