class InstructionError extends Instruction {

    constructor(){
        super(0,0);
    }

    getTranslated(){
        return "";
    }

    translatedSymbolsTable(e){
        return "";
    }

    executeSymbolsTable(e){
        return "";
    }

    execute(e) {
        return null;
    }

    getC3D(env){
        return new RESULT();
    }

    fillTable(env){
        return null;
    }

    getSize(){
        return 0;
    }

}