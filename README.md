# Chalk programming language

A collection of ideas that I hope will turn into a working programming language.


## Highlights TODO
- modules
- nullable types (Optional)
- reflection
- generics
- sensible alternative to operator overloading
- traits
- compile time execution of code
- async await
- generators
- raii

## Language and standard library

### What chalk doesn't and will not have
- header files
- macros
- garbage collection
- significant whitespace
- (probably) class inheritance, definitely not multiple inheritance
- wrong methods being called because of polymorphism
- statements; everything is an expression
- synchronous IO
- user defined glabal variables
- namespaces
- duck typing, including in templates
- exceptions

### Types

Every type is either a class, trait, `void` or `noreturn`.

#### Basic types
`Object` - trait that every type implicitly implements.

Integers: `Int8`, `Int16`, `Int32`, `Int64`.
Floating-point numbers: `Float32`, `Float64`.

`Bool` - `true`, `false`.

`String` - a utf8 string.

Variable declaration: `Type varname(args);`

#### Type modifiers
`~T` - makes a type modifiable, types are constant by default.

Type modifiers affect all variables in a single declaration, not just one.

#### Syntactic sugar
`*T = Ptr<T>` - Pointer to T.
`?T = Optional<T>` - Optional T, can be null.
`[]T = Array<T>` - Resizable array of T, starts with zero length.
`[3]T = Array<T, 3>` - Array of T with length 3.

Pointers also need to be optional to be able to hold null.
Floats cannot be NaN, but optional floats can be null. `null == null` is false.

Some examples:

 - `?[]~?Int8` is optional dynamic array to mutable optional integers.
 - `*~T` - pointer to mutable T.
 - `~*T` - mutable pointer to T.
 - `?*T` - optional pointer to T.
 - `*?T` - pointer to optional T.

#### Implicit type conversions
`Int8 -> Int16 -> Int32 -> Int64`
`*T -> T` - deferefence.
`T -> *T` - reference.
`~T -> T` - loss of modifiability.
`T -> ?T` - type to optional type.
`T : Trait -> Trait` - conversion to a trait type

Additionally, there is unsafe `?T -> T`, see `unsafe` keyword.

### Modules
JavaScript syntax

```
import {} from "std/default.chalk"; // disables values imported by default
```

### Control flow
```
// If, if not, if-else
condition && foo();
condition || bar();
condition ? foo() : bar();

// Code block is an expression that returns its last expression
FooBarType fb = condition ? {
  foo();
} : {
  bar();
}

// For (braces are mandatory)
for {} // Infinite loop
for cond {} // While x
for ; cond; post {}
for init; cond; post {}
for T x : iterable {}

// Switch (must be exhaustive)
switch x {
  case 0: foo();
  case 1: { bar(); continue; }
  case _: {}
}
```

### Operators
TODO precedence

Modulo uses euclidean division, ie `0 <= a % b < b`.

Some operators are syntactic sugar for method calls, so it's possible to emulate
operator overloading by implementing certain traits.

| Operator    | Sugar for          | Trait
| --------    | ---------          | -----
| `a += b`    | `a.add(b)`         | Number
| `a -= b`    | `a.sub(b)`         | Number
| `a *= b`    | `a.mul(b)`         | Number
| `a /= b`    | `a.div(b)`         | Number
| `a %= b`    | `a.mod(b)`         | Number
| `a **= b`   | `a.pow(b)`         | Number
| `a &= b`    | `a.and(b)`         | (must be `Int`)
| `a |= b`    | `a.or(b)`          | (must be `Int`)
| `a ^= b`    | `a.xor(b)`         | (must be `Int`)
| `a + b`     | `Number.add(a, b)` | Number
| `a - b`     | `Number.sub(a, b)` | Number
| `a * b`     | `Number.mul(a, b)` | Number
| `a / b`     | `Number.div(a, b)` | Number
| `a % b`     | `Number.mod(a, b)` | Number
| `a ** b`    | `Number.pow(a, b)` | Number
| `a & b`     | `Int.and(a, b)`    | (must be `Int`)
| `a | b`     | `Int.or(a, b)`     | (must be `Int`)
| `a ^ b`     | `Int.xor(a, b)`    | (must be `Int`)
| `!a`        | `Int.not(a)` or `Bool.not(a)` | (must be `Int` or `Bool`)
| `a == b`    | `Object.equals(a, b)`       | Object
| `a != b`    | `!Object.equals(a, b)`      | Object
| `a < b`     | `Comparable.cmp(a, b) < 0`  | Comparable
| `a > b`     | `Comparable.cmp(a, b) > 0`  | Comparable
| `a <= b`    | `Comparable.cmp(a, b) <= 0` | Comparable
| `a >= b`    | `Comparable.cmp(a, b) >= 0` | Comparable
| `a <=> b`   | `Comparable.cmp(a, b)`      | Comparable
| `a[b]`      | `a.get(b)`         | (`a` must be `Map`)
| `a = b`     | `a.assign(b)`      | Object
| `?a`        | `a.hasValue()`     | (`a` must be `Optional`)
| `??a`       | `a.getValue()`     | (`a` must be `Optional`)

