class Arithmetic extends Expresion {

  /**
   * 
   * @param {*} linea 
   * @param {*} column 
   * @param {*} operationType 
   * @param {*} expresion1 
   * @param {*} expresion2 
   */
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
  executeSymbolsTable(e) {
    
  }

  getValue(e){
    var result = new Value(new Type(EnumType.ERROR,""),"Error");
    var resultExp1 = this.expresion1.getValue(e);
    var resultExp2 = this.expresion2.getValue(e);


    if(resultExp1 == undefined || 
      resultExp2 == undefined || 
      resultExp1 instanceof Value && resultExp1.type.enumType == EnumType.ERROR || 
      resultExp2 instanceof Value && resultExp2.type.enumType == EnumType.ERROR){
      return result;
    }

    var enumTypeResultOperation = TreatmentOfPrimitiveTypes.getTopType(resultExp1,resultExp2);

    if(enumTypeResultOperation === EnumType.ERROR || enumTypeResultOperation === EnumType.BOOLEAN){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de variables no se pueden operar`,e.enviromentType));
      return result;
    }
    
    if(enumTypeResultOperation === EnumType.STRING){
      if(this.operationType.enumOperationType == EnumOperationType.PLUS){
        result.type.enumType = enumTypeResultOperation;

        if(resultExp1.value === "@vacio"){
          result.value = resultExp2.value;
        }else if(resultExp2.value === "@vacio"){
          result.value = resultExp1.value;
        }else{
          result.value = resultExp1.value + resultExp2.value;
        }

        return result;
      }else{
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(enumErrorType.SEMATIC),`Tipo de operacion invalidad no se puede realizar ${this.operationType.toString()} con ${enumTypeResultOperation.toString()}`,e.enviromentType));
        return result;
      }
    }

    if(enumTypeResultOperation == EnumType.NUMBER){
      result.type.enumType = enumTypeResultOperation;
      
      if(this.operationType.enumOperationType == EnumOperationType.PLUS){
        result.value = Number(resultExp1.value) + Number(resultExp2.value);

      }else if(this.operationType.enumOperationType == EnumOperationType.MINUS){
        result.value = Number(resultExp1.value) - Number(resultExp2.value);
      
      }else if(this.operationType.enumOperationType == EnumOperationType.MULTIPLICATION){
        result.value = Number(resultExp1.value) * Number(resultExp2.value);
      
      }else if(this.operationType.enumOperationType == EnumOperationType.DIVISION){
        result.value = Number(resultExp1.value) / Number(resultExp2.value);
      
      }else if(this.operationType.enumOperationType == EnumOperationType.POWER){
        result.value = Math.pow(Number(resultExp1.value),Number(resultExp2.value));
      
      }else if(this.operationType.enumOperationType == EnumOperationType.MODULE){
        result.value = Number(resultExp1.value) % Number(resultExp2.value);
      }
    }

    return result;
  }

  getC3D(env){
    let result1 = this.expresion1.getC3D(env);
    let result2 = this.expresion2.getC3D(env);

    if(result1 == null || result2 == null || result1.type.enumType == EnumType.ERROR || result2.type.enumType == EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Operacion aritmetica, con los valores ${result1.value}, ${result2.value}`,env.enviromentType));
      return new RESULT();
    }
    
    switch(this.operationType.enumOperationType){
      case EnumOperationType.PLUS:
        return this.makePlusC3D(env,result1,result2);
        default:
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de operacion no es valida ${this.operationType.toString()}`,env.enviromentType));
          return new RESULT();
        }
        
  }

  makePlusC3D(env,result1,result2){
    /**
     * here I make plus only primity values
     * string
     * number
     * booleans
    */
    let result = new RESULT();
    
    let enumTypeResultOperation = TreatmentOfPrimitiveTypes.getTopType(result1,result2);
    
    if(enumTypeResultOperation == EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo para la operacion`,env.enviromentType));
      return result;
    }
    
    if(enumTypeResultOperation != EnumType.STRING && 
      enumTypeResultOperation != EnumType.NUMBER && 
      enumTypeResultOperation != EnumType.BOOLEAN){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La operacion no soporta el tipo: ${enumTypeResultOperation}`,env.enviromentType));
        return result;
      }
      
    switch(enumTypeResultOperation){
      case EnumType.STRING:
        /**
         * tengo que concatenar las cadenas
        */
       
        if(!TreatmentOfPrimitiveTypes.stringValid(result1,result2)){
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede hacer la suma con los tipos ${result1.type.toString()}, ${result2.type.toString()}`,env.enviromentType));
          return result;
        }

        result.type.enumType = EnumType.STRING;

        if(result1.type.enumType == EnumType.STRING && result2.type.enumType == EnumType.STRING){
          let tContador = Singleton.getTemporary();
          let tApuntador = Singleton.getTemporary();
          let tAuxiliar = Singleton.getTemporary();
          let tPosicionCadena = Singleton.getTemporary();

          let l1 = Singleton.getLabel();
          let l2 = Singleton.getLabel();

          result.code = result1.code + result2.code;
          result.code += `${tContador} = H;\n`;
          result.code += `${tApuntador} = H;\n`;
          result.code += `${tPosicionCadena} = ${result1.value};\n`;
          result.code += `goto ${l1};\n`;
          result.code  += `${l1}:\n`;
          result.code += `${tAuxiliar} = Heap[(int)${tPosicionCadena}];\n`;
          result.code += `Heap[(int)${tContador}] = ${tAuxiliar};\n`;
          result.code += `${tContador} = ${tContador} + 1;\n`;
          result.code += `${tPosicionCadena} = ${tPosicionCadena} + 1;\n`;
          result.code += `if(${tAuxiliar} > -1)  goto ${l1};\n`;
          result.code += `${tContador} = ${tContador} - 1;\n`;
          // result.code += `H = ${tContador};\n`;
          result.code += `${tPosicionCadena} = ${result2.value};\n`;
          result.code += `goto ${l2};\n`;
          result.code += `${l2}:\n`;
          result.code += `${tAuxiliar} = Heap[(int)${tPosicionCadena}];\n`;
          result.code += `Heap[(int)${tContador}] = ${tAuxiliar};\n`;
          result.code += `${tContador} = ${tContador} + 1;\n`;
          result.code += `${tPosicionCadena} = ${tPosicionCadena} + 1;\n`;
          result.code += `if(${tAuxiliar} > -1) goto ${l2};\n`;
          result.code += `Heap[(int)${tContador}] = -1;\n`;
          result.code += `${tContador} = ${tContador} + 1;\n`;
          result.code += `H = ${tContador};\n`;
          result.value = tApuntador;
        }
        // if(result1.type.enumType == EnumType.NUMBER || result1.type.enumType.BOOLEAN){

        // }
        break;
      case EnumType.NUMBER:
        if(!TreatmentOfPrimitiveTypes.numberValid(result1,result2)){
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede hacer la suma con los tipos ${result1.type.toString()}, ${result2.type.toString()}`,env.enviromentType));
          return result;
        }

        if(result1.type.identifier == "DOUBLE"){
          result.type = result1.type;
          
        }else if(result2.type.identifier == "DOUBLE"){
         result.type = result2.type;
   
        }else{
          result.type = result1.type;
        }

        let t2 = Singleton.getTemporary();

        result.code = result1.code + result2.code;
        result.code += `${t2} = ${result1.value} + ${result2.value};//\n`;
        result.value = t2;
        break;

      case EnumType.BOOLEAN:
        result.type.enumType = EnumType.NUMBER;
        result.type.identifier = "INTEGER";
        
        let t1 = Singleton.getTemporary();
        
        result.code = result1.code + result2.code;
        result.code += `${t1} = ${result1.value} + ${result2.value};//suma de booleanos\n`
        result.value = t1;
        break;
    }

    return result;
  }

}
