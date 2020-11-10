/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var C3DGrammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,20],$V1=[1,19],$V2=[1,29],$V3=[1,30],$V4=[1,31],$V5=[1,32],$V6=[1,18],$V7=[1,16],$V8=[1,21],$V9=[1,24],$Va=[1,25],$Vb=[1,22],$Vc=[1,23],$Vd=[1,26],$Ve=[1,27],$Vf=[1,28],$Vg=[5,18,22,25,26,27,28,29,32,42,43,44,45,46,49,52,53,54],$Vh=[1,39],$Vi=[1,40],$Vj=[1,41],$Vk=[1,42],$Vl=[1,43],$Vm=[1,51],$Vn=[1,49],$Vo=[1,48],$Vp=[1,54],$Vq=[1,52],$Vr=[1,53],$Vs=[1,55],$Vt=[1,56],$Vu=[1,47],$Vv=[1,50],$Vw=[18,20,42,43,44,45,46],$Vx=[21,31,37,40],$Vy=[1,85],$Vz=[1,83],$VA=[1,75],$VB=[1,76],$VC=[1,77],$VD=[1,78],$VE=[1,79],$VF=[1,80],$VG=[1,81],$VH=[1,82],$VI=[1,84],$VJ=[20,21,33,35,56,57,58,59,60,61,62,63,64],$VK=[1,96],$VL=[20,21,33,35,56,57,61,62,63,64],$VM=[20,21,61,62],$VN=[20,21,35,61,62,63],$VO=[20,21,33,35,39,56,57,58,59,60,61,62,63,64];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INIT":3,"SENTENCES":4,"EOF":5,"SENTENCE":6,"IMPORT":7,"DECLARATION":8,"FUNCION":9,"PRINT":10,"RETURN":11,"CALLFUNCION":12,"ASSIGNMENT":13,"ASSIGNMENT_STRUCTURE":14,"IF":15,"GOTO":16,"TAG":17,"id":18,"par_izq":19,"par_der":20,"punto_y_coma":21,"return":22,"E":23,"TYPE":24,"void":25,"float":26,"int":27,"char":28,"print":29,"val_string":30,"coma":31,"include":32,"<":33,"library":34,">":35,"L_ID":36,"cor_izq":37,"val_entero":38,"cor_der":39,"=":40,"ID":41,"temporal":42,"heap":43,"stack":44,"P_Stack":45,"H_Heap":46,"BLOCK":47,"llave_izq":48,"llave_der":49,"CASTEO":50,"val_decimal":51,"if":52,"goto":53,"etiqueta":54,"dos_puntos":55,"+":56,"-":57,"*":58,"/":59,"%":60,"!=":61,"==":62,">=":63,"<=":64,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",18:"id",19:"par_izq",20:"par_der",21:"punto_y_coma",22:"return",25:"void",26:"float",27:"int",28:"char",29:"print",30:"val_string",31:"coma",32:"include",33:"<",34:"library",35:">",37:"cor_izq",38:"val_entero",39:"cor_der",40:"=",42:"temporal",43:"heap",44:"stack",45:"P_Stack",46:"H_Heap",48:"llave_izq",49:"llave_der",51:"val_decimal",52:"if",53:"goto",54:"etiqueta",55:"dos_puntos",56:"+",57:"-",58:"*",59:"/",60:"%",61:"!=",62:"==",63:">=",64:"<="},
productions_: [0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[12,4],[11,3],[11,2],[24,1],[24,1],[24,1],[24,1],[10,7],[7,4],[8,6],[8,5],[8,3],[36,3],[36,1],[41,1],[41,1],[41,1],[41,1],[41,1],[47,3],[47,2],[9,5],[13,4],[13,4],[13,4],[14,7],[14,7],[50,4],[50,4],[50,4],[50,4],[50,4],[50,6],[15,7],[16,3],[17,2],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,1],[23,1],[23,1],[23,2],[23,3],[23,4],[23,4],[23,1],[23,1],[23,1],[23,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 2:
 return []; 
break;
case 3:
 this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 4: case 29:
 this.$ = []; this.$.push($$[$0]); 
break;
case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 30: case 31: case 32: case 33: case 34: case 73:
 this.$ = $$[$0]; 
break;
case 16:
 this.$ = new CallFunctionC3D(this._$.first_line,this._$.first_column,$$[$0-3]); 
break;
case 17:
 this.$ = new ReturnC3D(this._$.first_line,this._$.first_column,$$[$0-1]); 
break;
case 18:
 this.$ = new ReturnC3D(this._$.first_line,this._$.first_column,null); 
break;
case 19:
 this.$ = new TypeC3D(EnumTypeC3D.VOID); 
break;
case 20:
 this.$ = new TypeC3D(EnumTypeC3D.FLOAT); 
break;
case 21:
 this.$ = new TypeC3D(EnumTypeC3D.INT); 
break;
case 22:
 this.$ = new TypeC3D(EnumTypeC3D.CHAR); 
break;
case 23:
 this.$ = new PrintC3D(this._$.first_line,this._$.first_column,$$[$0-4],$$[$0-2]); 
break;
case 24:
 this.$ = new ImportC3D(this._$.first_line,this._$.first_column,$$[$0-1]); 
break;
case 25:
 this.$ = new DeclarationStructureC3D(this._$.first_line,this._$.first_column,$$[$0-5],$$[$0-4],$$[$0-2]); 
break;
case 26:
 this.$ = new DeclarationPointerC3D(this._$.first_line,this._$.first_column,$$[$0-4],$$[$0-3],$$[$0-1]); 
break;
case 27:
 this.$ = new DeclarationC3D(this._$.first_line,this._$.first_column,$$[$0-2],$$[$0-1],null); 
break;
case 28:
 this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 35:
 this.$ = new BlockC3D(this._$.first_line,this._$.first_column,$$[$0-1]); 
break;
case 36:
 this.$ = new BlockC3D(this._$.first_line,this._$.first_column,[]); 
break;
case 37:
 this.$ = new FunctionC3D(this._$.first_line,this._$.first_column,$$[$0-4],$$[$0-3],$$[$0]); 
break;
case 38: case 39: case 40:
 this.$ = new AssignmentC3D(this._$.first_line,this._$.first_column,$$[$0-3],$$[$0-1]); 
break;
case 41: case 42:
 this.$ = new AssignmentStructureC3D(this._$.first_line,this._$.first_column,$$[$0-6],$$[$0-4],$$[$0-1]); 
break;
case 43: case 44: case 45: case 46: case 47:
 this.$ = new CasteoC3D(this._$.first_line,this._$.first_column,$$[$0-2],$$[$0]);
break;
case 48:
 $$[$0-2].haveParentesis = true; this.$ = new CasteoC3D(this._$.first_line,this._$.first_column,$$[$0-4],$$[$0-2]);
break;
case 49:
 this.$ = new IfC3D(this._$.first_line,this._$.first_column,$$[$0-4],$$[$0-1]); 
break;
case 50:
 this.$ = new GoToC3D(this._$.first_line,this._$.first_column,$$[$0-1]); 
break;
case 51:
 this.$ = new TagC3D(this._$.first_line,this._$.first_column,$$[$0-1]); 
break;
case 52:
 this.$ = new ArithmeticC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.PLUS),$$[$0-2],$$[$0]); 
