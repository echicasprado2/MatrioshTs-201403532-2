class PrintC3D extends InstructionC3D{

    constructor(line,column,valueString,expresion){
        super(line,column);
        this.valueString = valueString;
        this.expresion = expresion;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resultExpresion = this.expresion.optimizeByPeephole(listNodes,currentIndex);

        result.code = `printf(${this.valueString},${resultExpresion.code});\n`

        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}