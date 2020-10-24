class AST {

  constructor(instruccions) {
    this.instruccions = instruccions;
    this.graphCode = "";
    this.translatedCode = "";
    this.environmentTranslated = new Environment(null,new EnvironmentType(EnumEnvironmentType.GLOBAL, null));
    this.environmentExecute = new Environment(null,new EnvironmentType(EnumEnvironmentType.GLOBAL, null));
    this.environmentCompile = new Environment(null,new EnvironmentType(EnumEnvironmentType.MAIN,null));
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
    this.cleanVariableC3D();
    this.getSizeMain();
    let cadena = "";

    let metodosNativos = C3DMethods.getMethods();
    let globalFunctionDefinition = this.getGlobalFunctionDefinition();
    let globalVariable = this.getGlobalVariable();
    let mainInstructions = this.getMainInstructions();
    let header = this.getHeaderC3D();
    

    cadena += header;
    cadena += "\n";
    cadena += globalFunctionDefinition;
    cadena += "\n";
    cadena += metodosNativos;
    cadena += "\n";
    cadena += `int main(){\n${globalVariable}${mainInstructions}printf("\\n%d\\n",(int)H);\nprintf("%d\\n",(int)P);\nreturn 0;\n}`;

    ErrorList.showErrors();
    PrintConsole.printLine("fin traduccion codigo 3 direcciones");
    return cadena;
  }

  getGlobalFunctionDefinition(){
    /* TODO aqui tengo que hacer varias pasadas, este debe de funcionar para definir funciones
      entre estas tengo que hacer una para llenar la tabla de simbolos,
      entre los simbolos va un array de ambitos para saber hasta donde esta,
      tambien tengo que agregar 2 metodos a las instrucciones el
      * getsize -> para saber cuantas variables tiene declaradas
      * primera pasada -> para guardar las variables en la tabla de simbolos, este no guarda valores en las variables
      * getC3D -> que va a generar el codigo con toda la informacion previa, este debe de guardar los valores de las variables 
    */ 

    let cadena = '';

    for(let item of this.instruccions){
      if(item instanceof Function) item.fillTable(this.environmentCompile);
    }

    for(let item of this.instruccions){
      if(item instanceof Function) cadena += item.getC3D(this.environmentCompile);
    }

    return `${cadena}\n`;
  }

  getGlobalTypeDefinition(){
    /*  TODO tengo que mantener la definicion del type, para validar las declaraciones de estos.
     */
  }

  getGlobalVariable(){
    /* TODO declaraciones globales, tengo que hacer uso de stack y heap
    */
   let cadena = "";

    for(var i = 0; i < this.instruccions.length; i++){
      if((this.instruccions[i] instanceof Declaration) || 
       (this.instruccions[i] instanceof DeclarationTypes) ||
       (this.instruccions[i] instanceof DeclarationArray)){
        this.instruccions[i].fillTable(this.environmentCompile);
      }
    }

    for(var i = 0; i < this.instruccions.length; i++){
      if((this.instruccions[i] instanceof Declaration) || 
      (this.instruccions[i] instanceof DeclarationTypes) ||
      (this.instruccions[i] instanceof DeclarationArray)){
        cadena += this.instruccions[i].getC3D(this.environmentCompile).code;
      }
    }
    return `${cadena}\n`;
  }


  getMainInstructions(){
    let cadena = "";

    for(let item of this.instruccions){
      if(!(item instanceof TypeDefinition) && 
        !(item instanceof Function) &&
        !(item instanceof Declaration) &&
        !(item instanceof DeclarationTypes) &&
        !(item instanceof DeclarationArray)){
          if(item instanceof Instruction) item.fillTable(this.environmentCompile);
        }
    }

    for(var i = 0; i < this.instruccions.length; i++){
      if(!(this.instruccions[i] instanceof TypeDefinition) &&
       !(this.instruccions[i] instanceof Function) && 
       !(this.instruccions[i] instanceof Declaration) && 
       !(this.instruccions[i] instanceof DeclarationTypes) &&
       !(this.instruccions[i] instanceof DeclarationArray)){

        if(this.instruccions[i] instanceof Instruction || this.instruccions[i] instanceof Expresion){
          cadena += (this.instruccions[i]).getC3D(this.environmentCompile).code;

        }
        
      }
    }

    return `${cadena}\n`;
  }

  getSizeMain(){
    let counter = 0;
    for(let item of this.instruccions){
      if(item instanceof Declaration || 
        item instanceof DeclarationArray || 
        item instanceof DeclarationTypes){
          counter += item.getSize();
      }
    }
    this.environmentCompile.size = counter;
  }

  getHeaderC3D(){
    let cadena = "";
    cadena += "#include <stdio.h> //Importar para el uso de Printf\n"
    cadena += "float Heap[16384]; //Estructura para heap\n"
    cadena += "float Stack[16394]; //Estructura para stack\n"
    cadena += "float P = 0; //Puntero P\n"
    cadena += "float H = 0; //Puntero H\n"

    if(Singleton.getNumberTemporary() > 0){
      cadena += "float ";
      
      for(let i = 0; i < Singleton.getNumberTemporary();i++){
        cadena += i == 0 ? `t${i}` : `, t${i}`; 
      }

      cadena += ";//temporales utilizados\n"
    }

    return cadena;
  }

  cleanVariableC3D(){
    TableReport.cleanExecute();
    PrintConsole.cleanConsole();
    ShowGraphTs.clean();
    Singleton.cleanTemporarys();
    Singleton.cleanLabels();
    Singleton.cleanPointerStackInit();
    Singleton.cleanPointerHeap();
  }

}
