class Concat extends Expresion {

    constructor(line,column,access,values,parentesis,isNewLine){
        super(line,column,null,null);
        this.access = access;
        this.values = values;
        this.parentesis = parentesis;
        this.isNewLine = isNewLine;
        this.translatedCode = "";
    }

    getTranslated(){
        let cadValues = "";

        for (let i = 0; i < this.values.length; i++) {
            cadValues += i ==0 ? `${this.values[i].getTranslated()}`:`,${this.values[i].getTranslated()}`;
        }

        this.translatedCode = `${this.access.getTranslated()}.concat(${cadValues})`;
        this.translatedCode === true ? `(${this.translatedCode})`:this.translatedCode;
        
        return this.isNewLine ? `${this.translatedCode}\n` : this.translatedCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    getValue(e) {
        return '';
    }

    getC3D(env){
        let result = new RESULT();
        let resultAccess;
        let resulValue;
        let code = "";
        let concat = "";

        resultAccess = this.access.getC3D(env);

        if(resultAccess.type.enumType != EnumType.STRING){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC)`Esta funcion solo permite expresiones tipo String`,env.enviromentType));
            return result;
        }

        let t1 = Singleton.getTemporary();
        let t2 = Singleton.getTemporary();
        let t3 = Singleton.getTemporary();
        let t4 = Singleton.getTemporary();
        let t5 = Singleton.getTemporary();
        let t6 = Singleton.getTemporary();
        let t7 = Singleton.getTemporary();
        let t8 = Singleton.getTemporary();
        let t9 = Singleton.getTemporary();
        let t10 = Singleton.getTemporary();
    
        let l1 = Singleton.getLabel();
        let l2 = Singleton.getLabel();
        let l3 = Singleton.getLabel();
        let l4 = Singleton.getLabel();

        concat += resultAccess.code;

        code += `${t2} = ${resultAccess.value};//inicio de primer cadena en stack\n`;
        code += `${t5} = H;//posicion vacia en heap\n`;
        code += `${t6} = 0;//recorrer la cadena en heap\n`;
        code += `${t7} = 0;//recorer el heap, donde se va a guardar la nueva cadena\n`;
        code += `${l1}:\n`;
        code += `${t8} = ${t2} + ${t6};//posicion de caracter a copiar\n`;
        code += `${t9} = Heap[(int)${t8}];//copio el caracter\n`;
        code += `if(${t9} == -1) goto ${l2};//fin de cadena\n`;
        code += `${t10} = ${t5} + ${t7};//valor vacio en heap\n`;
        code += `Heap[(int)${t10}] = ${t9};//guardo el caracter en la nueva posicion de heap\n`;
        code += `${t6} = ${t6} + 1;//aumento contador de cadena a copiar\n`;
        code += `${t7} = ${t7} + 1;//aumento contador de posicion en heap\n`;
        code += `goto ${l1};//por si hay mas caracteres a copiar\n`;

        for(let i = 0; i < this.values.length;i++){
            if(i > 0){
                l2 = Singleton.getLabel();
                l3 = Singleton.getLabel();
            }
            resulValue = this.values[i].getC3D(env);
            
            if(resulValue.type.enumType != EnumType.STRING){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC)`Esta funcion solo permite expresiones tipo String`,env.enviromentType));
                Singleton.deleteTemporaryIntoDisplay(resultAccess.value);
                Singleton.deleteTemporaryIntoDisplay(t1);
                Singleton.deleteTemporaryIntoDisplay(t2);
                Singleton.deleteTemporaryIntoDisplay(t3);
                Singleton.deleteTemporaryIntoDisplay(t4);
                Singleton.deleteTemporaryIntoDisplay(t6);
                Singleton.deleteTemporaryIntoDisplay(t7);
                Singleton.deleteTemporaryIntoDisplay(t8);
                Singleton.deleteTemporaryIntoDisplay(t9);
                Singleton.deleteTemporaryIntoDisplay(t10);
                return result;
            }

            concat += resulValue.code;

            code += `${l2}:\n`;
            code += `${t6} = 0;//puntero de cadena, regresa a cero\n`;
            code += `${t4} = ${resulValue.value};//inicio de cadena\n`;
            code += `${l3}:\n`;
            code += `${t8} = ${t4} + ${t6};\n`;
            code += `${t9} = Heap[(int)${t8}];//caracter en heap\n`;
            code += (i == this.values.length - 1) ?  `if(${t9} == -1) goto ${l4};//fin concat\n` : `if(${t9} == -1) goto ${l2};//siguiente cadena a concatenar\n`;
            code += `${t10} = ${t5} + ${t7};//valor vacio en heap\n`;
            code += `Heap[(int)${t10}] = ${t9};//copio el caracter\n`;
            code += `${t6} = ${t6} + 1;\n`;
            code += `${t7} = ${t7} + 1;\n`;
            code += `goto ${l3};\n`;
            
            Singleton.deleteTemporaryIntoDisplay(resulValue.value);
        }

        code += `${l4}:\n`;
        code += `${t10} = ${t5} + ${t7};\n`;
        code += `Heap[(int)${t10}] = -1;//fin de cadena\n`;
        code += `H = ${t10} + 1;\n`;
        
        result.value = t5;
        result.code = concat + code;
        result.type.enumType = EnumType.STRING;

        Singleton.deleteTemporaryIntoDisplay(resultAccess.value);
        Singleton.deleteTemporaryIntoDisplay(t1);
        Singleton.deleteTemporaryIntoDisplay(t2);
        Singleton.deleteTemporaryIntoDisplay(t3);
        Singleton.deleteTemporaryIntoDisplay(t4);
        Singleton.deleteTemporaryIntoDisplay(t6);
        Singleton.deleteTemporaryIntoDisplay(t7);
        Singleton.deleteTemporaryIntoDisplay(t8);
        Singleton.deleteTemporaryIntoDisplay(t9);
        Singleton.deleteTemporaryIntoDisplay(t10);

        return result;
    }

    fillTable(env){
        return null;
    }
    
    getSize(){
        return 0;
    }
}