class AssignmentC3D extends InstructionC3D{

    constructor(line,column,nameVariable,expresion){
        super(line,column);
        this.nameVariable = nameVariable;
        this.expresion = expresion;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resultExpresion = this.expresion.optimizeByPeephole(listNodes,currentIndex);

        result.code = `${this.nameVariable} = ${resultExpresion.code};\n`;

        SingletonC3D.deleteTemporary(this.nameVariable);

        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}