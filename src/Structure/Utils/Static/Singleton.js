class Singleton{
    static counterTemporary;
    static counterLabels;

    /**
     * @returns number of temporary
     */
    static getNumberTemporary(){
        return Singleton.counterTemporary;
    }

    /**
     * @returns new temporary
     */
    static getTemporary(){
        return Singleton.counterTemporary == 0 ? `t${Singleton.counterTemporary}` : `t${Singleton.counterTemporary++}`;
    }

    /**
     * @returns new label
     */
    static getLabels(){
        return Singleton.counterLabels == 0 ? `t${Singleton.counterLabels}` : `t${Singleton.counterLabels++}`;
    }

}