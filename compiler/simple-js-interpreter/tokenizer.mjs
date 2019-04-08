/*/
Chalk tokenizer. Does not (yet?) support binary, octal, hexadecimal numbers and
numbers written using scientific notation.

Special tokens: identifier, string, number, return, break, continue, for, unknown.
/*/

import { keyMap } from "./keywords.mjs";

export function* tokenizer(str, isChalkDoc) {
  let isCode = !isChalkDoc;
  
  let column = 0;
  let rowStart = 0;
  
  for (let i = 0; i < str.length;) {
    switch (true) {
      case !isCode: {
        while (str.substring(i, i + 3) !== "{{{") {
          if (str[i] == "\n") {
            column++;
            rowStart = i + 1;
          }
          
          i++;
        }
        
        i += 3;
        
        isCode = true;
        
        break;
      }
      case isChalkDoc && str.substring(i, i + 3) == "}}}": { isCode = false; i += 3; break; }
      case str.substring(i, i + 3) == "**=": i += 3; yield [ "**=", column, i - rowStart ]; break;
      case str.substring(i, i + 3) == "<=>": i += 3; yield [ "<=>", column, i - rowStart ]; break;
      case str.substring(i, i + 3) == "...": i += 3; yield [ "...", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "+=": i += 2; yield [ "+=", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "-=": i += 2; yield [ "-=", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "*=": i += 2; yield [ "*=", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "/=": i += 2; yield [ "/=", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "%=": i += 2; yield [ "%=", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "**": i += 2; yield [ "**", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "==": i += 2; yield [ "==", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "!=": i += 2; yield [ "!=", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "<=": i += 2; yield [ "<=", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == ">=": i += 2; yield [ ">=", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "?:": i += 2; yield [ "?:", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "?.": i += 2; yield [ "?.", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "++": i += 2; yield [ "++", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "+%": i += 2; yield [ "+%", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "-%": i += 2; yield [ "-%", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "*%": i += 2; yield [ "*%", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "&&": i += 2; yield [ "&&", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "||": i += 2; yield [ "||", column, i - rowStart ]; break;
      case str.substring(i, i + 2) == "=>": i += 2; yield [ "=>", column, i - rowStart ]; break;
      case str.substring(i, i + 3) == "///": {
        while (str.substring(++i, i + 3) != "///") {
          if (str[i] == "\n") {
            column++;
            rowStart = i;
          }
        }
        
        i += 3; break;
      }
      case str.substring(i, i + 2) == "//": while (str[++i] != "\n"); i++; rowStart = i; column++; break;
      case !!str[i].match(/[\(\)\[\]\{\}<>+*\/%=!.?:;\|&_]/): yield [ str[i], column, i - rowStart ]; i++; break;
      case !!str[i].match(/\s/): if (str[i] == "\n") { rowStart = i + 1; column++ } i++; break;
      case !!str[i].match(/[a-zA-Z]/): {
        const upper = str[i] === str[i].toUpperCase();
        const start = i;
        
        let map = keyMap;
        
        while (str[i].match(/[a-zA-Z0-9]/)) {
          map = map ? map.get(str[i]) : null;
          
          i++;
        }
        
        if (map && (map.get("end") == "return" || map.get("end") == "break"
            || map.get("end") == "continue" || map.get("end") == "for")) {
          let name = null;
          
          if (str[i] == "-") {
            const start = ++i;
            
            while (str[i].match(/[a-zA-Z0-9]/)) i++;
            
            name = str.substring(start, i);
          }
          
          yield [ { type: map.get("end"), name }, column, i - rowStart ];
          
        } else {
          yield (
                [ map && map.get("end") || { type: (upper ? "u" : "l") + "Identifier", name: str.substring(start, i), upper }
                , column
                , i - rowStart
                ]
              );
        }
        
        break;
      }
      case str[i] == "\"": {
        const start = ++i;
        
        let isEscaped = false;
        
        while (isEscaped || str[i] != "\"") {
          isEscaped = !isEscaped && str[i] == "\\";
          
          i++;
        }
        
        yield [ { type: "string", value: str.substring(start, i) }, column, i - rowStart ];
        
        i++;
        
        break;
      }
      case !!str[i].match(/[0-9\-]/): {
        if (str[i] == "-" && !str[i+1].match(/[0-9]/)) {
          yield [ "-", column, i - rowStart ];
          
          i++;
          
          break;
        }
        
        const start = i;
        
        while (str[++i].match(/[0-9]/));
        
        if (str[i] == ".") {
          while (str[++i].match(/[0-9]/));
        }
        
        yield [ { type: "number", value: +str.substring(start, i) }, column, i - rowStart ];
        
        break;
      }
      default: yield [ { type: "unknown", char: str[i] }, column, i - rowStart ]; i++; break;
    }
  }
}