break;
case 53:
 this.$ = new ArithmeticC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.MINUS),$$[$0-2],$$[$0]); 
break;
case 54:
 this.$ = new ArithmeticC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.MULTIPLICATION),$$[$0-2],$$[$0]); 
break;
case 55:
 this.$ = new ArithmeticC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.DIVISION),$$[$0-2],$$[$0]); 
break;
case 56:
 this.$ = new ArithmeticC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.MODULE),$$[$0-2],$$[$0]); 
break;
case 57:
 this.$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.DIFFERENT_THAN),$$[$0-2],$$[$0]); 
break;
case 58:
 this.$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.LIKE_THAN),$$[$0-2],$$[$0]); 
break;
case 59:
 this.$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.MORE_EQUAL_TO),$$[$0-2],$$[$0]); 
break;
case 60:
 this.$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.MORE_THAN),$$[$0-2],$$[$0]); 
break;
case 61:
 this.$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.LESS_EQUAL_TO),$$[$0-2],$$[$0]); 
break;
case 62:
 this.$ = new RelationalC3D(this._$.first_line,this._$.first_column,new OperationTypeC3D(EnumOperationTypeC3D.LESS_THAN),$$[$0-2],$$[$0]); 
break;
case 63:
 this.$ = new ValueC3D(this._$.first_line,this._$.first_column,new ValueTypeC3D(EnumValueTypeC3D.DOUBLE),$$[$0]); 
break;
case 64:
 this.$ = new ValueC3D(this._$.first_line,this._$.first_column,new ValueTypeC3D(EnumValueTypeC3D.INTEGER),$$[$0]); 
break;
case 65:
 this.$ = new ValueC3D(this._$.first_line,this._$.first_column,new ValueTypeC3D(EnumValueTypeC3D.STRING),$$[$0]); 
break;
case 66:
 this.$ = new ValueC3D(this._$.first_line,this._$.first_column,new ValueTypeC3D(EnumValueTypeC3D.INTEGER),$$[$0-1].concat($$[$0])); 
break;
case 67:
 this.$ = $$[$0-2]; this.$.haveParentesis = true; 
break;
case 68: case 69:
 this.$ = new StructureC3D(this._$.first_line,this._$.first_column,$$[$0-3],$$[$0-1]); 
