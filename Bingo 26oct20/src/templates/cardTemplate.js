import { debug} from "../js/core/core";
export function renderCard(player,cardMatrix){
    //creamos el interior de la tarjeta
    let create= (cardMatrix) =>{
        let out = "";
        cardMatrix.forEach((row)=>{
            out+="<tr>"
            row.forEach((cellValue)=>{
            if (cellValue==null){
                 out+="<th class='nulo'></th>";
            }else{
                 out+="<th class='number_card_"+cellValue+"'>"+cellValue+"</th>";
            }
            });
            out+="</tr>";
       })
       return out;
    }

    let renderCard = {
        html:`<div id="div_${player}">
                <h1>${player}</h1>
                <table id="${player}" class="bingocard">
                    ${create(cardMatrix)}
                </table>
            </div>`
    }
    return renderCard
}
