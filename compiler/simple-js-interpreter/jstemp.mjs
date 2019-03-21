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
// 2 + a = 4;
// 2 + a = b = 2 + 4;

export const simplerGrammar =
    [ [ "Operator", [ "Assign" ] ]
    , [ "Assign", [ "AssignM" ] ]
    , [ "Assign", [ "QmarkR" ] ]
    , [ "AssignM", [ "Unary", "=", "Assign" ] ]
    , [ "Unary", [ "unary" ] ]
    , [ "QmarkL", [ "OrL", "?:", "QmarkL" ] ]
    , [ "QmarkL", [ "OrL" ] ]
    , [ "QmarkR", [ "OrL", "?:", "QmarkR" ] ]
    , [ "QmarkR", [ "OrR" ] ]
    , [ "OrL", [ "PowL" ] ]
    , [ "OrR", [ "PowR" ] ]
    , [ "PowL", [ "PowL", "**", "Unary" ] ]
    , [ "PowL", [ "Unary" ] ]
    , [ "PowR", [ "PowL", "**", "AssignR" ] ]
    , [ "PowR", [ "AssignR" ] ]
    ];

// Seems to work, but is quite slow
function testFirst() {
  log(first(simpleGrammar, [ "B" ], new Set("g")));
  
  log(first(chalkGrammar, [ "Assign" ]));
  
  log(first(chalkGrammar, [ "Module" ], new Set("g")));
}

function testParser() {
  const parser = new Parser(simplerGrammar, "Operator");
  
  log(parser.table);
}

testParser();
//log(first(chalkGrammar, [ "Operator" ]));