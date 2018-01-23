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
- async functions
- generators
- raii


## Language and standard library

### What chalk doesn't and will not have
- header files
- macros
- garbage collection
- significant whitespace
- class inheritance
- wrong methods called because of polymorphism
- statements; everything is an expression
- synchronous IO (but there is compile-time IO)
- user defined glabal variables
- namespaces
- duck typing, including in templates
- (probably) exceptions

### Types
Every type is either a class or a trait. Special types `void` and `noreturn` are
returned by expressions that don't return anything or don't return at all.

#### Basic types
You can find more at TODO link to standard library.

| Type      | Description
| ----      | ----
| `Object`  | Trait that every class implicitly implements.
| `Int`     | Signed integer, size depends on platform.
| `Int8`    | Signed 8-bit integer.
| `Int16`   | Signed 16-bit integer.
| `Int32`   | Signed 32-bit integer.
| `Int64`   | Signed 64-bit integer.
| `Float32` | 32-bit floating-point number.
| `Float64` | 64-bit floating-point number.
| `Bool`    | Boolean, `true` or `false`.
| `String`  | Utf8 string.

#### Variables and literals
Variables are defined like this: `Type varname = value;`.

##### Numbers
| Example      | Description
| -------      | -----------
| `42`         | Base-10 integer
| `0b101010`   | Base-2 integer
| `0o52`       | Base-8 integer
| `0x2A`       | Base-16 integer
| `42.5`       | Base-10 floating-point number
| `0b101010.1` | Base-2 floating-point number
| `0o52.4`     | Base-8 floating-point number
| `0x2A.8`     | Base-16 floating-point number

Underscores can be placed between digits.


| Example      | Description
| -------      | -----------
| `"hello"`    | String
| `[ 0, 10 ]`  | Array of integers



There are two special values, `null`, which is assignable to (any) optional type,
and `undefined`, which is used to leave variables uninitialized (unsafe, see
`unsafe` keyword) or use default function argument (safe).

Unlike in many programming languages, `null == null` is false.

#### Type modifiers
`~T` - makes a type modifiable, types are constant by default.

Type modifiers affect all variables in a single declaration, not just one.

#### Syntactic sugar

| Sugar  | Type          | Description
| -----  | ----          | -----------
| `*T`   | `Ptr<T>`      | Pointer to T.
| `?T`   | `Optional<T>` | Optional T, can be null.
| `[]T`  | `Array<T>`    | Resizable array of T.
| `[3]T` | `Array<T, 3>` | Array of T with length 3.
| `[?]T` | --            | Array of T with inferred length.

Pointers also need to be optional to be able to hold null.

Floats cannot be NaN, but optional floats can be null.

Some examples:

 - `?[]~?Int8` is optional dynamic array to mutable optional integers.
 - `*~T` - pointer to mutable T.
 - `~*T` - mutable pointer to T.
 - `?*T` - optional pointer to T.
 - `*?T` - pointer to optional T.

#### Implicit type conversions
Conversions can be chained.

| Conversion | Description
| ---------- | -----------
| `Int8 -> Int16 -> Int32 -> Int64` | Integer widening
| `*T -> T`  | deferefence
| `T -> *T`  | reference
| `~T -> T`  | loss of modifiability
| `T -> ?T`  | type to optional type

Additionally, there is unsafe `?T -> T`, see `unsafe` keyword.

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
  Int a = 0; // private
  
  get Int b; // read only
  set Int c; // write only
  pub Int d; // public
  
  X() : b(0), c(0), d(0) {} // order must be same as declaration
  
  // methods are either private or pub
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
Traits rep
TODO

own keyword

traits cannot themselves have data, but can specify static data for their classes

#### Polymorphism, traits as variable types


```
trait X : Trait1, Trait2 x;
```

### Generics
Generic types can be specialized, but only in the module it was defined in.
Generic parameters can be trait types or values.

### Modules
A single program is typically written in multiple files. Each file that contains
code is a module.

A module can export code using the keywords `get`, `set` and `pub`.

```
// a.chalk

Int64 priv = 2;

get Int64 readOnly = 5;

pub class Car {};

class X {}; // Not exported (yet)

function foo() {}

pub { X, foo as bar };
```

Code exported from other modules (including the standard library) can be imported
in other modules. Unless the module `std/default-import.chalk` is imported
explicitly, everything from it is imported by default.

Import expressions must be part of the module scope (conditional operator implicitly
creates a new scope even without braces).

```
// b.chalk

import { Car, var, foo } from "./a.chalk";
```

