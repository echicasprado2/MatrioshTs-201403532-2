class GoToC3D extends InstructionC3D{

    constructor(line,column,nameTag){
        super(line,column);
        this.nameTag = nameTag;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        result.code = `goto ${this.nameTag};\n`
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}