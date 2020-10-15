/**
 * @class this use for
 * methods, use c3d
 */
class C3DMethods {

  static getPrintString() {
    let code = "";
    let t1 = Singleton.getTemporary();
    let t2 = Singleton.getTemporary();
    let t3 = Singleton.getTemporary();
    let l1 = Singleton.getLabel();
    let l2 = Singleton.getLabel(); 

    code += `void __printString__(){\n`
    // result.code += `${t1} = ${resultTemp.value};//copio el inicio del string que esta en heap, este tiene que estar en stack\n`;
    code += `${t1} = P + 0;//Posicion de referencia en stack hacia inicio de cadena en heap\n`;
    code += `${t2} = Stack[(int)${t1}];//Inicio de cadena heap\n`;
    code += `${l1}://etiqueta para imprimir\n`;
    code += `${t3} = Heap[(int)${t2}];//obtengo el valor de la posicion en Heap\n`;
    code += `if(${t3} == -1) goto ${l2};//Salgo de imprimir el string \n`;
    code += `printf(\"%c\",(char)${t3});\n`;
    code += `${t2} = ${t2} + 1;\n`;
    code += `goto ${l1};\n`;
    code += `${l2}://Etiqueta de fin de imprimir cadena\n`;
    code += `return;\n}\n`;
    return code;
  }

  static getMethods(){
    let methods = "";   
    methods = C3DMethods.getPrintString();
    return methods;
  }

  static getCallPrintString(){
      return "__printString__()";
  }

}
