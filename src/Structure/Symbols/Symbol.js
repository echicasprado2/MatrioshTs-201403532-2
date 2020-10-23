class Symbol {
   
    /**
     * 
     * @param {integer} line 
     * @param {integer} column 
     * @param {*} id 
     * @param {*} type 
     * @param {*} typeDeclaration 
     * @param {*} typeValue 
     * @param {*} typeEnvironment 
     * @param {integer} size 
     * @param {*} positionRelativa 
     * @param {integer} dimensions 
     * @param {*} displayTemporary 
     * @param {*} value 
     */
    constructor(line,column,id, type, typeDeclaration, typeValue, typeEnvironment, arrayEnvironments, size, positionRelativa, dimensions, displayTemporary,location,value) {
        this.line = line;                          // uso para reporte
        this.column = column;                      // uso para reporte
        this.id = id;                              // variables, types, funciones
        this.type = type;                          // variables, types, funciones
        this.typeDeclaration = typeDeclaration;    // variables
        this.typeValue = typeValue;                // variables, funciones, types su tipo es el id del type
        this.typeEnvironment = typeEnvironment;    // ambito del simbolo
        this.arrayEnvironments = arrayEnvironments;// array de ambitos en los que esta el simbolo
        this.size = size;                          // funciones, por la cantidad de declaraciones de parametros y variables, mas el return de cada una y arreglos para saber su tama;o 
        this.positionRelativa = positionRelativa;  // declaracion de variables y parametros, posicion relativa al entorno en el que esta, la posicion del return siempre va hacer 0
        this.dimensions = dimensions;              // para arreglos, para saber cuantas dimenciones tengo que manejar
        this.displayTemporary = displayTemporary;  // para almacenar los temporales que aun no se utilizan, en una llamada de funcion
        this.location = location                   // localizacion de variable, puede ser hepa o stack
        this.value = value;//no lo uso para codigo de 3 direcciones                   // valor primitivo, o temporal que contiene el valor 
    }
}
