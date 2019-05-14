Possible additions:
```
class A<type T, Bool b> {}

class<type T> = A<T, false>; // This must work?
class<type T> = foo(T); // foo must be a pure function, but what if it isn't injective?
```



Other:
Think hard about doing away with pointers. First, in most cases, the performance
  gain from tight control over what is where in memory is probably not worth it
  (performance usually depends on a small parf of code). Second, when such control
  is needed, maybe it should be used explicitly with something else.
  
  Maybe revert the notation? `T` is a pointer, and `*T`, or similar is a value type?
class members must be in the same order as in the class member initialization list
chalk diff - smart diffing, recognize when variable is renamed
```
trait A {}
trait B : A {}

Null foo(A) {}
Null foo(B) {} // is this legal?
```
ChalkDoc: multiline code in asides (lines starting with \>) must be supported.
should it be possible to hide classes supertypes from reflection?
```
// this should be well-formatted:
Html html(
  Head(),
  
  // This comment must be legal
  Body(), // This comment should be illegal
);
```
functions return `Null` by default?
make a difference between propositions that must hold for a particular program
  vs propositions that must hold for a particular piece of code, no matter how
  it's used
`chalk modules`
`chalk modules list` - lists all chalk modules and their commands:
  code, compiler, package manager (maybe split to client and server?), version control, gui?
`chalk modules install`
`chalk modules uninstall`
```
class C {
  int a = 3;
  
  pub Int b = 3;
  
  ///
  This needs to be true no matter how the class C is used, here the compiler should
  be able to autoprove it.
  ///
  All C c: c.a > 0;
  
  // This must be proven true about all instances of C that exist in the program
  assume All C c: c.b > 0;
  
  // This must throw an error, because a piece of code could set 'b' to -1;
  All C c: c.b > 0;
}

C c();

c.b = -1; // This must throw an error because of the `assume`.
c.b = bar(); // if 'bar' is sufficiently complicated, this must require a proof that it returns positive numbers only
```
named propositions: `prop P = All C c: c.a > 0`? TODO `prop` vs `class`
Chalk is a programming language, and a collection of tools, including a compiler,
  package manager, and version control system.
convert return and yield to function if they are not the top-level expression?
  ```
  Stream<Int> foo{
    bar(yield);
  }
  
  bar(Null fn(Int)) {
    fn(3);
  }
  
  foo().next() == 3 // ?
  ```
maybe unify preferred whitespace for objects and function calls,
  ```
  aFunction
      ( multiline
      , arguments
      ); // makes me think if method calls should syntactycally expect a tuple
  
  // vs.
  aFunction(multiline,
        arguments
      );
  
  // Objects are clear
  auto x =
      { a: 1
      , b: 2
      }; // Should this generate a warning: use enum instead?
  ```
maybe do away with semicolons? or replace with commas?
  ```
  { 1, 2, 3 } // Block of code, returns 3
  ( 1, 2, 3 ) // Tuple, returns ( 1, 2, 3 )
  
  foo(),
  bar(),
  
  Int a, b, // This is probably a definiteve argument against.
  ```
unlike coq, proofs in chalk must be readable by anyone who has a familiarity with
  a programming language and proofs in natural language
  ideally, it would be so intuitive that anyone with a familiarity with proofs
  in natural language should be able to start proving in chalk by just looking
  at a few examples and copying what he sees
order of member initializations should be determinad according to the same rules
  that determine order of module variable initializations
`&` for weak pointers?
c-like pointers (not smart) that must be provably
Transactional memory, even intra-thread? (on resources with multiple references
  to it)
how to make proofs and libraries work together? prover shouldn't look at library
  internals to prove things about the code, because it cannot discriminate
  between current implementation and guaranteed behavior
  Compiler should only take into account those props that are exported.
  However, maybe the code using a library could be able to `assume` props that
  the compiler would then try to prove using library implementation too?
should it be a warning or an error if an async function is called without
  either saving a reference to the promise or using await?
  should a keyword `nowait` be required if async function is called and not awaited?
  The purpose would be to prevent bugs where the await shoud have been there
`const`, (`immutable`?) would return their subexpressions, except constant/(immutable?)
should modifying `shared` variable be possible outside `shared` code? Ie. should
  every such manipulation become implicitly `shared`?
an interface A satisfies an interface B when every valid call on B is a valid call on A
  ```
  final trait T {
    static class A : T {}
    static class B : T {}
    
    foo(T);
  }
  
  // This class is valid, even though it doesn't have foo(T), because T is final
  class : T {
    foo(A) {}
    foo(B) {}
  }
  ```
copying streams?
  ```
  auto a = [ 1, 2, 3].stream();
  auto b = a; // ?
  ```
pure and functional version of Chalk? (with a different file extension)
binary format of values usable for both serialization and permanent storage
do not create event loop unless a program uses it?
`chalk gui/frontend 345` - creates a visual gui for the tool at a local port and prints
  the url (eg. `http://localhost:345/main`)?
issue tracking - let developers customize issue creation form, eg. to include
  dropdowns for categorization of the issue (to automatically assign labels)
if an expression ends with `}`, it shouldn't end with a semicolon
either have all values on heap by default, or warn if a reference to a local
  variable could potentially outlive the variable
should comptime type creation be allowed? if so, should it be possible
  to use interfaces of comptime-created types? I do not like the idea of
  type correctness depending on results of provably terminationg (or even general)
  computation.
destructuring anonymous object that has extraneous members should be a warning
a subset of chalk with its own file extension that could be used instead of
  json? Only those parts that do not cause computation/only pure computation
  would be allowed. The advantage would be enums, custom types, no need of
  a scheme (correctness could be checked by constructors, for example)
  `.purechalk`?
expression has no observable effect warning should be also produced when an
  expression E has a subexpression S that has observable effect, but E could be
  replaced by a smaller expression that has the same observable effect as S, eg.
  `b && b && print("a")` if `b` has no observable effect
  `b ? true : false`
function literals should produce only one value per program run?
If spec becomes too long, maybe support only displaying some parts?
  ChalkMark could support this in general
nested forEach?
  ```
  // Prints 235
  Int i : []Int arr : [ [ 2 ], [ 3, 5 ] ] {
    print(i);
  }
  
  // This is uglier, but something smilar should be possible maybe?
  Int i : []Map map : [ ... ] { map.get("numbers") } {
    print(i);
  }
  ```
There should be no static/global state - no module-wide variables, static variables,
  etc.
  if this was true, dependency management would be a lot easier.
  This aproach is be consistent with "no global anything" - no global variables,
  no global reflection, no global state.
  This improves code locality.
class is static if all contents are static vs if it has static keyword
  - the second. Static classes cannot be instantiated.
  - can empty classes be?
standardize what a compiler must be able to prove, eg. when it's known at comptime
  what branch is taken
Instead of calling the main function, the first code should be instantiation of
  the `Main` class? Or either? Should it necesarily be in `main.chalk`?
```
pub class A {
  Int a = c + 1; // Warning: initialization expression is never used
  Int b = c + 2;
  Int c;
  
  new() : a(3) { // Member initialization list overrides initialization expression, happens at the same time
    c = 4; // body of new executes after all members (except undefined-initialized) are initialized
  }
}

///
If file.size > maxSize, returns, first maxSize bytes and a file descriptor to
an open file at 'path'? Or returns null?
///
dir.readFile(path, maxSize);

JSON json = dir.readFile(path, JSON); // ???

A().a == 3
A().b == 2
A().c == 4
```
`Int a, b;` allowed, `Int a = 1, b;` error?
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
set `Int` width per program, module, function?
maybe `Int` should be defined as `?T` for `T` one of `Int8/16/32/64`?
nullable types to give meaning to `null += 2`? what would the consequences of
  this for the type `Null` be? Could it still be an enum/a class? Would it require
  type conversions between these nulls?
