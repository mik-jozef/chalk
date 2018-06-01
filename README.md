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
- RAII


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
- glabal variables
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
| `Int`     | Signed integer, size depends on platform, at least pointer size.
| `Int8`    | Signed 8-bit integer.
| `Int16`   | Signed 16-bit integer.
| `Int32`   | Signed 32-bit integer.
| `Int64`   | Signed 64-bit integer.
| `Float32` | 32-bit floating-point number.
| `Float64` | 64-bit floating-point number.
| `Bool`    | Boolean, `true` or `false`.
| `String`  | Utf8 string.

#### Type modifiers
- `mut T` - makes a type modifiable.
- `const T` - makes a type constant.

Type modifiers affect all variables in a single declaration, not just one.

Constant type can accept any variable, but prevents any modifications of its
value. Types that are marked neither `mut` nor `const` can act as either, unless
it would allow assignment of constant variable to a mutable variable.

```
class Car {
  [4]Wheel wheels;
  
  *Wheel getWheel(Int i) { return wheels[i]; };
}

mut Car mutCar;
const Car constCar;

// OK
mut *Wheel mutWheel = mutCar.getWheel(0);
const *Wheel constWheel = constCar.getWheel(0);

// Error, cannot assign const value to mut variable
mut *Wheel mutWheel = constCar.getWheel(0);
```

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

- `?[]mut ?Int8` is optional dynamic array to mutable optional integers.
- `const *mut T` - constant pointer to mutable T.
- `mut *const T` - mutable pointer to constant T.
- `?*T` - optional (nullable) pointer to T.
- `*?T` - pointer to optional (nullable) T.

#### Implicit type conversions
Conversions can be chained.

| Conversion | Description
| ---------- | -----------
| `Int8 -> Int16 -> Int32 -> Int64` | Integer widening
| `*T -> T`  | deferefence
| `T -> *T`  | reference
| `T -> ?T`  | type to optional type

Additionally, there is unsafe `?T -> T`, see `unsafe` keyword.

#### Literals
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

##### Other
| Example                  | Description
| -------                  | -----------
| `"hello"`                | String
| `[ 0, 10 ]`              | Array of integers
| `[ 0, "a" ]`             | Array of Object
| `{ T t: val, Int i: 9 }` | Instance of implicilty defined anonymous class

There are two special values, `null`, which is assignable to (any) optional type,
and `undefined`, which is used to leave variables uninitialized (unsafe, see
`unsafe` keyword) or use default function argument (safe).

To understand how equality works with `null`, have a look at TODO link to `std/Object.equals()`

### Classes and enums
Classes are collections of values and methods. Enum is a class that has finitely
many constant instances. Enum implicily implements trait `Enum`.

Classes can be nested, both static and inner. Inner classes have the same type
even if they belong to a different instance.

Class fields marked `mut` are mutable even if the instance is const. Such fields
must be private.

Example class:
```
class X : Trait1, Trait2 friend Y {
  Int a = 0; // private, only accessible to class X and Y
  
  get Int b; // read only
  set Int c; // write only
  pub Int d; // public
  
  // Constructor
  pub new() : b(0), c(0), d(0) {} // Order must be same as declaration.
  
  pub new(Int a, Int b, Int c, Int d) : a(a), b(b), c(c), d(d) {}
  
  // Methods are either private or pub.
  pub Int getA() { return a }
  pub void setA(Int a) ~ { this.a = a }
  
  pub static X s() {}
  
  // Destructor, called at the end of variable's lifetime
  pub wen
}

X x = new(1, 2, 3, 4);
```

Example enum:
```
enum Bool { true, false } // Definition of Bool in standard library.

enum E {
  multiline,
}

trait DirTrait { Int8 dirX, dirY; }

enum Direction : DirTrait {
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
Traits are collections of method definitions and declarations (with implicit `pub`
access modifier) that a class must have. They can also contain member types.

The `own` keyword specifies that the member function/variable belongs to the
trait itself, not to a class.

```
trait Console {
  static String defaultMessage = "(blank)";
  
  print(*String str = defaultMessage);
  
  println(*String str = defaultMessage) { print(str + "\n"); }
  
  own foo() {}
  
  static class Stats;
}

class SimpleConsole : Console {
  static class Stats friend SimpleConsole {
    get Int bytesWritten;
  }
  
