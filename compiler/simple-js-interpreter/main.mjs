/*/
  Entry point of JavaScript interpreter of Chalk.
/*/

import Fs from "fs";
import PathUtils from "path";

import { Parser } from "./parser.mjs";
import { grammar } from "./grammar.mjs";
import { Evaluator, Libraries, Module } from "./evaluator.mjs";

const defaultConfig = {
  mainPath: "/main.chalk",
};

export async function getConfig(rootDir) {
  let configStr;
  
  try {
    configStr = await Fs.promises.readFile(rootDir + "config/chalk/config.json", "utf8");
  } catch (e) {
    return defaultConfig;
  }
  
  return JSON.parse(configStr);
}

function getStartSymbol(path) {
  const ext = path.split(".").pop();
  
  switch (ext) {
    case "chalk": return "Chalk";
    case "chalkDoc": return "ChalkDoc";
    case "txt": return "Plaintext";
    case "json": return "JSON";
    default: throw new Error("Imported unknown file extension: " + ext);
  }
}

class Main {
  constructor() {
    this.libraries = new Libraries(this);
    this.parser = new Parser(grammar);
    
    this.do();
  }
  
  async loadModule(library, path) {
    const file = await Fs.promises.readFile(library.rootDir + path, "utf8");
    const startSymbol = getStartSymbol(path);
    const ast = this.parser.parse(file, startSymbol, startSymbol);
    console.log(ast);
    return new Module(library, path, ast);
  }
  
  async do() {
    await this.loadProgram();
    
    await this.runProgram();
  }
  
  async loadProgram() {
    return this.libraries.retLibrary("", true).promise;
  }
  
  async runProgram() {
    // TODO this looks like something that expeses things that should stay in evaluator.js
    this.libraries.retLibrary("").entryModule.initDefs().run();
  }
}

new Main();
