import {debug} from './core/core.js'; 
import { loaderCards } from './core/loader.js';
import {renderCard} from '../templates/cardTemplate.js'; 


export class BingoCard{   
    
     constructor(player_,pubSub=undefined){
          let board=document.getElementById('bingoboard');
          let player = player_;
          let templateRow = [0,1,2,3,4,5,6,7,8];
          let cardMatrix = [[...templateRow],[...templateRow],[...templateRow]];
          //Transpose matrix to fullfill all cells with random numbers
          let transposedcardMatrix=transpose(cardMatrix);
          transposedcardMatrix.forEach((colCard,index) =>{   
               transposedcardMatrix[index] = getRandomArbitrary(index*10,(index*10)+10,3);
          });     
          //Again transpose to get original shape
          
          cardMatrix = transpose(transposedcardMatrix);                            
                        
          let row1Blanks=getBlanks(templateRow);//Get four empty cells
          let row2Blanks=getBlanks(templateRow);//Get four empty cells
          //Pass two arrays eliminate numbers duplicates on both and from resulting array pick only an array of 4 elements
          let duplicatesNonSelectable=row1Blanks.filter(function(i){ return row2Blanks.indexOf(i) >= 0; });  
          let templateRow1 = [...templateRow];
          duplicatesNonSelectable.forEach((elem)=> templateRow1[elem]=null);
          let row3Blanks=getBlanks(templateRow1.filter((elem)=> elem!=null));
          
          row1Blanks.forEach((elem)=>cardMatrix[0][elem]=null);//Put a null in every empty picked cell row1
          row2Blanks.forEach((elem)=>cardMatrix[1][elem]=null);//Put a null in every empty picked cell row2
          row3Blanks.forEach((elem)=>cardMatrix[2][elem]=null);  
           
          //NO SE UTILIZA
          // let render = (extractedBalls=[]) => {
               
          //      // debug(extractedBalls)
          //      //esta funcion esta modificada para que modifique cada tarjeta de cada jugador
          //      let cardPlayer=document.getElementById(player);
          //      let out="";
          //      cardMatrix.forEach((row)=>{
          //           out+="<tr>"
          //           row.forEach((cellValue)=>{
          //           if (cellValue==null){
          //                out+="<th class='nulo'></th>";
          //           }else{
          //                if (extractedBalls && extractedBalls.indexOf(cellValue) >= 0){
          //                     out+="<th class='extracted'>"+cellValue+"</th>";                                  
          //                }else{
          //                     out+="<th>"+cellValue+"</th>";
          //                }
          //           }
          //           });
          //           out+="</tr>";
          //      })
          //      // debug(board);
          //      cardPlayer.innerHTML = out;
          //      checkBingo(cardMatrix,extractedBalls,pubSub,player);   
          // }  

          let paint_number_ball = (data) =>{
               if(document.getElementById("number_card_"+data.num)){
                    let render_num=document.getElementById("number_card_"+data.num);
                    render_num.classList.add("active");
                    checkBingo(cardMatrix,data.extractedBalls,pubSub,player);   
               }
          }
          
          let draw_bingo_cards = (extractedBalls=[]) =>{
               loaderCards(renderCard,player,cardMatrix,extractedBalls);
               // let out="<div id='div_"+player+"'><h1>"+player+"</h1>";
               // out+="<table id='"+player+"' class='bingoCard'>"         
               // cardMatrix.forEach((row)=>{
               //      out+="<tr>"
               //      row.forEach((cellValue)=>{
               //      if (cellValue==null){
               //           out+="<th class='nulo'></th>";
               //      }else{
               //           out+="<th>"+cellValue+"</th>";
               //      }
               //      });
               //      out+="</tr>";
               // })
               // out+="</table></div>";
               // board.innerHTML += out;
          }
          //primero pintamos las tarjetas d elos jugadores
          draw_bingo_cards();
          if (pubSub) pubSub.subscribe("New Number",paint_number_ball);
          // if (pubSub) pubSub.subscribe("Last Number",render);
          // if (pubSub) pubSub.subscribe("New Number",render);
          
          
     }     
}
function checkBingo(cardMatrix,extractedBalls,pubSub,player){
     let bingo=true;
     debug("checkbingo");
     cardMatrix.forEach((row)=>{
          let linia = row.filter((val)=> {if (extractedBalls.indexOf(val)<=0) return val }).length;   
          // debug(row.filter((val)=> {if (extractedBalls.indexOf(val)<=0) return val }).length);      
          if (linia>0) bingo=false; 
          else pubSub.publish("LINIA",player);       
     })     

     if (bingo) pubSub.publish("BINGO",player)
}
/**
 * Returns count random numbers between min (inclusive) and max (exclusive)
*/
function getRandomArbitrary(min, max,count) {
     if (min==0) min=1; //Exception first column from 1 to 9
     if (max==90) max=91; //Exception last column from 80 to 90
     let arr3=[]
     do{
          let randN=Math.floor(Math.random() * (max - min) + min);
          if (!arr3.includes(randN)) arr3.push(randN);
     }while(arr3.length!=count)              
     return arr3.sort();               
}

//Pass an array and we ramdomly pick only an array of 4 elements supposed to be blanks
function getBlanks([...ai]){     
     let iterator=Array.apply(null, Array(ai.length-4));     
     iterator.forEach((el)=>{
          ai.splice(Math.floor(Math.random()*ai.length),1);          
     });
     return ai;             
     //return ai.map((elem) => Math.floor(elem/10))        
}
//Transpose a matrix
function transpose(matrix){
          
     return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));     
     
}




//export {generateBingoCard,renderBingoCard};