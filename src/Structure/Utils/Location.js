/**
 *  @enum of type use in language.
 */
var EnumLocation;
(function (EnumLocation) {
    EnumLocation["STACK"] = "STACK";
    EnumLocation["HEAP"] = "HEAP";
})(EnumLocation || (EnumLocation = {}));
/**
 * @class type use for type anyone expresion with value
 */
class Location {
    constructor(EnumLocation) {
        this.EnumLocation = EnumLocation;
    }
    
    toString() {
        return this.EnumLocation.toString().toLowerCase();
    }
}
