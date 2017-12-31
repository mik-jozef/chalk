# Chalk programming language



TODO: ideally, look every feature of these languages (and their standard libraries):
JS      https://developer.mozilla.org/bm/docs/Web/JavaScript
Zig     https://github.com/zig-lang/zig
Python  https://www.python.org/
C++     https://cppreference.com
D       https://dlang.org/
Rust    https://www.rust-lang.org
Go      https://golang.org/



In no particular order, features of my programming language:
template can be only specialized in the module it was defined?
everything is an expression
every type is a class or trait (no primitives)
  implementation can treat ints like primitives, but in code, they should have
  methods, `12 instanceof Int` should be true, etc (if there will be an instanceof operator)
instanceof?
nullable and non-nullable types
const by default, mut keyword
no distinction between pointer and reference, there are non-nullable types and const
  already
guaranteed tail recursion
raii
guaranteed memory layout of classes
noreturn type?
java-like enum
unsafe keyword (like rusts)
operators are syntactic sugar for method calls, eg. `a + b` is `Number.add(a, b)`
  trait Number {
    static N add<N : Number>(*N a, *N b) {
      N.add(a, b);
    }
    
    static ?N add<N : Number>(*?N a, *?N b) { // Note possible implicit conversion from T to ?T
      return ?a && ?b ? Number.add(a, b) : null;
    }
  }
mathematical proofs about invariants in the program
const correctness, ideally with a way to write a perfect-const-forwarding functions
use value types instead of rvalue refs
generics - how to accept only const types or only mut types or both?
guaranteed copy elision in as many cases as possible
program is safe if every `unsafe` code is provably safe; safe code means it either
  does what it should or crashes
type-safe unions
array: no remove(), because its unclear whether all the elements after it should
  be moved or just the last one. Solutions
  - shift(Int index = 0, Int length); // also unshift
  - arr[index] = arr.pop();
no new keyword - calling constructor on a pointer type will allocate on heap
names cannot contain underscore; use camelCase, not braindead_c_style__
unsafe: placement new, calling constructors and destructors on existing objects
unsafe undefined for not initializing value - value can be uninitialized
utf8 by default (or only)
all io is async
no user-defined global symbols, max. module-wide; keep the language-provided symbols
  at absolute minimum (ints, Bool)
rest parameters, javascript-like
order of function definitions must not matter, order of member declarations shouldn't matter
todo how to prevent self deleting objects or make it predictable or make it reliably crash?
functions as first class citizens
warn if an object / variable is given reference to an object with a shorter lifespan
than that object / variable
classes with either inheritance or traits
default code style
modules, javascript-style, no headers
generators (with forEach, reduce, etc)
promises
it is unsafe to assign a reference to a variable with longer lifetime that the reference
it is not possible to delete a reference, only value can be deleted (maybe make it unsafe?)
safe code should never produce memory leaks
string implements Buffer
references: it would be nice if there were references to portions of String and Buffer,
  but I do not want a situation like in Rust that reference is its own type different from *String
no significant whitespace
compile time execution, maybe const() function that forces its argument to be
  executed at compile time
  - imagine a regex library that constructs optimized parsers with const `if`s
    reducing needed code
  - reading nonlocal variables at compile time is only possible if the variable
    1. is from a scope that is being executed
    2. is const and assigned a const expresion
  - declarations cannot be const, only invocations
enforce order of keywords - pub static async
async await; think more about corountines
package manager
symbol shadowing possible
no implicit returns
switch must be exhaustive
float - no NaN, either use float that throws if it's NaN or optional float
object literals can be mut, eg. `char* ch = "a"; ch = "b"` would be valid if char
  was a type
no chars, just strings
do not have different types of arrays - I'm looking at std::vector
default paramters with arbitrary code
official build system, only source code needed, no make
TODO concurrency
function pointers
== is syntactic sugar for:
  Object.equals<T>(*T a, *T b) {
    if (IntSize.from(a) == IntSize.from(b)) return true;
    
    return T.equals(a, b); // TODO make default implementation return false?
  }
  - this prevents situation in java where == is different from equals
closures - shared between functions from the same scope

think about deffered loading of code so the whole application doesn't have to be in memory
  when it starts
if heritance will be added, make value types invariant and either make methods
  automatically virtual when overriden or make it an error if they aren't
arrays as classes (with container methods / traits), (Array<int> vs []int, Array<int, 3> vs [3]int)
  both resizable (int[]) not (int[3])
a way to do low-level gory stuff so that an os can be written in it
no garbage collector, but ref-counting or possibly mark-and-sweep pointers
no duplication of keywords / multiple ways of doing +- the same thing
  eg. struct/class, using/typedef in c++
no namespaces
reflection, including generical
import json files at compile time
arbitrary compile time code execution (TODO what about global objects?)
no packages/crates
custom object file format suited for modern programming concepts
function overloading
symbols
two types of generics: templates and trait-based
  - template example: void print<T>(T t)
  - trait based:      void print(Printable p) // Printable is a trait
  - value generics:   void print<Bool b>(String s) {}
                      print<false();
  - value generics have compile-time expressions
  
