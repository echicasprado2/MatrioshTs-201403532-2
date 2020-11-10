class CallFunctionC3D extends ExpresionC3D{

    constructor(line,column,name){
        super(line,column);
        this.name = name;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        result.code = `${this.name}();\n`;
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}