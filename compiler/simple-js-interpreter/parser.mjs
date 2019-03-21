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

import util from "util"; // TODO remove

/*/
Simplified grammar of the Chalk programming language.

Doesn't (yet?) support destructuring, function types, and `yield*`/`yieldAll`.

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
    , [ "Identifier", [ "uIdentifier" ] ]
    , [ "Identifier", [ "lIdentifier" ] ]
    , [ "IdListT", [ "Identifier", ",", "IdListT" ] ]
    , [ "Defs", [] ]
    , [ "Defs", [ "Def", "Defs" ] ]
    , [ "Def", [ "ClassDef" ] ]
    , [ "Def", [ "TraitDef" ] ]
    , [ "Def", [ "FunctionDef" ] ]
    , [ "Def", [ "VariableDef" ] ]
    , [ "Def", [ "Destructuring" ] ]
    , [ "Expr", [ "Operator" ] ]
    , [ "RetName", [] ]
    , [ "RetName", [ "-", "lIdentifier" ] ]
    , [ "Expr", [ "FunctionCall" ] ]
    , [ "Expr", [ "Return" ] ]
    , [ "Type", [ "TypeMemAccess" ] ]
    , [ "Type", [ "UnionType" ] ]
    , [ "Type", [ "IntersectionType" ] ]
    , [ "Type", [ "auto" ] ]
    , [ "TypeMemAccess", [ "AtomicType" ] ]
    , [ "TypeMemAccess", [ "lIdentifier" ] ]
    , [ "TypeMemAccess", [ "AtomicType", ".", "TypeMemAccess" ] ]
    , [ "TypeMemAccess", [ "lIdentifier", ".", "TypeMemAccess" ] ]
    , [ "AtomicType", [ "uIdentifier" ] ]
    , [ "AtomicType", [ "uIdentifier", "<", "Expr", "ExprT", ">" ] ]
    , [ "AtomicType", [ "[", "]", "AtomicType" ] ]
    , [ "AtomicType", [ "[", "]", "(", "Type", ")" ] ]
    , [ "AtomicType", [ "*", "AtomicType" ] ]
    , [ "AtomicType", [ "*", "(", "Type", ")" ] ]
    , [ "AtomicType", [ "(", "Type" ] ]
    , [ "UnionType", [ "TypeMemAccess", "|", "Type" ] ]
    , [ "UnionType", [ "IntersectionType", "|", "Type" ] ]
    , [ "IntersectionType", [ "TypeMemAccess", "&", "TypeMemAccess" ] ]
    , [ "IntersectionType", [ "TypeMemAccess", "&", "(", "UnionType", ")" ] ]
    , [ "IntersectionType", [ "TypeMemAccess", "&", "IntersectionType" ] ]
    , [ "IntersectionType", [ "(", "UnionType", ")", "&", "TypeMemAccess" ] ]
    , [ "IntersectionType", [ "(", "UnionType", ")", "&", "(", "UnionType", ")" ] ]
    , [ "IntersectionType", [ "(", "UnionType", ")", "&", "IntersectionType" ] ]
    , [ "ClassDef", [ "class", "Identifier", "TemplateParams", "Extends", "{", "Defs", "}" ] ]
    , [ "TemplateParams", [] ]
    , [ "TemplateParams", [ "<", "ParamsT", ">" ] ]
    , [ "Params", [ "" ] ]
    , [ "Params", [ "ParamsT" ] ]
    , [ "ParamsT", [ "Type", "Identifier" ] ]
    , [ "ParamsT", [ "Identifier", ",", "ParamsT" ] ]
    , [ "ParamsT", [ "Type", "Identifier", ",", "ParamsT" ] ]
    , [ "Extends", [] ]
    , [ "Extends", [ ":", "IdListT" ] ]
    , [ "TraitDef", [ "trait", "Identifier", "TemplateParams", "Extends", "{", "Defs", "}" ] ]
    , [ "Function", [ "Type", "(", "Params", ")", "=>", "Expr" ] ]
    , [ "Function", [ "Type", "(", "Params", ")", "Block" ] ]
    , [ "Function", [ "Type", "(", "Params", ")", "{", "}" ] ]
    , [ "Function", [ "Type", "(", "Params", ")", "{", "Expr", "}" ] ]
    , [ "VariableDef", [ "Type", "VariableDefT" ] ]
    , [ "VariableDef", [ "Type", "VariableDefT", "VariableDefR" ] ]
    , [ "VariableDefT", [ "Identifier" ] ]
    , [ "VariableDefT", [ "Identifier", "=", "Expr" ] ]
    , [ "VariableDefT", [ "Identifier", "Tuple" ] ]
    , [ "VariableDefR", [ ",", "VariableDefT", "VariableDefR" ] ]
    , [ "Literal", [ "number" ] ]
    , [ "Literal", [ "string" ] ]
    , [ "Literal", [ "Array" ] ]
    , [ "Literal", [ "Tuple" ] ]
    , [ "Literal", [ "Object" ] ]
    , [ "Literal", [ "Set" ] ]
    , [ "Array", [ "[", "]" ] ]
    , [ "Array", [ "[", "Expr", "]" ] ]
    , [ "Array", [ "[", "Expr", "ExprT", "]" ] ]
    , [ "ExprT", [] ]
    , [ "ExprT", [ ",", "Expr", "ExprT" ] ]
    , [ "Tuple", [ "(", ")" ] ]
    , [ "Tuple", [ "(", "Expr", ")" ] ]
    , [ "Tuple", [ "(", "Expr", "ExprT", ")" ] ]
    , [ "Object", [ "{", "Identifier", "ObjectT", "}" ] ]
    , [ "Object", [ "{", "Type", "Identifier", "ObjectT", "}" ] ]
    , [ "ObjectT", [] ]
    , [ "ObjectT", [ ",", "Identifier", "Expr", "ObjectT" ] ]
    , [ "ObjectT", [ ",", "Type", "Identifier", "Expr", "ObjectT" ] ]
    , [ "Set", [ "{", "}" ] ]
    , [ "Set", [ "{", "Expr", "}" ] ]
    , [ "Set", [ "{", "Expr", "ExprT", "}" ] ]
    , [ "Operator", [ "const", "Operator" ] ]
    , [ "Operator", [ "immut", "Operator" ] ]
    , [ "Operator", [ "yield", "Operator" ] ]
    , [ "Operator", [ "AssignL" ] ]
    , [ "AssignL", [ "Unary", "=", "AssignL" ] ]
    , [ "AssignL", [ "Unary", "+=", "AssignL" ] ]
    , [ "AssignL", [ "Unary", "-=", "AssignL" ] ]
    , [ "AssignL", [ "Unary", "*=", "AssignL" ] ]
    , [ "AssignL", [ "Unary", "/=", "AssignL" ] ]
    , [ "AssignL", [ "Unary", "%=", "AssignL" ] ]
    , [ "AssignL", [ "Unary", "**=", "AssignL" ] ]
    , [ "AssignL", [ "QmarkL" ] ]
    , [ "AssignR", [ "Unary", "=", "AssignL" ] ]
    , [ "AssignR", [ "Unary", "+=", "AssignL" ] ]
    , [ "AssignR", [ "Unary", "-=", "AssignL" ] ]
    , [ "AssignR", [ "Unary", "*=", "AssignL" ] ]
    , [ "AssignR", [ "Unary", "/=", "AssignL" ] ]
    , [ "AssignR", [ "Unary", "%=", "AssignL" ] ]
    , [ "AssignR", [ "Unary", "**=", "AssignL" ] ]
    , [ "Unary", [ "Literal" ] ]
    , [ "Unary", [ "Identifier" ] ]
    , [ "Unary", [ "Def" ] ]
    , [ "Unary", [ "Block" ] ]
    , [ "Unary", [ "Switch" ] ]
    , [ "Unary", [ "For" ] ]
    , [ "Unary", [ "break", "RetName" ] ]
    , [ "Unary", [ "break", "RetName", "Operator" ] ]
    , [ "Unary", [ "continue", "RetName" ] ]
    , [ "Unary", [ "Unary", ".", "Identifier" ] ]
    , [ "Unary", [ "Unary", "?.", "Identifier" ] ]
    , [ "Unary", [ "Unary", "[", "Operator", "]" ] ]
    , [ "Unary", [ "!", "Unary" ] ]
    , [ "QmarkL", [ "OrL", "?", "Expr", ":", "QmarkR" ] ]
    , [ "QmarkL", [ "OrL", "?:", "QmarkR" ] ]
    , [ "QmarkL", [ "OrL" ] ]
    , [ "QmarkR", [ "OrL", "?", "Expr", ":", "QmarkR" ] ]
    , [ "QmarkR", [ "OrL", "?:", "QmarkR" ] ]
    , [ "QmarkR", [ "OrR" ] ]
    , [ "OrL", [ "AndL", "||", "OrR" ] ]
    , [ "OrL", [ "AndL" ] ]
    , [ "OrR", [ "AndL", "||", "OrR" ] ]
    , [ "OrR", [ "AndR" ] ]
    , [ "AndL", [ "EqualL", "&&", "AndR" ] ]
    , [ "AndL", [ "EqualL" ] ]
    , [ "AndR", [ "EqualL", "&&", "AndR" ] ]
    , [ "AndR", [ "EqualR" ] ]
    , [ "EqualL", [ "EqualL", "==", "RelationR" ] ]
    , [ "EqualL", [ "EqualL", "!=", "RelationR" ] ]
    , [ "EqualL", [ "RelationL" ] ]
    , [ "EqualR", [ "EqualL", "==", "RelationR" ] ]
    , [ "EqualR", [ "EqualL", "!=", "RelationR" ] ]
    , [ "EqualR", [ "RelationR" ] ]
    , [ "RelationL", [ "CompareL", "<", "CompareR" ] ]
    , [ "RelationL", [ "CompareL", ">", "CompareR" ] ]
    , [ "RelationL", [ "CompareL", "<=", "CompareR" ] ]
    , [ "RelationL", [ "CompareL", ">=", "CompareR" ] ]
    , [ "RelationL", [ "CompareL", "is", "CompareR" ] ]
    , [ "RelationL", [ "CompareL" ] ]
    , [ "RelationR", [ "CompareL", "<", "CompareR" ] ]
    , [ "RelationR", [ "CompareL", ">", "CompareR" ] ]
    , [ "RelationR", [ "CompareL", "<=", "CompareR" ] ]
    , [ "RelationR", [ "CompareL", "<=", "CompareR" ] ]
    , [ "RelationR", [ "CompareL", "is", "CompareR" ] ]
    , [ "RelationR", [ "CompareR" ] ]
    , [ "CompareL", [ "ConcatL", "<=>", "ConcatR" ] ]
    , [ "CompareL", [ "ConcatL" ] ]
    , [ "CompareR", [ "ConcatL", "<=>", "ConcatR" ] ]
    , [ "CompareR", [ "ConcatR" ] ]
    , [ "ConcatL", [ "ConcatL", "++", "ModR" ] ]
    , [ "ConcatL", [ "ModL" ] ]
    , [ "ConcatR", [ "ConcatL", "++", "ModR" ] ]
    , [ "ConcatR", [ "ModR" ] ]
    , [ "ModL", [ "ModL", "%", "AddR" ] ]
    , [ "ModL", [ "AddL" ] ]
    , [ "ModR", [ "ModL", "%", "AddR" ] ]
    , [ "ModR", [ "AddR" ] ]
    , [ "AddL", [ "AddL", "+", "MulR" ] ]
    , [ "AddL", [ "AddL", "-", "MulR" ] ]
    , [ "AddL", [ "AddL", "+%", "MulR" ] ]
    , [ "AddL", [ "AddL", "-%", "MulR" ] ]
    , [ "AddL", [ "MulL" ] ]
    , [ "AddR", [ "AddL", "+", "MulR" ] ]
    , [ "AddR", [ "AddL", "-", "MulR" ] ]
    , [ "AddR", [ "AddL", "+%", "MulR" ] ]
    , [ "AddR", [ "AddL", "-%", "MulR" ] ]
    , [ "AddR", [ "MulR" ] ]
    , [ "MulL", [ "MulL", "*", "PowR" ] ]
    , [ "MulL", [ "MulL", "*%", "PowR" ] ]
    , [ "MulL", [ "MulL", "/", "PowR" ] ]
    , [ "MulL", [ "PowL" ] ]
    , [ "MulR", [ "MulL", "*", "PowR" ] ]
    , [ "MulR", [ "MulL", "*%", "PowR" ] ]
    , [ "MulR", [ "MulL", "/", "PowR" ] ]
    , [ "MulR", [ "PowR" ] ]
    , [ "PowL", [ "PowL", "**", "AwaitR" ] ]
    , [ "PowL", [ "AwaitL" ] ]
    , [ "PowR", [ "PowL", "**", "AwaitR" ] ]
    , [ "PowR", [ "AwaitR" ] ]
    , [ "AwaitL", [ "await", "Unary" ] ]
    , [ "AwaitL", [ "Unary" ] ]
    , [ "AwaitR", [ "await", "AssignR" ] ]
    , [ "AwaitR", [ "AssignR" ] ]
    , [ "Block", [ "{", "Expr", ";", "ExprS", "}" ] ]
    , [ "ExprS", [ "Expr", ";" ] ]
    , [ "ExprS", [ "Expr", ";", "ExprS" ] ]
    , [ "Switch", [ "switch", "{", "Cases", "}" ] ]
    , [ "Switch", [ "switch", "Expr", "{", "Cases", "}" ] ]
    , [ "Cases", [ ] ]
    , [ "Cases", [ "case", "Expr", ":", "Expr", "Cases" ] ]
    , [ "Cases", [ "case", "_", ":", "Expr", "Cases" ] ]
    , [ "For", [ "for", "RetName", "ForBody" ] ]
    , [ "For", [ "for", "RetName", "Expr", "ForBody" ] ]
    , [ "For", [ "for", "RetName", "Expr", ";", "Expr", "ForBody" ] ]
    , [ "For", [ "for", "RetName", "Expr", ";", "Expr", ";", "Expr", "ForBody" ] ]
    , [ "ForBody", [ "{", "}" ] ]
    , [ "ForBody", [ "{", "ExprS", "}" ] ]
    , [ "FunctionCall", [ "lIdentifier", "Tuple" ] ]
    , [ "QualifExpr", [ "return", "RetName", "Expr" ] ]
    , [ "QualifExpr", [ "await", "Expr" ] ]
    , [ "QualifExpr", [ "const", "Expr" ] ]
    , [ "QualifExpr", [ "immut", "Expr" ] ]
    ];

function isTerminal(symbol) { return symbol[0].toLowerCase() == symbol[0] }

export function first(grammar, symArr, follow = new Set([ "" ]), stack = []) {
  if (symArr.length == 0) return follow;
  
  if (isTerminal(symArr[0])) return new Set([ symArr[0] ]);
  
  if (stack.includes(symArr[0])) return new Set();
  
  const newStack = stack.slice();
  
  newStack.push(symArr[0]);
  
  return grammar.map(rule => {
    if (rule[0] == symArr[0]) {
      return first(grammar, rule[1].concat(symArr.slice(1)), follow, newStack);
    }
    
    return new Set();
    
  }).reduce((acc, a) => (a.forEach(b => acc.add(b)), acc), new Set());
}

class ParserState {
  constructor(grammar, rules) {
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
          
          grammar.forEach(grammarRule => {
            grammarRule[0] == rules[i].rule[1][rules[i].dot]
                && rules.every(rule => rule.rule != grammarRule)
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
    console.log(util.inspect(rules, {colors:true,depth:null,showHidden:false}))
    // Populate 'transitions'.
    rules.forEach(rule => {
      (rule.dot == rule.rule[1].length ? rule.context : new Set([ rule.rule[1][rule.dot] ])).forEach(symbol => {
        if (rule.dot == rule.rule[1].length) {
          if (this.transitions.has(symbol)
              && this.transitions.get(symbol).ruleIndex !== grammar.indexOf(rule.rule)) {
            console.log("Grammar conflict: \"" + symbol + "\" in " + rule.rule, this.transitions, grammar.indexOf(rule.rule));
            console.log(rules)
            
            throw 0;
          }
          
          this.transitions.set(symbol, { read: false, ruleIndex: grammar.indexOf(rule.rule) });
          
          return;
        }
        
        const transition = this.transitions.get(symbol)
            || this.transitions.set(symbol, { read: true, state: null, rules: [] }).get(symbol);
        
        if (!transition.read) {
          console.log(transition, rule);
          
          throw new Error("Grammar conflict");
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
          let bool = false;
          
          a.context.forEach(a => b.context.has(a) && (bool = true));
          
          return bool;
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
      const newState = new ParserState(grammar, rules);
      
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
      
      getState().transitions.keys(k => options.push(k))
      
      return ", expected one of [" + options + "].";
    }
    
    while (getState() !== undefined) {
      // TODO special cases for string, number and identifier
      const symbol = stream.next().value;
      
      if (!symbol) symbol = "";
      
      const next = getState().transitions.get(symbol);
      
      if (!next) {
        throw new Error("Cannot read \"" + symbol + "\"" + getOptions());
      }
      
      if (next.read) {
        stack.push({ symbol, state: this.table[next.state] });
      } else {
        const rule = grammar[next.ruleIndex];
        const symbols = stack.slice(stack.length - rule[1].length);
        
        stack.length -= rule[1].length;
        stack.push(
              { symbol: rule[0]
              , state: getState().transitions.get(rule[0])
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
