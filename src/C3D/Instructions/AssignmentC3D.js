class AssignmentC3D extends InstructionC3D{

    constructor(line,column,nameVariable,expresion){
        super(line,column);
        this.nameVariable = nameVariable;
        this.expresion = expresion;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}