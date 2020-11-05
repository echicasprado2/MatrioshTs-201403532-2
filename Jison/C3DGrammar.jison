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
lex_temporal = "t"[0-9]+
lex_etiqueta = "L"[0-9]+

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
"goto"        return 'goto';
"printf"      return 'print';
// "P"           return 'P_Stack';
// "H"           return 'H_Heap';
//"Stack"        return 'stack';
//"Heap"         return 'heap';

//valores expresiones regulares
{lex_decimal}       return 'val_decimal';
{lex_entero}        return 'val_entero';
{lex_string}        return 'val_string';
{lex_identificador} return 'identificador';
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
INIT: EOF;