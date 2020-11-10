class PointerC3D extends ExpresionC3D{

    constructor(line,column,namePointer){
        super(line,column);
        this.namePointer = namePointer;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        result.code = this.namePointer;
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}