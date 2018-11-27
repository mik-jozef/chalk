first class fields? https://stackoverflow.com/questions/670734/c-pointer-to-class-data-member
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
it is an error if class members and class member initialization order is different
```
class A {
  new(B _, C _) {}
}

Null foo(b, c) {
  A a = A(b, c); // Equevalent to A a = unsafe undefined; A.new(a, b, c)
  A(b, c); // still valid
}
```
```
trait A {
  C foo();
}

trait B {
  D foo();
}

// ?
class E {
  C A.foo() {}
  D B.foo() {}
}

// this must work
class F {
  C&D foo() {}
}
```
json support, import json as object
`Reflect(var).set("x", 5)` reflect constructor creates object bound to certain instance
`fn.class.nestedFunctions.get("x");`
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
safe program should never enter an infinite loop (without consuming input)
`[[ std-call ]] Int() { return 42 }` or `@std-call Int() { return 42 }`
reflection of modules
focus on good debugger
 - ideally, debugger should be able to show out-of-order execution of instructions
   if there is more than one thread
ability to run source code deterministically (optional control over thread scheduler,
  faking filesystem and time)
levels of concurrency: (process pool, process, thread pool, thread - on potentially
  different cores), (coroutines - on the same cpu)
capabilities? eg. load a module that has only a partial access to standard library?
  capabilities of eval?
an allocator that uses pages reserved for inter-process communication
define well-formatted chalk program first, then define any chalk program as a string
  that differs from well-formatted
remote procedure calls? inter-process/over network
partial haskell-like self-referencing of variables?
haskel-like enums? `data X = A | B Int` -> `final trait X { class A : X {}; class B { Int i } }`
`class Lazy<T>; Lazy<Int>(() => 42)`
html could be part of chalk, a different syntax for sth like object literals (but I don't like the idea)
`X(...)` sugar for `X.new(ptr, ...)`
```
// Which one
[]String fn(Trait ...args) {
  class A = args[0].class;
  
  A a = args[0];
  
  Trait o : args { ... }
}
[]String fn([](type : Trait) argT, ...argT args) {
  assume {
    argT.length > 1;
  }
  
  []String ret = [];
  
  class A = argT[0];
  
  A a = args[0];
  
  Trait o : args {
    ret.push(o.class.name);
  }
  
  return ret;
}
```
libexports must be explicitly mut/const?, maybe that would be a good idea for trait methods, too
warning: potentially nonterminating loop/function?
```
Proof distinct(Object... rest) { // Or `*Object...` ??
  assume rest.length > 1;
  
  // Or `rest.Len a, b;` ??
  Nat a, b {
    a < rest.length;
    b < rest.length;
    
    a != b;
  }
  
  assume {
    rest[a] != rest[b];
  }
}

Nat a, b {
  distinct(a, b, 1);
}
```
terms that need to be defined: value, member, field (TODO rename field, because field is a mathematical structure), instance, object, scope, variable, symbol?
should const be transitive?
Set syntax: `Set<Int|String> s = { 1, 2, "abc" }`
What is `*mut Int i = 1;`? Options:
  - error: cannot have a pointer to literal. Seems unnecessarily restrictive
    because 1. `*Int i = Int(1);` works, and `1 == Int(1)` is true
  - error: assignment of const value to pointer to mutable type. Same issue as above
  - normal, 'i' now contains a unique value equal to 1; This means literals
    are evaluated each time they are encountered, like composite literals,
    but unline type definitions
Compiler optimizations:
  Assuming `Set<T>.subsets(Set<T>)` constructs the set of all subsets, this code
  ```
  Set<Int> s : { 1, 3, 9 }.subsets() {
    println(s);
  }
  ```
  should ideally not construct the powerset. If that's impossible (without the
  compiler special-casing the Set class/trait), maybe there should be
  `Set<T>.subsetsStream(Set<T>)`?
replace trait Number with traits Additive|MultiplicativeGroup, Field, etc?
  Would there also be a way to force classes implementing A|MGroup to also
  implement Field? - not a good idea, since Int is not a field (overflow results in null)
`permutationStream()`
if `stream is Stream<T>`, `[ a, ...stream, b ]` should create array of `T&a.type&b.type`
  if `stream.length` is known at compile time, `( a, ...stream, b )` should create
  a `stream.length + 2`-tuple of `T&a.type&b.type`
