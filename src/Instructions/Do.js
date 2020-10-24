class Do extends Instruction {

    constructor(linea,column,block,condition){
        super(linea,column);

        this.condition = condition;
        this.block = block;

        this.translatedCode = "";

        this.environment = null;
    }

    getTranslated(){
        this.translatedCode += `do ${this.block.getTranslated()}while(${this.condition.getTranslated()});\n\n`;
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "DO",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.DO,""));
        this.condition.translatedSymbolsTable(env);
        this.block.translatedSymbolsTable(env);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var resultCondition;
        var resultBlock;
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.DO,null));

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
        
        if(resultCondition == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la condicion de while tiene errores`,e.enviromentType));
            return null;
        }
        
        if(resultCondition.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la condicion de while no es de tipo boolean`,e.enviromentType));
            return null;
        }

        while(resultCondition.value){
            env = new Environment(e,new EnvironmentType(EnumEnvironmentType.DO,null));
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
        }

        return null;
    }

    getC3D(env){
        let result = new RESULT();
        let resultCondition;
        let resultBlock;
        let lcondition;
        let lblock;

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

        lblock = Singleton.getLabel();
        lcondition = Singleton.getLabel();

        result.code += `//-------------------- DO WHILE------------------\n`;
        result.code += `goto ${lblock};\n`;
        result.code += `${lcondition}://condicion\n`;
        result.code += resultCondition.code;
        
        result.code += `//condicion verdadera de do while\n`;
        for(let lt of result.trueLabels){
            result.code += `${lt}:\n`;
        }

        result.code += `${lblock}:\n`;
        result.code += resultBlock.code;

        result.code += `//continue en do while\n`;
        for(let lc of resultBlock.continueLabels){
            result.code += `${lc}:\n`;
        }

        result.code += `goto ${lcondition};//salto de condicion de do while\n`;

        result.code += `//condicion falsa de do while\n`;
        for(let lf of result.falseLabels){
            result.code += `${lf}:\n`;
        }

        result.code += `//break en while\n`;
        for(let lb of resultBlock.breakLabels){
            result.code += `${lb}:\n`;
        }

        return result;
    }

    fillTable(env){
        this.environment = new Environment(env,new EnvironmentType(EnumEnvironmentType.DO,null));
        this.environment.size = this.getSize();
        Singleton.cleanPointerStackInit();
        
        this.block.fillTable(this.environment);
        return null;
    }

    getSize(){
        return this.block.getSize();
    }

}