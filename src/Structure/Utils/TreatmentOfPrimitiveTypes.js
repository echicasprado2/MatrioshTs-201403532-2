class TreatmentOfPrimitiveTypes {

    /**
     * 
     * @param {*} exp1 
     * @param {*} exp2 
     */
    static getTopType(exp1, exp2){
        if(exp1.type.enumType === EnumType.STRING || exp2.type.enumType === EnumType.STRING){
            return EnumType.STRING;

        }else if(exp1.type.enumType === EnumType.NUMBER || exp2.type.enumType == EnumType.NUMBER){
            return EnumType.NUMBER;
        
        }else if(exp1.type.enumType === EnumType.BOOLEAN || exp2.type.enumType === EnumType.BOOLEAN){
            return EnumType.BOOLEAN;
        
        }else if(exp1.type.enumType === EnumType.TYPE || exp2.type.enumType === EnumType.TYPE){
            return EnumType.TYPE;
        
        }else if(exp1.type.enumType === EnumType.NULL && exp2.type.enumType == EnumType.NULL){
            return EnumType.NULL;

        }else{
            return EnumType.ERROR;
        }
    }

    static stringValid(exp1,exp2){
        if(exp1.type.enumType == EnumType.STRING){
            if(exp2.type.enumType == EnumType.STRING || 
                exp2.type.enumType == EnumType.NUMBER ||
                 exp2.type.enumType == EnumType.BOOLEAN){
                return true;
            }else{
                return false;
            }

        }else if(exp2.type.enumType == EnumType.STRING){
            if(exp1.type.enumType == EnumType.STRING || 
                exp1.type.enumType == EnumType.NUMBER ||
                 exp1.type.enumType == EnumType.BOOLEAN){
                return true;
            }else{
                return false;
            }
        }
    }
    
    static numberValid(exp1,exp2){
        if(exp1.type.enumType == EnumType.NUMBER){
            if(exp2.type.enumType == EnumType.NUMBER ||
                exp2.type.enumType == EnumType.BOOLEAN){
                return true;
            }else{
                return false;
            }

        }else if(exp2.type.enumType == EnumType.NUMBER){
            if(exp1.type.enumType == EnumType.NUMBER ||
                exp1.type.enumType == EnumType.BOOLEAN){
                return true;
            }else{
                return false;
            }
        }

    }

}