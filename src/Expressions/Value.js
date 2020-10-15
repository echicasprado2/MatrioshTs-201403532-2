/**
 * @class use this class for save all value
 */
class Value extends Expresion {
    /**
     *
     * @param type - Type
     * @param value - Object
     *
     */
    constructor(type, value) {

        if(type.enumType == EnumType.STRING && value != null && !(value instanceof Array) ){
            value = value.replace("\"","");
            value = value.replace("\"","");
            value = value.replace("\'","");
            value = value.replace("\'","");
            value = value.replace("\`","");
            value = value.replace("\`","");
        }

        super(0, 0, type, value);
        if (value instanceof Array) {
            this.esArray = true;
        
        }else {
            this.esArray = false;
        }
        
        this.translatedCode = "";
    }

    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){
        if(this.type.enumType == EnumType.STRING){
            if(this.value == null){
                this.translatedCode = "\"\"";

            }else{
                this.translatedCode = `"${this.value.toString()}"`;
            }
        }else {
            this.translatedCode = this.value.toString();
        }
        
        if(this.parentesis){
            return `(${this.translatedCode})`;

        }else{
            return this.translatedCode;
        }
    }

    /**
     * 
     * @param {Environment actual} e  
     */
    translatedSymbolsTable(e){
        return "implementar este codigo";
    }

    /**
     * 
     * @param {Enviroment} e 
     */
    executeSymbolsTable(e){
        return "implementar este codigo"
    }

    getValue(e) {

        if(this.type.enumType == EnumType.STRING){
            this.value = this.value.replace(/\\\"/g,"\"");
            this.value = this.value.replace(/\\/g,"\\");
            this.value = this.value.replace(/\\n/g,"\n");
            this.value = this.value.replace(/\\r/g,"\r");
            this.value = this.value.replace(/\\t/g,"\t");
        }
        
        if(this.value == null){
            let nuevoValor = new Value(this.type, "@vacio");
            return nuevoValor;
        }

        return new Value(this.type, this.value);
    }

    getC3D(env){
        let result = new RESULT();
        let tInicio;
        let tPosition;

        result.type = this.type;
        result.value = this.value;

        if(this.type.enumType == EnumType.BOOLEAN){
            result.value = result.value == true ? 1 : 0;
        }   

        if(this.type.enumType == EnumType.STRING){
            tInicio = Singleton.getTemporary();
            tPosition = Singleton.getTemporary();

            result.value = tInicio;
            result.code += `${tInicio} = H;//Guardo el inicio de la variable en Heap\n`;
            result.code += `${tPosition} = ${tInicio};//Copio el inicio de la en Heap, para moverme en las posiciones\n`;
            
            let listChar = this.value.split('');

            for(let i = 0; i < listChar.length; i++){

                if(listChar[i]==="\\"){
                    i++;
                    result.code += `Heap[(int)${tPosition}] = ${this.getSpecialChar(listChar[i])};//char -> \\${listChar[i]}\n`

                }else{
                    result.code += `Heap[(int)${tPosition}] = ${listChar[i].charCodeAt(0)};//char -> ${listChar[i]}\n`
                }

                result.code += `${tPosition} = ${tPosition} + 1;\n`
            }
            result.code += `Heap[(int)${tPosition}] = -1;//fin de cadena\n`;
            result.code += `${tPosition} = ${tPosition} + 1;\n`
            result.code += `H = H + ${tPosition};//apunta a la primera posicion basica de Heap\n`;
        }

        return result;
    }

    getSpecialChar(char){
        switch(char){
            case "n":
                return 10;
            case "\"":
                return 34;
            case "\\":
                return 92;
            case "t":
                return 9;
            case "r":
                return 13;
            default:
                return char;
        }
    }


}