Rational numbers in stl? thay would have to have a big warning in documentation
  they are just for storing user input like `0.1`, not for computation
  maybe they shouldn't even implement Number
`class C = class<type A, type B> {}`? this should probably be an error
`class<type A> C = class<type A, type B> {}<Int, A>`?
`class<type> C = class<type A> {}`?
what about importing/rebinding all values with the same identifier?
A function/module/codeblock?-wide setting that would disable optimisations messing
  with time of execution of the function? This would have applications for when
  different execution times could reveal information that should remain secret.
  Or maybe a setting directly for that usecase? Would error if the function
  didn't have guaranteed constant complexity wrt some parameter?
Some way to guarantee time of execution overall, so that eg. program can be proven
  to respond in time X in all situations (assuming I'd have good mathematical model
  of the target architecture)?
`for-name { break-name } ?`
`import f, { a } from "x"; ?`
`[ ...a ] ?`
warning exported function returns nonexported class?
`Trait1&T2` instead of `Trait1, T2`
trait T { Null foo(); String { foo(){} } }
should the * pointer be ref-counting?
when exactly is a variable unused? When it's never read, unless it's exported (possibly indirectly), is a sufficient condition. Is it also necessary?
should const be transitive? should it be default for libexport?
compiler should inform about what it's doing (parsing files, comtime execution, transpiling, etc)
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
declaration inside *and* and *or* operators must be possible, scope for just
  the operators
literals are declarations iff their parent expressions created its own scope
  ```
  Null() {
    class A {}; // This is a declaration
    
    class B = class C {} // 'class B = ...' is a declaration, 'class C {}' is not
  }
  ```
Add compiler warning "useless trait type". Plenty of Java devs will do `Set x = HashSet()`
Ptr, UniquePtr, SharedPtr, (MarkSweepPtr?)
this should be a valid lambda, ie. shouldn't require parentheses: `[x,y]=>x+y`;
assert as keyword?
no global reflection like Reflect.types (array of all types), or anything similar
  not only would that be costly, probably have no uses, violate NO GLOBAL STATE,
  but also it could be dangerous, because compiling and runinng untrusted code
  should be safely possible
runinng untrusted code should be safely possible
functions must explicitly return, other blocks of code return the last expression
class Class - used in reflection, const and not copyable
this code `(a() => a())()` should execute in O(0), but should produce warning
  this expression has no observable effect
same, or analogous way of communication between threads and coroutines?
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
compile flag --provable-contracts: tries to prove things like reflexivity and
  transitivity of equals, etc
stats about compiling performance
think about memory management, how out of memory should be handled and granularized,
  both intra and inter-thread-wise
"nearly out of memory" event, prioritized to other events
synchronous `usedMemory(ThreadPool tp = ThreadPool.top)`, `avaiableMemory`
  and `freeMemory` functions
stl - permissions for things like playing sound, info about hardware, filesystem
  access...
  capability based permissions model
`mut` mutable, `const` immutable, no mmodifier only mutable using another reference?
for each function, find out the max amount of stack it needs, before another
  function will chceck for avaiable stack space
instead of blocking, a coroutine should message a thread that (and which) blocking
  operation needs to happen
go's channels?
can declarations be inside other expressions?
  ```
  Tree t(Node root(null, Node(root), Node(root)));
  ```
  I dunno why, but I get a bit haskelly feel from that and looks interesting
optimization: if a pattern where components pass properties in anonymous classes
  becomes common, and child components usually get less properties than the parent,
  and the properties are const, an interesting optimization might be to pass all
  the props anyway
a way to mark code as library code, or a convention that code in `lib/` is library
  code; its warnings are counted but not displayed by default
replace `return` with `ret` and `const` with `cst`?
should all class members be read-only for anything except the class they are in?
some recursive functions could preemptively allocate new stack for them?
go: abandoning segmented stacks just because of hot-split was probably an
  overreaction. instead of shrinking immediately as stack wasn't used anymore,
  the solution would be to
partial comptime evaluation?
should generics be replaced with functions that return classes?
what about generic functions? or type parameter inference?
something like go's select statement - allows exactly one communication
objects must not be placed on the stack if a pointer to them can escape to
  a longer living variable
shrinking allocated memory should be possible?
the runtime must we entirely written in chalk or assembly, must be compilable
  by chalk compiler. No dependence on C, C's stl, or any other non-chalk whatever
