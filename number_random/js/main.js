function start(){
    let bingo = {
        numbers:Array.from({length: 99}, (_, i) => i + 1),
        numbers_deleted:[],

        shuffle : function(){
            d=shuffle(this.numbers);
            return d
        },

        getNumber : function(){
            random_array=this.shuffle();
            selected_number = random_array[Math.floor(Math.random() * this.numbers.length)];
            delete_used_number_array(selected_number);
            this.numbers_deleted.push(selected_number);
            return selected_number;
        }
    }

    //esta funcion mezcla el array
    function shuffle(array) {
        var random_pos, x, i;
        for (i = array.length - 1; i > 0; i--) {
            random_pos = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[random_pos];
            array[random_pos] = x;
        }
        return array;
    }
    //function que elimina ese numero del array
    function delete_used_number_array (number) {
        var i = bingo.numbers.indexOf( number );
        bingo.numbers.splice( i, 1 );
    }

    document.getElementById("btn_get").onclick = function(){
        if(bingo.numbers.length<=0){
            document.getElementById("print_number").innerHTML = "NO MORE NUMBERS";
            document.getElementById("btn_get").innerhtml = "RESET";
        }else{
            document.getElementById("btn_get").innerhtml = "Give me another number!";
            document.getElementById("print_number").innerHTML = bingo.getNumber();
            document.getElementById("numbers_deleted").innerHTML = bingo.numbers_deleted;

        }
        console.log(bingo.numbers);
        console.log(bingo.numbers_deleted);
    }
}
docReady(start);
