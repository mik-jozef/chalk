/*/
  Parser for Chalk.
/*/

import { nextToken } from "./tokenizer.mjs";

function isTerminal(symbol) {
  return !symbol.match(/^[A-Z]/);
}

export class Ast {
  constructor(charsRead, row, col, mode) {
    const b = charsRead instanceof Ast;
    
    this.ast = [];
    this.charsRead = b ? charsRead.charsRead : charsRead;
    this.row = b ? charsRead.row : row;
    this.col = b ? charsRead.col : col;
    this.mode = b ? charsRead.mode : mode;
  }
  
  update(next) {
    this.ast.push(next);
    this.charsRead += next.charsRead;
    this.row += next.row;
    this.col += next.col;
    this.mode = next.mode || this.mode;
  }
}

export class Parser {
  constructor(grammar) {
    this.grammarMap = new Map();
    
    // Check if all nonteminals used are defined
    for (let [ rule, symbols ] of grammar) {
      for (let symbol of symbols) {
        if (symbol.length == 0) throw new Error("Found empty string in rule: " + rule);
        
        if (symbol[0].match(/[A-Z]/)) {
          if (!grammar.some((rule,i) => rule[0] == symbol)) {
            throw new Error("Found undefined nonterminal: " + symbol);
          }
        }
      }
    }
    
    for (let [ name, symbols ] of grammar) {
      this.grammarMap.has(name)
        ? this.grammarMap.get(name).push(symbols)
        : this.grammarMap.set(name, [ symbols ]);
    }
  }
  
  parse(str, symbol, parserState) {
    if (typeof parserState == "string") parserState = new Ast(0, 0, 0, parserState);
    console.log(symbol);
    if (isTerminal(symbol)) {
      const next = nextToken(parserState.mode, str, parserState.charsRead);
      console.log("ternimal " + symbol, next);
      if (symbol[0] === "@") symbol = symbol.substring(1);
      
      return (next.token.type || next.token) === symbol ? next : null;
    }
    
    nextAlternative: for (let alternative of this.grammarMap.get(symbol)) {console.log("alt", symbol, alternative);
      const ast = [];
      const state = new Ast(parserState);
      
      for (let symbol of alternative) {
        const nextParse = this.parse(str, symbol, state);
        
        console.log("nextParse", nextParse)
        if (!nextParse) continue nextAlternative;
        console.log("state", state)
        state.update(nextParse);
        console.log("stateAfter", state)
      }
      
      return state;
    }
    
    return null;
  }
}
