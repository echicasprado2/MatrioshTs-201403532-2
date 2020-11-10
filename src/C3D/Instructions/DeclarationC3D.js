class DeclarationC3D extends InstructionC3D{

    constructor(line,column,type,name,value){
        super(line,column);
        this.type = type;
        this.name = name;
        this.value = value;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();

        if(SingletonC3D.isEmptyDisplayTemporary()){
            for(let item of this.name){
                SingletonC3D.addTemporary(item);
            }

        }else{
            let typeString = this.type.toString();
            let temp = '';

            for(let i = 0; i < this.name.length; i++){
                if(!SingletonC3D.existsTemporary(this.name[i])){
                    temp += (i == 0) ? `${this.name[i]}` : `, ${this.name[i]}`;
                }
            }
            
            result.code = (temp == '')? '\n' : `${typeString} ${temp};\n`;
        }

        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}