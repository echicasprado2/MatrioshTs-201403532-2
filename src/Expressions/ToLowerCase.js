class ToLowerCase extends Expresion {

    constructor(line,column,access,parentesis){
        super(line,column,null,null);
        this.access = access;
        this.parentesis = parentesis;
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode = `${this.access.getTranslated()}.ToLowerCase()`;
        return this.parentesis === true ? `(${this.translatedCode})`:this.translatedCode;
    }

    translatedSymbolsTable(e){
        return "";
    }

    executeSymbolsTable(e){
        return "";
    }

    getValue(e) {
        return "";
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
        result.code += `${tchar} = Heap[(int)${tpointer}];//obtengo caracter de la cadea\n`;
        result.code += `if(${tchar} == -1) goto ${lexit};//evaluo si es fin de cadena\n`;
        result.code += `goto ${l1};//si no lo es evaluo si es mayuscula\n`;
        result.code += `${l1}:\n`;
        result.code += `if(${tchar} > 64) goto ${l2};//65 comienzan las mayusculas\n`;
        result.code += `goto ${ladd};//si no es mayuscula agrego el caracter\n`;
        result.code += `${l2}:\n`;
        result.code += `if(${tchar} < 91) goto ${l3};//en el 90 terminan las mayusculas\n`;
        result.code += `goto ${ladd};//si no es mayuscula agrego el caracter\n`;
        result.code += `${l3}:\n`;
        result.code += `${tchar} = ${tchar} + 32;//paso de mayuscula a miniscula\n`;
        result.code += `goto ${ladd};//agrego el caracter\n`;
        result.code += `${ladd}:\n`;
        result.code += `Heap[(int)${tnewPointer}] = ${tchar};//guardo el caracter\n`;
        result.code += `${tpointer} = ${tpointer} + 1;//aumento puntero de cadena\n`;
        result.code += `${tnewPointer} = ${tnewPointer} + 1;//aumento puntero de nueva cadena en heap\n`;
        result.code += `goto ${linit};//regreso al inicio\n`;
        result.code += `${lexit}:\n`;
        result.code += `Heap[(int)${tnewPointer}] = -1;//agrego fin de cadena\n`;
        result.code += `${tnewPointer} = ${tnewPointer} + 1;//aumento el puntero para apuntar a la primer posicion vacia en heap\n`;
        result.code += `H = ${tnewPointer};//heap toma el nuevo valor\n`;

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