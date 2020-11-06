class ValueC3D extends ExpresionC3D{

    constructor(line,column,valueType,value){
        super(line,column);
        this.valueType = valueType;
        this.value = value;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}