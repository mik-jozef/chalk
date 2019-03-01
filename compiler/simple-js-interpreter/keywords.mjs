export const keywords = new Map(
      [ "All", "any", "auto", "assume", "await", "break", "case", "catch", "class"
      , "comptime", "const", "continue", "default", "enum", "Exists", "export"
      , "final", "for", "friend", "function", "get", "immut", "import", "is", "mut"
      , "own", "pub", "return", "set", "shared", "static", "switch", "throw", "trait"
      , "try", "type", "yield"
      ].map(keyword => [ keyword, { type: "keyword", keyword } ])
    );

export const keyMap = (() => {
  const keyMap = new Map();
  
  keywords.forEach(keyword => {
    let map = keyMap;
    
    keyword.keyword.forEach(letter => {
      map.has(letter) || map.set(letter, new Map());
      
      map = map.get(letter);
    });
    
    map.set("end", keyword);
  })
  
  return keyMap;
})();