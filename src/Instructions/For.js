class For extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} declaration 
     * @param {*} condition 
     * @param {*} expression 
     * @param {*} block 
     */
    constructor(linea,column,declaration,condition,expression,block){
        super(linea,column);

        this.declaration = declaration; // this declaration is Declaration or Assignment or Id
        this.condition = condition;
        this.expression = expression;
        this.block = block;

        this.translatedCode = "";

        this.environment = null;
    }

    getTranslated(){
        this.translatedCode += `for(${this.declaration.getTranslated().replace("\n","").replace(";","")}; ${this.condition.getTranslated()}; ${this.expression.getTranslated()})`;
        this.translatedCode += `${this.block.getTranslated()}\n\n`;
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "FOR",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.FOR,""));
        this.declaration.translatedSymbolsTable(env);
        this.expression.translatedSymbolsTable(env);
        this.block.translatedSymbolsTable(env);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var resultCondition;
        var resultExpresion;
        var resultBlock;
        var env;
        var envFor = new Environment(e,new EnvironmentType(EnumEnvironmentType.FOR,null));

        if(this.declaration instanceof Declaration){
            if(this.declaration.ids.length > 1){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se se puede declarar mas de una variable`,envFor.enviromentType));
            }
            this.declaration.execute(envFor);

        }else if(this.declaration instanceof Assignment){
            this.declaration.execute(envFor);
        }

        resultCondition = this.condition.getValue(envFor);

        if(resultCondition == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`for tiene errores con su condicion`,envFor.enviromentType));
            return null;
        }
        
        if(resultCondition.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la condicion de for no es de tipo boolean`,envFor.enviromentType));
            return null;
        }
        
        while(resultCondition.value){
            env = new Environment(envFor,new EnvironmentType(EnumEnvironmentType.FOR,null));
            resultBlock = this.block.execute(env);
            
            if(resultBlock != null){
                if(resultBlock instanceof Break){
                    return null;
                }else if(resultBlock instanceof Continue){
                    //muere el continue
                }else if(resultBlock instanceof Return){
                    return resultBlock;
                }else{
                    console.log("error con el bloque de for");
                }
            }
            
            resultExpresion = this.expression.getValue(envFor);
            resultCondition = this.condition.getValue(envFor);

            if(resultCondition == null){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`for tiene errores con su condicion`,envFor.enviromentType));
                return null;
            }
            
            if(resultCondition.type.enumType != EnumType.BOOLEAN){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la condicion de for no es de tipo boolean`,envFor.enviromentType));
                return null;
            }
            
        }

        return null;
    }

    getC3D(env){
        let result = new RESULT();
        let resultDeclaration;
        let resultCondition;
        let resultExpresion;
        let resultBlock;

        if(this.declaration instanceof Declaration && this.declaration.ids.length > 1){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se se puede declarar mas de una variable`,this.environmentCondition.enviromentType));
        }

        resultDeclaration = this.declaration.getC3D(this.environment);
        resultCondition = this.condition.getC3D(this.environment);
        resultExpresion = this.expression.getC3D(this.environment);
        resultBlock = this.block.getC3D(this.environment);

        if(resultCondition.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),'Error con la declaracion',this.environmentCondition.enviromentType));
            return result;
        }
        
        if(resultExpresion.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),'Error con la expresion',this.environmentCondition.enviromentType));
            return result;
        }

        if(resultCondition.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),'La condicion no es booleana',this.environmentCondition.enviromentType));
            return result;
        }

        let linit = Singleton.getLabel();

        // result.code += `P = P + ${env.size};\n`;
        result.code += `//------------------- FOR ---------------\n`;
        result.code += `//------------------- DECLARACION DE FOR ---------------\n`;
        result.code += resultDeclaration.code;
        result.code += `//------------------- INICIO DE FOR ---------------\n`;
        result.code += `${linit}:\n`;
        result.code += `//------------------- CONDICION DE FOR ---------------\n`;
        result.code += resultCondition.code;
        
        result.code += `//------------------- ETIQUETA VERDADERA DE FOR ---------------\n`;
        for(let lt  of resultCondition.trueLabels){
            result.code += `${lt}:\n`;
        }
        
        result.code += `//------------------- BLOCK DE FOR ---------------\n`;
        result.code += resultBlock.code;
        result.code += `//------------------- ETIQUETA CONTINUE DE FOR ---------------\n`;
        for(let lc of resultBlock.continueLabels){
            result.code += `${lc}:\n`;
        }
        
        result.code += `//------------------- EXPRESION DE FOR ---------------\n`;
        result.code += resultExpresion.code;
        result.code += `//------------------- SALTO A INICIO DE FOR ---------------\n`;
        result.code += `goto ${linit};\n`;
        
        result.code += `//------------------- ETIQUETA DE BREAK DE FOR ---------------\n`;
        for(let lb of resultBlock.breakLabels){
            result.code += `${lb}:\n`;
        }

        result.code += `//------------------- CONDICION FALSA DE FOR ---------------\n`;
        for(let lf of resultCondition.falseLabels){
            result.code += `${lf}:\n`;
        }
        // result.code += `P = P - ${env.size};\n`;

        return result;
    }

    fillTable(env){
        this.environment = new Environment(env,new EnvironmentType(EnumEnvironmentType.FOR,null));
        this.environment.size = env.size;
        // Singleton.cleanPointerStackInit();
        
        this.declaration.fillTable(this.environment);
        this.condition.fillTable(this.environment);
        this.expression.fillTable(this.environment);
        this.block.fillTable(this.environment);

        return null;
    }

    getSize(){
        return this.getSizeCondition() + this.getSizeBlock();
    }

    getSizeCondition(){
        let counter = 0;
        counter += this.declaration.getSize();
        counter += this.condition.getSize();
        counter += this.expression.getSize();
        return counter;
    }

    getSizeBlock(){
        return this.block.getSize();
    }

}