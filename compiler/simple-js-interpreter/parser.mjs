/*/
Parser of Chalk(Doc).

I decided not to support destructuring, here are the unfinished rules of grammar:

```
      , [ "Destructuring", [ "ObjectDestructuring" ] ]
      , [ "Destructuring", [ "ArrayDestructuring" ] ]
      , [ "Destructuring", [ "TupleDestructuring" ] ]
      , [ "ArrayDestructuring", [ "[", "Identifier", "IdList", "]" ] ]
      , [ "IdList", [] ]
      , [ "IdList", [ ",", "Identifier", "IdList" ] ]
      , [ "ObjectDestructuring", [ "{", "Identifier", "TypedIdList", "}" ] ]
      , [ "ObjectDestructuring", [ "{", "Type", "Identifier", "}" ] ]
      , [ "TupleDestructuring", [ "(", ")" ] ]
      , [ "TypedIdList", [ "",  ] ]
```
/*/

import { tokenizer } from "./tokenizer.mjs";

import util from "util";

/*/
Simplified grammar of the Chalk programming language.

Doesn't (yet?) support destructuring, function types, and `yield*`/`yieldAll`.

At first, I tried to support nearly everything that is (will be) valid Chalk,
but now, after fixing countless grammar conflicts I'll be fine with any working
solution.

Special terminals: uIdentifier, lIdentifier, number, string.
/*/
export const chalkGrammar =
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
    , [ "Type", [ "class" ] ] // TODO what about []class
    , [ "Type", [ "trait" ] ]
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
    , [ "TemplateParams", [ "<", "ParamsT", "Params", ">" ] ]
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
    , [ "Operator", [ "return", "QmarkR" ] ]
    , [ "Operator", [ "break", "QmarkR" ] ]
    , [ "Operator", [ "continue" ] ] //, [ "Operator", [ "Def" ] ] // Causes conflicts
    , [ "Operator", [ "Type" ] ]
    , [ "Operator", [ "QmarkR" ] ]
    , [ "QmarkR", [ "OrL", "?", "Operator", ":", "QmarkR" ] ]
    , [ "QmarkR", [ "OrL", "?:", "QmarkR" ] ]
    , [ "QmarkR", [ "OrR" ] ]
    , [ "QmarkL", [ "OrL", "?", "Operator", ":", "QmarkL" ] ]
    , [ "QmarkL", [ "OrL", "?:", "QmarkL" ] ]
    , [ "QmarkL", [ "OrL" ] ]
    , [ "OrR", [ "AndL", "||", "OrR" ] ]
    , [ "OrR", [ "AndR" ] ]
    , [ "OrL", [ "AndL", "||", "OrL" ] ]
    , [ "OrL", [ "AndL" ] ]
    , [ "AndR", [ "EqualL", "&&", "AndR" ] ]
    , [ "AndR", [ "EqualR" ] ]
    , [ "AndL", [ "EqualL", "&&", "AndL" ] ]
    , [ "AndL", [ "EqualL" ] ]
    , [ "EqualR", [ "EqualL", "==", "RelationR" ] ]
    , [ "EqualR", [ "EqualL", "!=", "RelationR" ] ]
    , [ "EqualR", [ "RelationR" ] ]
    , [ "EqualL", [ "EqualL", "==", "RelationL" ] ]
    , [ "EqualL", [ "EqualL", "!=", "RelationL" ] ]
    , [ "EqualL", [ "RelationL" ] ]
    , [ "RelationR", [ "CompareL", "<", "CompareR" ] ]
    , [ "RelationR", [ "CompareL", ">", "CompareR" ] ]
    , [ "RelationR", [ "CompareL", "<=", "CompareR" ] ]
    , [ "RelationR", [ "CompareL", ">=", "CompareR" ] ]
    , [ "RelationR", [ "CompareL", "is", "CompareR" ] ]
    , [ "RelationR", [ "CompareR" ] ]
    , [ "RelationL", [ "CompareL", "<", "CompareL" ] ]
    , [ "RelationL", [ "CompareL", ">", "CompareL" ] ]
    , [ "RelationL", [ "CompareL", "<=", "CompareL" ] ]
    , [ "RelationL", [ "CompareL", ">=", "CompareL" ] ]
    , [ "RelationL", [ "CompareL", "is", "CompareL" ] ]
    , [ "RelationL", [ "CompareL" ] ]
    , [ "CompareR", [ "ConcatL", "<=>", "ConcatR" ] ]
    , [ "CompareR", [ "ConcatR" ] ]
    , [ "CompareL", [ "ConcatL", "<=>", "ConcatL" ] ]
    , [ "CompareL", [ "ConcatL" ] ]
    , [ "ConcatR", [ "ConcatL", "++", "ModR" ] ]
    , [ "ConcatR", [ "ModR" ] ]
    , [ "ConcatL", [ "ConcatL", "++", "ModL" ] ]
    , [ "ConcatL", [ "ModL" ] ]
    , [ "ModR", [ "ModL", "%", "AddR" ] ]
    , [ "ModR", [ "AddR" ] ]
    , [ "ModL", [ "ModL", "%", "AddL" ] ]
    , [ "ModL", [ "AddL" ] ]
    , [ "AddR", [ "AddL", "+", "MulR" ] ]
    , [ "AddR", [ "AddL", "-", "MulR" ] ]
    , [ "AddR", [ "AddL", "+%", "MulR" ] ]
    , [ "AddR", [ "AddL", "-%", "MulR" ] ]
    , [ "AddR", [ "MulR" ] ]
    , [ "AddL", [ "AddL", "+", "MulL" ] ]
    , [ "AddL", [ "AddL", "-", "MulL" ] ]
    , [ "AddL", [ "AddL", "+%", "MulL" ] ]
    , [ "AddL", [ "AddL", "-%", "MulL" ] ]
    , [ "AddL", [ "MulL" ] ]
    , [ "MulR", [ "MulL", "*", "PowR" ] ]
    , [ "MulR", [ "MulL", "*%", "PowR" ] ]
    , [ "MulR", [ "MulL", "/", "PowR" ] ]
    , [ "MulR", [ "PowR" ] ]
    , [ "MulL", [ "MulL", "*", "PowL" ] ]
    , [ "MulL", [ "MulL", "*%", "PowL" ] ]
    , [ "MulL", [ "MulL", "/", "PowL" ] ]
    , [ "MulL", [ "PowL" ] ]
    , [ "PowR", [ "Await", "**", "PowR" ] ]
    , [ "PowR", [ "Await" ] ]
    , [ "PowR", [ "Assign" ] ]
    , [ "PowR", [ "Words", "Neg" ] ]
    , [ "PowL", [ "Await", "**", "PowL" ] ]
    , [ "PowL", [ "Await" ] ]
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
   // Conflict with the next rule, because '{}' can be derived from Operator and Cases can be empty.
  //, [ "Switch", [ "switch", "{", "Cases", "}" ] ]
    , [ "Switch", [ "switch", "Operator", "{", "Cases", "}" ] ]
    , [ "Cases", [ ] ]
      
    // TODO this is wrong: there shouldn't be a semicolon if Operator is a code block.
    , [ "Cases", [ "case", "Operator", ":", "Operator", ";", "Cases" ] ]
    , [ "Cases", [ "case", "_", ":", "Operator", ";", "Cases" ] ]
  //, [ "For", [ "for", "ForBody" ] ]
    , [ "For", [ "for", "Operator", "ForBody" ] ]
    , [ "For", [ "for", "Operator", ";", "Operator", "ForBody" ] ]
    , [ "For", [ "for", "Operator", ";", "Operator", ";", "Operator", "ForBody" ] ]
    , [ "ForBody", [ "{", "}" ] ]
    , [ "ForBody", [ "{", "OpOrDefS", "}" ] ]
    , [ "FunctionCall", [ "lIdentifier", "Tuple" ] ]
    ];

