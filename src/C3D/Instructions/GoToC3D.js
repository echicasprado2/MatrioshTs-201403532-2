class GoToC3D extends InstructionC3D{

    constructor(line,column,nameTag){
        super(line,column);
        this.nameTag = nameTag;
    }

    optimizeByPeephole(listNodes,currentIndex){
        let result = new RESULTC3D();

        result.code = `goto ${this.nameTag};\n`
        this.deleteDeadCode(listNodes,currentIndex);
        return result;
    }

    optimizeByBlock(listNodes,currentIndex){
        return this.optimizeByPeephole(listNodes,currentIndex);
    }

    deleteDeadCode(listNodes,currentIndex){
        const index = currentIndex + 1;
        let node;
        let nodeDead;
        let nodeTag;
        let deadCode = `goto ${this.nameTag};<br>`;
        let newCode = `goto ${this.nameTag};<br>`;
        let rule = new OptimizationRule(EnumOptimizationRule.RULE_1);
        let optimizationType = new OptimizationType(EnumOptimizationType.MIRILLA);
        let listNodesTemp;

        if(!this.validTagShowLast(listNodes,currentIndex)) return;

        while(true){
            node = listNodes[index];
                
            if(node instanceof TagC3D && node.nameTag == this.nameTag){
                nodeTag = node.optimizeByPeephole(listNodes,currentIndex);
                newCode = `${newCode}${nodeTag.code}`;
                   
                TableReportC3D.addNodeOptimization(new NodeReportOptimizateC3D(this.line,deadCode,newCode,rule,optimizationType));
                return;
            }else{
                listNodesTemp = this.getNewListNodes(listNodes,index);
                if(listNodesTemp.length > 0){
                    nodeDead = node.optimizeByPeephole(listNodesTemp,0);
                    deadCode += (nodeDead.code == '')?'':`${nodeDead.code}<br>`;
                    listNodes.splice(index,1);
                }else{
                    return;
                }
            }
        }

    }

    getNewListNodes(listNodes,initIndex){
        let temp = [];
        for(let i = initIndex; i < listNodes.length;i++){
            temp.push(listNodes[i]);
        }
        return temp;
    }

    validTagShowLast(listNodes,currentIndex){
        let index = 0;
        let node = null;

        for(let i = 1;i < listNodes.length; i++){
            index = currentIndex + i;
            node = listNodes[index];
            if(node instanceof TagC3D && node.nameTag == this.nameTag) return true;
        }
        return false;
    }

}