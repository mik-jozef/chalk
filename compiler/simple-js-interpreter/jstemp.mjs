import fs from "fs";
import util from "util";
import { keyMap } from "./keywords.mjs";
import { tokenizer } from "./tokenizer.mjs";

import { chalkGrammar, Parser, first } from "./parser.mjs";

function log(obj) {
  console.log(util.inspect(obj, {showHidden: false, depth: null, colors: true}));
}

// Already tested, it works.
function testTokenizer() {
  const file = fs.readFileSync("./test.chalk", "utf8")
  
  const stream = tokenizer(file, false);
  
  let token;
  while (!(token = stream.next()).done) console.log(token.value);
}

const simpleGrammar =
    [ [ "S", [ "a", "B", "c" ] ]
    , [ "S", [ "a", "B", "d" ] ]
    , [ "B", [ "b" ] ]
    , [ "B", [ "b", "B" ] ]
    ];

// T a = 2 + q = 8 * b = c;
// T a = 2 * 4 + q = 8 + b = c;
// 2 + a = 4;
// 2 + a = b = 2 + 4;
// a ** b ** c;

// T a = 2 * 4 + q = 8 + b = c;
// a = await b = c
// a + await b = c

export const simplerGrammar =
    [ [ "Module", [ "Import", "Defs" ] ]
    , [ "Import", [] ]
    , [ "Import", [ "import", "ImpT", "lIdentifier", "string", ";", "Import" ] ] // 'from' is not a keyword
    , [ "ImpT", [ "uIdentifier" ] ]
    , [ "ImpT", [ "{", "IdList", "}" ] ]
    , [ "IdList", [] ]
    , [ "IdList", [ "IdListT" ] ]
    , [ "IdListT", [ "Identifier" ] ]
    , [ "IdListT", [ "Identifier", ",", "IdListT" ] ]
    , [ "LIdListT", [ "lIdentifier" ] ]
    , [ "LIdListT", [ "lIdentifier", ",", "LIdListT" ] ]
    , [ "UIdListT", [ "uIdentifier" ] ]
    , [ "UIdListT", [ "uIdentifier", ",", "UIdListT" ] ]
    , [ "Identifier", [ "uIdentifier" ] ]
    , [ "Identifier", [ "lIdentifier" ] ]
    , [ "Defs", [] ]
    , [ "Defs", [ "Def", ";", "Defs" ] ]
    , [ "Def", [ "ClassDef" ] ]
    , [ "Def", [ "TraitDef" ] ]
    , [ "Def", [ "FunctionDef" ] ]
    , [ "Def", [ "VariableDef" ] ] //, [ "Def", [ "Destructuring" ] ]
    , [ "Type", [ "TypeMemAccess" ] ]
    , [ "Type", [ "UnionType" ] ]
    , [ "Type", [ "IntersectionType" ] ]
    , [ "Type", [ "type" ] ]
    , [ "Type", [ "any" ] ]
    , [ "TypeT", [ "Type" ] ]
    , [ "TypeT", [ "Type", ",", "TypeT" ] ]
    , [ "TypeMemAccess", [ "AtomicUIType" ] ]
    , [ "TypeMemAccess", [ "AtomicUIType", ".", "TypeMemAccess" ] ]
    , [ "TypeMemAccess", [ "LMemAccess", ".", "AtomicUIType", ".", "TypeMemAccess" ] ]
    , [ "TypeMemAccess", [ "LMemAccess", ".", "AtomicUIType" ] ]
    , [ "LMemAccess", [ "lIdentifier" ] ]
    , [ "LMemAccess", [ "LMemAccess", ".", "lIdentifier" ] ]
    , [ "AtomicType", [ "[", "]", "AtomicType" ] ] // TODO these are not reachable
    , [ "AtomicType", [ "*", "AtomicType" ] ]
    , [ "AtomicType", [ "(", "TypeT", ")" ] ]
    , [ "AtomicType", [ "AtomicUIType" ] ]
    , [ "AtomicUIType", [ "uIdentifier" ] ]
    , [ "AtomicUIType", [ "uIdentifier", "<", "Type", "TypeLMemT", ">" ] ]
    , [ "AtomicUIType", [ "uIdentifier", "<", "LMemAccess", "TypeLMemT", ">" ] ]
    , [ "TypeLMemT", [] ]
    , [ "TypeLMemT", [ ",", "Type", "TypeLMemT" ] ]
    , [ "TypeLMemT", [ ",", "LMemAccess", "TypeLMemT" ] ]
    , [ "UnionType", [ "TypeMemAccess", "|", "Type" ] ]
    , [ "UnionType", [ "IntersectionType", "|", "Type" ] ]
    , [ "IntersectionType", [ "TypeMemAccess", "&", "TypeMemAccess" ] ]
    , [ "IntersectionType", [ "TypeMemAccess", "&", "IntersectionType" ] ]
    , [ "ClassDef", [ "class", "uIdentifier", "TemplateParams", "Extends", "{", "Defs", "}" ] ]
    , [ "ClassDef", [ "class", "TemplateParams", "Extends", "{", "Defs", "}" ] ]
    , [ "TemplateParams", [] ]
    , [ "TemplateParams", [ "<", "Params", ">" ] ]
    , [ "Params", [] ]
    , [ "Params", [ "ParamsT", "Params" ] ]
    , [ "ParamsT", [ "Type", "LIdListT" ] ]
    , [ "ParamsT", [ "class", "UIdListT" ] ]
    , [ "ParamsT", [ "trait", "UIdListT" ] ]
    , [ "ParamsT", [ "type", "UIdListT" ] ]
    , [ "ParamsT", [ "any", "UIdListT" ] ]
    , [ "Extends", [] ]
    , [ "Extends", [ ":", "TypeT" ] ]
    , [ "TraitDef", [ "trait", "uIdentifier", "TemplateParams", "Extends", "{", "Defs", "}" ] ]
    , [ "TraitDef", [ "trait", "TemplateParams", "Extends", "{", "Defs", "}" ] ]
    , [ "FunctionDef", [ "Type", "lIdentifier", "(", "Params", ")", "=>", "OpOrDef" ] ]
    , [ "FunctionDef", [ "Type", "lIdentifier", "(", "Params", ")", "Block" ] ]
    , [ "FunctionDef", [ "Type", "lIdentifier", "(", "Params", ")", "{", "}" ] ]
    , [ "FunctionDef", [ "Type", "lIdentifier", "(", "Params", ")", "{", "OpOrDef", "}" ] ]
    , [ "FunctionDef", [ "Type", "lIdentifier", "(", "Params", ")", "{", "OpOrDef", ";", "}" ] ]
    , [ "VariableDef", [ "auto", "VariableDefT" ] ]
    , [ "VariableDef", [ "class", "uIdentifier", "=", "OpOrDef" ] ]
    , [ "VariableDef", [ "trait", "uIdentifier", "=", "OpOrDef" ] ]
    , [ "VariableDef", [ "type", "uIdentifier", "=", "OpOrDef" ] ]
    , [ "VariableDef", [ "any", "uIdentifier", "=", "OpOrDef" ] ]
    , [ "VariableDef", [ "Type", "VariableDefT" ] ]
    , [ "VariableDefT", [ "lIdentifier" ] ]
    , [ "VariableDefT", [ "lIdentifier", "=", "OpOrDef" ] ]
    , [ "VariableDefT", [ "lIdentifier", "Tuple" ] ]
    , [ "VariableDefT", [ "Tuple" ] ]
    , [ "Literal", [ "number" ] ]
    , [ "Literal", [ "string" ] ]
    , [ "Literal", [ "Array" ] ]
    , [ "Literal", [ "Tuple" ] ]
    , [ "Literal", [ "Object" ] ]
    , [ "Literal", [ "Set" ] ]
    , [ "Array", [ "[", "]" ] ]
    , [ "Array", [ "[", "Operator", "OperatorT", "]" ] ]
    , [ "OperatorT", [] ]
    , [ "OperatorT", [ ",", "Operator", "OperatorT" ] ]
    , [ "Tuple", [ "(", "Operator", "OperatorT", ")" ] ]
    , [ "Object", [ "{", "&&", "Identifier", "ObjectT", "}" ] ] // Hack to resolve grammar conflict
    , [ "Object", [ "{", "||", "auto", "Identifier", "ObjectT", "}" ] ]
    , [ "Object", [ "{", "||", "Type", "Identifier", "ObjectT", "}" ] ]
    , [ "ObjectT", [] ]
    , [ "ObjectT", [ ",", ",", "Identifier", "Operator", "ObjectT" ] ]
    , [ "ObjectT", [ ",", ",", "auto", "Identifier", "Operator", "ObjectT" ] ]
    , [ "ObjectT", [ ",", "Type", "Identifier", "Operator", "ObjectT" ] ]
    , [ "Set", [ "{", "Operator", ",", "Operator", "OperatorT", "}" ] ]
    , [ "OpOrDef", [ "Operator" ] ]
    , [ "OpOrDef", [ "Def" ] ]
    , [ "Operator", [ "Type" ] ]
    , [ "Operator", [ "Await" ] ]
    , [ "Await", [ "await", "Neg" ] ]
    , [ "Await", [ "Neg" ] ]
    , [ "Assign", [ "Neg", "=", "Operator" ] ]
    , [ "Assign", [ "Neg", "+=", "Operator" ] ]
    , [ "Assign", [ "Neg", "-=", "Operator" ] ]
    , [ "Assign", [ "Neg", "*=", "Operator" ] ]
    , [ "Assign", [ "Neg", "/=", "Operator" ] ]
    , [ "Assign", [ "Neg", "%=", "Operator" ] ]
    , [ "Assign", [ "Neg", "**=", "Operator" ] ]
    , [ "Neg", [ "!", "Neg" ] ]
    , [ "Neg", [ "LMemUnary" ] ]
    , [ "LMemUnary", [ "LMemAccess" ] ]
    , [ "LMemUnary", [ "Unary" ] ]
    , [ "Unary", [ "Unary", ".", "lIdentifier" ] ]
    , [ "Unary", [ "Unary", "?.", "Identifier" ] ]
    , [ "Unary", [ "Unary", "[", "Operator", "]" ] ]
    , [ "Unary", [ "Literal" ] ]
    , [ "Unary", [ "FunctionCall" ] ]
    , [ "Unary", [ "Block" ] ]
    , [ "Unary", [ "Switch" ] ]
    , [ "Unary", [ "For" ] ]
    , [ "Words", [ "comptime" ] ]
    , [ "Words", [ "const" ] ]
    , [ "Words", [ "immut" ] ]
    , [ "Words", [ "mut" ] ]
    , [ "Words", [ "comptime", "Words" ] ]
    , [ "Words", [ "const", "Words" ] ]
    , [ "Words", [ "immut", "Words" ] ]
    , [ "Words", [ "mut", "Words" ] ]
    , [ "Block", [ "{", "OpOrDef", ";", "OpOrDefS", "}" ] ]
    , [ "OpOrDefS", [ "OpOrDef", ";" ] ]
    , [ "OpOrDefS", [ "OpOrDef", ";", "OpOrDefS" ] ]
    , [ "Switch", [ "switch", "Operator", "{", "Cases", "}" ] ]
    , [ "Cases", [ ] ]
    , [ "Cases", [ "case", "Operator", ":", "Operator", ";", "Cases" ] ]
    , [ "Cases", [ "case", "_", ":", "Operator", ";", "Cases" ] ]
    , [ "For", [ "for", "Operator", "ForBody" ] ]
    , [ "For", [ "for", "Operator", ";", "Operator", "ForBody" ] ]
    , [ "For", [ "for", "Operator", ";", "Operator", ";", "Operator", "ForBody" ] ]
    , [ "ForBody", [ "{", "}" ] ]
    , [ "ForBody", [ "{", "OpOrDefS", "}" ] ]
    , [ "FunctionCall", [ "lIdentifier", "Tuple" ] ]
    ];

// Seems to work, but is quite slow
function testFirst() {
  log(first(simpleGrammar, [ "B" ], new Set("g")));
  
  log(first(chalkGrammar, [ "Assign" ]));
  
  log(first(chalkGrammar, [ "Module" ], new Set("g")));
}

function testParser() {
  const parser = new Parser(simplerGrammar, "OpOrDef");
  
  log(parser.table.length);
  log(parser.table.slice(0,31));
  
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  
  parser.parse("Float pi;");
}

testParser();
//log(first(chalkGrammar, [ "Operator" ]));