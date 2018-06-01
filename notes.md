```
JS      https://developer.mozilla.org/bm/docs/Web/JavaScript
Zig     https://github.com/zig-lang/zig
Python  https://www.python.org/
C++     https://cppreference.com
D       https://dlang.org/
Rust    https://www.rust-lang.org
Go      https://golang.org/
Ada?
```

TODO
`Optional.isNull()` or `a is null` - latter
what is `const ?mut Type`? shouldn't `?` be a type modifier instead of a type?
  it should be a type, because `??T` is a valid type, eg type of.
  `[ T(), null ][foo()]`. TODO how to distingush first- and second-level `null`?
Object.shrink() - shrinks all members, eg. unused memory in dynamic arrays
compiler - make it error to compare value with null, because it is always false
import "x" using allocator?
syntactic sugar for union type? `A | B == Union<A, B>`
`[]String x(reservedSpace);`
String,Buffer,Array:Viewable|Viewer; Viewer.view();
assert array length >= 0
arrays with arbitrary length
enum with just one or just two variable generates a warning - The canonical
  one/two-element enum is `Void`/`Bool`
rename `noreturn` to `Empty`?
first class fields?
   ```
   class C {
     Int a, b;
   }
   
   C c;
   
   static C:Int f = a;
   c:f = 3; // ?
   
   C:Int f = c.a;
   
   f = 3; // ?
   ```
warning on empty class, class with just one member (and no functions)
`Set<T>` is just `Map<T, Void>`
should `this = null`; be supported? Could be used in streams (copying IOStream to OStream)?
if a generic function has parameter instantiated to `Void`, should the parameter
  be removed?
enforce class contents order: enum values, variables, methods, nested classes
block returns last statement, function must return explicitly
import() function that dynamically loads code, not part of global namespace
do not have different types of arrays - I'm looking at std::vector
Function pointer is simply a pointer to Function class, no special treatment from compiler
no out-of-class function definitions
it is an error if class members and class member initialization order is different
functions are hoisted
promises
generate warning if unsafe code is safe?
program is safe if every `unsafe` code is provably safe
string implements Buffer
main returns noreturn
array.size, not array length
class Defer - runs functions when destructed
json support, import json as object
`Reflect(var).set("x", 5)` reflect constructor creates object bound to certain instance
`fn.class.nestedFunctions.get("x");`
safe code must be defined
libexport? a way to distinguish internal and external exports in a library
math: dimenisional quantities;
std/test.chalk
`Map<Int, class> = Map([ Map.Entry(0, String), Map.Entry(1, Bool) ]);`
`[]trait a = [ Object, ToString ]`
```
// Can have any arguments
Null varargFn([]class Args, ...Args args) {
  for i : range(Args.length) {
    println(Args[i] is ToString ? args[i].toString() : "(not printable)");
  }
}

// Can have any number of String arguments
Null varargFn(String... args) {
```
inside functions, types are hoisted, but nested functions cannot be called before
  referenced variables are defined (JS has a cool name - temporary death zone?)
settings that limit what compiler can do at compile time (can it write to files?
  can it access the internet?)
```
KeyedCollection<K : Comparable, V> : Indexable, Collection {
  find(*V t, *K startIndex, *K endIndex);
}
```

```
enum X<Int> {
  a = 1,
  b = 5,
}
```
default, aggresively enforced code style
chalk compiler should be able to
1. publish stats about compiling times (percentage spent on parsing, theorem proving, generating binaries, downloading dependencies, running comptime code, optimizing; avaiable as granularly as possible)
2. do code coverage and tests
3. format source code
chalk should allow control of every memory allocation
html library for gui, chalk to webasm
generics with types are arguments? eg. `Array<class C> c = [ Int, Bool ]`
division accepts maybe numbers and returns maybe number, can return a number if
  denominator is provably not null
warn on TODO comments
optimizations should provably not change the program
safe program should never enter an infinite loop
`[[ std-call ]] Int() { return 42 }` or `@std-call Int() { return 42 }`
reflection of modules
focus on good debugger
 - ideally, debugger should be able to show out-of-order execution of instructions
   if there is more than one thread
ability to run source code deterministically (optional control over thread scheduler,
  faking filesystem and time)
capabilities? eg. load a module that has only a partial access to standard library?
  capabilities of eval?
