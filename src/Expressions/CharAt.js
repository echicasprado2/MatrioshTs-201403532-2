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
        //TODO implement this
    }

}