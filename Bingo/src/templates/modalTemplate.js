
// export const bingolinea=`
// <div id="alert" class="modal">
//         <!-- Modal content -->
//         <div class="modal-content">
//             <span class="close">&times;</span>
//             <h1 id="info_alert">INFO</h1>
//             <p id="textplayer"></p>
//         </div>  
//     </div>
// `

export function bingolineaTemplate(type,player){
    return `<div id="alert_${type}" class="modal">
    <!-- Modal content -->
    <div class="modal__content">
        <span class="close">&times;</span>
        <div class="modal__content__inside">
            <h1 class="modal__content__inside__tipo">${type}</h1>
            <p class="modal__content__inside__player">${player}</p>
            <button style="display: none"class="btn" id="bingo_btn">Main Menu</button>
        </div> 
    </div>  
</div>
`
}
