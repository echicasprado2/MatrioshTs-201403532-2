
var EnumOptimizationRule;
(function (EnumOptimizationRule){
    EnumOptimizationRule['RULE_1'] = 'RULE_1';
    EnumOptimizationRule['RULE_2'] = 'RULE_2';
    EnumOptimizationRule['RULE_3'] = 'RULE_3';
    EnumOptimizationRule['RULE_4'] = 'RULE_4';
    EnumOptimizationRule['RULE_5'] = 'RULE_5';
    EnumOptimizationRule['RULE_6'] = 'RULE_6';
    EnumOptimizationRule['RULE_7'] = 'RULE_7';
    EnumOptimizationRule['RULE_8'] = 'RULE_8';
    EnumOptimizationRule['RULE_9'] = 'RULE_9';
    EnumOptimizationRule['RULE_10'] = 'RULE_10';
    EnumOptimizationRule['RULE_11'] = 'RULE_11';
    EnumOptimizationRule['RULE_12'] = 'RULE_12';
    EnumOptimizationRule['RULE_13'] = 'RULE_13';
    EnumOptimizationRule['RULE_14'] = 'RULE_14';
    EnumOptimizationRule['RULE_15'] = 'RULE_15';
    EnumOptimizationRule['RULE_16'] = 'RULE_16';
})(EnumOptimizationRule || (EnumOptimizationRule = {}));

class OptimizationRule{

    constructor(enumOptimizationRule){
        this.enumOptimizationRule = enumOptimizationRule;
    }

    toString(){
        return this.enumOptimizationRule.toString().toLowerCase().replace("_", " ");
    }

}