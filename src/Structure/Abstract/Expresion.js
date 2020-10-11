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

    /**
    * @param env [Environment] enviroment
    * @return type [Type] return a type, use this for make valids and get c3d
    */
    getType(env){}


    /**
    * @param env [Environment] enviroment
    * @param code [String] use for add code
    * @return code [String] return string with code
    */
    getC3D(env,code){}

}
