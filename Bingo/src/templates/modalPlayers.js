export const modalPlayers =()=>{
    const controllers = () => {
        let addButton=document.getElementById('addplayer');
        if (addButton) {
            let uList=document.getElementById("listPlayers");
            let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
            playersNames.forEach((name,index) => {
                let li=document.createElement('li');
                li.innerHTML = `<span class='players'>${index+1}</span><p>${name}</p>`;
                li.addEventListener('click',(event) => {
                    playersNames=playersNames.filter((item) => item!=name)
                    console.log(playersNames);
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                    li.remove();

                })
                uList.appendChild(li);
            });
            // let remove = ()=>{
            //     console.log(this.parentElement.nodeName)
            //     playersNames=playersNames.filter((item) => item!=this.innerHTML)
            //     // console.log(playersNames);
            //     localStorage.setItem('playersNames',JSON.stringify(playersNames));
            //     this.remove();
            // }
            addButton.addEventListener("click",(event)=>{            
                //Antes de añadir un usuario comprobamos si el input tiene almenos un caracter.
                var regex_player=/\S/;
                if(regex_player.test(document.getElementById("fname").value)){
                    let li=document.createElement('li');
                    li.id = document.getElementById("fname").value
                    li.innerHTML = `<span class='players'>${uList.children.length+1}</span><p>${document.getElementById("fname").value}</p>`;
                    uList.appendChild(li);
                    if (window.localStorage){
                        playersNames.push(document.getElementById("fname").value);
                        localStorage.setItem('playersNames',JSON.stringify(playersNames));
                    }
                    //continuar funcion remove (intentar recoger el valor de P)
                    //funcion remove reparada añadiendo ID al li.
                    let remove = function() {
                        playersNames=playersNames.filter((item) => item!=this.id)
                        localStorage.setItem('playersNames',JSON.stringify(playersNames));
                        this.remove();
                    }
                    li.addEventListener('click',remove);
                    // li.addEventListener('click',(event) => {
                    //     // console.log(this);
                    //     playersNames=playersNames.filter((item) => item!=li.innerHTML)
                    //     // console.log(playersNames);
                    //     localStorage.setItem('playersNames',JSON.stringify(playersNames));
                    //     li.remove();
                    // })
                }else{
                    alert("No puedes insertar un usuario sin nombre");
                }            

            })

        }

        let unmuteBtn=document.getElementById('unmuteBtn');
        unmuteBtn.addEventListener('click', function() {
            console.log("galdll");
            let video=document.getElementById('videoBackground');
            video.muted = false;
        });

    }
    
    return{template:    
    `
    <div id="playersForm" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <h1>Bingo players</h1>
                <p></p>
                <div class='players'>
                <ol id="listPlayers"></ol>
                </div>
                <form id="modalPardal">
                   
                    <input type="text" id="fname" name="fname" placeholder="Player name">                                
                </form>
                <button id='addplayer' class="button">Add Player</button>
                <button id="unmuteBtn" class="button">Unmute</button>

            
            </div>  
        </div>

    `,controllers:controllers}
}