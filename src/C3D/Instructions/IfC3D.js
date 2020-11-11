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
       let result = new RESULTC3D();
       let resultCondition = this.condition.optimizeByPeephole(listNodes,currentIndex);
       result.code += `if(${resultCondition.code}) goto ${this.nameTag};\n`;
       return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}