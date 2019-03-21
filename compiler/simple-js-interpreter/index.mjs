/*/
A simple interpreter for the Chalk programming language. See `./readme.md` for
more info.

Value: { members: Map<String, { mod: Set<String>, val: Value } }, addr: Int>
/*/

import fs from "fs";
import pathUtils from "path";

import { Parser, chalkGrammar, getImportPaths } from "./parser.mjs";
import { StlibFake } from "./stlibFake.mjs";

/*/
const any = primitive("any", null );
any.members.set("type", any);

function primitive(name, type) {
  return (
      { members: new Map(
          [ [ "name", name ]
          , [ "type", type ]
          ]
        )
      , addr: getAddr()
      }
  );
}

const globals =
    { class: primitive("class", any)
    , trait: primitive("trait", any)
    , type: primitive("type", any)
    , any
    };

const implicitDefinitions =
    [ [ "class", globals.class ]
    , [ "trait", globals.trait ]
    , [ "type", globals.type ]
    , [ "any", globals.any ]
    ];
/*/

function resolvePath(basePath, path) {
  basePath = pathUtils.dirname(basePath) + "/";
  
  switch (path[0]) {
    case "/": return "." + path;
    case ".": return basePath + path;
    default: return "./lib/" + path;
  }
}

async function getModule(parser, path) {
  if (path.match(/^stlib-fake\//)) return stlibFake;
  
  const str = await fs.promises.readFile(path, "utf8");
  
  return parser.parse(str, path.match(/.chalkdoc$/));
}

class Program {
  constructor(entryPoint) {
    if (!entryPoint) throw new Error("No path to a .chalk file.");
    
    this.modules = new Map();
    this.parser = new Parser(chalkGrammar, "Module");
    
    this.getAddr = (() => {
      const gen = (function*() { let i = 0; while (true) yield i++; })();
      
      return gen.next.bind(gen);
    })();
    
    this.exec("./" + entryPoint);
  }
  
  async exec(entryPoint) {
    const mainModule = await this.loadModule(".", entryPoint);
    
    mainModule.eval();
  }
  
  async loadModule(basePath, path) {
    path = resolvePath(basePath, path);
    
    const module = await getModule(this.parser, path);
    
    this.modules.add(path, module);
    
    await Promise.all(getImportPaths(module).map(i => this.loadModule(path, i)));
    
    return module;
  }
}

new Program(process.argv[2]);