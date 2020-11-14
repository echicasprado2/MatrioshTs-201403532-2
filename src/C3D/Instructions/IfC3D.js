class IfC3D extends InstructionC3D{

    constructor(line,column,condition,nameTag){
        super(line,column);
        this.condition = condition;
        this.nameTag = nameTag;
    }

    optimizeByPeephole(listNodes,currentIndex){
        /*TODO implements use this for
            optimization rule 2
            optimization rule 3
            optimization rule 4
        */
        switch(this.validOptimizationToUse(listNodes,currentIndex)){

            case 2:
                return this.makeOptimization2(listNodes,currentIndex);

            case 3:
                return this.makeOptimization3(listNodes,currentIndex);

            case 4:
                return this.makeOptimization4(listNodes,currentIndex);

            default:
                return this.makeDefault(listNodes,currentIndex);
        }

    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }

    validOptimizationToUse(listNodes,currentIndex){
        if(listNodes[currentIndex+1] instanceof GoToC3D && listNodes[currentIndex+2] instanceof TagC3D && this.nameTag == listNodes[currentIndex + 2].nameTag){
            return 2;
        }

        let resultExp1 = this.condition.exp1.optimizeByPeephole(listNodes,currentIndex);
        let resultExp2 = this.condition.exp2.optimizeByPeephole(listNodes,currentIndex);

        if(resultExp1.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE && resultExp2.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){
            if(this.isTrueCondition(resultExp1.value,resultExp2.value,this.condition.operationType.toString())){
                if(listNodes[currentIndex + 1] instanceof GoToC3D) return 3;
                else return 0;
        
            }else{
                if(listNodes[currentIndex +1] instanceof GoToC3D) return 4;
                else return 0;
            }
        }

    }


    isTrueCondition(val1,val2,operation){
        switch(operation){
            case '==':
                return val1 == val2;
            case '!=':
                return val1 != val2;
            case '>':
                return val1 > val2;
            case '>=':
                return val1 >= val2;
            case '<':
                return val1 < val2;
            case '<=':
                return val1 <= val2;
        }
    }

    changeCondition(operation){
        switch(operation){
            case '==':
                return '!=';
            case '!=':
                return '==';
            case '>':
                return '<';
            case '>=':
                return '<=';
            case '<':
                return '>';
            case '<=':
                return '>=';
        }
    }

    makeOptimization2(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resultExp1 = this.condition.exp1.optimizeByPeephole(listNodes,currentIndex);
        let resultExp2 = this.condition.exp2.optimizeByPeephole(listNodes,currentIndex);
        let nameGoto = listNodes[currentIndex+1].nameTag;

        let rule = new OptimizationRule(EnumOptimizationRule.RULE_2);
        let optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
        let oldCode = `if(${resultExp1.value} ${this.condition.operationType.toString()} ${resultExp2.value}) goto ${this.nameTag};`;
        oldCode += `<br>goto ${nameGoto};`;
        oldCode += `<br>${listNodes[currentIndex+2].nameTag}:`;
        
        result.code += `if(${resultExp1.value} ${this.changeCondition(this.condition.operationType.toString())} ${resultExp2.value}) goto ${nameGoto};\n`;
    
        TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,oldCode,result.code,rule,optimizationType));

        SingletonC3D.deleteObjectIntoList(listNodes,currentIndex+1);
        return result
    }

    makeOptimization3(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resutlCondition = this.condition.optimizeByPeephole(listNodes,currentIndex);

        let rule = new OptimizationRule(EnumOptimizationRule.RULE_3);
        let optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
        let oldCode = '';

        result.code += `if(${resutlCondition.code}) goto ${this.nameTag};\n`;
        
        oldCode = `${result.code}<br>`;
        oldCode += `goto ${listNodes[currentIndex + 1].nameTag};`;

        TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,oldCode,result.code,rule,optimizationType));

        SingletonC3D.deleteObjectIntoList(listNodes,currentIndex+1);
        return result;
    }

    makeOptimization4(listNodes,currentIndex){
        let resultGoto;
        let resutlCondition = this.condition.optimizeByPeephole(listNodes,currentIndex);

        let rule = new OptimizationRule(EnumOptimizationRule.RULE_4);
        let optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
        let oldCode = `if(${resutlCondition.code}) goto ${this.nameTag};<br>`;
        let newCode = `goto ${listNodes[currentIndex+1].nameTag};`;
        
        oldCode += newCode;

        resultGoto = listNodes[currentIndex+1].optimizeByPeephole(listNodes,currentIndex+1);

        TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,oldCode,newCode,rule,optimizationType));

        SingletonC3D.deleteObjectIntoList(listNodes,currentIndex);

        return resultGoto;
    }

    makeDefault(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resultCondition = this.condition.optimizeByPeephole(listNodes,currentIndex);
        result.code += `if(${resultCondition.code}) goto ${this.nameTag};\n`;
        return result;
    }

}