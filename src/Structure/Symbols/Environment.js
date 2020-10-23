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
        
        if(this.table.has(name)){
            ErrorList.addError(new ErrorNode(symbol.line,symbol.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable ya existe: ${name}`,this.enviromentType));
        }else{

            if(symbol.typeValue.enumType != EnumType.ERROR){

                symbol.typeEnvironment = this.enviromentType;

                this.table.set(name,symbol);

                // TableReport.addExecute(
                //     new NodeTableSymbols(
                //         symbol.line,
                //         symbol.column,
                //         symbol.id,
                //         symbol.type,
                //         symbol.typeDeclaration,
                //         symbol.typeValue,
                //         symbol.size,
                //         symbol.position,
                //         symbol.dimensions,
                //         this.enviromentType,
                //         symbol.value.value
                //         )
                //     );
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

                        // TableReport.addExecute(
                        //     new NodeTableSymbols(
                        //         symbol.line,
                        //         symbol.column,
                        //         symbol.id,
                        //         symbol.type,
                        //         symbol.typeDeclaration,
                        //         symbol.typeValue,
                        //         symbol.size,
                        //         symbol.position,
                        //         symbol.dimensions,
                        //         e.enviromentType,
                        //         symbol.value.value
                        //         )
                        //     );
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

                    // TableReport.addExecute(
                    //     new NodeTableSymbols(
                    //         symbol.line,
                    //         symbol.column,
                    //         symbol.id,
                    //         symbol.type,
                    //         symbol.typeDeclaration,
                    //         symbol.typeValue,
                    //         symbol.size,
                    //         symbol.position,
                    //         symbol.dimensions,
                    //         e.enviromentType,
                    //         symbol.value.value
                    //         )
                    //     );
                    return;
                }
            }
        }

        //si no encuentro la variable en ningun lugar, guardo en el entorno local
        if(symbol.type.enumType != EnumType.ERROR){

            symbol.typeEnvironment = this.enviromentType;

            this.table.set(name,symbol);

            // TableReport.addExecute(
            //     new NodeTableSymbols(
            //         symbol.line,
            //         symbol.column,
            //         symbol.id,
            //         symbol.type,
            //         symbol.typeDeclaration,
            //         symbol.typeValue,
            //         symbol.size,
            //         symbol.position,
            //         symbol.dimensions,
            //         this.enviromentType,
            //         symbol.value.value
            //         )
            //     );
            return null;
        }

        return null;
    }

    insertParameter(name,symbol){

        symbol.typeEnvironment = this.enviromentType;

        this.table.set(name,symbol);

        // TableReport.addExecute(
        //     new NodeTableSymbols(
        //         symbol.line,
        //         symbol.column,
        //         symbol.id,
        //         symbol.type,
        //         symbol.typeDeclaration,
        //         symbol.typeValue,
        //         symbol.size,
        //         symbol.position,
        //         symbol.dimensions,
        //         this.enviromentType,
        //         symbol.value.value
        //         )
        //     );
    }

    searchSymbol(name){
        for(var e = this; e != null; e = e.previous){
            if(e.table.has(name.toLowerCase())){// busca si el simbolo existe en el ambito
                let item = e.table.get(name);   
                let newSymbol;

                newSymbol = new Symbol(
                    item.line,
                    item.column,
                    item.id,
                    item.type,
                    item.typeDeclaration,
                    item.typeValue,
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

}
