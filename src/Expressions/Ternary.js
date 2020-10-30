class Ternary extends Expresion {
    constructor(linea,column,condition,conditionTrue,conditionFalse){
        super(linea,column,null,null);
        this.condition = condition;
        this.conditionTrue = conditionTrue;
        this.conditionFalse = conditionFalse;
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.condition.getTranslated()} ? ${this.conditionTrue.getTranslated()} : ${this.conditionFalse.getTranslated()}`
        
        if (this.parentesis) {
            return `(${this.translatedCode})`;
        } else {
            return this.translatedCode;
        }
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    getValue(e) {
        var result = new Value(new TypeError(EnumType.ERRRO,""),"Error");
        var resultCondition;
        var resultTrue;
        var resultFalse;

        resultCondition = this.condition.getValue(e);

        if(resultCondition.type.enumType != EnumType.BOOLEAN || resultCondition.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de condicion es incorrecta`,e.enviromentType));
            return result;
        }
        
        if(resultCondition.value){
            resultTrue = this.conditionTrue.getValue(e);
            return resultTrue;
        }else{
            resultFalse = this.conditionFalse.getValue(e);
            return resultFalse;
        }
    }

    getC3D(env){
        let result = new RESULT();
        let resultCondition;
        let resultTrue;
        let resultFalse;
        let lexit;
        let tvalue;

        resultCondition = this.condition.getC3D(env);
        resultTrue = this.conditionTrue.getC3D(env);
        resultFalse = this.conditionFalse.getC3D(env);

        if(resultCondition.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de la condicion debe de ser boolean`,env.enviromentType));
            return result;
        }

        if(resultTrue.type.enumType != resultFalse.type.enumType){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El valor falso y verdadero, tienen que ser del mismo tipo`,env.enviromentType));
            return result;
        }

        lexit = Singleton.getLabel();
        tvalue = Singleton.getTemporary();

        result.code += `//------------  TERNARIO  ---------------\n`;
        result.code += resultCondition.code;
        
        result.code += `//------------ Por si la condicion es verdadera  ---------------\n`;
        for(let item of resultCondition.trueLabels){
            result.code += `${item}:\n`;
        }
        
        result.code += resultTrue.code;
        result.code += `${tvalue} = ${resultTrue.value};\n`;
        result.code += `goto ${lexit};\n`;
        
        result.code += `//------------ Por si la condicion es falsa  ---------------\n`;
        for(let item of resultCondition.falseLabels){
            result.code += `${item}:\n`;
        }
        
        result.code += resultFalse.code;
        result.code += `${tvalue} = ${resultFalse.value};\n`;
        result.code += `goto ${lexit};\n`;
        result.code += `${lexit}:\n`;
        result.code += `//------------ Salgo de ternario  ---------------\n`;

        result.trueLabels.push(...resultTrue.trueLabels,...resultFalse.trueLabels);
        result.falseLabels.push(...resultTrue.falseLabels,...resultFalse.falseLabels);
        result.breakLabels.push(...resultTrue.breakLabels,...resultFalse.breakLabels);
        result.continueLabels.push(...resultTrue.continueLabels,...resultFalse.continueLabels);
        result.exitLabels.push(...resultTrue.exitLabels,...resultFalse.exitLabels);
        result.type = resultTrue.type;
        result.value = tvalue;

        Singleton.deleteTemporaryIntoDisplay(resultTrue.value);
        Singleton.deleteTemporaryIntoDisplay(resultFalse.value);
        return result;
    }

    fillTable(env){
        return null;
    }

    getSize(){
        return 0;
    }

}