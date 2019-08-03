/*/
  Evaluator.
/*/

import { getConfig } from "./main.mjs";

class ModuleImport {
  constructor(libName, modulePath) {
    this.libName = libName;
    this.modulePath = modulePath;
  }
}

export class Module {
  constructor(library, path, ast) {
    this.library = library;
    // Not containing `/lib/`.
    this.path = path;
    
    this.imports = [];
    
    // TODO
  }
  
  // Initializes all definitions in this and all imported modules.
  initDefs() {
    // TODO
    
    return this;
  }
  
  // Creates an instance of `Main`.
  run() {
    // TODO
  }
  
  // TODO
}

class Library {
  constructor(libraries, libName) {
    this.libraries = libraries;
    this.name = libName;
    
    this.rootDir = libName === "" ? "./" : "./lib/" + libName + "/";
    this.config = null;
    
    this.modules = new Map();
    this.entryModule = null;
    
    this.paths = new Set();
  }
  
  async load(loadMain) {
    this.config = await getConfig(this.rootDir);
    
    loadMain && this.paths.add(this.config.mainPath);
    
    await Promise.all([...this.paths].map(path => this.loadModules(path)));
  }
  
  async loadModules(path) {
    const module = await this.libraries.main.loadModule(this, path);
    
    this.addModule(module);
    
    await Promise.all(module.imports.map((modImport) => {
      const { library, promise } = this.libraries.retLibrary(modImport.libName);
      
      return library.addModuleByPath(modImport.modulePath, promise);
    }));
  }
  
  addModuleByPath(modulePath, promise) {
    if (this.hasPath(modulePath)) return promise;
    
    this.paths.add(modulePath);
    
    return this.config ? this.loadModules(modulePath) : promise;
  }
  
  hasPath(path) {
    return this.modules.has(path) || this.paths.has(path);
  }
  
  addModule(module) {
    this.modules.set(module.path, module);
    this.paths.delete(module.path);
  }
}

export class Libraries {
  constructor(main) {
    this.libs = new Map();
    this.main = main;
  }
  
  retLibrary(libName, loadMain = false) {
    if (this.libs.has(libName)) return { library: this.libs.get(libName), promise: null };
    
    const library = new Library(this, libName, loadMain);
    
    this.libs.set(libName, library);
    
    return { library, promise: library.load(loadMain) };
  }
}

export class Evaluator {
  // TODO
}
