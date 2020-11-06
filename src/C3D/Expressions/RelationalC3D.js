class RelationalC3D extends ExpresionC3D{

    constructor(line,column,operationType,exp1,exp2){
        super(line,column);
        this.operationType = operationType;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}