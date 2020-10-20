
import './css/style.css';
import './css/menu.css';
import {docReady} from './js/core/core.js'; 
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {BingoCard} from './js/card.js';
// import {Player} from './js/player.js';
import {PubSub} from './js/core/pubSub.js';

const app = (() => {
    //let el = document.getElementById("ball");
    let myApp;
    let bombo;
    let pubSub = new PubSub();
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
            new BingoCard(player,pubSub);      
        });    
        myApp = setInterval(play,200); 
    }
    let menu = () =>{
        let menu=document.getElementById('startscreen');
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
                app.start(players_name);
            }else{
                alert("Revisa todos los campos")
            }

            
        }

    }

    return {start: start
            ,
            menu:menu,
            toggle: () => {
                (stateApp == "run")?stop():start();  
            },
    };
        
})();

docReady(app.menu);

//if (module.hot)       // eslint-disable-line no-undef
//  module.hot.accept() // eslint-disable-line no-undef

export {app};