should all fields be modifiable in constructor and assign function?
request fast persistent memory - useful on pcs that have just a few GB of SSD
trailing comma allowed if closing parenthesis/bracket/whatever is on next line
Error class, destructor throws if ignore() wasn't called
prefer 'start - end' to 'start - length', because some types are orderable even
  if the difference is not measurable
warning: function can be static (if this is not used either explicitly or implicitly)
compile option: --aggresive-generics
optimize out object creation in argument instead of having emplace?
warn on `x && Int a(0)` (ERRCODE: Variable declaration in implicit scope);
small standard library, official packages in userland?
ability to inspect (and/or redirect) stdout? perhaps a compile time option that
  allows it?
function splitting optimization
`Object.shrink()`?
  shrinks all members, eg. unused memory in dynamic arrays, NOP for most objects
rust-like guarantees about object lifetime/mutability?
allocators
`import "x" using allocator`
What is the address of constants like integers and null? Also, what is `null == null`?
Should enums variables be pointers? Otherwise they would have to be explicit
  pointers anyway.
should composite types include functions?
regex - should classes be autogenerated from `Expr` instances?
What is a common name for program entities such as variables or types?
  In other words, identifiers bind to what? (I could just enumerate, but a common
  name would be useful.) I'd say value.
Should constant members be reassignable in the assign method?
what about coroutines?
  if closures are supported, should using a suspended coroutine as closure
  be supported?
continuations? delimited/not
could go's channels be replaced by thread-safe promises?
go keyword? or other easy way to create threads/parallelism
must main return `None`? Note this wouldn't prohibit actually calling it and
  have it executed
are pointers their own types, or are they type modifiers?
Are classes types, or is there just a bijection between classes and class types?
package manager
guaranteed copy elision in as many cases as possible
  eg. in `void f(Bool b) { b ? { shortCode } : { longCode } }` `f(true)` could be
  inlined and `f(false)` not.
function and type definitions are hoisted
html+friends as gui
audio library
if assignment has side effects, should they happen when assigning to blank identifier?
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
TODO make sure async functions and generators are orthogonal.
mark files/folders as resources (to be included in executable/compiled too)
`--shutUpAndCompile`? used to compile (i suppose usually legacy c/c++) code with
  errors someone is not able to fix
  Only prints: "I hope you know what you are doing."
`--assumeCorrectCode` compiler flag, so compiler doesn't have to spend time checking for errors?
  if this exists, it will definitely be on under `--shutUpAndCompile`
