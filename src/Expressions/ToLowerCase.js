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
        //TODO implement this
    }

}