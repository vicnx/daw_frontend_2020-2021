export class Player{    
    constructor(name){
        var _name = name
        this.setName = function(name) { _name = name; }
        this.getName = function() { return _name; }



        function render(){
            let players=document.getElementById('players');
            let p = document.createElement('div');
            p.innerHTML += "<div class='player_div'><input class='input_player' type='text' value='Player' placeholder='Introduce el nombre del player' class='player_input''/><button class='delete'>X</button></div>";
            // count_players++;
            players.appendChild(p);
        }
        render();
    }   
}