
import './css/style.css';
import './css/msg.css';
import {docReady} from './js/core/core.js'; 
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {Card} from './js/card.js';
import { pubsub } from './js/pubsub.js';

export let app = (() => {
    //let el = document.getElementById("ball");
    let myApp;
    let bombo;
    let myCard = new Card(document.getElementById('bingoCard'));
    let myCard2 = new Card(document.getElementById('bingoCard2'));
    let stateApp="stop"
    
    // linea se suscribe a linea y cuando alguna de las dos tarjetas hace linea publica lineadone que card estará suscrito y no volvera a hacer linea
    let linea = 
        pubsub.subscribe('linea', function(data){
            console.log(data);
            pubsub.publish('linedone',{data})
            document.getElementById("msg").innerHTML = "LINEA";
        });
    // Se suscribe a bingo. Cuando todos los numeros de una card estan envia la notificacion y esto la recoge.
    let bingo =
        pubsub.subscribe('bingo',function(data){
            console.log("BINGO "+data.bingo)
            document.getElementById("msg").innerHTML = "BINGO!";
            app.stop();
        });

    let play =  () =>{    
        let num=bombo.pickNumber();
        if (num){
            //document.getElementById('balls').innerHTML = "<h1>"+bombo.getExtractedNumbers()+"</h1>";
            let ballDiv = document.createElement('div');
            ballDiv.className = 'bingoBall';
            ballDiv.textContent = num;
            document.getElementById('balls').appendChild(ballDiv);

            //publicamos los nuumeros que van saliendo
            pubsub.publish('number',{
                getnumbers: bombo.getExtractedNumbers()
            });

            //innerHTML = "<h1>"+bombo.getExtractedNumbers()+"</h1>";
            // myCard.render(bombo.getExtractedNumbers());
            // myCard2.render(bombo.getExtractedNumbers());
            // document.getElementById('bingoCard').innerHTML = myCard.render(bombo.getExtractedNumbers());
            //document.getElementById('bingoCard').innerHTML = renderBingoCard(generateBingoCard());
        }else{
            stop();
        }
        //document.getElementById('bingoCard').innerHTML = renderBingoCard(generateBingoCard);
    };
    let stop = () => {
        stateApp="stop";
        clearInterval(myApp);
    }
    let start = () => {
        bombo = new Bombo();
        stateApp = "run";

        //publicamos los nuumeros que van saliendo
        pubsub.publish('number',{
            getnumbers: bombo.getExtractedNumbers()
        });

        // myCard.render(bombo.getExtractedNumbers());//le pasamos al render los numeros.
        // myCard2.render(bombo.getExtractedNumbers());//le pasamos al render los numeros.
        // console.log(myCard)
        // document.getElementById('bingoCard').innerHTML = myCard.render(bombo.getExtractedNumbers());
        myApp = setInterval(play,100); 
    }

    return {start: start
            ,
            toggle: () => {
                (stateApp == "run")?stop():start();  
            },
            stop:stop,
            linea:linea,
            bingo:bingo,
    };
        
})();

docReady(app.start);

//if (module.hot)       // eslint-disable-line no-undef
//  module.hot.accept() // eslint-disable-line no-undef

// export {app};