Operators that are not syntactic sugar:

| Operator    | Meaning       | Return type
| -------     | -------       | -----------
| `a.b`       | Member access | Type of `b`
| `a && b`    | Logical and   | `Bool` if `a` and `b` are `Bool`, else `void`.
| `a || b`    | Logical or    | `Bool`
| `a ? b : c` | Conditional   | See below

The return type of conditional operator is any type that is type of both `b`
and `c`, or `void`. The first operand of conditional, logical and and logical or
must be `Bool`.

TODO type conversion, arithmetic and logical shift

### Functions
Function definition: `ReturnType name(ParamList param1, /*...*/) {/*...*/}`

If an argument's type is a trait, function is dispatched dynamically.
Tail call optimization is guaranteed.

Function can have default parameters initialized with arbitrary code that runs
every time function is called (unless it is `comptime`).

Function definitions are hoisted.

Functions can be nested.

TODO Raii, rest parameters, generators (with forEach, reduce, etc)

```
class X {
  Y y;
  
  pub Y getI() { return y; }
  
  pub ~Y getI() ~ = constcall; // ???
}
```

Class `Function` can bind to all callable objects, including lambdas with captured
variables, callable objects (if I'll add them to chalk) and methods (auto-bound)

### Classes and enums

Classes are collections of values and methods. Enum is a class that has finitely
many constant instances. Enum implicily implements trait `Enum`.

Class definitions are hoisted.

Classes can be nested, both static and inner. Inner classes have the same type
even if they belong to a different instance.

Guaranteed memory layout of classes.

Example class:
```
class X : Trait1, Trait2 friend Y {
  Int a;     // private
  
  get Int b; // read only
  set Int c; // write only
  pub Int d; // public
  
  X() : a(10), b(0), c(unsafe undefined) { // order must be same as declaration, not initializing members is `unsafe`
    unsafe c.Int(5);
  }
  
  pub Int getA() { return a }
  pub void setA(Int a) ~ { this.a = a }
  
  pub static X s() {}
}
```

Example enum:
```
enum Bool { true, false } // definition of Bool in standard library

enum E {
  multiline,
}

enum Direction {
  up(1, 0),
  down(-1, 0),
  left(0, -1),
  right(0, 1);
  
  get Int8 dirX;
  get Int8 dirY;
  
  Direction(Int8 x, Int8 y) : x(x), y(y) {}
}

Direction.up.dirX // 1
```

### Traits
TODO

traits cannot themselves have data, but can specify static data for their classes

### Generics

Templates can be specialized, but only in the module it was defined in.
Template parameters can be class types or values.

#### Basic types

```
Array<T, Int length>
Array<T, ~Int length = 0>
Int<Int length>
Int<~Int length>
```

#### Examples

```
void fn<X : Trait1 Trait2, Bool b>(X genericParam) {}
```

### Reflection
TODO object.class

### Comptime
Arbitrary compile time execution of code, comptime file reads

### Safe code
Safe code is code without undefined behavior, it either does what it should or
terminates the program. Safe code does not produce memory leaks and race conditions.

Keyword `unsafe` marks unsafe code. Using it may result in unpredictable behavior.

Unsafe parts of language can be used if they are provably safe to the compiler.

#### Unsafe code
- explicit constructor and destructor calls (`var.Type()`)
- assignment of `undefined` - does not initialize a variable
- pass reference to an object with longer lifetime that the reference
- pointer arithmetic

## Tools, language compatibility


In no particular order, features of my programming language:
mathematical proofs about invariants in the program
const correctness, ideally with a way to write perfect-const-forwarding functions
use value types instead of rvalue refs
generics - how to accept only const types or only mut types or both?
guaranteed copy elision in as many cases as possible
type-safe unions
decide: if a generic class is also generic parameter, must its type be fully specified?
array: no remove(), because its unclear whether all the elements after it should
  be moved or just the last one. Solutions
  - shift(Int index = 0, Int length); // also unshift
  - arr[index] = arr.pop();
no new keyword - calling constructor on a pointer type will allocate on heap
names cannot contain underscore; use `camelCase`, not `braindead_c_style__`
utf8 by default (or only)
todo how to prevent self deleting objects or make it predictable or make it reliably crash?
functions must be mut (~) to be able to mutate global / module-wide variables?
default code style
it is not possible to delete a reference, only value can be deleted (maybe make it unsafe?)
references: it would be nice if there were references to portions of String and Buffer,
  but I do not want a situation like in Rust that reference is its own type different from `*String`
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
TODO concurrency
closures - shared between functions from the same scope
think about deffered loading of code so the whole application doesn't have to be in memory
  when it starts
a way to do low-level gory stuff so that an os can be written in it
no packages/crates
anonymous classes (eg. for returning values)
a type can implement Nullable, save space if optional
trait can require methods and variables (Nullable<T> requires get static T null)
custom object file format suited for modern programming concepts
function overloading
? coroutines can share the same thread or execute in parallel (data implicitly
  thread-local, message passing, some safe way of sharing `shared` variables)
symbols
a way to optimize for loops with custom iterators?
two types of generics: templates and trait-based
  - template example: void print<T>(T t)
  - trait based:      void print(Printable p) // Printable is a trait
  - value generics:   void print<Bool b>(String s) {}
                      print<false>();
  - value generics have compile-time expressions


lambda functions
think about hot deployment, lazy loading
`shared` or `volatile` keyword for variables that can be accessed by
  multiple threads at the same time?
function can specify assumptions about its inputs, if those assumptions are not
  met, any resulting potential undefined behaviour must be proven safe at the
  calling site
function can prove invariants about itself, eg. that an optional type is not
  null if certain conditions are met
const function cannot return non-const reference to its member
overflow and division by zero on non-nullable types throws exception, there's a wrap-around Int type
golang's defer? destructors do the same, so why?
struct, union and array destructuring, if type unambiguously refers to one member
  should destructuring of a single variable require braces?
  - pro: less typing, looks like normal variable assignment/initialization
  - con: may be source of bugs when not intended
  - middle ground? only works on anonymous structs/unions?
async constructors?
allocators, way to manage allocators of libraries that were written without them in mind
c++ style constructor initialization list
Int<Int i> for any i
Int<~32> - variable size bigint starting as Int32
trait type values should work like rusts Box
custom smart pointers?
types can specify a value that is null? If thay do that, optional types will
  consume as much memory as non-optional, but this creates the risk that a type
  will suddenly become null on its own (even if it's not optional).
  - this would require a proof that null and non-null will always stay null, resp. non-null
  - class X : Nullable {}
promise errors if it is destructed with error
ability to control every dynamically created object so that a long-running program
  can defragment its ram by moving/deleting and recreating everything on heap
  - this icludes language provided objects on heap, eg. closures
types are first class citizens?
interators
function values are never mutable, but pointers can be
streams (with forEach, reduce, etc)
multiline comments?
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
a function with a default argument is a supertype of a function without the argument
array literals use square brackets
trait can have own static variables not usable from class
something like my init.js
placement function call?
move an object and change pointers (even constant) with one operation?
is returning a reference ok if and only if it refers to nonlocal object? this should be easy to check statically
everything is thread-local by default
Function trait, Closure class able to hold closures? Reflection powerful enough
  to enable code only implementation lambdas and nested functions cannot be
  returned if they capture ref to local variable, by default they do what?
Every trait is implicitly generic, can access their own class type
Allocators and a type for stack frames? Function.StackFrame or StackFrame<*Function fn>
A single Function type for all types of functions, no special function pointer
Allocator<X> trait, DefaultAllocator<X> class
`auto` keyword






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
comptime evaluation only
produces a warning if code has no side effects
modular, usable from CLI and through API
run tests after compiling/before publishing
scripts?






-- Experimental code examples --
class X<T : Printable> : Trait1<T>, Trait2 // must be explicit, no duck typing
      friend Y, Trait {         // TODO if a trait is friend, should the entire class have access or just the methods of the interface
  Int a;     // private
  get Int b; // readonly
  set Int c; // writeonly
  pub Int d; // public
  pub Void add(String x) mut {} // callable publicly, not assignable, can modify instance of X
}

{ OptType b: mut f, d: g } = x;

for [ elem, index ] : array {}


createNode = true;

createNode && {
  return Node();
}

createNode ? return Node() : panic("Cannot create node.");

Int8 i = 3;
auto b : i; // b is iterator of Bool (or maybe Int1)

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
  
  ln && print<false>("\n"); // ln is comptime, so this is optimized out if false
}

print<includeNewline()>() // this does not compile if includeNewline is not comptime

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


















