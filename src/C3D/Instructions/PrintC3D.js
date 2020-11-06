class PrintC3D extends InstructionC3D{

    constructor(line,column,valueString,expresion){
        super(line,column);
        this.valueString = valueString;
        this.expresion = expresion;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}