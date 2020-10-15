class Singleton{
    static counterTemporary = 0;
    static counterLabels = 0;

    static cleanTemporarys(){
        Singleton.counterTemporary = 0;
    }

    static cleanLabels(){
        Singleton.counterLabels = 0;
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
        return `t${Singleton.counterTemporary++}`;
    }

    /**
     * @returns new label
     */
    static getLabel(){
        return `L${Singleton.counterLabels++}`;
    }

}