class FunctionC3D extends InstructionC3D{

    constructor(line,column,type,name,block){
        super(line,column);
        this.type = type;
        this.name = name;
        this.block = block;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        result.code = `\n${this.type.toString()} ${this.name}(){\n`;
        result.code += this.block.optimizeByPeephole(listNodes,currentIndex).code;
        result.code += '}\n';
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}