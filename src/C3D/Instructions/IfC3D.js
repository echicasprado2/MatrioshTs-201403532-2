class IfC3D extends InstructionC3D{

    constructor(line,column,condition,nameTag){
        super(line,column);
        this.condition = condition;
        this.nameTag = nameTag;
    }

    optimizeByPeephole(listNodes,currentIndex){
        /*TODO implements use this for
            optimization rule 2
            optimization rule 3
            optimization rule 4
        */
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}