class BlockC3D extends InstructionC3D{

    constructor(line,column,sentences){
        super(line,column);
        this.sentences = sentences;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        let temp;

        //TODO this use for block optimization rule 5

        for(let i = 0; i < this.sentences.length;i++){
            temp = this.sentences[i].optimizeByPeephole(listNodes,i);
            result.code += temp.code;
        }

        // for(let item of this.sentences){
        //     temp = item.optimizeByPeephole(listNodes,currentIndex);
        //     result.code += temp.code;
        // }

        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}