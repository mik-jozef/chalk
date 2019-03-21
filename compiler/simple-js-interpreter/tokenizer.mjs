/*/
Chalk tokenizer. Does not (yet?) support binary, octal, hexadecimal numbers and
numbers written using scientific notation.
/*/

import { keyMap } from "./keywords.mjs";

export function* tokenizer(str, isChalkDoc) {
  let isCode = !isChalkDoc;
  
  for (let i = 0; i < str.length;) {
    switch (true) {
      case !isCode: {
        while (str.substring(i, i + 3) !== "{{{") i++;
        
        i += 3;
        
        isCode = true;
        
        break;
      }
      case isChalkDoc && str.substring(i, i + 3) == "}}}": { isCode = false; i += 3; break; }
      case str.substring(i, i + 3) == "**=": i += 3; yield "**="; break;
      case str.substring(i, i + 3) == "<=>": i += 3; yield "<=>"; break;
      case str.substring(i, i + 3) == "...": i += 3; yield "..."; break;
      case str.substring(i, i + 2) == "+=": i += 2; yield "+="; break;
      case str.substring(i, i + 2) == "-=": i += 2; yield "-="; break;
      case str.substring(i, i + 2) == "*=": i += 2; yield "*="; break;
      case str.substring(i, i + 2) == "/=": i += 2; yield "/="; break;
      case str.substring(i, i + 2) == "%=": i += 2; yield "%="; break;
      case str.substring(i, i + 2) == "**": i += 2; yield "**"; break;
      case str.substring(i, i + 2) == "==": i += 2; yield "=="; break;
      case str.substring(i, i + 2) == "!=": i += 2; yield "!="; break;
      case str.substring(i, i + 2) == "<=": i += 2; yield "<="; break;
      case str.substring(i, i + 2) == ">=": i += 2; yield ">="; break;
      case str.substring(i, i + 2) == "?:": i += 2; yield "?:"; break;
      case str.substring(i, i + 2) == "?.": i += 2; yield "?."; break;
      case str.substring(i, i + 2) == "++": i += 2; yield "++"; break;
      case str.substring(i, i + 2) == "+%": i += 2; yield "+%"; break;
      case str.substring(i, i + 2) == "-%": i += 2; yield "-%"; break;
      case str.substring(i, i + 2) == "*%": i += 2; yield "*%"; break;
      case str.substring(i, i + 2) == "&&": i += 2; yield "&&"; break;
      case str.substring(i, i + 2) == "||": i += 2; yield "||"; break;
      case str.substring(i, i + 2) == "=>": i += 2; yield "=>"; break;
      case str.substring(i, i + 3) == "///": while (str.substring(++i, i + 3) != "///"); i += 3; break;
      case str.substring(i, i + 2) == "//": while (str[++i] != "\n"); i++; break;
      case !!str[i].match(/[\(\)\[\]\{\}<>+\-*\/%=!.?:;\|&_]/): yield str[i]; i++; break;
      case !!str[i].match(/\s/): i++; break;
      case !!str[i].match(/[a-zA-Z]/): {
        const upper = str[i] === str[i].toUpperCase();
        const start = i;
        
        let map = keyMap;
        
        while (str[i].match(/[a-zA-Z0-9]/)) {
          map = map ? map.get(str[i]) : null;
          
          i++;
        }
        
        yield map && map.get("end") || { type: "identifier", name: str.substring(start, i), upper };
        
        break;
      }
      case str[i] == "\"": {
        const start = ++i;
        
        let isEscaped = false;
        
        while (isEscaped || str[i] != "\"") {
          isEscaped = !isEscaped && str[i] == "\\";
          
          i++;
        }
        
        yield { type: "string", value: str.substring(start, i) };
        
        i++;
        
        break;
      }
      case !!str[i].match(/[0-9]/): {
        const start = i;
        
        while (str[++i].match(/[0-9.]/));
        
        yield { type: "number", value: +str.substring(start, i) }
        
        break;
      }
      default: yield { type: "unknown", char: str[i] }; i++; break;
    }
  }
}
