class IfC3D extends InstructionC3D{

    constructor(line,column,condition,nameTag){
        super(line,column);
        this.condition = condition;
        this.nameTag = nameTag;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}