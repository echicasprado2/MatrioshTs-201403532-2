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
        //TODO implement this
        return '';
    }

    getC3D(env){
        //TODO implement this
    }

    fillTable(env){
        return null;
    }
}