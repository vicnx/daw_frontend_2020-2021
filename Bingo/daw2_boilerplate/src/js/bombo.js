export class Bombo{    
    constructor(rootElement,caja){
        let boles = Array.from({length:90},(_,i) => i + 1);
        let bolesExtracted = [];
        let shuffle = () => boles.sort((a,b) => Math.random()-0.5);         
        this.getExtractedNumbers= () =>  bolesExtracted;
        this.getRemainingBoles = () => boles;
        this.pickNumber = () => {
            shuffle();             
            boles[0] && bolesExtracted.push(boles[0]);          
            if (boles[0]) this.render(boles[0])  
            return (boles.length>0 && boles.splice(0,1))?bolesExtracted[bolesExtracted.length-1]:false;            
        }
        this.render = (num) => {
            document.getElementById(num).classList.add("active");
            // let ballDiv = document.createElement('div');
            // ballDiv.className = 'bingoBall';
            // ballDiv.textContent = num;
            // rootElement.appendChild(ballDiv);
        }

        let rendercaja = (boles) => {
            // let html = "CAJA";
            boles.forEach(bola => {
                let cajaballDiv = document.createElement('div');
                cajaballDiv.className = 'bingoBall';
                cajaballDiv.id = bola;

                cajaballDiv.textContent = bola;
                caja.appendChild(cajaballDiv);
            });

       }   

       //renderizamos la caja la primera vez
       rendercaja(boles);
    }   
}