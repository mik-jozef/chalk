/*/
  Tokenizer.
/*/

import { keyMap } from "./keywords.mjs";

export function nextToken(mode, str, i) {
  const [ token, charsRead, row, col ] = nextTokenHelper(mode, str, i);
  
  return { token, charsRead, row, col, mode: token.mode || mode };
}

function nextTokenHelper(mode, str, i) {
  switch (mode) {
    case "Plaintext": return { token: { type: "string", value: str }, i };
    case "JSON": return nextJSONToken(str, i);
    case "Chalk": return nextChalkToken(str, i);
    case "ChalkDoc": return nextChalkDocToken(str, i);
  }
}

function rowColUpdate(rowCol, char) {
  char == "\n" ? (rowCol.row++, rowCol.col = 0) : rowCol.col++;
}

function nextJSONToken(str, i) {
  // TODO. Fake it with JSON.parse?
}

// Returns [ token, charsRead, rowRead, colRead ]
function nextChalkToken(str, i) {
  const start = i;
  let row = 0;
  let col = 0;
  
  while (str[i] !== undefined && str[i].match(/\s/)) {
    str[i] == "\n" ? ( row++, col = 0 ) : col++;
    
    i++;
  }
  
  switch (true) {
    case str.substring(i, i + 3) == "{{{": return [ "{{{", i - start + 3, 0, 3 ];
    case str.substring(i, i + 3) == "}}}": return [ { type: "}}}", mode: "ChalkDoc" }, i - start + 3, 0, 3 ];
    case str.substring(i, i + 3) == "///": return [ { type: "///", mode: "ChalkDoc" }, i - start + 3, 0, 3 ];
    case str.substring(i, i + 3) == "**=": return [ "**=", i - start + 3, 0, 3 ];
    case str.substring(i, i + 3) == "<=>": return [ "<=>", i - start + 3, 0, 3 ];
    case str.substring(i, i + 3) == "...": return [ "...", i - start + 3, 0, 3 ];
    case str.substring(i, i + 2) == "+=": return [ "+=", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "-=": return [ "-=", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "*=": return [ "*=", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "/=": return [ "/=", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "%=": return [ "%=", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "**": return [ "**", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "==": return [ "==", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "!=": return [ "!=", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "<=": return [ "<=", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == ">=": return [ ">=", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "?:": return [ "?:", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "?.": return [ "?.", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "++": return [ "++", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "+%": return [ "+%", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "-%": return [ "-%", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "*%": return [ "*%", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "&&": return [ "&&", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "||": return [ "||", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "=>": return [ "=>", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "[]": return [ "[]", i - start + 2, 0, 2 ];
    case str.substring(i, i + 2) == "//": return [ "//", i - start + 2, 0, 2 ];
    case !!str[i].match(/[\(\)\[\]\{\}<>+*\/%=!.,?:;\|&_]/): return [ str[i], i - start + 1, 0, 1 ];
    case !!str[i].match(/[a-zA-Z]/): {
      const upper = str[i] === str[i].toUpperCase();
      
      let map = keyMap;
      
      while (str[i].match(/[a-zA-Z0-9]/)) {console.log(i);
        map = map ? map.get(str[i]) : null;
        
        col++;
        i++;
      }
      
      if (map && (map.get("end") == "return" || map.get("end") == "break"
          || map.get("end") == "continue" || map.get("end") == "for")) {
        let name = null;
        
        if (str[i] == "-") {
          const start = ++i;
          
          while (str[i].match(/[a-zA-Z0-9]/)) i++;
          
          name = str.substring(start, i);
          
          col += i - start + 1;
        }
        
        return [ { type: map.get("end"), name }, i - start, row, col ];
        
      } else {
        return (
              [ map && map.get("end") || { type: (upper ? "u" : "l") + "Identifier", name: str.substring(start, i), upper }
              , i - start
              , row
              , col
              ]
            );
      }
    }
    case str[i] == "\"": {
      let isEscaped = false;
      
      while (isEscaped || str[i] != "\"") {
        isEscaped = !isEscaped && str[i] == "\\";
        
        if (str[i] == "\n") {
          throw new Error("A newline found inside a String literal: " + str.substring(start, i));
        }
        
        i++;
      }
      
      const value = str.substring(start + 1, i).replace("\\\\", "\\").replace("\\\"", "\"");
      
      return [ { type: "string", value }, i - start + 1, row, col + i - start + 1 ];
    }
    case !!str[i].match(/[0-9\-]/): {
      if (str[i] == "-" && !str[i+1].match(/[0-9]/)) {
        return [ "-", 1, 0, 1 ];
      }
      
      while (str[++i].match(/[0-9]/));
      
      if (str[i] == ".") {
        while (str[++i].match(/[0-9]/));
      }
      
      return [ { type: "number", value: +str.substring(start, i) }, i - start, row, i - start ];
    }
    default: return [ { type: "unknown", char: str[i] }, i - start, row, i - start ]; i++;
  }
}

function nextChalkDocToken(str, i) {
  const start = i;
  let row = 0;
  let col = 0;
  
  if (str[i].match(/^[\{\/]{3}/)) return [ str.substring(i, i + 3), 3, 0, 3 ];
  
  while (str[i] !== undefined && !str[i].match(/^[\{\/]/)) {
    str[i] == "\n" ? ( row++, col = 0 ) : col++;
    
    i++;
  }
  
  return [ { type: "string", value: str.substring(start, i) }, i - start, row, col ];
}
