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


    getC3D(env){
        let result = new RESULT();
        let resultTemp;

        for(const item of this.values){
            resultTemp = item.getC3D(env);
            result.code += resultTemp.code;

            switch(resultTemp.type.enumType){
                case EnumType.STRING:
                    let t1 = Singleton.getTemporary();
                    let t2 = Singleton.getTemporary();
                    result.code += `${t1} = P + ${env.size};//Obtengo inicio del ambito de la funcion a llamar\n`;
                    result.code += `${t2} = ${t1} + 0;//posicion del parametro a enviar\n`;
                    result.code += `Stack[(int)${t2}] = ${resultTemp.value};//Paso inicio de string a stack\n`;
                    result.code += `P = P + ${env.size};//Muevo puntero de stack al ambito de la funcion\n`;
                    result.code += `${C3DMethods.getCallPrintString()};//llamada de funcion\n`;
                    result.code += `P = P - ${env.size};//regreso puntero de stack al ambito actual\n`;
                    break;
                case EnumType.NUMBER:

                    if(resultTemp.type.identifier === "INTEGER"){
                        result.code += `printf("%d",(int)${resultTemp.value});\n`;

                    }else if(resultTemp.type.identifier === "DOUBLE"){
                        result.code += `printf("%0.10f",${resultTemp.value});\n`;
                    }

                    break;
                case EnumType.BOOLEAN:
                    let lExit = Singleton.getLabel();
                    
                    if(resultTemp.code == ""){
                        let lTrue = Singleton.getLabel();
                        let lFalse = Singleton.getLabel();
                        resultTemp.trueLabels.push(lTrue);
                        resultTemp.falseLabels.push(lFalse);

                        resultTemp.code += `if(${resultTemp.value} == 1) goto ${lTrue};\n`;
                        resultTemp.code += `goto ${lFalse};\n`;
                        result.code += resultTemp.code
                    }

                    for(let item of resultTemp.trueLabels){
                        result.code += `${item}:\n`;
                    }
                    result.code += `printf("%c",(char)116);\n`;
                    result.code += `printf("%c",(char)114);\n`;
                    result.code += `printf("%c",(char)117);\n`;
                    result.code += `printf("%c",(char)101);\n`;
                    
                    result.code += `goto ${lExit};\n`;
                    
                    for(let item of resultTemp.falseLabels){
                        result.code += `${item}:\n`;
                    }
                    result.code += `printf("%c",(char)102);\n`;
                    result.code += `printf("%c",(char)97);\n`;
                    result.code += `printf("%c",(char)108);\n`;
                    result.code += `printf("%c",(char)115);\n`;
                    result.code += `printf("%c",(char)101);\n`;
                    result.code += `${lExit}:\n`;

                    break;
                default:
                    result.code += `printf("%c",(char)110);\n`;
                    result.code += `printf("%c",(char)117);\n`;
                    result.code += `printf("%c",(char)108);\n`;
                    result.code += `printf("%c",(char)108);\n`;
                    result.code += `printf("%c",(char)10);\n`;
                    break;
            }

        }
        return result;
    }

    getSize(){
        return 0;
    }

}
