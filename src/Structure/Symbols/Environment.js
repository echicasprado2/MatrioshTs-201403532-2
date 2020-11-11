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
        this.size = 0;
    }

    insertNewSymbol(name,symbol){
        name = name.toLowerCase();
        
        if(this.table.has(name)){
            ErrorList.addError(new ErrorNode(symbol.line,symbol.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable ya existe: ${name}`,this.enviromentType));
        }else{

            if(symbol.typeValue.enumType != EnumType.ERROR){

                symbol.typeEnvironment = this.enviromentType;

                this.table.set(name,symbol);

                let node = new NodeTableSymbols(
                    symbol.line,
                    symbol.column,
                    symbol.id,
                    symbol.type,
                    symbol.typeDeclaration,
                    symbol.typeValue,
                    symbol.size,
                    symbol.positionRelativa,
                    symbol.dimensions,
                    symbol.typeEnvironment,
                    symbol.location,
                    null
                );
                TableReport.addCompile(node);

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
        name = name.toLowerCase();

        //busco un entorno de funcion o type o global, para guardar el valor
        for(var e = this; e != null; e = e.previous){
            if(e.table.has(name)){
                if(e.enviromentType.EnumEnvironmentType == EnumEnvironmentType.GLOBAL 
                    || e.enviromentType.EnumEnvironmentType == EnumEnvironmentType.FUNCTION 
                    || e.enviromentType.EnumEnvironmentType == EnumEnvironmentType.TYPE){

                    if(symbol.typeValue.enumType != EnumType.ERROR){

                        symbol.typeEnvironment = e.enviromentType;

                        e.table.set(name,symbol);

                        let node = new NodeTableSymbols(
                            symbol.line,
                            symbol.column,
                            symbol.id,
                            symbol.type,
                            symbol.typeDeclaration,
                            symbol.typeValue,
                            symbol.size,
                            symbol.positionRelativa,
                            symbol.dimensions,
                            symbol.typeEnvironment,
                            symbol.location,
                            null
                        );
                        TableReport.addCompile(node);

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

                    let node = new NodeTableSymbols(
                        symbol.line,
                        symbol.column,
                        symbol.id,
                        symbol.type,
                        symbol.typeDeclaration,
                        symbol.typeValue,
                        symbol.size,
                        symbol.positionRelativa,
                        symbol.dimensions,
                        symbol.typeEnvironment,
                        symbol.location,
                        null
                    );
                    TableReport.addCompile(node);

                    return;
                }
            }
        }

        //si no encuentro la variable en ningun lugar, guardo en el entorno local
        if(symbol.type.enumType != EnumType.ERROR){

            symbol.typeEnvironment = this.enviromentType;

            this.table.set(name,symbol);

            let node = new NodeTableSymbols(
                symbol.line,
                symbol.column,
                symbol.id,
                symbol.type,
                symbol.typeDeclaration,
                symbol.typeValue,
                symbol.size,
                symbol.positionRelativa,
                symbol.dimensions,
                symbol.typeEnvironment,
                symbol.location,
                null
            );
            TableReport.addCompile(node);

            return null;
        }

        return null;
    }

    insertParameter(name,symbol){
        name = name.toLowerCase();
        symbol.typeEnvironment = this.enviromentType;

        this.table.set(name,symbol);

        let node = new NodeTableSymbols(
            symbol.line,
            symbol.column,
            symbol.id,
            symbol.type,
            symbol.typeDeclaration,
            symbol.typeValue,
            symbol.size,
            symbol.positionRelativa,
            symbol.dimensions,
            symbol.typeEnvironment,
            symbol.location,
            null
        );
        TableReport.addCompile(node);
    }

    searchSymbol(name){
        name = name.toLowerCase();
        for(var e = this; e != null; e = e.previous){
            if(e.table.has(name.toLowerCase())){// busca si el simbolo existe en el ambito
                let item = e.table.get(name);   
                let newSymbol;

                newSymbol = new Symbol(
                    item.line,
                    item.column,
                    item.id,
                    new Type(item.type.enumType,item.type.identifier),
                    item.typeDeclaration,
                    new Type(item.typeValue.enumType,item.typeValue.identifier),
                    item.typeEnvironment,
                    item.arrayEnvironments,
                    item.size,
                    item.positionRelativa,
                    item.dimensions,
                    item.displayTemporary,
                    item.location,
                    item.value
                );
                
                return newSymbol;
            }
        }
        return null;
    }

    getArrayEnvironments(){
        let environments = [];

        for(let e = this; e != null; e = e.previous){
            environments.push(e.enviromentType.toString());
        }
        
        return environments;
    }

    getTypeReturnFunction(){
        let environmentFunction;
        let symbolFunction;
        for(let e = this;e != null;e = e.previous){
            if(e.enviromentType.enumEnvironmentType == EnumEnvironmentType.FUNCTION){
                environmentFunction = e;
                break;
            }
        }

        symbolFunction = this.searchSymbol(`@@${environmentFunction.enviromentType.name}`);
        return symbolFunction.type;
    }

}
