class CaseSwitch extends Instruction {
  /**
   *
   * @param {*} linea
   * @param {*} column
   * @param {*} expression
   * @param {*} block
   * @param {*} isCase
   * @param {*} haveBlock
   */
  constructor(linea, column, expression, block, isCase, haveBlock) {
    super(linea, column);

    this.expression = expression;
    this.block = block;
    this.isCase = isCase;
    this.haveBlock = haveBlock;

    this.translatedCode = "";
  }

  getTranslated() {
    var tmp = "";

    if (this.isCase) {
      this.translatedCode += `case ${this.expression.getTranslated()}:\n`;
    } else {
      this.translatedCode += "default:\n";
    }

    if (this.haveBlock) {
      tmp = this.block.getTranslated();
      tmp = tmp.replace("{", "");
      tmp = tmp.replace("}", "");
      tmp = tmp.replace("\n", "");
    }

    this.translatedCode += tmp;

    return this.translatedCode;
  }

  translatedSymbolsTable(e) {
    return "implementar";
  }

  executeSymbolsTable(e) {
    return "implementar";
  }

  execute(e) {
    return this.block.execute(e);
  }

  getC3D(env) {
    let result = new RESULT();
    let resultExpresion;
    let resultBlock;

    result.code += `//------------ INICIO DE CASE -----------------\n`;

    if (this.isCase) {
      resultExpresion = this.expression.getC3D(env);

      if(resultExpresion.type.enumType != EnumType.BOOLEAN && resultExpresion.type.enumType != EnumType.NUMBER){
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de valor de case, no es soportado ${resultExpresion.type.toString()}`,env.enviromentType));
          return result;
      }

      result.type = resultExpresion.type;
      result.value = resultExpresion.value;
      result.trueLabels = [...resultExpresion.trueLabels];
      result.falseLabels = [...resultExpresion.falseLabels];
      result.breakLabels = [...resultExpresion.breakLabels];
      result.continueLabels = [...resultExpresion.continueLabels];
      result.exitLabels = [...resultExpresion.exitLabels];
      result.code += resultExpresion.code;
    }

    if(result.trueLabels.length == 0 && this.isCase){
        let lt = Singleton.getLabel();
        result.trueLabels.push(lt);
    }

    if(result.falseLabels.length == 0 && this.isCase) {
        let lf = Singleton.getLabel();
        result.falseLabels.push(lf);
    }

    if(this.isCase){
        result.code += `//--------- SALTO PARA EJECUTAR EL BLOCK DEL CASE ----------------\n`;
    }else{
        result.code += `//--------- SALTO PARA EJECUTAR EL BLOCK DEFAULT ----------------\n`;
    }

    for(let lt  of result.trueLabels){
        result.code += `${lt}:\n`;
    }

    if (this.haveBlock) {
      resultBlock = this.block.getC3D(env);

      result.continueLabels = [...resultBlock.continueLabels];
      result.exitLabels.push(...resultBlock.breakLabels);
      result.exitLabels.push(...resultBlock.exitLabels);
      result.code += resultBlock.code;
    }
    
    return result;
  }

  fillTable(env) {
    this.block.fillTable(env);
    return null;
  }

  getSize() {
    return this.block.getSize();
  }
}
