class FunctionC3D extends InstructionC3D{

    constructor(line,column,type,name,block){
        super(line,column);
        this.type = type;
        this.name = name;
        this.block = block;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}