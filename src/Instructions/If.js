class If extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} ifList 
     * @param {*} haveElse 
     * @param {*} blockElse 
     */
    constructor(linea,column,ifList,blockElse,haveElse){
        super(linea,column);

        this.ifList = ifList;
        this.haveElse = haveElse;
        this.blockElse = blockElse;
        this.translatedCode = "";
        this.enviromentElse = null;
    }

    getTranslated(){

        for(var i = 0;i<this.ifList.length;i++){
            this.translatedCode += `${this.ifList[i].getTranslated()}`
        }

        if(this.haveElse){
            this.translatedCode += `else${this.blockElse.getTranslated()}`
        }

        return `${this.translatedCode}\n\n`;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "IF",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.IF,""));
        this.ifList.translatedSymbolsTable(env);
        
        if(this.haveElse){
            this.blockElse.translatedSymbolsTable(env);
        }
    }

    execute(e) {
        var resultBlockIf;
        

        for(var i = 0; i < this.ifList.length; i++){
            resultBlockIf = (this.ifList[i]).execute(e);

            if((this.ifList[i]).conditionTrue){
                if(resultBlockIf != null){
                    if(resultBlockIf instanceof Break){
                        return resultBlockIf;
                    }else if(resultBlockIf instanceof Continue){
                        return resultBlockIf;
                    }else if(resultBlockIf instanceof Return){
                        return resultBlockIf;
                    }
                }
                return null;
            }
        }

        if(this.haveElse){
            var envIf = new Environment(e,new EnvironmentType(EnumEnvironmentType.IF,null));
            var resultBlockElse = this.blockElse.execute(envIf);

            if(resultBlockElse != null){
                if(resultBlockElse instanceof  Break){
                    return resultBlockElse;
                }else if(resultBlockElse instanceof Continue){
                    return resultBlockElse;
                }else if(resultBlockElse instanceof Return){
                    return resultBlockElse;
                }else{
                    console.log("error con else");
                }
            }

        }

        return null;
    }

    getC3D(env){
        let result = new RESULT();
        let resultIf;

        for(let item of this.ifList){
            resultIf = item.getC3D(env);
            result.code += resultIf.code;
            
            for(let fl of resultIf.falseLabels){
                result.code += `${fl}:\n`;
            }
            result.exitLabels.push(...resultIf.exitLabels);
        }
        
        if(this.haveElse){   
            resultIf = this.blockElse.getC3D(this.enviromentElse);
            result.code += resultIf.code;
        }

        for(let le of result.exitLabels){
            result.code += `${le}:\n`;
        }

        return result;
    }

    fillTable(env){

        for(let item of this.ifList){
            item.fillTable(env);
        }

        if(this.haveElse){
            this.enviromentElse = new Environment(env,new EnvironmentType(EnumEnvironmentType.IF,null));
            this.blockElse.fillTable(this.enviromentElse);
        }

        return null;
    }

    getSize(){
        return 0;
    }

}