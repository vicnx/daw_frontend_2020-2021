
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
                console.log("FIN");
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
            console.log(this.boles[position])
            this.bolesextracted.push(this.boles.splice(position, 1)[0]);
            console.log(this.bolesextracted)
            
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
            // this.insert_forados();
        },
        insert_forados: function(){
            //las dos primeras lineas con forados
            for (let j = 0; j < 2; j++) {
                let random_forados=[];
                while (random_forados.length <4) {
                    var r = Math.floor(Math.random() * 8) + 1;
                    if(random_forados.indexOf(r) === -1) random_forados.push(r);
                }
                console.log(random_forados)
                
                for (let i = 0; i < random_forados.length; i++) {
                    this.lines[j][random_forados[i]]=null; 
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
            console.log(posiciones_con_dos_forados);

            let forados_line_tres=[];
            while (forados_line_tres.length <4) {
                let cont_test=true;
                let r = Math.floor(Math.random() * 8) + 1;
                //recorremos el carra que tiene guardado las posiciones con mas de dos forados
                for (let p = 0; p < posiciones_con_dos_forados.length; p++) {
                    console.log(posiciones_con_dos_forados);
                    console.log("ELEMENT: "+posiciones_con_dos_forados[p]+" r: "+r)

                    while(posiciones_con_dos_forados[p]==r){
                        cont_test=false;
                        // console.log("ELEMENT: "+posiciones_con_dos_forados[p]+" r: "+r)
                        r=Math.floor(Math.random() * 8) + 1;
                    }
                }
                if(cont_test==true){
                    if(forados_line_tres.indexOf(r) === -1) forados_line_tres.push(r);
                }
                
                console.log(forados_line_tres);
            }
            // console.log(forados_line_tres)

            for (let i = 0; i < forados_line_tres.length; i++) {
                this.lines[2][forados_line_tres[i]]=null; 
            }


            console.log(posiciones_con_dos_forados)


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
            // var row = table.insertRow(0)
            // var cell1=row.insertCell(0);
            // cell1.innerHTML = this.lines[0][0];
        }
    }
    

    document.getElementById("card").onclick = function(){
        card.start();
        console.log(card.lines)
        
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