?Int should be of the same bit length as Int, smallest value used as null?
  overflow and underflow should result in null? unless using wraparound operators?
  Operator trying to assign potentially null to Int, (not ?Int) should 1. be
  compile error (maybe only under compiler flag like `--strictMath` for plus and
  minus) or function- or module-wide setting; 2. be a runtime error
  There could be a type like TCInt (Two's Complement Int) such that `?TCInt` is
  wider than `TCInt`, ie. it behaves like Int in all other programming languages
It must not be possible to do anything as crazy as javascripts turing complete
  subset from `[]()!+`. security-wise, it must be easy and not unntuitive to
  create a code sanitizer that works with chalk AST
if 0 tuple is allowed, should `type Null = ();`? or should null be an enum?
hot deployment of code
lazy loading? `Module m = import("path")`
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
prevent cycles in pointers?
`chalk --silent` minimum text output
IDE could add grey text to multiline constructors (in <>):
  ```
  Html(
    Head(
      ...
    ) <Head>
    Body(
      ...
    ) <Body>
  ) <Html>
  ```
  it could also highlight lines that contain highlighted parentheses
feature that would enable program to drop loaded parts of itself when memory is full
  think react router that lazily loads and sometimes unloads parts of website
`Int` numerical overflow should throw, `WrapInt`
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
named lambdas? for one-liner function/method declarations
  `getSize() => size`
should member initializer lists be part of chalk?
  yes. left out == initialized with default constructor
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
warning - unnecessary `this` - or even better - this shouldn't even be part of Chalk
compiler should print errors backwards?
only indent 6 spaces if code follows
TODO what about type modyfiers for function variables? (are they necessary?)
  ```
  Null const shared foo() {
    bar();
  }

  Null const shared foo() = baz;
  ```
vocab like "member", "static member", etc must be defined
  ? member - anything declared in a class
    field - member variable
    method - member function
    nested class/trait - class/trait defined inside another,
                         note member class variable is not (necessarily) a nested class
    type - trait, class, function or a composite type
    composite type - type union or type intersection
first-class properties?
`is` relation vs `is` operator
  ```
  Car.prop = foo() ? wheels : doors;
  ```
should enum be a keyword? what about `class Dirs : Enum { W, A, S, D }`
```
enum X<A> { a, b, c }

X.a is A // true
```
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
    like position in physics (because of threads), ie. it must not be part of
    semantics unless one statement depends on the other
  - comptime arithmetic must evaluate whenever possible
compiler must comptime execute pure functions with all arguments known at comptime
variables that are written to, but never read should be marked as unused
ffastmath should be default behaviour unless overriden by a compiler flag,
  or a module- or function-wide \[\[strictMath]] directive
Behavior of a program must be completely specified by source code.
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
keywords:
  `continue;` sugar for `return true;`
  `break;` sugar for `return false;`
  `break x;` sugar for `return x;` ?
  for cycle sugar for the `loop` function:
  ```
  Bool loop(comptime Bool cond(), comptime Bool body(), comptime void increment()) {
    return cond() ? body() && (increment(); loop(cond, body, increment)) : true;
  }
  ```
  ```
  // For can also return user specified values
  Ret x = for ... {
    ... && break Ret(1);
  } else Ret(2);
  
  // Keyword break can stop named outer loop, too
  for-label {
    for { break-label 42; }
  }
  
  // if there are just 2 subexpressions in for head, initialization is omitted
  for x < 3; x++ {}
  
  ///
  Return type of 'for' expression is the common type of all 'break' expressions
  and the 'else' part of the 'for' expression (if the 'else' part is not explicit,
  it implicitly returns 'true'). However, smart typing should be able to detect
  that the type of `for { break 7; }` is Int, not common(Int, Bool).
  Same with 'and', 'or', ternary operator, and switch expression.
  ///
  ```
```
[ 0, 1 ] + 2 == [ 0, 1, 2 ] // ?
[ 0, 1 ] ++ [ 2 ] == [ 0, 1, 2 ] // ?
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
`Ast a = { Int i; };`
ASCII only, including proofs. No single-character greek variable names.
website should require little internet connection (fast load times important),
  be single-page, reference should be interactive (eg. instant search of definitions)
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
go's channels? can they be a just part of stl? How are they different from
  `Stream<Promise<T>>`?
is `AsyncStream<T>` necessary? or is `Stream<Promise<T>>` enough?
async functions and threads should be similar if possible and reasonable (?)
  would it be possible to have things like locks and memory fences only if
  interacting coroutines happen to be in different threads?
no empty statement (`;`), use empty block `{}` instead
no named parameter calls
`T t = undefined` should not be unsafe code, it should just error if variable is
  - written to if not known whether defined
  - read if possibly still undefined
a type can implement Nullable, save space if optional
function binding operator?
algebraic data types? (`data D = A Int | B Int Int`)
  should they be merged with enums?
  ```
  enum Tree {
    Leaf Int,
    Leaf Tree Tree Int;
  }
  ```
debugger should be able to output stack trace with library methods hidden
stack overflow should not happen unless there is no memory at all
always infer generic params if possible
```
// Indentation

class A {
  Foo f;
  
  new(Int param)
    : f(param) {} // Two spaces, because next line is not indented more than current line
}

class B {
  Foo f;
  
  new(Int param)
        : f(param) {
    f.bar();
  }
}
```
`shared` qualifier for concurrency?
`Box.toRefBox()`, `RefBox.toBox()`, or constructors (the latter only if there's
  just one reference)
`RefBox` vs `RcBox`?
`del()` destructor
how could a pointer assign null to itself? `this is Null` will likely be always false, or not?
dangling references and self deleting objects - how to make them compile-time
  errors, or at least predictably crash?
support calling an expression that is not a simple identifier, eg. `(a ? b : c)()`
optional - use same length as non-optional type if possible
functions types can have default parameters?
`Object(Object... o)` subtype of all functions?
standard library should contain complex numbers and quaternions
variable stack frame length: if some variables are only created in a later part
  of a function, preceding function calls can use part of the stack frame of
  current function
replace `a?b:c` by `if a then b else c`?
warn on compile-time known branches
types A, B are identical if A is B and B is A
warning for labels unused
use STL instead of STD as abbreviation for standard library?
  motivation - std is not a good abbreviation, because when I hear std, I think
  of something else, however, stl isn't much better - it sounds like steel.
  I'd rather want something short that makes me think "standard library" immediately
Is `class|Int` and `class|Int` allowed? If
classes and traits must have uppercase starting letter, other variables must have lowercase starting letter
for statements - support all `for {}; for cond {}; for cond; inr {}; for init; cond; inr {}` 
compiler - if a nullable `value` is unsafely used as non-null, assume it is non-null,
  but still warn on compile-time known branches like `value == null`.
  Warn if all branches do the same (I've seen too many `if x { a() } else a()` in
  beginners' code).
proofs - explicit proof passing vs local state
no undefined behaviour - safe code must be completely deterministic
cross-compiling should be as easy as normal compilation, no building compilers from scratch
chalk (the software tool) should be a compiler, package manager (both client and
  server), version control and documentation generator.
  As version control, it should support pluggable diffing (eg. someone could write
  a diffing plugin for images, or database files), language definitions (eg. plugin
  for lua) and maybe documentation generation
`chalk clean` remove what can be generated/downloaded
don't even support `T a = ..., thisSecondDeclarationAfterEquals;`? `T a, b;` should work, though
array/tuple of iterables is also iterable with its contents, eg.
  ```
  ( A a, B b ) : ([m,n],[o]) { executes for (m,o) },
  ( ?A a, ?B b ) : ([m,n],[o]) { executes for (m,o) and (n, null) }
  ```
`(n)T` syntax shorthand for n-tuples of 'T'?
use `[]` for both array and tuples? that would be right if I decided there should be one-tuples, `[T]`
reflection: `fn.ast is ?AST`
version control should be transactional, and it must not be possible to corrupt
  history like in git
compiler: languages to bytecode should be translated with plugins
support for microchips programming
anonymous classes implement Anonymous trait
  use case: map constructor that takes objects as params
compiler: option to assign max time to optimizations, max space of binary/additional
  space due to optimizations (todo count negative space?)
customized error messages (eg contain names of affected variables)
What about finite fields? Will they get some love from stl?
  ```
  FField<17> a = 3;
  a ** -1 // 6
  ```
compiler should emit an error by default if it cannot prove program will terminate
  (not exactly terminate, consuming infinite input is fine)
  (code can suppress this error?)
what is `class is class` (because of generics, eg. `Set<class>()`)
maybe rename the `is` relation to `extends`?
module-wide destructuring
tuples
compiler should be able to export program to a single html file
  ```
  (Int, String) a = (2, "hello");
  
  (256:Int) fixedSizeIntArr;
  (256:Int,String) 257Tuple;
  
  (Int i, String str) = a; // tuple destructuring, pick one
  ( Int i, String str ) = a;
  
  ( i, str ) = (3, "world");
  ```
documentation must handle the fact that documentation comments may be overriden
  by other documentation comments when variables are re-exported
  - maybe a message like "Declaration imported from [x](/link/to/source.chalk)"
    where `source.chalk` is the module where `x` is imported from
  - re-exports without a rewriting documentation should contain message like
    "Declaration and documentation imported from \[...\]"
a way to distinguish external and internal documentation?
type assertions that panic if incorrect?
if chalks website will contain an IDE, it should allow multiple people to edit
  the same file in real time, like google docs. This should be optional
`Bool ( a, b, c ) : Bool.combinations(3) {}`
all comments should end with a dot or a comma?
if it is error if yield is in lambda, compiler should explain the error so that
  it explains why exactly yield cannot be used here
map.inverse()
for loops must await their previous iterations by default
debugger's ability to inspect comptime values
what can be provably deadlock/livelock free?
make a mutable value const? (eg. before sending it to other thread)?
path analysis must recognize that after `cond && return`, cond is false, in
  particular, smart typing must recognize that after `x is T && return;` x is not T
http://blog.reverberate.org/2012/04/it-not-bug-it-subtle-unsupported-corner.html
  NO. never do this
should the semantics of return statement be use the fact that it returns None
  to prove that no code after it executes? That would mean returning None would
  not end program, it would just end current scope
debugger - all of this: https://developers.google.com/web/updates/2018/05/devtools
comptime variables? (accessible by comptime code)
  ```
  comptime []Subcommand subcommands;

  comptime String help() {
    String helpStart = "...";
    String helpEnd = "...";

    return helpStart + subcommands.map(a => a.help).join("\n") + helpEnd; // Optimization: `subcomands[x].help` points inside returned value of this
  }

  subcommands.push(Subcommand("help", () => print(help())))

  ///
  # Multiple issues:

  1. Comptime is no longer pure and local
  2. Perhaps illustrated by this example - help should not be a function, but
     a variable. But in that case, there's a problem with order of execution: `help`
     depends on `subcommands`, but one subcommand, and therefore the `subcommands`
     variable as well, depends on `help`.
  ///
  ```
some (all?) errors and warnings should not be part of AST definition, but the
  transformation rules. Errors should be able to back-propagate to a position
  in sourcce code
class cannot be instantiated if it has no fields
```
// Pointers to fields?

class A {
  B b;
}

class B {
  C c;
}

A::B::C foo = c;
*A::B::C pA = A(); // ?
A::B::*C pF = foo; // ?
```
pointers:
  ```
  = assign
  := assign to a pointer
  ::= etc. or maybe in reverse?
  ```
compiler must warn if it cannot prove comptime code terminates
auto-convert `struct snake_case` from C to `class SnakeCase` in Chalk
```
static class Namespace {
  Int a; // Automatically public.
  
  static Int b; // Warning: reduntant keyword 'static'.
  
  new() {} // Just a normal, static function
}

Namespace.new();

Namespace n; // Error: cannot instantiate static class.
```
non-exported types should not be acquirable to outside code? possible paths:
  through reflection (Type.getSupertype)
  returned from function
`final trait` only extendible in its own (module/library)
  ```
  final trait T {
    own A : T {}
    own B : T {}
    own C : T {}
  }
  
  T.subtypes is []class;
  T.subtypes == [ A, B, C ];
  ```
```
?A foo() { randBool() ? A() : null }

A a = foo() ?? A();

Null bar() {
  A a = foo() ?? return;
  
  a.baz();
}
```
```
// ???
type Empty == |;
type Object == &;
```
starting stack shouldn't be any special from other stacks (of other threads,
  coroutines maybe)?
pools as hierarchical collections of threads
  - resource management
  - ability to move couroutines, threads and pools between pools
promise/coroutine cancellation
why does async have to be explicit (`Promise<T>` instead of just `T`)?
  because otherwise every function invocation would possibly block,
  which opens too much problems with race conditions
spec: known types - enforces restriction on some types in std
https://github.com/Kotlin/kotlinx.coroutines/blob/master/coroutines-guide.md
http://cr.openjdk.java.net/~rpressler/loom/Loom-Proposal.html
const variable can be assigned only once, not necessarily when declared?
```
class X {
  Null foo(Int i) shared const {}
}

Null fn(shared const X this, Int i) = X.foo;
```
`!is` operator sugar
`Box` (Chalk's `UniquePtr`) should be copyable, should copy the object, too
`Ptr` (aka `*`) should either be set to null if its referred object is destroyed,
  or it should keep the object alive TODO
`UnsafePtr` is like a pointer in c++ - no controls
no as-if rule in spec - the need for explicit as-if rule means badly defined
  semantics, it should follow from them instead of having to be part of the spec
should all variables be secretly pointers, as in Java?
switch - `default:` vs `case _:`?
returning local type returns `null`
  ```
  class A {}
  
  class X() {
    class B {}
    
    return randBool() ? A : B; // Error: cannot convert type class|Null to class.
  }
  ```
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
warn on `((x))` double parentheses, maybe all unnecessary parentheses?
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
immutable class? (with value semantics for comparision?)
`comptime!` for params that have to be comptime evaluated?
class of compiler optimizations that just work when optimizing already partially
  optimized code, but create warning if applicable to code,
  eg. `cond ? return true : return false`
const function cannot return non-const reference to its member
shuffle order of destructor calls each compilation, warn if different orderings
  produce different results (with the exception of reordering debug messages)
interactive compiler, can autofix, suggests fixes, can apply them
initialization procedures for modules, run when a module is loaded, ?loading
  of module stops until all dependencies are loaded?, what about
  `import async X from ""`, to enable greater parallelism?
warning: condition is always true/false
  comparing with null literal is one instance (maybe make it an error, even)
something like markdown for comments
warning: expression has no effect
```
class SmartPtrExample {
  dealloc() {
    this is Null ? this = null : panic();
  }
}
```
```
Bool b;
T a, b, c, d;
T a, b, c, ;

b ? a : b = c;
```
should variables be autoinitialized or should they be uninitialized before they
  are assigned a value? in every case, uninitialized variables must not be read
package manager - put emphasis on finding packages
optimization: replace arr[i] in i-lops by arr and i++ by arr++
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



the return type of `c ? a : b` is the common type of `a` and `b`.
common type of `None` and `T` is `T`, where `T` is any type
`a orelse b` equals `a` if not null, else `b`
~ vs ! as bitwise negation?
array concatenation operator
warn if `this` keyword is used needlessly
automatically parallelize for loops with await if it doesn't depend on previous iteration?
  or a different syntax for parallel/promise-parallel loops?



```
// Or maybe Array.depthOf
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
chalk eval "None main() { /* ... */ }"
chalk eval "2 + 3"
chalk repl
chalk translate file.js out.elf --readOnly // readonly means no formatting of source code
chalk install regerex npm/react-router
chalk publish . patch/minor/major
chalk debug out.elf
chalk fix file.chalk # first formats code? and interactively offers automatic fixes to errors
chalk help
chalk help ERRCODE # prints detailed help for error ERRCODE

chalk hotdeploy pid ./code # ?
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

trait T { foo(); }
class A : X { foo(){} }
class B : X { foo(){} }

A|B is X // True
A|B x = bar();
x.foo();

[ T t, Int index ] : tArr {}
```
















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
custom smart pointers?
problem - class declaration is a statement, not an expression
anonymous classes syntax: `class { Int a, Int b }` or just `{ Int a, Int b }`?
smart casts (kotlin)
`final trait T {}; class A : T {}; class B : T {}`, is ` T is A|B` true?
break; continue;
container.firstMatch
how to import identifiers with underscore:
  ```
  import { a_b: aB } from "ugly.c"
  import { a_b } from "ugly.c" // Error: identifiers cannot contain underscore
  ```
warning: multiple imports from the same file
must a const variable be initialized when declared? Would be convenient if not
chalk version control and package manager - private issues, report vulnerabilities
error - have a special error message for type mismatch error if assigning to
  variable of type `?*T`. Instead of focusing on potential assignment of... uh oh...
  what is the difference between assigning `T()` to `?*T a` (should always work)
  and to `[]T` on invalid index? what error should that be?
  source of the problem - next issue
`A|B foo = A(); foo = B();` what is the second expression? is it an error? It
  definitely isn't a call to function assign, because foo's value is of type A.
  And what about pointers?
  ```
  A|B foo = A();
  *A a;
  
  foo is A && a = foo; // Smart casts
  
  assign(foo, B());
  
  ///
  What is a? Could if efficiently become null (if it was of ?*A)? Is this
  compile-time error? Should smart casts be modified? Should type reassignments
  be disallowed? Should all values in unions be stored on heap, with type
  reassignment allocating new object (and old object would continue to live)?
  Would the last option mean that *T|X could point to T?
  ```
if all variables will work like in java, have a `trait ValueType {}`.
IDE when let keyword is used instead of types (just once for parameters), compiler
  could automatically replace it with a correct type it can guess, or create error
warn on `for true {}` - replace with `for {}`
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
how could `T fn(...)` in `10.map(i=>fn(i, ...))` get access to previously computed values
  in array? the alternative (first declaring, then assigning) requires `?T` instead of `T`:
  `a = Array<?T>(10); ( *?T t, Int i ) : a {...}`
conversion between tuples and arrays?
```
Null foo(A a, B b) {
  assume {
    isNice(a);
  }
  
  a.bar(b);
  
  Proof() {
    ...
  }
}
```
problem: T.equals must be computable, and thats bad for classes like Nat and ZFCSet.
  maybe they shouldn't be classes, byt pure types?
  a solution for these particular types is:
  ```
  class Nat {
    *Nat predecessor;
    
    static equals(Nat a, Nat b) => a.predecessor == b.predecessor;
  }
  
  class Set {
    []Set elements;
    
    static equals(Set a, Set b) => a.elements == b.elements;
  }
  ```
  However, I'm unsure if there is always a workaround.
`move(dest, source)` - moves source to dest (and assigns null to source?)
