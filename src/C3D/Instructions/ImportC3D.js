class ImportC3D extends InstructionC3D{

    constructor(line,column,nameLibrary){
        super(line,column);
        this.nameLibrary = nameLibrary;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        result.code = `#include <${this.nameLibrary}>\n`;
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}