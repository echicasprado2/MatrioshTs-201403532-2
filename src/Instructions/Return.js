class Return extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} */ 
    constructor(linea,column,expression,isReturnExpresion){
        super(linea,column);

        this.expression = expression;
        this.returnExpresion = isReturnExpresion;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += "return ";

        if(this.expression != null){
            this.translatedCode += `(${this.expression.getTranslated()})`
        }

        return `${this.translatedCode};\n`;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var result;
        
        if(e.enviromentType.enumEnvironmentType == EnvironmentType.GLOBAL){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`no se puede utilizar return en este entorno`,e.enviromentType));
            return null;
        }else{
            if(this.returnExpresion){
                result = this.expression.getValue(e);

                if(result instanceof Symbol && result.type.enumType == EnumType.TYPE){
                    return new Return(this.line,this.column,result.value,true);
                }

                return new Return(this.line,this.column,result,true);
            }
        }
        return this;
    }

    getC3D(env){
        let isIntoFunction = false;
        let resultExpresion;
        let typeReturn;
        let tposReturn;
        let lexit = Singleton.getLabel();
        let result = new RESULT();

        for(let e = env; e != null; e = e.previous){
            if(e.enviromentType.enumEnvironmentType == EnumEnvironmentType.FUNCTION){
                isIntoFunction = true;
                break;
            }
        }

        if(!isIntoFunction){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Return no esta dentro de una funcion`,env.enviromentType));
            return result;
        }

        result.type.enumType = EnumType.VOID;
        
        if(this.returnExpresion) {

            resultExpresion = this.expression.getC3D(env);
            typeReturn = env.getTypeReturnFunction();

            if(typeReturn.enumType != resultExpresion.type.enumType){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de valor de return no es el mismo que de la funcion, ${typeReturn.toString()} != ${resultExpresion.type.toString()}`,env.enviromentType));
                result.exitLabels.push(lexit);
                return result;
            }

            result.type = resultExpresion.type;
            result.breakLabels.push(...resultExpresion.breakLabels);
            result.continueLabels.push(...resultExpresion.continueLabels);
            result.exitLabels.push(...resultExpresion.exitLabels);
            result.code += resultExpresion.code;
            
            tposReturn = Singleton.getTemporary();
            
            if(result.type.enumType == EnumType.BOOLEAN){
                let tbool = Singleton.getTemporary();

                for(let lt of resultExpresion.trueLabels){
                    result.code += `${lt}:\n`;
                }
                result.code += `${tposReturn} = P + 0;\n`;
                result.code += `${tbool} = 1;\n`;
                result.code += `Stack[(int)${tposReturn}] = ${tbool};\n`;
                result.code += `goto ${lexit};//salida de retorno\n`;

                for(let lf of resultExpresion.falseLabels){
                    result.code += `${lf}:\n`;
                }
                result.code += `${tposReturn} = P + 0;\n`;
                result.code += `${tbool} = 0;\n`;
                result.code += `Stack[(int)${tposReturn}] = ${tbool};\n`;
                result.code += `goto ${lexit};//salida de retorno\n`;
                result.value = tbool;
            }else{
                result.code += `${tposReturn} = P + 0;\n`;
                result.code += `Stack[(int)${tposReturn}] = ${resultExpresion.value};\n`;
                result.code += `goto ${lexit};//salida de retorno\n`;
                result.value = resultExpresion.value;
            }

            Singleton.deleteTemporaryIntoDisplay(tposReturn);
        }
        
        result.exitLabels.push(lexit);
        return result;
    }

    fillTable(env){
        if(this.returnExpresion) this.expression.fillTable(env);
        return null;
    }

    getSize(){
        return 0;
    }

}