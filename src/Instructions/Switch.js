class Switch extends Instruction {

    constructor(linea,column,condition,cases){
        super(linea,column);

        this.condition = condition;
        this.casesList = cases;

        this.translatedCode = "";
        this.environment = null;
    }

    getTranslated(){
        this.translatedCode += `switch (${this.condition.getTranslated()}){\n`;

        for(var i = 0; i < this.casesList.length; i++){
            this.translatedCode += this.casesList[i].getTranslated();
        }

        this.translatedCode += "}\n\n";
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "SWITCH",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.SWITCH,""));
        this.condition.translatedSymbolsTable(env);
        this.casesList.translatedSymbolsTable(env);
    }

    execute(e) {
        var resultValueCase;
        var resultBlockCase;
        var env;
        var resultCondition = this.condition.getValue(e);
        
        for(var i = 0; i < this.casesList.length;i++){
            
            if((this.casesList[i]).isCase){
                resultValueCase = (this.casesList[i]).expression.getValue(e);
                
                if(resultValueCase.type.enumType != EnumType.ERROR){
                
                    if(resultCondition.type.enumType == resultValueCase.type.enumType && resultCondition.value == resultValueCase.value){
                        
                        env = new Environment(e,new EnvironmentType(EnumEnvironmentType.SWITCH,null));
                        if((this.casesList[i]).haveBlock){
                            resultBlockCase = (this.casesList[i]).execute(env);

                            if(resultBlockCase != null){
                                if(resultBlockCase instanceof Break){
                                    return null;
                                }else if(resultBlockCase instanceof Continue){
                                    return resultBlockCase;
                                }else if(resultBlockCase instanceof Return){
                                    return resultBlockCase;
                                }
                            }
                        
                        }
                    }
                }else{
                    ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumType.SEMANTIC),`el valor del case tiene errores`,e.enviromentType));
                }

            }else if(!(this.casesList[i]).isCase){//es default
                env = new Environment(e,new EnvironmentType(EnumEnvironmentType.SWITCH,null));
                if((this.casesList[i]).haveBlock){
                    resultBlockCase = (this.casesList[i]).execute(env);

                    if(resultBlockCase != null){
                        if(resultBlockCase instanceof Break){
                            return null;
                        }else if(resultBlockCase instanceof Continue){
                            return resultBlockCase;
                        }else if(resultBlockCase instanceof Return){
                            return resultBlockCase;
                        }
                    }
                
                }
            }
            
        }

        return null;
    }

    getC3D(env){
        let result = new RESULT();
        let resulCondition;
        let resulCase;
        let lexit = Singleton.getLabel();
        let resultCode = '';
        
        resulCondition = this.condition.getC3D(env);
        result.code += resulCondition.code;
        
        for(let item of this.casesList){
            resulCase = item.getC3D(this.environment);

            result.trueLabels.push(...resulCase.trueLabels);
            result.falseLabels.push(...resulCase.falseLabels);
            result.exitLabels.push(...resulCase.exitLabels);
            result.continueLabels.push(...resulCase.continueLabels);
            result.breakLabels.push(...resulCase.breakLabels);

            if(resulCase.trueLabels == 0){
                resulCase.trueLabels.push(Singleton.getLabel());
            }
            
            if(resulCase.falseLabels == 0){
                resulCase.falseLabels.push(Singleton.getLabel());
            }
        
            if(item.isCase){
                result.code += `if(${resulCondition.value} == ${resulCase.value}) goto ${resulCase.trueLabels[0]};\n`;
                result.code += `goto ${resulCase.falseLabels[0]};\n`;
                
            }else{
                let ldefault = Singleton.getLabel();
                result.code += `if(1 != 0) goto ${ldefault};\n`;
                resultCode += `${ldefault}:\n`;
            }
        
            resultCode += resulCase.code;
            
            if(item.isCase){
                result.code += `//condicion false case\n`;
                for(let lf of resulCase.falseLabels){
                    result.code += `${lf}:\n`;
                }
            }
        }

        result.code += resultCode;
        result.code += `//salida de switch\n`;
        result.breakLabels.push(lexit);
        for(let item of result.breakLabels){
            result.code += `${item}:\n`;
        }

        result.breakLabels = [];

        return result;
    }

    fillTable(env){
        this.environment = new Environment(env,new EnvironmentType(EnumEnvironmentType.SWITCH,null));
        this.environment.size = env.size;
        // Singleton.cleanPointerStackInit();
        
        for(let item of this.casesList){
            item.fillTable(this.environment);
        }

        return null;
    }

    getSize(){
        let counter = 0;
        for(let item of this.casesList){
            counter += item.getSize();
        }
        return counter;
    }


}