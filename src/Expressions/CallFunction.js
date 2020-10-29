class CallFunction extends Expresion {

    constructor(linea,column,identifier,parametros,isFinal){
        super(linea,column,null,null);
        this.identifier = identifier;
        this.parametros = parametros;
        this.isFinal = isFinal;//solo para poner punto y coma en traduccion
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.identifier}(`

        for(var i = 0;i < this.parametros.length;i++){
            if(this.parametros[i] instanceof Array && i == 0){
                this.translatedCode += this.getValuesParameters(this.parametros[i]);
            
            }else if(this.parametros[i] instanceof Array){
                this.translatedCode += `,${this.getValuesParameters(this.parametros[i])}`;

            }else if(this.parametros[i] instanceof Expresion && i ==0){
                this.translatedCode += this.parametros[i].getTranslated();
            }else if(this.parametros[i] instanceof Expresion){
                this.translatedCode += `,${this.parametros[i].getTranslated()}`;
            }
        }

        this.translatedCode += ")";

        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            if(this.isFinal){
                return `${this.translatedCode};\n`
            }
            return this.translatedCode;
        }
    }

    getValuesParameters(array){
        var cadena = "[";

        for(var i = 0; i < array.length; i++){
            if(array[i] instanceof Array && i == 0){
                cadena += this.getValuesParameters(array[i]);
            
            }else if(array[i] instanceof Array){
                cadena += `,${this.getValuesParameters(array[i])}`
            
            }else if(array[i] instanceof Expresion && i == 0){
                cadena += array[i].getTranslated();

            }else if(array[i] instanceof Expresion){
                cadena += `,${array[i].getTranslated()}`;
            }
        }

        cadena += "]"
        return cadena;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    getValue(e) {
        var result = new Value(new Type(EnumType.ERROR,""),"Error");
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.FUNCTION,null));
        var symbolFunction;
        var resultParametroDeclaration;
        var resultValueParametroDeclaration;

        symbolFunction = e.searchSymbol(this.identifier);

        if(symbolFunction == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la funcion: "${this.identifier}" no esta definida`,e.enviromentType));
            return result;
        }

        if(this.parametros.length != symbolFunction.value.parameters.length){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el numero de paramtros no coindide con los parametros de la funcion "${this.identifier}"`,e.enviromentType));
            return result;
        }

        for(var i = 0; i < this.parametros.length; i++){
            resultParametroDeclaration = symbolFunction.value.parameters[i];

            if(this.parametros[i] instanceof Expresion){
                resultValueParametroDeclaration = this.parametros[i].getValue(e);
            
            }else if(this.parametros[i] instanceof Array){
                resultValueParametroDeclaration = this.getValueArray(e,this.parametros[i],resultParametroDeclaration.type);

            }

            if(resultValueParametroDeclaration == null || resultValueParametroDeclaration.type.enumType == EnumType.ERROR){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`error con el valor del parametro: "${resultParametroDeclaration.identifier}"`,e.enviromentType));
                return result;
            }

            if(resultParametroDeclaration.type.enumType != resultValueParametroDeclaration.type.enumType){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo del parametro y el tipo de valor no coinciden function: ${this.identifier}`,e.enviromentType));
                return result;
            }
            
            if(resultParametroDeclaration.type.enumType == EnumType.ARRAY){
                
                if(resultParametroDeclaration.type.identifier != resultValueParametroDeclaration.type.identifier){
                    ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo del parametro y el tipo de valor no coinciden function: ${this.identifier}`,e.enviromentType));
                    return result;
                }

            }

            env.insertParameter(resultParametroDeclaration.identifier,new Symbol(this.line,this.column,resultParametroDeclaration.identifier,resultParametroDeclaration.type,new DeclarationType(EnumDeclarationType.LET),resultValueParametroDeclaration,resultParametroDeclaration.dimensions));
        }
        
        result = symbolFunction.value.instructions.execute(env);

        if(result == null && symbolFunction.value.type.enumType != EnumType.VOID){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la funcion debe de retornar un valor del tipo: "${symbolFunction.value.type.toString()}"`,env.enviromentType));
            return new Value(new Type(EnumType.ERROR,null),"Error");
        }
        
        if(result == null && symbolFunction.value.type.enumType == EnumType.VOID){
            return  new Value(new Type(EnumType.VOID,null),"");
        }
        
        if(result != null){
            
            if(result instanceof Return){

                if(!(result.returnExpresion)){
                    return  new Value(new Type(EnumType.VOID,null),"");;
                }

                if(result.expression.type.enumType != symbolFunction.value.type.enumType){
                    ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el tipo de valor de retorno no es el mismo del tipo de la funcion : "${symbolFunction.value.type.toString()} != ${result.expression.type.toString()}"`,env.enviromentType));
                    return new Value(new Type(EnumType.ERROR,null),"Error");
                }

                return result.expression.getValue(env);
            }else{
                console.log("error con lo que esta llegando de valor para retornar en llamada de funcion");
            }

        }
        return result;
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
  
            if(type.identifier == EnumType.NULL){
                type.identifier = resultValue.type;    
            }
            
            if(type.identifier != resultValue.type.enumType){
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
    
                if(!(values[i] instanceof Value)){
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
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor es menor que el numero de dimenciones del array`,e.enviromentType));
                return false;
            }
  
        }
        return true;
    }

    getC3D(env){
        /* TODO
        + buscar el symbolo de la funcion, si no existe es error
        + validar que el numero de parametros de envio y de la funcion son el mismo, si es diferente es error
        + validar el tipo de valores con el tipo de parametro
        - primero tengo que ver que temporales aun no se usan para guarlos en stack,
        - luego tengo que calcular el nuevo tamaño de mi entorno actual,
        + luego tengo que pasar los parametros que trae
        + tengo que cambiar el puntero de stack
        + llamar a la funcion
        + regresar el puntero stack
        - tengo que sacar los temporales no usados del stack
        + luego el block de codigo tiene que continuar normal
        */
        let result = new RESULT();
        let resultExpresion;
        let resultParameterDefinition;
        let resultParameter;
        let symbolFunction;
        let tpos = Singleton.getTemporary();
        let tnextStack = Singleton.getTemporary();
        let lnext;

        symbolFunction = env.searchSymbol(this.identifier);

        if(symbolFunction == null || symbolFunction.typeValue.enumType != EnumType.FUNCTION){
           ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se encontro la funcion`,env.enviromentType));
           return result;
        }

        if(this.parametros.length != symbolFunction.value.parameters.length){
           ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Error numero de parametros`,env.enviromentType));
           return result;
        }

        result.code += `${tnextStack} = P + ${env.size};//Ambito de la funcion a llamar, paso de parametros\n`;

        for(let i = 0; i < this.parametros.length; i++){
           resultExpresion = this.parametros[i].getC3D(env);
           resultParameterDefinition = symbolFunction.value.parameters[i];
           
            if(resultExpresion.type.enumType != resultParameterDefinition.type.enumType){
               ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Error el tipo de valor no es el mismo que del parametro`,env.enviromentType));
               continue;
            }
            
            resultParameter = symbolFunction.value.environment.searchSymbol(resultParameterDefinition.identifier);
            result.code += `//codigo de valor de parametro a pasar\n`;
            result.code += resultExpresion.code;
            
            if(resultExpresion.type.enumType == EnumType.BOOLEAN){
                result.code += `//pasar valor boolean como parametro\n`;
                lnext = Singleton.getLabel();
                for(let lt of resultExpresion.trueLabels){
                    result.code += `${lt}:\n`;
                }
                result.code += `${tpos} = ${tnextStack} + ${resultParameter.positionRelativa};\n`;
                result.code += `Stack[(int)${tpos}] = 1;\n`;
                result.code += `goto ${lnext};\n`;
                
                for(let lf of resultExpresion.falseLabels){
                    result.code += `${lf}:\n`;
                }
                result.code += `${tpos} = ${tnextStack} + ${resultParameter.positionRelativa};\n`;
                result.code += `Stack[(int)${tpos}] = 0;\n`;
                result.code += `goto ${lnext};\n`;
                result.code += `//etiqueta para seguir con los demas parametros\n`;
                result.code += `${lnext}:\n`;
                
            }else{
                result.code += `//guardo valor de parametro en stack\n`;
                result.code += `${tpos} = ${tnextStack} + ${resultParameter.positionRelativa};\n`;
                result.code += `Stack[(int)${tpos}] = ${resultExpresion.value};\n`;
            }
            

        }
        
        result.code += `P = P + ${env.size};//me posiciono en el siguiente ambito\n`;
        result.code += `${symbolFunction.id}();//llamada de funcion\n`
        result.code += `${tpos} = P + 0;//recupero valor de retorno\n`;
        result.code += `${tnextStack} = Stack[(int)${tpos}];\n`;
        result.code += `P = P - ${env.size};//regreso al ambito local\n`;
        
        result.type = symbolFunction.type;
        result.value = tnextStack;

        Singleton.deleteTemporaryIntoDisplay(tpos);

        return result;
    }

    fillTable(env){
        if(this.parametros.length > 0){
            for(let item of this.parametros){
                item.fillTable(env);
            }
        }
        return null;
    }

    getSize(){
        return 0;
    }
}