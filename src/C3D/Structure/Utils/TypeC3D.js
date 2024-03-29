/**
 * @enum of type value in 3-way code
 */
var EnumTypeC3D;
(function (EnumTypeC3D){
    EnumTypeC3D["CHAR"] = "CHAR";
    EnumTypeC3D["FLOAT"] = "FLOAT";
    EnumTypeC3D["INT"] = "INT";
    EnumTypeC3D["DOUBLE"] = "DOUBLE";
    EnumTypeC3D["VOID"] = "VOID";
    EnumTypeC3D["TEMPORARY"] = "TEMPORARY"
    EnumTypeC3D["POINTER"] = "POINTER"
})(EnumTypeC3D || (EnumTypeC3D = {}));

/**
 * @class type of primitive values
 */
class TypeC3D{

    constructor(enumTypeC3D){
        this.enumTypeC3D = enumTypeC3D;
    }

    toString(){
        return this.enumTypeC3D.toString().toLowerCase();
    }

}