/**
 * @class this class, use to return all data in translated c3d
 * all class return this object
 */
class RESULT{
  
    constructor(){
        this.symbol = null;
        this.type = new Type(EnumType.ERROR,null);
        this.code = "";
        this.value = "";
        this.trueLabels = [];//booleanos
        this.falseLabels = [];//booleanos
        this.breakLabels = [];//usar para if, for, while, do while, switch
        this.continueLabels = [];//usar para for, while, do while
        this.exitLabels = [];//subir esto para los returns
    }

}