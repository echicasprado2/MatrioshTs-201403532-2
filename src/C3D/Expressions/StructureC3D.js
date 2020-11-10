class StructureC3D extends ExpresionC3D{

    constructor(line,column,nameStructure,indexCasteo){
        super(line,column);
        this.nameStructure = nameStructure;
        this.indexCasteo = indexCasteo;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resultIndex = this.indexCasteo.optimizeByPeephole(listNodes,currentIndex);
        result.code = `${this.nameStructure}[${resultIndex.code}]`;
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}