friends (c++)
lambda functions
concurrency - safe code must be free of race conditions, variables should be
  safe from race conditions by default (maybe `shared` or `volatile` keyword for
  variables that can be accessed by multiple threads at the same time)
implicit type conversions should be minimmal, no explicit keyword, to support
    that functionality implicit keyword if at all
  - these conversions can be implicit (chaining is possible):
  int8 -> int16 -> int32 -> int64
  T -> ?T
  ~T -> T
  T -> *T
  *T -> T
  - problem: this would implicitly make pointers out of values when comparing
    values with ==, and Java-like equals isn't a nice solution (btw. equals in
    java should be private, Object should be friend of every class, Object.equals FTW)
int8, int16, int32, int64
automatic pointer dereferencing and value referencing
Float cannot be NaN, but ?Float and ?Int<...> can be null
function can specify assumptions about its inputs, if those assumptions are not
  met, any resulting potential undefined behaviour must be proven safe at the
  calling site
function can prove invariants about itself, eg. that an optional type is not
  null if certain conditions are met
const function cannot return non-const reference to its member
no symbols - there are enums for this
nested classes and functions work like they are the same class even if they have
  different closures
overflow and division by zero on non-nullable types throws exception, there's a wrap-around Int type
golang's defer? destructors do the same, so why?
struct and union destructuring, if type unambiguously refers to one member
  should destructuring of a single variable require braces?
  - pro: less typing, looks like normal variable assignment/initialization
  - con: may be source of bugs when not intended
  - middle ground? only works on anonymous structs/unions?
await new?
division accepts maybe numbers and returns maybe number, can return a number if
  denominator is provably not null
