class Instruction extends Node {
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     */
    constructor(linea, column) {
        super(linea, column);
    }

    /**
     * 
     * @param { Environment } e 
     */
    execute(e){
        return "implementar";
    }

    getC3D(env,isTableFull){
        return null;
    }

    getSize(instruccions){
        return 0;
    }

    fillTable(env,instruccions){
        return null;
    }

}
