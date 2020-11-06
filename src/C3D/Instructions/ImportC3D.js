class ImportC3D extends InstructionC3D{

    constructor(line,column,nameLibrary){
        super(line,column);
        this.nameLibrary = nameLibrary;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}