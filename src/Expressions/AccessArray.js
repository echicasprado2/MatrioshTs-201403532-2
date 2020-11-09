class AccessArray extends Expresion {
  /**
   *
   * @param {*} linea
   * @param {*} column
   */
  constructor(linea, column, id, expresion) {
    super(linea, column, null, null);

    this.identifier = id;
    this.value = expresion;

    this.translatedCode = "";
  }

  getTranslated() {
    this.translatedCode = `${this.identifier}`;

    for (var i = 0; i < this.value.length; i++) {
      this.translatedCode += "[";
      this.translatedCode += this.value[i].getTranslated();
      this.translatedCode += "]";
    }

    if (this.parentesis) {
      return `(${this.translatedCode})`;
    } else {
      return this.translatedCode;
    }
  }

  translatedSymbolsTable(e) {
    return "implementar";
  }

  executeSymbolsTable(e) {
    return "implementar";
  }

  getValue(e) {
    var returnValue = new Value(new Type(EnumType.ERROR,null),"Error");
    var resultSymbol;
    var tempValue;

    resultSymbol = e.searchSymbol(this.identifier);

    if(resultSymbol == null){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se encontro el arreglo "${this.identifier}"`,e.enviromentType));
      return returnValue;
    }
    
    if(resultSymbol.type.enumType != EnumType.ARRAY){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la variable: "${this.identifier}" no es un arreglo`,e.enviromentType));
      return returnValue;
    }
    
    if(resultSymbol.dimensions < this.value.length){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la dimensiones de acceso son diferentes a las del arreglo`,e.enviromentType));
      return returnValue;
    }

    tempValue = this.getIndexValue(e,resultSymbol.value.value); 

    if(tempValue == null){
      return returnValue;
    }

    if(tempValue instanceof Expresion){
      returnValue = tempValue.getValue(e);
    }

    returnValue = tempValue;

    return returnValue;
  }

  getIndexValue(e,arrayValue){
    var resultIndex; 
    var arrayDimension = arrayValue;

    for(var i = 0; i < this.value.length; i++){
      resultIndex = this.value[i].getValue(e);

      if(resultIndex.value < 0){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el indice es ${resultIndex.value}`,e.enviromentType));
        return null;
      }

      if(resultIndex.value > arrayValue.length){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el indice supera el tamaño del arreglo`,e.enviromentType));
        return null;
      }

      arrayDimension = arrayDimension[resultIndex.value];

    }

    return arrayDimension;
  }

  getC3D(env){
    let result = new RESULT();
    let symbolVariable = env.searchSymbol(this.identifier);
    let tPosStack = Singleton.getTemporary();
    let tval = Singleton.getTemporary();

    if(symbolVariable == null){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No existe la variable`,env.enviromentType));
      return new RESULT;
    }

    result.symbol = symbolVariable;
    result.type = symbolVariable.type;
    result.value = tval;

    if(symbolVariable.typeEnvironment.enumEnvironmentType == EnumEnvironmentType.MAIN){
      result.code += `${tPosStack} = ${symbolVariable.positionRelativa};//posicion de la variable global en stack\n`;

    }else{
      result.code += `${tPosStack} = P + ${symbolVariable.positionRelativa};//posicion de variable local\n`;

    }

    result.code += `${tval} = Stack[(int)${tPosStack}];//posicion de inicio de arreglo en heap\n`;

    Singleton.deleteTemporaryIntoDisplay(tPosStack);

    return this.getC3DWithIndex(env,symbolVariable,0,this.value,result);
  }

  /**
   * 
   * @param {Environment} env 
   * @param {Symbol} symbolVariable 
   * @param {Number} index 
   * @param {Array} arrayIndex 
   * @param {RESULT} RESULT previous
   */
  getC3DWithIndex(env,symbolVariable,index,arrayIndex,resultPrevious){
    let valueIndex = arrayIndex[index].getC3D(env);

    if(valueIndex.type.enumType != EnumType.NUMBER){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Error indice no es un numero`,env.enviromentType));
      return new RESULT();
    }

    let tindex = Singleton.getTemporary();
    let tPosVal = Singleton.getTemporary();
    let tResultVal = Singleton.getTemporary();

    resultPrevious.code += valueIndex.code;
    resultPrevious.code += `${tindex} = ${valueIndex.value} + 1;\n`;
    resultPrevious.code += `${tPosVal} = ${resultPrevious.value} + ${tindex};\n`;
    resultPrevious.code += `${tResultVal} = Heap[(int)${tPosVal}];\n`;
    
    Singleton.deleteTemporaryIntoDisplay(resultPrevious.value);
    Singleton.deleteTemporaryIntoDisplay(tindex);
    Singleton.deleteTemporaryIntoDisplay(tPosVal);

    resultPrevious.value = tResultVal;

    if(index < (arrayIndex.length - 1)){
      return this.getC3DWithIndex(env,symbolVariable,index,arrayIndex,resultPrevious);
    }else{

      if(resultPrevious.type.enumType == EnumType.BOOLEAN){
        let ltrue = Singleton.getLabel();
        let lfalse = Singleton.getLabel();

        resultPrevious.trueLabels.push(ltrue);
        resultPrevious.falseLabels.push(lfalse);
        resultPrevious.code += `if(${tResultVal} == 1) goto ${ltrue};\n`;
        resultPrevious.code += `goto ${lfalse};\n`;

        Singleton.deleteTemporaryIntoDisplay(tResultVal);
      }

      return resultPrevious;
    }
  }

  fillTable(env){
    return null;
  }

  getSize(){
    return 0;
  }

}
