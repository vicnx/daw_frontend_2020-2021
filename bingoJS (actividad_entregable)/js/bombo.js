
function bingo(){
    //bombo
    let bombo = {
        boles : [],
        bolesextracted : [],
        start: function(){
            if(this.boles.length != 0){
                this.mezclar_bombo();
                this.get_number();
            }else{
                document.getElementById("restantes").innerHTML = this.boles.length;
                document.getElementById("print_number").innerHTML = "NO MORE NUMBERS";
                document.getElementById("boton_get").disabled  = true;
            }
        },
        reset: function(){
            this.crear_bombo();
            this.bolesextracted=[];
        },
        crear_bombo : function(){
            this.boles= Array.from({length:90},(_,i) => i + 1);
        },
        mezclar_bombo: function(){
            this.boles.sort((a,b) => Math.random()-0.5);
        },
        get_number: function(){
            let position = Math.floor(Math.random() * this.boles.length);
            let number = this.boles[position];
            console.log(this.boles[position])
            this.bolesextracted.push(this.boles.splice(position, 1)[0]);
            console.log(this.bolesextracted)
            document.getElementById("restantes").innerHTML = this.boles.length;
            document.getElementById("boton_get").disabled  = false;
            document.getElementById("boton_get").innerhtml = "Give me another number!";
            document.getElementById("print_number").innerHTML = number;
            document.getElementById("numbers_deleted").innerHTML = this.bolesextracted;
            
        } 
    
    }
    //card
    let card ={
        lines:[],
        start: function(){
            this.set_numbers();
            this.insert_forados();
            this.insert_html();
        },
        set_numbers: function(){
            //generamos un array de arrays con las 3 lineas con todas las posiciones a null
            this.lines = [Array.from({length: 9}, (_, i) => null),Array.from({length: 9}, (_, i) => null),Array.from({length: 9}, (_, i) => null)];
            let numbers_used=[];

            //ahora llenamos las 3 lineas con numberos random (siguiendo las reglas de un carton de bingo)
            for (let i = 0; i < this.lines.length; i++) {
                this.lines[i].forEach(function(element,index,array){
                    // console.log(this.lines[i])
                    let min=0;
                    let max=0;
                    //si es la ultima posicion es desde el 80 al 90
                    if(index==8){
                        max=90;
                        min=80;
                    }else{
                        max=((index+1)*10)-1;// calculamos el maximo numero en esa posicion
                        min=((index+1)*10)-9; // el minimo
                    }

                    let number= Math.floor(Math.random() * (max-min+1)+min);//sacamos un random etre el maximo y el minimo
                    //ahora miramos que no este ya utilizado
                    for (let j = 0; j < numbers_used.length; j++) {
                        while (numbers_used[j]==number) {
                            number= Math.floor(Math.random() * (max-min+1)+min)
                        }
                        
                    }
                    numbers_used.push(number);
                    array[index]=number;
                })
                
            }
            //le damos la vuelta para ordenar los numeros.
            let order=this.lines[0].map((_, colIndex) => this.lines.map(row => row[colIndex]));
            console.log(this.lines);
            for (let j = 0; j < order.length; j++) {
                //ordenamos
                order[j].sort((a,b) => a-b);
            }
            console.log(order)
            //le volvemos a dar la vuelta al array ya ordenado y lo guardamos en this lines
            this.lines=order[0].map((_, colIndex) => order.map(row => row[colIndex]))
            // console.log(order[0].sort((a,b) => a-b))
            // this.insert_forados();
        },
        insert_forados: function(){

            let total =[];
            let total_sort=[];
            //function para sacar los que ya tiene 2 forados (comprobacion)
            function check_dos(total){
                var repetidos = [];
                var temporal = [];
                total.forEach((value,index)=>{
                    temporal = Object.assign([],total); //Copiado de elemento
                    temporal.splice(index,1);
                    if(temporal.indexOf(value)!=-1 && repetidos.indexOf(value)==-1)      repetidos.push(value);
                });
                if(repetidos.length >=3){//si ya hay 3 retorna false
                    total_sort=sort_unique(total);
                    return false;
                }else{
                    return true;
                }
            }

            function sort_unique(arr) {
                if (arr.length === 0) return arr;
                arr = arr.sort(function (a, b) { return a*1 - b*1; });
                var ret = [arr[0]];
                for (var i = 1; i < arr.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
                  if (arr[i-1] !== arr[i]) {
                    ret.push(arr[i]);
                  }
                }
                return ret;
              }
            //las dos primeras lineas con forados
            for (let j = 0; j < 2; j++) {
                let rm_lines_one_two=[];
                let cont3=true;
                while (rm_lines_one_two.length <4) {//realiza esto hasta que haya un total de 4 forados
                    var posicion = Math.floor(Math.random() * 9);
                    if(!check_dos(total)){
                        console.log(check_dos(total))
                        while(total_sort.includes(posicion)){
                            cont3=false;
                            console.log(total_sort)
                            console.log("posicion en include: "+posicion)
                            posicion = Math.floor(Math.random() * 9);
                            console.log("NUEVA posicion en include: "+posicion)
                        }
                        cont3=true;
                    }
                    console.log("cont3 "+cont3);
                    if(cont3==true){
                        if(rm_lines_one_two.indexOf(posicion) === -1){
                            rm_lines_one_two.push(posicion)
                            total.push(posicion)
                        }
                    }
                }                
                for (let i = 0; i < rm_lines_one_two.length; i++) {
                    this.lines[j][rm_lines_one_two[i]]=null; 
                }
            }

            let posiciones_con_dos_forados=[];
            for (let v = 0; v < this.lines[2].length; v++) {
                let cont_forados_columna=0;
                //ahora miramos las 2 primeras lineas
                for (let p = 0; p < 2; p++) {
                    //miramos la linea p si en la posicion v es null. Si es null sumammos uno al contador
                    if(this.lines[p][v]==null){
                        cont_forados_columna++;
                    }

                    if(cont_forados_columna>=2){
                        //aqui guardamos las posiciones que no pueden ponerle un forado
                        posiciones_con_dos_forados.push(v);
                    }
                    
                }
                
            }


            let forados_line_tres=[];// declaramos el array donde se van a guardar las posiciones de los forados de la linea 3
            while (forados_line_tres.length <4) { 
                let cont3=true;//realizamos todo esto hasta que haya 4 forados.
                let cont_no_tres_lines=true;//usamos esto contador para indicar que ya se pueden añadir los forados o no
                let r = Math.floor(Math.random() * 9);
                //recorremos el array que tiene guardado las posiciones con mas de dos forados
                console.log(posiciones_con_dos_forados);
                for (let p = 0; p < posiciones_con_dos_forados.length; p++) {
                    while(posiciones_con_dos_forados[p]==r){
                        cont_no_tres_lines=false;
                        r=Math.floor(Math.random() * 9);
                    }
                }
                if(cont_no_tres_lines==true){
                    console.log("check_dos= "+check_dos(total))
                    if(!check_dos(total)){
                        // console.log(check_dos(total))
                        console.log(total_sort);
                        while(total_sort.includes(r)){
                            console.log(total_sort)
                            console.log("r en include: "+r)
                            cont3=false;
                            r = Math.floor(Math.random() * 9);
                        }
                        cont3=true;
                    }
                    if(cont3==true){
                        if(forados_line_tres.indexOf(r) === -1){
                            forados_line_tres.push(r)
                            total.push(r)
                        }
                    }
                }

                // console.log(cont_no_tres_lines)
                console.log(cont3)

                if(cont3==true && cont_no_tres_lines==true){
                    if(forados_line_tres.indexOf(r) === -1) forados_line_tres.push(r),total.push(r);
                }
                
            }

            for (let i = 0; i < forados_line_tres.length; i++) {
                this.lines[2][forados_line_tres[i]]=null; 
            }
            console.log(total);
            console.log("FINAL")
        },

        insert_html: function(){
            document.getElementById("table").innerHTML = "";
            var table = document.getElementById("table");
            //por cada linea
            for (let i = 0; i < this.lines.length; i++) {

                var row = table.insertRow(i)
                //por cada ubicacion de cada linea
                for (let j = 0; j < this.lines[i].length; j++) {
                    var cell1=row.insertCell(j);

                    if(this.lines[i][j]==null){
                        console.log("es null")
                        cell1.innerHTML= ""
                        cell1.style.background = "black";
                    }else{
                        cell1.innerHTML = this.lines[i][j];

                    }
                }
                
            }
        }
    }
    

    document.getElementById("card").onclick = function(){
        document.getElementById("card_bucle").disabled = true;
        card.start();
        
        
    }
    document.getElementById("card_bucle").onclick = function(){
        document.getElementById("card_bucle").disabled = true;
        document.getElementById("card").disabled = true;
        setInterval(function(){ 
            card.start();
        }, 1000);
        
        
    }

    document.getElementById("boton_get").onclick = function(){
        bombo.start();
        
    }

    document.getElementById("boton_reset").onclick = function(){
        bombo.reset();
    }
    
    bombo.crear_bombo();
}
    
docReady(bingo);
