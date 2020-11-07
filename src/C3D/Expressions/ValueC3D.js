class ValueC3D extends ExpresionC3D{

    constructor(line,column,valueType,value){
        super(line,column);
        this.valueType = valueType;
        this.value = value;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();

        result.value = this.value;

        if(this.valueType.enumValueTypeC3D == EnumValueTypeC3D.STRING) result.type.enumResultTypeC3D == EnumResultTypeC3D.STRING;
        else result.type.enumResultTypeC3D = EnumResultTypeC3D.NUMBER;

        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}