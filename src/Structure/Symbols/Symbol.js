class Symbol {
   
    constructor(line,column,id, type, typeDeclaration, typeValue, typeEnvironment, size, position, dimensions, value) {
        //TODO update all uses new symbols
        this.line = line;
        this.column = column;
        this.id = id;
        this.type = type;
        this.typeDeclaration = typeDeclaration;
        this.typeValue = typeValue;
        this.typeEnvironment = typeEnvironment;
        this.size = size;
        this.position = position;
        this.dimensions = dimensions;
        this.value = value;
    }
}
