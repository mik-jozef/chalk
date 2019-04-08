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
    [ [ "Module", [ "Defs" ] ]
    , [ "IdList", [] ]
    , [ "IdList", [ "IdListT" ] ]
    , [ "IdListT", [ "Identifier" ] ]
    , [ "IdListT", [ "Identifier", ",", "IdListT" ] ]
    , [ "Identifier", [ "uIdentifier" ] ]
    , [ "Identifier", [ "lIdentifier" ] ]
    , [ "Defs", [] ]
    , [ "Defs", [ "Def", "Defs" ] ]
    , [ "Def", [ "VariableDef" ] ]
    , [ "Type", [ "TypeMemAccess" ] ]
    , [ "TypeMemAccess", [ "AtomicUIType" ] ]
    , [ "AtomicUIType", [ "uIdentifier" ] ]
    , [ "VariableDef", [ "Type", "VariableDefT" ] ]
    , [ "VariableDefT", [ "Identifier" ] ]
    , [ "VariableDefT", [ "Identifier", "=", "Operator" ] ]
    , [ "VariableDefT", [ "Identifier", "Tuple" ] ]
    , [ "Operator", [ "Def" ] ]
    , [ "Operator", [ "Type" ] ]
    ];

// Seems to work, but is quite slow
function testFirst() {
  log(first(simpleGrammar, [ "B" ], new Set("g")));
  
  log(first(chalkGrammar, [ "Assign" ]));
  
  log(first(chalkGrammar, [ "Module" ], new Set("g")));
}

function testParser() {
  const parser = new Parser(chalkGrammar, "Module");
  
  log(parser.table);
  log(parser.table.length);
  log(parser.table.slice(0,31));
}

testParser();
//log(first(chalkGrammar, [ "Operator" ]));