class ReturnC3D extends InstructionC3D{

    constructor(line,column,expresion){
        super(line,column);
        this.expresion = expresion;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}