  Stats stats;
  
  print(*String str) {
    stats.bytesWritten += out.write(str);
  }
}

SimpleConsole.new().println(); // Prints "(blank)\n"

Console.foo(); // SimpleConsole.foo() is an error
```

### Control flow and basic syntax
#### Variables
```
Int var0 = 5;

ClassType var1 = new(args, to, constructor);

TraitType var2 = ClassType.new();

class NewType : Trait1, Trait2 value = bar();
```

Keyword `auto` can be used to infer type from right hand side of assignment.

```
auto var3 = 5; // var3 is Int.

auto var4 = ClassType.new(); // var4 is ClassType.
```

#### Conditionals
```
condition && foo();
condition || bar();

condition ? {
  foo();
} : bar();
```

#### Code block
Code block is an expression that contains multiple sub-expressions and returns
the last one. It creates a new scope.

```
Int x = {
  Int x = rand.random();
  
  x * x;
};
```

#### For loops
Braces are mandatory. The expression `continue` skips the rest of one iteration
of the for loop, `break` skips the rest of the whole loop.

```
for {} // Infinite loop
for cond {} // While x
for ; cond; post {}
for init; cond; post {}
for Type x : iterable {}

outer: for []Int arr : arrArr {
  for Int i : arr {
    i > 0 && continue outer;
  }
}
```

#### Switch
Switch must be exhaustive.

```
switch x {
  case 0: foo();
  case 1, 2: { bar(); continue; }
  case _: x -= 1;
}

// Switch with array literals
switch [ x, y ] {
  case [ false, false ]: a();
  case [ false,  true ]: b();
  case [  true, false ]: c();
  case [  true,  true ]: d();
}

switch { // Equivalent to `switch true {`
  case x <  5: a();
  case x == 5: b();
  case x >  5: c();
}
```

### Operators
TODO precedence

Modulo uses euclidean division, ie. `0 <= a % b < b`.

Most operators are syntactic sugar for method calls, so it's possible to emulate
operator overloading by implementing certain traits.

| Example     | Sugar for          | Trait
| -------     | ---------          | -----
| `a += b`    | `a.add(b)`         | Number
| `a -= b`    | `a.sub(b)`         | Number
| `a *= b`    | `a.mul(b)`         | Number
| `a /= b`    | `a.div(b)`         | Number
| `a %= b`    | `a.mod(b)`         | Number
| `a **= b`   | `a.pow(b)`         | Number
| `a <<= b`   | `a.shl(b)`         | (must be `Int`)
| `a >>= b`   | `a.shr(b, true)`   | (must be `Int`)
| `a >>>= b`  | `a.shr(b, false)`  | (must be `Int`)
| `a &= b`    | `a.bitwiseAnd(b)`  | (must be `Int`)
| `a \|= b`   | `a.bitwiseOr(b)`   | (must be `Int`)
| `a ^= b`    | `a.bitwiseXor(b)`  | (must be `Int`)
| `a + b`     | `Number.add(a, b)` | Number
| `a - b`     | `Number.sub(a, b)` | Number
| `a * b`     | `Number.mul(a, b)` | Number
| `a / b`     | `Number.div(a, b)` | Number
| `a % b`     | `Number.mod(a, b)` | Number
| `a ** b`    | `Number.pow(a, b)` | Number
| `a << b`    | `Int.shl(a, b)`        | (must be `Int`)
| `a >> b`    | `Int.shr(a, b, true)`  | (must be `Int`)
| `a >>> b`   | `Int.shr(a, b, false)` | (must be `Int`)
| `a & b`     | `Int.bitwiseAnd(a, b)` | (must be `Int`)
| `a \| b`    | `Int.bitwiseOr(a, b)`  | (must be `Int`)
| `a ^ b`     | `Int.bitwiseXor(a, b)` | (must be `Int`)
| `a == b`    | `Object.equals(a, b)`  | Object
| `a != b`    | `!Object.equals(a, b)` | Object
| `a < b`     | `Int.sign(Comparable.cmp(a, b)) == -1` | Comparable
| `a > b`     | `Int.sign(Comparable.cmp(a, b)) == 1`  | Comparable
| `a <= b`    | `Int.sign(Comparable.cmp(a, b)) != 1`  | Comparable
| `a >= b`    | `Int.sign(Comparable.cmp(a, b)) != -1` | Comparable
| `a <=> b`   | `Comparable.cmp(a, b)`                 | Comparable
| `a = b`     | `a.assign(b)`             | Object
| `a[b]`      | `a.get(b)`                | Indexable
| `!a`        | `Bool.not(a)`             | (`a` must be `Bool`)
| `?a`        | `Optional.hasValue(a)`    | (`a` must be `Optional`)
| `??a`       | `Optional.getValue(a)`    | (`a` must be `Optional`)
| `a ?: b`    | `Optional.getValue(a, b)` | (`a` must be `Optional`)

Operators that are not syntactic sugar:

| Example     | Operator      | Return type
| -------     | --------      | -----------
| `a; b`      | Semicolon     | Type of `b`
| `a.b`       | Member access | Type of `b`
| `a?.b`      | Member access | Type of `b`
| `a && b`    | Logical and   | `Bool` if `b` is `Bool`, else `void`.
| `a \|\| b`  | Logical or    | `Bool` if `b` is `Bool`, else `void`.
| `a ? b : c` | Conditional   | Common type of `b` and `c`

The first operand of *conditional*, *logical and* and *logical or* operators must
be `Bool`.

### Modules
A single program is typically written in multiple files. Each file that contains
code is a module.

A module can export code using the keyword `export`. Other modules cannot write
to variables they import.

```
// a.chalk

