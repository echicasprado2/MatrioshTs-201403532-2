class ReturnC3D extends InstructionC3D{

    constructor(line,column,expresion){
        super(line,column);
        this.expresion = expresion;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resultExpresion;

        result.code = 'return';

        if(this.expresion != null){
            resultExpresion = this.expresion.optimizeByPeephole(listNodes,currentIndex);
            result.code += ` ${resultExpresion.value}`;
        }

        result.code += ';\n';
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}