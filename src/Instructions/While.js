class While extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} condition 
     * @param {*} block 
     */
    constructor(linea,column,condition,block){
        super(linea,column);

        this.condition = condition;
        this.block = block;

        this.translatedCode = "";

        this.environment = null;
    }

    getTranslated(){
        this.translatedCode += `while(${this.condition.getTranslated()})`
        this.translatedCode += this.block.getTranslated();
        return `${this.translatedCode}\n\n`;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "WHILE",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.WHILE,""));
        this.condition.translatedSymbolsTable(env);
        this.block.translatedSymbolsTable(env);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var resultCondition;
        var resultBlock;
        var env;

        resultCondition = this.condition.getValue(e);
        
        if(resultCondition == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la condicion de while tiene errores`,e.enviromentType));
            return null;
        }
        
        if(resultCondition.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la condicion de while no es de tipo boolean`,e.enviromentType));
            return null;
        }

        while(resultCondition.value){

            env = new Environment(e,new EnvironmentType(EnumEnvironmentType.WHILE,null));
            resultBlock = this.block.execute(env);

            if(resultBlock != null){
                if(resultBlock instanceof Break){
                    return null;
                }else if(resultBlock instanceof Continue){
                    // muere el continue
                }else if(resultBlock instanceof Return){
                    return resultBlock;
                }
            }
            
            resultCondition = this.condition.getValue(e);

            if(resultCondition.type.enumType == EnumType.ERROR){
                return null;
            }
        }
        
        return null;
    }

    getC3D(env){
        let result = new RESULT();
        let resultCondition;
        let resultBlock;
        let linit;

        resultCondition = this.condition.getC3D(env);
        resultBlock = this.block.getC3D(this.environment);

        if(resultCondition.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Error con la condicion`,env.enviromentType));
            return result;
            
        }else if(resultCondition.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La condicion no es booleana, tipo de condiciont ${resultCondition.type.toString()}`,env.enviromentType));
            return result;
        }

        result.trueLabels = [...resultCondition.trueLabels];
        result.falseLabels = [...resultCondition.falseLabels];
        
        linit = Singleton.getLabel();

        result.code += `//----------- WHILE ------------------;\n`;
        result.code += `${linit}://inicio de while\n`;
        result.code += resultCondition.code;

        result.code += `//condicion verdadera de while\n`;
        for(let item of result.trueLabels){
            result.code += `${item}:\n`;
        }
        
        result.code += resultBlock.code;
        
        result.code += `//continue de while\n`;
        for(let lc of resultBlock.continueLabels){
            result.code += `${lc}:\n`;
        }
        
        result.code += `goto ${linit};//inicio de while para volver a evaluar\n`;
        
        result.code += `//condicion falsa de while\n`;
        for(let lf of result.falseLabels){
            result.code += `${lf}:\n`;
        }
        
        result.code += `//break de while\n`;
        for(let lb of resultBlock.breakLabels){
            result.code += `${lb}:\n`;
        }

        return result;
    }

    fillTable(env){
        this.environment = new Environment(env,new EnvironmentType(EnumEnvironmentType.WHILE,null));
        this.environment.size = env.size;
        // Singleton.cleanPointerStackInit();
        
        this.block.fillTable(this.environment);
        return null;
    }

    getSize(){
        return this.block.getSize();
    }

}