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
  constructor(line, column, name, type, typeDeclaration, typeValue, size, position, dimensions, typeEnviroment, location,value) {
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
    this.location = location;
    this.value = value;
  }
}

class TableReport {
  static nodesTranslated = [];
  static nodesExecute = [];
  static nodesCompile = [];

  static cleanTranslated() {
    TableReport.nodesTranslated = [];
  }

  static cleanExecute() {
    TableReport.nodesExecute = [];
  }

  static cleanCompile(){
    TableReport.nodesCompile = [];
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
    let insert = true;

    for(let item of TableReport.nodesCompile){
      if(item.name == node.name){
        insert = false;
        break;
      }
    }

    if(insert) TableReport.nodesCompile.push(node);
  }

  /**
   * 
   * @param {Map} map map with data
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
