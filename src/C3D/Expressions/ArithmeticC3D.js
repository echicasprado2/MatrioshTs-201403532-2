class ArithmeticC3D extends ExpresionC3D{

    constructor(line,column,operationType,exp1,exp2){
        super(line,column);
        this.operationType = operationType;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result;
        let resultExpresion1 = this.exp1.optimizeByPeephole(listNodes,currentIndex);
        let resultExpresion2 = this.exp2.optimizeByPeephole(listNodes,currentIndex);

        switch(this.operationType.enumOperationTypeC3D){
            case EnumOperationTypeC3D.PLUS:
                result = this.getPlus(resultExpresion1,resultExpresion2);
                break;

            case EnumOperationTypeC3D.MINUS:
                result = this.getMinus(resultExpresion1,resultExpresion2);
                break;

            case EnumOperationTypeC3D.MULTIPLICATION:
                result = this.getMultiplication(resultExpresion1,resultExpresion2);
                break;

            case EnumOperationTypeC3D.DIVISION:
                result = this.getDivision(resultExpresion1,resultExpresion2);
                break;

            case EnumOperationTypeC3D.MODULE:
                result = this.getModule(resultExpresion1,resultExpresion2);
                break;
            
            default:
                result = new RESULTC3D();
                break;
        }
        
        if(this.haveParentesis){
            result.code = `(${result.code})`;
        }

        return result;
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
                result.type = resultExp1.valueType;

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

    getMinus(resultExp1,resultExp2){
        let result = new RESULTC3D();
        let rule;
        let optimizationType;
        let previousCode = '';
        let newCode = '';

        if(resultExp1.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE && resultExp2.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){
            if(resultExp1.value == '0' && resultExp2.value == '0'){
                rule = new OptimizationRule(EnumOptimizationRule.RULE_11);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = '0 - 0';
                newCode = 'Codigo eliminado';
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp2.value == '0'){
                result.type = resultExp1.type;
                result.value = resultExp1.value;
                result.code = resultExp1.value;
                
                rule = new OptimizationRule(EnumOptimizationRule.RULE_11);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} - 0`;
                newCode = `${resultExp1.value}`;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;
            }else{
                result.type = resultExp1.type;
                result.code = `${resultExp1.value} - ${resultExp2.value}`;
                return result;
            }

        }else if(resultExp2.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){

            if(resultExp2.value == '0'){
                result.type = resultExp1.type;
                result.value = resultExp1.value;
                result.code = resultExp1.value;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_11);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} - 0`;
                newCode = `${resultExp1.value}`;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else{
                result.type = resultExp1.type;
                result.code = `${resultExp1.value} - ${resultExp2.value}`;
                return result;
            }

        }else{
            result.type = resultExp1.type;
            result.code = `${resultExp1.value} - ${resultExp2.value}`;
            return result;
        }

    }

    getMultiplication(resultExp1,resultExp2){
        let result = new RESULTC3D();
        let rule;
        let optimizationType;
        let previousCode = '';
        let newCode = '';

        if(resultExp1.valueType.enumOperationTypeC3D == EnumResultTypeC3D.VALUE && resultExp2.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){

            if(resultExp1.value == '0' || resultExp2.value == '0'){
                result.type = resultExp1.type;
                result.value = '0';
                result.code = '0';

                rule = new OptimizationRule(EnumOptimizationRule.RULE_15);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = '0';
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp1.value == '1' && resultExp2.value == '1'){
                result.type = resultExp1.type;
                result.value = '1';
                result.code = '1';

                rule = new OptimizationRule(EnumOptimizationRule.RULE_12);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = '1';
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;
            }else if(resultExp1.value == '1' && resultExp2.value != '1'){
                result.type = resultExp2.type;
                result.value = resultExp2.value;
                result.code = resultExp2.code;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_12);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = resultExp2.code;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp1.value != '1' && resultExp2.value == '1'){
                result.type = resultExp1.type;
                result.value = resultExp1.value;
                result.code = resultExp1.code;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_12);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = resultExp1.code;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp1.value == '2' && resultExp2.value != '2'){
                result.type = resultExp2.type;
                result.code = `${resultExp2.value} + ${resultExp2.value}`;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_14);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = `${resultExp2.value} + ${resultExp2.value}`;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp1.value != '2' && resultExp2.value == '2'){
                result.type = resultExp1.type;
                result.code = `${resultExp1.value} + ${resultExp1.value}`;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_14);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = `${resultExp1.value} + ${resultExp1.value}`;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else{
                result.code = `${resultExp1.value} * ${resultExp2.value}`;
                return result;
            }

        }else if(resultExp1.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){

            if(resultExp1.value == '0'){
                result.type = resultExp1.type;
                result.value = '0';
                result.code = '0';

                rule = new OptimizationRule(EnumOptimizationRule.RULE_15);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = '0';
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp1.value == '1'){
                result.type = resultExp2.type;
                result.value = resultExp2.value;
                result.code = resultExp2.code;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_12);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = resultExp2.code;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp1.value =='2'){
                result.type = resultExp2.type;
                result.code = `${resultExp2.value} + ${resultExp2.value}`;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_14);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = `${resultExp2.value} + ${resultExp2.value}`;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else{
                result.code = `${resultExp1.value} * ${resultExp2.value}`;
                return result;
            }


        }else if(resultExp2.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){

            if(resultExp2.value == '0'){
                result.type = resultExp2.type;
                result.value = '0';
                result.code = '0';

                rule = new OptimizationRule(EnumOptimizationRule.RULE_15);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = '0';
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp2.value == '1'){
                result.type = resultExp1.type;
                result.value = resultExp1.value;
                result.code = resultExp1.code;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_12);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = resultExp1.code;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp2.value == '2'){
                result.type = resultExp1.type;
                result.code = `${resultExp1.value} + ${resultExp1.value}`;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_14);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} * ${resultExp2.value}`;
                newCode = `${resultExp1.value} + ${resultExp1.value}`;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else{
                result.code = `${resultExp1.value} * ${resultExp2.value}`;
                return result;
            }

        }else{
            result.type = resultExp1.type;
            result.code = `${resultExp1.value} * ${resultExp2.value}`;
            return result;
        }

    }

    getDivision(resultExp1,resultExp2){
        let result = new RESULTC3D();
        let rule;
        let optimizationType;
        let previousCode = '';
        let newCode = '';

        if(resultExp1.valueType.enumOperationTypeC3D == EnumResultTypeC3D.VALUE && resultExp2.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){

            if(resultExp2.value == '0'){
                result.type = resultExp2.type;
                result.value = '0';
                result.code = '0';

                rule = new OptimizationRule(EnumOptimizationRule.RULE_16);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} / ${resultExp2.value}`;
                newCode = '0';
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp2.value == '1'){
                result.type = resultExp1.type;
                result.value = resultExp1.value;
                result.code = resultExp1.code;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_13);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} / ${resultExp2.value}`;
                newCode = resultExp1.value;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else{
                result.code = `${resultExp1.value} / ${resultExp2.value}`;
                return result;
            }

        }else if(resultExp1.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){

            if(resultExp1.value == '0'){
                result.type = resultExp1.type;
                result.value = '0';
                result.code = '0';

                rule = new OptimizationRule(EnumOptimizationRule.RULE_16);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} / ${resultExp2.value}`;
                newCode = '0';
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else{
                result.code = `${resultExp1.value} / ${resultExp2.value}`;
                return result;
            }

        }else if(resultExp2.valueType.enumResultTypeC3D == EnumResultTypeC3D.VALUE){
            
            if(resultExp2.value == '0'){
                result.type = resultExp2.type;
                result.value = '0';
                result.code = '0';

                rule = new OptimizationRule(EnumOptimizationRule.RULE_16);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} / ${resultExp2.value}`;
                newCode = '0';
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else if(resultExp2.value == '1'){
                result.type = resultExp1.type;
                result.value = resultExp1.value;
                result.code = resultExp1.code;

                rule = new OptimizationRule(EnumOptimizationRule.RULE_13);
                optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
                previousCode = `${resultExp1.value} / ${resultExp2.value}`;
                newCode = resultExp1.value;
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,previousCode,newCode,rule,optimizationType));

                return result;

            }else{
                result.code = `${resultExp1.value} / ${resultExp2.value}`;
                return result;
            }

        }else{
            result.type = resultExp1.type;
            result.code = `${resultExp1.value} / ${resultExp2.value}`;
            return result;
        }

    }

    getModule(resultExp1,resultExp2){
        let result = new RESULTC3D();
        result.code = `${resultExp1.code} % ${resultExp2.code}`
        return result;
    }

}