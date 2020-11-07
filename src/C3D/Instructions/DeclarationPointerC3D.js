class DeclarationPointerC3D extends InstructionC3D{

    constructor(line,column,type,name,value){
        super(line,column);
        this.type = type;
        this.name = name;
        this.value = value;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        
        result.code = `${this.type.toString()} ${this.name[0]} = ${this.value};\n`;
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}