/**
 * @enum type of optimization use
 */
var EnumOptimizationType;
(function (EnumOptimizationType){
    EnumOptimizationType['MIRILLA'] = 'MIRILLA';
    EnumOptimizationType['BLOQUE'] = 'BLOQUE';
})
(EnumOptimizationType || (EnumOptimizationType = {}));

/**
 * @class type of optimization
 */
class OptimizationType{

    constructor(enumOptimizationType) {
        this.enumOptimizationType = enumOptimizationType;
    }

    toString(){
        return this.enumOptimizationType.toString().toLowerCase();
    }

}