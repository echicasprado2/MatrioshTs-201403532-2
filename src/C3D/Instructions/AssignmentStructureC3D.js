class AssignmentStructureC3D extends InstructionC3D{

    constructor(line,column,nameStructure,indexCasteo,expresion){
        super(line,column);
        this.nameStructure = nameStructure;
        this.indexCasteo = indexCasteo;
        this.expresion = expresion;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}