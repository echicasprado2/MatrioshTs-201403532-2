class Arithmetic extends Expresion {

  /**
   * 
   * @param {number} linea 
   * @param {number} column 
   * @param {TypeOperation} operationType 
   * @param {Expresion} expresion1 
   * @param {Expresion} expresion2 
   */
  constructor(linea, column, operationType, expresion1, expresion2) {
    super(linea, column);
    this.operationType = operationType;
    this.expresion1 = expresion1;
    this.expresion2 = expresion2;
  
    this.translatedCode = "";
  }

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

    if(result1 == null || result2 == null || result1 == undefined || result2 == undefined || result1.type.enumType == EnumType.ERROR || result2.type.enumType == EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Operacion aritmetica, con los valores`,env.enviromentType));
      return new RESULT();
    }
    
    switch(this.operationType.enumOperationType){
      case EnumOperationType.PLUS:
        return this.makePlusC3D(env,result1,result2);
      
      case EnumOperationType.MINUS:
        return this.makeOtherArithmeticOperation(env,result1,result2);
      
      case EnumOperationType.MULTIPLICATION:
        return this.makeOtherArithmeticOperation(env,result1,result2);

      case EnumOperationType.DIVISION:
        return this.makeOtherArithmeticOperation(env,result1,result2);

      case EnumOperationType.MODULE:
        return this.makeOtherArithmeticOperation(env,result1,result2);

      case EnumOperationType.POWER:
        return this.makePowerC3D(env,result1,result2);

      default:
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de operacion no es valida ${this.operationType.toString()}`,env.enviromentType));
        return new RESULT();
    }
        
  }

  makePlusC3D(env,result1,result2){
    let result = new RESULT();
    let enumTypeResultOperation = TreatmentOfPrimitiveTypes.getTopType(result1,result2);
    
    if(enumTypeResultOperation == EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo para la operacion`,env.enviromentType));
      return result;
    }
    
    if(enumTypeResultOperation != EnumType.STRING && enumTypeResultOperation != EnumType.NUMBER && enumTypeResultOperation != EnumType.BOOLEAN){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La operacion no soporta el tipo: ${enumTypeResultOperation}`,env.enviromentType));
        return result;
    }
      
    switch(enumTypeResultOperation){
      case EnumType.STRING:

        if(!TreatmentOfPrimitiveTypes.stringValid(result1,result2)){
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede hacer la suma con los tipos ${result1.type.toString()}, ${result2.type.toString()}`,env.enviromentType));
          return result;
        }

        
        if(result1.type.enumType == EnumType.STRING){

          if(result2.type.enumType == EnumType.NUMBER){
            let tContador = Singleton.getTemporary();
            let tApuntador = Singleton.getTemporary();
            let tentero = Singleton.getTemporary();
            let tdecimal = Singleton.getTemporary();
            let ldecimal = Singleton.getLabel();
            let lexit = Singleton.getLabel();

            result2.code += `${tContador} = P + ${env.size};//apuntador a nuevo ambito\n`;
            result2.code += `${tApuntador} = ${tContador} + 1;//apuntador a espacio de parametro\n`;
            result2.code += `Stack[(int)${tApuntador}] = ${result2.value};//paso el parametro\n`;
            result2.code += `${tentero} = ${result2.value};//copio valor\n`;
            result2.code += `${tdecimal} = ${tentero} - (int)${result2.value};//hago resta para ver si tiene un lado decimal\n`;
            result2.code += `${tdecimal} = ${tdecimal} * 100;//paso lado decimal a entero\n`;
            result2.code += `if(${tdecimal} > 0) goto ${ldecimal};//verifico si el lado decimal existe\n`;
            result2.code += `P = P + ${env.size};//nuevo ammbito\n`;
            result2.code += `${C3DMethods.getCallIntegerToString()};\n`;
            result2.code += `goto ${lexit};\n`;
            result2.code += `${ldecimal}:\n`;
            result2.code += `P = P + ${env.size};//nuevo ammbito\n`;
            result2.code += `${C3DMethods.getCallDoubleToString()};\n`;
            result2.code += `goto ${lexit};\n`;
            result2.code += `${lexit}:\n`;
            result2.code += `${tApuntador} = P + 0;//posicion de return\n`;
            result2.code += `${tContador} = Stack[(int)${tApuntador}];//guardo valor de return\n`;
            result2.code += `P = P - ${env.size};//regreso al ambito local\n`;
            
            result2.type.enumType = EnumType.STRING;
            result2.value = tContador;

            Singleton.deleteTemporaryIntoDisplay(tApuntador);
            Singleton.deleteTemporaryIntoDisplay(tentero);
            Singleton.deleteTemporaryIntoDisplay(tdecimal);

          }else if(result2.type.enumType == EnumType.BOOLEAN){
            let tInicio = Singleton.getTemporary();
            let tPosition = Singleton.getTemporary();
            let lExit = Singleton.getLabel();
            
            for(let item of result2.trueLabels){
              result2.code += `${item}:\n`;
            }

            result2.code += `${tInicio} = H;\n`;
            result2.code += `${tPosition} = ${tInicio};\n`;
            result2.code += `Heap[(int)${tPosition}] = 116;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `Heap[(int)${tPosition}] = 114;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `Heap[(int)${tPosition}] = 117;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `Heap[(int)${tPosition}] = 101;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `Heap[(int)${tPosition}] = -1;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `H = ${tPosition};\n`;
            result2.code += `goto ${lExit};\n`;
              
            
            for(let item of result2.falseLabels){
              result2.code += `${item}:\n`;
            }

            result2.code += `${tInicio} = H;\n`;
            result2.code += `${tPosition} = ${tInicio};\n`;
            result2.code += `Heap[(int)${tPosition}] = 102;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `Heap[(int)${tPosition}] = 97;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `Heap[(int)${tPosition}] = 108;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `Heap[(int)${tPosition}] = 115;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `Heap[(int)${tPosition}] = 101;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `Heap[(int)${tPosition}] = -1;\n`;
            result2.code += `${tPosition} = ${tPosition} + 1;\n`;
            result2.code += `H = ${tPosition};\n`;
            result2.code += `goto ${lExit};\n`;
            result2.code += `${lExit}:\n`;
            
            result2.type.enumType = EnumType.STRING;
            result2.value = tInicio;

            Singleton.deleteTemporaryIntoDisplay(tPosition);

          }
          
        }else if(result2.type.enumType == EnumType.STRING){

          if(result1.type.enumType == EnumType.NUMBER){
            let tContador = Singleton.getTemporary();
            let tApuntador = Singleton.getTemporary();
            let tentero = Singleton.getTemporary();
            let tdecimal = Singleton.getTemporary();
            let ldecimal = Singleton.getLabel();
            let lexit = Singleton.getLabel();

            result1.code += `${tContador} = P + ${env.size};//apuntador a nuevo ambito\n`;
            result1.code += `${tApuntador} = ${tContador} + 1;//apuntador a espacio de parametro\n`;
            result1.code += `Stack[(int)${tApuntador}] = ${result1.value};//paso el parametro\n`;
            
            result1.code += `${tentero} = ${result1.value};//copio valor\n`;
            result1.code += `${tdecimal} = ${tentero} - (int)${result1.value};//hago resta para ver si tiene un lado decimal\n`;
            result1.code += `${tdecimal} = ${tdecimal} * 100;//paso lado decimal a entero\n`;
            result1.code += `if(${tdecimal} > 0) goto ${ldecimal};//verifico si el lado decimal existe\n`;
            result1.code += `P = P + ${env.size};//nuevo ammbito\n`;
            result1.code += `${C3DMethods.getCallIntegerToString()};\n`;
            result1.code += `goto ${lexit};\n`;
            result1.code += `${ldecimal}:\n`;
            result1.code += `P = P + ${env.size};//nuevo ammbito\n`;
            result1.code += `${C3DMethods.getCallDoubleToString()};\n`;
            result1.code += `goto ${lexit};\n`;
            result1.code += `${lexit}:\n`;
            result1.code += `${tApuntador} = P + 0;//posicion de return\n`;
            result1.code += `${tContador} = Stack[(int)${tApuntador}];//guardo valor de return\n`;
            result1.code += `P = P - ${env.size};//regreso al ambito local\n`;
            
            result1.type.enumType = EnumType.STRING;
            result1.value = tContador;

            Singleton.deleteTemporaryIntoDisplay(tApuntador);
            Singleton.deleteTemporaryIntoDisplay(tentero);
            Singleton.deleteTemporaryIntoDisplay(tdecimal);

          }else if(result1.type.enumType == EnumType.BOOLEAN){
            let tInicio = Singleton.getTemporary();
            let tPosition = Singleton.getTemporary();
            let lExit = Singleton.getLabel();

            for(let item of result1.trueLabels){
              result1.code += `${item}:\n`;
            }

            result1.code += `${tInicio} = H;\n`;
            result1.code += `${tPosition} = ${tInicio};\n`;
            result1.code += `Heap[(int)${tPosition}] = 116;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `Heap[(int)${tPosition}] = 114;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `Heap[(int)${tPosition}] = 117;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `Heap[(int)${tPosition}] = 101;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `Heap[(int)${tPosition}] = -1;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `H = ${tPosition};\n`;
            result1.code += `goto ${lExit};\n`;
              
            for(let item of result1.falseLabels){
              result1.code += `${item}:\n`;
            }

            result1.code += `${tInicio} = H;\n`;
            result1.code += `${tPosition} = ${tInicio};\n`;
            result1.code += `Heap[(int)${tPosition}] = 102;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `Heap[(int)${tPosition}] = 97;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `Heap[(int)${tPosition}] = 108;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `Heap[(int)${tPosition}] = 115;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `Heap[(int)${tPosition}] = 101;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `Heap[(int)${tPosition}] = -1;\n`;
            result1.code += `${tPosition} = ${tPosition} + 1;\n`;
            result1.code += `H = ${tPosition};\n`;
            result1.code += `goto ${lExit};\n`;
            result1.code += `${lExit}:\n`;
            
            result1.type.enumType = EnumType.STRING;
            result1.value = tInicio;

            Singleton.deleteTemporaryIntoDisplay(tPosition);

          }

        }
        
        if(result1.type.identifier == "NULL"){
          
          if(result2.type.identifier == "NULL"){
            result.type.enumType = EnumType.STRING;
            result.type.identifier = "NULL";
            return result;

          }else{
            result.type = result2.type;
            result.value = result2.value;
            result.code = result2.code;
            return result;
          }

        }else if(result2.type.identifier == "NULL"){
          
          if(result1.type.identifier == "NULL"){
            result.type.enumType = EnumType.STRING;
            result.type.identifier = "NULL";
            return result;

          }else{
            result.type = result1.type;
            result.value = result1.value;
            result.code = result1.code;
            return result;
          }
        }
        
        if(result1.type.enumType == EnumType.STRING && result2.type.enumType == EnumType.STRING){
          
          result.type.enumType = EnumType.STRING;
          result.code = result1.code + result2.code;
          
          let t1 = Singleton.getTemporary();
          let t2 = Singleton.getTemporary();

          result.code += `${t1} = P + ${env.size};//cambio al proximo ambito\n`;
          result.code += `${t2} = ${t1} + 1;//posicion primer parametro\n`;
          result.code += `Stack[(int)${t2}] = ${result1.value};//apuntador a primera cadena\n`;
          result.code += `${t2} = ${t1} + 2;//posicion segundo parametro\n`;
          result.code += `Stack[(int)${t2}] = ${result2.value};//apuntador a segunda cadena\n`;
          result.code += `P = P + ${env.size};//cambiamos al siguiente ambito\n`;
          result.code += `${C3DMethods.getCallConcatStrings()};//llamo funcion para concatenar strings\n`;
          result.code += `${t2} = P + 0;//posicion de return\n`;
          result.code += `${t1} = Stack[(int)${t2}];//copio el puntero a heap\n`;
          result.code += `P = P - ${env.size};//regreso al entorno actual\n`;
          result.value = t1;

          Singleton.deleteTemporaryIntoDisplay(result1.value);
          Singleton.deleteTemporaryIntoDisplay(result2.value);
          Singleton.deleteTemporaryIntoDisplay(t2);
        }
        
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

        if(result1.type.enumType == EnumType.BOOLEAN){
          for(let item of result1.trueLabels){
            result.code += `${item}:\n`;
          }

          for(let item of result1.falseLabels){
            result.code += `${item}:\n`;
          }
        }

        if(result2.type.enumType == EnumType.BOOLEAN){
          for(let item of result2.trueLabels){
            result.code += `${item}:\n`;
          }

          for(let item of result2.falseLabels){
            result.code += `${item}:\n`;
          }
        }

        result.code += `${t2} = ${result1.value} + ${result2.value};\n`;
        result.value = t2;

        Singleton.deleteTemporaryIntoDisplay(result1.value);
        Singleton.deleteTemporaryIntoDisplay(result2.value);
        break;

      case EnumType.BOOLEAN:
        result.type.enumType = EnumType.NUMBER;
        result.type.identifier = "INTEGER";
        
        let t1 = Singleton.getTemporary();
        
        result.code = result1.code + result2.code;
        
        for(let item of result1.trueLabels){
          result.code += `${item}:\n`;
        }

        for(let item of result2.trueLabels){
          result.code += `${item}:\n`;
        }

        for(let item of result1.falseLabels){
          result.code += `${item}:\n`;
        }

        for(let item of result2.falseLabels){
          result.code += `${item}:\n`;
        }

        result.code += `${t1} = ${result1.value} + ${result2.value};//suma de booleanos\n`
        result.value = t1;

        Singleton.deleteTemporaryIntoDisplay(result1.value);
        Singleton.deleteTemporaryIntoDisplay(result2.value);
        break;
    }

    return result;
  }

  makeOtherArithmeticOperation(env,result1,result2){
    let result = new RESULT();
    let enumTypeResultOperation = TreatmentOfPrimitiveTypes.getTopType(result1,result2);

    if(enumTypeResultOperation == EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo para la operacion`,env.enviromentType));
      return result;
    }
    
    if(enumTypeResultOperation != EnumType.NUMBER && enumTypeResultOperation != EnumType.BOOLEAN){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La operacion no soporta el tipo: ${enumTypeResultOperation}`,env.enviromentType));
        return result;
    }
    
    if(!TreatmentOfPrimitiveTypes.numberValid(result1,result2)){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede hacer la operacion: ${this.operationType.toString()}, con los tipos ${result1.type.toString()}, ${result2.type.toString()}`,env.enviromentType));
      return result;
    }
    
    if(this.operationType.enumOperationType == EnumOperationType.MODULE && (result1.type.identifier === "DOUBLE" || result2.type.identifier === "DOUBLE")){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede hacer la operacion: ${this.operationType.toString()}, con los tipos ${result1.type.identifier.toLowerCase()}, ${result2.type.identifier.toLowerCase()}`,env.enviromentType));
      return result;
    }

    
    if(result1.type.identifier == "DOUBLE"){
      result.type = result1.type;
      
    }else if(result2.type.identifier == "DOUBLE"){
     result.type = result2.type;

    }else{
      result.type = result1.type;
    }

    let t1 = Singleton.getTemporary();

    result.code = result1.code + result2.code;

    if(result1.type.enumType == EnumType.BOOLEAN){
      for(let item of result1.trueLabels){
        result.code += `${item}:\n`;
      }

      for(let item of result1.falseLabels){
        result.code += `${item}:\n`;
      }
    }

    if(result2.type.enumType == EnumType.BOOLEAN){
      for(let item of result2.trueLabels){
        result.code += `${item}:\n`;
      }

      for(let item of result2.falseLabels){
        result.code += `${item}:\n`;
      }
    }

    if(this.operationType.enumOperationType == EnumOperationType.MODULE){
      result.code += `${t1} = (int)${result1.value} ${this.operationType.toString()} (int)${result2.value};\n`;
    }else{
      result.code += `${t1} = ${result1.value} ${this.operationType.toString()} ${result2.value};\n`;
    }

    result.value = t1;

    Singleton.deleteTemporaryIntoDisplay(result1.value);
    Singleton.deleteTemporaryIntoDisplay(result2.value);

    return result;
  }

  makePowerC3D(env,result1,result2){
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
    
    if(this.operationType.enumOperationType == EnumOperationType.POWER && (result1.type.identifier === "DOUBLE" || result2.type.identifier === "DOUBLE")){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede hacer la operacion: ${this.operationType.toString()}, con los tipos ${result1.type.identifier.toLowerCase()}, ${result2.type.identifier.toLowerCase()}`,env.enviromentType));
      return result;
    }
    
    if(result1.type.identifier === "NEGATIVO" || result2.type.identifier === "NEGATIVO"){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede hacer la operacion: ${this.operationType.toString()}, con valores negativos ${result1.value}, ${result2.value}`,env.enviromentType));
      return result;
    }

    result.type = result1.type;
    result.code = result1.code + result2.code;

    if(result1.type.enumType == EnumType.BOOLEAN){
      for(let item of result1.trueLabels){
        result.code += `${item}:\n`;
      }

      for(let item of result1.falseLabels){
        result.code += `${item}:\n`;
      }
    }

    if(result2.type.enumType == EnumType.BOOLEAN){
      for(let item of result2.trueLabels){
        result.code += `${item}:\n`;
      }

      for(let item of result2.falseLabels){
        result.code += `${item}:\n`;
      }
    }

    let t1 = Singleton.getTemporary();
    let tContador = Singleton.getTemporary();

    let lCiclo = Singleton.getLabel();
    let lPositivo = Singleton.getLabel();
    let lExit = Singleton.getLabel();

    result.code += `${t1} = 1;\n`;
    result.code += `${tContador} = 1;\n`;
    result.code += `if(${result2.value} > 0) goto  ${lPositivo};\n`;
    result.code += `if(${result2.value} == 0) goto ${lExit};\n`;
    result.code += `${t1} = -1;\n`;
    result.code += `${lPositivo}:\n`;
    result.code += `${tContador} = ${result2.value} * ${tContador};\n`;
    result.code += `${tContador} = ${tContador} + 1;\n`;
    result.code += `${lCiclo}:\n`;
    result.code += `${t1} = ${t1} * ${result1.value};\n`;
    result.code += `${tContador} = ${tContador} - 1;\n`;
    result.code += `if(${tContador} != 1) goto ${lCiclo};\n`;
    result.code += `if(${result2.value} > 0) goto ${lExit};\n`;
    result.code += `${t1} = 0 - ${t1};\n`;
    result.code += `${lExit}:\n`;

    result.value = t1;

    Singleton.deleteTemporaryIntoDisplay(result1.value);
    Singleton.deleteTemporaryIntoDisplay(result2.value);
    Singleton.deleteTemporaryIntoDisplay(tContador);
    return result;
  }

  fillTable(env){
    return null;
  }

  getSize(){
    return 0;
  }

}
