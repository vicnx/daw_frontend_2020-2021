
const gameController = () => {    
    let currentGame=new Map();
    const secsUntilBegin = 60;
    const maxUsers = 3;
    let countDown;


    let getCurrentGame = (player) => {
        if (currentGame.size == 0) {
            currentGame.set('id',Math.round(Math.random()*10000000));
            currentGame.set('listPlayers',[player]);
            currentGame.set('countDown',secsUntilBegin);
            
            setTimeout(() => {
               currentGame=new Map(); 
               clearInterval(countDown);
            }, secsUntilBegin * 1000);

            countDown = setInterval(()=>{
                let count = currentGame.get('countDown');
                currentGame.set('countDown',(count-1));
            },1000);
        }else{
            let listUsers = currentGame.get('listPlayers');
            listUsers.push(player);
            currentGame.set('listPlayers',listUsers);
            if (listUsers.length >= maxUsers){
               setTimeout(()=>{currentGame=new Map();
                clearInterval(countDown);
            },100);
            }
            
        }
        return {id:currentGame.get('id'),players:currentGame.get('listPlayers'),countDown:currentGame.get('countDown')}

    } 

    return {getCurrentGame: getCurrentGame}
};

module.exports = gameController();