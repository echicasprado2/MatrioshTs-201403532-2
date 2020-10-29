class Singleton{
    static counterTemporary = 0;
    static counterLabels = 0;
    static positionRelativeOfStack = 0;
    static positionRelativeOfHeap = 0;
    static displayTemporary = [];

    static cleanPointerStackInit(){
        Singleton.positionRelativeOfStack = 0;
    }

    static cleanPointerStackFunction(){
        Singleton.positionRelativeOfStack = 1;
    }

    static cleanPointerHeap(){
        Singleton.positionRelativeOfHeap = 0;
    }

    static cleanTemporarys(){
        Singleton.counterTemporary = 0;
    }

    static cleanLabels(){
        Singleton.counterLabels = 0;
    }

    static cleanDisplayTemporary(){
        Singleton.displayTemporary = [];
    }

    /**
     * 
     * @param {String} temporal
     */
    static addTemporaryIntoDisplay(node){
        Singleton.displayTemporary.push(node);
    }

    /**
     * 
     * @param {String} name of temporary
     */
    static deleteTemporaryIntoDisplay(name){
        let index = Singleton.displayTemporary.indexOf(name);
        if(index >= 0) Singleton.displayTemporary.splice(index,1);
    }

    /**
     * @returns number of temporary
     */
    static getNumberTemporary(){
        return Singleton.counterTemporary;
    }

    /**
     * @returns number of labels
     */
    static getNumberLabels(){
        return Singleton.counterLabels;
    }

    /**
     * @returns new temporary
     */
    static getTemporary(){
        let tmp = `t${Singleton.counterTemporary++}`; 
        Singleton.addTemporaryIntoDisplay(tmp);
        return tmp;
    }

    /**
     * @returns new label
     */
    static getLabel(){
        return `L${Singleton.counterLabels++}`;
    }

    /**
     * @returns position relative of stack
     */
    static getPosStack(){
        return Singleton.positionRelativeOfStack++;
    }

    /**
     * @returns array de temporales no usados
     */
    static getDisplayTemporary(){
        return Singleton.displayTemporary;
    }

}