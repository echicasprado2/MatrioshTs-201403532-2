class Continue extends Instruction {

    constructor(linea,column){
        super(linea,column);
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode = "continue;\n"
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {

        for(var env = e; env != null; env = env.previous){
            if(env.enviromentType.enumEnvironmentType == EnumEnvironmentType.FOR
                || env.enviromentType.enumEnvironmentType == EnumEnvironmentType.FOR_IN
                || env.enviromentType.enumEnvironmentType == EnumEnvironmentType.FOR_OF
                || env.enviromentType.enumEnvironmentType == EnumEnvironmentType.SWITCH
                || env.enviromentType.enumEnvironmentType == EnumEnvironmentType.WHILE
                || env.enviromentType.enumEnvironmentType == EnumEnvironmentType.DO
                || env.enviromentType.enumEnvironmentType == EnumEnvironmentType.IF){
                    return this;
                }
        }
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Continue debe de estar dentro de una sentencia de control`,e.enviromentType));
        return null;
    }

    getC3D(env){
        let result = new RESULT();
        let isValid = false;

        for(var item = env; item != null; item = item.previous){
            if(item.enviromentType.enumEnvironmentType == EnumEnvironmentType.FOR
                || item.enviromentType.enumEnvironmentType == EnumEnvironmentType.FOR_IN
                || item.enviromentType.enumEnvironmentType == EnumEnvironmentType.FOR_OF
                || item.enviromentType.enumEnvironmentType == EnumEnvironmentType.WHILE
                || item.enviromentType.enumEnvironmentType == EnumEnvironmentType.DO){
                    isValid = true;
                }
        }

        if(!isValid){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El break no viene dentro de un ciclo`,env.enviromentType));
            return result;
        }

        let lc = Singleton.getLabel();
        result.type.enumType = EnumType.CONTINUE;
        result.continueLabels.push(lc);
        result.code += `goto ${lc};\n`;
        return result;
    }

    fillTable(env){
        return null;
    }

    getSize(){
        return 0;
    }

}