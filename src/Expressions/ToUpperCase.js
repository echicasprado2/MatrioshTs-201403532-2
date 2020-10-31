class ToUpperCase extends Expresion {

    constructor(line,column,access,parentesis){
        super(line,column,null,null);
        this.access = access;
        this.parentesis = parentesis;
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode = `${this.access.getTranslated()}.ToUpperCase()`;
        return this.parentesis === true ? `(${this.translatedCode})`:this.translatedCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    getValue(e) {
        throw new Error("Method not implemented.");
    }

    getC3D(env){
        let result = new RESULT();
        let resultValue;
        let tpointer;
        let tchar;
        let tnewPointer;
        let tinitH;
        let linit;
        let lexit;    
        let l1;
        let l2;
        let l3;
        let ladd;

        resultValue = this.access.getC3D(env);

        if(resultValue.type.enumType != EnumType.STRING){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Funcion de expresiones tipo String`,env.enviromentType));
            return result;
        }

        tpointer = Singleton.getTemporary();
        tchar = Singleton.getTemporary();
        tnewPointer = Singleton.getTemporary();
        tinitH = Singleton.getTemporary();
        linit = Singleton.getLabel();
        lexit = Singleton.getLabel();
        l1 = Singleton.getLabel();
        l2 = Singleton.getLabel();
        l3 = Singleton.getLabel();
        ladd = Singleton.getLabel();

        result.code = resultValue.code;
        result.code += `${tinitH} = H;//inicio de nueva cadena\n`;
        result.code += `${tnewPointer} = ${tinitH};//apuntador a nueva cadena\n`;
        result.code += `${tpointer} = ${resultValue.value};//apuntador la cadena\n`;
        result.code += `${tchar} = 0;//temporal para ir moviendo los caracteres\n`;
        result.code += `${linit}:\n`;
        result.code += `${tchar} = Heap[(int)${tpointer}];//obtengo char\n`;
        result.code += `if(${tchar} == -1) goto ${lexit};//si es fin de cadena salgo\n`;
        result.code += `goto ${l1};//si no evaluo si es minuscula\n`;
        result.code += `${l1}:\n`;
        result.code += `if(${tchar} > 96) goto ${l2};//en 97 comienzan las minisculas\n`;
        result.code += `goto ${ladd};//si es menor solo agrego el caracter\n`;
        result.code += `${l2}:\n`;
        result.code += `if(${tchar} < 123) goto ${l3};// en el 122 terminan las minusculas\n`;
        result.code += `goto ${ladd};//si es mayor solo agrego el caracter\n`;
        result.code += `${l3}:\n`;
        result.code += `${tchar} = ${tchar} - 32;//paso de minuscula a mayuscula\n`;
        result.code += `goto ${ladd};//agrego el caracter\n`;
        result.code += `${ladd}:\n`;
        result.code += `Heap[(int)${tnewPointer}] = ${tchar};//guardo el caracter\n`;
        result.code += `${tpointer} = ${tpointer} + 1;//aumento puntero de cadena\n`;
        result.code += `${tnewPointer} = ${tnewPointer} + 1;//aumento puntero de nueva cadena\n`;
        result.code += `goto ${linit};//regreso a evaluar el siguiente caracter\n`;
        result.code += `${lexit}:\n`;
        result.code += `Heap[(int)${tnewPointer}] = -1;//agrego fin de cadena\n`;
        result.code += `${tnewPointer} = ${tnewPointer} + 1;//aumento el puntero de heap a una posicion vacia\n`;
        result.code += `H = ${tnewPointer};//guardo el valor en H\n`;

        result.value = tinitH;
        result.type.enumType = EnumType.STRING;

        Singleton.deleteTemporaryIntoDisplay(tpointer);
        Singleton.deleteTemporaryIntoDisplay(tnewPointer);
        Singleton.deleteTemporaryIntoDisplay(tchar);
        Singleton.deleteTemporaryIntoDisplay(resultValue.value);

        return result;
    }

    fillTable(env){
        return null;
    }

    getSize(){
        return 0;
    }
    
}