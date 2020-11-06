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
%right UMENOS
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
INIT: SENTENCES EOF
    | EOF
    ;

SENTENCES: SENTENCES SENTENCE
        | SENTENCE
        ;

SENTENCE: IMPORT
        | DECLARATION
        | FUNCION
        | PRINT
        | RETURN
        | CALLFUNCION
        | ASSIGNMENT
        | IF
        | GOTO
        | TAG
        ;

CALLFUNCION: id par_izq par_der punto_y_coma
            ;

RETURN: return E punto_y_coma
      | return punto_y_coma
      ;

TYPE: void
    | float
    | int
    | char
    ;

PRINT: print par_izq val_string coma E par_der punto_y_coma
     ;

// E_PRINT: E
//         | CASTEO
//         ;

IMPORT: include '<' library '>' 
      ;

DECLARATION: TYPE L_ID cor_izq val_entero cor_der punto_y_coma { console.log($2); } 
           | TYPE L_ID '=' val_entero punto_y_coma             { console.log($2); }
           | TYPE L_ID punto_y_coma                            { console.log($2); }
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

BLOCK: llave_izq SENTENCES llave_der
    |  llave_izq llave_der
    ;

FUNCION: TYPE id par_izq par_der BLOCK
       ;

ASSIGNMENT:   heap cor_izq CASTEO cor_der '=' E punto_y_coma
            | stack cor_izq CASTEO cor_der '=' E punto_y_coma
            | temporal '=' E punto_y_coma
            | P_Stack '=' E punto_y_coma
            | H_Heap '=' E punto_y_coma
            ;

CASTEO: par_izq TYPE par_der temporal
      | par_izq TYPE par_der P_Stack
      | par_izq TYPE par_der H_Heap
      | par_izq TYPE par_der val_entero
      | par_izq TYPE par_der val_decimal
      | par_izq TYPE par_der par_izq E par_der
      ;

IF: if par_izq E par_der goto etiqueta punto_y_coma
    ;

GOTO: goto etiqueta punto_y_coma
    ;

TAG: etiqueta dos_puntos
    ;

E   : E '+' E
    | E '-' E
    | E '*' E
    | E '/' E
    | E '%' E
    | '-' E %prec UMENOS
    | E '!=' E
    | E '==' E
    | E '>=' E
    | E '>'  E
    | E '<=' E
    | E '<'  E

    | val_decimal
    | val_entero
    | val_string
    | par_izq E par_der

    | heap cor_izq CASTEO cor_der
    | stack cor_izq CASTEO cor_der

    | temporal

    | P_Stack
    | H_Heap

    | CASTEO

    ;
