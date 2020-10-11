class Environment {

    /**
     * 
     * @param {*} previous 
     * @param {*} environmentType 
     */
    constructor(previous, environmentType) {
        this.previous = previous;
        this.enviromentType = environmentType;
        this.table = new Map();
    }

    insertNewSymbol(name,symbol){
        
        if(this.table.has(name)){
            ErrorList.addError(new ErrorNode(symbol.line,symbol.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable ya existe: ${name}`,this.enviromentType));
        }else{

            if(symbol.typeValue.enumType != EnumType.ERROR){

                symbol.typeEnvironment = this.enviromentType;

                this.table.set(name,symbol);

                TableReport.addExecute(
                    new NodeTableSymbols(
                        symbol.line,
                        symbol.column,
                        symbol.id,
                        symbol.type,
                        symbol.typeDeclaration,
                        symbol.typeValue,
                        symbol.size,
                        symbol.position,
                        symbol.dimensions,
                        this.enviromentType,
                        symbol.value.value
                        )
                    );
                
                // if(symbol.value instanceof TypeDefinition || symbol.value instanceof Function){
                //     TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,this.enviromentType,null));
                //     //TODO update data into symbols
                // }else{
                //     TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,this.enviromentType,symbol.value.value));
                // }

            }

        }
        return;
    }

    /**
     * 
     * @param {*} name 
     * @param {*} symbol 
     */
    insert(name,symbol){

        //busco un entorno de funcion o type o global, para guardar el valor
        for(var e = this; e != null; e = e.previous){
            if(e.table.has(name)){
                if(e.enviromentType.EnumEnvironmentType == EnumEnvironmentType.GLOBAL 
                    || e.enviromentType.EnumEnvironmentType == EnumEnvironmentType.FUNCTION 
                    || e.enviromentType.EnumEnvironmentType == EnumEnvironmentType.TYPE){

                    if(symbol.typeValue.enumType != EnumType.ERROR){

                        symbol.typeEnvironment = e.enviromentType;

                        e.table.set(name,symbol);

                        TableReport.addExecute(
                            new NodeTableSymbols(
                                symbol.line,
                                symbol.column,
                                symbol.id,
                                symbol.type,
                                symbol.typeDeclaration,
                                symbol.typeValue,
                                symbol.size,
                                symbol.position,
                                symbol.dimensions,
                                e.enviromentType,
                                symbol.value.value
                                )
                            );

                        // if(symbol.value instanceof TypeDefinition || symbol.value instanceof Function){
                        //     TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,e.enviromentType,null));
                        // }else{
                        //     TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,e.enviromentType,symbol.value.value));
                        // }

                        return;
                    }

                }
            }
        }

        //busco un entorno en donde este definida esta variable
        for(var e = this; e != null; e = e.previous){
            if(e.table.has(name)){
                if(symbol.typeValue.enumType != EnumType.ERROR){

                    symbol.typeEnvironment = e.enviromentType;

                    e.table.set(name,symbol);

                    TableReport.addExecute(
                        new NodeTableSymbols(
                            symbol.line,
                            symbol.column,
                            symbol.id,
                            symbol.type,
                            symbol.typeDeclaration,
                            symbol.typeValue,
                            symbol.size,
                            symbol.position,
                            symbol.dimensions,
                            e.enviromentType,
                            symbol.value.value
                            )
                        );

                    // if(symbol.value instanceof TypeDefinition || symbol.value instanceof Function){
                    //     TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,e.enviromentType,null));
                    // }else{
                    //     TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,e.enviromentType,symbol.value.value));
                    // }

                    return;
                }
            }
        }

        //si no encuentro la variable en ningun lugar, guardo en el entorno local
        if(symbol.type.enumType != EnumType.ERROR){

            symbol.typeEnvironment = this.enviromentType;

            this.table.set(name,symbol);

            TableReport.addExecute(
                new NodeTableSymbols(
                    symbol.line,
                    symbol.column,
                    symbol.id,
                    symbol.type,
                    symbol.typeDeclaration,
                    symbol.typeValue,
                    symbol.size,
                    symbol.position,
                    symbol.dimensions,
                    this.enviromentType,
                    symbol.value.value
                    )
                );

            // if(symbol.value instanceof TypeDefinition || symbol.value instanceof Function){
            //     TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,this.enviromentType,null));
            // }else{
            //     TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,this.enviromentType,symbol.value.value));
            // }

            return null;
        }

        return null;
    }

    insertParameter(name,symbol){

        symbol.typeEnvironment = this.enviromentType;

        this.table.set(name,symbol);

        TableReport.addExecute(
            new NodeTableSymbols(
                symbol.line,
                symbol.column,
                symbol.id,
                symbol.type,
                symbol.typeDeclaration,
                symbol.typeValue,
                symbol.size,
                symbol.position,
                symbol.dimensions,
                this.enviromentType,
                symbol.value.value
                )
            );

        // if(symbol.value instanceof TypeDefinition || symbol.value instanceof Function){
        //     TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,this.enviromentType,null));
        // }else{
        //     TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,this.enviromentType,symbol.value.value));
        // }
        
    }

    searchSymbol(name){
        for(var e = this; e != null; e = e.previous){
            if(e.table.has(name)){// busca si el simbolo existe en el ambito
                var returnSymbol = e.table.get(name);
                return new Symbol(returnSymbol.line,returnSymbol.column,returnSymbol.id,returnSymbol.type,returnSymbol.typeDeclaration,returnSymbol.value,returnSymbol.dimensions);
            }
        }
        return null;
    }

}
