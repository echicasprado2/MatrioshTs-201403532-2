class AssignmentC3D extends InstructionC3D{

    constructor(line,column,nameVariable,expresion){
        super(line,column);
        this.nameVariable = nameVariable;
        this.expresion = expresion;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();
        let resultExpresion = this.expresion.optimizeByPeephole(listNodes,currentIndex);

        if(resultExpresion.code == '' && resultExpresion.type.enumTypeC3D != EnumTypeC3D.TEMPORARY){
            let node = TableReportC3D.getLastNode();
            node.previousCode = `${this.nameVariable} = ${node.previousCode};`;

        }else if(resultExpresion.type.enumTypeC3D == EnumTypeC3D.TEMPORARY){
            if(this.nameVariable == resultExpresion.code){
                let node = TableReportC3D.getLastNode();

                switch(node.rule.enumOptimizationRule){
                    case EnumOptimizationRule.RULE_10:
                        node.rule.enumOptimizationRule = EnumOptimizationRule.RULE_6;
                        node.newCode = 'Codigo eliminado';
                        node.previousCode = `${this.nameVariable} = ${node.previousCode};`;
                        break;

                    case EnumOptimizationRule.RULE_11:
                        node.rule.enumOptimizationRule = EnumOptimizationRule.RULE_7;
                        node.newCode = 'Codigo eliminado';
                        node.previousCode = `${this.nameVariable} = ${node.previousCode};`;
                        break;

                    case EnumOptimizationRule.RULE_12:
                        node.rule.enumOptimizationRule = EnumOptimizationRule.RULE_8;
                        node.newCode = 'Codigo eliminado';
                        node.previousCode = `${this.nameVariable} = ${node.previousCode};`;
                        break;

                    case EnumOptimizationRule.RULE_13:
                        node.rule.enumOptimizationRule = EnumOptimizationRule.RULE_9;
                        node.newCode = 'Codigo eliminado';
                        node.previousCode = `${this.nameVariable} = ${node.previousCode};`;
                        break;
                }

            }

        }else{
            result.code = `${this.nameVariable} = ${resultExpresion.code};\n`;
        }


        SingletonC3D.deleteTemporary(this.nameVariable);

        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }
}