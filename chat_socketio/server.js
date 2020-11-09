const express = require('express');
let app = express();
const http = require('http').createServer(app);
let io = require('socket.io')(http);
const { exec } = require('child_process');
let  gameControler = require('./gameController.js');
let  cardControler = require('./cardController.js');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connect', (socket) => {
    socket.on('hello', data => {
        console.log('hola', data);
    });
    socket.on('join', data => {


      //creamos el jugador (normal y global)
      let player = cardControler.getPlayerdata(data);
      //enviar informacion solo a ese cliente.
      io.to(socket.id).emit('player_info', player.user);
      /*
      {
        user:{username:x,cardmatrix:x,checksum:x},
        user_global:{username:x,cardmatrix:x}
      }
      */
      let game=gameControler.getCurrentGame(player.user_global);
      /*
      {id:xxxx,listPlayers:[],countDown:zzz,}
      */
      socket.join(game.id);
      //socket.to(game.id).emit(JSON.stringify(game))
      io.sockets.in(game.id).emit('joined',JSON.stringify(game));
      // console.log(JSON.stringify(game)); 
      
      

      // console.log('hola', data);
    });

    socket.on('newMessage', data => {
        io.emit('chat message',data);
        console.log('new', data);
        exec(`echo ${data} | festival --tts --language spanish`, (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              return;
            }
          
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });
    });
    
});

http.listen(666, () => {
  console.log('listening on *:666');
});

