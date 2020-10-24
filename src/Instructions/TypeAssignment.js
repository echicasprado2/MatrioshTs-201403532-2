class TypeAssignment extends Instruction {

    constructor(linea,column,identify,attributes){
        super(linea,column);

        this.identify = identify;
        this.attributes = attributes;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.identify}:{`;

        for(var i =0;i < this.attributes.length;i++){
            if(i == (this.attributes.length - 1)){
                this.translatedCode += `${this.attributes[i].getTranslated()}`;
            }else{
                this.translatedCode += `${this.attributes[i].getTranslated()},`;
            }
        }

        return `${this.translatedCode}}`;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              this.identify,
              null,
              e.enviromentType,
              null
            )
        );
        this.attributes.translatedSymbolsTable(e);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        console.log("llego a typeassignment");
        //TODO implemented this
        throw new Error("Method not implemented.");
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