function isTerminal(symbol) { return symbol[0].toLowerCase() == symbol[0] }

export function first(grammar, symArr, stack = []) {
  if (symArr.length == 0) return new Set([ "" ]);
  
  if (isTerminal(symArr[0])) return new Set([ symArr[0] ]);
  
  if (stack.includes(symArr[0])) return new Set();
    
  const newStack = stack.slice();
  
  newStack.push(symArr[0]);
  
  return grammar.map(rule => {
    if (rule[0] == symArr[0]) {
      return first(grammar, rule[1].concat(symArr.slice(1)), newStack);
    }
    
    return new Set();
    
  }).reduce((acc, a) => (a.forEach(b => acc.add(b)), acc), new Set());
}

class ParserState {
  constructor(grammar, rules, index) {
    this.index = index;
    this.rules = rules;
    this.transitions = new Map();
    
    // Add missing rules (For all `T -> a.Bc`, add all `B -> ...`).
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].dot < rules[i].rule[1].length) {
        if (rules[i].rule[1][rules[i].dot].match(/[A-Z]/)) {
          const context = first(grammar, rules[i].rule[1].slice(rules[i].dot+1));
          
          if (context.has("")) {
            rules[i].context.forEach(a => context.add(a));
            
            rules[i].context.has("") || context.delete("");
          }
          
          grammar.forEach(grammarRule => { // TODO sometimes the rule is there, but its context needs to be expanded
            grammarRule[0] == rules[i].rule[1][rules[i].dot]
                && rules.every((rule, i) => rule.rule != grammarRule
                      || rule.dot !== 0
                      || (() => {
                           let bool = false;
                           
                           context.forEach(c => rule.context.has(c) || (bool = true));
                           
                           if (bool) {
                             rule.context.forEach(c => context.add(c));
                             
                             [ rule ] = rules.splice(i, 1);
                             i--;
                           }
                           
                           return bool;
                         })()
                    )
                && rules.push(
                  { rule: grammarRule
                  , dot: 0
                  , context
                  }
                );
          });
        }
      }
    };
    
    console.log(util.inspect(rules, {colors:true,depth:null,showHidden:false}));
    
    // Populate 'transitions'.
    rules.forEach(rule => {
      (rule.dot == rule.rule[1].length ? rule.context : new Set([ rule.rule[1][rule.dot] ])).forEach(symbol => {
        if (rule.dot == rule.rule[1].length) {
          if (this.transitions.has(symbol)
              && this.transitions.get(symbol).ruleIndex !== grammar.indexOf(rule.rule)) {
            console.log("Grammar conflict: \"" + symbol + "\" in " + rule.rule, this.transitions, grammar.indexOf(rule.rule));
            console.log(util.inspect(this.transitions.get(symbol), {colors:true,depth:null,showHidden:false}))
            console.log(util.inspect(rules, {colors:true,depth:null,showHidden:false}))
            
            throw 0;
          }
          
          this.transitions.set(symbol, { read: false, ruleIndex: grammar.indexOf(rule.rule) });
          
          return;
        }
        
        const transition = this.transitions.get(symbol)
            || this.transitions.set(symbol, { read: true, state: null, rules: [] }).get(symbol);
        
        if (!transition.read) {
          console.log("Grammar conflict: \"" + symbol + "\" in " + rule.rule, grammar.indexOf(rule.rule));
          console.log(util.inspect(this.transitions.get(symbol), {colors:true,depth:null,showHidden:false}))
          console.log(util.inspect(rules, {colors:true,depth:null,showHidden:false}))
          
          console.log("\n\n\n\n\nHere - - - - - - - - - - - - |||\n\n", transition, rule, "asdf");
          
          throw 1;
        }
        
        transition.rules.push({ rule: rule.rule, dot: rule.dot + 1, context: rule.context });
      });
    });
    
  }
  
  static equals(a, b) {
    if (a.rules.length !== b.rules.length) return false;
    
    return a.rules.every(a => {
      return b.rules.some(b => {
        return a.rule == b.rule
            && a.dot == b.dot
            && a.context.size == b.context.size
            && (() => {
          let count = 0;
          
          a.context.forEach(a => b.context.has(a) && count++);
          
          return count == a.context.size;
        })();
      });
    });
  }
  
  addStates(addState) {
    this.transitions.forEach(a => a.read && (a.state = addState(a.rules)));
  }
}

