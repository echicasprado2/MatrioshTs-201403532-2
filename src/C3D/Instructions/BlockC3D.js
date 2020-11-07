class BlockC3D extends InstructionC3D{

    constructor(line,column,sentences){
        super(line,column);
        this.sentences = sentences;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        let temp;

        for(let item of this.sentences){
            temp = item.optimizeByPeephole(listNodes,currentIndex);
            result.code += temp.code;
        }

        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}