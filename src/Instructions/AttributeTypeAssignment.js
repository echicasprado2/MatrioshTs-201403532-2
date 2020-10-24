class AttributeTypeAssignment extends Instruction {
    
    constructor(line,column,identify,value){
        super(line,column);
        
        this.identify = identify;
        this.value = value;
        
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.identify}: `
        this.translatedCode += this.value instanceof Array ? `${this.getDataArray(this.value)}` : `${this.value.getTranslated()}`;
        return this.translatedCode;
    }

    getDataArray(array){
        let cadena = '[';
        for(let i = 0; i < array.length;i++){

            if(array[i] instanceof Array && i === 0 ){
                cadena += this.getDataArray(array[i]);

            }else if(array[i] instanceof Array){
                cadena += `,${this.getDataArray(array[i])}`

            }else if(array[i] instanceof Expresion && i == 0){
                cadena += `${array[i].getTranslated()}`;

            }else if(array[i] instanceof Expresion){
                cadena += `,${array[i].getTranslated()}`;
            }

        }
        return `${cadena}]`
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
                this.line,
                this.column,
                this.identify,
                null,
                e.toString(),
                null
            )
        );
    }

    executeSymbolsTable(e){
        return "";
    }

    execute(e) {
        this.value = this.value.getValue(e);
        return this;
    }

    getC3D(env){
        
    }

    fillTable(env){
        return null;
    }

    getSize(){
        return 0;
    }

}