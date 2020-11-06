/**
 * @enum of type value in 3-way code
 */
var EnumValueTypeC3D;
(function (EnumValueTypeC3D){
    EnumValueTypeC3D["STRING"] = "STRING";
    EnumValueTypeC3D["DOUBLE"] = "DOUBLE";
    EnumValueTypeC3D["INTEGER"] = "INTEGER";
})(EnumValueTypeC3D || (EnumValueTypeC3D = {}));

/**
 * @class type of primitive values
 */
class ValueTypeC3D{
    constructor(enumValueTypeC3D){
        this.enumValueTypeC3D = enumValueTypeC3D;
    }
}