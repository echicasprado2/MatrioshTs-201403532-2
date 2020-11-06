class CasteoC3D extends ExpresionC3D{

    constructor(line,column,type,expresionC3D){
        super(line,column);
        this.type = type;
        this.expresionC3D = expresionC3D;
    }

    optimizeByPeephole(listNodes,currentIndex){
        //TODO implements
    }

    optimizeByBlock(listNodes,currentIndex){
        //TODO implements
    }
}