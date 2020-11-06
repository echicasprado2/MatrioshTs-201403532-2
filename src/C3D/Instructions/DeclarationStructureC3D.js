class DeclarationStructureC3D extends InstructionC3D{

    constructor(line,column,type,name,value){
        super(line,column);
        this.type = type;
        this.name = name;
        this.value = value;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}