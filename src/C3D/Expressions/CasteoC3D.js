class CasteoC3D extends ExpresionC3D{

    constructor(line,column,type,expresionC3D){
        super(line,column);
        this.type = type;
        this.expresionC3D = expresionC3D;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resultExpresion = this.expresionC3D.optimizeByPeephole(listNodes,currentIndex);
        result.value = (this.haveParentesis)? `((${this.type.toString()})${resultExpresion.code})`:`(${this.type.toString()})${resultExpresion.code}`;
        result.code = (this.haveParentesis)? `((${this.type.toString()})${resultExpresion.code})`:`(${this.type.toString()})${resultExpresion.code}`;

        SingletonC3D.deleteTemporary(this.expresionC3D);

        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}