class ForOf extends Instruction {

    constructor(linea,column,declaration,expression,block){
        super(linea,column);
        
        this.declaration = declaration;
        this.expression = expression;
        this.block = block;
        this.counter = new Declaration(this.line,this.column,new DeclarationType(EnumDeclarationType.LET),["for_in_counter"],new Type(EnumType.NUMBER,null),null);

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `for(${this.declaration.getTranslated().replace("\n","").replace(";","")} of `;
        
        if(this.expression instanceof Array){
            this.translatedCode += '['
            for(let i = 0;i<this.expression.length;i++){
                this.translatedCode += (i == 0)? this.expression[i].getTranslated() : `,${this.expression[i].getTranslated()}`;
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
              "FOR OF",
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

        for(let i = 0; i < lengthArray; i++){
            valueSymbol.type = resultExpresion.value[i].type
            valueSymbol.value = resultExpresion.value[i];
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
        let resultDeclarationCounter;
        let resultDeclaration;
        let resultAccess;
        let resultArray;
        let resultBlock;
        let resultCounterPlusPlus;
        let resultAccessCounter;

        let access = new Access(this.line,this.column,[new Id(this.line,this.column,this.declaration.ids[0])]);
        let counterPlusPlus = new Unary(this.line,this.column,new OperationType(EnumOperationType.PLUS_PLUS),new Access(this.line,this.column,[new Id(this.line,this.column,this.counter.ids[0])]),false);
        let accessCounter = new Access(this.line,this.column,[new Id(this.line,this.column,this.counter.ids[0])]);

        if(this.declaration instanceof Declaration && this.declaration.ids.length > 1){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puee declarar mas de una variable`,this.environment.enviromentType));
            return result;
        }

        resultDeclarationCounter = this.counter.getC3D(this.environment);
        resultDeclaration = this.declaration.getC3D(this.environment);
        resultAccess = access.getC3D(this.environment);
        resultBlock = this.block.getC3D(this.environment);
        resultCounterPlusPlus = counterPlusPlus.getC3D(this.environment);
        resultAccessCounter = accessCounter.getC3D(this.environment);

        if(this.expression instanceof Expresion ) resultArray = this.expression.getC3D(this.environment);
        else resultArray = DeclarationArray.makeArrayIntoHeap(this.environment,this.expression);

        if(resultArray.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumEnvironmentType.SEMANTIC),'Error con arreglo',this.environment.enviromentType));
            return result;
        }

        let linit = Singleton.getLabel();
        let ltrue = Singleton.getLabel();
        let lfalse = Singleton.getLabel();
        let tlength = Singleton.getTemporary();
        let tPosHeap = Singleton.getTemporary();
        let tvalIterator = Singleton.getTemporary();
        let tPosStack = Singleton.getTemporary();

        result.exitLabels.push(...resultBlock.exitLabels);

        result.code += `//-------------- FOR OF ----------------\n`;
        result.code += `//--------------- DECLARACION DE COUNTER FOR OF ------------\n`;
        result.code += resultDeclarationCounter.code;

        result.code += `//--------------- DECLARACION DE ITERADOR FOR OF ------------\n`;
        result.code += resultDeclaration.code;

        result.code += '//---------------- INICIO DE ARREGLO EN HEAP ----------\n';
        result.code += resultArray.code;
        result.code += `${tlength} = Heap[(int)${resultArray.value}];\n`;
        result.code += resultAccessCounter.code;
        result.code += `if(${resultAccessCounter.value} < ${tlength}) goto ${ltrue};\n`;
        result.code += `goto ${lfalse};\n`;

        result.code += `//-------------- INICIO DE FOR OF ---------------\n`;
        result.code += `${linit}:\n`;
        result.code += `//------------ CONDICION DE FOR OF ---------------\n`;
        result.code += `if(${resultCounterPlusPlus.value} < ${tlength}) goto ${ltrue};\n`;
        result.code += `goto ${lfalse};\n`;
        result.code += `//---------------- CONDICION VERDADERA --------------------\n`;
        result.code += `${ltrue}:\n`;

        result.code += `//cargo valor al iterador del for of\n`;

        result.code += `${tPosHeap} = ${resultArray.value} + ${resultCounterPlusPlus.value};\n`;
        result.code += `${tPosHeap} = ${tPosHeap} + 1;\n`;
        result.code += `${tvalIterator} = Heap[(int)${tPosHeap}];//valor de la posicion en el arreglo\n`;
        
        if(resultAccess.symbol.typeEnvironment.enumEnvironmentType == EnumEnvironmentType.MAIN){
            result.code += `${tPosStack} = ${resultAccess.symbol.positionRelativa} + 0;//asignacion al iterador en el entorno global\n`;
        }else{
            result.code += `${tPosStack} = P + ${resultAccess.symbol.positionRelativa};//asignacion al interado en entorno local de una funcion\n`;
        }
        result.code += `Stack[(int)${tPosStack}] = ${tvalIterator};\n`;
        
        result.code += resultAccess.code;
        
        if(resultAccess.type.enumType == EnumType.BOOLEAN){
            let lexit = Singleton.getLabel();
            for(let lt of resultAccess.trueLabels){
                result.code += `${lt}:\n`;
            }
            result.code += `${resultAccess.value} = 1;\n`;
            result.code += `goto ${lexit};\n`;

            for(let lf of resultAccess.falseLabels){
                result.code += `${lf}:\n`;
            }
            result.code += `${resultAccess.value} = 0;\n`;
            result.code += `goto ${lexit};\n`;
            result.code += `${lexit}:\n`;
        }

        
        result.code += `//---------------- BLOCK FOR IN ---------------------\n`;
        result.code += resultBlock.code;

        result.code += `//------------------- ETIQUETA CONTINUE DE FOR IN ---------------\n`;
        for(let lc of resultBlock.continueLabels){
            result.code += `${lc}:\n`;
        }
        
        result.code += `//------------------- EXPRESION DE FOR ---------------\n`;
        result.code += resultCounterPlusPlus.code;
        result.code += `//------------------- SALTO A INICIO DE FOR ---------------\n`;
        result.code += `goto ${linit};\n`;

        result.code += `//------------------- ETIQUETA DE BREAK DE FOR ---------------\n`;
        for(let lb of resultBlock.breakLabels){
            result.code += `${lb}:\n`;
        }

        result.code += `//------------------- CONDICION FALSA DE FOR ---------------\n`;
        result.code += `${lfalse}:\n`;

        Singleton.deleteTemporaryIntoDisplay(tlength);
        Singleton.deleteTemporaryIntoDisplay(tPosHeap);
        Singleton.deleteTemporaryIntoDisplay(tvalIterator);
        Singleton.deleteTemporaryIntoDisplay(tPosStack);
        Singleton.deleteTemporaryIntoDisplay(resultArray.value);
        Singleton.deleteTemporaryIntoDisplay(resultAccessCounter.value);
        Singleton.deleteTemporaryIntoDisplay(resultCounterPlusPlus.value);
        Singleton.deleteTemporaryIntoDisplay(resultAccess.value);

        return result;
    }

    fillTable(env){
        let symbolExpresion;
        let typeIterator;
        this.environment = new Environment(env,new EnvironmentType(EnumEnvironmentType.FOR_IN,null));
        this.environment.size = env.size;
        
        if(this.expression instanceof Expresion) symbolExpresion = this.expression.getC3D(this.environment);
        else  symbolExpresion = DeclarationArray.makeArrayIntoHeap(env,this.expression);
        
        Singleton.deleteTemporaryIntoDisplay(symbolExpresion.value);
        typeIterator = symbolExpresion.type;

        this.declaration.type.enumType = typeIterator.enumType;

        this.counter.fillTable(this.environment);
        this.declaration.fillTable(this.environment);
        this.block.fillTable(this.environment);
        return null;
    }

    getSize(){
        return this.declaration.getSize() + this.counter.getSize();
    }

}