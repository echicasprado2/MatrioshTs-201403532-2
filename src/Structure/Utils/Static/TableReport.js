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
  static nodesCompile = [];
  static nodesOptimizate = [];

  static cleanTranslated() {
    TableReport.nodesTranslated = [];
  }

  static cleanExecute() {
    TableReport.nodesExecute = [];
  }

  static cleanCompile(){
    TableReport.nodesCompile = [];
  }

  static cleanOptimizate(){
    TableReport.nodesOptimizate = [];
  }
  
  /**
   * @returns array with nodes of translate
   */
  static getNodesTranslated() {
    return TableReport.nodesTranslated;
  }
  
  /**
   * @returns array with node of execute
   */
  static getNodesExecute() {
    return TableReport.nodesExecute;
  }

  /**
   * @returns array with node of compile
   */
  static getNodesCompile(){
    return TableReport.nodesCompile;
  }

  /**
   * @returns array with node of optimizate
   */
  static getNodesOptimizate(){
    return TableReport.nodesOptimizate;
  }

  /**
   * 
   * @param {*} node add node 
   */
  static addTranslated(node) {
    if (node.typeEnviroment == EnumEnvironmentType.FUNCTION) {
      node.typeEnviroment = node.typeEnviroment.name;
    }
    TableReport.nodesTranslated.push(node);
  }

  /**
   * 
   * @param {*} node add node
   */
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

  /**
   * 
   * @param {*} node add node
   */  
  static addCompile(node){
    //TODO implement
  }

  /**
   * 
   * @param {*} node add node
   */  
  static addOptimizate(node){
    //TODO implement
  }


  /**
   * 
   * @param {*} map map with data
   * @returns string with data of map
   */
  static getMapData(map){
    var cadena = "";

    map.forEach( (element, key) => {
      cadena += `${key}: ${element.value}</br>`
    });

    return cadena;
  }

  /**
   * 
   * @param {*} array with values, this use array of array
   * @returns all data into array
   */
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

}
