class AssignmentArray extends Instruction {
    
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} access 
     * @param {*} expresion 
     */
    constructor(linea,column,access,expresion){
        super(linea,column);
        
        this.listAccess = access;
        this.value = expresion;

        this.translatedCode = "";
    }

    getTranslated(){
        for(var i = 0;i < this.listAccess.length;i++){
            this.translatedCode += (i == 0) ? this.listAccess[i].getTranslated() : "." + this.listAccess[i].getTranslated(); 
        }
        
        this.translatedCode += " = ";

        if(this.value instanceof Value && this.value.type.enumType == EnumType.NULL){
            this.translatedCode += "[]";
        }else if(this.value instanceof Array){
            this.translatedCode += this.getValueArray(this.value);
        }else {
            this.translatedCode += this.value.getTranslated();
        }

        return this.translatedCode + ";\n";
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

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var nameSearch = this.listAccess[0].identifier;
        var listAccessValue = this.listAccess[0].value;

        var resultSymbol = e.searchSymbol(nameSearch);
        var resultValue = this.value.getValue(e);

        if(resultSymbol == null || resultSymbol.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable no esta definida`,e.enviromentType));
            return null;
        }

        if(resultSymbol.dimensions < listAccessValue.length){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El indice supera las dimenciones del array`,e.enviromentType));
            return null;
        }

        if(resultValue.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Error con el valor a guardar`,e.enviromentType));
            return null;
        }

        if(resultSymbol.type.identifier == EnumType.NULL || resultValue.type.enumType == EnumType.NULL){
            resultSymbol.type.identifier = resultValue.type.enumType;

        }else if(resultSymbol.type.identifier != resultValue.type.enumType){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de valor es diferente de tipo de valor de variable`,e.enviromentType));
            return null;
        }

        var newValueArray = this.changeValue(e,listAccessValue,resultValue,resultSymbol.value,0);
        if(newValueArray != null){
            resultSymbol.value = newValueArray;
            e.insert(resultSymbol.id,resultSymbol);
        }
        return null;
    }

    changeValue(e,list,newValue,values,index){
         var indice;
         var listAccess = list.slice(0,list.length);

        if(values instanceof Array && values[0] instanceof Value && (listAccess.length - 1) == index){
            indice = listAccess[index].getValue(e);
            values[indice.value] = newValue;

        }else if(values instanceof Array && values.length == 0 && (listAccess.length - 1) == index){
            indice = listAccess[index].getValue(e);
            values[indice.value] = newValue;
            
        }else if(values instanceof Value && values.value instanceof Array && (listAccess.length - 1) == index){
            indice = listAccess[index].getValue(e);
            
            if(newValue instanceof Value && newValue.value instanceof Array && newValue.value.length == 0){
                values.value[indice.value] = [];
            }else{
                values.value[indice.value] = newValue;
            }
            
        }else if(values instanceof Value && values.value instanceof Array && listAccess.length > index){
            
            indice = listAccess[index];
            index++;

            indice = indice.getValue(e);
            let aux = this.changeValue(e,listAccess,newValue,values.value[Number(indice.value)],index);
                
            if(aux instanceof Value && aux.value instanceof Array){
                values.value[Number(indice.value)] = aux.value;
            }else{
                values.value[Number(indice.value)] = aux;
            }

        }

        return values;
    }

    getC3D(env){
        let symbolVariable;
        let resultNewValue;

        if(this.value == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),'No tiene valor para asignar al arreglo',env.enviromentType));
            return new RESULT();
        }

        symbolVariable = env.searchSymbol(this.listAccess[0].identifier);
        resultNewValue = this.value.getC3D(env);

        if(symbolVariable == null || resultNewValue == null || resultNewValue.type.enumType == EnumType.ERROR){
            return new RESULT();
        }

        if(symbolVariable.type.enumType != resultNewValue.type.enumType){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),'El tipo del valor no coincide con el tipo de variable',env.enviromentType));
            return new RESULT();
        }

        let tPosStack = Singleton.getTemporary();
        let tPosHeap = Singleton.getTemporary();

        if(symbolVariable.typeEnvironment.enumEnvironmentType == EnumEnvironmentType.MAIN){
            resultNewValue.code += `${tPosStack} = ${symbolVariable.positionRelativa};//posicion de la variable global en stack\n`;
        }else{
            resultNewValue.code += `${tPosStack} = P + ${symbolVariable.positionRelativa};//posicion de variable local\n`;
        }
        resultNewValue.code += `${tPosHeap} = Stack[(int)${tPosStack}];//posicion de inicio de arreglo en heap\n`;

        Singleton.deleteTemporaryIntoDisplay(tPosStack);
        Singleton.deleteTemporaryIntoDisplay(tPosHeap);

        return this.getC3DOfAssignmentArray(env,symbolVariable,this.listAccess[0].value,0,resultNewValue,tPosHeap);
    }

    /**
     *  
     * @param {Environment} env 
     * @param {Symbol} symbol 
     * @param {[Expresion]} arrayIndex 
     * @param {Number} index use for get value in array
     * @param {RESULT} newValue 
     * @param {Temporary} tPosHeap
     */
    getC3DOfAssignmentArray(env,symbol,arrayIndex,index,resultNewValue,tPosHeap){
        let valueIndex = arrayIndex[index].getC3D(env);

        if(valueIndex.type.enumType != EnumType.NUMBER){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),'Error indice no es un numero',env.enviromentType));
            return new RESULT();
        }

        let tindex = Singleton.getTemporary();
        let tPosVal = Singleton.getTemporary();

        if(resultNewValue.type.enumType == EnumType.BOOLEAN){
            Singleton.deleteTemporaryIntoDisplay(resultNewValue.value);
            let lexit = Singleton.getLabel();
            let tval = Singleton.getTemporary();

            for(let item of resultNewValue.trueLabels){
                resultNewValue.code += `${item}:\n`;
            }
            resultNewValue.code += `${tval} = 1;\n`;
            resultNewValue.code += `goto ${lexit};\n`;

            for(let item of resultNewValue.falseLabels){
                resultNewValue.code += `${item}:\n`;
            }
            resultNewValue.code += `${tval} = 0;\n`;
            resultNewValue.code += `goto ${lexit};\n`;
            resultNewValue.code += `${lexit}:\n`;

            resultNewValue.value = tval;
        }

        resultNewValue.code += valueIndex.code;
        resultNewValue.code += `${tindex} = ${valueIndex.value} + 1;\n`;
        resultNewValue.code += `${tPosVal} = ${tPosHeap} + ${tindex};\n`;
        resultNewValue.code += `Heap[(int)${tPosVal}] = ${resultNewValue.value};\n`;

        Singleton.deleteTemporaryIntoDisplay(tindex);
        Singleton.deleteTemporaryIntoDisplay(tPosVal);
        Singleton.deleteTemporaryIntoDisplay(resultNewValue.value);

        return resultNewValue;
    }


    fillTable(env){
        return null;
    }

    getSize(){
        return 0;
    }

}