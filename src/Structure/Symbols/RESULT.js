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
        this.trueLabels = [];
        this.falseLabels = [];
        this.breakLabels = [];
        this.continueLabels = [];
        this.exitLabels = [];
    }

}