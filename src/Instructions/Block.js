class Block extends Instruction {
  
  /**
   * 
   * @param {*} sentences 
   */
  constructor(sentences) {
    super(0, 0);

    this.sentences = sentences;
    this.translatedCode = "";
  }

  getTranslated() {
    this.translatedCode = "{\n";

    for(var i = 0;i < this.sentences.length;i++){
        this.translatedCode += `\t${this.sentences[i].getTranslated()}`;
    }

    this.translatedCode += "}"
    return this.translatedCode;
  }

  translatedSymbolsTable(e) {
    for (var i = 0; i < this.sentences.length; i++) {
        this.sentences[i].translatedSymbolsTable(e);
    }
  }

  executeSymbolsTable(e) {
    return "implementar";
  }

  execute(e) {
    var resultBlock;

    for(var i = 0; i < this.sentences.length; i++){
      
      if(this.sentences[i] instanceof Instruction){
        resultBlock = (this.sentences[i]).execute(e);
        
        if(resultBlock != null){

          if(resultBlock instanceof Break){
            return resultBlock;
          }else if(resultBlock instanceof Continue){
            return resultBlock;  
          }else if(resultBlock instanceof Return){
            return resultBlock;    
          }else{
          }

        }

      }else if(this.sentences[i] instanceof Expresion){
        (this.sentences[i]).getValue(e);
      }

    }
    return null;
  }

  getSize(){
    let counter = 0;
    for(let item of this.sentences){
      if(item instanceof Instruction) counter += item.getSize();
    }
    return counter;
  }

}