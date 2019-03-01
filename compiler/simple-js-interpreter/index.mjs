/*/
A simple interpreter for the Chalk programming language. See `./readme.md` for
more info.

Value: { members: Map<String, { mod: Set<String>, val: Value } }, addr: Int>
/*/

import fs from "fs";

import { keyMap } from "./keywords.mjs";
import { stlibFake } from "./stlibFake.mjs";

const getAddr = (function*() { let i = 0; while (true) yield i++; })();

const primitive = (name, type) => (
      { members: new Map(
          [ [ "name": name ]
          , [ "type": type ]
          ]
        )
      , addr: getAddr();
      }
    );

const any = primitive("any", null );
any.members.get("type") = any;

const globals =
    { class: primitive("class", any)
    , trait: primitive("trait", any)
    , type: primitive("type", any)
    , any
    };

const implicitDefinitions =
    [ [ "class", class ]
    , [ "trait", trait ]
    , [ "type", type ]
    , [ "any", any ]
    ];

function resolvePath(basePath, path) {
  basePath = path.dirname(basePath) + "/";
  
  switch (path[0]) {
    case "/": return "." + path;
    case ".": return basePath + path;
    default: return "./lib/" + path;
  }
}

function* tokens(str) {
  for (let i = 0; i < str.length; i++) {
    switch (true) {
      case str[i] == "{": i++; yield token = "{"; break;
      case str[i] == "}": i++; yield token = "}"; break;
      case str[i] == "(": i++; yield token = ")"; break;
      case str[i] == ")": i++; yield token = ")"; break;
      case str[i] == "<": i++; yield token = "<"; break;
      case str[i] == ">": i++; yield token = ">"; break;
      case str[i].match(/\s/): i++ break;
      case str[i].match(/[a-zA-Z]/): {
        const upper = str[i] === str[i].toUpperCase();

        let map = keyMap;
        let start = i;

        while (str[++i].match(/[a-zA-Z0-9]/)) map = map ? map.get(str[i]) : null;

        yield map.get("end") || { type: "identifier", name: str.substring(start, i), upper };

        break;
      }
    }
  }
}

async function getModule(path) {
  if (path.match(/^stlib-fake\//)) return stlibFake;
  
  const str = fs.promises.readFile(resolvePath(basePath, path), "utf8");
  
  let token = null;
  
  
}

(async () => {
  const modules = new Map();
  
  const entryPoint = await (async function getAllModules(basePath, path) {
    path = resolvePath(basePath, path);
    
    const m = await getModule(path);
    
    modules.add(path, m);

    await Promise.all(m.imports.map(i => {
      const promise = getAllModules(path, i.path);
      
      // TODO fix imported variables
      m
      
      return promise;
    }));
    
    return m;
  })(".", entryPoint);
  
  entryPoint.get("Main").get("new")
      .call(modules, entryPoint.get("Main").createInstance());
})();

class Class {
  constructor() {
    this.members
  }
  
  get(member) {
    
  }
}

class Import {
  constructor(path, ) {
    this.path = path;
  }
}

new Program(process.argv[1]);