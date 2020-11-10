class NodeReportOptimizateC3D{

    /**
     * 
     * @param {Number} line 
     * @param {String} previousCode 
     * @param {String} newCode 
     * @param {OptimizationRule} OptimizationRule
     * @param {OptimizationType} optimizationType 
     */
    constructor(line,previousCode,newCode,rule,optimizationType){
        this.line = line;
        this.previousCode = previousCode;
        this.newCode = newCode;
        this.rule = rule;
        this.optimizationType = optimizationType;
    }   
}

class TableReportC3D{
    static nodesOptimization = [];

    static cleanOptimization(){
        TableReportC3D.nodesOptimization = [];
    }

    /**
     * 
     * @param {NodeReportOptimizateC3D} node 
     */
    static addNodeOptimization(node){
        TableReportC3D.nodesOptimization.push(node);
    }

    static getNodesOptimization(){
        return TableReportC3D.nodesOptimization;
    }

    static isEmplyTableReportOptimization(){
        return (TableReportC3D.nodesOptimization.length == 0) ? true : false;
    }

}