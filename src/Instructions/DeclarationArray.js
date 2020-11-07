class DeclarationArray extends Instruction {
    constructor(linea,column,typeDeclaration,ids,type,dimensions,value,size){
        super(linea,column);
        this.typeDeclaration = typeDeclaration;
        this.ids = ids;
        this.type = type;
        this.dimensions = dimensions;
        this.values = value;
        this.size = size;
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += this.typeDeclaration.toString() + " ";
        
        for(var i = 0; i < this.ids.length;i++){
            if(i == 0){
                this.translatedCode += this.ids[i];
            }else{
                this.translatedCode += ", " + this.ids[i];
            }
        }

        if(this.type.enumType != EnumType.NULL){
            this.translatedCode += ":" + this.type.toString();
        }else{
            this.translatedCode;
        }

        for(var i = 0; i<this.dimensions;i++){
            this.translatedCode += "[]";
        }

        this.translatedCode += " = ";

        if(this.values != null){

            if(this.values instanceof Value) this.translatedCode += this.makeArray(this.values.value[0]);
            else if(this.values instanceof Access) this.translatedCode += this.values.getTranslated();

        }else if(this.values == null && this.size instanceof Expresion){
            this.translatedCode += `new Array(${this.size.getTranslated()})`;
        }

        return this.translatedCode + ";\n";
    }

    makeArray(valueArray){
        var cadena = "[";

        if(valueArray != null){
            for(var i = 0;i< valueArray.length;i++){
                if(valueArray[i] instanceof Array && i == 0){
                    cadena += `${this.makeArray(valueArray[i])}`;
                }else if(valueArray[i] instanceof Array){
                    cadena += `,${this.makeArray(valueArray[i])}`;
                }else if(i == 0){
                    cadena += valueArray[i].getTranslated();
                }else{
                    cadena += "," + valueArray[i].getTranslated();
                }
            }
        }
        
        return cadena + "]";
    }

    translatedSymbolsTable(e){
        for(var i=0;i < this.ids.length;i++){
            TableReport.addTranslated(
                new NodeTableSymbols(
                  this.line,
                  this.column,
                  this.ids[i],
                  this.type,
                  e.enviromentType,
                  null
                )
            );
        }
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var listValues = [];
        var saveValue;

        if (this.typeDeclaration.enumType == EnumDeclarationType.CONST) {
          if (this.values == null) {
            for (var i = 0; i < this.ids.length; i++) {
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La constante: "${this.ids[i]}" no tiene asignacion de un valor, debe tener valor`,e.enviromentType));
            }
            return null;
          }
        }

        if(this.values == null){
            for(var i =0;i < this.ids.length;i++){
                
                saveValue = new Symbol(this.line,this.column,this.ids[i],new Type(EnumType.ARRAY,this.type.enumType),this.typeDeclaration,new Value(new Type(EnumType.NULL),[]),Number(this.dimensions));
                e.insertNewSymbol(this.ids[i],saveValue);

            }
            return null;
        }

        if(this.validValueWithDimensions(e,this.values.value[0],1)){
            listValues = this.getValueArray(e,this.values.value[0],this.type);

            if(listValues == null){
                return null;
            }

            for(var i =0;i < this.ids.length;i++){
                
                saveValue = new Symbol(this.line,this.column,this.ids[i],new Type(EnumType.ARRAY,this.type.enumType),this.typeDeclaration,listValues,Number(this.dimensions));
                e.insertNewSymbol(this.ids[i],saveValue);

            }
        }

        return null;
    }

    /**
     * debe retornar un value con un array de value
     * 
     * @param {*} e 
     * @param {*} objArray 
     * @param {*} typeObj 
     * @returns {Value} Value
     */
    getValueArray(e,objArray,type){
        var listValueReturn = [];
        var resultValue;

        if(objArray[0] instanceof Value && objArray[0].type.enumType == EnumType.NULL){
            return objArray[0];
        }

        for(var i = 0; i < objArray.length; i++){
        
            if(objArray[i] instanceof Array){
                resultValue = this.getValueArray(e,objArray[i],type);
                
            }else{
                resultValue = (objArray[i]).getValue(e);
            }

            if(resultValue == null){
                return null;
            }

            if(resultValue.type.enumType == EnumType.ERROR){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor da error`,e.enviromentType));
                return null;
            }

            if(type.enumType == EnumType.NULL){
                this.type = resultValue.type;
                type = resultValue.type;    
            }

            if(type.enumType != resultValue.type.enumType){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el tipo de valor no coincide con el tipo del array`,e.enviromentType));
                return null;
            }

            listValueReturn.push(resultValue);
         }

        return new Value(new Type(type.enumType,type.identifier),listValueReturn);
    }

    /**
     * 
     * @param {*} e 
     * @param {*} values 
     * @param {*} currentDimencion 
     */
    validValueWithDimensions(e,values,currentDimencion){

        if(values[0] instanceof Value && values[0].type.enumType == EnumType.NULL && currentDimencion == 1){
            return true;
        }

        for(var i = 0;i < values.length; i++){

            if(this.dimensions == currentDimencion){
    
                if(!(values[i] instanceof Expresion)){
                    ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor sobre pasa el tamaño del array`,e.enviromentType));
                    return false;
                }
    
            }else if(this.dimensions > currentDimencion){
    
                if(!(values[i] instanceof Array)){
                    ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor no es de las dimenciones del array`,e.enviromentType));
                    return false;
                    
                }else if(!(this.validValueWithDimensions(e,values[0],currentDimencion+1))){
                    return false;
                }

            }else if(this.dimensions < currentDimencion){

                if(this.dimensions == 0){
                    return true;
                }

                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor es menor que el numero de dimenciones del array`,e.enviromentType));
                return false;
            }

        }
        return true;
    }

    getC3D(env){
        let resultArrayExpresion = [];
        let symbolOfVariable;
        let result = new RESULT();

        if(this.values == undefined && this.size == 0){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Declaracion incorrecta, se necesita un valor o tamaño del arreglo`,env.enviromentType));
            return result;
        }

        if(this.values != undefined){
            
            if(this.values instanceof Value){ 
                resultArrayExpresion = this.getDataOfValues(env,this.values.value[0]);
                for(let name of this.ids){
                    symbolOfVariable = env.searchSymbol(name);
                    if(symbolOfVariable != null)
                        result.code = this.getC3DArrayDeclarationWithValue(env,symbolOfVariable,resultArrayExpresion);
                }
                
            }else if(this.values instanceof Access){ 
                resultArrayExpresion = this.values.getC3D(env);
                
                for(let name of this.ids){
                    symbolOfVariable = env.searchSymbol(name);
                    if(symbolOfVariable != null)
                        result.code = this.getC3DArrayDeclarationWithAccessOtherArray(env,symbolOfVariable,resultArrayExpresion);
                }
            }
        }else{
            this.size = this.size.value;
        }
        
        return result;
    }

    fillTable(env){
        if(this.typeDeclaration.enumType == EnumDeclarationType.CONST){
            if(this.value == null){
                for(let item of this.ids){
                    ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La constant: "${item}" no tiene asignacion de un valor, debe tener valor`,env.enviromentType));
                }
                return null;
            }
        }

        for(let item of this.ids){
            this.saveVariableIntoEnvironment(env,item);
        }

        return null;
    }
    
    saveVariableIntoEnvironment(env,id){
        let newSymbol;
        let environments = env.getArrayEnvironments();
        let location = new Location(EnumLocation.HEAP);


        if(this.values == undefined){
             this.size = this.size.value;
        
        }else {
            if(this.values instanceof Value){
                this.size = this.getSizeArray();

            }else if(this.values instanceof Access){
                let tmp = env.searchSymbol(this.values.value[0].identifier);
                if(tmp != null) this.size = tmp.size;
            }
        } 

        newSymbol = new Symbol(
            this.line,
            this.column,
            id.toLowerCase(),
            this.type,
            this.typeDeclaration,
            new Type(EnumType.VALOR,null),
            env.enviromentType,
            environments,
            this.size,//TODO seria bueno tener un metodo que me diera el tama;o del array, el problema es que si no viene un numero, ese valor no lo conozco en compilacion
            Singleton.getPosStack(),
            this.dimensions,
            null,
            location,
            null
        );
        
        env.insertNewSymbol(id,newSymbol);
        return null;
    }

    getC3DArrayDeclarationWithValue(env,symbolOfVariable,resultArrayExpresion){
        let code = '';
        let tposStack;
        let tposHeap;
        let tinitHeap;
        let erroOfType = false;

        if(symbolOfVariable == null) return '';

        for(let item of resultArrayExpresion){
            if(symbolOfVariable.type.enumType != item.type.enumType){
                erroOfType = true;
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de valor es diferente al tipo de variable ${item.type.toString()} != ${symbolOfVariable.type.toString()}`,env.enviromentType));
            }
        }

        if(erroOfType) return '';

        for(let item of resultArrayExpresion){
            code += item.code;
        }

        tposStack = Singleton.getTemporary();
        tposHeap = Singleton.getTemporary();
        tinitHeap = Singleton.getTemporary();

        code += `${tinitHeap} = H;//inicio del arreglo en heap\n`;
        code += `${tposHeap} = ${tinitHeap};//puntero en heap, para guardar valores\n`;
        code += `Heap[(int)${tposHeap}] = ${this.size};//Guardo el size del arreglo\n`;

        for(let item of resultArrayExpresion){

            if(item.type.enumType == EnumType.BOOLEAN){
                Singleton.deleteTemporaryIntoDisplay(item.value);

                let t1 = Singleton.getTemporary();
                let lexit = Singleton.getLabel();

                
                code += `//declaracion de valor booleano de array\n`;
                for(let lt of item.trueLabels){
                    code += `${lt}:\n`;
                }
                
                code += `${t1} = 1;\n`;
                code += `goto ${lexit};\n`;

                for(let lf of item.falseLabels){
                    code += `${lf}:\n`;
                }
                
                code += `${t1} = 0;\n`;
                code += `goto ${lexit};\n`;
                code += `${lexit}:\n`;

                item.value = t1;
            }
            
            code += `${tposHeap} = ${tposHeap} + 1;//Guardar valor de arreglo\n`;
            code += `Heap[(int)${tposHeap}] = ${item.value};//Guardo valor de arreglo en heap\n`;

            Singleton.deleteTemporaryIntoDisplay(item.value);
        }
        code += `${tposHeap} = ${tposHeap} + 1;\n`;
        code += `H = ${tposHeap};//posicion vacia de heap\n`;

        if(env.enviromentType.enumEnvironmentType == EnumEnvironmentType.MAIN){
            code += `${tposStack} = ${symbolOfVariable.positionRelativa} + 0;//variable global\n`;

        }else{
            code += `${tposStack} = P + ${symbolOfVariable.positionRelativa};//variable local\n`;
        }

        code += `Stack[(int)${tposStack}] = ${tinitHeap};//guardo inicio de arreglo en heap\n`;

        Singleton.deleteTemporaryIntoDisplay(tposStack);
        Singleton.deleteTemporaryIntoDisplay(tposHeap);
        Singleton.deleteTemporaryIntoDisplay(tinitHeap);

        return code;
    }

    getC3DArrayDeclarationWithAccessOtherArray(env,symbolOfVariable,resultExpresion){
        let code = '//--------------------- copiar referencia de un arreglo ----------------------\n';
        let tposStack;

        if(symbolOfVariable.type.enumType != resultExpresion.type.enumType){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de valor y variable son diferentes`,env.enviromentType));
            return '';
        }
        
        if(symbolOfVariable.dimensions != resultExpresion.symbol.dimensions){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Arrglos de diferentes dimenciones`,env.enviromentType));
            return '';
        }

        tposStack = Singleton.getTemporary();

        code += resultExpresion.code;
        
        if(env.enviromentType.enumEnvironmentType == EnumEnvironmentType.MAIN){
            code += `${tposStack} = ${symbolOfVariable.positionRelativa} + 0;//variable global\n`;

        }else{
            code += `${tposStack} = P + ${symbolOfVariable};//variable local\n`;

        }

        code += `Stack[(int)${tposStack}] = ${resultExpresion.value};//guardo referencia al arreglo en heap\n`;

        Singleton.deleteTemporaryIntoDisplay(resultExpresion.value);
        return code;
    }

    getSize(){
        return this.ids.length;
    }

    getSizeArray(){
        return this.values.value[0].length;
    }

    getDataOfValues(env,array){
        let result = [];

        for(let item of array){
            if(item instanceof Array){
                result.push(...this.getDataOfValues(env,item));

            }else if(item instanceof Expresion){
                result.push(item.getC3D(env));

            }
        }
        return result;
    }

}