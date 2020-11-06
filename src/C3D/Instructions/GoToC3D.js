class GoToC3D extends InstructionC3D{

    constructor(line,column,nameTag){
        super(line,column);
        this.nameTag = nameTag;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}