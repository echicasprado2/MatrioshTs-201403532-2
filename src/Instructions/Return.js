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
            let t1 = Singleton.getTemporary();
            resultExpresion = this.expression.getC3D(env);

            result = resultExpresion;

            result.code += `${t1} = P + 0;\n`;
            result.code += `Stack[(int)${t1}] = ${result.value};\n`;
            result.value = t1;
        }

        result.code += `goto ${lexit};//retorno\n`;
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