### Control flow and basic syntax
Conditionals (if, if not, if-else):

```
condition && foo();
condition || bar();
condition ? foo() : bar();
```

Code block is an expression that returns its last expression:

```
FooBarType fb(condition ? {
  foo();
} : {
  bar();
});
```

For loop (braces are mandatory):

```
for {} // Infinite loop
for cond {} // While x
for ; cond; post {}
for init; cond; post {}
for T x : iterable {}
```

Switch (must be exhaustive):

```
switch x {
  case 0: foo();
  case 1, 2: { bar(); continue; }
  case _: x -= 1;
}
```

### Operators
TODO precedence

Modulo uses euclidean division, ie `0 <= a % b < b`.

Most operators are syntactic sugar for method calls, so it's possible to emulate
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
| `a \|= b`   | `a.or(b)`          | (must be `Int`)
| `a ^= b`    | `a.xor(b)`         | (must be `Int`)
| `a + b`     | `Number.add(a, b)` | Number
| `a - b`     | `Number.sub(a, b)` | Number
| `a * b`     | `Number.mul(a, b)` | Number
| `a / b`     | `Number.div(a, b)` | Number
| `a % b`     | `Number.mod(a, b)` | Number
| `a ** b`    | `Number.pow(a, b)` | Number
| `a & b`     | `Int.and(a, b)`    | (must be `Int`)
| `a \| b`    | `Int.or(a, b)`     | (must be `Int`)
| `a ^ b`     | `Int.xor(a, b)`    | (must be `Int`)
| `!a`        | `Bool.not(a)`      | (must be `Bool`)
| `a == b`    | `Object.equals(a, b)`       | Object
| `a != b`    | `!Object.equals(a, b)`      | Object
| `a < b`     | `Comparable.cmp(a, b) < 0`  | Comparable
| `a > b`     | `Comparable.cmp(a, b) > 0`  | Comparable
| `a <= b`    | `Comparable.cmp(a, b) <= 0` | Comparable
| `a >= b`    | `Comparable.cmp(a, b) >= 0` | Comparable
| `a <=> b`   | `Comparable.cmp(a, b)`      | Comparable
| `a = b`     | `a.assign(b)`      | (`a` must be `Object`)
| `?a`        | `a.hasValue()`     | (`a` must be `Optional`)
| `??a`       | `a.getValue()`     | (`a` must be `Optional`)
| `a[b]`      | `a.get(b)`         | (`a` must be `Indexable`)

Operators that are not syntactic sugar:

| Operator    | Meaning       | Return type
| -------     | -------       | -----------
| `a.b`       | Member access | Type of `b`
| `a && b`    | Logical and   | `Bool` if `a` and `b` are `Bool`, else `void`.
| `a \|\| b`  | Logical or    | `Bool` if `a` and `b` are `Bool`, else `void`.
| `a ? b : c` | Conditional   | See below

The first operand of *conditional*, *logical and* and *logical or* operators must
be `Bool`.

TODO move this to spec, too long:
If the type of either second or third operand of conditional operator is `noreturn`,
then the type of the return value and both operands must be `noreturn`.
If the type of either second or third operand of conditional operator is `void`,
then the type of the return value is also `void`.
If the types of the second and third operands are the same, then the type of return
value is also of the same type.
Else the return type of conditional operator is class X : All Traits Shared By Both

The `Type.from` method is the canonical way to convert between types.

TODO arithmetic and logical shift

### Functions
Function definition: `ReturnType name(Param param1, /*...*/) {/*...*/}`

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

Class `Function` can hold all callable objects, including lambdas with captured
variables and methods (auto-bound).

### Examples


### Reflection
TODO object.class

### Comptime
Arbitrary compile time execution of code with the `comptime` keyword, comptime
file reads

### Safe code
Safe code is code without undefined behavior, it either does what it should or
terminates the program. Safe code does not produce memory leaks and race conditions.

Keyword `unsafe` marks unsafe code. Using it may result in unpredictable behavior.

Unsafe parts of language can be used without `unsafe` if they are provably safe
to the compiler.

#### Unsafe code
- explicit constructor and destructor calls (`var.Type()`)
- assignment of `undefined` - does not initialize a variable
- pass reference to an object with longer lifetime than the reference
- pointer arithmetic? (Should this even be part of the language?)

## Tools, language compatibility


