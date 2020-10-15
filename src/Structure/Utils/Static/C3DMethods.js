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

  static getConcatStrings(){
    let code = "";
    
    let t1 = Singleton.getTemporary();
    let t2 = Singleton.getTemporary();
    let t3 = Singleton.getTemporary();
    let t4 = Singleton.getTemporary();
    let t5 = Singleton.getTemporary();
    let t6 = Singleton.getTemporary();
    let t7 = Singleton.getTemporary();
    let t8 = Singleton.getTemporary();
    let t9 = Singleton.getTemporary();
    let t10 = Singleton.getTemporary();

    let l1 = Singleton.getLabel();
    let l2 = Singleton.getLabel();
    let l3 = Singleton.getLabel();
    let l4 = Singleton.getLabel();

    code += "void __concatStrings__(){\n"
    code += `${t1} = P + 1;//posicion de inicio de primera cadena en heap\n`;
    code += `${t2} = Stack[(int)${t1}];//referncia de inicio de cadena en heap\n`;
    code += `${t3} = P + 2;//posicion de inicio de segunda cadena en heap\n`;
    code += `${t4} = Stack[(int)${t3}];//referencia de segunda cadena en heap\n`;
    code += `${t5} = H;\n`;
    code += `${t6} = 0;//recorrer la cadena en heap\n`;
    code += `${t7} = 0;//recorrer el heap en posiciones vacias\n`;
    code += `${l1}:\n`;
    code += `${t8} = ${t2} + ${t6};\n`;
    code += `${t9} = Heap[(int)${t8}];\n`;
    code += `if(${t9} == -1) goto ${l2};//verifico si llegue al final de la cadena 1 para saltar a la segunda\n`;
    code += `${t10} = ${t5} + ${t7};//valor vacio en heap\n`;
    code += `Heap[(int)${t10}] = ${t9};//guardo el caracter en heap\n`;
    code += `${t6} = ${t6} + 1;\n`;
    code += `${t7} = ${t7} + 1;\n`;
    code += `goto ${l1};\n`;
    code += `${l2}:\n`;
    code += `${t6} = 0;//recorrer la cadena 2\n`;
    code += `${l3}:\n`;
    code += `${t8} = ${t4} + ${t6};\n`;
    code += `${t9} = Heap[(int)${t8}];\n`;
    code += `if(${t9} == -1) goto ${l4};\n`;
    code += `${t10} = ${t5} + ${t7};//valor vacio en heap\n`;
    code += `Heap[(int)${t10}] = ${t9};\n`;
    code += `${t6} = ${t6} + 1;\n`;
    code += `${t7} = ${t7} + 1;\n`;
    code += `goto ${l3};\n`;
    code += `${l4}:\n`;
    code += `${t10} = ${t5} + ${t7};\n`;
    code += `Heap[(int)${t10}] = -1;\n`;
    code += `H = ${t10} + 1;\n`;
    code += `${t1} = P = 0;//\n`;
    code += `Stack[(int)${t1}] = ${t5};//\n`;

    code += `return;\n}\n`;
    return code;
  }

  static getSizeNumber(){
    let code = "";
    
    let t1 = Singleton.getTemporary();
    let t2 = Singleton.getTemporary();
    let t3 = Singleton.getTemporary();
    let t4 = Singleton.getTemporary();
    let t5 = Singleton.getTemporary();
    let t6 = Singleton.getTemporary();

    let l1 = Singleton.getLabel();
    let l2 = Singleton.getLabel();

    code += "void __sizeNumber__(){\n";
    code += `${t1} = P + 2;//\n`;
    code += `Stack[(int)${t1}] = 9;//unidad\n`;
    code += `${t1} = P + 3;\n`;
    code += `Stack[(int)${t1}] = 99;//decena\n`;
    code += `${t1} = P + 4;\n`;
    code += `Stack[(int)${t1}] = 999;//centena\n`;
    code += `${t1} = P + 5;\n`;
    code += `Stack[(int)${t1}] = 9999;\n`;
    code += `${t1} = P + 6;\n`;
    code += `Stack[(int)${t1}] = 99999;\n`;
    code += `${t1} = P + 7;\n`;
    code += `Stack[(int)${t1}] = 999999;\n`;
    code += `${t1} = P + 8;\n`;
    code += `Stack[(int)${t1}] = 9999999;\n`;
    code += `${t1} = P + 9;\n`;
    code += `Stack[(int)${t1}] = 999999999;\n`;
    code += `${t1} = P + 9;\n`;
    code += `Stack[(int)${t1}] = 99999999;\n`;
    code += `${t1} = P + 10;\n`;
    code += `Stack[(int)${t1}] = 999999999;\n`;
    code += `${t1} = P + 11;\n`;
    code += `Stack[(int)${t1}] = 9999999999;\n`;
    code += `${t1} = P + 12;\n`;
    code += `Stack[(int)${t1}] = 99999999999;\n`;
    code += `${t1} = P + 13;\n`;
    code += `Stack[(int)${t1}] = 999999999999;\n`;
    code += `${t1} = P + 14;\n`;
    code += `Stack[(int)${t1}] = 9999999999999;\n`;
    code += `${t1} = P + 15;\n`;
    code += `Stack[(int)${t1}] = 99999999999999;\n`;
    code += `${t1} = P + 16;\n`;
    code += `Stack[(int)${t1}] = 999999999999999;\n`;
    code += `${t1} = P + 17;\n`;
    code += `Stack[(int)${t1}] = 10000000000000000;\n`;
    code += `${t1} = P + 18;\n`;
    code += `Stack[(int)${t1}] = 100000000000000000;\n`;
    code += `${t1} = P + 19;\n`;
    code += `Stack[(int)${t1}] = 1000000000000000000;\n`;
    // code += `${t1} = P + 20;\n`;
    // code += `Stack[(int)${t1}] = 9223372036854776000;//valor maximo soportado\n`;
    code += `${t1} = P + 1;//Posicion en stack del valor que se mando\n`;
    code += `${t2} = Stack[(int)${t1}];//Tomo el valor que esta de parametro\n`;
    code += `${t3} = 1;\n`;
    code += `${t4} = 2;\n`;
    code += `${l1}:\n`;
    code += `${t5} = P + ${t4};\n`;
    code += `${t6} = Stack[(int)${t5}];\n`;
    code += `if(${t2} <= ${t6}) goto ${l2};\n`;
    code += `${t3} = ${t3}  + 1;\n`;
    code += `${t4} = ${t4}  + 1;\n`;
    code += `goto ${l1};\n`;
    code += `${l2}:\n`;
    code += `${t1} = P + 0;//\n`;
    code += `Stack[(int)${t1}] = ${t3};//\n`;

    code += `return;\n}\n`;
    return code;
  }

  // static getSizeIntegerIntoDouble(){
  //   //TODO implement
  // }

  static getIntegerToString(){
    let code = "";

    let t1 = Singleton.getTemporary();
    let t2 = Singleton.getTemporary();
    let t3 = Singleton.getTemporary();
    let t4 = Singleton.getTemporary();
    let t5 = Singleton.getTemporary();
    let t6 = Singleton.getTemporary();
    let t7 = Singleton.getTemporary();
    let t8 = Singleton.getTemporary();
    let t9 = Singleton.getTemporary();
    let t10 = Singleton.getTemporary();
    let t11 = Singleton.getTemporary();
    let t12 = Singleton.getTemporary();
    let t13 = Singleton.getTemporary();
    let t14 = Singleton.getTemporary();
    let t15 = Singleton.getTemporary();
    let t20 = Singleton.getTemporary();
    let t30 = Singleton.getTemporary();
    let t40 = Singleton.getTemporary();
    let t50 = Singleton.getTemporary();

    let l1 = Singleton.getLabel();
    let l2 = Singleton.getLabel();
    let l3 = Singleton.getLabel();
    let l4 = Singleton.getLabel();
    let l5 = Singleton.getLabel();
    let l6 = Singleton.getLabel();
    let l7 = Singleton.getLabel();
    let l8 = Singleton.getLabel();
    let l9 = Singleton.getLabel();

    code += "void __integerToString__(){\n"
    code += `${t1} = P + 1;\n`;
    code += `${t2} = Stack[(int)${t1}];\n`;
    code += `if(${t2} >= 0) goto ${l1};\n`;
    code += `${t2} = 0 - ${t2};\n`;
    code += `${l1}:\n`;
    code += `${t3} = P + 2;//size de metodo por el parametro y el return\n`;
    code += `${t4} = ${t3} + 1;//posicion de siguiente ambito\n`;
    code += `Stack[(int)${t4}] = ${t2};\n`;
    code += `P = P + 2;\n`;
    code += `${C3DMethods.getCallSizeNumber()};\n`;
    code += `${t5} = P + 0;//puntero de stack de return de la llamada al metodo\n`;
    code += `${t6} = Stack[(int)${t5}];\n`;
    code += `P = P - 2;\n`;
    code += `${t1} = P + 1;\n`;
    code += `${t2} = Stack[(int)${t1}];\n`;
    code += `if(${t2} >= 0) goto ${l2};\n`;
    code += `${t7} = H;\n`;
    code += `H = H + ${t6};\n`;
    code += `H = H + 2;//\n`;
    code += `Heap[(int)${t7}] = -1;\n`;
    code += `${t8} = ${t6};\n`;
    code += `${t9} = 0;\n`;
    code += `${t10} = 0 - ${t2};\n`;
    code += `${t11} = 1;\n`;
    code += `${l3}:\n`;
    code += `if(${t8} <= 0) goto ${l4};\n`;
    code += `${t9} = ((int)${t10}) % 10;\n`;
    code += `${t9} = ${t9} + 48;\n`;
    code += `${t10} = ${t10} / 10;\n`;
    code += `${t20} = ((int)${t10}) % 1;\n`;
    code += `${t10} = ${t10} - ${t20};\n`;
    code += `${t12} = ${t7} + ${t11};\n`;
    code += `Heap[(int)${t12}] = ${t9};\n`;
    code += `${t8} = ${t8} - 1;\n`;
    code += `${t11} = ${t11} + 1;\n`;
    code += `goto ${l3};\n`;
    code += `${l4}:\n`;
    code += `${t12} = ${t7} + ${t11};\n`;
    code += `Heap[(int)${t12}] = 45;//signo menos (-)\n`;
    code += `${t6} = ${t6} + 2;\n`;
    code += `goto ${l5};\n`;
    code += `${l2}:\n`;
    code += `${t7} = H;\n`;
    code += `H = H + ${t6};\n`;
    code += `H = H + 1;\n`;
    code += `Heap[(int)${t7}] = -1;\n`;
    code += `${t8} = ${t6};\n`;
    code += `${t9} = 0;\n`;
    code += `${t10} = ${t2};\n`;
    code += `${t11} = 1;\n`;
    code += `${l6}:\n`;
    code += `if(${t8} <= 0) goto ${l7};\n`;
    code += `${t9} = ((int)${t10}) % 10;\n`;
    code += `${t9} = ${t9} + 48;\n`;
    code += `${t10} = ${t10} / 10;\n`;
    code += `${t20} = ((int)${t10}) % 1;\n`;
    code += `${t10} = ${t10} - ${t20};\n`;
    code += `${t12} = ${t7} + ${t11};\n`;
    code += `Heap[(int)${t12}] = ${t9};\n`;
    code += `${t8} = ${t8} - 1;\n`;
    code += `${t11} = ${t11} + 1;\n`;
    code += `goto ${l6};\n`;
    code  += `${l7}:\n`;
    code += `${t6} = ${t6} + 1;\n`;
    code  += `${l5}:\n`;
    code += `${t30} = 0;\n`;
    code += `${t40} = ${t6} - 1;\n`;
    code += `${t50} = 0;\n`;
    code += `${l8}:\n`;
    code += `if(${t30} >= ${t40}) goto ${l9};\n`;
    code += `${t13} = ${t7} + ${t30};\n`;
    code += `${t50} = Heap[(int)${t13}];\n`;
    code += `${t14} = ${t7} + ${t40};\n`;
    code += `${t15} = Heap[(int)${t14}];\n`;
    code += `Heap[(int)${t13}] = ${t15};\n`;
    code += `Heap[(int)${t14}] = ${t50};\n`;
    code += `${t30} = ${t30} + 1;\n`;
    code += `${t40} = ${t40} - 1;\n`;
    code += `goto ${l8};\n`;
    code  += `${l9}:\n`;
    code += `${t1} = P + 0;\n`;
    code += `Stack[(int)${t1}] = ${t7};\n`;

    code += `return;\n}\n`;
    return code;
  }

  static getDoubleToString(){
    //TODO implement
  }

  static getIntegerIntoDoubleToString(){
    //TODO implement
  }

  static getDecimalPartToString(){
    //TODO implement
  }


  static getMethods(){
    let methods = "";   
    methods += C3DMethods.getPrintString();
    methods += C3DMethods.getConcatStrings();
    methods += C3DMethods.getSizeNumber();
    methods += C3DMethods.getIntegerToString();
    return methods;
  }

  static getCallPrintString(){
      return "__printString__()";
  }

  static getCallSizeNumber(){
    return "__sizeNumber__()";
  }

  static getCallConcatStrings(){
    return "__concatStrings__()";
  }

  static getCallIntegerToString(){
    return "__integerToString__()";
  }

}