Int64 modulePrivate = 2;

export class Car {}

class X {
  get Int a, b, c;
}

function foo() {}

export { foo, X as Y };
```

Code exported from other modules (including the standard library) can be imported
in other modules. Unless the module `std/default-import.chalk` is imported
explicitly, everything from it is imported by default.

Import expressions must be part of the module scope (note conditional operator
implicitly creates a new scope even without braces).

```
// b.chalk

import { Car, foo, Y } from "./a.chalk";

// Or
import * as A from "./a.chalk";

foo == A.foo; // True.
```

### Functions
A function represents a computation that takes zero or more parameters and returns
a value.

```
Int add(Int a, Int b) {
  return a + b;
}
```

Functions are copyable and assignable. Syntactic sugar types can be used on functions.

```
Int addCopy(Int a, Int b) = add;

Int *addPtr(Int a, Int b) = add;

Bool []logicalOps(Bool a, Bool b) =
    [ Bool(Bool a, Bool b) { return a && b; }
    , Bool(Bool a, Bool b) { return a || b; }
    , Bool(Bool a, Bool b) { return a != b; }
    ];
```

All functions in the same scope must have a unique signature. Signature consists
of name of the function and types of its parameters.

A function can have default parameter(s). Such a function defines multiple
overloads, one for each combination of default/nondefault arguments. If the last
X parameters are default and of the same type, only the rightmost Y <= X can be
omitted.

Blank argument (underscore) acts as default argument when used in the place of
default parameter.

The default argument will be evaluated for each call.

```
Int x(Int i = 10) { return 10 * i; }

Int a() = x;

a() == x(); // True.
```

If an argument's type is a trait, function is dispatched dynamically.

Tail call optimization is guaranteed for every function invocation that is the
last executed expression in a function.

Functions can be contain type definitions (and that includes other functions).

TODO Nested function can return as the outer function

All functions are instances of the `Function` class.

Return type can be `auto`, a common type of all posibly returned values.

| Example                 | Description
| -------                 | -----------
| `Int(P p0, P p1)`       | Type of a function with two `P` params and `Int` return type
| `Int a() { return 0; }` | Function `a` that returns 0
| `Int b() = a;`          | Function `b` that is a copy of `a`
| `Int []c() = [ a, b ];` | Array `c` of functions `a` and `b`
| `void d() { /*...*/ }`  | Ordinary function

#### Methods
Methods are functions defined inside a class. Non-static methods have an implicit
first parameter `this` and can access and modify instance's private members.

```
class X {
  void foo();
}

X x;

void foo(*X this) = x.foo;

foo(x);
```

#### Generator functions
A function that returns a `Stream` is a generator. It can use the `yield` keyword.

```
Stream<Int> fibonacci() {
  Int [ a, b ] = [ 0, 1 ];
  
  for {
    yield a;
    
    [ a, b ] = [ b, a + b ];
  }
}

