class RelationalC3D extends ExpresionC3D{

    constructor(line,column,operationType,exp1,exp2){
        super(line,column);
        this.operationType = operationType;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resultExp1 = this.exp1.optimizeByPeephole(listNodes,currentIndex);
        let resultExp2 = this.exp2.optimizeByPeephole(listNodes,currentIndex);

        result.valueType.enumResultTypeC3D = EnumResultTypeC3D.RELATION;
        result.code = (this.haveParentesis)?`(${resultExp1.code} ${this.operationType.toString()} ${resultExp2.code})`:`${resultExp1.code} ${this.operationType.toString()} ${resultExp2.code}`;
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}