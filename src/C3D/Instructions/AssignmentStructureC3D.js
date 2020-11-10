class AssignmentStructureC3D extends InstructionC3D{

    constructor(line,column,nameStructure,indexCasteo,expresion){
        super(line,column);
        this.nameStructure = nameStructure;
        this.indexCasteo = indexCasteo;
        this.expresion = expresion;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resultIndex = this.indexCasteo.optimizeByPeephole(listNodes,currentIndex);
        let resultExpresion = this.expresion.optimizeByPeephole(listNodes,currentIndex);
        
        result.code += `${this.nameStructure}[${resultIndex.code}] = ${resultExpresion.code};\n`;
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}