export class Parser {
  // Grammar musn't contain "Start".
  constructor(grammar, startSymbol) {
    const table = this.table = [];
    this.grammar = grammar;
    
    /*/
    Adds a new state containing 'rules', and all states reachable from them.
    
    Returns the new state's index.
    /*/
    function addState(rules) {
      const newState = new ParserState(grammar, rules, table.length);
      
      let index = -1;
      
      table.some((state, i) => ParserState.equals(state, newState) && (index = i));
      
      if (index == -1) {
        const newStateIndex = table.push(newState) - 1;
        
        newState.addStates(addState);
        
        return newStateIndex;
      }
      
      return index;
    }
    
    addState(
          [ { rule: [ "", [ startSymbol ] ]
            , dot: 0
            , context: new Set([ "" ])
            }
          ]
        );
  }
  
  parse(str, isChalkDoc) {
    const stream = tokenizer(str, isChalkDoc);
    const stack = [];
    
    const getState = () => {
      return stack.length ? stack[stack.length - 1].state : this.table[0];
    }
    
    function getOptions() {
      const options = [];
      
      for (let k of getState().transitions.keys()) options.push(k);
      
      return ", expected one of [ " + options.map(a => "'" + a + "'").join(", ") + " ].";
    }
    
    let [ symbol, column, row ] = stream.next().value;
    
    while (getState() !== undefined) {
      // TODO special cases for string, number and identifier
      
      if (!symbol) symbol = "";
      
      const symbolName = symbol.type || symbol;
      const next = getState().transitions.get(symbolName);
      
      if (!next) {
        console.log("Cannot read \"" + symbolName + "\" at " + column + ":" + row + getOptions());
        
        console.log(util.inspect(stack.slice(stack.length - 4), {colors:true,depth:6,showHidden:false}));
        
        throw 2;
      }
      
      if (next.read) {
        stack.push({ symbol, state: this.table[next.state] });
        
        [ symbol, column, row ] = stream.next().value;
      } else {
        const rule = this.grammar[next.ruleIndex];
        const symbols = stack.slice(stack.length - rule[1].length);
        
        stack.length -= rule[1].length;
        stack.push(
              { symbol: rule[0]
              , state: this.table[getState().transitions.get(rule[0]).state]
              , children: symbols
              }
            );
      }
    }
  }
}

export function getImportPaths(moduleAst) {
  const paths = [];
  
  let importNode = moduleAst.children[0].children[0];
  
  while (importNode.children.length) {
    paths.push(importNode.children[3]);
    
    importNode = importNode.children[5];
  }
  
  return paths;
}
