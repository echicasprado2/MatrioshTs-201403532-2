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
      case EnumType.NULL:
        result1.type.enumType = EnumType.NUMBER;
        result1.type.identifier = 'INTEGER';
        result2.type.enumType = EnumType.NUMBER;
        result2.type.identifier = 'INTEGER';
        return this.likeAndDifferentNumber(env,result1,result2);
      default:
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de valor ${enumOperationType.toString()}, no se puede operar`,env.enviromentType));
        return result;
    }
      
  }
    
  likeAndDifferentString(env,result1,result2){
    let result = new RESULT();

    if((result1.type.enumType != EnumType.STRING && result1.type.enumType != EnumType.NULL) || 
      (result2.type.enumType != EnumType.STRING && result2.type.enumType != EnumType.NULL)){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede opera estos tipos de valores ${result1.type.toString()}, ${result2.type.toString()}`,env.enviromentType));
      return new RESULT();
    }

    let tPos1 = Singleton.getTemporary();
    let tPos2 = Singleton.getTemporary();
    let tval1 = Singleton.getTemporary();
    let tval2 = Singleton.getTemporary();
    let linit = Singleton.getLabel();
    let ltrue = Singleton.getLabel();
    let lsigtrue = Singleton.getLabel();
    let lsigfalse = Singleton.getLabel();
    let lfalse = Singleton.getLabel();
    let lfinval1 = Singleton.getLabel();
    let lfinval2 = Singleton.getLabel();
    let lnull2 = Singleton.getLabel();
    let tresult = Singleton.getTemporary();

    result.code = result1.code + result2.code;
    result.code += `${tPos1} =  ${result1.value};//inicio primera cadena\n`;
    result.code += `${tPos2} =  ${result2.value};//inicio segunda cadena\n`;
    result.code += `if(${tPos1} ==  -1) goto ${lnull2};\n`;
    result.code += `goto ${linit};\n`;
    result.code += `${linit}:\n`;
    result.code += `${tval1} = Heap[(int)${tPos1}];//valor de cadena 1\n`;
    result.code += `${tval2} = Heap[(int)${tPos2}];//valor de cadena 2\n`;
    
    if(this.operationType.enumOperationType == EnumOperationType.LIKE_THAN){
      result.code += `if(${tval1} == -1) goto ${lfinval2};\n`;
      result.code += `if(${tval1} !=  ${tval2}) goto ${lsigfalse};\n`; //*
      result.code += `${tPos1} = ${tPos1} + 1;\n`;
      result.code += `${tPos2} = ${tPos2} + 1;\n`;
      result.code += `goto ${linit};\n`;
      result.code += `${lfinval2}:\n`;
      result.code += `if(${tval2} == -1) goto ${lsigtrue};\n`; // *
      result.code += `goto ${lsigfalse};\n`;                   // *
      
      result.code += `${lnull2}:\n`;
      result.code += `if(${tPos2} == -1) goto ${lsigtrue};\n`; //*
      result.code += `goto ${lsigfalse};\n`;                   //*
  
      result.code += `${lsigtrue}:\n`;  
      result.code += `${tresult} = 1;\n`;
      result.code += `goto ${ltrue};\n`;
  
      result.code += `${lsigfalse}:\n`;
      result.code += `${tresult} = 0;\n`;  
      result.code += `goto ${lfalse};\n`;

    }else{
      result.code += `if(${tval1} == -1) goto ${lfinval2};\n`;
      result.code += `if(${tval2} == -1) goto ${lfinval1};\n`;
      result.code += `if(${tval1} ==  ${tval2}) goto ${lsigfalse};\n`; //*
      result.code += `${tPos1} = ${tPos1} + 1;\n`;
      result.code += `${tPos2} = ${tPos2} + 1;\n`;
      result.code += `goto ${linit};\n`;

      result.code += `${lfinval1}:\n`;
      result.code += `if(${tval1} == -1) goto ${lsigtrue};\n`; // *
      result.code += `goto ${lsigtrue};\n`;                   // *

      result.code += `${lfinval2}:\n`;
      result.code += `if(${tval2} == -1) goto ${lsigtrue};\n`; // *
      result.code += `goto ${lsigtrue};\n`;                   // *
      
      result.code += `${lnull2}:\n`;
      result.code += `if(${tPos2} == -1) goto ${lsigfalse};\n`; //*
      result.code += `goto ${lsigtrue};\n`;                   //*
  
      result.code += `${lsigtrue}:\n`;  
      result.code += `${tresult} = 1;\n`;
      result.code += `goto ${ltrue};\n`;
  
      result.code += `${lsigfalse}:\n`;
      result.code += `${tresult} = 0;\n`;  
      result.code += `goto ${lfalse};\n`;
    }


    result.trueLabels.push(ltrue);
    result.falseLabels.push(lfalse);
    result.type.enumType = EnumType.BOOLEAN;
    result.value = tresult;

    Singleton.deleteTemporaryIntoDisplay(tPos1);
    Singleton.deleteTemporaryIntoDisplay(tPos2);
    Singleton.deleteTemporaryIntoDisplay(tval1);
    Singleton.deleteTemporaryIntoDisplay(tval2);
    Singleton.deleteTemporaryIntoDisplay(result1.value);
    Singleton.deleteTemporaryIntoDisplay(result2.value);


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
