class ASTC3D{

    constructor(instructions){
        this.instructions = instructions;
    }

    getOptimize(){
        SingletonC3D.cleanDisplayTemporary();
        PrintConsole.cleanConsole();
        let codeHeader = '';
        let codeBody = '';

        for(let item of this.instructions){
            if(item instanceof ImportC3D || item instanceof DeclarationStructureC3D || item instanceof DeclarationPointerC3D){
                codeHeader += item.optimizeByPeephole(this.instructions,0).code;

            }else if(item instanceof DeclarationC3D){
                item.optimizeByPeephole(this.instructions,0);
            }
        }


        for(let i = 0;i < this.instructions.length;i++){

            if(!(this.instructions[i] instanceof ImportC3D) &&
             !(this.instructions[i] instanceof DeclarationStructureC3D) &&
             !(this.instructions[i] instanceof DeclarationPointerC3D) &&
             !(this.instructions[i] instanceof DeclarationC3D)){
                 codeBody += this.instructions[i].optimizeByPeephole(this.instructions,i).code;
             }
        }

        for(let item of this.instructions){
            if(item instanceof DeclarationC3D){
                codeHeader += item.optimizeByPeephole(this.instructions,0).code;
            }
        }

        return codeHeader + codeBody
    }
}