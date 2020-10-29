class Logic extends Expresion {
  constructor(linea, column, operationType, expresion1, expresion2) {
    super(linea, column);
    this.operationType = operationType;
    this.expresion1 = expresion1;
    this.expresion2 = expresion2;
  
    this.translatedCode = "";
  }

  /**
   * obtener el codigo para la traduccion
   */
  getTranslated() {
    this.translatedCode += this.expresion1.getTranslated();
    this.translatedCode += ` ${this.operationType.toString()} `;
    this.translatedCode += this.expresion2.getTranslated();

    if (this.parentesis) {
      return `(${this.translatedCode})`;
    } else {
      return this.translatedCode;
    }
  }

  /**
   *
   * @param {Environment actual} e
   */
  translatedSymbolsTable(e) {
    return "implementar este codigo";
  }

  /**
   *
   * @param {Enviroment} e
   */
  getValue(e) {
    var result = new Value(new Type(EnumType.ERROR,""),"Error");
    var resulExp1 = this.expresion1.getValue(e);
    var resulExp2 = this.expresion2.getValue(e);

    if(resulExp1 == null || 
      resulExp2 == null || 
      resulExp1 instanceof Value && resulExp1.type.enumType == EnumType.ERROR || 
      resulExp2 instanceof Value && resulExp2.type.enumType == EnumType.ERROR){
      return result;
    }

    if(resulExp1.type.enumType != EnumType.BOOLEAN || resulExp2.type.enumType != EnumType.BOOLEAN){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede operar tipos diferentes a boolean`,e.envrimentType));
      return result;
    }

    result.type = resulExp1.type;

    if(this.operationType == EnumOperationType.AND){
      result.value = resulExp1.value && resulExp2.value;
    }else if(this.operationType == EnumOperationType.OR){
      result.value = resulExp1.value || resulExp2.value;
    }
    
    return result;
  }

  getC3D(env){
    let result = new RESULT();
    let result1 = this.expresion1.getC3D(env);
    let result2 = this.expresion2.getC3D(env);

    if(result1 == null || result2 == null || result1 == undefined || result2 == undefined ||
      (result1 instanceof Expresion && result1.type.enumType != EnumType.BOOLEAN) ||
      (result2 instanceof Expresion && result2.type.enumType != EnumType.BOOLEAN)){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de valores no son booleanos, ${result1.type.toString()},${result2.type.toString()}`,env.envrimentType));
    }

    result.code += result1.code;
    
    if(this.operationType.enumOperationType == EnumOperationType.AND){
      for(let item of result1.trueLabels){
        result.code += `${item}:\n`;
      }
      result.falseLabels.push(...result1.falseLabels);
      result.value = result1.value && result2.value;
      
    }else if(this.operationType == EnumOperationType.OR){
      for(let item of result1.falseLabels){
        result.code += `${item}:\n`;
      }
      result.trueLabels.push(...result1.trueLabels);
      result.value = result1.value || result2.value;
    }
    
    result.type = result1.type;
    result.code += result2.code;
    result.falseLabels.push(...result2.falseLabels);
    result.trueLabels.push(...result2.trueLabels);

    Singleton.deleteTemporaryIntoDisplay(result1.value);
    Singleton.deleteTemporaryIntoDisplay(result2.value);

    return result;
  }

  fillTable(env){
    return null;
  }

  getSize(){
    return 0;
  }

}