an allocator that uses pages reserved for inter-process communication
remote procedure calls? inter-process/over network
```
class A {}
class B<T> {
  T t;
}

class C = A;
class D = B; // Error: partial/higher-order/incomplete type
class E = B<Int>;
class F<T> = B<T>;
class G<T> = A; // Warning: unused generic parameter T

class H<T> {} // Warning: unused generic parameter T
```
continue is not allowed in type switch
optimizations - range for should be compiled to iterator, foreach in tree should be converted from
  recursive to loop and inlined
warning or error if multiple declarations in the same expression?
Add compiler warning "useless trait type". Plenty of Java devs will do `Set x = HashSet()`
Ptr, UniquePtr, SharedPtr, (MarkSweepPtr?)
functions must explicitly return, other blocks of code return the last expression
class Class - used in reflection, const and not copyable
this code `(a() => a())()` should execute in O(0), but should produce warning
  this expression has no observable effect
online repl that can also handle directory uploads of whole projects
repl requires three newlines to eval
`return { code block; }` is error?
   ```
   cond && return {
     Int i = foo();
     
     i * i;
   };
   
   cond && {
     Int i = foo();
     
     return i * i;
   };
   ```
let library authors release codemods - eg. to rename an identifier, ...
just one type for functions
compile flag --provable-contracts: tries to prove things like reflexivity and
  transitivity of equals, etc
stats about compiling performance
should all fields be modifiable in constructor and assign function?
request fast persistent memory - useful on pcs that have just a few GB of SSD
trailing comma allowed if closing parenthesis/bracket/whatever is on next line
Error class, destructor throws if ignore() wasn't called
prefer 'start - end' to 'start - length', because some types are orderable even
  if the difference is not measurable
warning: function can be static
compile option: --aggresive-generics
optimize out object creation in argument instead of having emplace?
warn on `x && Int a(0)` (ERRCODE: Variable declaration in implicit scope);
small standard library, official packages in userland?
ability to inspect (and/or redirect) stdout? perhaps a compile time option that
  allows it?
function splitting optimization
package manager
guaranteed copy elision in as many cases as possible
  eg. in `void f(Bool b) { b ? { shortCode } : { longCode } }` `f(true)` could be
  inlined and `f(false)` not.
function and type definitions are hoisted
html+friends as gui
audio library
documentation generator (like javadoc)
hooks in compiler that can run unit tests or do whathever, like npm scripts?
mathematical proofs about invariants in the program? eg. assert param 'x' is a square number
front call optimization? middle call optimization?
no way to acquire locks sequentially?
type-safe unions
use value types instead of rvalue refs
const correctness
reflection of call stack
array: no remove(), because its unclear whether all the elements after it should
  be moved or just the last one. Solutions
  - shift(Int index = 0, Int length); // also unshift
  - arr[index] = arr.pop();
every object on heap must be owned by a UniquePtr
hot deployment of code, lazy loading? `Module m = import("path")`
what about 3 possible path formats?
  1. `/absolute/path`
  2. `./relative/path`
  3. `ugh/what`
  Options:
  - find some other "root" distinct from `/` (like current directory), use all 3
  - disallow one of them (which?)
unsafe `Pointer.to<Type>(Int address)`, `Pointer.add<T>(Ptr<T>, Int i)`
no semicolon after function / class declaration
function can specify assumptions about its inputs, if those assumptions are not
  met, any resulting potential undefined behaviour must be proven safe at the
  calling site
varargs? both runtime and generic
correct order of evaluation of module-wide and member variables that depend on each other
  cycles are error
names cannot contain underscore; use `camelCase`
this produces warning: `trait A {} trait B : A {} class C : A, B {}` - A is reduntant
utf8 by default (or only)
method autobinding?
  ```
  A a;
  A.foo; // Not bound
  a.foo; // Bound
  ```
Constructor params prefixed with underscore are assigned to members
option to translate mathematical proofs about source code to mathematical proofs
  about the executable file (verifiable with the executable alone)
disallow returning local types and functions
forEach, all, any: pick one or two; if forEach, make two overloads:
  ```
  forEach(void(*Self));
  forEach(Bool(*Self));
  ```
naming: UniquePtr vs Box? and SharedBox, in that case
could compiler do some static analysis and error on memory errors?
for loop returns true if `break;` was executed
what about these cycle syntaxes? there are duplicates, and I'd rather not have
  them in Chalk
  ```
  range(x).forEach(i=> {})
  for Int i : x {}
  
  for {}
  for cond {}
  for start; cond; end; {}
  
  Int i for x {}
  
  
  : {}
  : cond {}
  : start; cond; end; {}
  
  Int i : x {}
  Int i : x {} || ifNotBroken()
  ```