In no particular order, features of my programming language:
mathematical proofs about invariants in the program? eg. assert param 'x' is a square number
const correctness, ideally with a way to write perfect-const-forwarding functions
use value types instead of rvalue refs
generics - how to accept only const types or only mut types or both?
guaranteed copy elision in as many cases as possible
type-safe unions
Unify range for, forEach, Iterable and iterator?
every object on heap must be valid, ie owned by some object on stack or another valid object
reflection of call stack
decide: if a generic class is also generic parameter, must its type be fully specified?
array: no remove(), because its unclear whether all the elements after it should
  be moved or just the last one. Solutions
  - shift(Int index = 0, Int length); // also unshift
  - arr[index] = arr.pop();
no new keyword - calling constructor on a pointer type will allocate on heap
hot deployment of code
no semicolon after function / class declaration?
correct order of evaluation of module-wide and member variables that depend on each other
names cannot contain underscore; use `camelCase`, not `braindead_c_style__`
utf8 by default (or only)
todo how to prevent self deleting objects or make it predictable or make it reliably crash?
functions must be mut (~) to be able to mutate global / module-wide variables?
default code style
references: it would be nice if there were references to portions of String and Buffer,
  but I do not want a situation like in Rust that reference is its own type different from `*String`
compile time execution, eg. `comptime foo();`
  - imagine a regex library that constructs optimized parsers with const conditionals
    reducing needed code
  - reading nonlocal variables at compile time is only possible if the variable
    1. is from a scope that is being executed
    2. is const and assigned a const expresion
  - declarations cannot be comptime, only invocations
enforce order of keywords - pub static
async functions (any function that returns Promise, no `async` keyword); think more about corountines
A function that returns iterator is generator?
package manager
TODO concurrency, what about tens of threads, hundreds?
what about lazy evaluation, functional programming?
instanceof?
function parameters with default argument can be called with `undefined` to use
  the default argument; parameters cannot be uninitialized.
closures - shared between functions from the same scope
think about deffered loading of code so the whole application doesn't have to be in memory
  when it starts
a way to do low-level gory stuff so that an os can be written in it
no packages/crates
unary ^ as bitwise negation
what could go wrong if value was just memmoved and pointers fixed?
reflection is comptime
ability to detect if trait method is overriden
If you'll support inspecting private members, only allow it in tests
generic types can be only class types or the declared trait type
Implicit type conversions: trait loss and trait reordering
go's channels? can they be a class?
mostly the same way of handling async functions and threads?
no empty statement (`;`), use empty block `{}` instead
no empty class
object literals, ie anonymous class singletons:
  ```
  void fn({ Int a = 5, Int b = 7 }) {}
  
  fn({ Int b: 3 });
  ```
no named parameter calls
anonymous classes (eg. for returning values), object literals for anonymous classes
a type can implement Nullable, save space if optional
trait can require methods and variables (`Nullable<T>` requires get static T null)
custom object file format suited for modern programming concepts
function overloading
async for loop, asyncStream
generic type parameters should always be inferable
? coroutines can share the same thread or execute in parallel (data implicitly
  thread-local, message passing, some safe way of sharing `shared` variables)
two types of generics: templates and trait-based
  - template example: `void print<T>(T t)`
  - trait based:      `void print(Printable p) // Printable is a trait`
  - value generics:   `void print<Bool b>(String s) {}; print<false>();`
  - value generics have compile-time expressions

unify forEach method and range for loop
lambda functions
replace generic value params with optionaly comptime param?
think about hot deployment, lazy loading
`shared` or `volatile` keyword for variables that can be accessed by
  multiple threads at the same time?
function can specify assumptions about its inputs, if those assumptions are not
  met, any resulting potential undefined behaviour must be proven safe at the
  calling site
varargs? both runtime and generic
make void a class with just one instance so it can be used generically, eg `Promise<Void>`?
  but all types must be convertible to void...
if all recursive calls are the last statement, guarantee tail call elimination / conversinon to loop
underscore for unused function parameters
function can prove invariants about itself, eg. that an optional type is not
  null if certain conditions are met
trait can declare variables?
const function cannot return non-const reference to its member
overflow and division by zero on non-nullable types throws exception, there's a wrap-around Int type
golang's defer? destructors do the same, so why?
struct, union and array destructuring, destructuring of a single variable from
  anonymous class/union doesn't require braces, optional declaration adds one optional,
  that can result in ??Type