json support, import json as object
maybe pointers should have a private assign method a friend function assign?
should traits be able to have friends (passable to classes), and specify private
  methods?
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

chalk should allow control of every memory allocation
html library for gui, chalk to webasm
generics with types as arguments? eg. `Array<class C> c = [ Int, Bool ]`
division accepts maybe numbers and returns maybe number, can return a number if
  denominator is provably not null
make REPL async (ie. it should be possible to `await` in REPL)
propositions error if not proven true by default, can be made to only warn
immutable: allow "eventually immutable"?
optimizations should provably not change the program
safe program should never enter an infinite loop (without consuming input)
`[[ std-call ]] Int() { return 42 }` or `@std-call Int() { return 42 }`
reflection of modules?
things like syntax errors shouldn't be part of syntax definition, they should be
  added somewhere else
warning - local type exposed but not exported?
should function types be type templates?
a way to turn off standard proofs analogous to turning off the default import
  if someone doesn't like the law of excluded middle or doesn't want to assume
  the Ints, he can get rid of that
focus on good debugger
 - ideally, debugger should be able to show out-of-order execution of instructions
   if there is more than one thread
levels of concurrency: (process pool, process, thread pool, thread - on potentially
  different cores), (coroutines - on the same cpu)
coroutines? stackless/stackfull, symmetric/assymetric
`Object.pointers()` - if an instance stores some pointers not as pointers, this
  function should return all such pointers
capabilities? eg. load a module that has only a partial access to standard library?
  capabilities of eval?
warn if C macro is expanded in a way that changes the ast (eg. `a * add(a,b)`,
  where add expands to `a + b`)
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
terms that need to be defined: member, field (TODO rename field, because field is a mathematical structure), scope, variable, (symbol?) instance/member variable
should const (and immut) be transitive?
delayed initialization?
  ```
  immut Int i = undefined;
  
  
  ```
`Bool Arr<T>.all, Bool Arr<T>.any, T Arr<T>.some`
should all member variables be read-only to other non-friend classes?
  No, because some classes just store multiple vars. And there's `get` for that.
`Collection.pop` - remove and return one element
`Collection.dispense/drop` - (a)synchronously removes all its contents
  maybe with some real-time guarantees?
  ```
  // Eg:
  ?Promise Collection.dispense(Int i) {
  for-inf {
      for i {
        this.pop() || break-inf;
      }
      
      await;
    }
  }
  ```
`await` must always pause function's execution. Should there be `await?` that
  only pauses when necessary?
`await;` - pauses function's execution, returns `null`.
`promise.then` must always fire after the code that called it finishes
ChalkDoc (or ChalkMark): `[[abc]]` refers to a definition (of "abc").
  Each definition is associated with a header in an article.
  If the heading is in the current article, definition is underline dotted,
  else it is a link.
  On mouseover, the definition is displayed, on click, focus is moved to its
  associated heading
a function is defined by one or more function literals
should there be function type conversions, and functions would only hold instances
  with precisely their signature, or should function types be part of the is
  relation, and be able to hold functions that accept more than their signatures
  disclose?
  ```
  Null(Int) foo = Null e() {}; // This should be allowed
  Null() bar;
  
  foo is Null() && bar = foo; // Is this allowed?
  ```
make clear the distinction between `Null foo()` and `Null() foo`
variable scope is
  0. from its definition to the end of block, if its parent is that block, else
     only inside itself and its subexpressions; or:
  1. from its definition to the end of the parent expression
Set syntax: `Set<Int|String> s = { 1, 2, "abc" }`
What is `*mut Int i = 1;`? Options:
  - error: cannot have a pointer to literal. Seems unnecessarily restrictive
    because 1. `*Int i = Int(1);` works, and `1 == Int(1)` is true
  - error: assignment of const value to pointer to mutable type. Same issue as above
  - normal, 'i' now contains a unique value equal to 1; This means literals
    are evaluated each time they are encountered, like composite literals,
    but unline type definitions
`!is` operator
maybe switch shouldn't have any continue or fallthrough expressions
a way to call default implementation from a trait of a method, if it is overriden
  by the class?
unary minus should not be an operator, but a part of number literal
should objects in variables of type `?T` be convertible to `Bool`?
Should `1 < 2 < 3 <= 3` be valid and evaluate to `true`?
getters? I definitely don't want setters, but getters could be acceptable,
  provided they are pure
locality of errors: changing a piece of code should ideally produce error
  at or close to the change.
  This is why I'm worried about proofs in code - if there is semi-successful
  (and it can never be totally successfull) autoproving, changing an invariant
  could theoretically produce seemingly unrelated errors anywhere in code, if
  it means the auto-prover is no longer able to prove what it needs to prove
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
  implement Field? - not a good idea, since Int is none of these (overflow results in null)
`permutationStream()`
replace generic types with functions returning types?
  ```
  class Map(any Key, any Val) => class {
    // ...
  }
  ```
this should be error: (?)
  ```
  Int i = 3;
  Float f = i;
  ```
`pub class {}`, also chceck all other keywords that might apply to the whole class
if `stream is Stream<T>`, `[ a, ...stream, b ]` should create array of `T&a.type&b.type`
  if `stream.length` is known at compile time, `( a, ...stream, b )` should create
  a `stream.length + 2`-tuple of `T&a.type&b.type`
