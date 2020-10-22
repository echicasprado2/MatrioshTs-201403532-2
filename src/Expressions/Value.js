/**
 * @class use this class for save all value
 */
class Value extends Expresion {
  /**
   *
   * @param type - Type
   * @param value - Object
   *
   */
  constructor(type, value) {
    if (
      type.enumType == EnumType.STRING &&
      value != null &&
      !(value instanceof Array)
    ) {
      value = value.replace('"', "");
      value = value.replace('"', "");
      value = value.replace("'", "");
      value = value.replace("'", "");
      value = value.replace("`", "");
      value = value.replace("`", "");
    }

    super(0, 0, type, value);
    if (value instanceof Array) {
      this.esArray = true;
    } else {
      this.esArray = false;
    }

    this.translatedCode = "";
  }

  /**
   * obtener el codigo para la traduccion
   */
  getTranslated() {
    if (this.type.enumType == EnumType.STRING) {
      if (this.value == null) {
        this.translatedCode = '""';
      } else {
        this.translatedCode = `"${this.value.toString()}"`;
      }
    } else {
      this.translatedCode = this.value.toString();
    }

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
    return "implementar este codigo";
  }

  getValue(e) {
    if (this.type.enumType == EnumType.STRING) {
      this.value = this.value.replace(/\\\"/g, '"');
      this.value = this.value.replace(/\\/g, "\\");
      this.value = this.value.replace(/\\n/g, "\n");
      this.value = this.value.replace(/\\r/g, "\r");
      this.value = this.value.replace(/\\t/g, "\t");
    }

    if (this.value == null) {
      let nuevoValor = new Value(this.type, "@vacio");
      return nuevoValor;
    }

    return new Value(this.type, this.value);
  }

  getC3D(env) {
    let result = new RESULT();
    let tInicio;
    let tPosition;

    result.type = this.type;
    result.value = this.value;

    if (this.type.enumType == EnumType.BOOLEAN) {
      let trueLabel = Singleton.getLabel();
      let falseLabel = Singleton.getLabel();

      result.value = result.value.toLowerCase() == "true" ? 1 : 0;
      result.trueLabels.push(trueLabel);
      result.falseLabels.push(falseLabel);
      result.code += `if(${result.value} == 1) goto ${trueLabel};\n`;
      result.code += `goto ${falseLabel};\n`;
    
    }else if (this.type.enumType == EnumType.STRING) {
      tInicio = Singleton.getTemporary();
      tPosition = Singleton.getTemporary();

      let listChar = this.value.split("");

      if (listChar.length == 0) {
        result.value = -1;
        result.type.identifier = "NULL";
        result.code = "";
        return result;
      }

      result.value = tInicio;
      result.code += `${tInicio} = H;//Guardo el inicio de la variable en Heap\n`;
      result.code += `${tPosition} = ${tInicio};//Copio el inicio de la en Heap, para moverme en las posiciones\n`;

      for (let i = 0; i < listChar.length; i++) {
        if (listChar[i] === "\\") {
          i++;
          result.code += `Heap[(int)${tPosition}] = ${this.getSpecialChar(
            listChar[i]
          )};//char -> \\${listChar[i]}\n`;
        } else {
          result.code += `Heap[(int)${tPosition}] = ${listChar[i].charCodeAt(
            0
          )};//char -> ${listChar[i]}\n`;
        }

        result.code += `${tPosition} = ${tPosition} + 1;\n`;
      }
      result.code += `Heap[(int)${tPosition}] = -1;//fin de cadena\n`;
      result.code += `${tPosition} = ${tPosition} + 1;\n`;
      result.code += `H = ${tPosition};//apunta a la primera posicion libre de Heap\n`;
    
    }else if(this.type.enumType == EnumType.NULL){
      result.value = -1;
      result.code = '';
    }



    return result;
  }

  getSpecialChar(char) {
    switch (char) {
      case "n":
        return 10;
      case '"':
        return 34;
      case "\\":
        return 92;
      case "t":
        return 9;
      case "r":
        return 13;
      default:
        return char;
    }
  }
}
