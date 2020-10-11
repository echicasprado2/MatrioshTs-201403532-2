class Singleton{
    static counterTemporary;
    static counterLabels;

    static getTemporary(){
        return Singleton.counterTemporary == 0 ? `t${Singleton.counterTemporary}` : `t${Singleton.counterTemporary++}`;
    }

    static getLabels(){
        return Singleton.counterLabels == 0 ? `t${Singleton.counterLabels}` : `t${Singleton.counterLabels++}`;
    }

}