break;
case 70:
 this.$ = new TemporaryC3D(this._$.first_line,this._$.first_column,$$[$0]); 
break;
case 71: case 72:
 this.$ = new PointerC3D(this._$.first_line,this._$.first_column,$$[$0]); 
break;
}
},
table: [{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:$V0,22:$V1,24:17,25:$V2,26:$V3,27:$V4,28:$V5,29:$V6,32:$V7,42:$V8,43:$V9,44:$Va,45:$Vb,46:$Vc,52:$Vd,53:$Ve,54:$Vf},{1:[3]},{5:[1,33],6:34,7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:$V0,22:$V1,24:17,25:$V2,26:$V3,27:$V4,28:$V5,29:$V6,32:$V7,42:$V8,43:$V9,44:$Va,45:$Vb,46:$Vc,52:$Vd,53:$Ve,54:$Vf},{1:[2,2]},o($Vg,[2,4]),o($Vg,[2,5]),o($Vg,[2,6]),o($Vg,[2,7]),o($Vg,[2,8]),o($Vg,[2,9]),o($Vg,[2,10]),o($Vg,[2,11]),o($Vg,[2,12]),o($Vg,[2,13]),o($Vg,[2,14]),o($Vg,[2,15]),{33:[1,35]},{18:[1,37],36:36,41:38,42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl},{19:[1,44]},{19:$Vm,21:[1,46],23:45,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:[1,58]},{40:[1,59]},{40:[1,60]},{40:[1,61]},{37:[1,62]},{37:[1,63]},{19:[1,64]},{54:[1,65]},{55:[1,66]},o($Vw,[2,19]),o($Vw,[2,20]),o($Vw,[2,21]),o($Vw,[2,22]),{1:[2,1]},o($Vg,[2,3]),{34:[1,67]},{21:[1,70],31:[1,71],37:[1,68],40:[1,69]},{19:[1,72]},o($Vx,[2,29]),o($Vx,[2,30]),o($Vx,[2,31]),o($Vx,[2,32]),o($Vx,[2,33]),o($Vx,[2,34]),{30:[1,73]},{21:[1,74],33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,61:$VF,62:$VG,63:$VH,64:$VI},o($Vg,[2,18]),o($VJ,[2,63]),o($VJ,[2,64]),o($VJ,[2,65]),{38:[1,86]},{19:$Vm,23:87,24:88,25:$V2,26:$V3,27:$V4,28:$V5,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{37:[1,89]},{37:[1,90]},o($VJ,[2,70]),o($VJ,[2,71]),o($VJ,[2,72]),o($VJ,[2,73]),{20:[1,91]},{19:$Vm,23:92,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:93,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:94,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$VK,50:95},{19:$VK,50:97},{19:$Vm,23:98,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{21:[1,99]},o($Vg,[2,51]),{35:[1,100]},{38:[1,101]},{38:[1,102]},o($Vg,[2,27]),{41:103,42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl},{20:[1,104]},{31:[1,105]},o($Vg,[2,17]),{19:$Vm,23:106,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:107,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:108,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:109,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:110,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:111,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:112,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:113,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:114,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:115,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:116,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},o($VJ,[2,66]),{20:[1,117],33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,61:$VF,62:$VG,63:$VH,64:$VI},{20:[1,118]},{19:$VK,50:119},{19:$VK,50:120},{21:[1,121]},{21:[1,122],33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,61:$VF,62:$VG,63:$VH,64:$VI},{21:[1,123],33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,61:$VF,62:$VG,63:$VH,64:$VI},{21:[1,124],33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,61:$VF,62:$VG,63:$VH,64:$VI},{39:[1,125]},{24:88,25:$V2,26:$V3,27:$V4,28:$V5},{39:[1,126]},{20:[1,127],33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,61:$VF,62:$VG,63:$VH,64:$VI},o($Vg,[2,50]),o($Vg,[2,24]),{39:[1,128]},{21:[1,129]},o($Vx,[2,28]),{47:130,48:[1,131]},{19:$Vm,23:132,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},o($VL,[2,52],{58:$VC,59:$VD,60:$VE}),o($VL,[2,53],{58:$VC,59:$VD,60:$VE}),o($VJ,[2,54]),o($VJ,[2,55]),o($VJ,[2,56]),o([20,21,61],[2,57],{33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,62:$VG,63:$VH,64:$VI}),o($VM,[2,58],{33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,63:$VH,64:$VI}),o($VM,[2,59],{33:$Vy,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,64:$VI}),o($VM,[2,60],{33:$Vy,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,64:$VI}),o($VN,[2,61],{56:$VA,57:$VB,58:$VC,59:$VD,60:$VE}),o($VN,[2,62],{56:$VA,57:$VB,58:$VC,59:$VD,60:$VE}),o($VJ,[2,67]),{19:[1,138],38:[1,136],42:[1,133],45:[1,134],46:[1,135],51:[1,137]},{39:[1,139]},{39:[1,140]},o($Vg,[2,16]),o($Vg,[2,38]),o($Vg,[2,39]),o($Vg,[2,40]),{40:[1,141]},{40:[1,142]},{53:[1,143]},{21:[1,144]},o($Vg,[2,26]),o($Vg,[2,37]),{4:145,6:4,7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:$V0,22:$V1,24:17,25:$V2,26:$V3,27:$V4,28:$V5,29:$V6,32:$V7,42:$V8,43:$V9,44:$Va,45:$Vb,46:$Vc,49:[1,146],52:$Vd,53:$Ve,54:$Vf},{20:[1,147],33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,61:$VF,62:$VG,63:$VH,64:$VI},o($VO,[2,43]),o($VO,[2,44]),o($VO,[2,45]),o($VO,[2,46]),o($VO,[2,47]),{19:$Vm,23:148,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},o($VJ,[2,68]),o($VJ,[2,69]),{19:$Vm,23:149,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{19:$Vm,23:150,30:$Vn,38:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,50:57,51:$Vu,57:$Vv},{54:[1,151]},o($Vg,[2,25]),{6:34,7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:$V0,22:$V1,24:17,25:$V2,26:$V3,27:$V4,28:$V5,29:$V6,32:$V7,42:$V8,43:$V9,44:$Va,45:$Vb,46:$Vc,49:[1,152],52:$Vd,53:$Ve,54:$Vf},o($Vg,[2,36]),{21:[1,153]},{20:[1,154],33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,61:$VF,62:$VG,63:$VH,64:$VI},{21:[1,155],33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,61:$VF,62:$VG,63:$VH,64:$VI},{21:[1,156],33:$Vy,35:$Vz,56:$VA,57:$VB,58:$VC,59:$VD,60:$VE,61:$VF,62:$VG,63:$VH,64:$VI},{21:[1,157]},o($Vg,[2,35]),o($Vg,[2,23]),o($VO,[2,48]),o($Vg,[2,41]),o($Vg,[2,42]),o($Vg,[2,49])],
defaultActions: {3:[2,2],33:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* Omitir */
break;
case 1:/* Omitir */
break;
case 2:/* Omitir */
break;
case 3:return 56;
break;
case 4:return 57;
break;
case 5:return 58;
break;
case 6:return 59;
break;
case 7:return 60;
break;
case 8:return 63;
break;
case 9:return 35;
break;
case 10:return 64;
break;
case 11:return 33;
break;
case 12:return 62;
break;
case 13:return 61;
break;
case 14:return 40;
break;
case 15:return 21;
break;
case 16:return 55;
break;
case 17:return 19;
break;
case 18:return 20;
break;
case 19:return 48;
break;
case 20:return 49;
break;
case 21:return 37;
break;
case 22:return 39;
break;
case 23:return 31;
break;
case 24:return 25;
break;
case 25:return 26;
break;
case 26:return 28;
break;
case 27:return 27;
break;
case 28:return 52;
break;
case 29:return 22;
break;
case 30:return 32;
break;
case 31:return 34;
break;
case 32:return 53;
break;
case 33:return 29;
break;
case 34:return 44;
break;
case 35:return 43;
break;
case 36:return 45;
break;
case 37:return 46;
break;
case 38:return 51;
break;
case 39:return 38;
break;
case 40:return 30;
break;
case 41:return 42;
break;
case 42:return 54;
break;
case 43:return 18;
break;
case 44:return 5;
break;
case 45:return 'INVALID';
break;
}
},
rules: [/^(?:(\/\/.*(\r|\n|\r\n|$)))/,/^(?:([/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]))/,/^(?:[\s\t\r\n]+)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:>=)/,/^(?:>)/,/^(?:<=)/,/^(?:<)/,/^(?:==)/,/^(?:!=)/,/^(?:=)/,/^(?:;)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:void\b)/,/^(?:float\b)/,/^(?:char\b)/,/^(?:int\b)/,/^(?:if\b)/,/^(?:return\b)/,/^(?:#include\b)/,/^(?:stdio\.h\b)/,/^(?:goto\b)/,/^(?:printf\b)/,/^(?:Stack\b)/,/^(?:Heap\b)/,/^(?:P\b)/,/^(?:H\b)/,/^(?:([0-9]+\.[0-9]+))/,/^(?:([0-9]+))/,/^(?:([\"\'\`](([^\"\'\`\\])*([\\].)*)*[\"\'\`]))/,/^(?:t[0-9]+)/,/^(?:L[0-9]+)/,/^(?:([A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*))/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = C3DGrammar;
exports.Parser = C3DGrammar.Parser;
exports.parse = function () { return C3DGrammar.parse.apply(C3DGrammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}