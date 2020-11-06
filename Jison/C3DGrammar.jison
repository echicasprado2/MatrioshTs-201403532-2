/*Importaciones de clases */
%{
%}

/* Lexico */
%lex
%options case-sensitive
// %options case-insensitive

// expresiones regulares
lex_decimal              [0-9]+"."[0-9]+
lex_entero               [0-9]+
lex_string               [\"\'\`](([^\"\'\`\\])*([\\].)*)*[\"\'\`]
lex_identificador        [A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*
lex_comentariounilinea   "/""/".*(\r|\n|\r\n|<<EOF>>)
lex_comentariomultilinea [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]

%%

//ignorar de archivo 
{lex_comentariounilinea}    /* Omitir */
{lex_comentariomultilinea}  /* Omitir */
[\s\t\r\n]+                 /* Omitir */

//aritmeticos
"+"  return '+';
"-"  return '-';
"*"  return '*';
"/"  return '/';
"%"  return '%';

//relacionales
">=" return '>=';
">"  return '>';
"<=" return '<=';
"<"  return '<';

//comparacion
"=="  return '==';
"!="  return '!=';
"="   return '=';

//simbolos
";"  return 'punto_y_coma';
":"  return 'dos_puntos';
"("  return 'par_izq';
")"  return 'par_der';
"{"  return 'llave_izq';
"}"  return 'llave_der';
"["  return 'cor_izq';
"]"  return 'cor_der';
","  return 'coma';

//PALABRAS RESERVADAS
"void"        return 'void';
"float"       return 'float';
"char"        return 'char';
"int"         return 'int';
"if"          return 'if';
"return"      return 'return';
"#include"    return 'include';
"stdio.h"     return 'library';
"goto"        return 'goto';
"printf"      return 'print';
"Stack"       return 'stack';
"Heap"        return 'heap';
"P"           return 'P_Stack';
"H"           return 'H_Heap';

//valores expresiones regulares
{lex_decimal}       return 'val_decimal';
{lex_entero}        return 'val_entero';
{lex_string}        return 'val_string';
t[0-9]+             return 'temporal';
L[0-9]+             return 'etiqueta';
{lex_identificador} return 'id';

<<EOF>> return 'EOF';
.       return 'INVALID';

/lex

%right '='
%right ':'
%left '!='
%left '==' 
%nonassoc '>' '>='
%nonassoc '<' '<='
%left '+' '-'
%left '*' '/' '%'
// %right UMENOS
%right '('
%left ')'
%left '['
%left ']'
%left '{'
%left '}'
%left 'EOF'

%start INIT

%ebnf

%%

/* GRAMATICA */
INIT: SENTENCES EOF { return $1; }
    | EOF           { return []; }
    ;

SENTENCES: SENTENCES SENTENCE { $$ = $1; $$.push($2); }
        | SENTENCE            { $$ = []; $$.push($1); }
        ;

SENTENCE: IMPORT               { $$ = $1; }
        | DECLARATION          { $$ = $1; }
        | FUNCION              { $$ = $1; }
        | PRINT                { $$ = $1; } 
        | RETURN               { $$ = $1; }
        | CALLFUNCION          { $$ = $1; }
        | ASSIGNMENT           { $$ = $1; }
        | ASSIGNMENT_STRUCTURE { $$ = $1; }
        | IF                   { $$ = $1; }
        | GOTO                 { $$ = $1; }
        | TAG                  { $$ = $1; }
        ;

CALLFUNCION: id par_izq par_der punto_y_coma { $$ = new CallFunctionC3D(this._$.first_line,this._$.first_column,$1); }
            ;

RETURN: return E punto_y_coma { $$ = new ReturnC3D(this._$.first_line,this._$.first_column,$2); }
      | return punto_y_coma   { $$ = new ReturnC3D(this._$.first_line,this._$.first_column,null); }
      ;

TYPE: void  { $$ = new TypeC3D(EnumTypeC3D.VOID); }   
    | float { $$ = new TypeC3D(EnumTypeC3D.FLOAT); } 
    | int   { $$ = new TypeC3D(EnumTypeC3D.INT); } 
    | char  { $$ = new TypeC3D(EnumTypeC3D.CHAR); }
    ;

PRINT: print par_izq val_string coma E par_der punto_y_coma { $$ = new PrintC3D(this._$.first_line,this._$.first_column,$3,$5); }
     ;

IMPORT: include '<' library '>' { $$ = new ImportC3D(this._$.first_line,this._$.first_column,$3); }
      ;

DECLARATION: TYPE L_ID cor_izq val_entero cor_der punto_y_coma { $$ = new DeclarationStructureC3D(this._$.first_line,this._$.first_column,$1,$2,$4); } 
           | TYPE L_ID '=' val_entero punto_y_coma             { $$ = new DeclarationC3D(this._$.first_line,this._$.first_column,$1,$2,$4); }
           | TYPE L_ID punto_y_coma                            { $$ = new DeclarationC3D(this._$.first_line,this._$.first_column,$1,$2,null); }
           ;

L_ID: L_ID coma ID { $$ = $1; $$.push($3); }
    | ID           { $$ = []; $$.push($1); }
    ;

ID:   temporal  { $$ = $1; }
    | heap      { $$ = $1; } 
    | stack     { $$ = $1; }
    | P_Stack   { $$ = $1; }
    | H_Heap    { $$ = $1; }
    ;

BLOCK: llave_izq SENTENCES llave_der { $$ = new BlockC3D(this._$.first_line,this._$.first_column,$2); }
    |  llave_izq llave_der           { $$ = new BlockC3D(this._$.first_line,this._$.first_column,[]); }
    ;

FUNCION: TYPE id par_izq par_der BLOCK { $$ = new FunctionC3D(this._$.first_line,this._$.first_column,$1,$2,$5); }
       ;

ASSIGNMENT:  temporal '=' E punto_y_coma { $$ = new AssignmentC3D(this._$.first_line,this._$.first_column,$1,$3); }
            | P_Stack '=' E punto_y_coma { $$ = new AssignmentC3D(this._$.first_line,this._$.first_column,$1,$3); }
            | H_Heap '=' E punto_y_coma  { $$ = new AssignmentC3D(this._$.first_line,this._$.first_column,$1,$3); }
            ;

ASSIGNMENT_STRUCTURE: heap cor_izq CASTEO cor_der '=' E punto_y_coma  { $$ = new AssignmentStructureC3D(this._$.first_line,this._$.first_column,$1,$3,$6); }
                    | stack cor_izq CASTEO cor_der '=' E punto_y_coma { $$ = new AssignmentStructureC3D(this._$.first_line,this._$.first_column,$1,$3,$6); }
                    ;

CASTEO: par_izq TYPE par_der temporal          { $$ = new CasteoC3D(this._$.first_line,this._$.first_column,$2,$4);}
      | par_izq TYPE par_der P_Stack           { $$ = new CasteoC3D(this._$.first_line,this._$.first_column,$2,$4);} 
      | par_izq TYPE par_der H_Heap            { $$ = new CasteoC3D(this._$.first_line,this._$.first_column,$2,$4);} 
      | par_izq TYPE par_der val_entero        { $$ = new CasteoC3D(this._$.first_line,this._$.first_column,$2,$4);} 
      | par_izq TYPE par_der val_decimal       { $$ = new CasteoC3D(this._$.first_line,this._$.first_column,$2,$4);} 
      | par_izq TYPE par_der par_izq E par_der { $4.haveParentesis = true; $$ = new CasteoC3D(this._$.first_line,this._$.first_column,$2,$4);} 
      ;

IF: if par_izq E par_der goto etiqueta punto_y_coma { $$ = new IfC3D(this._$.first_line,this._$.first_column,$3,$6); }
    ;

GOTO: goto etiqueta punto_y_coma { $$ = new GoToC3D(this._$.first_line,this._$.first_column,$2); }
    ;

TAG: etiqueta dos_puntos { $$ = new TagC3D(this._$.first_line,this._$.first_column,$1); }
    ;

E   : E '+'  E { $$ = new ArithmeticC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.PLUS),$1,$3); }
    | E '-'  E { $$ = new ArithmeticC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.MINUS),$1,$3); }
    | E '*'  E { $$ = new ArithmeticC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.MULTIPLICATION),$1,$3); }
    | E '/'  E { $$ = new ArithmeticC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.DIVISION),$1,$3); }
    | E '%'  E { $$ = new ArithmeticC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.MODULE),$1,$3); }

    | E '!=' E { $$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.DIFFERENT_THAN),$1,$3); }
    | E '==' E { $$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.LIKE_THAN),$1,$3); }
    | E '>=' E { $$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.MORE_EQUAL_TO),$1,$3); }
    | E '>'  E { $$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.MORE_THAN),$1,$3); }
    | E '<=' E { $$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.LESS_EQUAL_TO),$1,$3); }
    | E '<'  E { $$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.LESS_THAN),$1,$3); }

    | val_decimal    { $$ = new ValueC3D(this._$.first_line,this._$.first_column,new ValueTypeC3D(EnumValueTypeC3D.DOUBLE),$1); }
    | val_entero     { $$ = new ValueC3D(this._$.first_line,this._$.first_column,new ValueTypeC3D(EnumValueTypeC3D.INTEGER),$1); }
    | val_string     { $$ = new ValueC3D(this._$.first_line,this._$.first_column,new ValueTypeC3D(EnumValueTypeC3D.STRING),$1); }
    | '-' val_entero { $$ = new ValueC3D(this._$.first_line,this._$.first_column,new ValueTypeC3D(EnumValueTypeC3D.INTEGER),$1.concat($2)); }

    | par_izq E par_der { $$ = $1; $$.haveParentesis = true; }

    | heap cor_izq CASTEO cor_der  { $$ = new StructureC3D(this._$.first_line,this._$.first_column,$1,$2); }
    | stack cor_izq CASTEO cor_der { $$ = new StructureC3D(this._$.first_line,this._$.first_column,$1,$2); }

    | temporal { $$ = new TemporaryC3D(this._$.first_line,this._$.first_column,$1); }

    | P_Stack { $$ = new PointerC3D(this._$.first_line,this._$.first_column,$1); }
    | H_Heap  { $$ = new PointerC3D(this._$.first_line,this._$.first_column,$1); }

    | CASTEO { $$ = $1; }

    ;
