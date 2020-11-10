class ArithmeticC3D extends ExpresionC3D{

    constructor(line,column,operationType,exp1,exp2){
        super(line,column);
        this.operationType = operationType;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let resultExpresion1 = this.exp1.optimizeByPeephole(listNodes,currentIndex);
        let resultExpresion2 = this.exp2.optimizeByPeephole(listNodes,currentIndex);

        switch(this.operationType.enumOperationTypeC3D){
            case EnumOperationTypeC3D.PLUS:
                return this.getPlus(resultExpresion1,resultExpresion2);
        }
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }

    getPlus(resultExp1,resultExp2){
        let result = new RESULTC3D();
        let rule;
        let previousCode = '';
        let newCode = '';
        let optimizationType;

        if(resultExp1.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE && resultExp2.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){
            if(resultExp1.value == '0' && resultExp2.value == '0'){
                rule = new OptimizationRule(EnumOptimizationRule.RULE_10);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = '0 + 0';
                newCode = 'Codigo eliminado';
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));
                
                return result;

            }else if(resultExp1.value != '0' && resultExp2.value == '0'){
                result.type = resultExp1.type;
                result.code = resultExp1.value;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_10);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} + 0`;
                newCode = `${resultExp1.value}`;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp1.value == '0' && resultExp2.value != '0'){
                result.type = resultExp2.type;
                result.code = resultExp2.value;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_10);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `0 + ${resultExp2.value}`;
                newCode = `${resultExp1.value}`;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else{
                result.type = resultExp1.type;
                result.code = `${resultExp1.value} + ${resultExp2.value}`;
                return result;
            }

        }else if(resultExp1.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){
            if(resultExp1.value == '0'){
                result.type = resultExp2.type
                result.code = resultExp2.code;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_10);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `0 + ${resultExp2.value}`;
                newCode = `${resultExp2.value}`;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else{
                result.type = resultExp1.type;
                result.code = `${resultExp1.value} + ${resultExp2.value}`;
                return result;
            }

        }else if(resultExp2.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){
            if(resultExp2.value == '0'){
                result.type = resultExp1.type;
                result.code = resultExp1.code;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_10);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} + 0`;
                newCode = `${resultExp1.value}`;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else{
                result.type = resultExp2.type;
                result.code = `${resultExp1.value} + ${resultExp2.value}`;
                return result;
            }

        }else{
            result.type = resultExp1.type;
            result.code = `${resultExp1.value} + ${resultExp2.value}`;
            return result;
        }

    }

}