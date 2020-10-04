function start(){
    let bingo = {
        numbers:Array.from({length: 99}, (_, i) => i + 1),
        numbers_deleted:[],

        shuffle : function(){
            // this.numbers.sort((a,b) => Math.random() -0.5);
            d=shuffle(this.numbers);
            return d
        },

        getNumber : function(){
            if(this.numbers.length>0){
                random_array=this.shuffle();
                selected_number = random_array[Math.floor(Math.random() * this.numbers.length)];
                delete_used_number_array(selected_number);
                this.numbers_deleted.push(selected_number);
                return selected_number;
            }else{
                return false;
            }

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
            document.getElementById("restantes").innerHTML = bingo.numbers.length;
            document.getElementById("print_number").innerHTML = "NO MORE NUMBERS";
            document.getElementById("btn_get").disabled  = true;
        }else{
            document.getElementById("restantes").innerHTML = bingo.numbers.length;
            document.getElementById("btn_get").disabled  = false;
            document.getElementById("btn_get").innerhtml = "Give me another number!";
            document.getElementById("print_number").innerHTML = bingo.getNumber();
            document.getElementById("numbers_deleted").innerHTML = bingo.numbers_deleted;

        }
        console.log(bingo.numbers);
        console.log(bingo.numbers_deleted);
    }
    document.getElementById("btn_reset").onclick = function(){
        
        bingo.numbers=Array.from({length: 99}, (_, i) => i + 1);
        bingo.numbers_deleted=[];
        document.getElementById("print_number").innerHTML = "";
        document.getElementById("numbers_deleted").innerHTML = bingo.numbers_deleted;
        document.getElementById("btn_get").disabled  = false;
        document.getElementById("restantes").innerHTML = bingo.numbers.length;
        console.log(bingo.numbers);
/*         if(bingo.numbers.length<=0){
            document.getElementById("print_number").innerHTML = "NO MORE NUMBERS";
            document.getElementById("btn_get").innerhtml = "RESET";
        }else{
            document.getElementById("btn_get").innerhtml = "Give me another number!";
            document.getElementById("print_number").innerHTML = bingo.getNumber();
            document.getElementById("numbers_deleted").innerHTML = bingo.numbers_deleted;

        } */
/*         console.log(bingo.numbers); */
        console.log(bingo.numbers_deleted);
    }
    document.getElementById("restantes").innerHTML = bingo.numbers.length;
}
docReady(start);
