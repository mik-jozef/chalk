/*/
Keywords of Chalk.
/*/

export const keywords =
  [ "All", "any", "auto", "assume", "await", "break", "case", "catch", "class"
  , "comptime", "const", "continue", "cst", "default", "enum", "Ex", "Exists"
  , "export", "final", "for", "friend", "fn", "let", "libexport", "ignore", "immut"
  , "import", "is", "mut", "nowait", "own", "pub", "return", "Self", "shared"
  , "static", "switch", "throw", "trait" , "try", "type", "yield"
  ];

export const keyMap = (() => {
  const keyMap = new Map();
  
  keywords.forEach(keyword => {
    let map = keyMap;
    
    keyword.split("").forEach(letter => {
      map.has(letter) || map.set(letter, new Map());
      
      map = map.get(letter);
    });
    
    map.set("end", keyword);
  })
  
  return keyMap;
})();