allocators, way to manage allocators of libraries that were written without them in mind
c++ style constructor initialization list
RawPtr, UniquePtr, SharedPtr (ref-count, maybe mark and sweep), but preferably as language syntax
the not `unsafe` subset of language must not have undefined behavior, must crash
on buffer overflow / null or invalid pointer dereference / array out of bounds
no class methods outside that class
nested (static) and inner classes, instanceof works according to
nested functions
support for `class Car<Car c> {}`
Int<Int i> for any i
Int<~32> - variable size bigint starting as Int32
compact class - types are guaranteed to have no free space between its members
trait type values should work like rusts Box
pointer arithmetic is `unsafe`
custom smart pointers?
constexpr file reading
types can specify a value that is null? If thay do that, optional types will
  consume as much memory as non-optional, but this creates the risk that a type
  will suddenly become null on its own (even if it's not optional).
  - this would require a proof that null and non-null will always stay null, resp. non-null
  - class X : Nullable {}
json support
promise panics if it is destructed with error
null == null is false (because NaN is null, too)
? operator - returns true if null
?? operator - throws if x of ?T is null, else returns x of T
ability to control every dynamically created object so that a long-running program
  can defragment its ram by moving/deleting and recreating everything on heap
  - this icludes language provided objects on heap, eg. closures
ternary operator can return different types the return value is not used or is noreturn (eg throw, return)
no if, block of code is an expression
implicit conversion to a bigger number, explicit to a smaller number
switch breaks by default, `continue;` continues to the next case
interators
function values are never mutable, but pointers can be
streams (with forEach, reduce, etc)
multiline comments?
unsafe parts of language can be used if they are provably safe
hoisted classes and functions, no class/function declarations
explicit instantiation of functions that take interface as parameter,
  otherwise dynamic dispatch
go-style for, no while
functions must explicitly return, other blocks of code return the last expression
  justification - block of code is only "called" where it is declared, functions
  should be more explicit
nullable types can be used in the following ways:
  1. compiler can infer variable is not null, can be dereferenced without dynamic
     check
  2. some function/method/operator to dereference pointer with dynamic check
     that pointer is not null
  3. `unsafe` dereferencing without check
array elements of type X can be accessed in the following ways:
  1. like X if compiler can infer index is not out of bounds
  2. like nullable X (like c++ std::optional), with bounds checking, null if out of bounds
  3. `unsafe`
every type has class, including pointer, array; Ptr.isNull(val)
type modifiers (pointers, arrays, references, const, ...) work on every variable,
  not just one
operators are functions, this is valid (pseudo)code: `let x = &&;`
optional type
  optional value type is equivalent to c++: `union { struct { bool hasValue; Value v } }`,
  that is, it takes as much space as the non-optional type
  optional pointer type is
type examples TODO decide which version:
  Int - constant integer (64bit on 64bit platforms, 32bit on 32bit platforms?)
  ?Int - nullable integer
  ?Int* - nullable integer pointer
  mut Vector<mut String> - vector of strings
  
      *     String or     String*     or     Ptr<    String> -         pointer to         string
      * mut String or mut String*     or     Ptr<mut String> -         pointer to mutable string
  mut *     String or     String* mut or mut Ptr<    String> - mutable pointer to         string
  mut * mut String or mut String* mut or mut Ptr<mut String> - mutable pointer to mutable string
  
  String[]  or Array<String>    - const array of string
  String[3] or Array<String, 3> - const array of three strings
  String[] mut  or Array<mut String>    - const array of mut string
  String[3] mut or Array<mut String, 3> - const array of three strings
  Int*[] - array of pointers to int
  Int[]*
all undefined behavior must come from `unsafe`
no macros
a function with a default argument is a supertype of a function without the argument
no null(ptr)?_type - null can be assigned to nullable values, so this is unnecessary
not sure - inheritance
not sure - should generics only take types, or values, too? (eg. function<3>() {}). I'm
  leaning towards types only
no exceptions, and definitely not part of function specification
arrays use square brackets
function pointer can bind to all functions, including lambdas with captures variables
automatic dereferencing of pointers (like c++ references)
value types and c++ rvalue refs have the same functionality
type modifier ~, mutable
syntactic sugar:
  ?T  - Optional<T>
  *T  - Pointer<T>
  []T - Array<T>
  [3]T- Array<3, T>
something like my init.js


Standard library should have:
well thought out containers (arrays, sets, maps) each with methods from Stream (forEach,
  map, filter, reduce)

net
  http, https
  fetch

fs
  async only

init
  initTask(async fn) - executes fn before main()
Generator<fn> : Stream
Promise<T>



Commpiler+interpreter+package manager abilities:
translate between languages
option for no optimizations
template expansion only
constexpr evaluation only
produces a warning if code has no side effects
modular, usable from CLI and through API
run tests after compiling/before publishing
scripts?






-- Experimental code examples --
Int main() {
  Int a = 3;
  
  Int?[3]? b = 7; // or: Array<Int?, 3>? b = 7;
  
  
  mut (mut Int)?[3]? c = 7; // or: mut Array<mut Int?, 3>? c = 7;
  
  mut Int mut[3] f = [ 1, 2, 3 ];
}


Int(Int x, Int y) add {
  return x + y;
}
[3]?*Int
~[~3]~?~*~Int


Int add(Int x, Int y) {
  return x + y;
}

class X<T : Printable> : Trait1<T>, Trait2 // must be explicit, no duck typing
      friend Y, Trait {         // TODO if a trait is friend, should the entire class have access or just the methods of the interface
  Int a;     // private
  get Int b; // readonly
  set Int c; // writeonly
  pub Int d; // public
  pub Void add(String x) mut {} // callable publicly, not assignable, can modify instance of X
}

mut o = X(); // mut without type?
X x(); vs let?/auto?/const?/mut? x = X(); // X x = X() unnecessarily contains type X twice
X y = unsafe undefined; // Should this even be enabled, given that there are nullable types?
X?z = null;
X

auto? { b: mut f, d: g } = x;

for elem, index : array {}


createNode = true;

createNode && {
  return Node();
}

createNode ? return Node() : panic("Cannot create node.");

Int i = 3;
auto b : i; // b is iterator of Bool (or maybe Int1)

for b {
  System.out.println(b);
}

b.forEach(fn);

for b : i {}

forEach, map and filter could be merged to []B.map(void(B) -> ?A) -> []A


// should this be allowed?
Car c("Kia"); // creates car
c~(); // destroys car; alternatives: ~c(); c.~Car();
c("Opel"); // recreates car

// initializing variable later might be desirable for performance
Car c = unsafe undefined;

// later
carNeeded && unsafe c.Car("BMW");
// but this is what optional is for

enum Bool { true, false }

enum State {
  running,
  paused,
  stopped, // If enum is simple and multiline, the last comma is required
}

[]State values = State.values();
State.running.name;
State.running.index;

enum BetterState : Trait {
  started(true),
  running(true),
  paused,
  stopped;
}

// Explicit generics with values
void print<Bool ln>(String s) {
  // ...
  
  ln && print<false>("\n"); // ln is constexpr, so this is optimized out if false
}

print<includeNewline()>() // this does not compile if includeNewline is not constexpr

void print<Bool b>(String s) {...}

for x : object {} // generator call no args
for x : object(generator, call, with, args) {}

import { List } from "lang.haskell";
import { Array, Optional } from "lang.this"


import { File, open } from "fs";
import { Error } from "??"

// Union<File, Error> open(String s)

// Both of these work, see destructuring
{ ?File file, ?Error err} = open("./photo.png", Mode.RNO);
File f(open("./photo.png", Mode.RNO)); // or: File f = open("./photo.png", Mode.RNO);

// Be consistent about "start, length" vs "start, end" in the whole standard library
String.view - returns a modifiable view
String.substring


import * from "fs";

Folder dir(root, dirPath, Mode.RWO);
await dir.open();

File file(folder, path, Mode.RWO);
assert(file.path == path);
assert(gile.getFullPath() == String.concat(folder.getFullPath(), path));
await file.open();

class Car {
  Int speed;
  
  null() : speed(-1) {}
  
  isNull() { return speed < 0 } // enable/force no semicolons before closing brace?
}



















