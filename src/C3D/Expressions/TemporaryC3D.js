class TemporaryC3D extends ExpresionC3D{

    constructor(line,column,nameTemporary){
        super(line,column);
        this.nameTemporary = nameTemporary;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        result.code = this.nameTemporary;

        SingletonC3D.deleteTemporary(this.nameTemporary);

        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}