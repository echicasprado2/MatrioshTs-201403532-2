class Relational extends Expresion {
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

    var result = new Value(new Type(EnumType.BOOLEAN,null),false);
    var resultExp1 = this.expresion1.getValue(e);
    var resultExp2 = this.expresion2.getValue(e);
    var enumTypeResultExpresitions = TreatmentOfPrimitiveTypes.getTopType(resultExp1,resultExp2);

    if(resultExp1 == undefined || 
      resultExp2 == undefined || 
      resultExp1 instanceof Value && resultExp1.type.enumType == EnumType.ERROR || 
      resultExp2 instanceof Value && resultExp2.type.enumType == EnumType.ERROR){
      return result;
    }
    

    if(enumTypeResultExpresitions === EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de variables no se pueden operar ${this.expresion1.type.toString()} ${this.expresion2.type.toString()}`,e.enviromentType));
      return result;
    }
    
    result.type = new Type(EnumType.BOOLEAN,"");

    if(enumTypeResultExpresitions == EnumType.NUMBER){
      
      if(this.operationType == EnumOperationType.DIFFERENT_THAN){
        result.value = Number(resultExp1.value) != Number(resultExp2.value); 

      }else if(this.operationType == EnumOperationType.LIKE_THAN){
        result.value = Number(resultExp1.value) == Number(resultExp2.value);

      }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){ 
          result.value = Number(resultExp1.value) >= Number(resultExp2.value);
      
      }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
        result.value = Number(resultExp1.value) <= Number(resultExp2.value);

      }else if(this.operationType == EnumOperationType.MORE_THAN){
        result.value = Number(resultExp1.value) > Number(resultExp2.value);

      }else if(this.operationType == EnumOperationType.LESS_THAN){
        result.value = Number(resultExp1.value) < Number(resultExp2.value);
      }
      
    }else if(enumTypeResultExpresitions == EnumType.STRING || enumTypeResultExpresitions === EnumType.BOOLEAN){
      
      if(this.operationType == EnumOperationType.DIFFERENT_THAN){
        result.value = resultExp1.value != resultExp2.value; 
  
      }else if(this.operationType == EnumOperationType.LIKE_THAN){
        result.value = resultExp1.value == resultExp2.value;
  
      }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){ 
          result.value = Number(resultExp1.value) >= Number(resultExp2.value);
      
      }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
        result.value = resultExp1.value <= resultExp2.value;
  
      }else if(this.operationType == EnumOperationType.MORE_THAN){
        result.value = resultExp1.value > resultExp2.value;
  
      }else if(this.operationType == EnumOperationType.LESS_THAN){
        result.value = resultExp1.value < resultExp2.value;
      }
      
    }else if(enumTypeResultExpresitions == EnumType.TYPE){
      let value1, value2;

      if(resultExp1 instanceof Symbol){
        value1 = resultExp1.value;

      }else if(resultExp1 instanceof Value){
        value1 = resultExp1;
      }

      if(resultExp2 instanceof Symbol){
        value2 = resultExp2.value;

      }else if(resultExp2 instanceof Value){
        value2 = resultExp2;
      }

      if(value1.type.enumType == EnumType.TYPE && value2.type.enumType == EnumType.TYPE){

        if(value1.type.identifier == value2.type.identifier){

          if(this.operationType == EnumOperationType.DIFFERENT_THAN){
            result.value = value1.value != value2.value; 
      
          }else if(this.operationType == EnumOperationType.LIKE_THAN){
            result.value = value1.value == value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){ 
              result.value = Number(value1.value) >= Number(value2.value);
          
          }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
            result.value = value1.value <= value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_THAN){
            result.value = value1.value > value2.value;
      
          }else if(this.operationType == EnumOperationType.LESS_THAN){
            result.value = value1.value < value2.value;
          }

        }

      }else if(value1.type.enumType == EnumType.TYPE && !(value2.type.enumType == EnumType.TYPE)){

        if(value2.type.enumType == EnumType.NULL || value1.type.identifier == value2.type.enumType){

          if(this.operationType == EnumOperationType.DIFFERENT_THAN){
            result.value = value1.value != value2.value; 
      
          }else if(this.operationType == EnumOperationType.LIKE_THAN){
            result.value = value1.value == value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){ 
              result.value = Number(value1.value) >= Number(value2.value);
          
          }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
            result.value = value1.value <= value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_THAN){
            result.value = value1.value > value2.value;
      
          }else if(this.operationType == EnumOperationType.LESS_THAN){
            result.value = value1.value < value2.value;
          }

        }else{
          console.log("Error de tipos en types")
        }


      }else if(!(value1.type.enumType == EnumType.TYPE) && value2.type.enumType == EnumType.TYPE){

        if(value1.type.enumType == EnumType.NULL || value1.type.enumType == value2.type.identifier){

          if(this.operationType == EnumOperationType.DIFFERENT_THAN){
            result.value = value1.value != value2.value; 
      
          }else if(this.operationType == EnumOperationType.LIKE_THAN){
            result.value = value1.value == value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){ 
              result.value = Number(value1.value) >= Number(value2.value);
          
          }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
            result.value = value1.value <= value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_THAN){
            result.value = value1.value > value2.value;
      
          }else if(this.operationType == EnumOperationType.LESS_THAN){
            result.value = value1.value < value2.value;
          }

        }else{
          console.log("Error de tipos en types")
        }

      }

    }
    
    return result;
  }

  getC3D(env){
    let result1 = this.expresion1.getC3D(env);
    let result2 = this.expresion2.getC3D(env);

    if(result1 == null || result2 == null || result1.type.enumType == EnumType.ERROR || result2.type.enumType == EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Valores en operacion ${this.operationType.toString()}`,env.enviromentType));
      return new RESULT();
    }

    switch(this.operationType.enumOperationType){
      case EnumOperationType.MORE_THAN:
      case EnumOperationType.LESS_THAN:
      case EnumOperationType.MORE_EQUAL_TO:
      case EnumOperationType.LESS_EQUAL_TO:
        return this.executeOtherRelationOperations(env,result1,result2);
      case EnumOperationType.LIKE_THAN:
      case EnumOperationType.DIFFERENT_THAN:
        return this.executeLikeAndDifferentThan(env,result1,result2);
    }

  }

  executeLikeAndDifferentThan(env,result1,result2){
    let result = new RESULT();
    let enumTypeResultOperation = TreatmentOfPrimitiveTypes.getTopType(result1,result2);
  
    if(enumTypeResultOperation == EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo para la operacion`,env.enviromentType));
      return result;
    }
    
    switch(enumTypeResultOperation){
      case EnumType.NUMBER:
      case EnumType.BOOLEAN:
        return this.likeAndDifferentNumber(env,result1,result2);
      case EnumType.STRING:
        return this.likeAndDifferentString(env,result1,result2);
      default:
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de valor ${enumOperationType.toString()}, no se puede operar`,env.enviromentType));
        return result;
    }
      
  }
    
  likeAndDifferentString(env,result1,result2){
    let result = new RESULT();

    if(result1.type.enumType != EnumType.STRING || result2.type.enumType != EnumType.STRING){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede opera estos tipos de valores ${result1.type.toString()}, ${result2.type.toString()}`,env.enviromentType));
      return new RESULT();
    }

    let tPos = Singleton.getTemporary();
    let tVal = Singleton.getTemporary();
    let tSuma = Singleton.getTemporary();
    let lReturn = Singleton.getLabel();
    let lExit = Singleton.getLabel();
      
    let tPos2 = Singleton.getTemporary();
    let tVal2 = Singleton.getTemporary();
    let tSuma2 = Singleton.getTemporary();
    let lReturn2 = Singleton.getLabel();
    let lExit2 = Singleton.getLabel();
    
    let tResul = Singleton.getTemporary();
    let lTrue = Singleton.getLabel();
    let lFalse = Singleton.getLabel();
      
    result.trueLabels.push(lTrue);
    result.falseLabels.push(lFalse);
  
    result.code = result1.code + result2.code;
    result.code += `${tSuma} = 0;\n`;
    result.code += `${tPos} = ${result1.value};\n`;
    result.code += `if(${tPos}  <0) goto ${lExit};\n`;
    result.code += `${tVal} = 0;\n`;
    result.code += `${lReturn}:\n`;
    result.code += `${tVal} = Heap[(int)${tPos}];\n`;
    result.code += `${tPos} = ${tPos} + 1;\n`;  
    result.code += `if(${tVal} == -1) goto ${lExit};\n`;
    result.code += `${tSuma} = ${tSuma} + ${tVal};\n`;
    result.code += `goto ${lReturn};\n`;
    result.code += `${lExit}:\n`;

    result.code += `${tSuma2} = 0;\n`;
    result.code += `${tPos2} = ${result2.value};\n`;
    result.code += `if(${tPos2} < 0) goto ${lExit2};\n`;
    result.code += `${tVal2} = 0;\n`;
    result.code += `${lReturn2}:\n`;
    result.code += `${tVal2} = Heap[(int)${tPos2}];\n`;
    result.code += `${tPos2} = ${tPos2} + 1;\n`;
    result.code += `if(${tVal2} == -1) goto ${lExit2};\n`;
    result.code += `${tSuma2} = ${tSuma2} + ${tVal2};\n`;
    result.code += `goto ${lReturn2};\n`;
    result.code += `${lExit2}:\n`;
      
    result.code += `if(${tSuma} ${this.operationType.toString()} ${tSuma2}) goto ${lTrue};\n`;
    result.code += `goto ${lFalse};\n`;
  
    result.type.enumType = EnumType.BOOLEAN;
    result.value = this.getValueOfResult(tSuma,tSuma2);

    Singleton.deleteTemporaryIntoDisplay(tPos);
    Singleton.deleteTemporaryIntoDisplay(tVal);
    Singleton.deleteTemporaryIntoDisplay(tSuma);
    Singleton.deleteTemporaryIntoDisplay(tPos2);
    Singleton.deleteTemporaryIntoDisplay(tVal2);
    Singleton.deleteTemporaryIntoDisplay(tSuma2);
    Singleton.deleteTemporaryIntoDisplay(result1.value);
    Singleton.deleteTemporaryIntoDisplay(result1.value);

    return result;
  }
    
  likeAndDifferentNumber(env,result1,result2){
    let result = new RESULT()

    if(result1.type.enumType == EnumType.NUMBER && !(result2.type.enumType == EnumType.NUMBER) || result1.type.enumType == EnumType.BOOLEAN && !(result2.type.enumType == EnumType.BOOLEAN)){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede opera estos tipos de valores ${result1.type.toString()}, ${result2.type.toString()}`,env.enviromentType));
      return new RESULT();
    }

    let lTrue;
    let lFalse;

    result.trueLabels.push(...result1.trueLabels,...result2.trueLabels);
    result.falseLabels.push(...result1.falseLabels,...result2.falseLabels);

    if(result.trueLabels.length == 0){
      lTrue = Singleton.getLabel();
      result.trueLabels.push(lTrue);
    }else{
      lTrue = result.trueLabels[result.trueLabels.length - 1];
    }

    if(result.falseLabels.length == 0){
      lFalse = Singleton.getLabel();
      result.falseLabels.push(lFalse);
    }else{
      lFalse = result.trueLabels[result.falseLabels.length - 1];
    }

    result.code = result1.code + result2.code;
    result.code += `if(${result1.value} ${this.operationType.toString()} ${result2.value}) goto ${lTrue};\n`;
    result.code += `goto ${lFalse};\n`;

    result.type.enumType = EnumType.BOOLEAN;
    result.value = this.getValueOfResult(result1.vallue,result2.value);

    Singleton.deleteTemporaryIntoDisplay(result1.value);
    Singleton.deleteTemporaryIntoDisplay(result2.value);

    return result;
  }

  executeOtherRelationOperations(env,result1,result2){
    let result = new RESULT();
    let enumTypeResultOperation = TreatmentOfPrimitiveTypes.getTopType(result1,result2);

    if(enumTypeResultOperation == EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo para la operacion`,env.enviromentType));
      return result;
    }
    
    if(enumTypeResultOperation != EnumType.NUMBER){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La operacion no soporta el tipo: ${enumTypeResultOperation}`,env.enviromentType));
        return result;
    }
    
    if(!TreatmentOfPrimitiveTypes.numberValid(result1,result2)){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede hacer la operacion: ${this.operationType.toString()}, con los tipos ${result1.type.toString()}, ${result2.type.toString()}`,env.enviromentType));
      return result;
    }

    let lTrue; 
    let lFalse;
    
    result.trueLabels.push(...result1.trueLabels,...result2.trueLabels);
    result.falseLabels.push(...result1.falseLabels,...result2.falseLabels);

    if(result.trueLabels.length == 0){
      lTrue = Singleton.getLabel();
      result.trueLabels.push(lTrue);
    }else{
      lTrue = result.trueLabels[result.trueLabels.length - 1];
    }

    if(result.falseLabels.length == 0){
      lFalse = Singleton.getLabel();
      result.falseLabels.push(lFalse);
    }else{
      lFalse = result.trueLabels[result.falseLabels.length - 1];
    }

    result.code = result1.code + result2.code;
    result.code += `if(${result1.value} ${this.operationType.toString()} ${result2.value}) goto ${lTrue};\n`;
    result.code += `goto ${lFalse};\n`;

    result.type.enumType = EnumType.BOOLEAN;
    result.value = this.getValueOfResult(result1.value,result2.value);

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

  getValueOfResult(val1,val2){
    switch(this.operationType.enumOperationType){
      case EnumOperationType.MORE_THAN:
        return this.getNumbervalue(val1 > val2);
      case EnumOperationType.LESS_THAN:
        return this.getNumbervalue(val1 < val2);
      case EnumOperationType.MORE_EQUAL_TO:
        return this.getNumbervalue(val1 >= val2);
      case EnumOperationType.LESS_EQUAL_TO:
        return this.getNumbervalue(val1 <= val2);
      case EnumOperationType.LIKE_THAN:
        return this.getNumbervalue(val1 === val2);
      case EnumOperationType.DIFFERENT_THAN:
        return this.getNumbervalue(val1 != val2);
    }
  }

  getNumbervalue(bool){
    return (bool == true) ? 1 : 0;
  }

}
