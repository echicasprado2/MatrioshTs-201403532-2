class Declaration extends Instruction {
  /**
   *
   * @param {*} linea
   * @param {*} column
   * @param {*} typeDeclaration
   * @param {*} ids
   * @param {*} type
   * @param {*} value
   */
  constructor(linea, column, typeDeclaration, ids, type, value) {
    super(linea, column);

    this.typeDeclaration = typeDeclaration;
    this.ids = ids;
    this.type = type;
    this.value = value;

    this.translatedCode = "";
  }

  getTranslated() {
    this.translatedCode += this.typeDeclaration.toString() + " ";

    for (var i = 0; i < this.ids.length; i++) {
      if (i == 0) {
        this.translatedCode += this.ids[i];
      } else {
        this.translatedCode += ", " + this.ids[i];
      }
    }

    if (this.type.enumType != EnumType.NULL) {
      this.translatedCode += ":" + this.type.toString();
    } else {
      this.translatedCode;
    }

    if (this.value != null) {

      this.translatedCode += " = ";

      if (this.value instanceof Array) {
        this.translatedCode += this.getValueArray(this.value);
      
      } else {
        this.translatedCode +=   this.value.getTranslated();
      }
    
    }
    return this.translatedCode + ";\n";
  }

  getValueArray(value){
    var cadena = "[";

    for(var i = 0; i < value.length; i++){
        if(value[i] instanceof Array && i == 0){
            cadena += `${this.getValueArray(value[i])}`;
        }else if(value[i] instanceof Array){
            cadena += `,${this.getValueArray(value[i])}`;
        }else if(i == 0){
            cadena += value[i].value;
        }else{
            cadena += `,${value[i].value}`;
        }            
    }
    
    cadena += "]";
    return cadena;
  }

  translatedSymbolsTable(e) {
    for (var i = 0; i < this.ids.length; i++) {
      TableReport.addTranslated(
        new NodeTableSymbols(
          this.line,
          this.column,
          this.ids[i],
          this.type,
          e.enviromentType,
          null
        )
      );
    }
  }

  executeSymbolsTable(e) {
    return "implementar";
  }

  execute(e) {
    var result;

    if (this.typeDeclaration.enumType == EnumDeclarationType.CONST) {
      if (this.value == null) {
        for (var i = 0; i < this.ids.length; i++) {
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La constante: "${this.ids[i]}" no tiene asignacion de un valor, debe tener valor`,e.enviromentType));
        }
        return null;
      }
    }
      
    if(this.value != null){

      if(this.value instanceof Array){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`no se puede asignar un array a una variable`,e.enviromentType));
        return null;
      }

      result = this.value.getValue(e);
      
      if(result.type.enumType == EnumType.ERROR){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor da error`,e.enviromentType));
        return null;
      }
        
      if(result.type.enumType == EnumType.ARRAY){
        for(var i = 0; i < this.ids.length; i++){
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la variable ${this.ids[i]} no soporta un array`,e.enviromentType));
        }
        return null;  
      }

    }else{
      result = null;
    }
    
    for(var i = 0; i < this.ids.length; i++){

      if(result == null){
        e.insertNewSymbol(this.ids[i],new Symbol(this.line,this.column,this.ids[i],new Type(EnumType.VARIABLE,null),this.typeDeclaration,this.type,null,new Value(new Type(EnumType.NULL,null),"",0)));
      }else{

        if(result.type.enumType == EnumType.TYPE){

          if(this.type.enumType == EnumType.NULL){
            this.type = result.type;
            e.insertNewSymbol(this.ids[i],new Symbol(this.line,this.column,this.ids[i],this.type,this.typeDeclaration,result.value,0));
            return null;

          }else if(this.type.enumType == EnumType.TYPE && result.type.enumType == EnumType.TYPE){

            if(this.type.identifier != result.type.identifier){
              ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de la variable no es el mismo que su valor : ${this.type.toString()} != ${result.type.toString()}`,e.enviromentType));
              return null;
            }
            
            e.insertNewSymbol(this.ids[i],new Symbol(this.line,this.column,this.ids[i],this.type,this.typeDeclaration,result.value,0));
            return null;
          }else {
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de la variable no es el mismo que su valor : ${this.type.toString()} != ${result.type.toString()}`,e.enviromentType));
            return null;
          }
        }

        if(this.type.enumType == EnumType.NULL){
          this.type = result.type;
          e.insertNewSymbol(this.ids[i],new Symbol(this.line,this.column,this.ids[i],this.type,this.typeDeclaration,result,0));

        }else if(this.type.enumType != result.type.enumType){
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de la variable no es el mismo que su valor : ${this.type.toString()} != ${result.type.toString()}`,e.enviromentType));

        }else{
          e.insertNewSymbol(this.ids[i],new Symbol(this.line,this.column,this.ids[i],this.type,this.typeDeclaration,result,0));
        }
      }

    }

    return null;
  }

  getC3D(env){
    let result = new RESULT();
    let resultExpresion = null;
    let symbolOfVariable;

    if(this.value != null){
      resultExpresion = this.value.getC3D(env);
      if(resultExpresion == null || resultExpresion.type.enumType == EnumType.ERROR) return result;
    }else{
      let valueInit = this.getInitialValue();
      resultExpresion = valueInit.getC3D(env);
    }

    for(let item of this.ids){
      symbolOfVariable = env.searchSymbol(item);
      if(symbolOfVariable != null)
        result.code += this.getC3DOfDeclaration(env,symbolOfVariable,resultExpresion);
    }

    return result;
  }

  getSize(){
    return this.ids.length;
  }

  fillTable(env){
    if (this.typeDeclaration.enumType == EnumDeclarationType.CONST) {
      if (this.value == null) {
        for (var i = 0; i < this.ids.length; i++) {
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La constante: "${this.ids[i]}" no tiene asignacion de un valor, debe tener valor`,env.enviromentType));
        }
        return null;
      }
    }
    
    for(let item of this.ids){
      this.saveVariableIntoEnvironment(env,item);
    }

    return null;
  }

  saveVariableIntoEnvironment(env,id){
    let location;
    let enviroments;
    let newSymbol;

    if(this.type.enumType == EnumType.NUMBER || this.type.enumType == EnumType.BOOLEAN){
      location = new Location(EnumLocation.STACK);
    }else{
      location = new Location(EnumLocation.HEAP);
    }

    enviroments = env.getArrayEnvironments();

    newSymbol = new Symbol(
      this.line,
      this.column,
      id.toLowerCase(),
      this.type,
      this.typeDeclaration,
      new Type(EnumType.VALOR,null),
      env.enviromentType,
      enviroments,
      1,
      Singleton.getPosStack(),
      0,
      null,
      location,
      null
    );
    
    env.insertNewSymbol(id,newSymbol);
    return null;
  }

  getC3DOfDeclaration(env,symbolOfVariable,resultExpresion){
    let tPosStack;

    if(symbolOfVariable == null) return '';

    if(symbolOfVariable.type.enumType != resultExpresion.type.enumType){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de valor es diferente al tipo de variable ${symbolOfVariable.type.toString()} != ${resultExpresion.type.toString()}`,env.enviromentType));
      return '';
    }

    if(resultExpresion.type.enumType == EnumType.BOOLEAN){
      let t1 = Singleton.getTemporary();
      let lexit = Singleton.getLabel();

      resultExpresion.code += `//declaracion de valor boolean\n`;
      for(const item of resultExpresion.trueLabels){
        resultExpresion.code += `${item}:\n`;
      }

      resultExpresion.value = t1;
      resultExpresion.code += `${t1} = 1;\n`;
      resultExpresion.code += `goto ${lexit};\n`;

      for(const item of resultExpresion.falseLabels){
        resultExpresion.code += `${item}:\n`;
      }

      resultExpresion.code += `${t1} = 0;\n`;
      resultExpresion.code += `goto ${lexit};\n`;
      resultExpresion.code += `${lexit}://salida de guardar valor booleano\n`;
    }

    tPosStack = Singleton.getTemporary()

    if(env.enviromentType.enumEnvironmentType == EnumEnvironmentType.MAIN){
      resultExpresion.code += `${tPosStack} = ${symbolOfVariable.positionRelativa} + 0;//variable global\n`;

    }else{
      resultExpresion.code += `${tPosStack} = P + ${symbolOfVariable.positionRelativa};//variable local\n`;
    }

    resultExpresion.code += `Stack[(int)${tPosStack}] = ${resultExpresion.value};//guardar valor en stack de la declaracion\n`;

    symbolOfVariable.type = resultExpresion.type;
    env.insert(symbolOfVariable.id,symbolOfVariable);

    Singleton.deleteTemporaryIntoDisplay(tPosStack);
    Singleton.deleteTemporaryIntoDisplay(resultExpresion.value);

    return resultExpresion.code;
  }

  getInitialValue(){

    switch(this.type.enumType){

      case EnumType.NUMBER:
        return new Value(new Type(EnumType.NUMBER,null),0);

      case EnumType.BOOLEAN:
        return new Value(new Type(EnumType.BOOLEAN,null),'false');

      case EnumType.STRING:
        return new Value(new Type(EnumType.STRING,null),'');

      case EnumType.ARRAY:
        return new Value(new Type(EnumType.NULL,null),null);

      case EnumType.TYPE:
        return new Value(new Type(EnumType.TYPE,this.type.identifier),null);
    }
  }

}
