var EnumOperationTypeC3D;
(function (EnumOperationTypeC3D){
    EnumOperationTypeC3D["PLUS"] = "+";
    EnumOperationTypeC3D["MINUS"] = "-";
    EnumOperationTypeC3D["MULTIPLICATION"] = "*";
    EnumOperationTypeC3D["DIVISION"] = "/";
    EnumOperationTypeC3D["MODULE"] = "%";
    EnumOperationTypeC3D["DIFFERENT_THAN"] = "!=";
    EnumOperationTypeC3D["LIKE_THAN"] = "==";
    EnumOperationTypeC3D["MORE_EQUAL_TO"] = ">=";
    EnumOperationTypeC3D["LESS_EQUAL_TO"] = "<=";
    EnumOperationTypeC3D["MORE_THAN"] = ">";
    EnumOperationTypeC3D["LESS_THAN"] = "<";
})(EnumOperationTypeC3D || (EnumOperationTypeC3D = {}));

class OperationTypeC3D{
    constructor(enumOperationTypeC3D){
        this.enumOperationTypeC3D = enumOperationTypeC3D;
    }

    toString(){
        return this.enumOperationTypeC3D;
    }
}