for Int i : fibonacci().take(10) {
  print(i);
}
```

#### Async functions
A function that returns a promise is an async function. It can use the `await`
keyword to suspend its execution and wait for a promise to resolve.

```
Promise foo(i) { await sleep(200); bar(i); }

Promise<String> fn() {
  for await Int i : asyncInterator { print(i); }
  
  for i : range(10) { await foo(i); } // runs serially;
  
  return "abc";
}
```

#### Lambdas
Syntactic sugar for normal functions. Types can be omitted if they can be inferred.

| Example                   | Equivalent to
| -------                   | -------------
| `a => b`                  | `BType(AType a) { return b; }`
| `(Int a, Int b) => a + b` | `Int(Int a, Int b) { return a + b; }`

### Generics
Generic types are types that have generic parameters. A generic parameter can be
a type or a constant value. Generic parameters are implicitly `comptime`.

Unlike in C++, duck typing doesn't work in Chalk. All members of type parameters
must be specified in a trait the type implements.

```
class Box<Val> {
  pub Val value;
}

class PrintableCollection<Val : Printable, Col : Collection> : Printable {
  pub Col values;
  
  String toString() {
    return Col.name + ":\n" + values.map(v => v.toString() + "\n").join();
  }
}
```

Generic types can be specialized, but only in the module it was defined in.

Trait types of local variables whose class is known at compile time are compiled
as if they were class types.

Parameters can be declared `comptime`, calling a function with such parameters
will call an optimized version of the function if some of the parameters' values
are known at compile time.

```
void fn(comptime Bool b) {
  b ? a() : b(); // Branch is eliminated if `b` is know at compile time
}
```

### Reflection
See the standard library TODO add a link to not yet existing resource.

TODO some basics

### Compile-time code execution
Arbitrary compile time execution of code with the `comptime` keyword, comptime
file reads.

```
[64][64]Float values = comptime new((*Float value, Int i0, Int i1) {
  value = heavyMath(i0, i1);
})
```

Compile-time execution fails if it attempts to access a mutable variable that is
not defined in the currently executing `comptime` expression.

```
void(Int i) {
  return comptime i; // Error
}
```

### Safe code
Safe code is code without undefined behavior, it either does what it should or
terminates the program. Safe code does not produce memory leaks and race conditions.
Note this was written very early and is probably too optimistic.

Keyword `unsafe` marks unsafe code. Using it may result in unpredictable behavior.

Unsafe parts of language can be used without `unsafe` if they are provably safe
to the compiler.

#### Unsafe code
- explicit constructor and destructor calls (`var.new()`)
- assignment of `undefined` - does not initialize a variable
- pass reference to an object with longer lifetime than the reference
- pointer arithmetic

### Concurency
HUGE TODO

#### Async functions
Cooperative, in the same thread as caller.

#### Threads
Preemptive, threaded.

## Tools, language compatibility


In no particular order, features of my programming language:
should temporary objects be allocated on the heap unless they are provably local?
references: it would be nice if there were references to portions of String and Buffer,
  but I do not want a situation like in Rust that reference is its own type different from `*String`
underscore for unused function parameters
trait can declare variables?
overflow and division by zero on non-nullable types throws exception, there's a wrap-around Int type
golang's defer? destructors do the same, so why?
struct, union and array destructuring, destructuring of a single variable from
  anonymous class/union doesn't require braces, optional declaration adds one optional,
  that can result in ??Type
two types of array destructuring:
  ```
  without global type - RHS must be array literal
  [ a, b, auto d ] = [ a, b, foo() ];
  
  with global type - RHS can be anything
  Type [ a, b ] = bar()
  ```
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
If `X` is binary operator that returns `Bool`, then `A !X B == !(A X B)`, eg.
  `!instanceof`
allocators, way to manage allocators of libraries that were written without them
c++ style constructor initialization list
`is` operator:
  1. `a is A` - true if a is an instance of type A; checked at runtime if necessary
  2. `a is null` - true if a is null
trait type values should work like rusts Box
classes themselves are instances of class `Class`?; `Class` is enum?
type variables, eg. `class Y() { return class A {} } class X = Y();`
type aliases, `class F = A<Int,Int>`?
what about `void`, `noreturn` and generics?
custom smart pointers?
smart casts (kotlin)
break; continue;
trait unions? eg.
```
trait Y {}
trait X {
  void a() {}
  
