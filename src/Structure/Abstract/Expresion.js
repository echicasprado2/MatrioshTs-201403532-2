class Expresion extends Node {
    /**
     * 
     * @param {*} line 
     * @param {*} column 
     * @param {*} type 
     * @param {*} value 
     */
    constructor(line, column, type, value) {
        super(line, column);
        this.type = type;
        this.value = value;
        this.parentesis = false;
    }

    /**
     * 
     * @param {Environment} e 
     */
    getValue(e){
        return "implementar";
    }

}
