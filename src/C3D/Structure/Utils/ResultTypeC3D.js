/**
 * @enum of type value in 3-way code
 */
var EnumResultTypeC3D;
(function (EnumResultTypeC3D){
    EnumResultTypeC3D["EMPTY"] = "EMPTY";
    EnumResultTypeC3D["NUMBER"] = "NUMBER";
    EnumResultTypeC3D["STRING"] = "STRING";
    EnumResultTypeC3D["TEMPORARY"] = "TEMPORARY";

})(EnumResultTypeC3D || (EnumResultTypeC3D = {}));

/**
 * @class type of primitive values
 */
class ResultTypeC3D{

    /**
     * 
     * @param {EnumResultTypeC3D} enumTypeC3D 
     */
    constructor(enumResultTypeC3D){
        this.enumResultTypeC3D = enumResultTypeC3D;
    }

}