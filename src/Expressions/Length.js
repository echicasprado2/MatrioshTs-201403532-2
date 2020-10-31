class Length extends Expresion {

    constructor(line,column,access,parentesis){
        super(line,column,null,null);
        this.access = access;
        this.parentesis = parentesis;
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode = `${this.access.getTranslated()}.length`;
        return this.parentesis === true ? `(${this.translatedCode})`:this.translatedCode;
    }

    translatedSymbolsTable(e){
        return '';
    }

    executeSymbolsTable(e){
        return '';
    }

    getValue(e) {
        return '';
    }

    getC3D(env){
        let result = new RESULT();
        let resultValue;
        let tcounter;
        let tpointer;
        let tchar;
        let linit;
        let lexit;

        resultValue = this.access.getC3D(env);

        if(resultValue.type.enumType != EnumType.STRING){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Propiedad solo para expresiones de tipo String`,env.enviromentType));
            return result;
        }


        result.code = resultValue.code;

        tcounter = Singleton.getTemporary();
        tpointer = Singleton.getTemporary();
        tchar = Singleton.getTemporary();
        linit = Singleton.getLabel();
        lexit = Singleton.getLabel();

        result.code += `${tcounter} = 0;//para contar el size del string\n`;
        result.code += `${tchar} = 0;//evaluar el fin de cadena\n`;
        result.code += `${tpointer} = ${resultValue.value};//puntero de string\n`;
        result.code += `${linit}:\n`;
        result.code += `${tchar} = Heap[(int)${tpointer}];\n`;
        result.code += `if(${tchar} == -1) goto ${lexit};\n`;
        result.code += `${tpointer} = ${tpointer} + 1;\n`;
        result.code += `${tcounter} = ${tcounter} + 1;\n`;
        result.code += `goto ${linit};\n`;
        result.code += `${lexit}:\n`;

        result.value = tcounter;
        result.type.enumType = EnumType.NUMBER;
        result.type.identifier = 'INTEGER';

        Singleton.deleteTemporaryIntoDisplay(resultValue.value);
        Singleton.deleteTemporaryIntoDisplay(tpointer);
        Singleton.deleteTemporaryIntoDisplay(tchar);

        return result;
    }

    fillTable(env){
        return null;
    }

    getSize(){
        return 0;
    }
    
}