  Y {
    void b() {}
  }
}

class A : X {} // methods: a
class B : X, Y {} // methods: a, b
```
unary minus
types can specify a value that is null? If thay do that, optional types will
  consume as much memory as non-optional, but this creates the risk that a type
  will suddenly become null on its own (even if it's not optional).
  - this would require a proof that null and non-null will always stay null, resp. non-null
  - class X : Nullable {}
support immediately invoked function expressions
enum instances should be copyable and able to change themselves to other instances
  ```
  enum Bool {
    true, false;
    
    not() { this = Bool.false }
  }
  
  true.not() == false;
  ```
promise errors if it is destructed with error
semicolon must be omitted if closing brace is on the same line
statement cannot contain empty line
  ```
  // Error, statement cannot contain empty line
  i =
  
  2;
  ```
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
keyword `final` forbids overriding a method
every member is a getter? no setters
inner classes:
  ```
  class A {
    Int a;
    
    // Member class, every instance can have a different one
    class B;
    
    // Member inner class, one for all instances of A
    class C {
      getA() { return a }
    }
  }
  ```
classes can be variables, but instantiation needs comptime class
  ```
  class X : Object = getClassX(); // Warning, explicit implementation of Object
  
  X a; // Error if getClass is not comptime
  
  X.getFields(); // Never an error
  ```
is returning a reference ok if and only if it refers to nonlocal object? this should be easy to check statically
everything is thread-local by default
no inline keyword, or anything that is supposed to do compiler's job
Function trait, Closure class able to hold closures? Reflection powerful enough
  to enable code only implementation lambdas and nested functions cannot be
  returned if they capture ref to local variable, by default they do what?
types can be variables, parameter types that are inferable from arguments must be implicit
Should enums be copyable? yes, they are constant, anyway. should their copy
  constructors be allowed to have side effects? (or any copy constructors?)
how should destructor be named? `~new`
Is it possible to assign `A fn(?B)` to `A fn(B)`? should be
Allocators and a type for stack frames? `Function.StackFrame` or `StackFrame<*Function fn>`
A single Function type for all types of functions, no special function pointer
`Allocator<X>` trait, `DefaultAllocator<X>` class
`auto` keyword?
null coalescing operator, `a ?? b == (a == null ? b : a)`
If a package p imports package q, the completion of q's init functions happens
  before the start of any of p's. The start of the function main happens after
  all init functions have finished.
implicit 'type converions' for functions (there is runtime overhead):
`A f(args...) -> void f(args...)`
`A f(T x) -> A f(B : T x)`







Standard library + userland libraries:
well thought out containers (arrays, sets, maps) each with methods from Stream (forEach,
  map, filter, fold)

net
  http, https
  fetch

fs (async only)

init
  `initTask(Promise fn)` - executes fn before main()

ast (chalks abstract syntax tree)?

time
  getMiliSec
  getNanoSec
  sleep (maybe in a more concurency-related place?)

console
  getPassword

json

object serialization

dom (document object model)
  audio

compression + (deflate, gzip, zlib, lzma, zip, tar, webp, wav, midi, mp3, ...)
crypto
universal sql driver
ddcp
math
  complex numbers
  random
  BigInt
regex
email
rpc - remote procedure calls
asm - inline assembler (implementation obviously provided by the compiler)


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

{ OptType b: mut f, d: g } = x;

for [ elem, index ] : array {}

// Union<File, Error> open(String s)

// Both of these work, see destructuring
{ ?File file, ?Error err} = open("./photo.png", Mode.RNO);
File f = open("./photo.png", Mode.RNO);

Folder dir(root, dirPath, Mode.RWO);
await dir.open();

File file(folder, path, Mode.RWO);
assert(file.path == path);
assert(gile.getFullPath() == String.concat(folder.getFullPath(), path));
await file.open();

class Car {
  Int speed;
  
  Car null() : speed(-1) {}
  
  Bool isNull() = speed < 0
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

X a = new(1, 2); // allocates on stack
UniquePtr<X> b = new(1, 2); // allocates on heap

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

Car.getField("i")?.set(c, 42);
Car.class.getField("i")?.set(c, 42);

Bool binaryOperation(Bool _, Bool _) = foo(); // foo() must return a function with a conforming signature




































```