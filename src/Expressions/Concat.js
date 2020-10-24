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

    getC3D(env,code){
        //TODO implement this
    }
}