warning: the y combinator is not suitable for an imperative language, please use ordinary recursion
  if sth like `f => (x => f(()=>x(x)))(x => f(()=>x(x)))` appears in code
  ... actually this would probably be a type error :(
  But maybe infinite types should be supported. another use case: in the tokenizer
  of the simple js interpreter, there is a map of type that is close to being
  `T = Map<String, T|Bool>` (which should perhaps be rewritten to
  `T = Map<String, (Bool, T)>`). In this specific case, the type is not actually
  infinite, because there is only finite amount of self-reference. However, the
  alternative , which is `Map<String, Map<String, Map<String, Map<String, Map<String, Map<String, Bool>|Bool>|Bool>|Bool>|Bool>|Bool>`,
  is bad for several reasons.
  Also, streams are a hack replacement for `T = A -> (B, T)`
  Should `Self` be allowed in the type parameters? eg. `Map<String, (Bool, Self)>`
  That would also make `Self` a keyword
do switch statements have to be exhaustive?
set comprehension?
`new() {}` initializes all members, `new() : {}` defers initialization of missing members to the body?
```
Map<A, B> a, b;
Map<A, (B, B)> sum = a ++ b; // Note the type

// But a Nullable class that overloads ++ could, and perhaps should, be provably a monoid :(
// Maybe in that case ++ should only be applicable to a map to Monoid and apply ++ to the
// elements of the map?
```
what should `exprA|B` in `for exprA; exprB; {}` be? i guess init and cond
remove `let`?
add a quantifier which means `mut`, `const` or `immut` when `this` is `mut`,
  `const` or `immut`, respectively?
  maybe use `let` for that, and have no non-transitive quantifiers
`false && foo()` returns `Null`
here:
  ```
  binarySearch(type X : Comparable, []X arr, X key, Int start = 0, Int end = arr.length) {
    Int middle = (start + end) / 2;
    
    arr[middle] == key && return middle;
    
    return key < arr[middle]
        ? middle != start && binarySearch(arr, key, start, middle)
        : middle != end ? binarySearch(arr, key, middle + 1, end);
  }
  ```
  recursion should be entirely optimized away to goto statements
should this be valid code? `class C = foo() ? class A {} : class B { Int i }`
should a const reference to a function be allowed to return mut objects?
generic `Int`, `Int<24>` has 24 bits, etc. upper bound should be quite high
  `Int<2>` to `Int<8>`, 16, 24, 32, 64 and 128 should be aliased to `Int2`-`Int8`, ...
  Same with `UInt`, `WInt` and `WUInt` (unsigned, wrap-around) ints
object destructuring should return an object of those variables that were extracted
warn on too simple type aliases like `type Filename = String`.
  such aliases are idiotic.
fs: ability to create a new file with name `x` if `x` doesn't exist, else
  with name `x (n)`, where n is the smallest number such that the file didn't exist
(optionally?) use semicolons instead of colons for sets, objects, arrays and tuples?
  or use colons instead of semicolons for blocks?
  ```
  []Int a = [ 0; 1; 2 ];
  []Int b =
      [ 0
      ; 1
      ; 2
      ];
  []Int c = [
        0;
        1;
        2;
      ];
  
  auto tuple = ( a; b; c );
  
  aFunctionCallExample(
        a;
        b;
        c;
      );
  ```
I already mostly believe that `foo() => foo()` should terminate.
  But what about the Y combinator?
  It's easy to justify why in `a = a`, `a` can be anything, but Y calls a function
  that ...
  Another problem:
  ```
  Null() bar = rand() ? () => foo() : () => print("Hello.");
  
  Null foo() => bar();
  ```
  Should this code also always end? What if foo is also just a variable, then
  it'd be undecidable, right? Or does the fact that at least one function variable
  wouldn't see not-yet-declared other variables save me?
should `All` accept zero parameters? it would be useful to state things about
  existing variables
  ```
  Null foo() {
    Int i = 9;
    
    All: i >= 3; // Should this apply to the whole lifetime of the variable, or just now?
    
    i = 1; // No problem???
    
    assume i >= 0;
    
    i = -1; // Should this be error, or should i now count as a new variable
  }
  ```
target="android"?
target="web"
a nice error message for when an expression that evaluates to a type, but is not a type
  (eg. a function call) is used instead of type, eg. in variable definitions
what warning should expressions whose only side effects come from subexpressions produce?
  eg.
  ```
  Int bar() { printf("Hello"); return 0; }
  
  Null() { 2 + bar(); }
               ^^^^^
  Warning: parent expression has no (side?) effects.
  ```
incremental compilation
partial type specification? `Map<auto...> m`
`Stream<T>.next` should return `T`, not `(T, Bool)`, as in JS.
  if someone wants a 'done' flag, he can explicitly return it.
  for some Streams, it is completely unnecessary, however (eg. fibonnacci),
  for some there might be better ways to indicate end of stream (some default value)
should generators return `Stream`, or `Stream.next`?
stack thraces must be correct even across things like `await`, `setTimeout`, etc.
cancellable promises?
existential types? eg. `Set<?>`
instead of `Self`, which is ambiguous
  (what is `Set<?Self>`? `Set<?Set<?Set<?...>>>` or `Set<?????...>`),
  use `T<...>`: `Set<?...>` means `Set<?????...>`, `Set<?Set<...>>`
  PROBLEM: that is also ambiguous: `Set<Set<?...>>`
error: x not defined, did you mean to import from y?
`--debug` compiler flag lets modules import private identifiers using special syntax?
what if concatenation operator would be the empty string?
`Map<K, V>.get` should have an overload `V(K, V insertIfDoesntExist)`
`array.pop(4)` pops 4 elements?
`arr.indexOf(a)` should return `array.length` in case `a` is not an element of `arr` (?)
runtime vs comptime import, of code, and of files - import() vs load()? or what
  * `import pic from "./path.jpg" using PngOpener`
  * `Png pic = import("./path.jpg", PngOpener)`
  * `Png pic = load("./path.jpg", PngOpener)`
optimizations - merge not only identical string, but identical objects of other
  types as well, eg. this:
  ```
  Set<Symbol> first = grammarRules
      .map(rule => rule.left == symbol ? first(rule.right) : new Set())
      .reduce(new Set(), (acc, a) => acc.add(a))
  ```
  could be optimized to:
  ```
  auto tmp = new Set();
  
  Set<Symbol> first = grammarRules
      .map(rule => rule.left == symbol ? first(rule.right) : tmp)
      .reduce(new Set(), (acc, a) => acc.add(a))
  ```
one of the parameters of `Main.new` should be `Int64 random`? a random integer
  or maybe `time`, the time the process was started.
problem: what is `(Int, Int)` - `Tuple<Int, Int>`, or an instance of `Tuple<class, class>`?
should multiplication be defined on functions?
  ```
  Int a(Int a, Int) => a;

  (Int, Int) b(Bool b) => ( b ? 1 : 0, b ? 1 : 0 );

  Int(Bool) c = a * b;
  ```
  also, should functions officially take tuples as parameters, and one-tuples would be
  implicitly convertible to not-one-tuples?
  ```
  a (b true); // equal to `(a * b)(true)`
  ```
date and time api should greatly discourage from middle endian time format, or maybe
  not support it at all.
  Also, 12-hour clock should only be implemented after the whole world agrees on
  the precise meaning of 12am/pm.
Rational numbers in stlib? thay would have to have a big warning in documentation
  they are just for storing user input like `0.1`, not for computation
  maybe they shouldn't even implement Number
  or maybe Chalk's equivalent of <input/> should just have a `toNumber` function...
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
compiler should recognize functions with untyped parameters, and if possible
  suggest their type in the error
could "pure" IO be implemented such that the inputs and outputs are (possibly
  infinite) lists of data?
should the return type be always explicit? I personally frequently forget it, so
  it would be convenient if it can be omitted, also for short lambdas it would
  be pretty useless
Naming: fixpoint vs. recursive types?
Should `class A { A a }` be allowed? technically, its size in memory is finite.
  perhaps it should merely be a warning
errors vs warnings: if there is a way to understand what a program encoded
  as a piece of text should do, then compiling that piece of text shouldn't
  produce errors. Oddities in code, even if they are 100% not what the programmer
  wanted, should be merely warnings, if they represent valid programs.
non-fixpoint (recursive) types need a name. Simple types?
do union types need their own values (with distinct addresses)?
type conversion: `A|B -> ?immut A`
maybe traits shouldn't be able to hold proofs and propositions?
  at least until I have a clearer picture about
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
class members are initialized in order in which they are defined, warning if
  constructor member initialization list has a different order
how many things should be guaranteed when types override operators?
  at least orders should be provably transitive and antisymmetric, and reflexife when not strict
  and the strict and nonstrict version should be the same except for `a <?= a`.
  what about arithmetic?
think about memory management, how out of memory should be handled and granularized,
  both intra and inter-thread-wise
  ? make it easy to divide memory into blocks, have API to reorganize (defragment)
  those blocks, save them to and load from disk (when memory is nearly full)
"nearly out of memory" event, prioritized to other events
synchronous `usedMemory(ThreadPool tp = ThreadPool.top)`, `avaiableMemory`
  and `freeMemory` functions
stlib - permissions for things like playing sound, info about hardware, filesystem
  access...
  capability based permissions model
This should (probably) compile:
  ```
  Int i = [ 1, 2, 3 ][1]; // No type error: expected Int but assigned ?Int
  ```
  the question is why.
  1. It is comptime evaluable. This might not suffice because there is no comptime
     keyword.
  2. The compiler can prove it is not out of bounds. The standard library should
     provide a proof that if index is less than array size, then the return type
     is `T` and not `?T`.
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
  by chalk compiler. No dependence on C, C's standard library, or any other
  non-chalk whatever
should all fields be modifiable in constructor and assign function?
request fast persistent memory - useful on pcs that have just a few GB of SSD
trailing comma allowed if closing parenthesis/bracket/whatever is on next line
Error class, destructor throws if ignore() wasn't called
prefer 'start - end' to 'start - length', because some types are orderable even
  if the difference is not measurable
warning: function can be static (if this is not used either explicitly or implicitly)
compile option `--aggresive-generics`?
  - maybe this should be affected only by more goal-oriented flags like eg. `--space-req=none`
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
  No. They can be simulated using a callback that is called once at the end of
  the function, so they would be redundant.
  Also, undelimited continuations are the same as named return expressions, which
  are part of the language.
fix generators - next() parameters, replacement for function.sent, ...
type conversion between `(T)` and `T`?
Error: missing function body - maybe with explanation that functions don't have
  to, and can't be declared before being defined, and a mention of function
  variables
there should be no need for anything like /c?make/ or other build systems
A function that returns `None` doesn't have to stop the program:
  ```
  Int foo() {
    None bar() => return-foo 5;
    
    bar();
  }
  
  console.log(foo()); // prints 5
  ```
could go's channels be replaced by thread-safe promises?
go keyword? or other easy way to create threads/parallelism
must main return `None`? Note this wouldn't prohibit actually calling it and
  have it executed
are pointers their own types, or are they type modifiers?
package manager
for every non-static method of class `C`, every instance of `C` has a separate
  own function in its interface, and `C` has a static method with an explicit
  `this` parameter
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
front call optimization? middle call optimization? is that possible?
no way to acquire locks sequentially?
I want the chalk spec to dictate tail call elimination or equivalent in certain
  situations. However, I do not want to dictate any specific implementation
  of chalk (eg. no mention of call stack as an actual stack in memory), the spec
  should be entirely about observable behaviours. How should I do that?
  Maybe requiring certain bounds on memory consumption?
type-safe unions
use value types instead of rvalue refs
const correctness
reflection of call stack?
array: no `remove()`, because its unclear whether all the elements after it should
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
what is the type of the types like `class<class>` or `type<String>`?
  Note: `class Set<type A> {...}` should be instantiable with `Set<X<Int>>`, right?
  Also, should there be a top type?
`stlib/.../Date` should NOT be formattable to `MM/DD/YYYY`. Big/Little Endian only,
  no mixed variants
Should `class`, `class<...>`, `trait`, `trait<...>`, `type` and `type<...>` be values?
It must not be possible to do anything as crazy as javascripts turing complete
  subset from `[]()!+`. security-wise, it must be easy and not unntuitive to
  create a code sanitizer that works with chalk AST
```
// Should this be possible in module scope? I think so.

{ export Int i } = { i = 3 };
```
```
Null foo() {}

Null bar() {
  return Null foo(Int) {}
}

bar().type == Null()&Null(Int);
```
ChalkDoc lists:
  `-` unordered list
  `*` ordered list starting with 0, or unordered list?
  `#.` ordered list starting with 0?
  `2.` ordered list starting with 2, can be combined with `*`
  `**` ordered list, continues numbering from previous list?
higher order types?
  ```
  class C<class X<type T>> {
    X<Int> x;
  }
  
  *class C<class X<T>> = X<Int>; // ?
  *class<class X<T>> C = X<Int>; // ?
  ```
```
class C {
  A a;
  B b;
  
  new() : {} // Same as `new() : a(), b() {}`
  
  new() {} // Error: uninitialized member variable
  
  new() {
    a(); // Possible alternatives: `A.new(a)`, `a = new()`, `a = A()`.
    b();
    
    ///
    All variables must be provably constructed before being used. `this` is
    considered provably constructed when all member variables are provably
    constructed.
    ///
  }
}
```
warning: local trait is never extended
in functions, `assume`s must come before all other expressions
```
{ expr; expr } // single line

{
  expr;
  expr; // multiline, notice extra semicolon
}
```
export, shared, final, get set pub, own static, mut const immut
should cast from `immut T` to `mut T` be allowed, if proven that the data will
  not be modified?
all possible implicit type conversions must provably end with the same result?
all distinct values *that are instances of the same type* must have distinct
  addresses? this way, all integers could technically have a distinct address,
  and wouldn't...
  this might not be necessary - implementation doesn't have to place all integers
  in the memory anyway
is `type P = *P` a unit type or a bottom type?
this should be valid:
  ```
  Null foo(Int) => 5;
  
  Null() bar() => Null foo(String) => "a";
  
  bar().type; // Null(String)&Null(Int);
  
  bar()(6) == 5; // True
  ```
  however make sure this cannot be abused to support type specialization like
  in C++; unless you want to explicitly support such a feature (hint: you don't)
How to quantify over contexts?
  ```
  // Attempt to state that h.hash is context-independent?
  All c, d, Hashable h: `h.hash()` in c = `h.hash()` in d;
  
  // Attempt to state that hash is const
  All c: c then `h.hash()` = c;
  ```
should the program's state be a set of values, and every value has an address
  or a function from addresses to values, and values do not have an address
in this code, should `a` and `b` have the same address? (in theory, not in memory)
  ```
  A a = foo();
  
  A foo() {
    A b;
    
    return a;
  }
  ```
`cases All Nat n: odd(n) | even n` - for proofs
a function must be marked `partial` if it possibly doesn't terminate?
  ```
  Null foo() partial {
    
  }
  
  Null partial() bar = foo;
  ```
if a class has a potentially null member and the default equality, then two
  instances with a null member aren't equal - is this wrong?
  should the default equality disrespect how null equality works? That seems
  to be even more wrong.
ideally it should be true that all objects that are once allocated must be provably
  deallocated, however I'm concerned that might ask for too many proofs
  Ideally, proofs should be something that is not required for most programming
  tasks, only necessary when you're trying to be smart
all pointers must provably be valid anytime they are dereferenced
  must they also be valid if they are not? ie. does eg. this code produce an error?
  ```
  Null foo() {
    *Int ptr;
    
    {
      Int i;
      
      ptr = i;
    }
    
    bar();
  }
  ```
  I think this code should be correct
  can this be used for optimizations? it basically gives the compiler a partial order
  on variables such that `a < b` when a is deallocated sooner than b, I guess
`All:` qualifies over all possible program states. Is it mandatory to have access
  to local variables?
regerex - there should be support for grammars that execute graph algorithms
  like finding which functions are called by which functions
a nice syntax for logical definitions of functions is needed. an attempt:
  ```
  class equals(Set a, b) = True <-> (All Set s: s in a <-> s in b);
  
  This is soooooooooo wrooong.
  
  But at least it's clear now what is needed.
  ```
should let be transitive?
usable design: `fs.accessNow` - checks if process can access a fs entry, the 'Now'
  part should remind users of races; or maybe `fs.accessThisInstant`
`import pic from "/path/to.jpg"`, imports an image to the binary at compile time?
  maybe `import pic from "/path/to.jpg" using JpgDecoder`?
variables without mut, const or immut could be const, but not transitively?
Collection.some and Collection.every should have two versions - one returns Bool,
  other returns an element/collection of elements
argument for why local variables, maybe unless they are anonymous, should be on
  the stack by default: guaranteed they won't need dynamic allocation
all provably dead/side-effect-free code should produce a warning
`--machineTranslate` - do not spend precious CPU cycles on warnings/potential
  error messages, because output of stdout goes to /dev/null
  Or something else if the compilation is just a part of an automated process
  that is only interested in a successful compilation if possible
`--noWarnings`?
warning: all side effects of this expression come from a subexpression
warning: `a ? false : true` can be replaced by `!a`
there must be two versions of `getMembers()` - one private that returns all members,
  one public that returns get, set and pub members.
  Should there also be two versions of `supertypes()`/`extends()`? I'm afraid that
  leaking local, unexported types through reflection will be an unnecessary pain
  in the ass.
```
// immut vs const: should only one be allowed?
static immut class Namespace {
  Float64 pi = 3.14159;
}
```
should static member variables be disallowed, or live as if in the parent scope?
if a function wants to potentially not terminate, it must be defined as:
  ```
  Int() partial {
    for {} // Not an error;
  }
  ```
rename `Promise` to `Wait`? and `Object` to `Any`
if 0-tuple is allowed, should `type Null = ();`? or should null be an enum?
hot deployment of code
returned values must be promisified if needed, eg. this is valid: `Promise<Int>() => 1`
lazy loading? `Module m = await import("path")`
3 possible path formats?
  1. `/absolute/path`
  2. `./relative/path`
  3. `library/path`
unsafe `Pointer.to<Type>(Int address)`, `Pointer.add<T>(Ptr<T>, Int i)`
no semicolon after function / class declaration
function can specify assumptions about its inputs, if those assumptions are not
  \<del\>met, any resulting potential undefined behaviour must be proven safe at the
  calling site \</del\> proven for every invocation of the function, it is a comptime error
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
preserve the `T t(constructor, params)` variable definition syntax
  and make `T(constructor, params)` an anonymous variable definition
what is the role of traits in propositions?
should algebraic structures like `Group`, `Field`, etc. be traits or classes?
what is the type of type templates?
spec should contain a proof that membership in Chalk is decidable
class `class C { foo(Int) {} foo(String) }` has a single member, a function
  of type
ability to create proof of correctness of safe code
should member initializer lists be part of chalk?
  yes. left out == initialized with default constructor
how to handle `{}`, the empty object/set/code block/destructuring?
  destructuring and code blocks could be required to always be nonempty
  (except for for cycle code block, if that's how it will be specified),
  maybe it could always be interpreted as a value of type `class {}&Set`
  until assignment? similarly, type of empty array would be `[]None`?
  This would require that such values change their types if they are modified.
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
maybe use this hashing function for identifiers?
  ```
  String alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
  hash(String s) {
    Int64 hash = 0;
    
    Int i : min(10, s.length) {
      (hash *= 64) += alphabet.indexOf(i);
    }
    
    s.length > 10 && {
      // Compute rest of the hash
      
      // Set the first digit to 1.
      hash.and(0x8000_0000_0000_0000);
    }
    
    return hash;
  }
  ```
  This hashing function has the property that if the identifier has length at
  most 10, its hash has first digit 0, and if the hash has first digit zero,
  then the identifier is unique and has length at most zero.
`for 10 {}` as sugar for `Int _ : 10 {}`?
how to specify tail call optimization without mentioning any concrete hardware
  architecture, or things that should be transparent to the spec, such as stack?
warn on `++var`, `var++`, offer to replace by `var += 1` and something appropriate
  for the later
global state must be immutable and its initialization must not have any side effect
compiler shouldn't be able to read files whose path relative to where compilation
  started starts with `..`
String and StringSlice, and ArraySlice?
`trait TotalOrder : Comparable` - with proof?
`Thread(foo, { maxMemory: 1024, priority: 5 })`
optimization: if a function value is computed at the start of the program and
  then never changed, change code of functions that call it to directly call the
  function?
  Also optimize reading of non-function objects.
global immutable data that is computed once at runtime?
optimizations - equivalence of certain arithmetic and bitwise operations, eg.
  `if (a >= 0) a+= 2 ^ 63` and `a.or(2 ^ 63)`
awaiting a promise always pauses execution, to potentially not do that, a function
should return `A|Promise<A>`. non-promise values should be implicitly promisified
  if waited on
```
class A = class B {}; // Should this semicolon be here?

A.name == "A" // ?
A.origName // "B"?

type class {
  Bool equals(*class A, *class B) => A.orig == b.orig // ?
}
```
compiler option `--includeComments` to include comments in functions' code
compile binary objects back to source code
optimization?: in case a function is not recursive or called from multiple
  coroutines at once, plate its stack call always at the same address in memory?
  functions that are never called at the same time could even share this place
  is this practical?
`| File f, Error e | = File|Error()=>Error("error")()`
```
// A counterexample to that the scope of a declaration is the parent expression
Weak<A> w;

(?*A a(w)) is *A && {
  a.foo();
}
```
implicit conversion from `Stream<A>` to `[]A`?
alternative to `package.json/(chalk)` - `.chalkdep` file that contains info about
  where to download the dependency from? - would likely be impractical to have
  one file for every dependency, if it can be all in one file
version ranges are bad, don't support them
package builds should be as reproducible as possible, ideally with 100% identical
  behavior or at least a warning if not
consider using unique and centrally managed dependency URLs
compiler+package manager should always leave the repo synchronized
  - if a new dependency appears in code, compiling the code should automatically
    download it, (or ask for version and then download it)
an IDE like Medium, not Vim? Ctrl + F in http://witheve.com/
underscore in C identifiers should produce a warning
error recovery when parsing - 
```
Foo f(undefined); // Should undefined be dropped?

f(1); // Constructor call?
```
`class(Fields, Methods)` - class constructor
  ```
  class A([ (Relfect.public, Int, "a") ], []);
  ```
`foo.returnTypes`, union of `foo.returnType(Int, Int)` for any params
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
two function literals can have the same name if at at least one index the type
  intersection of their parameters is `None`
what about type conversions `A -> A|B` and `A&B -> B`?
```
Null f(*Int a, *Int b) { a += 1; b = 7; a += 1 }
Null f(*Int a, *Int b) { a += 2; b = 7         }
///
According to spec, these functions must not just specify a function with the
same behaviour, they must specify the exact same function.
 - statement order in the source must not dictate statement order in some
   abstract representation of the function - must be a relative concept, just
   like position in physics (because of threads), ie. it must not be part of
   semantics unless one statement depends on the other
 - comptime arithmetic must evaluate whenever possible
```
compiler must comptime execute pure functions with all arguments known at comptime
variables that are written to, but never read should be marked as unused
is `class<Int> = class<Number> {}` valid? It should be.
have a look at darcs before doing version control
this is valid function:
  ```
  Int foo(String s) => switch {
    case "": 0;
    case "a": 1;
    case _: 1;
  }
  ```
maybe `123 .add` should be well-formatted, instead of `123.add`
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
`const export mut T t`, `mut export T t`
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
  could eg. the y combinator (if type system allows it) not cause infinite loop?
  ```
  Null foo() => foo(); // Should this terminate?
  ```
a way to unresolve a promise if it is still just waiting in event loop? (later: why?)
compiler should be able to remove not only variables/class members that are unused,
  but also those that are only used for proofs/at compile time
cancellable promises, can stop async functions, threads
ChalkDoc documents should have the option to be interactive, however, there should
  be a setting that applets are turned off by default, runnable by clicking on them,
  similarly to flash in browsers
ChalkDoc: Navigation between documents without refresh?
enforce order of keywords - pub static
first-classish types?
model checking in compiler
eliminate impossible code paths
if algebraic types (`data X = A Int | B Int Int`), then `A` and `B` must be types
  so it is possible to write functions that only take `A` xor `B`
GADT?
functions like:
  ```
  function factorial (n) {
    return n
    ? n * factorial(n - 1)
    : 1
  }
  ```
  should be optimized to loops
`map.entry(key).orInsert(0) += 1`
optimize `h = h + 1 % n` to `h = h == n - 1 ? 0 : h + 1`
proof that in the generated code, there are no double jumps and no jumps to the
  next instruction, and no jumps can be removed by shuffling instructions or
  negating conditional expressions
should a class with private fields be serializable?
private fields be accesible through reflection? I guess not - private field should
  be inaccessible outside of friend classes
For all classses `C`, `C` is a friend of `C`. A class `A` can access `B`'s private
  members iff `A` is a friend of `B`.
rename `friend` to `trusts`? that would better capture the asymmetry of the relation
what about gpu programming?
total independence from other programming languages is a goal, even from C's
  standard library
generate hidden classes that are return type of generator functions that use `yield`
variables - replace trait type with class type if known at compile time
function bind operator? `Function.bind((a, b, c) => a + b * c, 1, 2)(3) == 7`
for-else
what about loop with test in the middle? nope, `while` can be replaced by if-break
  ```
    for {
      foo();
      
      while condition;
      
      bar();
    }
  ```
```
immutable []Int a = [ 0, 1, 2 ];

Null foo() {
  []Int b = copy {
    a[0] = 5; // equals [ 5, 1, 2 ] and is mutable
    a.push(3); // [ 0, 1, 2, 3 ]
  }
}
```
reduce readme.md, that file should only contain a short text and links to other
  docs/website
create examples where chalk can be used (after that will be possible):
  https server, arduino app, a website, operating system
big topic - generic type variance
  related to type modifiers - if `A` is `B`, `Set<A>` could be `const Set<B>`,
  but not `Set<B>`
  it would be strongly preferable to avoid undecidability of the is relation,
  (and membership in the language Chalk)
algorithmic construction of proofs?
what is done by `elim` and `split` tactics should happen automatically (?)
`Exists<A, P>`? (or `E<A, P>`)
chalk should make it easy to write programs that react well to memory constraints,
  (do not crash on out of memory, are able to free some on request, etc)
  should all functions that have potentially unbounded memory requirements
  return `Error|T`? at first that glance that seems excessive, but I don't know
  how annoying that would be in practise
should allocating new memory in destructors be disallowed?
  could offer a guarantee that destructing an object will leave a process with
  strictly more memory
  is there even a use case for destructor allocating new memory?
  counterargument: possibly possible memory behavior should be known about any 
  functions and only when such a guarantee is needed and a destructor doesn't
  fulfill it, it should just be an error
should `==` always mean `Object.equals`? equality might not always be computable
  for types that are not meant for computation, but proofs.
ufcs? member functions are accessible as `ClassType.memberFn`, not as `instance.memberFn`,
  `x.a(b, c)` is equivalent to either `a(x, b, c)` or `xType.a(x, b, c)`, the first
  form must not be used if ambiguous
immutable classes - all instances must be immutable
immutable classes can modify themselves, as a syntactic sugar for creating a new
  version of themselves?
temporaryli immutable - to take an immut reference to x, it must be proven it won't
  change while the reference exists
  ```
  auto a = [ 0, 1, 2 ];
  
  *immut []Int p = a;
  
  // a.push(3); would be error
  
  p = [];
  
  a.push(3); // not an error
  ```
compiler can edit code, eg. rename variable
what if a function returns a trait type that is backed by anonymous class? should
  that trait type be also treated as a class type? motivation - Stream:zipWith
  returns Self, should Self be Stream if it's produced by a generator? other examples?
documentation: allow notes that popup on underlined pieces of text, only use this
  when someone who would not gain any info from reading it knows he doesn't have
  to read it (this pretty much restricts its use for definitions)
inline assembly?
`array.last` - last element or null
  `array.first` or (`array.head`, and `array.tail`? or just `view`/`slice`?)
only the first param has to have an explicit type, `Int(Int a, b) => a + b`?
static member variables must be immutable
`Ast a = { Int i; };`
ASCII only, including proofs. No single-character greek variable names.
website should require little internet connection (fast load times important),
  be single-page, reference should be interactive (eg. instant search of definitions)
functions are const by default
Should parameters of functions be in front of the return type? `Bool foo() {}.type == ()Bool`?
```
class HashSet {
  Bool add() {...}
  
  Bool shared add() {...}
}

shared class HashSet { /* ... */ } // thread-safe version ?
```
array of number should be a number?
`chalk mv a.chalk b.chalk` - moves a file, renames imports, or fails if there
  are potentially imports that cannot be easily renamed
append operator `~`?
rename `Object` to `Any`?
create a nice error for `case` branch of `switch` that contains multiple expresions,
  with an autofix:
  ```
  switch {
    case _: a++; b++; // Error: multiple expressions in a single `case`, use code block.
  }
  ```
`Object...` for variadic parameters, `T...` for variadic templates, `T[n]` and
  `T.length` supported
code coverage analyzer as a part of the compiler
how to manage atomicity of code for proofs?
  ```
  // Lets say there's the following class C:
  pub class C {
    ?Int i;
    ?String s;
    Bool b;
    
    assume NullXnorNull i is Null <-> s is Null;
  }
  
  ///
    An instance of C with `i` and `s` being both null is clearly valid. An instance
    of C with with `i` equal 3 and `s` equal "a" is also valid. But how could
    a piece of code that receives the former modify it to get the later?
    
    There is no statement that would assign two variables at once.
    Therefore if the `assume` clause required the proposition to be true strictly
    at every point in the program, there would be no way to do that modyfication.
    
    Or maybe the object destructuring should be considered atomic in this sense?
    
    What if multiple methods would want to "invisibly" break some assumptions,
    should that be possible?
  ///
  
  C setCError(C c) {
    c.i = 3;
    
    // Error: NullXnorNull assumption broken;
    
    c.s = "a";
    
    return c;
  }
  
  C setCMaybeRight(C c) {
    { i: c.i, s: c.s } = { i: 3, s: "a" };
    
    return c;
  }
  ```
should global variable initializers be allowed to have side effects?
optimization - if all classes implementing a trait are known and of similar size,
  local trait or union vars should be on stack
collection.add returns true if added, false if already existed
async function calls without heap allocations, possible?
++ as string concat operator? `a ++ b ++ c` sugar for `String.join([ a, b, c ])`
  either disallow blocks inside some operators, or have a special error message
  for `for Int i = 0; i < x; i++ {}` which would parse `i++ {}` in a nonobvious
  way (I've been burned)
unittests? (D), comptime assert? something else?
for, switch - braces are optional if condition/whatever is inside parentheses?
closures are shared between functions from the same scope
reflection.createType? (or compiler.createType?)
TODO concurrency, green threads?
instanceof? is?
design goal - if something could be possible, but is hard to implement, it should
  still be possible
string: view/slice/substring: - same memory, doesn't hold reference; same memory, holds;
  new memory, holds; what about array?
readme.md should be replaced with `main.chalk`
the identifiers `class`, `trait`, `type` and `any` (and possibly `prop`) should
  be implicitly defined in every scope
  these are the only truly global variables
think about deffered loading of code so the whole application doesn't have to be in memory
  when it starts
chalk should be low-level enough so that an os can be written in it
unary ^ as bitwise negation?
remember `X.Y a;` is variable declaration even though `X.Y` is a member access
  expression, not a type
`?All` and `?Exists` for statements that only warn when not proven (but maybe error
  if disproven?)?
all comptime functions must provably terminate, and all runtime functions should
  throw a warning if they don't
for all types `T`, the one-tuple `(T)` equals `T` (or not? `t.length`)
every expression should have a principal type
`Main` class must be exported
100% type soundness IS a design goal
if a class `A` only contains one member of type `B`, should `*A a = b` and `*A a = b` work?
  no, in one direction its easy (`b = a.member`), in the other it could violate class invariants
user defined type conversions + function reflection/inspection =
  ```
  class Polynomial {
    new(type T : Number, T p(T)) implicit {
      // ...
    }
  }
  
  Polynomial = x => 3 * x ** 2 - 2 * x ** 3;
  ```
Number.parse(String str, ?Int base = 10, Bool allowBaseChange = ??) // base == null -> str must be prepended with 0x, 0b, ... ?
should duplicate variables be a warning? eg.
  ```
  mut Int a;
  let *Int p = a; // Will always point to a.
  ```
should every value have an address and every variable a value, or should every
  variable have an address and a value, and value not have an address?
should taking a pointer to a temporary object produce a warning, an error or nothing?
variable declaration: `?(mut|let|const|immut||default=let)?( Type||defaut=auto) VarName;`
  * mut - mutable
  * let - intransitive immutable with this reference
  * const - transitive immutable with this reference
  * immut - transitive immutable
TODO tuple destructuring in lambdas
compiler should be able to generate and visualize call graphs
haskell-like function declarations?
  mut fact(0) => 1;
  mut fact(n) => n * fact(n - 1);
should code block be followed by a semicolon anywhere? I thought '}' is never
  followed by one, but my current grammar says otherwise
`class A<T a, b> {}` - one type, multiple params
reflection:
  is comptime
  ability to detect if trait method is overriden?
    what about `Class1.foo == Trait1.foo`?
  If you'll support inspecting private members, only allow it in tests
generic types can be only class types or the declared trait type
something like linq (ie. inline SQL)?
Implicit type conversions: class to traits, trait loss and trait reordering
go's channels? can they be a just part of stlib? How are they different from
  `Stream<Promise<T>>`?
is `AsyncStream<T>` necessary? or is `Stream<Promise<T>>` enough?
async functions and threads should be similar if possible and reasonable (?)
  would it be possible to have things like locks and memory fences only if
  interacting coroutines happen to be in different threads?
no empty statement (`;`), use empty block `{}` instead
user-defined canonical type conversions?
can multiple immutable values in value-typed variables share the same address?
function and type template overloading must work across scopes
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
variable stack frame length: if some variables are only created in a later part
  of a function, preceding function calls can use part of the stack frame of
  current function
replace `a?b:c` by `if a then b else c`?
warn on compile-time known branches
warning for labels unused
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
is it an error by default if it cannot prove program will terminate?
  (not exactly terminate, consuming infinite input is fine)
  (code can suppress this error?)
module-wide destructuring
  ```
  (Int, String) a = (2, "hello");
  
  (256:Int) fixedSizeIntArr;
  (256:Int,String) a257Tuple;
  
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
`Null y(any T, Null f(, T t)) => (x => x(x))(x => f(x(x)));`
an explicit goal of creating Chalk should be to make a statically typed
  imperative language in which the y combinator is typeable and doesn't
  cause stack overflow, simply because the y combinator is cool.
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
  only if a trait is final, a compiler is allowed to assume it is extended
  by only those types it knows about
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
returning a local type is an error?
  ```
  class X() {
    class A {}
    
    return A; // Error
  }
  ```
class can have `mut` members that are modifyable even if instance is `const`, must be private
if `Int(Int)` is `Function<Int, Int>`, what is `Int<Int i>()`?
getters/setters? or unification of properties and functions without arguments?
  getters, if part of Chalk, must be pure
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
model theory: formulate theories as classes, models == instances?
file extension `.cdoc` where contents of \`\`\` \`\`\` are inverted, ie. text
  is code and code is text
equality operator for types?
support a way to create a new instance from an old, possibly immutable one
  by what would normally modify it instead - eg. each assignment to a member
  creates a new instance
immutable keyword? (makes a value immutable as long as there are immutable
  bindings to it?)
  - would still enable calling mutating methods on it, but they would create
    and return a new instance?
`===` for `Object.same`? (ie. on the same memory address)
rename constructor to `init`? or something that can be paired with a good
  destructor name
```
class A {
  class() { print("abc") } // Warning: constructor sohuldn't have side effects?
}

class B {
  A a;
  
  class(A _a) {}
}

B b(A()); // This must print "abc" only once

///
TODO what if A's constructor was `class(A a) : a(a) {}` or `class(*A a) : a(a) {}`?

I guess then "abc" should be printed twice, and unless the local `a` is used later,
that should produce a warning suggesting the `A _a` parameter.

Problem: `B b(A a());` would bind two non-pointer variables (`a` and `b.a`) to
the same value. What about `B b(*A a())`?

The above problem might be a good reason to ban variable declarations in function
calls.
///
```
optimization:
  ```
  x is A && foo();
  x is B && bar();
  
  // if A&B is None, optimize the above to:
  x is A ? foo() : x is B && bar();
  
  x is A
      ? foo()
      : x is B && bar();
  
  x is A ? {
    foo()
  }:{ // No spaces around ':', (unless it is on the same line as ...)
    x is B && bar()
  }; // This semicolon is ugly, maybe semicolons shouldn't be next to }
  ```
warn on conditionals that are always true/false
warn on `((x))` double parentheses, maybe all unnecessary parentheses?
what about transactional memory?
```
// ???
Ret(Args.slice(args.size)) apply(type Ret, []type Args, A(...Args) fn, Args...|U args = undefined) {
  enum U { undefined };
}
```
`call(fn, DefaultAllocator.alloc(fn.stackFrameSize), fnArgs, here)`?
`call(fn, fn.StackFrame(), fnArgs, here)`?
rename constructor from `new` to something else? `new` might be useful as a method?
```
class A { new(Int, Int) }

Allocator.alloc(A, 1); // Todo how to make this throw the correct error?
// An error could be thrown manually at comptime using reflection, but ideally, it
// wouldn't require reflection and throw a type error, not a comptime exception.

trait Allocator {
  *A alloc(class A, []type Args, Args... args);
}
```
should the main method be required to be in a certain path?
should it be possible to have multiple functions named main?
  if yes, should it be possible to compile a program with a different starting
  point?
since there are no global objects, and permissions should be capability based,
  the main method should receive thinggs like `console`, and `rootDir`
  as parameters
```
Dir a(root, "a/b/");
File f = a.open("c/a.png");
f.path == ( a, "c/a.png" );
a.path == ( root, "a/b/" );

Dir b(d);
// Is this a good idea? shouldn't it return a new object (with the same handle)
// instead? Current path doesn't fit into my mental model of a state of a directory.
a.setPath("c/");
Dir c(d);
// should `f == a.open("./a.png")`?
f.path == a.open("./a.png").path; // Uses currentPath
f.path == a.open("c/a.png").path; // Doesn't use currentPath
a.open("a.png").path == b.open("c/a.png").path;
// Should `a.open("a.png").path == c.open("c/a.png").path;`?
```
```
A a(); // equals `A a = A()`;
A(Int) a = Int i => A();
```
`Prop true = a || !a; Prop false = a && !a`
custom implicit type conversions? would have to be opt-in, not opt-out like in C++
proofs should, or at least should be able to, display the theorem to be proven
  at the start?
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
  
  tt, ff
  
  tr, fl
  
  tru, fal
  ```
casting mut to immut valid if provably no code is gonna see a write to that reference
if `try { x } catch E { y }` will ever be part of chalk, make scope of y subscope
  of scope of x? warn if an object that was manipulated in x, but not in y is used
  after try block?



the return type of `c ? a : b` is the common type of `a` and `b`.
common type of `None` and `T` is `T`, where `T` is any type
`a orelse b` equals `a` if not null, else `b`
~ vs ! as bitwise negation?
array concatenation operator (++ ?)
should array destructuring return a bool which is true if destructuring happened
  or false if it didn't?
  ```
  Int sum(arr) => (let [ a, ...rest ] = arr) ? a + sum(rest) : 0;
  
  Int sum(arr) => arr.empty ? 0 : { let [ a, ...rest ] = arr; a + sum(rest) };
  ```
  if this is possible, the compiler should guarantee that newly variables aren't
  used if they weren't initialized
`Int.min/max` - the least and greatest Int
challenge: make the default http/s server unDoSable unless the problem comes
  from some other part of the program - ie. react well to out of memory, drop
  connections if no other choice, etc.
  make it easy to make other parts of the server to react well to DoS attacts
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

chalk tutorial // The same as the web tutorial
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


```
InfLanguage l = pow({ "a", "b" }) ++ pow({ "a", "b" }, Inf);

Buchi b, !accepts(b, l);

accepts(b, pow(pow("a", k) ++ "b", k + 1) ++ pow("a", Inf))

!accepts(b, l)

accepts(b, l) -> !accepts(b, l);

b && x

Proof All Buchi b: !accepts(b, l);
Proof !Exists Buchi b: accepts(b, l);


Proof all Buchi b: !accepts(b, l);
Proof !exists Buchi b: accepts(b, l);
```















should temporary objects be allocated on the heap unless they are provably local?
references: it would be nice if there were references to portions of String and Buffer,
  but I do not want a situation like in Rust that reference is its own type different from `*String`
underscore for unused function parameters
trait can declare variables?
overflow and division by zero on non-nullable types throws exception, there's a wrap-around Int type
golang's defer? destructors do the same, so why?
support chained comparison operators, eg. `2 <= x < 7` equivalent to `2 <= x && x < 7`
  in order to overload operators, types must prove that the implementations
  satisfy the usual rules, eg `a < b` and `b < c` implies `a < c`, `a < b` implies
  `a <= b`, `+` is associative, etc.
a function that contains a named return statement must provably never be called
  outside the outer function's activation
the event loop must be invisible in the stack thrace, the stack thrace must work
  across `await` expressions
IDE: format selected text
if short enough, array and object literals should be on one line to be well-formatted?
make an exception to "no global state" for something like `debugLog(String)`?
the last expression of a block in a lambda should be returned, even without
  a return statement?
  `(() => { a; 3 })()` returns 3 or null?
destructuring must compile only if provably doable
  ```
  []A arr = foo();
  
  let [ A a, ...rest ] = arr; // Error: cannot convert from ?A to A
  
  let [ ?A a, ...rest ] = arr; // OK
  
  arr.size > 0 && {
    let [ A a, ...rest ] = arr; // OK as well
  }
  ```
array literal syntax for allocating array with certain capacity? eg. `[ 6 | ]`
`for ( ?A a, ?B b ) of zip(arrOfA, arrOfB) {}`
`for ( ( ?A a, ?B b ), Int i ) of zip(arrOfA, arrOfB) {}`
implicit conversions between `T` and `Promise<T>`?
  I think that pausing a function using `await` should be explicit
struct, union and array destructuring, destructuring of a single variable from
  anonymous class/union doesn't require braces, optional declaration adds one optional,
  that can result in ??Type
use directives similar to `"use strict";` per module till you decide whether to
  include value types or not? (`"blue ice";` for value types, `"red carpet";`
  for all variables are references?)
replace `get` keyword (which would block some conventional function names like map.get)
  with `pubConst`?
`implicit` keyword for constructor? or some other mechanism for type conversions
destructuring with rest syntax
  ```
  let [ head, ...tail ] = foo();
  ```
switch-case pattern matching
  ```
  switch arr {
    case []: foo();
    case [ a, ...b ]: bar(a, b);
  }
  ```
  what about arbitrary, user defined structures? Eg. set?
do union values need their own addresses?
the abstract data structures with simple names (set, tree )in stlib should have
  no strict guarantees about their specific implementation, they sould be like
  objects and arrays in JS - if they are used in a specific way, the implementation
  may decide to use a specific data structure for them.
  If anyone needs specific guarantees about something (cache locality/complexity
  of certain operations, they should pick a more specific class, eg. HashSet)
  I'm even hesitant to guarantee that array should be continuous blocks of memory.
  If anyone needs C-like arrays, he has them, they are called tuples.
switch ranges? or a combination between `switch val {}` and `switch {}`, depending on case?
  ```
  switch i {
    case 0: a();
    case 1: b();
    case 2 < i < 5: I need syntax for this, I guess?
  }
  ```
optimization: if a value (whether on stack or heap) will never be used again,
  use its space if possible, avoid deallocation/allocation
compiler should be able to use a proposition
  ```
  All a, b in map: Object.same(a, b) <-> a == b;
  ```
  to optimize equality comparision to just a call to `Object.same` (comparing
  pointers is O(1))
should `[ Expr... ]` literal be array or (singly?) linked list?
  or should it depend on context?
proof errors:
  Unproved proposition A.
  False proposition B.
  Unproved proposition C. C is provable from another unproved proposition A.
  // Note never: provable from false proposition B.
  
it should be possible to modify values through immutable references in the case
  that modification "cannot be seen", eg. in `immut A a()`, the constructor
  can modify a's members before it returns.
should array size be increasable beyond their capacity?
  or should creating a new array and moving old instances there
  be left to the programmer/have its own function?
push/shift vs append/prepend vs pushBack/pushFront? (apop/prepop? :D)
warning - incorrect indentation if empty lines do not contain starting space
should it be true that when it's provable that `C0`-`Cn` are all the classes that
  extend `T`, then `C0|...|Cn` equals `T`?
warning: unnecessary await (or as part of side effects of expression come entirely
  from subexpressions?) in case of `return await ...`?
  the await is necessary in case the return in inside a try-catch block, assuming
  Chalk will have exceptions in the future
```
class A {
  class B {}
}

A a();

// Which version?
A.B b = a.B();
a.B b = a.B();
```
warning function whose name starts with "get" (`/^get?[A-Z]/`) is not pure
this should be optimized:
  ```
  for let a : iter {
    b && b = foo(a);
  }
  ```
  to this:
  ```
  for let a : iter {
    b ? b = foo(a) : break;
  }
  ```
zero must not be falsey. If anything besides true and false should be truthy or
  falsey, only null should possibly be falsey and anything else truthy 
should trees and singly linked lists be able to share nodes?
should function types have the return type at the end? I always forget to write
  it when I write functions, maybe it's not just habit, but maybe there'd
  be a psychological benefit to not having to think about the return type at first
  ```
  fn foo()Bar {}
  fn foo(Int a)Bar {}
  
  fn foo() Bar {}
  fn foo(Int a) Bar {}
  
  fn foo() -> Bar {}
  fn foo(Int a) -> Bar {}
  
  fn foo() : Bar {}
  fn foo(Int a) : Bar {}
  
  fn foo ()Bar {}
  fn foo (Int a)Bar {}
  
  ()Bar foo;
  
  () -> Bar foo;
  
  () : Bar foo;
  
  (Int)Bar foo;
  ```
this must type-check:
  ```
  class A {}
  class B { pub Int i }
  
  A|B var = foo();
  
  if (var is A) var = B();
  
  var.i; // Compiler must know that var is an instance of B
  ```
warning if conditions of multiple branches of switch aren't mutually exclusive
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
remove blank identifiers, make them a special syntax in array and tuple destructuring
unify `[]T` and `T...`?
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
generic database interface?

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
    foo(x) && fn.return true; // makes the function fn return (maybe return-fn instead?)
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

enum { a; b; c }

enum { a, b, c }

enum { a b c }

enum {
  anana;
  cnonarrrna;
  bnenana;
}

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