Could ordinary pointers work like UniquePtr/SharedPtr unless they
  can be provably safe, while being fast?
replace constructor call with constructed object if there are no side effects and
  its binary representation is known
this is valid: `import comptimeFnThatReturnsString();`
is this valid? `A<auto> = f();`
do not allow copy elision where it's not guaranteed if constructor has side effects
do not have a `Function` class, make functions their own types
curious consequence of function syntax - currying:
```
Int(Int _)(Int b) {
  return a => a + b;
}

// This should produce warning - parameter names don't match (?)
Int(Int c)(Int b) {
  return a => a + b;
} 
```
reconsider closures - are they really needed? shouldn't classes suffice?
  my problem with them is that they'll allocate on the heap on their own, giving
  no control over the allocation to the programmer
a function must end with a return statement unless it provably never reaches its end
TODO can false sharing be prevented?
warnings - unused variable (including import), unused private member, empty
  import (`import {} from "x"` instead of`import "x"`), parameter only used to
  access one member (replace parameter by that member), unused type/function
  - variables can be only unused if they are library exports
members = fields + methods
TODO the only difference between parentheses and braces is that braces create
  a lexical scope, that doesn't seem enough(?) maybe restrict their respective
  use cases so they are mutually exclusive (or use braces just for parsing
  objects?)
  ```
  Int factorial(Int i) (
    return i == 0 ? 1 : i * factorial(i - 1);
  )
  
  // Pick this one
  Int factorial(Int i) {
    return i == 0 ? 1 : i * factorial(i - 1);
  }
  
  // -----
  
  cond && ( foo(); bar() ); // Pick this one
  cond && { foo(); bar() };
  
  // -----
  
  // Pick this one
  cond && (
    foo();
    bar();
  );
  
  cond && {
    foo();
    bar();
  };
  ```
semicolon has the same meaning as comma in C
closures could work like this: a function that returns a function or a type
  could instead return an instance of an anonymous class with that function/type
  as a property
tail call modulo cons
warn on `++var`, `var++`, offer to replace by `var += 1` and something appropriate
  for the later
warn on `for Int i; i < x; i += 1 {}`: can be replaced by `Int i : x {}`
warn if for has parentheses, that's probably not what people intended
global type reflection (eg. enumeration) is obviously bad (breaks encapsulation,
  violates open-world principle (new types may be loaded at any time), prohibits
  not including unused types in binaries), but what about module-wide type
  reflection? - I guess it's bad anyways
warning - unnecessary `this`
if function X contains just a call to function Y, function X must be inlined
  this "inlining" must also be true about `_start` function (or whatever name
  it will have), ie. if `_start` contains just one funciton call, the first
  instruction executed by a program must be the first instruction of Y, not
  a call to Y
style - class variables first, then constructors, then methods
style - empty line at the start of a function just if the first expression is
  type/function definition
```
Null f(*Int a, *Int b) { a += 1; b = 7; a += 1 }
Null f(*Int a, *Int b) { a += 2; b = 7         }
```
  According to spec, these functions must not just specify a function with the
  same behaviour, they must specify the exact same function.
  - statement order in the source must not dictate statement order in some
    abstract representation of the function - must be a relative concept, just
    like position in physics (because of threads)
  - comptime arithmetic must evaluate whenever possible
compiler must comptime execute pure functions with all arguments known at comptime
variables that are written to, but never read should be marked as unused
an expression that has no observable effects should produce a warning
  ```
  Null main() {
    Int i = 3;
    println(i);
    i = 5; // This should produce a warning - variable is modified, but never read
  }
  ```
