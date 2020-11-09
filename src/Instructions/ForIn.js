class ForIn extends Instruction {

    constructor(linea,column,declaration,expression,block){
        super(linea,column);

        this.declaration = declaration;
        this.expression = expression;
        this.block = block;

        this.translatedCode = "";

        this.environment = null;
    }

    getTranslated(){
        this.translatedCode += `for(${this.declaration.getTranslated().replace("\n","").replace(";","")} in `;

        if(this.expression instanceof Array){
            this.translatedCode += '[';
            for(let i = 0; i < this.expression.length;i++){
                this.translatedCode += (i == 0) ? this.expression[i].getTranslated() : `,${this.expression[i].getTranslated()}`
            }
            this.translatedCode += ']';
        }else{
            this.translatedCode += this.expression.getTranslated();
        }

        this.translatedCode += `)${this.block.getTranslated()}\n\n`;
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "FOR IN",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.FOR,""));
        this.declaration.translatedSymbolsTable(env);

        if(this.expression instanceof Array){
            for(let item of this.expression){
                item.translatedSymbolsTable(env);
            }
        }else{
            this.expression.translatedSymbolsTable(env);
        }

        this.block.translatedSymbolsTable(env);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var resultExpresion;
        var idVariable;
        var valueSymbol;
        var lengthArray;
        var resultBlock;
        var valueIn;
        var env;
        var envFor = new Environment(e,new EnvironmentType(EnumEnvironmentType.FOR_IN,null));

        if(this.declaration instanceof Declaration){
            if(this.declaration.ids.length > 1){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se se puede declarar mas de una variable`,envFor.enviromentType));
                return null;
            }
            this.declaration.execute(envFor);
            idVariable = this.declaration.ids[0];
        }
        
        if(!(this.expression instanceof Access)){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Solo se permiten variables`,envFor.enviromentType));
            return null;
        }
        
        resultExpresion = this.expression.getValue(e);

        if(!(resultExpresion instanceof Expresion)){
            return null;
        }
        
        if(resultExpresion == null || resultExpresion.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se encontro la variable`,envFor.enviromentType));
            return null;
        }
        
        if(resultExpresion.enumType != EnumType.ARRRAY){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Este for solo funciona con arreglos`,envFor.enviromentType));
            return null;
        }

        valueSymbol = envFor.searchSymbol(idVariable);
        lengthArray = resultExpresion.value.length;

        valueSymbol.type.enumType = EnumType.NUMBER;
        valueIn = new Value(new TypeError(EnumType.NUMBER,null),0);

        for(let i = 0; i < lengthArray; i++){
            valueIn.value = i;
            valueSymbol.value = valueIn;
            envFor.insert(valueSymbol.id,valueSymbol);
            
            env = new Environment(envFor,new EnvironmentType(EnumEnvironmentType.FOR,null));
            resultBlock = this.block.execute(env);

            if(resultBlock != null){
                if(resultBlock instanceof Break){
                    return null;
                }else if(resultBlock instanceof Continue){
                    /** muere el continue */
                }else if(resultBlock instanceof Return){
                    return resultBlock;
                }else{
                    console.log("Error en for in");
                }
            }

        }

        return null;
    }

    getC3D(env){
        let result = new RESULT();
        let resultDeclaration;
        let resultArray;
        let resultBlock;
        let resultAccessPlusPlus;
        let resultAccess;
        let access = new Access(this.line,this.column,[new Id(this.line,this.column,this.declaration.ids[0])]);
        let accessPlusPlus = new Unary(this.line,this.column,new OperationType(EnumOperationType.PLUS_PLUS),new Access(this.line,this.column,[new Id(this.line,this.column,this.declaration.ids[0])]),false);

        if(this.declaration instanceof Declaration && this.declaration.ids.length > 1){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puee declarar mas de una variable`,this.environment.enviromentType));
            return result;
        }

        resultDeclaration = this.declaration.getC3D(this.environment);
        resultArray = this.expression.getC3D(this.environment);
        resultBlock = this.block.getC3D(this.environment);
        resultAccessPlusPlus = accessPlusPlus.getC3D(this.environment);
        resultAccess = access.getC3D(this.environment);

        if(resultArray.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumEnvironmentType.SEMANTIC),'Error con arreglo',this.environment.enviromentType));
            return result;
        }

        let linit = Singleton.getLabel();
        let ltrue = Singleton.getLabel();
        let lfalse = Singleton.getLabel();
        let tlength = Singleton.getTemporary();

        result.exitLabels.push(...resultBlock.exitLabels);

        result.code += `//-------------- FOR IN ----------------\n`;
        result.code += `//--------------- DECLARACION DE FOR ------------\n`;
        result.code += resultDeclaration.code;
        result.code += '//---------------- INICIO DE ARREGLO EN HEAP ----------\n';
        result.code += resultArray.code;
        result.code += `${tlength} = Heap[(int)${resultArray.value}];\n`;
        result.code += `//-------------- INICIO DE FOR IN ---------------\n`;
        result.code += resultAccess.code;
        result.code += `if(${resultAccess.value} < ${tlength}) goto ${ltrue};\n`;
        result.code += `${linit}:\n`;
        result.code += `//------------ CONDICION DE FOR IN ---------------\n`;
        result.code += `if(${resultAccessPlusPlus.value} < ${tlength}) goto ${ltrue};\n`;
        result.code += `goto ${lfalse};\n`;
        result.code += `//---------------- CONDICION VERDADERA --------------------\n`;
        result.code += `${ltrue}:\n`;
        result.code += `//---------------- BLOCK FOR IN ---------------------\n`;
        result.code += resultBlock.code;
        result.code += `//------------------- ETIQUETA CONTINUE DE FOR IN ---------------\n`;
        
        for(let lc of resultBlock.continueLabels){
            result.code += `${lc}:\n`;
        }
        
        result.code += `//------------------- EXPRESION DE FOR ---------------\n`;
        result.code += resultAccessPlusPlus.code;
        result.code += `//------------------- SALTO A INICIO DE FOR ---------------\n`;
        result.code += `goto ${linit};\n`;

        result.code += `//------------------- ETIQUETA DE BREAK DE FOR ---------------\n`;
        for(let lb of resultBlock.breakLabels){
            result.code += `${lb}:\n`;
        }

        result.code += `//------------------- CONDICION FALSA DE FOR ---------------\n`;
        result.code += `${lfalse}:\n`;

        Singleton.deleteTemporaryIntoDisplay(resultAccess.value);
        Singleton.deleteTemporaryIntoDisplay(resultArray.value);
        Singleton.deleteTemporaryIntoDisplay(resultAccessPlusPlus.value);
        Singleton.deleteTemporaryIntoDisplay(tlength);

        return result;
    }

    fillTable(env){
        this.environment = new Environment(env,new EnvironmentType(EnumEnvironmentType.FOR_IN,null));
        this.environment.size = env.size;
        
        this.declaration.type.enumType = EnumType.NUMBER;
        
        this.declaration.fillTable(this.environment);
        this.block.fillTable(this.environment);
        return null;
    }

    getSize(){
        return this.getSizeCondition() + this.getSizeBlock();
    }

    getSizeCondition(){
        return this.declaration.getSize();
    }

    getSizeBlock(){
        return this.block.getSize();
    }

}