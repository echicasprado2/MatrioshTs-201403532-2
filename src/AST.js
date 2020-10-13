class AST {

  constructor(instruccions) {
    this.instruccions = instruccions;
    this.graphCode = "";
    this.translatedCode = "";
    this.environmentTranslated = new Environment(null,new EnvironmentType(EnumEnvironmentType.GLOBAL, null));
    this.environmentExecute = new Environment(null,new EnvironmentType(EnumEnvironmentType.GLOBAL, null));
  }

  /**
   * obtengo el codigo traduccido de mi analisis
   */
  getTranslated() {
    // ErrorList.cleanErrorList();
    PrintConsole.cleanConsole();

    for (var i = 0; i < this.instruccions.length; i++) {
      this.translatedCode += this.instruccions[i].getTranslated();
    }

    ErrorList.showErrors();
    PrintConsole.printLine("fin traduccion");
    return this.translatedCode;
  }

  /**
   * creo la tabla de simbolos para la traduccion
   */
  translatedSymbolsTable() {
    TableReport.cleanTranslated();
    for (var i = 0; i < this.instruccions.length; i++) {
      this.instruccions[i].translatedSymbolsTable(this.environmentTranslated);
    }
  }

  /**
   * Obtengo la tabla de simbolos para la ejecucion
   */
  executeSymbolsTable() {}
  
  execute(){
    TableReport.cleanExecute();
    PrintConsole.cleanConsole();
    ShowGraphTs.clean();

    for(var i = 0; i < this.instruccions.length;i++){
      if(this.instruccions[i] instanceof TypeDefinition){
        (this.instruccions[i]).execute(this.environmentExecute);
      }
    }

    for(var i = 0; i < this.instruccions.length; i++){
      if(this.instruccions[i] instanceof Function){
        (this.instruccions[i]).execute(this.environmentExecute);
      }
    }

    for(var i = 0; i < this.instruccions.length; i++){
      if(this.instruccions[i] instanceof Declaration || this.instruccions[i] instanceof DeclarationArray || this.instruccions[i] instanceof DeclarationTypes){
        (this.instruccions[i]).execute(this.environmentExecute);
      }
    }

    for(var i = 0; i < this.instruccions.length; i++){
      if(!(this.instruccions[i] instanceof TypeDefinition) &&
       !(this.instruccions[i] instanceof Function) && 
       !(this.instruccions[i] instanceof Declaration) && 
       !(this.instruccions[i] instanceof DeclarationTypes) &&
       !(this.instruccions[i] instanceof DeclarationArray)){
            if(this.instruccions[i] instanceof Instruction){
              (this.instruccions[i]).execute(this.environmentExecute);
            }else if(this.instruccions[i] instanceof Expresion){
              (this.instruccions[i]).getValue(this.environmentExecute);
            }
          }
    }

    ErrorList.showErrors();
    PrintConsole.printLine("fin ejecucion");
    return null;
  }


  getC3D(){
    TableReport.cleanExecute();
    PrintConsole.cleanConsole();
    ShowGraphTs.clean();

    let cadena = "";
    let bodyString = "";

    cadena += "#include <stdio.h> //Importar para el uso de Printf\n"
    cadena += "float Heap[16384]; //Estructura para heap\n"
    cadena += "float Stack[16394]; //Estructura para stack\n"
    cadena += "float P; //Puntero P\n"
    cadena += "float H; //Puntero \n"
    cadena += "float ";

    for(let i = 0; i < Singleton.getNumberTemporary();i++){
      cadena += i == 0 ? `t${i}` : `, t${i}`; 
    }

    cadena += ";//temporales utilizados\n"
    cadena += `void main(){\n${bodyString}\nreturn 0;\n}`;


    ErrorList.showErrors();
    PrintConsole.printLine("fin traduccion codigo 3 direcciones");
    return cadena;
  }

}
