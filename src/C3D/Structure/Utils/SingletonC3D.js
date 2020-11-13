class SingletonC3D {
    static displayTemporary = [];
    static fillDisplayTemporary = true;

    static addTemporary(node){
        SingletonC3D.displayTemporary.push(node);
    }

    static deleteTemporary(node){
        let index = SingletonC3D.displayTemporary.indexOf(node);
        if(index >= 0) SingletonC3D.displayTemporary.splice(index,1);
    }

    static existsTemporary(node){
        let index = SingletonC3D.displayTemporary.indexOf(node);
        return (index >= 0)? true:false;
    }

    static cleanDisplayTemporary(){
        SingletonC3D.displayTemporary = [];
    }

    static isEmptyDisplayTemporary(){
        return (SingletonC3D.displayTemporary == 0) ? true : false;
    }

    static isFillDisplayTemporary(){
        if(SingletonC3D.fillDisplayTemporary){
            SingletonC3D.fillDisplayTemporary = false;
            return true;
        }else{
            SingletonC3D.fillDisplayTemporary = true;
            return false;
        }
    }

}