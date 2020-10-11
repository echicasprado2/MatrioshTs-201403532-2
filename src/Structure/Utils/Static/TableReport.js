class NodeTableSymbols {
  
  /**
   * 
   * @param {*} line 
   * @param {*} column 
   * @param {*} name 
   * @param {*} type 
   * @param {*} typeDeclaration 
   * @param {*} typeValue 
   * @param {*} size 
   * @param {*} position 
   * @param {*} dimensions 
   * @param {*} typeEnviroment 
   * @param {*} value 
   */
  constructor(line, column, name, type, typeDeclaration, typeValue, size, position, dimensions, typeEnviroment, value) {
    //TODO update all use new NodeTableSymbols
    this.line = line;
    this.column = column;
    this.name = name;
    this.type = type;
    this.typeDeclaration = typeDeclaration;
    this.typeValue = typeValue;
    this.size = size;
    this.position = position;
    this.dimensions = dimensions;
    this.typeEnviroment = typeEnviroment;
    this.value = value;
  }
}

class TableReport {
  static nodesTranslated = [];
  static nodesExecute = [];

  static cleanTranslated() {
    TableReport.nodesTranslated = [];
  }

  static cleanExecute() {
    TableReport.nodesExecute = [];
  }

  static addTranslated(node) {
    if (node.typeEnviroment == EnumEnvironmentType.FUNCTION) {
      node.typeEnviroment = node.typeEnviroment.name;
    }
    TableReport.nodesTranslated.push(node);
  }

  static getNodesTranslated() {
    return TableReport.nodesTranslated;
  }

  static getNewNodeWithDataSymbol(symbol){
    let newValue = new NodeTableSymbols();
  }

  static addExecute(node) {
    //TODO update data for symbols save and in this node add attributes
    for (var i = 0; i < TableReport.nodesExecute.length; i++) {

        if(TableReport.nodesExecute[i].typeEnviroment.enumEnvironmentType == node.typeEnviroment.enumEnvironmentType){
      
          if(node.typeEnviroment.enumEnvironmentType == EnumEnvironmentType.TYPE){
      
            if(TableReport.nodesExecute[i].typeEnviroment.name == node.typeEnviroment.name){
      
              if (TableReport.nodesExecute[i].name == node.name) {
                TableReport.nodesExecute.splice(i, 1, node);
                return;
              }
            }
          }else{
            if (TableReport.nodesExecute[i].name == node.name) {
              
              if(node.value  instanceof Array){
                node.value = TableReport.getRealValue(node.value);

              }else if(node.value instanceof Map){
                node.value = TableReport.getMapData(node.value);
              }

              TableReport.nodesExecute.splice(i, 1, node);
              return;
            }
          }
        }
    }
    
    if(node.value  instanceof Array){
      node.value = TableReport.getRealValue(node.value);

    }else if(node.value instanceof Map){
      node.value = TableReport.getMapData(node.value);
    }

    TableReport.nodesExecute.push(node);
  }

  static getMapData(map){
    var cadena = "";

    map.forEach( (element, key) => {
      cadena += `${key}: ${element.value}</br>`
    });

    return cadena;
  }

  static getRealValue(arrayValues){
    var cadena = "";
    for(var i = 0; i < arrayValues.length;i++){
      if(arrayValues[i] instanceof Array){
        cadena += ` ${TableReport.getRealValue(arrayValues[i])}`;

      }else{
        cadena += ` ${arrayValues[i].value}`;
      }
    }
    return cadena;
  }

  static getNodesExecute() {
    return TableReport.nodesExecute;
  }



}
