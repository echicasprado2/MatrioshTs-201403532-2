class ErrorList{

    static errorList = [];

    static cleanErrorList(){
        ErrorList.errorList = [];
    }

    static addError(node){
        ErrorList.errorList.push(node);
    }

    static getErrorList(){
        return ErrorList.errorList;
    }

    static isErrors(){
        return ErrorList.errorList.length === 0 ? true : false;
    }

    static showErrors(){
        for (const item of ErrorList.errorList) {
            PrintConsole.printLine(`Error tipo: ${item.errorType} Linea: ${item.line} Columna: ${item.column} Descripcion: ${item.description} Entorno: ${item.environmentType.toString()}`);
        }
    }

}