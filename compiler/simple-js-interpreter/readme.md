# Simple JavaScript Interpreter
This interpreter exists to run the compiler (written in Chalk) for the first time,
so that it can self-compile to create a runnable a binary.

The only requirements on correctness is that it should be able to read some subset
of a correctly written Chalk program and produce equivalent side-effects. How it
reacts to text sources that aren't a valid Chalk program is completely undefined.
Don't expect any type checks, const-correctness, or even error messages.

The entry point is the file `index.mjs`. To run the interpreter, you need
[node.js](https://nodejs.org/):

```bash
node index.mjs
```

Bugs that do not affect interpretation of the compiler will not be fixed, and
development of the interpreter will stop as soon as the compiler written in Chalk
is self-hosting.
