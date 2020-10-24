class BlockIf extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} expresion 
     * @param {*} block 
     * @param {*} isElseIf 
     */
    constructor(linea,column,expresion,block,isElseIf){
        super(linea,column);

        this.expresion = expresion;
        this.block = block;
        this.conditionTrue = false;
        this.isElseIf =isElseIf;

        this.translatedCode = "";
        this.enviroment = null;
    }

    getTranslated(){

        if(this.isElseIf){
            this.translatedCode += `else if(${this.expresion.getTranslated()})`;
        }else{
            this.translatedCode += `if(${this.expresion.getTranslated()})`;
        }

        this.translatedCode += `${this.block.getTranslated()}`;

        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var resultCondicion;
        var envIf;
        var resultBlock;

        this.conditionTrue = false;
        resultCondicion = this.expresion.getValue(e);

        if(resultCondicion.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La condicion no es de valor boolean`,e.enviromentType));
            return null;
        }

        if(!(resultCondicion.value)){
            return null;
        }

        envIf = new Environment(e,new EnvironmentType(EnumEnvironmentType.IF,null));
        resultBlock = this.block.execute(envIf);
        this.conditionTrue = true;

        if(resultBlock != null){
            if(resultBlock instanceof Break){
                return resultBlock;
            }else if(resultBlock instanceof Continue){
                return resultBlock;
            }else if(resultBlock instanceof Return){
                return resultBlock;
            }else{
                console.log("error dentro del block if");
            }
        }

        return null;
    }

    getC3D(env){
        let result = new RESULT();
        let resultCondition;
        let resultBlock;
        let lexit;

        resultCondition = this.expresion.getC3D(env);
        resultBlock = this.block.getC3D(this.enviroment);

        if(resultCondition.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Error con la condicion`,this.enviroment.enviromentType));
            return result;
            
        }else if(resultCondition.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La condicion no es booleana, tipo de condiciont ${resultCondition.type.toString()}`,this.enviroment.enviromentType));
            return result;
        }

        lexit = Singleton.getLabel();

        result.trueLabels = [...resultCondition.trueLabels];
        result.falseLabels = [...resultCondition.falseLabels];
        result.exitLabel.push(lexit);

        result.code += resultCondition.code;
        
        for(let item of result.trueLabels){
            result.code += `${item}:\n`;
        }

        result.code += resultBlock.code;
        result.code += `goto ${lexit};\n`;

        return result;
    }

    fillTable(env){
        this.enviroment = new Environment(env,new EnvironmentType(EnumEnvironmentType.IF,null));
        this.block.fillTable(this.enviroment);
        return null;
    }

    getSize(){
        return 0;
    }

}