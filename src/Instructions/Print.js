class Print extends Instruction {
    constructor(linea, column, expresion) {
        super(linea, column);
        this.values = expresion;
        this.translatedCode = "";
    }
    
    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){
        this.translatedCode = "console.log(";
        for(var i = 0;i < this.values.length;i++){
            this.translatedCode += (i == 0)? this.values[i].getTranslated() : `, ${this.values[i].getTranslated()}`;
        }
        this.translatedCode += ");\n";
        return this.translatedCode;
    }

    /**
     * 
     * @param {Environment actual} e  
     */
    translatedSymbolsTable(e){}

    /**
     * 
     * @param {Enviroment} e 
     */
    executeSymbolsTable(e){
        return "implementar este codigo"
    }

    /**
     * 
     * @param {*} e 
     */
    execute(e) {
        var resultCadena = "";
        var result;

        for(var i = 0; i < this.values.length; i++){
            result = this.values[i].getValue(e);
            
            if(result != null){
                
                if(result.type.enumType == EnumType.STRING){
                    if(result.value != "@vacio"){
                        resultCadena += result.value;
                    }

                }else if(result.esArray){
                    resultCadena += this.getValueArray(result.value);

                }else if(result.type.enumType == EnumType.TYPE){
                    resultCadena += this.getDataMap(result.value.value);

                }else{
                    resultCadena += result.value;
                }

            }else{
                console.log("llega null al print");
            }
        }

        PrintConsole.printLine(resultCadena);
        return null; 
    }

    getValueArray(value){
        var cadena = "[";

        for(var i = 0; i < value.length; i++){
            if(value[i] instanceof Array && i == 0){
                cadena += `${this.getValueArray(value[i])}`;
            }else if(value[i] instanceof Array){
                cadena += `,${this.getValueArray(value[i])}`;
            }else if(i == 0){
                cadena += value[i].value;
            }else{
                cadena += `,${value[i].value}`;
            }            
        }
        
        cadena += "]";
        return cadena;
    }
    
    getDataMap(map){
        var cadena = "{";

        if(!(map instanceof Map)){
            return cadena;
        }
        
        map.forEach((element, key) => {
            if(element.value instanceof Map){
                cadena += `${key}: ${this.getDataMap(element.value)},`
            }else{
                cadena += `${key}: ${element.value},`
            }
        });

        cadena = cadena.substring(0,cadena.length -1);
        cadena += "}";
        return cadena;
    }

}
