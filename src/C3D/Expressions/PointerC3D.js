class PointerC3D extends ExpresionC3D{

    constructor(line,column,namePointer){
        super(line,column);
        this.namePointer = namePointer;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        result.code = this.namePointer;
        result.value = this.namePointer;
        result.type.enumTypeC3D = EnumResultTypeC3D.POINTER;
        result.valueType.enumResultTypeC3D = EnumResultTypeC3D.POINTER;
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}