rules for unused X (type, variable, function, ...):
  0. Everythings starts marked as unused.
  1. Function `main` is used.
  2. Libexports are used.
  3. If a function is mentioned (and provably called somewhere?) in a used
     function, it is used.
  4. TODO (the point is, if two objects use each other but are not used from
     `main` or a libexport, they aren't used)
keywords: `continue;` sugar for `return true;`, `break;` sugar for `return false;`
for cycle sugar for the `loop` function:
  ```
  Bool loop(comptime Bool cond(), comptime Bool body(), comptime void increment()) {
    return cond() ? body() && (increment(); loop(cond, body, increment)) : true;
  }
  ```
the compiler must not create stores to memory where there are none?
only identifiers exported from `index.chalk` (or `main.chalk`) are guaranteed to
  be preserved by compilation? alternatives:
  - have `chalk.json` (like `package.json`) with a list of files whose exports
    are considered library exports
  - `libexport` keyword
  - `export module;` declaration at the start of a module
remove range for loop? there is forEach, anyway
function can prove invariants about itself, eg. that an optional type is not
  null if certain conditions are met
If every function self-invocation is the last executed expression, that function
  will be converted to a loop
what about funcitonal programming? lazy evaluation?
a way to unresolve a promise if it is still just waiting in event loop? (later: why?)
cancellable promises, can stop async functions, threads
enforce order of keywords - pub static
first-classish types?
what about gpu programming?
generate hidden classes that are return type of generator functions that use `yield`
variables - replace trait type with class type if known at compile time
function bind operator? `Function.bind((a, b, c) => a + b * c, 1, 2)(3) == 7`
for-else?
ufcs? member functions are accessible as `ClassType.memberFn`, not as `instance.memberFn`,
  `x.a(b, c)` is equivalent to either `a(x, b, c)` or `xType.a(x, b, c)`, the first
  form must not be used if ambiguous
compiler can edit code, eg. rename variable
what if a function returns a trait type that is backed by anonymous class? should
  that trait type be also treated as a class type? motivation - Stream:zipWith
  returns Self, should Self be Stream if it's produced by a generator? other examples?
documentation: allow notes that popup on underlined pieces of text, only use this
  when someone who would not gain any info from reading it knows he doesn't have
  to read it (this pretty much restricts its use for definitions)
inline assembly?
functions are const by default
```
class HashSet { /* ... */ }

shared class HashSet { /* ... */ } // thread-safe version ?
```
array of number should be a number?
append operator `~`?
`Object...` for variadic parameters, `T...` for variadic templates, `T[n]` and
  `T.length` supported
code coverage analyzer as part of compiler
optimization - if all classes implementing a trait are known and of similar size,
  local trait vars should be on stack
collection.add returns true if added, false if already existed
async function calls without heap allocations, possible?
++ as string concat operator? `a ++ b ++ c` sugar for `String.join([ a, b, c ])`
unittests? (D), comptime assert? something else?
for, switch - braces are optional if condition/whatever is inside parentheses?
closures are shared between functions from the same scope
reflection.createType? (or compiler.createType?)
TODO concurrency, green threads?
instanceof? is?
think about deffered loading of code so the whole application doesn't have to be in memory
  when it starts
chalk should be low-level enough so that an os can be written in it
unary ^ as bitwise negation?
remember `X.Y a;` is variable declaration even though `X.Y` is a member access
  operator, not a type
math assumption: all comptime functions terminate
should taking a pointer to a temporary object produce a warning, an error or nothing?
reflection:
  is comptime
  ability to detect if trait method is overriden
  If you'll support inspecting private members, only allow it in tests
generic types can be only class types or the declared trait type
something like linq (ie. inline SQL)?
Implicit type conversions: class to traits, trait loss and trait reordering
go's channels? can they be a class?
async functions and threads should be similar if possible and reasonable (?)
no empty statement (`;`), use empty block `{}` instead
no named parameter calls
a type can implement Nullable, save space if optional
function binding operator?
always infer generic params if possible
`shared` qualifier for concurrency?
dangling references and self deleting objects - how to make them compile-time
  errors, or at least predictably crash?
support calling an expression that is not a simple identifier, eg. `(a ? b : c)()`
optional - use same length as non-optional type if possible
functions types can have default parameters?
spec: known types - enforces restriction on some types in std
class can have `mut` members that are modifyable even if instance is `const`, must be private
disallow module-wide (mutable) state in libraries? or totally?
make void a class with just one instance so it can be used generically, eg `Promise<Void>`?
if `Int(Int)` is `Function<Int, Int>`, what is `Int<Int i>()`?
getters/setters? or unification of properties and functions without arguments?
function overloading creates duplicate variables, what to do with it?
can recursive foreach be transformed to stackless generator?
[Object-capability model](https://en.wikipedia.org/wiki/Object-capability_model)
  specify which parts of standard library a library can access in chalk.json
allow returning pointers to local variables, like go? - no, only UniquePtr can
  allocate on heap (and allocators)
const variable cannot be undefined
```
// How I imagine unit tests in chalk:

Proof mapTest(class K, class V, Map<K, V> map) {
  assume {
    K key;   // Let 'key' be an object of type K
    V value; // and 'value' an object of type V
    
    map.has(key) != value; // 'map' doesn't contain 'value' under key 'key'.
  }
  
  map.set(key, value); // After setting the value of 'key' to 'value',
  
  // TODO for all methods of map if they are not set/delete call them
  
  prove {
    map.has(key); // map will have key 'key'
    
    map.get(key) == value; // and it will equal 'value'.
  }
}
```
```
// Just an idea
assume {
  Proof modusPonens(Formula A, Formula AimpB) {
    assume {
      isTrue(A);
      isTrue(AimpB);
      Formula B;
      AimpB == Implication(A, B);
    }
    
    then {
      isTrue(B);
    }
  }
  
  isTrue(Or(Formula A, Not(A)));
  isTrue(Not(And(Formula A, Not(A))));
}
```
unify properties, getters+setters and functions? optional (or prohobited?)
  parentheses in function call without arguments?
anonymous class declaration (for use in generics and function parameters)
```
class Car : CML<{ ChildrenT children, String maker, ?Color color }> {}

<Car maker="Toyota" /> // Sugar for Car([], { maker: "Toyota" })
```
traits, true?: They can also contain member types and variables. Variables have
  implicit `get` access modifier and a method's default implementation cannot
  directly change their state.
const variable can be assigned once, not necessarily when declared?
detect out of bounds array acess at compile time if posisible
error: "Trait 'Type' cannot be explicitly extended (by a class)". 'Enum' extends
  'Type'. Can other traits extend 'Type' and 'Enum'?
file extension `.cdoc` where contents of \`\`\` \`\`\` are inverted, ie. text
  is code and code is text
equality operator for types?
warn on conditionals that are always true/false
what about transactional memory?
compiler
  1. warn if generic param could be replaced by trait
  2. warn on TODO comments
  3. warn if TODO is identifier
  4. specific error if TODO in code
comments must not be allowed everywhere, eg. this must be illegal:
  ```
  Int /*comment*/ i;
  i/*wtf why is this legal js*/+=1;
  ```
`trust` keyword to stop unsafe from spreading, compiler can ignore with `--notrust`
implicit Self generic parameter requires higher order types:
  ```
  Comparable x = 5; // Comparable<Int> with Int being implicit
  ```
  workaround: consider `Self` to be `Comparable`
semicolon must be omitted if preceded with closing brace
what about quantum computing?
```
/// Definition of a fixed space
Proof fixSpace(R f(T _), Set<T> s) {
  assume:
  T x;
  
  has(s, x) ==> has(s, f(x));
}
```
Error.ignore() - makes error not end the program when destructed
if a temporary immutable object creates another object of the same type (eg.
Regex.Expression), optimize and use only one object?
const function cannot return non-const reference to its member
shuffle order of destructor calls each compilation, warn if different orderings
  produce different results (with the exception of reordering debug messages)
interactive compiler, can autofix, suggests fixes, can apply them
initialization procedures for modules, run when a module is loaded, ?loading
  of module stops until all dependencies are loaded?, what about
  `import async X from ""`, to enable greater parallelism?
warning: condition is always true/false
  comparing with null literal is one instance (maybe make it an error, even)
comptime declaration - variable can be accessed by comptime code? think twice
  before adding this, it would allow non-pure comptime code
member reference? eg `Expr.equals(stringField, "a")`
prefer `--x=false` to `--noX`, `--fnoX` or similar, prefer .json configuration
  to parameters
part of standard library `init/`, not importable, contains initialization of
  program, even loop impl, etc.
  ```
  Void start(comptime const String arch,
      comptime const String os,
      comptime Module main) { // or `comptime Void main()` ?
    // Contents of this function are executed (the function is not called)
    // as the first thing when the program starts
    
    main.call("main");
  }
  ```
? `class StartSpace = Expr.classFrom(TODO);`
ideally formatter should tolerate multiple spaces eg. here:
  ```
  switch [ x, y ] {
    case [ false, false ]: a();
    case [ false,  true ]: b();
    case [  true, false ]: c();
    case [  true,  true ]: d();
  }
  ```
if `try { x } catch E { y }` will ever be part of chalk, make scope of y subscope
  of scope of x? warn if an object that was manipulated in x, but not in y is used
  after try block?


What should `null == null` be?

1. Always `true` - Floats are `null` instead of `NaN`, so this is against that
   standard. (TODO replace 'that' with that standard's name (no internet ATM (more parentheses)))
   Also, the reasoning that `NaN` shouldn't equal `NaN` applies to `null`, ie.
   unknown value shouldn't be confident that it equals other unknown value.
   Personally, I'm very much against this option.
2. Always `false` - consistent with that standard (parentheses! (TODO)), but I
   think this is going too far, see third option.
3. False unless it has the same address in memory, ie. is the same variable.
   This would technically also be against ((())), but:
   3.1 it's a very special case not likely to cause problems (prove me wrong),
   3.2 in this case, I believe it's justified, it's the standard that is wrong.
       An unknown value cannot know whether it is the same value as another
       unknown value, but it definitely is the same as itself,
   3.3 it would be consistent with how equality is checked in case of non-null
       values. `Object.equals` returns true if the arguments have the same address
       and calls `ParamType.equals` otherwise.
   The only downside I see is that this is the most complicated option, and
   might be confusing to those who don't know about it, but I like this one the most.

TODO redefine using `common type`:
If the type of either second or third operand of conditional operator is `noreturn`,
then the type of the return value and both operands must be `noreturn`.
If the type of either second or third operand of conditional operator is `void`,
then the type of the return value is also `void`.
If the types of the second and third operands are the same, then the type of return
value is also of the same type.
Else the return type of conditional operator is class X : All Traits Shared By Both
warn if this is used needlessly
automatically parallelize for loops with await if it doesn't depend on previous iteration?



```
Array.dimensionOf(nonArrayType) = 0
Array.dimensionOf(ArrayType<ValueType>) = comptime 1 + Array.dimensionOf(ValueType);
```

out formats - web, chalk (eg. c to chalk), (appimage?, exe?, elf?, own format?)
something-like-markdown to html/json

```
chalk run main.cpp # runs interpreter
chalk run .
chalk math proof.chalk # like 'chalk run', but ensures only math proofs are run, cannot contain other code
                       # make this secure behabior just a special case of run (maybe even the default one?)
chalk eval "noreturn main() { /* ... */ }"
chalk eval "2 + 3"
chalk repl
chalk translate file.js out.elf --readOnly // readonly means no formatting of source code
chalk install regerex npm/react-router
chalk publish . patch/minor/major
chalk debug out.elf
chalk fix file.chalk # first formats code? and interactively offers automatic fixes to errors
chalk help
chalk help ERRCODE # prints detailed help for error ERRCODE
```

```
// For custom smart pointer implementations?
trait Pointer {}

trait Object {
  static equals<T>(*?T a, *?T b) {
    if (IntSize.from(a) == IntSize.from(b)) return true;
    
    return T.equals(a, b);
  }
  
  static equals<Self>() { return false }
}

class T {}   - definition
T            - generic declaration
T : T1, T2   - generic declaration
T          a - polymorphic type
T : T1, T2 a - polymorphic type

function(class T x : Trait) {}

array constructor takes function that takes array and index as argument, constructs object there
compiler/interpreter is both cli tool and a library
  Function f = compiler.compile(["Int8 param"], "return param + 1;"); // cannot access local vars
  f()

trait Number {
  static N add<N : Number>(*N a, *N b) {
    N.add(a, b);
  }

  static ?N add<N : Number>(*?N a, *?N b) {
    return ?a && ?b ? Number.add(a, b) : null;
  }
}

Reflect.newClass // ?

// want optionally comptime params? do this: (maybe custom syntax for classes? or both)
void optionallyComptime(Int a, Bool b) { /* ... */ }
void optionallyComptime<Bool b>(Int a) { optionallyComptime(a, b); }


import { setSeed } from "std/random.chalk"

setSeed(i);


Trait1, Trait2 var;

trait X = Trait1, Trait2;
X var;


class X {
  const Bool b;
  
  /* ... */
}

class X<Bool b> = bake<Bool>(X); // Would be insanely cool if `bake` didn't need compiler magic


type Predicate<[]type Types> {
  ...Types terms;
  
  Bool truthValue;
}

type Quantifier {
  enum Type { uxistential, universal };
  
  String variableName;
}

type Formula {
  []Variable freeVariables;
  []Quantifier quantifiers;
  
  
}
```