```
// Declaration
{ MType x: newName, Int y } = f(); // Only works on anonymous classes
PType { x: newName, y } = f(); // Only works on type PType
?Type [ a: { ?Int32 i: aInt }, b ] = g();

// Assignment
{ x: newName } = f();
[ a: { i: aInt }, _, b ] = g();

// should work because of smart casts - 123 and "a" are first converted to Object,
// then back to int and String
[ x, y ] = [ 123, "a" ];

// Union
{ ?File? file, ?Error err } = Union<File, Error>(Error("Not a real IO operation"));

// Function parameters
void fn(Complex { re: realPart, im }) {}
```
In `expr && { A }`, expr is part of scope A. Also `||`, `?`, `switch`, etc
Place local variable on heap if it has chance of being returned, like go?
If `X` is binary operator that returns `Bool`, then `A !X B == !(A X B)`
allocators, way to manage allocators of libraries that were written without them
c++ style constructor initialization list
`Int<Int i>` variable size bigint starting as Int32
trait type values should work like rusts Box
what about `void`, `noreturn` and generics?
custom smart pointers?
smart casts (kotlin)
break; continue; `break 2;` breaks out of two loops
types can specify a value that is null? If thay do that, optional types will
  consume as much memory as non-optional, but this creates the risk that a type
  will suddenly become null on its own (even if it's not optional).
  - this would require a proof that null and non-null will always stay null, resp. non-null
  - class X : Nullable {}
support immediately invoked function expressions
promise errors if it is destructed with error
just like there are methods that are const, there should be methods that are shared
ability to control every dynamically created object so that a long-running program
  can defragment its ram by moving/deleting and recreating everything on heap
  - this icludes language provided objects on heap, eg. closures
types are first class citizens?
iterators
function values are never mutable, but pointers can be
streams (with forEach, reduce, etc)
multiline comments?
`class X<class Y : Printable>`, `List<?>` for list of Printables
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
multiple return values?
array literals use square brackets
trait can have own static variables not usable from class
something like my init.js
?. operator? a?.b returns null if a is null, else returns a.b
?: operator? a ?: b returns a if nonnull, else returns b
placement function call?
treat mutable, async and threaded similarly
  1. iterator must track changes if it iterates either mutable or shared (or async) object.
  2. a function that returns promise can be either run as coroutine or a thread (await vs go)
move an object and change pointers (even constant) with one operation?
is returning a reference ok if and only if it refers to nonlocal object? this should be easy to check statically
everything is thread-local by default
no inline keyword, or anything that is supposed to do compiler's job
Function trait, Closure class able to hold closures? Reflection powerful enough
  to enable code only implementation lambdas and nested functions cannot be
  returned if they capture ref to local variable, by default they do what?
Every trait is implicitly generic, can access their own class type
Is it possible to assign `A fn(?B)` to `A fn(B)`?
Allocators and a type for stack frames? `Function.StackFrame` or `StackFrame<*Function fn>`
A single Function type for all types of functions, no special function pointer
`Allocator<X>` trait, `DefaultAllocator<X>` class
`auto` keyword?
If a package p imports package q, the completion of q's init functions happens
  before the start of any of p's. The start of the function main happens after
  all init functions have finished.






Standard library should have:
well thought out containers (arrays, sets, maps) each with methods from Stream (forEach,
  map, filter, fold)

net
  http, https
  fetch

fs
  async only

init
  initTask(async fn) - executes fn before main()

`Generator<fn> : Stream`
`Promise<T>`

lang.chalk
  ast



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

```
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

Bool fn([]Int32 ints) {
  void helper(Int32 x) {
    foo(x) && fn.return true; // makes the function fs return
  }
  
  for i : ints { helper(i) }
}


class Reflect.classOf(var) x();
class var.class x();
Reftlect.classOf(var) x();
var.class x();

class X : Reflect.traitsOf(var) x();

*X a = new(1, 2); // allocates on heap
X bb = new(1, 2); // allocates on stack

await atomicVar.lock();


//named function
void fn() {}

//anonymous function
void() {}

void a() = fn;
void *a() = fn;

void []fnArr(Param x) = [];


Iterator fn() {
  a.forEach(Promise<>(AType elem) { fn.yield(a); });
  
  // or
  a.forEach(fn.yield);
}

auto fn() {
  return(
    { Int x: 6
    , Float y: 7.8
    }
  );
}

auto fn() {
  return {
    Int x: 6
    Float y: 7.8
  };
}

enum { a, b, c }

enum {
  anana,
  cnonarrrna,
  bnenana,
}

enum {
  anana
  cnonarrrna
  bnenana
}

class X {
  ~Int i;
}

Car c;

Car.getField("i")??.set(c, 42);
Car.class.getField("i")??.set(c, 42);





































```