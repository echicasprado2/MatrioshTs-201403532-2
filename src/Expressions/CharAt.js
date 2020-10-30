class CharAt extends Expresion {

    constructor(line,column,access,value,parentesis){
        super(line,column,null,null);
        this.access = access;
        this.value = value;
        this.parentesis = parentesis
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode = `${this.access.getTranslated()}.CharAt(${this.value.getTranslated()})`;
        return this.parentesis === true ? `(${this.translatedCode})`:this.translatedCode;
    }

    getGraphsCode(){
        return this.graphcsCode;
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
        let resultAccess;
        let resultExpresion;
        let linit = Singleton.getLabel();
        let lfin = Singleton.getLabel();
        let lindex = Singleton.getLabel();
        let lresult = Singleton.getLabel();
        let tcount = Singleton.getTemporary();
        let tchar = Singleton.getTemporary();
        let tresult = Singleton.getTemporary();

        resultAccess = this.access.getC3D(env);
        resultExpresion = this.value.getC3D(env);

        result.type.enumType = EnumType.STRING;

        result.code = resultAccess.code + resultExpresion.code;
        result.code += `//----------- INICIO DE CHAR AT -----------------\n`;
        result.code += `${tcount} = 0;//contar characteres en heap\n`;
        result.code += `${tchar} = 0;//char en heap\n`;
        result.code += `${linit}:\n`;
        result.code += `${tchar} = Heap[(int)${tcount}];\n`;
        result.code += `if(${tchar} != -1) goto ${lindex};\n`;
        result.code += `goto ${lfin};\n`;
        result.code += `${lindex}:\n`;
        result.code += `if(${tcount} == ${resultExpresion.value}) goto ${lresult};\n`;
        result.code += `${tcount} = ${tcount} + 1;\n`;
        result.code += `goto ${linit};\n`;
        result.code += `${lresult}:\n`;
        result.code += `${tresult} = H;\n`;
        result.code += `${tcount} = ${tresult};\n`;
        result.code += `Heap[(int)${tcount}] = ${tchar};\n`;
        result.code += `${tcount} = ${tcount} + 1;\n`;
        result.code += `Heap[(int)${tcount}] = -1;\n`;
        result.code += `${tcount} = ${tcount} + 1;\n`;
        result.code += `H = ${tcount};\n`;
        result.code += `goto ${lfin};\n`;
        result.code += `${lfin}:\n`;

        result.value = tresult;

        Singleton.deleteTemporaryIntoDisplay(resultAccess.value);
        Singleton.deleteTemporaryIntoDisplay(resultExpresion.value);
        Singleton.deleteTemporaryIntoDisplay(tcount);
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