import { app } from "../index.js";
function generateBingoCard(){
     let templateRow = [0,1,2,3,4,5,6,7,8];
     let cardMatrix = [[...templateRow],[...templateRow],[...templateRow]];
     //Transpose matrix to fullfill all cells with random numbers

     let transposedCardMatrix=transpose(cardMatrix);
     console.log(transposedCardMatrix);
     transposedCardMatrix.forEach((colCard,index) =>{   
          transposedCardMatrix[index] = getRandomArbitrary(index*10,(index*10)+10,3);
     });     
     console.log(transposedCardMatrix)
     //Again transpose to get original shape
     cardMatrix= transpose(transposedCardMatrix);
     console.log(cardMatrix);
   
     
     //Pass an array and we ramdomly pick only an array of 4 elements supposed to be blanks
     function getBlanks([...ai]){     
          let iterator=Array.apply(null, Array(ai.length-4));     
          iterator.forEach((el)=>{
               ai.splice(Math.floor(Math.random()*ai.length),1);          
          });             
          return ai.map((elem) => Math.floor(elem/10))        
     }
     /**
     * Returns count random numbers between min (inclusive) and max (exclusive)
     */
     function getRandomArbitrary(min, max, count) {
          if(min==0) min=1
          if(max==90) max=91
          let arr3=[]
          do{
               let randN=Math.floor(Math.random() * (max - min) + min);
               if (!arr3.includes(randN)) arr3.push(randN);
          }while(arr3.length!=count)     
          return arr3.sort();               
     }
     

     let row1Blanks=getBlanks(cardMatrix[0]);//Get four empty cells
     let row2Blanks=getBlanks(cardMatrix[1]);//Get four empty cells
     //Pass two arrays eliminate numbers duplicates on both and from resulting array pick only an array of 4 elements
     let duplicatesNonSelectable=row1Blanks.filter(function(i){ return row2Blanks.indexOf(i) >= 0; });  
     let templateRow1 = [...cardMatrix[2]];
     duplicatesNonSelectable.forEach((elem)=> templateRow1[elem]=null);
     let row3Blanks=getBlanks(templateRow1.filter((elem)=> elem!=null));
     
     row1Blanks.forEach((elem)=>cardMatrix[0][elem]=null);//Put a null in every empty picked cell row1
     row2Blanks.forEach((elem)=>cardMatrix[1][elem]=null);//Put a null in every empty picked cell row2
     row3Blanks.forEach((elem)=>cardMatrix[2][elem]=null);
     return cardMatrix;
}

function checklineandbingo(extractedBalls,cardMatrix){
     //funcion que comprueba si todo el array de una fila ya esta en las extractedBalls
     var bingo=0;//variable que cuenta las lineas que tienes
     let checker = (arr, target) => target.every(v => arr.includes(v));//es una funcion que comprueba que toda la linea esta en las bolas extraidasd

     cardMatrix.forEach(function(card,index){
          var lines=[];//esta variable tendra las lineas cantadas para que no se repita
          var filtered = card.filter(function (el) {
               return el != null;
          });
          // console.log(checker(extractedBalls,filtered));
          if(checker(extractedBalls,filtered)){
               if(!lines.includes(index)){
                    bingo++;
                    console.log(bingo)
                    console.log("LINEA! "+parseInt(index+1))
                    document.getElementById("msg").innerHTML = "LINEA: "+parseInt(index+1);
                    lines.push(index);
               }

               if(bingo>=3){
                    document.getElementById("msg").innerHTML = "BINGO!";
                    app.stop();
               }
          }
     })
}

function renderBingoCard(cardMatrix,extractedBalls){
 let out="<table class='bingoCard'>"

 cardMatrix.forEach((row)=>{
     //  app.stop;
      out+="<tr>"
      row.forEach((cellValue)=>{
          if (cellValue==null){
               out+="<th class='nulo'>TEST</th>";
          }else{
               // console.log(cellValue)
               
               if (extractedBalls && extractedBalls.indexOf(cellValue) >= 0){
                    checklineandbingo(extractedBalls,cardMatrix);
                    // console.log(extractedBalls.indexOf(cellValue))
                    out+="<th class='extracted'>"+cellValue+"</th>";     
               }else{
                    out+="<th>"+cellValue+"</th>";
               }
          }
      });
      out+="</tr>";
 })
 out+="</table>";
 return out;
}

//Transpose a matrix
function transpose(matrix){
     return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

export {generateBingoCard,renderBingoCard};