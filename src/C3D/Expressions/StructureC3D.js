class StructureC3D extends ExpresionC3D{

    constructor(line,column,nameStructure,indexCasteo){
        super(line,column);
        this.nameStructure = nameStructure;
        this.indexCasteo = indexCasteo;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}