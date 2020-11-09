import {docReady,debug} from './core/core.js'; 

function main(){
    let nickname = prompt("El teu nickname", "Harry Potter");
    let DEBUG = true;
    function WebSocketChat() {              
    
    
       if ("WebSocket" in window) {
          if (DEBUG) console.log("WebSocket is supported by your Browser!");
          const socket = io();
    
          let sendBtn = document.getElementById('send');
          sendBtn.onclick = function(){
        //    let inputMessage = document.getElementById('message');
           //socket.emit('newMessage',`${nickname}: ${inputMessage.value}`)
           socket.emit('join',nickname);
    
          }                           
          
          socket.on('connect', () => {
             socket.emit('hello',`${nickname} connected to the chat`);
             debug(socket.id)
          });
    
          socket.on('joined', function(msg){                  
             let messagesDiv=document.getElementById("chatMessages");
             //let messageEl = document.createElement('span');
             
             messagesDiv.innerHTML = "<li>"+msg+"</li>"+ messagesDiv.innerHTML;
             //messagesDiv.insertBefore(messageEl,messagesDiv.firstChild);
             if (DEBUG) console.log("Message is received...");
          });
          socket.on('player_info', function(user){  
            document.getElementById("chatMessages").innerHTML = "<li style='background-color:green'>"+JSON.stringify(user)+"</li>"+ document.getElementById("chatMessages").innerHTML;
            //   console.log(user);                
            debug(user);
        });
         
       } else {
         
          // The browser doesn't support WebSocket
          alert("WebSocket NOT supported by your Browser!");
       }
    }
    WebSocketChat();
}
docReady(() => main());



