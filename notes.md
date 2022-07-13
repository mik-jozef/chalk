https://koka-lang.github.io/koka/doc/index.html
Possible additions:
```
class A<type T, Bool b> {}

class<type T> = A<T, false>; // This must work?
class<type T> = foo(T); // foo must be a pure function, but what if it isn't injective?
```



Other:
should this be a well-defined program?
  ```
    foo() {
      let a = b;
      
      // `print(a);` Error reading uninitialized location.
      
      let b = bar();
      
      print(a); // Ok.
    }
  ```
```
  mut s = Server('https://google.com/');
```
`Array.pop(index, move: bool)` should pop at index, move all later elements or just the last one
`class ProgrammerError ...` something to return if you think this cannot happen. returned by assert?
`A.className` - name of the class
`sort(deduplicate = false, cmp: (T, T) => Bool)`
declarations that apply to multiple definitions, (and ensure that all overloads are implemented)
  ```
    final trait T {}
    
    class A : T {}
    class B : T {}
    // class C : T {} if this was uncommented, it would cause a comptime error
    
    foo(a: T);
    
    foo(a: A) => ...;
    
    foo(a: B) => ...;
  ```
  also, a function should be allowed to have multiple declarations:
  ```
    foo(foo: true): A;
    foo(foo: false): B;
    foo(foo: Boolean) => ...
  ```
  so, definitions and declarations are n to m. So I guess they should be allowed to appear
  anywhere in scope, or perhaps only before the declarations?
  an implementation should probably be allowed to have a broader type than the declaration.
reflection - in a trusted context, it should be possible to get private members.
``foo(A a) => ...; foo(B b) => typeerror { return "First call `toA()` on `b`."; }``
  ``foo(b) // Custom library error: First call `toA()` on `b`.``
numbered lists should be indexed properly (from zero) by default
`class-pub A { Int a; String b; } const a: A = { a: 5, b: "asdf" }`, pub class initializable from literal
if function declarations specify types, function definition does not have to
  ```
    func foo(a: T, r: true);
    func foo(a: S, r: false);
    
    func foo(a, r) => ...;
  ```
`assert(what, message?)`
a class should be able to extend a trait (`Debug`) that lets the class
  specify how the debugger should visualize its instances.
  Or perhaps that trait should be `Object`, with a default implementation?
  in that case, the default implementation should not be available to
  normal code. or perhaps scrap the idea altogether.
textarea: shoud contain a natural number of lines
  every line must end with a newline character
  by default, it should contain the empty string
  by default, lines should be numbered, properly
  a number should only be visible when its corresponding line exists.
  If there are zero lines, the caret should look different to when
  there is just one empty line. I'm thinking a blinking "abovescore"?
should this be allowed?
  ```
    factorial(0) => 1;
    factorial(Nat n) => factorial(n - 1) * n;
    
     // Technically, their domains overlap. Should there be an exception for
     // args of unit types?
     // And should equality or identity be used for matching?
  ```
`class C[All type T] {} typeof(C) == class` - just like functions, classes
  with type annotations are not secretly functions from their type parameters
  to what they are intended to be, they are the real thing
IDE debugger: visualize current program state as a graph
  search in program state
  right click on a class -> view all current instances
  have a global variable `global` during debugging containing an array of all
    current values (note `global` is not one of them)
a variant of the langue with restricted getters and setters
  that are only usable with method calls outside the language
  variant, used for (vue-like) dataflow programming
  ```
  class Cl { this(pub _n: Nat) }
  
  class OCl = Obs(Cl); // Observable.
  
  mut t = OCl(3);
  
  t instanceof Cl; // False.
  t.n instanceof Nat; // False.
  t.n instanceof Obs(Nat); // True.
  
  t.n = 42; // Error.
  t.n.write(42); // Ok.
  
  t.n + 42; // Error.
  t.n.read() + 42; // Error.
  ```
should classes returned from a function that have access to a variable
  of that function's body compare equal if their respective closures
  differ?
peano numerals?
  ```
    prd dec(0) => 0;
    prd dec({ prev: Nat }: Nat) => prev;
  ```
Think hard about doing away with pointers. First, in most cases, the performance
  gain from tight control over what is where in memory is probably not worth it
  (performance usually depends on a small parf of code). Second, when such control
  is needed, maybe it should be used explicitly with something else.
  
  Maybe revert the notation? `T` is a pointer, and `*T`, or similar is a value type?
class members must be in the same order as in the class member initialization list
chalk diff - smart diffing, recognize when variable is renamed
`{ Never foo }` should be a type of objects that do not have a property `foo`.
  having it be the type `Never` would not be useful
should `Never` really be an enum? it seems weird that
  ```
    class A {}
    class B {}
    
    print(A & B is Enum);
  ```
  this should print `true`.
`Undefined` pseudo-type: a syntactical annotation of expressions which might not
  be well defined, for example (or precisely?) those that may not return
  `undefined` expression annotable with `Undefined`, usable in default parameters
```
trait A {}
trait B : A {}

Null foo(A) {}
Null foo(B) {} // is this legal? If multiple function overloads have overlapping signature, they all must have the same effects and return the same value
```
IDE: multiple people should be able to collaborate on the same project in real-time
  also, all things (IDE, version control, package manager) should be able to
  work together, client and server should be the same app, and the central
  repo should be just an ordinary instance of the Chalk Development Suite
should explicit deallocation be part of the language? should it be mandatory?
  ie. program would crash as soon as an object end up without any references / GC collects any object
ChalkScript `Object.observe(observer)` - should be powerfull enough to allow
  a library like Vue.js. Probably shouldn't allow changing the meaning
  of the code like getters and setters. Maybe it should dispatch
  an event (like `async { await now(); observer(object, member) }`)
  either that, or the reactivity should be build into Chalk somehow
  else
pair of ints - `(Int, Int)` -  should be the type of `(0, 0)`
  `{ a: Int }` should be the type of `{ a: 0 }`
does `(Int, Int)` equal the set of pairs of integers? yes
  if not, what is the type of all pairs of integers? `(Int, Int)` or `{ (a, b) | a, b of Int }`?
`chalk publish` should monitor (at least optionally, and if turned off, the
  package about page should state this) whether semver standards are upheld?
  Ie whether every expression evaluates to a value of the same type if it's just
  a minor version change?
cli: typing `chalk eval {` should not immediately eval, it should let the user finish the expression
optional lenient type system - allowing type casting
  maybe this should be even the default
async block? `async { await foo(); print("a") }; print("b")`
  prints `ba`
`(<) &= (Int a, Int b) => divides(a, b)`
what about linear type systems?
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
named propositions which alternative?
  or `prop P = All C c: c.a > 0`
  or `P: All C c: c.a > 0`
  or `P = All C c: c.a > 0`
  or `let P = All C c: c.a > 0`
  TODO `prop` vs `class`
  Insert this as a note to the spec: "The only reason `prop` and `class` are
  distinct types is that, if they were the same, it would confuse programmers."
++ for tuple concatenation
`fn foo(A a, B, b) Ret namedReturn { fnBody() }`?
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
sugar: `$T` for `SharedPtr<T>`, `!T` for `UniquePtr<T>` and `~` for boolean negation?
  also, `Exists!` for unique exists (or a new keyword, `Unique`? (`Uq`))
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
instead of closures, have sth like:
  ```
    class X() {
      let x = 0; // Local variable of the constructor.
      private i = 24; // Private variable
      pub p = 'asdf'; // Public variable
      
      pub
    }
  ```
include in the spec in a note about operator precedence:
  How to mentally parse a Chalk expression:
  0. Parentheses. Parentheses are always right.
  1. Find all `return`, `break`, assignment, `comptime` and `const` tokens in
     the expression. Everything to their right is their subexpression.
  2. TODO
all functions must provably contain at least one top-level terminating
  expression (ie. expression of type `None`)
  Is it right to call any expression of type `None` terminating?
```
Null foo() {
  Null a() => a()
  
  a(); // Ok, will terminate
}

Null foo() {
  Bool a() => a()
              ^^^ Error: expression is not deterministic/computable.
  
  a(); // Error: expression is not deterministic/computable.
}

Null foo() {
  Bool a() relation => a()
  
  a(); // Error: expression is not deterministic/computable.
}

Null foo() partial {
  Bool a() relation => a()
  
  a(); // ???
}

Bool foo() partial {
  Bool a() relation => a()
  
  return a(); // Error: foo is (a relation,) not a function.
}

Bool foo() relation {
  Bool a() relation => a()
  
  return a(); // Ok, this is a valid relation `{ (tt), (ff) }`.
}
```
should instances of named classes be assignable to variables of anonymous types? I think so.
block is an operator - operators are syntactical forms which evaluate their
  subexpressions and return a value
`&&` vs `and`, `<->` vs `fii` (iff sounds like if, fii pronounced like "fee")
linear optimization, oprola-style:
  ```
    // Just the 2d case.
    getOptimalPoint(
      fn: (( Real, Real ) -> Real) where isLinear(fn),
      constraints: []Constraint where hasUniqueSolution(constraints),
    ) -> Real
    {
      mut solution = ( 0, 0 );
      
      for point : ( Real, Real ) {
        constraints.allow(point) & fn(solution) < fn(point) && {
          solution = point;
        }
      }
      
      return solution;
    }
  ```
memory idea: pointer args cannnot outlive fn invocation, caller must guarantee
  the arg will live as long as function runs
version control - everything should be syncable. If someone renames a branch and
  then syncs with other repos, the branch should be renamed upstream as well.
can comments appear before function params?
are own members inherited by traits?
```
Null foo(String s, ...Int ints, String t) {}

foo("", "");
foo("", 0, 1, 2, "");

class C {
  foo(...() this) {} // asdf
}
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
type correctness means that all valid programs are type safe (or vice versa?)
should comptime type creation be allowed? if so, should it be possible
  to use interfaces of comptime-created types? I do not like the idea of
  type correctness depending on results of general computation, possibly with
  the restriction that it provably terminates.
warning if a module imports itself?
unary versions of associative, and associative and symmetric operators?
  `(++)([ [ 0, 1, 2], [ 3, 4 ] ]) == [ 0, 1, 2, 3, 4 ]`
  `(+)({ 0, 1, 2, 3 }) == 6`
should there be a way to compare pointers for equality (`====`, four equals)?
  there should definitely be an optimization that detects axiom `a == b -> a ==== b`
  and replaces the equals call with pointer comparison
graphics effects like windows callendar in the taskbar - how to create/describe them?
  components affect multiple layers of color, those layers have separate filters
version control - also track directories
version control: if someone renames a variable in one branch, and someone uses that
  variable with its original name in another branch, merge should rename that new mention
  too.
  Moving files and folders should work, too.
should anonymous classes be allowed to have private members?
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
json support, comptime json import, or a subset of chalk maybe.
remove `set` keyword, rename `get` to `read` / `rol` / `rdo`, rename `pub` to `publ`?
syntax for quotient types?
even in imerative flavor of Chalk, it should be possible to call an effectful
  method on a new, duplicated object instead of the original one
functional array literal `[ a, b, c ]` should actually encode one of: ?
  `( a, ( b, ( c, null ) ) )`
  `( a, ( b, c ) )`
  or should array have multiple implementations, line in JS?
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
what the compiler must know about variables: every variable is assigned
  an instance of `class {}` called <del>partially known value</del> static value.
  When a property p0 (or its property p1, or its property pn) of a variable V
  with a value N is assigned a static value M, then V's static value becomes
  `{ ...N, p0: { ...N.p0, p1: ..etc.. { ...N.p0.p1.etc.pn-1, pn: N } } }`
  Branches that can be resolved using static values can be optimized.
  Note: is this what symbollic execution is?
Instead of calling the main function, the first code should be instantiation of
  the `Main` class? Or either? Should it necesarily be in `main.chalk`?
generic classes that are co/contravariant?
  ```
  class X<type T : ATrait> {}
  ```
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
both then-else/thand/thelse and &&/||; the latter always returns a boolean
  perhaps the right hand side of && and || should be forbidden from having
  side effects?
well-orders can be captured by types of pairs
if a trait has a generic parameter called Self, then it must be the zeroth parameter,
  and it must equal the class that implements it?
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
all overloads of a variable should be next to each other, with the possible
  exception of function declarations - if someone wants to have them at
  the beginning of the file, who am I to judge?
inside functions, types are hoisted, but nested functions cannot be called before
  referenced variables are defined (JS has a cool name - temporary death zone?)
enable function declarations for the same purpose as in TS?
  ```
    abs(LTE(0) num) -> -1 * num;
    abs(GTE(0) num) -> num;
    abs(Int num) => num >= 0 ? num : -1 * num;
  ```
option to order class/trait members alphabetically unless separated by (two) empty line(s), per class
chalk, unlike TypeScript, should not prohibit default values of params with generic types
  if the default param is not of the type of the generic type, it should be a call-site error
  alternative: instead of `x: T = y` make people type out `x: T = y is T then y else undefined`
IDE: When there are multiple curors, there should be a way to make just one of them active,
  cyclically switch between them, and make them all active again.
keywords: now, then (`Int | Text now Text then Odd`?), else (`for { ... } else`).
  Maybe `X >>> Y` should be a syntax sugar for `X | Y now X then Y`?
IDE should warn if renaming a property changes semantics of a program. Eg:
  ```
  trait Foo { a(); }
  trait Bar { b(); }
  
  Foo | Bar t = baz();
  
  // This calls b if it exists. Renaming $Foo.a$ to $b$ should produce a warning.
  // Or offer to replace it with `t is Foo ? null : t.b();`
  t.b?();
  ```
Chalk (without garbage collection) can call ChalkScript code by providing an explicit garbage
  collector object. Other parts of code can access objects that are managed/owned by a garbage
  collector only after they register their access to that object (so that the GC does not collect
  the object prematurely).
Not yet initialized (member) variables should have type never, or undefined. Decide which one.
if the return type is a computable unit type the return statement can be omited
type system should not be structural, and perhaps it should be possible for numbers to have units
  ```
    let c = 299 792 458 * meter * second ^ 2;
  ```
** or ^? Maybe both at first, but I like ^. On the other hand, type-level xor might be
  useful, too
leading & and | operators
  ```
    let T =
      | A
      | ...
      | H
      ;
  ```
unary < and > type operators
  ```
    let <Int i; // A variable whose upper bound type is Int.
    let >Even i; // A variable whose lower bound type is Even.
    let Even <.< Int i; // A variable whose bound typess are Even and Int.
  ```
rename class/trait properties, either when implementing, or just ad hoc somewhere.
  ```
  import math as { Group };

  type AdditiveGroup = Group rename mul to add;

  class MyInt : AdditiveGroup {
    // This is the implementation of `Group.mul`.
    add() => ...;
  }

  type T : Group = MyInt;

  T.mul; // Not an error. (?)
  ```
IDE: if some characters are automatically erased (eg. a matching brace when
  deleting the other brace), Ctrl+z should undo the erasing
`{{ String foo }}` - a type of all objects with a string property `foo`? The
  objects can have other properties, however, they must not be used.
  alternative: `type { foo: String }`. Such types cannot be extended,
  cannot contain default members, etc
  Because of security, extra members MUST NOT BE USED, not even with
  sth like `x is { bar: Int } and x.bar`. This would result in hard
  to find bugs where someone passes an object among multiple functions
  where the outer function does not declare that it uses an extra property,
  because it doesn't except in a call of another function.
  Especially bad if that extra prop is sth like. `httpPort`, `password`, etc.
releases and a way in code to inspect the current release?
  ``` project.chalk
  export releases = { // Automatically an object of Settings, contents of `project.chalk`.
    minimal: {
      soundEnabled: false,
      cacheDuration: 0,
    },
    [...]
  };

  export pub-class Settings {
    Bool soundEnabled;
    Nat cacheDuration;
    [...]
  }
  ```
  if you decide to do sth like this, remember that libraries should be
  usable without editing their source code, so at least for libraries,
  this should perhaps be controllable just with function call arguments
  OTOH, even big libraries would benefit from publish-time ability to
  produce a minimalist version that's much smaller in size
imperative type system will probably require a read and write views of types.
  `A` is not a subtype of `A | B`, because the latter is a type to which one
  can write B, and the former is not.
  `A` is a subtype of `read(A | B)`.
`Array[T].dedupicate(this, eq: (T, T) -> Bool)`
  ```
    class[All type T] C = Set[T]; // Legal.
    class[All type T] C = Set[T] | Set[Null]; // Error: a type is not a class.
    type[All type T] C = Set[T] | Set[Null]; // Legal.
  ```
`{ a as x } = m` for maps, `let { a as x } = o` for objects?
optional language geatures (eg. member renaming) should be controllable
  per library, or, if sensible, per smaller units (module, function, block) as well
try catch - should it be `try { ...; catch [ [ErrType] err] {} }`?
  that the scope of catch is not a subscope of try often requires moving variables
  to try's superscope. However, maybe it should be that way, otherwise catch
  might have access to uninitialized variables.
chalk compiler option: `--IBelieveInFairyTales`. Enables the `have faith` keyphrase.
  `[expr] have faith` is like Typescripts `[expr] as any`
  or perhaps not. If you want checks, use runtime checks.
db: allow caching (for a specified amount of time) of results
  of expressions, caching of whole tables, as well as mirroring of tables (like caching,
  but with automatic updates), maybe also automatic updates of queries?
dependent types can also look like this:
  ```
    type A = [Ex T: type](T, T[])
    
    A a = (4, [ 3 ]);
    A b = ('a', [ 'b' ]);
    A c = ('a', [ 3 ]); // T = Object.
    
    type B = [Ex T: class](T, T[])
    
    B a = (4, [ 3 ]);
    B b = ('a', [ 'b' ]);
    B c = ('a', [ 3 ]); // Error.
  ```
`type Prefer[finite A, B] where A < B = B` type that tells the IDE to suggest values of A?
  eg. if im typing for `npm.uninstall('a<<cursor>>')`, and `Prefer[InstalledPackages, String]`
  is the type of the parameter, I could be offered options to fill names of packages starting
  with "a".
have two versions of set and map, one that works on equality and one on identity?
  SetEq, SetId. SetEq should be optionally usable with any equivalence relation
Time.nowS, Time.nowMs and Time.nowNs instead of Time.now
  ```
    let t = Time();
    
    await ...;
    
    t.elapsedMilli()
    t.elapsedHour()
    t.elapsed(Time.hour);
  ```
`if-name ... { a() and break-name; b(); }`
make it harder to use json than a subset of chalk with no to little
  computation, because json has no restrictions on the type of the object, so
  ```
    import a.json // TODO should this create an uppercase variable?
    
    A.foo; // Perhaps an error even if 'foo' happens to be in `a.json`?.
    // If there was something like xml schemas for json that could be directly
    // in `a.json`, I would not be so strict.
  ```
there should be an easy notation for both all subtypes of a class and
  all sybclasses of a class.
  In case I want a variable containing a class that is a subclass of C,
  i want the latter.
A trait that implements a trait should be able to define its `own` properties
  that the base trait defines as static.
A trait mustn't be able to define abstract members if they are nonabstract
  in the base trait.
it should be provable that any type `A & B` can be replaced with `B & A`
  not true with eg. typescript
computing with first-class propositions?
  ```
    let asdf: prop = All x in arr => x is Even;
    
    return asdf;
  ```
  ```
    fn EvenAt[All arr: Array, All x in arr] >> prop => x is Even;
    
    let a = [ 42, 43, 44 ];
    
    holds: EvenAt[a, { 0, 2 }];
  ```
note: the compiler may offer additional help (ideally, clearly distinct from
  errors prescribed here), but it MUST NOT accept input the specification
  doesn't prescribe as correct.
  In particular, the compiler may use better type inference to suggest
  a fix of a type error, but it may not accept code even if that better
  type inference guarantees the program is correct.
`import file as { patterns as *, _rest as * }` - imports all exported symbols,
  and all contents of the interface of patterns, into this module's scope
`implies` - a control flow analogue of `->`?
  or just give every operator a short-circuiting semantics if applicable?
do not support octal number notation - 0. it is never used, and 1. o looks too much like 0.
maybe object literals are unnecessary.
  this thought is weird, because I'm used to them, but now when I think about it,
  it seems like they are just a remnant of a class-less javascript where people
  thought that prototypes are a good idea (spoiler: they are terribly stupid)
  I'd still need syntax for importing specific exports, and curly braces may be
  part of that syntax, and I may support object destructuring and named parameters,
  because those are useful, but not objects that are not instances of a class.
  
  If I decide to keep object literals (even if just as immediate arguments to
  function calls), I'll need syntax that does not conflict with type annotations.
  I don't like TypeScripts solution, because it does not allow annotating properties
  individually.
  
  `{ .a: T = foo() }`, or `{| a: T = foo() |}`
  
  `{ a -> let a, b -> asn c, c -> { asn d } } = foo()`?
  
`class X < FromTextLiteral { This(text: Text) { ... } } let x: X = 'asdf'`
default arguments in abstract functions: typescript does not allow them
  that means typescript does not allow one to declare a parameter as optional
  without adding undefined to its type. Be better than typescript.
to be able to enforce all invariants about all variables pointing to a value,
  it will probably be necessary to have types of function contexts
  For example, `All a: Object, b: Object => a pointsTo v & b pointsTo v -> a = b`
  might want to specify that there is only one reference to `v`. But if function
  context is not an object, then this property will not cover local variables.
in documentation of `caten` (te `++` operator), explain the difference between concatenation and catenation
  or perhaps it should be named `op`, the monoid/magma operator?
types vs type functions and side effects
  ```
    mut arr = Array(42, 44);
    
    type KeysStatic = arr.Keys;
    type KeysDynamic[] = arr.Keys;
    
    arr.push(55);
    
    // KeysStatic == { 0, 1 }, KeysDynamic === { 0, 1, 2 }
  ```
  syntax is questionable, but both should be doable
str methods
  `str.substringAt(a)`
  `str.substringIn(s, a, b: ThisIndex)`
  or let people use `str.substring(a,b) == s` and let the compiler do the job?
grammar: be careful when using negation - you don't want to allow weird nonprintable
  characters in source code.
documentation generator: from the generated docs, it should be easy to open a console
  where you can try out the documented code.
IDE debugger: for every object in memory, there should be these actions available:
  jump to creation time
  jump to last modification time
  jump to previous modification time
  jump to next modification time
  
  also, time travel should have 2 possible settings - one that tries
  to conserve as much memory as possible, eg. arguments to invertible operations
  are forgotten as often as possible, and recomputed when traveling back in time
  another that tries to make jumping constant-time at the expense of memory cost
  
  perhaps make it possible to have a server IDE that has a lot of memory
  and a client IDE that just controls the server?
syntactic tail calls, under their semantics, local bariable lifetimes would end
  just before the tail call.
throw (or throwif, or reterr) keyword that makes its enclosing function return its
  argument if it is an instance of Error, else results in the argument
issues: ready to close state - something that can be set to transition to closed
  automatically after X days
  timed events in general
a parameter should be detected as unused even if it is passed along to another
  function that does not use it, or at least in recursive calls.
should global state be mutable at compile time? Eg. Sattern has a lot of
  potential comptime preprocessing
  I think all comptime mutable code can be converted to initialize once form:
  if you need shared mutable state to compute something, save it to
  a separate global variable and compute it all in one place, then
  take the info out of that global variable.
debugger should support naming objects
if two consecutive optional arguments have partially overlapping types A, B:
  make this illegal, or
  if the argument is of type A & B, make this a call-site error.
  (in case the types are identical, the leftmost param is given first)
existential types from type parameters should be capturable at call site (?)
  ```
  foo[ All type T, Exists type A ]()>> A => ...
  
  const ret: TypeVarDefinition = foo[String, type TypeVarDefinition]();
  ```
viewTo & viewLen, sliceTo, sliceLen
type assertions should be done with `assertCatchFire` function that crashes
  the app at runtime if the assertion is invalid
floating point numbers should stringify either to the exact value
  a) (0.6000000'007', meaning 007 repeats) or to "~0.6" (?)
  b) (0.6000000`007`, meaning 007 repeats) or to "~0.6" (?)
db: have a constraint "date of creation" and "date of last modification" on Date
This is what Chalk type inference should be able to handle:
  ```
    { true, null } foo() {
      Bool r = ...;
      
      Bool a = ...;
      Bool b = ...;
      Bool c = a & b;
      
      c && r is false && return null; // Asdf.
      
      Bool tmp = a ? r : true;
      
      return b ? tmp : true; // tmp should be known to be `true` here if used.
    }
  ```
  Also, the whole function should be optimized to `a & b & !r ? null : true;`
error bounds in code (imagine error highlighting) should be as small as possible.
  An expression of unbounded size should never be reported as erroneous.
  Eg. A function's return type is not assignable to its outer context? Only underline
  the function's name (or the equals sign), not also its arguments.
chalk / oprola / *maslo*
Oprola basic:
  extract { a } = { a: 5 }; // Destructuring
IDE: in comments, code (text surrounded with \`) should be treated as code - syntax
  highlighted, renaming variables should work. Perhaps even error on syntax errors?
IDE: tabs from different projects should be of different color
Version control and package manager must be integrated software. See why people
  use monorepos.
make this part of stlib's Random (or just part of the stlib):
  128-bit id format:
  `B = \[0-9a-zA-Z+\*]`
  `[0123]B B{5} B{5} B{5} B{5}`
  example: `05 kec96+ u7p5a k**vb qlp30`
`export const x = 5`; should be shortenable to `export x = 5`;
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
  import /lib/librario
  import /absolute-path
  import ./relativePath
  
  import Math as * // Math must be an already defined identifier,
    // works like using namespace Math, also usable in functions
  
  log(5); // No need to type `Math.log`;
  
  fn foo() {
    import MySpecialSth as *;
  }
```
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
`value.getName(command) |a> return a;`
it should be possible to overload overloadables by importing them
  ```
    import asdf as { max };
    
    function max() => 0;
  ```
if `(x)` is just `x`, but `(x,)` is a tuple, should there be a distinction
  between these functions? It would probably suck practically, but would be consistent
  `fn foo(n) => n` vs `fn foo(n,) => n`
ordinary `{ ... }` blocks would probably overload the syntax too much, but do blocks
  `do { ... }` seem fine to me.
if `[x]` is function syntax, then `let foo = [x]` must be valid
  (with the possible exception of an added semicolon at the end)
there should be positive infinity, negative infinity, and signless infinity
think about handling installation, for example so that OpenGl can be compiled
  once on one machine.
some proposition will probably work like types in that they will be guaranteed
  to hold for the variable during its entire life, in the same way mutability
  qualifiers work. Should there be a way to circumvent the usual rules for
  manipulating these (eg. only assign immutable data to immutable variables)
  if it provably satisfies the propositions?
=== -> == -> =, identity implies computable equality implies equality
  a = b <-> a and b are the same up to pointers and private information?
`ignore x` returns `null` if `x is Error`, else returns `x` 
  ignore should be a function and not a keyword, since it requires no special treatment
in the presence of async/await/promises, effect types must not only store informaiton
  about variables' possible future values, but also pending mutations
  possible syntax: `Int >>> Even awaits { 2, 4 }` the type of ints that are about
  to become evens with two promises that assign 2, resp. 4 to it.
default destructuring parameters
`export X from "x";`
`a == b == c` should be true if `a == b` and `b == c`? how many operators should
  work this way? all comparison operators, at least
terms that need to be defined: member, field (TODO rename field, because field is a mathematical structure), scope, variable, (symbol?) instance/member variable
should const (and immut) be transitive?
delayed initialization?
  ```
  immut Int i = undefined;
  
  
  ```
`Bool Arr<T>.all, Bool Arr<T>.any, T Arr<T>.some`
should control flow operators be called operators, or just expressions?
  unlike all other operators, they are not sugar for function calls
  if they are operators, should for switch be operators as well?
should all member variables be read-only to other non-friend classes?
  No, because some classes just store multiple vars. And there's `get` for that.
`Collection.pop` - remove and return one element
`Collection.dispense/drop/empty` - (a)synchronously removes all its contents
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
IDE: database + excel-like view of it
opening brace of a block should be immediately followed by a semicolon: `{; ... }`
problem:
make clear the distinction between `Null foo()` and `Null() foo`
one-tuple should be required to behave just like its zeroth element (?)
I was thinking whether to create a language variant centered on math
  that would not have addresses - ie variables would contain numbers
  themselves, not an address such that the memory has a number at that address,
  This would be closer to ZFC, and I thought it would be better for maths.
  However, this is problematic:
   - without addresses, cyclic structures are necessarily infinite[0], and
     there's no way of dealing with them with eager semantics, and *no way
     to find out whether we are processing a part of the structure that
     was already visited*
   - prohibiting haskell-style cyclic structures would be nice and all,
     but it would prohibit infinite structures without explicitly reintroducing
     addresses, because without explicit addresses:
   - infinite structures that contain themselves are necessarily cyclic
  
  [0] eg. `data T = S T`, `let a = S b, b = S a` represents all of these:
    `a <-> b`, `a -> b -> c -> a`, `a -> b -> c -> d -> ... ad inf`
    
  . The real kick: `a` and `b` contain the same value. It's actually `a` containing
    itself.
  
  I came to the conclusion that removing addresses would be probably be
  harmful. Also, if I ever create such a language variant,
  I should prohibit cyclic structures in it, mainly because they do not
  uniquely define a single structure.
  
  Also, the niceness of algebraic datatypes would probably be not as much of an
  advantage as someone might think, because to properly define things to include
  infinite structures, algebraic datatypes could not be used in their
  standard way anyway.
  
  For example, `data BinTree = Leaf | Inner BinTree BinTree`
  does not define binary trees, only their finite subset. The proper definition
  would be like the one in ZFC: a set `S` with a relation `< : (S, S)` satisfying
  certain properties (with the interpretation that `a < b` if `b` is an ancestor of `a`).
  
  Basically, this reintroduces addresses (the elements of `S`), except now
  the addresses are explicitly values, not (metavalues and) a part of the language
  semantics.
`Object.equalOn`, if overriden, should return an object on which equality will be
  checked, (and from which hash will be computed?). This could be used to let programmers
  easily change the equals function without having to completely reimplement it
`forEach(Int start = 0, ?Int end = null, fn)`
IDE: if parsing fails, and there are multiple possible errors, they should all be
  underscored with an orange line.
refinement of debugging semantics:
  ```
  a = defined();
  
  if (undefined) {
    a = foo();
  } else {
    print(a);
  }
  ```
  in the simples "execute both branches" debugging semantics, print prints out an undefined
  message, because the true branch is executed sooner. A refinement could attempt to execute
  both branches independently, perhaps with some memory limmit and a fallback to the simplest
  semantics to prevent an exponential overhead.
no for cycle, just recursion & forEach?
c lang option: --allowSyntacticObscenities (or --fugly-macros)
  will allow macro expansions that violate syntax tree structure
  perhaps the former could be a more general version, also allowing treating things like `"abc" + 1`
  usable in a comment, // @fugly-macros
the `(...): T` function type syntax is wrong
  0. it suggests the params are of a type T (compare to `let a: T`)
  1. it clashes with This(...): memberInit(), list() {}
  alternative: `() >> T`
  also, constructors should be allowed to specify subtypes they return
  `This(...) >> T : member(), initList()`? I don't like the colon for MIL, tho,
  it looks too much like "typeof".
Perhaps use `class A < B` (or `class A <: B`) for extension?
unused nice operators: `<:>` `><` `@`
blocks that are not function / for loop bodies should be preceded by a keyword
  `do { ... }`, or `block` (too useful to be a keyword?)
variable scope is
  0. from its definition to the end of block, if its parent is that block, else
     only inside itself and its subexpressions; or:
  1. from its definition to the end of the parent expression
Set syntax: `Set<Int|String> s = { 1, 2, "abc" }`
`{ a: A }` - type, `{ a as A }` - destructuring & renaming
What is `*mut Int i = 1;`? Options:
  - error: cannot have a pointer to literal. Seems unnecessarily restrictive
    because 1. `*Int i = Int(1);` works, and `1 == Int(1)` is true
  - error: assignment of const value to pointer to mutable type. Same issue as above
  - normal, 'i' now contains a unique value equal to 1; This means literals
    are evaluated each time they are encountered, like composite literals,
    but unline type definitions
`!is` operator
`Null foo(a: Set[Int])` vs `Null foo(a:- Set)` - the former is a type annotation,
  the latter means a runtime check
it should be possible to have references that are temporarily unusable
  ideally able to simulate rust's borrow checker
  eg `b ? String : Undefined` is a type of a reference to a string that is only
  usable when `b` is true
type inference should probably be allowed to introduce new generic parameters
  `fn factorial(n: Nat) => ...` should be inferrable to be `[All type T:Nat] (T -> Nat)`
you might be tempted to define `asn x = foo()` as potentially returning false
  to get extra info out of it. Dont do that - it does not compose well
  with nested destructuring
maybe switch shouldn't have any continue or fallthrough expressions
a way to call default implementation from a trait of a method, if it is overriden
  by the class?
unary minus should not be an operator, but a part of number literal
should objects in variables of type `?T` be convertible to `Bool`?
Should `1 < 2 < 3 <= 3` be valid and evaluate to `true`?
getters? I definitely don't want setters, but getters could be acceptable,
  provided they are pure
compiler should support something like console.log that only works during
  debugging and doesn't need a reference to io stream to print to console
  every use of it should also produce a warning
locality of errors: changing a piece of code should ideally produce error
  at or close to the change.
  This is why I'm worried about proofs in code - if there is semi-successful
  (and it can never be totally successfull) autoproving, changing an invariant
  could theoretically produce seemingly unrelated errors anywhere in code, if
  it means the auto-prover is no longer able to prove what it needs to prove
in every switch, at least one catch must provably always execute
use --- for switching to code in comments? {{{}}} Could be a Set of a Set of
  the empty set.
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
The internets have converged on these names:
  ```
  trait Monoid<T> {
    T neutral;

    T combine(T, T) abstract;
  }
  ```
  See https://github.com/typelevel/algebra/issues/131
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
  []Int b = [
        0;
        1;
        2;
      ];
  []Int c =
      [ 0;
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
operators should only be left-associve in grammar if they are associative semantically
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
cancellable promises
standard library should contain `format(String formatString, ...args)`
  that uses the same formatting options as \`\` string literals
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
IDE: pane that only contains clickable declarations of currently open module
`class C[type T] -> HigherOrderT[C] & Simple[C[...]] {}`
  `T[...]` is a shortcut for the parameters of the class
  compiler should warn that in `class C[type T, type U] -> A[C, U] {}`, `A[C, U]`
  can be shortened to `A[...]` (or `A[.]`? why those extra keystrokes?)
  `trait HigherOrder[type T[type]]` (or `[type]T`?)
`Array(size, initialize(<<Int i))`
think about this when designing errors - the message should be a static function,
  not a member string
  https://softwareengineering.stackexchange.com/questions/278949/why-do-many-exception-messages-not-contain-useful-details/278958#278958
forbid `{}` and only enable `{:}` for empty object and `{,}` for empty set?
  or just get used to that the empty set is useful, and empty object is not
regerex vs regex vs pattern vs sattern? (StringPattern too long)
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
`Collection<T>.map(Null insert(T))`
`{ ?Bool a, Bool b(true) } == foo` compares `foo.b` with true, if it equals,
  assigns `foo.a` to `a`, else assigns null. If this is inside the logical
  and operator, the type of `a` doesn't have to be optional (unless `foo.a`
  can be), because the variable is guaranteed to exist
  variable, if it will be used, will be
do function variables have to be marked partial to be partial?
  or can they be partial implicitly, and have the keyword total?
  I can imagine people will not bother with marking fn variables
  as partial even if they could be
  on the other hand, making them total by default would give
  library authors the guarantee that calling them won't result in
  execution being taken away from them with eg. named return statement
`foo(a) is None` in proofs means that foo doesn't return a value with
  a as an argument.
require abstract keyword from function declarations in traits
copy constructor and equals must be side-effect free, and maybe pure?
one of the parameters of `Main.new` should be `Int64 random`? a random integer
  or maybe `time`, the time the process was started.
should union types have their own values? Should union types be secretly
  pointers like all types are in Java? Should it be possible to
  assign a value to a variable with a different runtype type?
  Could tracking of properties like "this pointer points to a value",
  "the value of this variable is of this type" be extended to arbitrary
  propositions? I'm sure it would be useful for functions to be able
  to ask that their parameters not only have certain properties at when it is called,
  but during the whole execution of it. Some examples: this value will not be
  changed as long as this reference is used (ie. `immut`); this value will not be
  changed by other functions during the execution of this function, this pointer
  will be valid;
chalk compiler - ability to install only parts of CST, like only compiler and package
  manager, and only for certain languages/platform targets
What's the relation between `Null(Int)&Null(String)` and `Null(Int|String)`?
  I guess they are the same type.
  What about `Int(Int)&String(String)` and `(Int|String)(Int|String)`? I guess
  they aren't, are they? From the first type, it is possible to infer the return
  type from the argument type, they shouldn't be the same type.
Two approaches to propositions:
  0. Propositions only apply to a certain point in time, most likely where they
     are defined. Eg. variable `i` is a multiple of 4.
  1. Propositions apply to variables as long as those variables will exist.
     Examples: immut, type of a variable (when refining the type)
Are they usable, useful, or even practical? Is one
  a special case of the other, or are they incomparable? What about their expressive
  strength? Which aproach is the correct one, or are they both (in)correct?
make all mutability qualifiers the same length?
? a syntax sugar converting sth like haskell's `data X = A Int | B String Int` to
  ```
  final trait X {
    ?pub? class A : X { Int m; }
    ?pub? class B : X { (String, Int) m; }
  }
  ```
TODO define - initcall time, maincall time, endcall time?
  runtime != call time of the main function, because of async functions
  and the event loop.
`for a : b` vs `for a of b`?
```
Null foo() {
  let bar = baz();
  
  for a : b {
    a.set(bar);
    
    ///
      This will be converted to a function with constant stack frame size.
      However, `b`'s iterator could have unbounded stack frame size.
      This function needs access to the stack frame of `foo`.
      In order to avoid the necessity of using a pointer to the stack frame,
      the compiler should leave space for this function right after `foo`'s
      stack frame, place the iterator after the free space, and use
      relative memory address to access `bar`, if that's faster.
    ///
  }
}
```
problem: what is `(Int, Int)` - `Tuple<Int, Int>`, or an instance of `Tuple<class, class>`?
stlib: File should mean a random-access ByteStream
higher order or? let A and B be a type functions, is `A | B` well-defined?
```
  Int|String foo() => ...;
  
  try {
    Int i = foo();
  } catch String s => print(s);
```
  perhaps iff the caught value is not an instance of $Error$, the places
  that can throw should be explicitly marked?
  ```
    Int|String foo() => ...;
    
    try {
      Int i = throw(String, foo());
    } catch String s => print(s);
  ```
  this way, if there are other functions that return a String (which would be
  common, I guess), they won't accidentally throw as well
  also, `try { ...; foo and throw 5; ...; } catch i => return i + 42`
`(let t = map.get(foo)) ?&& return t;`
should there be a native `Object.deepCopy`?
should `op=` (eg `|=`) be overridable, or should it always be defined as `_0 = _0 op _1`?
  and should `set0 |= set1` ideally modify `set0` or produce a new one?
array comprehension? (and it solves the semicolon vs comma debate)
  ```
  for i : 4 [
    let b = i % 2 == 0;

    ...(b ? [ 0 ] : []),
    i,
  ]; // Returns [ 0, 0, 1, 0, 2, 3 ]
  ```
higher kinded polymorphism?
  ```
  trait Monad {
    Self<B> bind(Self<A>, Self<B>(A));
  }
  ```
`Map.set(key: K, val: V)` should return `{ map: This, value: V }`
renaming vs type annotation in object literals:
  renaming: `{ b as c } = foo()`
  type annotation: `{ b: B } = foo()`
  both, option 0: `{ b: B as c } = foo()`
  both, option 1: `{ b as c: B } = foo()` - I like this more. Names are together
functions should be monoids?
  ```
  Int a(Int a, Int) => a;

  (Int, Int) b(Bool b) => b ? ( 1, 1 ) : ( 0, 0 );

  Int(Bool) c = a ++ b;
  ```
  also, should functions officially take tuples as parameters, and one-tuples would be
  implicitly convertible to not-one-tuples and vice versa? yes
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
`{ a } => a` and `({a }) => a` should both be valid and represent the same function
when exactly is a variable unused? When it's never read, unless it's (lib?)exported (possibly indirectly), is a sufficient condition. Is it also necessary?
  if it is not read in any used expression, and (lib?) exports count ad used expresisons
  that read the value, I guess
`nowait(T expr) => expr is Promise<?> : null : expr`
autocomplete suggestions and other tooltips should be optionally (and by default?)
  moved to the right to not overlap code below,
  there should be a setting to set transparency of tooltips
(note: I don't understand existential types well,) Is there such a thing as the existential type?
  is `?` the same as `type : Object`?
  should `?` be replaced with `???` to avoid confusion with `?T`?
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
`Observable` trait?
IDE: popups must appear synchronously
version control - it should be possible to do things in paralell - creating, deleting and
  editing branches
version control - warning: branch name is not uniquely independent in time
  option to require unique names? mandatorily prepend branch names with year/date of creation?
version control: renaming a variable and deleting it should merge to deleting it?
version control + IDE: do merges by visually dragging branches?
class members can be private (by default), readable (rdl) or public (pub)?
Console should be a trait, not a class
final trait must specify all classes outside itself that implement it
ui: checkboxes are too small
Package manager - vulnerability tracking
Version Control - comments that need to be resolved before merge can happen
  "pull request view" (ie. comparison) between branches should be avaiable even
  before anyone creates a PR
Version Control should be able to detect when a piece of code was copied. That
  includes copies of code that is being added (ie. when adding code that contains
  some duplicate code)
chalk typesystem should be able to handle vuex store definitions:
  ```
    Vuex.store({
      state: {
        asdf: 3;
      },
      mutations: {
        inc(state) => state.asdf += 1; // should be well typed even though state is not explicitly typed
      },
    });
  ```
IDE: have type debugger that would do typechecking step by step
all gui should be declarative and no app code should run on gui thread?
named switch expression: `switch-a { default: return-a null };`
should there be semicolons after switch and for? There have to be, because they
  return expressions
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
compiler should be able to optimize `fib(i) => i == 0 ? 0 : fib(i - 1) + fib(i - 2)`
  into something with linear time complexity and constant space complexity
error - none of the Chalk grammars I created so far support destructuring of parameters
should `{ a } => a` be legal? (destructuring in lambdas without parentheses) I think so,
  because even the parentheses themselves are destructuring
```
Null foo(Int i, true) => i;
Null foo(Int i, false) => -i;
```
  what about:
  `Int sum[ Int a, ...rest ] => a + sum(rest);`? Or
  `Int sum[ Int a, ...rest ] => a + sum rest;`?
  And `double a => 2 * a`.
stack traces in errors must work correctly even with async await
should this work?
  ```
  class C {
    Bool bool;
    
    Int a = bool ? 1 : 0;
    
    new(_bool) {}
  }
  ```
  I think it should.
should arrays and tuple values be separated by semicolons for consistency with
  code blocks (or code blocks separated with commas?)
  Also:
  ```
  for Int i : 10 [
    i * 2;
  ];
  
  // Or in one line:
  for Int i : 10 [ i * 2 ];
  ```
  could return `[ 0, 2, 4, 6, 8, 10, 12, 14, 16, 18 ]`. Same with tuples.
  That would be a nice syntax for `array.map`. But what about `collection.map`
  in general?
  What about the semicolon at the end?
should this work? and what should be the result?
  ```
  class C {
    Int a, b;
    
    new(C c, Bool bool) {
      bool ? { a = 1; b = c.b } : { a = c.a; b = 1 }
    }
  }
  
  C a(b, true);
  C b(a, false);
  ```
  I think it should.
ChalkDoc - code inside \`\`\`  \`\`\` should be syntax highlighted
function splitting optimization
Is this too much black magic?
  ```
  Set<Int> s;

  s[4] = true;

  ///
    Set could be Indexable, and set.get could return
  ///
  class PseudoBoolean<type T> : Assign<Bool> {
    new(Set<T> s, *T t) {

    }

    assign(Bool b) {
      switch b {
        true: s.set(t);
        fals: s.del(t);
      }
    }
  }
  ```
only those options which are all permissible should be specifiable by command line
some types will require proofs of termination for the default equality operator
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
placement new
fix generators - next() parameters, replacement for function.sent, ...
type conversion between `(T)` and `T`?
Error: missing function body - maybe with explanation that functions don't have
  to, and can't be declared before being defined, and a mention of function
  variables
all io is async
should comptime io be allowed? only in root, ofc
compiling should only ever touch files and folders inside the folder that is being
  compiled
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
implicit closures should be immutable after function terminates
allow keywords as class member names? `class C { \prd = 42 }`
should it be a warning, an error, or neither if a trait
  has both a static and own property, and the type of the own
  property is not a subtype of the type of the static property?
ChalkDoc lists:
  `-` unordered list
  `*` ordered list starting with 0, or unordered list?
  `#.` ordered list starting with 0?
  `2.` ordered list starting with 2, can be combined with `*`
  `**` ordered list, continues numbering from previous list?
```
  class C {} // In a library somewhere
  trait T extended by C {} // If you own a trait, but not the class,
    // you should probably still be able to form a subtype relationship.
```
perhaps a constructor should be able to return an instance of a different class?
  an example: `RuleAt` with invalid constraints
  alternatively, a private constructor and a public factory method.
  a compromise: final traits should be able to have constructors that return
    an instance of a class that implements the trait
a type is an approximation of a value
stlib - buffer should implicitly use little endian, with extra methods with longer
  names for big endian bit manipulations
  ```
    let buffer = Buffer(1);
    
    buffer.setU8(0, 3);
    buffer.getBigEndianU8(0); // Returns 192.
    
    // Perhaps:
    buffer.getU4(0, 0); // Returns 3.
    buffer.getU4(0, 1); // Returns 1.
  ```
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
`if x { y }` and `if x: y` that mean `x == null || y`?
`collection.take(Int)`
should `All class C, (...T) tuple: C(...tuple) == C(...tuple)`?
  And `All class C, C c: c == C(c)`?
value types:
  ```
  ///
    Or _T, &T, or #T, there's enough characters...
    
    One of !T and ~T should be the negation type though.
  ///
  foo(!T arg) {
    t ==== arg; // can they have the same address?
  }
  
  foo(T t());
  ```
binary chalk files, binary library files
grammar amiguity: `(a = 2) <= 3` - is that a tuple with a default argument?
should Enum.size be Int or on of Int32, Int64?
function type `A -> B`, relation type `A => B`, `A --> B`, `A ->> B` or `A -- B`
  `A -> B`, `A <- B`, `A <-> B` - functions (for all A exists exactly one B)
  `A -= B`, `A =- B`, `A =-= B` - relations (for all A exists at least one B)? or:
  `A => B`, `A <= B`, `A <=> B` - relations (for all A exists at least one B) (with lamba notation replaced by )
  `A -- B`                      - relations (no restriction), duplicate of `(A, B)`?
  also notation for for all A exists at most one B (partial functions, and partial relations)
  should all functions be tuples?
delcare parameters inside other parameters' type annotations:
  `foo(Set(type T) s, S -> bool)` shorthand for `foo(type T, Set(T) s, S -> bool)`
when designing standard library, make sure to include things like
  `OrderedTree(type Tree(type X), (X, Y) -> Bool order = X is Ordered ? X.order : undefined)`
  and use that so that people can specify their own orders/so that the same type
  can be used with multiple orders
rename `x is X` to `x of X` of `x in X`?
  The second might be more convenient in props: `All x of X` instead of `All x is X`;
  `in` would be most appropriate if types equal Sets
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
`[]T` is the type of arrays of `T`, `{}T` could be type of sets of T (ie. the powerset of T)
if possible, I'd like to avoid having types `Tt` (or `True`) and `Ff` (or `False`)
  used for proving, they seem redundant because there is `Bool`
  yes if `Tt == { tt }` and `Ff == { ff }`, `Ff` is inhabited, and
  if `Tt == tt` and `Ff == ff`, neither are, but why should I stick to conventions
  if I manage to find a better way?
should traits be allowed to have `own` new? that would return an instance of an
  arbitrary class that implements that trait?
  Eg. `s = Set()` looks nice, but there could be HashSet, TreeSet, ArraySet,
  DefaultSet that is returned by `Set()` and can switch its internal representation
  based on usage
`fn truePropSet({}Prop props, Valuation val) -> All prop in props: val(prop)`
a way to compose types that breaks recursive types? eg:
  ```
  type UntypedSet = Set<Self>
  type USetToo = Set<UntypedSet> // equals UntypedSet
  type SetOfUSet = Set<Stop(UntypedSet)>
  ```
  Let's call `SetOfUSet` a "rank/size/what omega + 1" type.
IDE: enter confirms (whole?) autosuggestion, tab just part, and keeps suggesting
IDE: don't use Ctrl + S for "save file", save files automatically?
IDE: pageDown or pageUp followed by the other should result in the same view
  I am surprised this needs to be noted, but Atom managed to get this simple thing wrong
  should also scroll past file end, and remember offset before file start for some time
IDE: evaluate expressions in tooltips
replace export keyword with pub?
Repl should not enable implicit overwriting declarations by new declarations, but
  should enable their explicit de-binding from the repl namespace
class types starting with lowercase letter must be keywords, else `class() => ...` is ambiguous
`{ a }` should be read as object literal, unless at a place where a block is required
huge problem:
  ```
  // I just made up the syntax, that is not the important part
  type Even = Int(i) { i % 2 === 0 }
  type Odd = Int(i) { i % 2 === 1 }
  
  Int i = 3;
  
  if (i is Odd) {
    Odd o = i; // Error?
    
    i += 1; // Error?
    
    i =< 2; // Error?
  }
  ```
  this is very related to whether generics should be co/contra/invariant
should this be allowed?
  ```
  { a } => a;
  
  class {
    foo a => a + 1;
  }
  
  foo a => (a + 1, a - 1) 5; // Equal to (6, 4)
  
  bar(a, b) => b;
  
  bar foo 5; // Equal to 4
  ```
  I think I should only forbid `foo a => (a + 1, a - 1) 5`, because it's hard to
  see where the function body ends and function call begins. The definition should
  be in parentheses.
`for` loop should take four expressions as arguments?
  ```
  // This would produce unexpected behavior if one expression was omitted.
  for let x = 0; x < 10; x += 1; foo();
  
  // Or maybe
  for let x = 0; x < 10; x += 1; => foo();
  ```
`Null foo({ Int a } = { a: 8 }) {}` should not compile(?). If a value is destructured,
  set the defaults inside, like this: `Null foo({ Int a = 8 }) {}`
```
type Args = foo();

A f(...Args args) = bar(); // Type of a function with any arguments is A(type[] T, ...T args)
(...Args) g(B) = baz();

A composition(B) = f ++ g;
```
should only top-level functions have mandatory return types?
  I think here inside a class counts as top-level
  All (and maybe exactly the?) top-level exported functions, public class functions
  and public nested functions should have explicit return types
these should all be valid functions:
  ```
  Null reverseSign(true, Int i) => -i;
  Null reverseSign(false, Int i) => i;
  
  2 => 3;
  ```
  and switch should use this:
  ```
  switch a {
    2 => foo();
    Odd o => o * 2;
    () => print("A is even and not equal 2");
  }
  ```
should underscore be a character that can be placed anywhere between tokens and
  will be ignored? that would be good for horizontally aligning lines.
`...` in object, set, tuple and array
should anonymous classes be public by default? I think so. You want private types?
  Just name your class.
for loop only requires a semicolon if it returns something other than the default boolean?
regerex - there should be support for grammars that execute graph algorithms
  like finding which functions are called by which functions
inside a class, typing function name and then space should autoreplace the space
  with `(` and gray `)`
`class C<Sub : type T : Super> {}`
  or `class C<type Sub :< T :< Super> {}`
  or `class C<type Sub : T : Super> {}`
```
Null foo() {
  export class C {}
}

foo.C c();
```
  what about public variables, for things like generators?
chalk - let code treat disk as memory? eg. every write gets written to the disk.
  Or have an API for that in stlib
```
chalk : verb args # linux-like commands for a few simple tasks
chalk [code] - runs the code
```
could pure function access outer scope if it leaves it provably pure? eg for caching
version control for databases, images/media
compiler should be able to create examples of how an error can occur, including
  objects in memory that demonstrate the bug when a piece of code is run, or
  generating code that demonstrates the bug
```
prop In(Int min, max)(Int x) => min <= x < max

Int [ a, b ] = [ 0, 5 ];

In(a, b) c = 3; // Or `In<a, b>`.

c = 5; // Error
a = 4; // Error

c = 4; // Ok
a = 4; // Ok
```
private optional params of public functions, finer types of public params
media queries as part of html components/a nice declarative way to specify different
  content based on component size/other props perhaps
debugger should be able to create visual representation of objects in memoty?
inspecting memory of a program should be easy
have a separate type for possibly denormalized floats?
  or have a separate type for IEEE compliant floats, and something saner for normal floats
what about "imperative" propositions like the function will be called at most
  twice (using this reference)?
should it be expressible that an int can be only divided by two if even, else only
  multiplied by 3 and incremented?
  If so, given a proof of collatz, should 1 be directly assignable to such an integer?
warning: comment doesn't end with one of .!?,
  maybe only if the comment is the last one in module, or the next one doesn't
  start with ... (or a lowercase letter?)
`(x)` transforms the operator `x` to a function, eg: `array.reduce((++))`
  are the double parentheses required?
only let modules import from up to the same directory depth?
index.ch - provides exports for a folder, main.ch can contain an entry point
  for the application
parameters that might have a default argument depending on previouss arguments
  `Tree(any T, Order(T) o = T is Ordered ? T.order : undefined)`
don't forget that `type T : A` has interface of A
can Self be generic in traits? Should it refer to the class or class template?
destructuring - enable assigning to a finer type, destructuring fails if value doesnt typecheck
IDE setting: open files in a new browser tab vs in a pseudo-tab rendered by the IDE by default
  right click should offer both options
virtual variables: those that are not part of runtime, but are used in proofs?
optimization: remove all parts of program that are not used during runtime
  this is strictly stronger that "remove all unused parts of the program",
  because some parts might be only used during comptime or in proofs
require four dots to rewrite properties (object literals)
a problem of type transformations:
  a function foo takes param `A|B`, and returns C if arg is A, D id arg is B.
  what is the type of this function? the relationship between arg and ret must be preserved in its type.
  `C(A)&&D(B)`
`module extends X`
allow access to private members if the code could provably have the same effects?
  Use case - moving objects in memory
? `class C<...> { .. }` sugar for `class C(...) => class C{ .. }`
imagive a stack of boxes with close buttons. mouseover on the close button should
  highlight all close buttons of boxes to the right. How could this be done using
  only a declarative, css like language
foo?.(arg)
ide: save project online, save to localStorage (with a warning about deleting
  history/browser autodelete), download to zip
matching parentheses should have red color
a nice syntax for logical definitions of functions is needed. an attempt:
  ```
  class equals(Set a, b) = True <-> (All Set s: s in a <-> s in b);
  
  This is soooooooooo wrooong.
  
  But at least it's clear now what is needed.
  ```
  Later: what did I mean by this?
  `prop equals(Set a, b) = All Set s { s in a <-> s in b };`
  `Bool equals(Set a, b) => All Set s { s in a <-> s in b };`
  `Bool equals(Set a, b) = All Set s { s in a <-> s in b } => tt, _ => ff`
  
  ```
  Bool equals(Set a, b) => switch TT {
    All Set s { s in a <-> s in b } => tt;
    _ => ff;
  };
  ```
should let be transitive?
`=<` assignment operator, `=<<` move operator?
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
```
class String {
  // Must match the whole string
  Match match(...args) {}
  Bool matches(...the same args) {}
  
  // Can match a substring
  Match find(...the same args) {}
  Bool contains(...the same args) {}
}
```
release a library that would format code on web just like the IDE, also
  let tabs from the IDE be loaded in an IFRAME
IDE filesystem tree - remember which subfolders were opened even after folder
  is closed,
  underline files with errors/warnings and folders that contain them
  go to next/previous error
  go to next/previous error or warning
  autofix warnings
delayed instantiation: (ie. `new(...) :: {...}`)
  subtypes are instantiated as soon as all their fields are instantiated
  For all classes, a subset of their member fields together with members
  that explicitly use only that subset are a subtype
  maybe grammar:
  ```
  class A {
    ///
      TODOs:
      
      0. Is destructuring allowed here?
      1. Do `a`, `b` and `c` get initialized to 2, 3 and 4 with the default constructor?
         The rest of this code example assumes they don't, if they do, mentally
         remove the initializer.
    ///
    pub (Int a, Int b, Int c) = (2, 3, 4);
    
    new() :: {
      a = 0;
      
      ///
        Error: `this` is not yet initialized to type `T`.
        
        The type of `this` is now `{{ Int a }}`;
        `T` equals `{{ Int a, Int c }}`
      ///
      foo();
      
      c = 1;
      
      foo(); // Ok
      bar(); // Error: `this` is not yet initialized to type `A`.
    }
    
    foo(T this) {}
    
    bar();
  }
  
  type:A T = Type(A, { A.a, A.c });
  
  // What about:
  type T = {{ Int a, Int c }};
  ```
`debugger.log` should be part of the language, in debug mode these would
  be turned off by default, a programmer could turn individual logs on if needed?
IDE: align scroll position with line start
pressing and holding Ctrl should display all shortcuts, with text "press Ctrl"
  twice to keep this window open
onmouseover animation should be faster than default, maybe 100 ms?
do sizes of boxes have to add up to 100% of size of their parent?
  with infinite precision?
Saving a file should solidify gray text (ie. autoinserted closing braces)
IDE typing `class Name(Enter)` should insert braces
import automomplete tooptil should suggest names exported from other files at the bottom,
  below a thick line and gray text "from \[path.ch]"
  choosing them should insert a new import
destructor name? out of random 3 letter combinations, I picked (ie. didn't)
  completely dislike: nyn, pap, rie
enum grammar: either all commas and no body, or all semicolons and body.
`{{ A a, B b }}` to represent the type of `{ A a(), B b() }`?
named block (similar to named for)?
debugger:
  step forward,       Left
  step backward,      Right
  step out forward,   Ctrl + Down?
  step out backward,  Ctrl + Up?
  step over forward,  Down
  step over backward, Up
  run forward,
  run backward,
  step over: should it record changes that will become irrelevant?
  step over: if the current expression is a function call, step to next subexpression,
  else step to next expression of the block
if traits will one day contain fields, they must not require being assigned,
  because that responsibility can be left to classes that implement it.
cannot find path/library path cannot contain "x", did you mean "y"?
package manager - generic names (like eg. `http-server`, `formatter`) are up for
  grabs by packages that are vastly more popular than the one that currently has
  the name (assuming that the name is descriptive of the more popular package too).
  The process of changing names should be maximally transparent and last enough
  time for everyone to nocie, also users of the library should be notified,
  semver mayor update must be necessary.
package manager - do not offer deleting a package, only offer "unlinking".
  if author unlinks his package, other people might link it, dependencies add links,
  package is only deleted if there are no links to it.
  A certain number of stars (likes/whatever), downloads or other activity should
  count as link.
a convenient way of testing a poperty of an object that might not exist?
  0. compare with `undefined` (wwhich wouldn't be a value, just a syntactic
     pseudo-value)?
  1. maybe all properties of object of anonymous type should have the value null?
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
TODO possible path formats
  1. `/absolute/path`
  2. `./relative/path`
  3. `library/path`
  4. `@other/special/paths`?
  5. `@/other/special/paths`?
  6. `#/other/special/paths`?
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

// Note this is why the syntax is wrong - it reverses the parameter order.
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
classes should be functions that return their instances
keyphrase (like `using namespace` in c++): `trust me that "assertion"`
  this would generate an error message, but it's better to have 1 error
  saying "Code contains an unproven assertion" than 50 errors saying
  "Even might not be TwoPrimeDecomposable" at random places
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
`Set.of(a, b, c)`
operator is an expression which consists of one or more subexpressions
  which it evaluates and returns a value computed using values of those
  expressions
  operator is also syntactic sugar for a function call
maybe `123 .add(5)` should be well-formatted, instead of `123.add(5)`
  the compiler should be smart enough to handle both, but the second might
  be harder to read
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
reserved words:
  implements, and, or, not, Un, In, And, Or, Not
```
  // Right indentation:
  type T = asdf
    | record {
        asdf: Nat;
      };
  
  type T =
    asdf | record {
      asdf: Nat;
    };
  
  // Wrong indentation:
  
```
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
Variable address is not the same as address of a value in memory, but server
  the same purpose - to uniquely identify a value. There's at least one difference:
  every value has unique address in the spec, whereas a class instance can have
  the same address as its zeroth member variable in memory.
  Address (as used in the spec) is not meant to represent addresses in memory
  on real-world hardware.
  Or maybe the above should be irrelevant because of an implicit as-if rule?
probably my biggest issue with CoQ is that it's unreadable, and someone who
  knows proofs in natural language cannot understand Coq proofs without learning
  the language. Proofs in Chalk must be easily readable to any mathematician,
  whether or not he has seen Chalk before or not.
  The other issue is that Coq requires the reader to hold too much information
  in his head (the current goals), information which isn't even explicitly part
  of the code. Proofs in Chalk should be more explicit.
`class A<type A, B, A : type C : B> {}` C must be a supertype of A and a subtype of B
`atomic` keyword for atomic operations that can be reordered, `shared` for non-reordeable
  statements?
  `shared;` acts as a memory fence?
All parts of language that require proofs to make a program potentially compile
  must be explicitly required by the programmer.
  Eg. assigning an immutable reference to a mutable variable or vice versa
  could require a keyword `mut` (or `immut`, respectively).
  The first advantage is that compiler errors will be more understandable
  if the programmer doesn't wanna use proofs, and less brittle (less prone
  to appear in unrelated parts of program or after seemingly unrelated changes).
  Another one is that it will be easier to learn Chalk, since the more advanced
  concepts (proofs) could be delayed.
maybe compiler should be able to use some propositions to decrease a type's
  instances' size in memory
  ```
  class A {
    Int a;
    Int b;
    
    All: a == b;
  }
  
  class B {
    Int a;
  }
  
  Reflect.size(a) == Reflect.size(b);
  ```
instead of:
  ```
  type<class> NonemptyArray = class<any T> {
    pub []T arr;

    assume Prop = ...;
    
    implicit new(_arr) {}
  }
  ```
  have a syntactic sugar like this?
  ```
  type<any> NonemptyArray = [] where Prop = ...;
  
  type<any> NonemptyArray = [] where All NonemptyArray a: a[0] != null;
  
  type<any> NonemptyArray = [] where {
    PropA = ...;
    PropB = ...;
  }
  ```
  so that dependent types have a nice syntax
  or:
  ```
  class A {
    Int a;
    
    new(_a) :: {}
  }
  
  class B : A {
    assume a % 2 == 0;
  }
  
  B b0 = A(2);
  B b1 = A(3); // Error
  
  A a0 = b0;
  A a1 = A(3);
  ```
`auto (head, tail) = array.ht()`
  `array.head` and `array.tail`?
replace `Set<X> s` with `Set(X) s`
  ```
  class Even : Int {
    All Even n: Ex Int m: m * 2 == n;
  } // Equivalent to `prop Even(Int n) => Ex Int m: m * 2 = n`?
  
  Even n = 4;
  ```
should `[ let ...a ] <= foo()` produce an error and guide the user to replace
  `<=` with `==`? (`[ ...x ] <= foo()` can produce true for many values `x`)
function definition regex: `?Type ?Name (TupleLit|VarDest) ("=>" Expr|Block)`
what about array views/slices and expansions?
  if you'll support array views, it will mean that two value type variables
  will be able to point to the same memory
allow explicit non-determinism?
  eg. a function that sorts array can return equal elements in any order
  EDIT: wtf was I thinking about?
do not warn for `true && e;`
it should be easy to look up how much memory is used/free
operator (perhaps `a |> b`) that behaves like `(a, b) => a is Null || b(a)`
  or maybe `A|B var = foo(); var |> (A a) => callThisifVarIsA(a)`?
  or `foo() |a> console.log(a, a)`, where `a` was assigned the value of foo
  is this necessary, since there is `{ let a == foo(); console.log(a, a) }`?
```
switch expr {
  is Car:
  is Wheel:
}
```
have a tutorial for non-programmers
repace `get` and `set` keywords with something else, these would conflict
  with method names
  `get` could be `cst`? Is `set` even needed? I don't think so
`Ex` vs `Exists`? keep both temporarily and let users decide?
  the less popular could be dropped and the compiler could replace it with the
  more popular one
The ~80 chars per line limit should not count leading space
even empty lines should contain the leading whitespace
```
// Haskell has joined the chat
switch a {
  case [ 0, ...b ]: foo(b);
  case [ 1, ...b ]: bar(b);
  case _: baz();
}
```
```
// ???
foo() {
  Bool b = false;
  mut i = 3;
  
  // typeof i = { 3 };
  
  bar(Bool b -> !b) -> !b, i -> i + 1 {
    i += 1;
    
    return !b;
  }
  
  bar(b);
  
  // typeof b = { true };
  // typeof i = { 4 };
}
```
`Reflect.getKey(obj, key)` vs `obj[key]`?
IDE: the currently opened files and currently displayed file should be
  colored in the tree view
async constructors? `await File(folder, "path/to/file.png")`
different compiler methods for outputting a binary vs just producing warnings and errors
  the latter should be optimized to produce errors near edited source fast
how to solve this: a class with a member variable of function type that can return
  any value
number formatting? `"$#+03.2{foo}"` -> "+007.53rd" if foo equals 7.53
should all multiline strings be in chalkDoc?
for a while, maybe support both `let Type foo` and `let foo: Type`, and the use
  one for ChalkScript and one for Chalk++?
  `foo: Type` is not usable in object literals, another syntax needed?
modules can have a default export, but then they cannot have any other exports?
  ```
  // File `a.chs`.
  let i = 3;
  
  export i * 3;
  
  // `export let x = 4;` would be an error.
  
  // File `b.chs`.
  import nine from a.chs;
  import { isPositive } from a.chs; // Ok and equal to true;
  
  // `import { a } from a.chs` Error: value 9 cannot be destructured to `{ a }`, 9 doesn't have the proberty `a`/ `9.a` is undefined.
  ```
return values:
  `foo() -> String x => ...` named return value that is **not** a variable, useful for `where` clauses
  `foo() -> String x() => ...` named return value that **is** a variable return (doesn't have to/musn't?) take expressions
`git init --separate-git-dir=./local .`
  also initialize the local/ folder with a .gitignore
stlib `type Char = String x where x.length == 1`;
`{ a: 3, b: this.a, c() => This.a(this) }`
If variable initialization contains a pointer that is provably never dereferenced,
  that pointer does not count as a dependency on that variable?
  eg. this is fine
  ```
  class A {
    *A a;
    
    new(_a) {}
  }
  
  A a(b);
  A b(a); // This variable, officer
  ```
  That would mean pointers can exist before the values they reference
debugging for type inference, or all other nontrivial parts of comptime
  evaluation of code
once the spec is more or less complete, look at everything ever written
  in this repo (read all commits) to see if all you agree with is actually true
pull requests should be tied to a commit, not to a branch
by default, suppress all but first x warnings (and errors?) if there are too many
  (and inform about it in output)
hotkey profiles that are easily changed (eg. separate set of hotkeys for debugging)?
IDE: go to next error, go to next warning (in this file/all opened files/all files)
git merge is badly named - merging sounds symmetric, but it is not one branch is modified, the other is not
  your vc should name it better, maybe `chalk pull branch` (and `chalk pull remote`
  for pulling from upstream, and error message for `chalk pull`?)
the intersection of two object literal classes is an object literal class with all their properties
have a short summary of the language for programmers
do not depend on the C standard library, replace it
IDE should be able to open images and videos, too.
@ path variables? (webpack)
values of constants should be easily viewable in IDE
rename `get` keyword to `vis` (visible)?
Function objects can hold closure state, `()Null a =< b` copies the closure,
  `()Null a(b, memPtr)` enables placing the closure at a particular memory location
`T t = e` syntax only available if T's copy constructor is pure?
  or require copy constructor followed by destructor to be pure?
vc: also sync 'personal' branches that are just local in git, sync all branches automatically
Visualization of call stack should be divided between library and non-library functions
EventEmitter
comments above return should be part of documentation of functions
  ```
    Null(T arg, U b) {
      if (!arg.foo()) {
        // @default Return the default option
        return b;
      }

      bar();

      if (arg.foo()) {
        // @newU Return new U.
        return U(arg);
      }

      // @default
      return b;
    }
  ```
  Docs:
  Return cases:
  @newU: ...
  @default: ...
trololol
  ```
  mut type T = foo();

  T a = T();

  if (a is S) T = S; // Have fun with designing type checking for that
  ```
IDE: pressing Enter in a comment should replace it with a multiline comment.
  If suggestion tooltip offers a longer piece of code, Ctrl + Enter should complete
  the whole suggestion, Tab should complete just one token.
  
  A check mark at the bottom to disable smart typing (autoformatting, autocompleting
  parentheses, etc).
Version control: If I move a function to the front of another function, and then make
  a small change to its body, diff should recognize the code just moved and was changed
  slightly.
when defining a variable, use suggestions from used, but undefined variable names
version control: things like renaming a variable should produce a merge conflict
  if and only if the same variable was renamed to two diferent names
  and solving the conflict (choosing the right name) should not require the programmer
  to do it manualy everywhere the variable is used
no quotes in imports?
  `import X from libraryName;`
  `Import X from libraryName.`
  `Import X from "asdfNamnam".`
  `import X from ./path`
rename Object.type to Object.class? a value has many types, but only one class
  also, `type` will definitely be a keyword, class might not
significant whitespace: if there is an empty line between a comment and a definition,
  they are considered unrelated
`[a, b, ..., n]`? Syntactic sugar for `[ ( a, c, ..., n ) ]`?
  `a[...]` syntactic sugar for pure function call?
should condition in && and || be pure?
`set.has(set.get())`
IDE auto-refactor: walk through functions to mark them pure if possible
  if that could enable significant optimizations
array.push must return something more useful than the number of elements
  probably the array
IDE: closing parentheses should be inserted grayed out
IDE: readonly views (like commit overview) of code should be on a (blueish?)
  background, and should become editable after doubleclick, readonly after defocus
`Int -> Even` same as `Int x -> Even y` same as `All Int x: Exists Even y`?
  ?Functions have implicitly universally qualified (single) parameter (which might
  be a tuple) and existentially qualified return type. Parameter can also be
  existentially qualified (existential types). Can the return type be universally
  qualified as well?
  Note: try developing Propositional language before exploring the bijection between
  Types and Propositions
  syntax: `All Int x: Exists Even y` vs `All Int x => Exists Even y`?
  lambda syntax: `x => x + 2` vs `x: x + 2`
Non-unary types? Ie. make types the same as relations?
  ```
  {
    Int ( min, max ) = foo();

    Number x = 5 between min and max;
  }
  {
    Int [ a, b, c ] = bar();
    Number a between min and max; // Type assertion
    Number a between min and max. // What about making it a sentence? :D
    Number a is less than min and greater than max. // A step further

    ///
      Could all/most of chalk be doable using plain english, readable and not tedious
      to type?

      Mathematicians might appreciate it (or it will result in more confusion because
      of apparent familiarity).
    ///
  }
  ```
specifying a variable's type should make the compiler forget everything
  it previously knew about that variable.
  This is to prevent the compiler from inferring implementation details.
  If a programmer doesn't want this, they can not specify the type
  Specifying the type T of variable var with previous type P amounts to saying:
  hey, you might now know P about var, but that is just a coincidence,
  I might decide to refactor this piece of code and change the variable's
  type to Q. So I'm telling you: all you are allowed to know about var
  is that its type is T, because it's enough for my purposes.
dlang's `inout`
`All Context c, v: C { foo(); } == V { foo(); } <-> Pure foo`
`foo(Even x -> Odd) => x++;`
zeroth, there must be a distinction of the type values of a variable are allowed
  to have (static type), type the value of a variable is known to have at a certain
  point in space (code) (dynamic type), and the type the value of a variable
  has at a certain point in time (runtime type, which it always `{ v }` for value `v`)
  Multiple variables must be only allowed to refer to the same value (at the same
  address) if their types are equal.
  One might think it should be possible to, for example, assign a variable of type
  T to a variable of type S if T extends S (TODO what about traits?).
  If a variable `a` has a static type `T`, it intuitively means that it will never
  contain a value whose dynamic and runtime types are not subtypes of T. Imagine
  that `a` is assigned to a variable `b` with type `S`, a subtype of `T`.
  This can only be valid if `a` can never hold a value that is not a subtype of `S`
  while the variable `b` exists. In other words, if `a` is `S` WRONG: `a` can be
  a supertype of S because it can have a longer lifetime.
  
  TODO is `Even` actually a subtype of `Int`? `Int` can be incremented by one,
  `Even` can't. Circle and ellipse problem - maybe they are two separate types,
  and are only subtypes if constant.
named return variables
  `foo(A a, B b) -> R r { ..., r = bar(); ... }`
  `bar A a -> B b -> R r { ..., r = bar(); ... }`
  or:
  `fn foo(A a, B b) -> R r { ..., r = bar(); ... }`
  `fn bar A a -> B b -> R r { ..., r = bar(); ... }`
  
  `foo(A(), B())`
  `bar(A())(B())` or `bar A() B()`
  
  normal functions
  `foo(A a, B b) -> R { ..., return bar() }`
  `foo(A a, B b) -> R { ..., return bar() }`
  `fn foo(A a, B b) -> R { ..., return bar() }`
Rename type qualifier keywords to start with upercase letters?
  ```
    Let x = 3.

    Odd x.
  ```
  What about:
  ```
    class C {
      pub let x;

      pub Let x; // Meh.

      Pub let x; // Ugly.

      Pub Let x; // Ugly. Too much typing.

      Let pub x; // Weird

      Let Pub x; // This is the grossest.
    }

    // I mean both of the last comments.
  ```
Does `type X -> Int` mean X is a subtype of Int?
Should `Let Int a` always refer to an integer with a new address?
  Or can specifying variables using props result in a variable that
  that is strongly equal (`====`) to another variable?
<del>In Chalk</del>, as in many programming languages, types have two distinct,
  but related, roles:
  Zeroth, they act as a blueprint for how their values look like, ...
  First, they determine which values a variable can hold. In this sense,
  types can be said to act like sets of values. Chalk takes this idea
  further - types simply are sets. There is no `class Set<type T> { ... }`.
  Computation with sets is done using the same values that tell variables
  what kind of values they can hold.
`{: a, b, c }` syntax for objects? otherwise that would be a set
  or maybe
`{ a - 2 * b | Int a > 3, Int b }` syntax for `(Int, Int).filter((a, b) => a > 3).map((a, b) => a - 2 * b)`
  or maybe switch the sides so that definitions are first and expression later?
  basically set comprehensions. If this, what about array (and tuple?) comprehensions?
  `[ x * 2 | x in arr & x < 3 ]`
classes and functions can trust all values, not only other classes/functions?
network: support both event and promise form of communication?
  ```
  http.on("google.com", res => ...);
  
  http.get("google.com");
  ```
  ```
  let Req = http.add(class Resp {
    Notifications getNotifications(...) trusts http => ...
    
    
  });
  
  Notifications n = await Req.getNotifications(...);
  ```
  ```
  await http.get("google.com");
  ```
all io is async
no global namespace, no global state, no global anything
  no module-wide (mutable) state either
proper namespaces - ie
  ```
  Null foo(Int) {}
  
  { Null foo(String) {} // Here foo is `(String -> Null) && (Int -> Null)`
  };
  
  // Here foo is just `String -> Null`
  ```
should classes be sets? ie. no static methods?
  or maybe
  ```
  class T {
    static foo() {}
  }
  
  T.foo; // Ok
  t.foo; // Error
  
  T.forEach // Error
  t.forEach // Ok
  ```
`Collection` stlib trait
  every collection (Set, Map, Array, Tuple, etc, maybe AnonymousClass/Object)
  is morally required to implement this trait, even though the individual
  types do not have to actually implement it because they are too different
  to have identical method signatures, etc
Solve the equality vs isomorphism problem.
  Is there 'the integers'?
  Is there 'the' cyclic group of size 3?
  The answer to these questions should be the same.
  And I think I'd prefer the answer to be yes, but I'm not sure.
Rename `class {}` to `type {}` and `trait {}` to `abstract type {}`? or just
  `abstract {}`? or just rename `class`? Or rename `class` to `Set`?
version control: in GUI, have buttons go to next/previous commit
comment with no whitespace after `//` is considered code?
`Map<K, V, D>({}, D defaultValue())`, `map.setDefault(defaultValue)`
  return type of map.get is V|D
the empty string (which markdown idiotically does not let me write using backticks)
  `All x {}` and `Ex x {}` should be valid formulas
`{ A, B }` and `A|B` are distinct types (obviously)
  I meant, there is a difference between `foo(A|B arg)` and `foo<{ A, B } T>(T arg)`.
  The latter cannot change the type of arg from A to B.
if you decide to make multiple variants of Chalk (eg with and without side effects,
  value types), the grammar should be different for each so that
  seeing a piece of code would immediately tell the programmer which flavor
  the code is written in and won't cause confusion that having the same
  grammar with different semantics would
good syntax for testing whether partial functions return for given arguments
  `(...args) in foo && foo(...args)`
  `All f, g: (f, x) in lim & (g, x) in lim -> (f + g, x) in lim`
  ```
  All f, g {
    (f, x) in lim & (g, x) in lim ->
      lim(f + g, x) == lim(f, x) + lim(g, x);
  }
  ```
render `sum` with a big plus, not sigma
  and use it for both discrete and continuous summation (which is usually called integration)
just like you unified types with sets, unify functions with maps?
`map.domain` should return a set of all keys
should `&` and `|` work on Booleans? (as ordinary operators, ie. without short-circuiting)
  yes, they should be called "logical and" (or "conjunction") and "logical or" (or "disjunction")
  operators (together "logical operators").
  `&&`,  `||` and `? :` should be called "conditional operators": "conditional and", "- or" and
  "ternary conditional"
should proofs be first-class?
  ```
  foo<type T>(prop f(T x)) => All T x: f(x)
  
  foo(x => x > 3) -> False
  ```
should `{}` be the powerset operator?
  `{}0 == { 0 }` (not `{ {} }`, because `All x: x is {}x`)?
  `{}{ 0 } == { { 0 }, 0 }` (or `{ { 0 }, {} }`)
  `{}{ 0, 1 } == { { 0, 1 }, { 0 }, { 1 }, 0, 1 }` (or `{ { 0, 1 }, { 0 }, { 1 }, {} }`)
generic functions whose generic/comptime params must be inferable from runtime params?
  `foo<{}Int t>(T a, b) -> []T;`
    a function of this type can only return array of 'a's and 'b's?
    or can it return array of any integers since `Int` is an element of `{}Int`?
  `foo<{}Int t>(T a, b) -> []T => [ b, a ]`
should all types be a subtype of `Collection`?
block-local operator overloading (still has to provenly satisfy operator criteria):
  `(>=) = (String a, b) => grammar.translateRelation(a, b)`
`All X x: P(X)` syntax sugar for `True _ = All X x: P(X)`?, where `True = { tt }`
```
  class Topology<type X> {
    Set<Set<X>> openSets;
    
    // or:
    Set<type : X> openSets;
    
    // or?
    type : (type : X) openSets;
  }
  
  class Topology = Topology<?>;
```
if `a != b`, should `T<a> == T<b>`?
  if `a == b && a !!== b`, should `T<a> == T<b>`?
value types and type unions (note the actual characer for might change):
  there has to be different notation for "pointer to A or B" and "pointer to A or pointer to B"
  
  maybe:
  type in Chalk: value it holds
  `A|B`: (pointer to A) or (pointer to B)
  `*A|B`: A or (pointer to B)
  `A|*B`: (pointer to A) or B
  `*A|*B`: A or B
  `A*|B`: pointer to (A or B)
  
  `*a|*b` vs `*(a|b)` TODO this needs some thinking
variable definition should have the most specific type it can have:
  ```
  let a = 3;

  Int is a.type == false; // *
  Int is typeof a == false;

  ///
    * Or should 3.type always be Integer, because it's a property of a value,
    not a variable? I think it should.
    
    Or maybe foo.class should be property of foo, and foo.type should be language magic?
    
    
    TODO use set notation exclusively for sets, types, or both?

    Or should types *be* sets?
  ///
  a.type == { 3 };

  mut b = 4; // Warning mutable variable whose type is a unit type.
  ```
language-level support of vue's reactivity / data flow architecture
compiler should be able to optimize `pos.reduce((a, c) => a + c ** 2, 0)` to
  `{ mut int s = 0; for int i : pos => s += i; s }`
IDE: automatically manage spaces and newlines in comments
collapse types `class`, `trait` and `type` into just `type`?
put this into chalk spec where Regex is defined: Regexes are NOT regular expressions!
  Stop calling them that. True regular expressions are something else, and have
  way less expressing power.
```
Null foo() transparent (or open, or ast) {
  bar();
}

foo.ast // not null

bool bar() lazy { ... (no side effects allowed?) };
```
chalk: redeclare variable to change its type:
  ```
  Int a = 4;

  Even a;

  Odd a += 1; // ?

  Int|String a;

  a = "abc";

  String a;
  ```
  maybe require the redefinition to be in parentheses/make it syntactically diferent?
keep your garbage in your bin
  ie. don't clutter up root folders with files that belong to another specific place
warn if a function name matches `/^is[A-Z]/` - it should start with get. Properties
  should be called `isX`
all `<h0>` - `<h5>` should be allowed to only appear inside `<article>`, article should have prop. outline/contents
double click/ctrl+click/ctrl+dcl on a variable jumps to its definition?
version control and package manager - multiple packages inside one repo?
version control - the folder `/local/` should be the only fs entry that
  is "gitignored"
should there be the possibility to micromanage stuff like function decay (/decomposition),
  memory layout, etc?
  My guess: if it proves necessary for something really crazy, but used
  in specific real-world environments, I guess it should be doable.
automatic type conversion between `T(...args0)(...args0)` and `T(...args0, ...args1)`
try-catch with the following semantics?
  if a method that is directly called in a try-catch block (and possibly in lambdas)
  defined there? returns an instance of Error, a catch block (which must exist
  and must (provably?) catch all error types that are possibly thrown) is executed.
  To propagate the error, it must be returned.
  ```
  ?Error foo() {
    try {
      bar();
      
      baz();
    } catch (SpecificError e) { // Ignore
    } catch (Error e) {
      return e;
    }
  }
  ```
  desugars into
  ```
  ?Error foo() {
    _catch(e) => switch e {
      is SpecificError: null;
      is Error: return-foo e;
    }
    
    _catch(bar());
    
    _catch(baz());
  }
  ```
style: tuple has one space next to partentheses iff it is not a one-tuple
`ignore` keyword if a method can return an error is called without the error being
  used later
  ```
  ignore File.write("this might fail, but I don't care");
  ```
`[ a.b ] <= c`? (destructuring assignment into a general expression)
  or `[ a.b =< ] <= c` and  `[ a.b =<< ] <= c`
  or `[ =< a.b ] <= c` and  `[ =<< a.b ] <= c`
run-time generics?
  or should generics support parametrization by value at all? optimizations can
  use comptime known values even if they are regular constructor arguments
`new(...) :: {}` initializes all members, `new(...) : memberA(...) {}` initializes
  some members, `new(..) {}` initializes none?
  Or should all members be initialized by default? I guess many will forget the double colon
  After the constructor finishes, all members must be initialized
  Better syntax: `new(...) : {}` initializes none, `new(...) : a() {}` some, `new() {}` all
  Or, to comply with 'no proofs required unless advanced Chalk features requested':
  `new(...) {}` and `new(...) : a() {}` all, or error if some are without default constructors
  `new(...) :: {}` and `new(...) :: a() {}` some, or in the body
should `Set<Int>` be a subtype of `immut Set<Any>`?
`class`, `trait`, `type` and `any` should be called "primitive kinds",
  other kinds should be "composite kinds"?
Should `*` be a type template and an instance of `type<type>`? Or should type constructors
  defined in the spec not be templates? Same with eg. `Function<any Ret, any ArgsTuple>`
there should be implicit type conversion between `A` and `(A)`
transactions that deal with situations that temporarily break invariants?
some way to avoid reference counting pointers?
  0. Unsafe pointers that have to be proven correct, that either were created from
     a safe pointer, or that point to an object that isn't pointed to with a safe pointer
     and have to be deallocated manually
should it be possible to turn off proofs/bound checking, etc?
  if someone doesn't care about 100% correctness, it's not my problem
  sometimes, producing proofs might be too costly to be worth the effort
TODO if I want to ensure that all pointer dereferences are valid, I have to ensure that
  there is an order on variables that are 
  However, with this order, it seems to me I may get a proof that there will be
  no memory leaks resulting from circular references, is that right?
  Imagine two objects, each holding a reference to the other. The reference must
  become invalid strictly before the objects. Therefore they cannot exist eternally.
study ada seriously (every feature, if possible)
the more I think about imposing `a == b -> All f: f(a) == f(b)`, the more I like it.
  0. The default constructor satisfies it
  1. That's what equality should be about
  2. Do you want some objects to be equal even if some of their bembers aren't?
     No problem, just make them private and make sure their differences do not
     'leak'.
  What about the other direction?
performance: it should be possible to get rid of reference counting entirely
  what's the best way to do it?
if a compiler detects that a certain assumption is false, could it generate code
  that demonstrates the fault?
```
> chalk ide           // Uses `.` as path, `8080` as port
> chalk ide ./path/   // Uses `8080` as port
> chalk ide :8081     // Uses `.` as path, colon necessary
> chalk ide ./optional/path/ 8081   // Colon unnecessary
Repo found in the parent directory `...`, continue? y/n: y
You can now access the IDE at http://localhost:8081/.
```
should this be legal?
  ```
  class A<any T> {}
  
  type B = A<C>;
  type C = A<B>;
  ```
  Would this enable new types? Or are all such types expressible without
Collection.get(key, ?defVal)
do switch options have to be exhaustive and/or provably distinct?
destructuring returns a boolean true if matched?
  ```
  ( a, b ) = ( 0, 1 ); // Returns `true`.
  ( a, 5 ) = ( 2, 3 ); // Returns `false`, doesn't update variable a
  
  { a: 3, b } = x;
  ```
chalk should have an easy API for creating a wifi server
debounce function/object
the return statement of a function that returns Null can accept any type
pick something other than new as constructor name? cons,destr...
enum None {};
  None is T; // true for any type T
  None is the new noreturn
  what about user defined 0-enums?
  for all types/classes? T, `None is-rel T`
chalk tutorial - include homework?
two types of weak pointers - one guarantees it points to a valid address, but isn't refcounted
haskel like switch unification?
```
class {
  foo() nullable {} // callable even if this might be null
}
```
compiler verbosity levels: by default only print what error is where (?),
  with the option to print details of an error with a specific command (?)
should the compiler be interactive by default?
IDE: interactive type inference
  should be better than "wtf why is there a 20-page type error?"
functions that take params (A, []A), and recursively call themselves
  with a view of the array should be appropriately optimized
chalk format source.chalk
if a top-level or class comment is followed by an empty line, warn if not prefixed "Section: "?
chalk stateCheck ..conditions - tries to find a state of a program that satisfies
  given conditions, valid inputs that can cause such state, and a call stack/call
  tree tha represents a computation from these inputs to the state
it probably shouldn't be possible to get AST of modules or functions from libraries
```
chalk build .path/to/main.chalk, or
chalk build .path/to/main.chalk/MainClassName
```
`type Real = Stream<Bool>; // ?`
if string length < c for a reasonable c, store the string in the pointer instead of in allocated memory
/a/path/with\/just_3_folders/
what is `Bool b = 2 is Int8`?
a way to make compilation output other files than just the binary? eg. to precompute hard
  calculations only once for multiple compilations, to make documentation generation
  a special case of more general functonality, ...
Trait types are like composite types in that their values can have more than one type.
  TODO common name? (Non-leaf types? no, traits can be leafs).
  Assigning values of different types should have the same semantics for them.
  Later EDIT: wtf did I mean by this
should `class<x>` be Object? or should there be some other common type for type templates?
It should be possible to define something in several ways, no definition should be special
  in math, things usually have many definitions
create a cheat sheet for the language
leading and | or operators for
  ```
    let a =
      | foo(...)
      | bar(...)
      ;
  ```
should sth like `[]Int fib = [ 0, 1 ] ++ fib.map((a, i) => a + fib[i + 1]);` work?
  Problems:
  0. How do you combine laziness and side effects?
  1. Can't generators solve the same problem? Well, it's hard to see how they
     could cache the results.
  2. `Stream<Int>() { yieldAll fib }` - should be optimized to have a constant
     size stack frame
Syntactic sugar for `Stream<T>`? `~T`?
Who sacrisfices program reliability to performance deserves neither performance nor reliability.
  - George Washington
warning: unnecessary pointer/heap allocation
revisit the decision to have pointers and value types
`ATrait subtypes C0ofAT|...|CNofAT` if AT is final
async-for
```
block:  { e; e;? }   { e; } *    N/A *
set:    { e, e,? }   { e, }      {,}, {/}, Set()
object: { a: e,? }   { a:e,? }   {}
type:   { T a, T a } { T a }     {}
```
  \* or { e } / {} where required
can classes with private properties be assigned to type `{}`?
for can be without braces if condition is in parentheses?
`123.class` must be illegal, but `123 .class` should work
`Q foo({ Int numA, Nat denA }, { Int numB, Nat denB }) => numA * numB / denA / denB` should this be valid
  even though there is no unique representation of a rational number using (Int, Nat)?
`Q foo({ Int numA, Nat denA }, { Int numB, Nat denB }) => numA + numB` should throw an error
lazy loading like vue's reactivity that only updates those things that need updating?
`m(f) = x => x.map(a => f(x)).pop()` does m return a function? programmatically yes. Logically,
  which element? Logically, Set shouldn't have `pop`, (at least unless its cardinality is not 1).
compile code for multiple platforms (OSes)?
`closure(Set<X> s, Fn<X, X>... operations)`
```
Null foo() {
  let a;
  
  class X {
    Int i;
  } // Semicolon unnecesary
  
  aCondition && {
    bar;
  }; // Semicolon necessary
  
  [ a ] == b; // Otherwise this would be array access
}
```
```
2 + { let a = foo(); bar(a, a) }
2 + (foo() |a> bar(a, a));
```
```
let ...a   <---
...let a

let ...Bool a   <---
...let Bool a

Bool ...a
...Bool a   <---
```
`(A, B) => C` syntax for function types?
`*T` syntactic sugar for `{ T ptr }`
for sets: `get(T default)` vs `get(T create)`?
  for maps: `get(K key, T default)` vs `get(K key, T create)`?
  maybe: `get(T default, Bool create = false)`?
opt-in variant, covariant generic parameters?
routines that can run in the same thread or different threads, local synchronization
`for iterable {}` - shorthand for `for T _ : iterable {}`
make variable constant strictly after declaration, eg `mut x = 1; cst x;`
should pointer type conversion after another conversion be a warning/error?
  otherwise, this would be valid, but probably unintuitive:
  ```
  Int i = 1;
  *Real r = i;
  r = 2; // 'i' is still 1
  ```
```
Null main(?IStream in, ?OStream out, ?OStream err);
Null main(?IOstream io, ?OStream err);
```
warn on unused files and folders
repo should have `config` or `local` folder containing all the garbage that IDEs
  and various tools usually place to the root folder
  `config` / `local` should be ignored by version control
Should the chalk compiler warn about proofs that take too long to verify?
  It should be at least able to measure how muh time is spent
  on what parts of compilation.
what is the semantics of `T a() => a()`? an out-of-thin-air (spurious) value?
  it should be valid iff T has only one instance, else it should be error:
  a is not a well-defined function
is it ok to have a reference to invalid memory if it is provably never used?
  memory is considered invalid after destructor is called. Can it be called
  explicitly?
prolog-like programming of logical statements?
Propositions that only warn if unproven
native syntax for db queries?
function declarations cannot have default arguments, but they can have default
  pseudo args thhat specify they declare multiple function overloafs?
syntax for definitions of noncomputable functions?
require explicit this parameter?
```
All Grammar g: used(g, s) == intersection(all({ g }, String), (g, used) => {&
  "String" in used;
  
  All (name, symbols) in g:
    name in used -> All symbol in symbols:
      symbol in used;
});

///
  Compiler emits a warning if there exists a grammar that does
  not provably only contain used symbols
///
warn All (name, symbols) in Grammar g: used(name, g);
```
`typeof arr[number]`
alternative syntax for `n0 && ... && nn`: `{& n0; ... nn }`
  same for `||` and xor
  usable in long chains of ands that will probably occur in proofs,
  makes them naturally multiline
final trait can be only extended by nested classes? or in the same
  module/library
if an invariant is broken, print it and its comment in error message
relection on functions should be opt-in per function (definition?)
import syntax under comptime conditionals?
shared blocks - atomic execution
consistent with destructuring:
  ```
  let Int a(); // a == 0
  let Int b; // i is arbitrary integer?
  ```
set destructuring:
  ```
  Set s = foo();
  
  // Fancy (and inefficient) way of doing s.pop();
  for ({ T t, asn ...s } == s) {
    
  }
  ```
which is the most basic? `Stream<*T>`, `forEach` or `map`? I think
  it's the zeroth option. Others could easily be created using it.
if a class has private fields, there is no object that is equal to it
fn.innerTypes? class of types declared inside function body
Compiler.parse(String code, Context context)
```
switch {
  case (Int i = foo()) != 4: print(i);
}
```
parralelism use case - sparse interaction
optimization: if a local value is never changed, make it global
Some X x: prop; //for lts checker
allow immutable global variables
IWannaLoseMyJob keyword that will let you use unsafe parts of the language
standard types All, Exists (or Ex)
```
chalk fix rename path.chalk/Foo Bar
chalk fix toCamelCase --unsafeAll
chalk fix toCamelCase // renames variables, including reflextion args, unless it cannot prove such renaming is correct
```
console.in|out?
syntax sugar:
  ```
  All Integer a Exists Integer b: a + b = 0
  All<Integer, Symbol(?) a, Exists<Integer, Symbol b, And<Plus<a, b, Symbol t>, Equals<t, 0>>>
  ```
chalk shuld be able to count lines of code of a function, module, wole project, proof, recursively or not
chalk: add note(s) explaining reasoning behind both chosen and rejected blocking models - async await/blocking calls/promises
  also all major design decisions, including all ways of concurrency handling/communication
what about transactional memory (what about that issue (see wikipedia, infinite loop where it shouldn't be)
should null equal null?
  imagine `class LinkedListNode<any Val> { ?LinkedList next; Val v; }`
  if `null != null`, the default implementation of equals will judge two
  empty Linked lists aren't equal
custom translation packages - ability to define new languages, add target
  architectures or change how standard software is compiled
  eg. changing memory layout of some or all classes and local variables of
  some or all functions so that they are represented by a linear code of
  their standard representation in memory to offer redundancy
stack frame of a function f should contain space for stack frames of all functions
  called by f. If a recursice function cannot be optimized into a loop,
  it has to allocate space for (some of) its local variables on the heap
  The size of the stack should be >= size of stack frame of `Main.new`.
  This way, stack overflow will never happen.
Problem: `==` as defined in `Any` should be total and computable, but for
  some classes (eg. `Function`, `TuringMachine`), this isn't the case.
  What to do with it? Compromise on the total computability everywhere?
  Or let some classes/(other user-defined types) be not subtypes of `Any`,
  which would enforce total computability, but only `Equals`, which woudn't?
if `a` and `b` are function overloads of the same function and there exist such
  arguments `arg` that `(a|b) ...arg` is type correct, `a` and `b` are
  conflicting - this is an error. (Equivalently, if the types of the parameters
  of `a|b` are all non-`None`)
  `A(B)|C(D)` == `(A|B)(B&D)`
If comptime type creation is allowed, use this syntax: `class(members)`,
  `trait(members)`
`++` for function concatenation
should `A(a) == a` be provably true? and should `equals() => false` be legal?
  should `a == b -> f(a) == f(b)` be provably true? 
`\/` operator for xor that is true when exactly one its argument is true
  regular xor (true if odd number of arguments are true)
  1. seems unuseful
  2. already exists: != \/
  `a \/ b \/ c` sugar for `xor(a, b, c)`
this must obviously be possible: `class<class<class> A> {}`
don't forget `export { a: b } from "./anotherModule.chalk";`
  this should also create a variable `b`
should `Int` always be serialized to `Int64`, even on 32 bit platforms? I guess so
for all `T`, should `Set<T>` be an instance of `Set`?
should there be a distinction between `A` and `A<>`?
it mustn't be possible to `assume` a contradiction
what about funcitonal programming? lazy evaluation?
  could eg. the y combinator (if type system allows it) not cause infinite loop?
  ```
  Null foo() => foo(); // Should this terminate?
  ```
  EDIT later: a type system that doesn't allow the y combinator is not a proper
  type system. It must typecheck. Whether it should also not enter an infinite
  loop is a different matter.
  EDIT later - what about:
  An empty function is a function that only calls empty functions.
  Empty functions terminate in O(0).
  This doesn't solve the y combinator issue, but any lazy evaluation strategy
  that I could consider should cover all empty functions
a way to unresolve (cancel) a promise if it is still just waiting in event loop? (later: why?)
compiler should be able to remove not only variables/class members that are unused,
  but also those that are only used for proofs/at compile time
this must be legal:
  ```
  type T = (Bool, ?T)
  ```
  should these be legal?
  ```
  type T<A> = (A, ?T)
  
  (Bool, ?Self) var;
  ```
  should `Self` refer to the outermost or innermost type in the declaration
  (outermost makes more sense to me now)
should pointer type be a class type template?
if an imported file doesn't exist, but the path lacks an extension, try
  looking for a few file extensions, and suggest them in the error message
rename the is relation to extends, and extends to implements?
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
should functions that can call named return have their own type?
what about loop with test in the middle? nope, `while` can be replaced by `condition && break;`
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
for every operator X, there should be `X=`, unless it really doesn't make sense
```
trait A {}
class B : A {}
class C {}

type T = type : A;

T Foo = A; // Ok.
T Foo = B; // Ok.
T Foo = C; // Error.
```
replace `static class A {}` with `namespace A {}`? The former would be problematic
  inside a class. Same problem with `pub class A {}`.
what about `export Int a = (export C b()).num`?
a variable whose type has only one instance should be implicitly assigned that value
  ```
  type True = true; // For every value, there exists a type containing exactly that value.
  
  True t; // Automatically true;
  ```
.tof - text object file, .bof - binary object file: chalk's .json
all classes with only public members are automatically serializable,
  classes with private fields have to explicitly extend `Serializable`
  (or `Serializer`? (hello, Go!)) trait
? `Object` should have a static Bool property printPrivate that is false by default
  and would control whether toString
Object should not have a hash method, or it should be autogenerated.
  Object should have own function `generateHashFn` that accepts a set of members
  of a class and returns a hashing function that generates hash using only those
  members
```
trait GuiElement {
  ?Int width; // + min, max
  ?Int height; // + min, max
  ?Int padding; // + min, max & top, right, bottom, left
  ?Int border;
  ?Int space;
  ?Int margin;
  ?Int outline;
}

width: 100; // Sets width, width-min and width-max to 100;
width: null 100 160; // sets width to 100 and width-max to 160
width: 80 100 160; // sets width-min to 80
```
nested/inner classes should have access to private members of outer classes
unary minus as negation, unary plus as absolute value
allow functions without implementation if their type has exactly one instance
  TODO such a type deserves a name.
autocomplete of function return type/param type should prioritize types that
  are expected in other portions of the program, and make a clear division between
  types that fit and those that don't
in classes, unit type `This` should exist
warn if a comment doesn't end with one of `".", ",", "!", "?", ".)", ",)", ...`?
minimum width of error message, with a different color for the surrounding `^`
  ```
  import "x";
     Missing module comment. (Wrong)
  ^^ Missing module comment. (Right)
  
  foo(1,,2);
        ^  Extra comma or missing argument. (Wrong.)
       ^^^ Extra comma or missing argument. (Right.)
  
  // TODO maybe use foo's signature to customize the error?
  ```
syntax for arrays of exactly n elements (or at least n elements)
  `[n]T` (`[>=n]T`),
  ```
  Int n > 6;
  [n]T t;
  ```
temporarily immutable - to take an immut reference to x, it must be proven it won't
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
allow array indices with number literals in types? eg. `Arr[3] foo = Arr[3]()`?
`class C<Sub : type T : Super> {}`
`Object` shouldn't have `equals` method, trait `Equals` should, because equality
  of some objects is not computable.
`foo(T t?)` -- means that foo doesn't dereference `t`, so it can be used before
  `t` was initialized
for every value V, there exists a type that contains exactly V
inline assembly?
```
class Nat : Semiring((+), (*)) {}
```
Should X be a class or a trait?
  Does the concept of X have many mutually exclusive examples, (or just one)?
  Yes, many examples: it should be a trait?
  No, just a single one: it should be a class?
```
Grammar chalkGrammar =
  [ ChalkModule
  
  ];

class ChalkModule {
  static Rules rules = [ [ Imports, Defs ] ];
  
  new(Imports, Defs) {}
}

class Imports {
  static Rules rules = [ [], [ Import, Imports ] ];
  
  new() {}
  
  new(Import, Imports) {}
}
```
should `[]A|B` parse, and if so, what should have precedence, `[]` or `|`?
don't let the source code define axioms (everything must be consistent), but maybe
  let the compiler do so with flags? Or at least require a compiler flag to allow
  axioms from code
`array.last` - last element or null
  `array.first` or (`array.head`, and `array.tail`? or just `view`/`slice`?)
only the first param has to have an explicit type, `Int(Int a, b) => a + b`?
static member variables must be immutable
`Ast a = { Int i; };`
ASCII only, including proofs. No single-character greek variable names.
website should require little internet connection (fast load times important),
  be single-page, reference should be interactive (eg. instant search of definitions)
functions are const by default
explicitly typed this?
  ```
  trait X {
    static bar();
  }
  
  trait Y {
    static foo(X this) { // X should probably be required to be subtype of Y
      bar();
    }
  }
  
  class Z : X, Y {}
  
  Z.foo();
  ```
excess property checking - warn if object literals have unused properties
`destroy foo` removes foo from scope (and possibly deallocates it)
  should be usable on local value types, too
Should parameters of functions be in front of the return type? `Bool foo() {}.type == ()Bool`?
```
class HashSet {
  Bool add() {...}
  
  Bool shared add() {...}
}

shared class HashSet { /* ... */ } // thread-safe version ?
```
```
Stream<Int> generator(Int yield(Int?)) {
  Int i = await yield() |> 0; // Or `??`
  
  for () i ??= yield(i);
}

Null foo() {
  let gen = generator(???);
  
  gen.next(2) == 0;
}
```
chalk should have a setting to be maximally error friendly - it should compile
  programs even if there are syntactic errors - problematic parts should be skipped.
  (unless a separate setting is present, such a program should console.log that it
  was compiled with errors)
  no type error should possibly halt the compilation. If choosing the right function
  overload is not possible, choosing any or none should be all correct and the
  semantics of improperly typed programs should respect that. The choice should
  be deterministic, and any time a corrupted code is executed, it should be logged
  (unless the setting mentioned above is present)
subarray == contiguous subsequence?
ignore keyword that acts like `ignore(Object a) => a is Error ? null : a`,
  Error cannot be a subtype of the type of a top-level expression
  ```
    fn foo() {
      open("a path to file"); // Error: a potential returned error ignored.
      
      ignore open("a path to file"); // OK.
    }
  ```
Functions returning unit types need not have body only if they are pure, not in general.
  And i'm not even sure I like this feature at all.
  if a function return type is a unit type, and the function body is empty or the last
  expression of the function body has type other than None, an implicit return statement
  returning the type's unique value is appended at the end of the function body.
Do all expressions after an expression of type `None` have the type `None`?
IDE: order imports by folder structure, name,
?order object params by declaration order in type / alphabetic order
browser tabs: on mouse over tab strip, move child tabs under their parent tabs.
  Tab A is a child tab of tab B if A was opened from B, closing A will move focus
  on B, not on the next tab
how to best handle cyclic data dependencies (eg. `T a(b); T b(a)`)? pre-initialize
  them to null, or ensure they are not read until initialized?
  the zeroth seems like a lazy hack with potential for weird bugs, the first might
  be a lot harder
`{ a() { ... }, b, c => 0 }` must be a valid object
ide - highlight trailing space
call them end-of-line comment and block comment
issue tracker: hierarchical issues, very good query support including custom 
  queries, easy way to see (predefined queries?) eg. all your issues, your and
  (new or open), all top-level issues, etc.
  api access to all data
  track unique downloads
show history of file - ie. only commits that affected it
ChalkDoc: should # be used for headings? #notSure. One way to disambiguate hashtags
  from headings is to require a space in headings. Or just use =?
Disallow (or at least warn on) trait names starting with uppercase I or T and
  another uppercase letter so that people cannot name their things IThisIsAnInterface,
  IIAmRetarded, IFactoryFactoryTemplate etc.
run meta-code (or meta prop-edits) that would change code, e. something that would rewrite
  string literals based on their value and whether they are potentially assigned to function foo
`Array.zipWith(Iterable<let A> a, Iterable<let B> b, (A, B) -> let C combinator = identity)`
`{ Int a, String b } & { None a }` should equal `None`
  should `{ None a }` equal `None`?
  should `{ Int ?a, String b } & { None a }` equal `{ String b }`?
empty line counts as semicolon
colon as "knowledge union"?
  `A | B` is the type of elements of A or B,
  `A : B` is either the type A, or the type B
  
  this distinction could be useful when there are mutable values
assertions that certain parts of code is unused under certain settings
IDE: when searching in the whole project:
  0. checkmark "paths" (tooltip "also search in file paths")
  1. three modes: exact match, regex, text/keyword search (google-like "find the best result")
  2. highlight files that contain matches in tree view
not everything should be a type error.
  Prefer "wrong number of arguments" to "type (int, int) is not applicable to (int) & (string, string, string)"
Rename Float to Real? Real64
`pkg.cson` optional dependency blocks:
  ```
    { dependencies: {
        { name: 'asdf',
          version: "3.2.18",
          mask: "3.>1.0",
        },
      }
      settings: { // Custom flags one is allowed to use during compilation.
        primaryServers: String, // Hardcode primary servers trusted by the app. Can be overriden by a configuration file.
      },
      optionalSchema: { // Is this a good idea?
        allowHttp: Bool,
      },
      optional: {
        colors: {
          dependencies: {
            { name: 'colored-output',
              version: '0.2.5',
              mask: '0.2.5',
            },
          },
        },
        packageManagerServer: {
          dependencies: {
            { name: 'sql-driver',
              version: "1.5.3",
              mask: "1.5.3",
            },
            { ... },
          },
          settings: {
            allowHttp: Bool, // Allow the compiled application to use the insecure protocol.
          },
        }
        website: { "colors", { name: 'http-server', ... } }
        server: { "packageManagerServer", "website" }
      }
      targets: {
        llvm: {
          outFile: 'out/llvm.ll',
        },
        myJavascriptPreset: {
          outDir: 'out/js/',
          preset: 'ES7',
          whitespace: 'strip',
        },
      },
      defaultTarge: 'javascript',
    }
  ```
  `chalk translate . --optionalAll`
  `chalk translate . --optional="packageManagerServer colors"`
  imports (libraries) that could exist, but don't should be imported as null
  ```
    import Library from sql-driver; // Ok.
    import { connect } from sql-driver; // Error: cannot destructure an optional dependency. It is potentially null.
  ```
`Program( ... ).generateTranslationHints(Hints hints) -> Hints` or similar function
  that generates something that lets the compiler recompile the program faster,
  eg. contains solutions to the np complete subproblems of translation
`A|B var = A(); a := B()` should be valid, call destructor of A, and construct a new B
  should the default assignment operator destruct the old variable before assigning the new one?
`string.toInt` returns binary copy of string as number
questionmarked member access operators:
  `a?.b` - `a in Null ? null : a.b`
  `a.?b` - `'b' in a ? a.b : null`
  `a?.?b` - `a !in Null && 'b' in a ? a.b : null`
  similar for functions:
  `fn?.(...args)` - `fn is Null ? null : fn(...args)`
  `fn.?(...args)` - `(...args) in fn ? fn(...args) : null`
  `fn?.?(...args)` - both
maybe do have `Optional` in stlib after all? They seem to be preferred here
  https://www.reddit.com/r/ProgrammingLanguages/comments/hy6emx/explicit_nullability_vs_optionals/
  `type Optional(type T) = Null | ( Null, T );`, or maybe
  `type Opt(type T) = Null | ( Null, T );`
  `Collection` should have `getOpt` function that would return an optional
  Also, the syntax sugar `?T` should be reserved so that I can decide later if
  it should mean `T | null` or `Opt(T)`
sometimes it is useful to add common functionality to a class outside that class
  (think Haskell's type classes, or your TS interpreter's table generator Symbols,
  eg. generateFsa)
  I've been reluctant to consider them because of the potential for conflicting
  definitions, which are a feature-stopper for me. However, if implementing
  a trait outside a class was restricted to owner of that trait (eg. inside
  the trait (`trait T { C extends T { ... } }`)), I'd be fine with it
one previous approach I had with partial functions is to add a quirk to the
  typesystem that the `Never` type would not unify with other types, eg.
  `Int | Never` would be distinct from `Int`
  however, there is a problem with this approach when it comes to generics.
  `Map<Never>.get` would return `Never | Null`, but in this case, `Never | Null`
  really is just `Null`, because `Map.get` is a total function. Ba dum tss.
should `Set` be a subtype of `Array`? Or should there be a `UniqueArray` too?
`for x; y; z; => foo()`? `for (x; y; z) => foo()`?
`--closedWorld` compiler flag, makes the compiler assume that the only code that
  will access non-shared data is the code that will be compiled during the compilation.
chalk: it should be enforced that the first letter of an enum must be lowercase
support of let's encrypt or similar as part of stl
should constructors be allowed to have side effects? I think so
  however they should probably be required to be idempotent, including the side effects
  (`C(C(...args))` identical to (`C(...args)`)
it must be possible for an instance to access its static members, even if they are defined
  in a sub / supertype.
there should be three kinds of typesystem strictness (typechecking level):
  strict: rejects all code unless proven correct
  moderate: allows all code unless it provably contains a type mismatch
  lax: allows all code unless it provably assigns a value to a variable of
    incompatible type at runtime
  
  eg. this would typecheck as lenient, but not as moderate if `foo` is unused:
  ```
    String foo(Int i) => i;
  ```
time evolution operator:
  `Int where Odd >> Even` - an integer where an odd number must be rewritten only
  to an even nuber, and even number can be rewritten to anyting,
  or an initially odd number that can change to an even number once and must stay even?
  `Int >> Text a` - a variable that is initially `Int` but can become `Text`?
it should be possible to make (type) annotations that let the compiler
  know that a function is supposed to return a certain type in the future, to
  prevent a warning like "The return type includes Null, but function never returns
  null."?
should every type's shape be known at compile time?
  this is to prevent people from abusing objects as maps
how to type changes in parent scopes (syntax can change):
  ```
    Null foo() {
      Even i = 0;
      
      Null bar() => i += 1; // Error: bar modifies i, but this is not part of its type. Modifications of state have to be part of the function's type.
      
      Null bar { i: Int -> Int }() => i += 1; // Error, cannot cast Even to Int.
      
      Null bar { i: Even -> Odd }() => i += 1;
      
      bar();
      
      (({ 1 } arg) => arg)(i); // Error, type of `i` is now Odd, not { 1 }.
      ((Odd arg) => arg)(i); // Ok.
      
      Null baz { i: Odd } () => i += 2; // Ok
    }
  ```
`[ 0, 1, 2, 3 ].recombine(2) == [ [ 0, 1 ], [ 2, 3 ] ];`
  `class Tuple[...type Args] = Array[Object] arr where arr[x] is Args[x];`
  `class Tuple[...type Args] = Array[Object] arr where All x: arr[x] is Args[x];`
  `class Tuple[...type Args] = Array[Object] arr where All x keyof arr: arr[x] is Args[x];`
  `class Tuple[...type Args] = Array[Object] arr where All x < arr.size: arr[x] is Args[x];`
  in chalk with value types, a tuple is not an array
should all classes have a `class` member? what about objects?
  in that case, should `{ class: Int }` be a valid object?
  or should objects just be usable in destructuring, and not have non-class instances?
`Map<|Key, Val|>`? Too verbose and not exactly pretty either. `Map[Key, Val]`? `Map(Key, Val)`?
a good case against `arr[i]` (or `collection[i]`) syntax sugar: there should be
  a difference between `Array.get(key, default = null)` and `Array.ret(key, default = null)`.
  One only returns default null, the other inserts it if key does not already exist.
  Maybe another name for `ret`? `rin`, short for "return insert"?
Law of excluded middle in Chalk type system: `A ? B : C -> B | C`
endiannes: `0.d123` the same as `321`? `5.d4 == 4.5`?
  or: `0x21 == 0X12 == 18`. Maybe a namespace-level setting to set the default
  prefix, which is implicitly `0D`. Octal should use `cC` or `tT`, not `oO`.
Chalk should be little endian by default - things like iterating digits/bits/bytes
  of numbers/memory. Eg. `Int a = foo(); a.digits.forEach()`
warning: trait is inherited twice?
`Error` vs `Exception` vs `Unexpected`? Error is short
there should be two levels of unused: not used anywhere, and only used in unused
  code. In IDE, these should have separate colors.
Math.isSquare
  https://stackoverflow.com/questions/295579/fastest-way-to-determine-if-an-integers-square-root-is-an-integer?rq=1
`import Module from "path"` or `import "path" as Module` (or both?)
  the latter will work well with auto-sorting of imports by path
  the latter will be even better without quotes. only /[a-z\-\.]+/ paths should be allowed
compile as uefi app
package-manager should have a package "package-manager-info" that exports info
  about the manager, including url. (Edit: why?)
module name should be the same as file/folder name
  ```
    import Asdf from ./asdf; // Ok.
    import Fdsa from ./asdf; // Error.
    import Asdf as Fdsa from ./asdf; // Ok?
  ```
  or:
  ```
    import ./as-df; // Automatically creates variable AsDf
    import ./as-df as { destructuring: [ _, n ] }
  ```
String should be called Text
  also have classes TextBuilder, FormattedText and FormattedTextBuilder
  ```
    FormattedTextBuilder(chalkdoc: Text).getParagraphs[2].setCursive(2, 7);
  ```
`Stream[T]` should have its own syntax sugar. Otherwise people will have
  a strong incentive to use `[]T` (Array of T) instead. (Maybe `[]T` should mean a stream?)
IDE: suggest camelcased file name as variable name in module scope
multiple packages in the same repo, could differ only by entry points (exports.chs)
the file that defines exports of a folder should be named `-.ch`
When a file asdf-bbdd.ch is imported (`import asdf-bbdd.ch`) should automatically
  create a variable named `AsdfBbdd`, files should match [a-z]([a-90-9\-]*[a-z0-9])?
  (case sensitive). Renaming/destructuring: `import asdf-bbdd.ch as Foo`,
  `import asdf-bbdd.ch as { a: b, c }`
The chalk typesystem mode that only errors if an error is definitely found, should
  it report this?
  ```
    Int i;
    
    complexFoo() && i = 'a';
  ```
  The problem: it is clear a string cannot be assigned to an integer, but it may be
  that complexFoo only returns false. If the compiler cannot prove it may return true,
  should it report the error?
  
  Intuitively, the programmer should be alerted to such code. On the other hand, the purpose
  of this typesystem mode is "only report errors if you are absolutely sure". Maybe
  the category of problems "errors or dead code" should also be included?
IDE: ctrl+click should create a new cursor, double click should go to definitions
variables should be automatically renamed when their definition is. Explicit renaming will
  still be needed for functions if there are multiple overloads
What syntax for `>>`? `type T i = String | Bool where Bool i >> { 'true', 'false' } i`
IDE: tab should select autocomplete, open it if it's closed (what about Ctrl + Space)?
  enter, up, down should work the same whether autocomplete is open or not
```
  // A way to rename inherited members?
  
  trait A { X foo(); }
  trait B { Y foo(); }
  
  class C < A & B {
    Null A.foo as fooA() { return X() };
    Null B.foo as fooB() { return Y() };
  }
  
  C c=(); // To avoid the most vexing parse.
  
  c.foo // Error: `C` `c` does not have a member named `foo`. Did you mean...?
  
  A a = c;
  
  a.foo; // Ok.
  A(c).foo; // Ok?
```
  The last brings the question: Should all traits have the constructor `This >- This` ?
  Types should be ordered with comparison operators (<, >, etc) - subtyping
Should the type system be able to demand that if a write occurs, the written value
  is distinct from the current one?
libraries should be placed into the "lib/" folder, imports should use the
  "lib" prefix. `import lib/axios/;` instead of `import axios`
  the folder structure should be:
  ```
    \--- lib/
      |
      \--- axios/
        |
        |--- 0.17.1/
        | |
        | \ ...
        |
        |--- 0.19.2/
        | |
        | \ ...
        |
        |-- -.chk
  ```
time operator `>>`
  ```
    type Inc = Int where Inc a >> b <-> a >= b;
  ```
in type context, there is a conflict between the interpretation of `|` and `&`
  operands. Either
    0. all operands on values will be unusable on types, so `let i: Letter ++ '@' ++ Domain = 'a@c.com'`
       will be invalid.
    1. `|` and `&` will only be defined on types, not on values. This will require `||` and `&&`
       operators for booleans
    2. `|` and `&` will only be defined on both types and values, but in type contexts, they
       will mean type or/and, not value or/and.
  
  or maybe I am just imagining problems and there's no conflict - seems that way to me now,
  I just had a brainfart. I don't want to delete the note though.
should a function that is defined over `X` automatically be defined over `Set[X]` (recursively) as well?
  should a function that is defined over `X` be allowed to have an incompatible definition over
  `Set[X]`?
where syntax:
  `Int i where i.prev is Even`
  `Int i { where i.prev is Even }`
  `Int i { prev: Even, where i.prev is Even }`
  `Int | Text { prev?: Even }`
  `Int | Text v { prev?: Even }`
should types be understood as sets, or as "vague values"?
  should operators for values be usable on types? (`{ 'a', 'b' } ++ 'c'`)
  should it be possible to have a function from a type to the type's cardinality?
  should it be possible to have a type of types?
    and can i really prevent people from creating a types of types, even if I wanted to?
    eg. finite set of types: `TypeSet[ { 0 }, TypeSet[ { 0, 1 } ] ]`
should a class defined in a function be returnable?
  if so, should that create a closure?
  if so, should the static members of that class be allowed to be different for different closures, or even mutable?
  if so, what should the comparison operator return when the class is compared to itself, with a different closure?
  if true, that could break `All f => a = b -> f(a) = f(b)`
  if false, should `is` return false if closure doesn't match?
both should work: `foo(n: Nat { prev: Nat })` and `foo(n: Nat + 1)`
`let i: T { foo as bar }` should rename foo as bar in i. `T { foo let bar }` should destructure?
this should be illegal:
  ```
    class C {
      let b;
      let a = (this.b = 3); // Error: side effects not allowed in member initialization expressions.
    }
  ```
  this is because such side effects would happen in non-deterministic order
the type system (probably) must be able to talk about side effects of values that
  cannot directly be referred to, because they are not in scope
  if mutable closures are allowed, definitely. Else, probably not.
static variables in functions
```
  class A {
    class B {
      This(i: Int) {}
    }
  }
  
  let a = A();
  
  a.B(3).that == a;
  
  A.B(a, 3);
```
closures:
  syntax sugar for `class FunctionName extends Function { call(...) => ...; ... }`
  variables that are members of the class have to be exported
    ```
      prd foo() {
        export mut a = 4;
        mut b = 4;
        pub c = 4;
        
        return prd f() => a += 1; // Ok;
        return prd f() => b += 1; // Error: cannot refer to variable that is not exported;
        return prd f() => c += 1; // Ok;
      }
      
      let f = foo();
      
      f.a // Error: a is private.
      f.b // Error: b does not exist.
      f.c // Ok.
    ```
should functions that produce a closure have a separate keyword?
  their semantics differ a lot if RAII becomes a part of the language
I've already made up my mind on that `All a, b, f => a = b -> f(a) = f(b)` should hold.
  however, should the "reverse" hold as well?
  should it be `All a, b => a = b <-> All f => f(a) = f(b)`?
  maybe the stronger axiom should hold for `=`, and the weaker one should hold for `==`.
should function declaration be an expression?
list of goals:
  practical, general-purpose language for real world programming
  familiar syntax and semantics (except type system, that will have to be new)
  expressively complete, sound, and decidable (therefore not inference-complete) typesystem
  if something is intuitively comprehensible, it should work, see next point (note
    this does not mean accepting nonregular (eg. duplicate) functionality just because
    a human can "see what was intended")
  orthogonal: if a combination of features fit together and make sense to human
    programmers, it should work
    - this means things like nested functions, closures, multi-scope function/class overloading
  ```
        foo(Int a) => a
        
        bar() {
          foo(String a) => a;
          
          foo(3); // valid, even tho foo defined in this scope too.
        }
  ```
  . - this should work:
  ```
    let a = { b: b }; // No error `b` is not declared
    let b = { a: a };
  ```
  optional parameters followed by mandatory parameters
  module system, including full support of cyclic dependencies
  as full support of cyclic definitions as possible ("use before declare" error
    is not a program error, it's a sign of a bad language)
in case a function's return type is a promise (not promise or ...), automatically
  convert returned non-promise values to a promise?
mind the distinction between a module and a module literal
  module is a class that extends the `Module` trait
  module literal is text conforming to a certain grammar
a variable definition that is a proper subexpresison should create its own scope
  ```
  // Syntax sugar for a class with that public members and that public constructor.
  class Node[T] (data: T, parent, left, right: Node[T] | null);
  
  let node := Node(
    3,
    null,
    let left := Node(
      1,
      node,
      let leftLeft := Node(
        0,
        left,
        null,
        null,
      ),
      let leftRight := Node(
        2,
        left,
        null,
        null,
      ),
    ),
    let right := Node(
      4,
      node,
      null,
      null
    ),
  );
  
  let node =: Node(
    3,
    null,
    let left =: Node(
      1,
      node,
      let leftLeft =: Node(
        0,
        left,
        null,
        null,
      ),
      let leftRight =: Node(
        2,
        left,
        null,
        null,
      ),
    ),
    let right =: Node(
      4,
      node,
      null,
      null
    ),
  );
  ```
```
  let x: Int | Text =< 3;
```
don't do `?T` as `T | null`. Many times `Opt[T]` is preferrable.
`===` (identity) implies `==` (semi-equality) implies `=` equality.
  Semi-equality is a computable equivalence class.
  For types, `A === B` if they are the same (or syntactically the same?),
  `A == B` if the compiler can prove them equal, and `A = B` if they have
  the same values.
prohibit side effects in expressions contained in the conjunction or disjunction
  operators
`a.p` should be of type undefined if a might not have that property, `a!.p` should
  only be undefined if `a` may be undefined
imperative programming presents two problems:
  time
  0. certain facts about a value that need to be a part of its type should be local
     to a certain piece of code. If a library returns a value it does not hold any
     reference to, the type of that returned value should not contain invariants
     that were necessary to construct the value. In other words, time forgetting.
     Just as conventional types in an immutable languages provide spatial forgetting
     (if I have a value of type Int, then through the type system I forget I have
     a particular value and pretend there can be any integer whatsoever, in the space
     of all integers, I have forgotten the actual value).
     Time forgetting means forgetting certain parts of the type as program execution
     moves on. A library zeroth constructs a value in a type safe way by having
     references to it whose type includes invariants internal to the library and
     irrelevant to the user of the library. Then it should be able to safely return
     a reference to it that no longer contains those invariants. This is notable
     because in an imperative programming language, having references with distinct
     types that refer to the same value is problematic.
     Time forgetting is likely to be very closely tied to lifetimes.
  1. A way to ignore types/invariants temporarily when their variables are provably
     not read by the code that relies on those invariants, so that invariants may be
     temporarily broken by other parts of code if "no one's looking".
Basic questions:
  should there be value types?      i tend towards yes, but only if refs cannot refer to them (\_varName contains a value, varName is a reference?)
    if so, should refs be able to point at them? (this basically means pointers) no, see below
  should there be pointers?         not in the basic version of the language -- a programmer should have the option to ignore such low-level detail completely if she wishes
  should there be primitive types?  i dunno. Probably necessary for performance, but they are a special case of value types
    should they be mutable?         sure, just like in JS
both sync and async should be keywords; generics should be able to talk about both
  types of functions, don't be a C++ with code duplication because of constness
  (or scary templating shit with const forwarding, but that's irrelevant to the warning)
if find it likely that renaming of members should be supported, because I suppose
  otherwise there could be conflicts in ghost values in types of imperative programs
  
  also: the definition of a field should be able to express that it is a group
  wrt two separate methods.
  
  Those methods should possibly be implementable outside the class definition,
  sth like Haskell's type classes? In that case, a class should be allowed
  to implement a trait twice, see the note about field above.
  
  `C { a as c }` - renaming syntax?
whitespace:
  ```
    cond then {
      ...;
    }
    else singleLineExpr;
  ```
```
  // Lit syntax that combines type annotations and destructuring.
  
  prd foo( options: Options { encoding as encd: 'utf8' | 'ascii' } ) => encd;
  
  prd bar() {
    // Destructuring as an expresison:
    baz() as {
      a: Int { // Does not create a variable nor assigns
        let pred as aPred: Int, // Or perhaps `pred as let aPred`.
      },
      asn b as c: Even, // Or perhaps `b as asn c`.
    }
    
    // Destructuring with restrictions:
    switch a {
      { b: 0 } => 0;
      { b: Nat | None { pred: Even } => 2 * pred;
      { b: Nat { pred: Odd } => -pred;
    }
  }
  
  // Anonymous object literals require a dot in front of name
  foo({ .encoding: 'utf8' = 'utf8' });
```
```
  class C { let i: Int; }
  
  type A = KeyOf[ C ]; // `{ C.i }`? or `type A[C] = [key A of C]`
  type A = KeyOf[ C, Int ]; // `{ C.i }`?
  type A = KeyOf[ C, Text ]; // `{}`
  
  type B = PropOf[ C, 'i' ]; // = Int
  
  let i: A[C] = 5;
  
  // Perhaps even:
  let i: C.Keys = 5;
```
perhaps the name of a class should not refer to the type of all its instances?
  ```
    // It causes problems in type context:
    // class C { static s: Static = Static(); }
    // let s: C.s = ...; // Error: C does not have a member `s`
    
    // Solution: have one for the class and one for the type.
    
    
    class cars type Car {
      static s: Static = statics();
      
      This(
        pub i: Int,
      ) {}
    }
    
    let c: Car = cars(0); // Ok.
    let c: cars = cars(0); // Error: cars(0) is not of type cars. Did you mean to type `c` Car?
    
    let i: Car.i = 4; // Ok.
    let i: cars.i = 4; // Error: 4 is not assignable to `(Car => Int) & ((Car, Int) => ...)`.
    
    let s: Car.s = statics(); // Error: Car does not have a member `s`. Did you mean `cars.s`?
    let s: cars.s = statics();
    
    // Also, perhaps use `statics.new()`?
    
    class cars instanceType Car {}
    
    class cars-Car {}
    
    class of cars - Car {}
    
    class cars Car {}
    
    // It has the same meaning as:
    type Car = Object { class: cars };
    class cars {}
    
    let c: Class = cars;
    
    // Should cars and Car have the same generic arguments?
    
    // class class-name all-params instance-type-name non-static-param-names?
    class cs[All A, All B] C[A] {
      
    }
  ```
```
  type EvenNat = 0 | EvenNat + 2;
  type OddNat = EvenNat + 1;
```
should type functions accept as arguments types that are not valid arguments
  to any single overload of such function, but which are a subtype of the
  union of the types of arguments of all the overloads? (Writing that sentence
  gave me a headache, skip to example if unclear.)
  ```
    type A[ All T: Type where T extends Int ] = 'a';
    type A[ All T: extends Text ] = 'b';
    
    type R = A[ Int | Text ]; // `'a' | 'b'`, or an Error?
  ```
  perhaps this should only be allowed if the overloads share a declaration:
  ```
    type A[ All T: extends Int | Text ];
    
    type A[ All T: extends Int ] = 'a';
    type A[ All T: extends Text ] = 'b';
    
    type R = A[ Int | Text ]; // Surely fine.
  ```
do use `|` for both types and sets, and do allow `'a' | 'b'` in type contexts,
  but only for
warn of all unused files in the root directory
there should only be one class, even if it has generic params. Therefore:
  0. `A[Int]` should equal `A[Text]`
  1. static properties should not have access to type parameters.
`0` should be a nat, `+0` should be an int. Same with other numbers
Carsticley - immutable version of the language `st` from conSTant.
types as sets or types as approximations / nondeterministic values?
  is `let a: 2: 2 | 4: Even = 2` valid? (not as syntax, but isTypeOf-wise)
  the differences:
  types as sets
   - no (or at most a minimum) of values is a type of itself; a type is always a set
   - seems to have no address problems, but requires infinite sets, or
     weird tricks with equality so that { 2 } represents all twos regardless of its address
   - possible to operate with types as collections, not just as with its instances, eg. find
     their cardinality, their greates element, etc.
  types as nondeterministic values:
   - every value is a type of itself
   - without a strict distinction between types and non-types, has problems
     with addresses - if every type has its address, typing becomes effectively impossible
   - the only operations allowed on a type are those that are alowed on its instances
`a | b`, `a & b` and `x where P` could perhaps have executable semantics?
  `a | b` - nondeterministically choose either `a` or `b`
  `a & b` - if `a` and `b` are identical, return `a`, else terminate computation
  `x where P` - if `x` satisfies `P`, return `x`, else terminate computation
  one problem is that the "therminate computation" should have the type `Undefined`
every class should be a function - a constructor that does not require `this` argument
  ```
    class C cs {
      new(i: Int) {}
    }
    
    let a: C = cs(42);
    
    let b: C | undefined = undefined;
    cs.new(b, 42);
  ```
types should be (practically) addressless, but should be able to refer to addresses
  using the identity operator. `Int i where i === aVariable`
integer division should truncate towards negative infinity, not zero
  https://stackoverflow.com/questions/19517868/integer-division-by-negative-number
it might be a bad idea to let traits create an extends relation with a class
  imagine `foo :: Text => Null & T => Null`, where `T` is a trait Text does
  not extend on its own. If someone creates a trait `S` extending `T` that
  they'll make a supertrait of `Text`, without owning either Text or T.
  So `foo` is actually not well-defined, because it has 2 distinct implementations
  for instances of `Text`.
with my new paradigm "types are approximations of objects, and computing with
  types is like computing with any concrete object that satisfies that approximation"
  (eg. `Int + 1 === Int`, `Nat + 1 === Nat \ 0`)
  I have to make some changes to other assumptions I already made.
  
  questions: how should one work with types themselves (should it be possible at all?)
  eg.
  
  0. there is a conflict of operators: while `'a' | 'b'` is unambiguous, `true | false` is not
  1. `<` operator, which I thought could be used as "is a subtype of". But `Even < Int` could
     also be interpreted as `All e: Even, i: Int => e < i`, or even `Bool` (because some evens
     are less than some ints and some are not)
  2. What about `T (= Int) extends Even then ...`, or:
  2. What about `T (= Int) is evens then A[ T ] else B[ T ]`? Previously I disliked TypeScript's
     way of handling this (`A[ Even ] | B [ Odd ]`), but it seems consistent with my new paradigm
  
  also:
  ```
    type X[ All T < Text ] = Array[ T ];
    type X[ All T < Int ] = Array[ T ];
    
    X[ Text | Int ] ==  Array[ Text ] | Array[ Int ]; // ...? Or should this be an error?
  ```
  
  Perhaps TypeScript's distributivity of conditional types should actually work like this:
  ```
    type A[T] = T extends any ? T[] : never;
    
    type NatArr = A[Nat]; // never[] | 0[] | 1[] | (0 | 1)[] | 2[] | (2 | 0)[] | ...
  ```
`new` is constructor, how should destructor be named? I want 3 letters. `die`?
  random ideas: `ruk`?
should `Object { a: undefined }` mean a type of objects without a member `a`?
 so `Object { a: Object | undefined }` would equal `Object`
 and `Object { a: Int | undefined }` would be like TypeScript's `{ a?: Int }`
if there is to be a switch operator, it should be syntax sugar for iife,
  with destructuring support
automatic conversion of string literals to enums?
replace `a and b` with `a then b`, `a or b` with `a else b`
  forbid the conditional operator in propositions
`false and [...]` should return null, `a and b and c` should be well formed,
  `null and [...]` must be an error, therefore `a and b and c` must mean `a and (b and c)`.
  also, perhaps `and` and `or` should have equal precedence
`this.longMemberName.asdf.!has(b)`? The negation is too hidden IMHO, hard to see, bad
```
  prd foo(
    // a long argument list.
    // a long argument list.
    // a long argument list.
  ):
    Return type on its own line, to visually separate it from the arguments.
  : {
    // function body.
    // function body.
    // function body.
  }
```
perhaps shadow variables from parent scopes entirely
  ```
  prd foo(Int);
  
  prd bar() {
    prd foo(String);
    
    foo(3); // Error: Function `foo(Int)` is shadowed by local redefinition as `foo(String)`.
  }
  ```
member renaming:
  `class C = B with { a as b }`
  `class C extends G with { ... } {}`
should type quantification range over private types in contexts
  where those types are inaccessible?
abstract methods should be able to have default arguments using `paramName: T = ?`
should type argumentss (including phantom types) be a part of a value?
  `class C[All T: type] {}` - should `C[Int]` and `C[Text]` have no common
  instances, or should all instances of one also be an instance of the other?
semantics problem:
  ```
  fn libFunc({ Int | Null optionA = null, String | Null optionB = null }) {
    ...
  }
  
  fn foo({ Int | Null optionA } options) {
    libFunc(options);
  }
  
  class C {
    pub Int | Null optionA = 42;
    pub String | Null optionB = 'bar';
  }
  
  main() {
    foo(C());
  }
  ```
  should the following code pass `null` or `'bar'` to libFunc?
  This seems like a huge security issue
  
  I favored object types to be the types with at least some members,
  but this shows it would probably/perhaps be better if they were
  the types of those values that have exactly those members.
  
  There could be a syntax like `{ A a, ... }` for objects with at least
  the member `a` of type `A`.
  
  `{ A a, ...None rest }`
  
  Or perhaps it should just be forbidden to use those extra members? I don't
  like that solution at all - if a value has a certain type, it should be
  typable with that type, and then all members should be usable.
  
  Or the best solution I have thought about so far: a value with potentially
  more members than declared in the type of its variable cannot be assigned
  to a variable whose type has extra members.
  
debug.log function that prints its arguments when debugging a function marked
  as verbose, debug keyword that makes functions called in its expressions
  verbose if it exists in a verbose function, IDE can toggle which functions
  are verbose
IDE refactoring options:
  merge traits (should automatically be offered if extends cycle is detected)
  split trait
  move
  reorder (or keep this a part of move)
  add/remove param
should traits be able to specify friendship (or "trust")?
should there be per-member "trust"? trust with a subset of a functions domain?
should members be publicly read-only by default?
should liskov substitution principle be enforced by the type system?
all operators should support trailing operator syntax (or maybe leading?), not just comma?
  ```
    type X = (
      A |
      B |
      C |
    );
  ```
  or
  ```
    type X = (
      | A
      | B
      | C
    );
  ```
these types should be accepted: `type T = T & int; type T[type X] = T[X] | X`
  but should generate a warning like "unused expression" / "expression has no effects"...
imperative types?
  ```
  type A = Text;
  
  A a = 'asdf;
  
  A |= Int;
  
  a = 42;
  ```
`type T = 0 | 1` should be supported. should `type T = { 0, 1} ` be supported too?
use site vs declaration site variance?
  use site variance is already there since I want existential types,
  but what about declaration site variance? is it just "predefined" USV?
adding a correct type must not make the type inference worse
one of the goals of Chalk is to have a language such that if a program has
  well-defined runtime behavior, then it must be typable
  and if a piece of text could intuitively be assigned meaning as a program (by
  an informed programmer), then that string should be a valid program.
`foo[(T t where t ++ String s is t) : type X : String](X a) -> X => a`
enable exporting from deep paths (import X from ./foo/bar) using special
  keyword, something at the start of file, or extension?
perhaps whitespace should matter after all. take
  ```
    type List[T: type, length: Nat] =
      | Ex _: length & 0 => record { empty: record {} }
      | Ex _: length & Nat + 1 => record { value: T; next: List[
      T, length.pred ] };
  ```
  the arrow `=>` should perhaps stop at the end of the line? that would make the def correct.
extending higher order types?
  `class C<T> : ToString, C<...> : Monad { ... }`
  is it useful? or is `X : Y` always the same as `X<T> : Y<T>`?
chalk typesystem: guarantee deallocations, lifetimes?
there should be a distinction between type annotations and "type loosening?"
  one should help the compiler with typing, the other should erase information
`console.format({ padding: 2 }, str)` - insert two spaces after each newline
Draftback-like time travel, maybe including commit history
version Control + database, ?with options to only sync some tables
IDE + cli: stats like number of lines, percentage of unused code, etc
how toString should behave
  ```
  fn (Bool b) -> String trusted => A().toString(b);

  // Or: fn trusted (Bool b) -> String => A().toString(b);

  class A trusts trusted {
    pub Int number = 42;
    String name = "abc";
  }

  A().toString() == A().toString(ff) == "A ( 42, ... )"; // Should the presence of private fields be revealed this way? I guess not.

  A().toString(tt) == "A { number: 42, ... }";

  trusted(ff) == "A ( 42, "abc" )";

  trusted(tt) == "A { number: 42, name: "abc" }";
  ```
as alternative to plain get, which doesn't insert the default
  `map.getInsert(key, default); set.getInsert(e => false, default)`
private generic params? `identity[private T](T t) => t`?
package manager: package descriptions in pkg.json should contain an id so that
  if someone decides to rename/delist/delete their package, it will be possible
IDE debugger should show values of variables everywhere they are used, even after
  the current position if it's computationally feasible
Any site like GitHub must solve the problem of popular libraries abandoned by their creators.
  There should be a transparent and working way of transfering ownership to other people if the
  authors no longer care.
?`"".split(whatever)` should equal `[]`, not `[ "" ]`?
should all properties of anonymous object be nullable? no
collection.reduce(accumulator, acc(acc, next))
version control - local, uncommitted changes must be per-branch
should it be possible for a trait to be implemented by a class multiple times
  in multiple ways? eg. ++ could both add and multiply numbers
  NO, this seems very wrong, but something similar must be
  possible - it must be possible to state that integers both addition and multiplication
  form a semigroup
operators: ++ for monoid, ** for semigroup? or should ++ stand for semigroup?
querying over code statically, eg. is there/can there be an instance `foo`
  of this class such that `foo.bar()` is true?
ChalkDoc - documentation popup in code in generated comments on variable mouseover,
  clickable links to definition.
A good compiler/debugger would be able to provide features that vuex provides - ie.
  snapshots of memory at particular times, time travel, replay
  also perhaps executing handwritten purecollection.indexOf(predicate)
debugger should reserve some memory (settings for how much) for recording destructed
    information and allow stepping BACK
  Right: step forward
  Left:  step backward
  Down:  step over forward
  Up:    step over backward
  Ctrl + Down or End  or Page Down: step to function end
  Ctrl + Up   or Home or Page Up: step to function start

  Checkpoints:
  options "Save every step"/"Only save on pause"/"Only save manually"
ease refactoring - let compiler warn/error if it cannot prove that a change to code
  doesn't change behavior from the last commit
  more advanced - check that the changes in code only change what is specified to change
version control: create new repo from git repo
  what about pull changes from git?
version control: maybe support forgetting information, but NEVER support rewriting
  history
version control should not only be able to detect when files are moved/copied
  idstead of (deleted and) created, it should also detect larger copypastes if possible
```
///
  A long comment
///
String str = @doc;

// Or:

String str =
  ///
    A long comment
  ///
```
`/regex?p/`?
Some language support for bit fields? Storing them as numbers is ugly and
  ignores the type system.
`&` and `|` operators for bit operations, set intersection/union, join and meet?, etc.
  Also rename logical operators to conditional operators.
If you'll allow bitwise operators, ?only define them for `Nat`, not for signed integers.
`{ ...a }` should be a warning (?)
it should be an error if a member variable is declared after other types of members
`class { Int a }` type of all object that have property `a` (whether or not they have other props)
anything is implicitly convertible to Null in a return expression of a function that explicitly
  returns null
make type errors in array literals as tight as possible:
  ```
  foo([]A) {}

  foo([ A(), B(), A() ])
      ^^^^^^^^^^^^^^^^^ Incorrect error location
             ^^^ Correct error location
  ```
Somehow allow introducing false/unprovable propositions, but don't allow adding
  new code that would break them - used to refactor code in multiple stages
  ie. I have a buggy code, want to fix it by first defining the correct behavior.
  Now thousands of errors show up.
  If adding false props wasn't allowed, I'd have to delete the *correct* definitions
  in order to be compile-error-free. But the bugs are still there. Except the compiler
  now doesn't even tell me about them.
  The purpose of the type system is to catch errors. Now it doesn't seem like it's
  doing its job.
  Solution: warn propositions: they produce a warning (instead of error) if code
  doesn't satisfy them, but do not halt the compiler and automatic builds, and the
  programmer can see what's in need of fixing.
Chalk should provide something like vues reactivity / data flow architecture
  cache invalidation is hard, and things not updating in different tabs/forms is annoying
  Also, this seems to be like something that should "just work" and not require
  programmer's special attention, just like CSS animations.
method params with narrower public types than private types
  pub keyword in front of function means that all params are implicitly public
  methods without pub keyword can have pub params and still be public
functions not in class are public by default, can be specified private, then have to have explicit
  friends to be callable
compiled program should be in `/local/out/`
IDE: when pasting to a string literal, ask in a dialog whether to escape quotes if there are
  any in the pasted text
IDE: keyboard shortcut to go to definition - two versions, one in new tab, one in this tab
disable assignment of bool expressions inside logical operators? or at least
  require some special syntax
warning - module imports itself, duplicate imports, imports out of order
  imports from one file should be sorted alphabetically, import statements
  should be sorted according to (resolved or typed?) path, libraries first
cst for var declaration, const for casting
  casting a variable to const is a special case of changing its type/adding
  propositions that apply to the variable. I'd be careful before specifying what
  exactly it does.
import in comments for documentation?
  ```
  ///
    {import { X } from "./x.ch";}

    See `X` for more details. <-- will be clickable in documentation.
  ///
  ```
comments: `code` for parsed, syntax highlighted code that can throw syntax errors,
  ``code`` for unparsed code?
undefined only as an argument to mean the default value?
  also: `foo(Int i, Int j = i is Even ? 2 * i : undefined)`
`import X from "../../../a.ch"` is wrong. It should be a warning if an
  import goes more than one level up
imports from files inside folders should not be allowed. the only way to export
  out of folder `/a/b/c` should be to export from `/a/b/c/index.ch`, import and
  reexport `/a/b/c` (with or without slash?) in `/a/b/index.ch`, the same in `/a/index.ch`
  library exports must be in `/index.ch`. The entry point of application must
  be in `/main.ch`
there should be a way of enforcing directory and module structure
issue tracker should not offer info like "fixed in version" or "status" for issues of type "duplicate"
vue was right: events shouldn't bubble
  and the default handler for click events should reemit the event to parent
should control flow operators (&&/and/then, ||/or/?else) and their respective data
  operators (`Bool and|or(Bool, Bool)`, Set and|or(Set, Set)) be separated?
  this should probably be the case if they will be overloadable
  Imagine `set0 && set1` - it feels wrong.
  Also, `set0 && set1 == set2 && bar()` - those two && operators have a completely different
  meaning. what about precedence?
  Also, should `emptySet && foo()` not call foo?
  Should `Flags.all || foo()` not call foo()?
  I came to the conclusion that && and || should not be called logical and/or, and they should
  return null when the first condition is false/true, respectively.
  ```
  Bool b = foo() & true; // OK
  Bool b = foo() && true; // Error cannot initialize a `Bool` variable with expression of type `?Bool`
  ?T t = foo() && T(); // OK
  ```
expressions containing an empty line should be an error
IDE, when text editor is focused:
  0. Pres and hold Ctrl.
  1. Select text with mouse. Caret stays where it was.
  2. Ctrl + V pastes selection to where caret is.
version control - option to disable commits other than merge commits to some branches
delegating constructor: https://stackoverflow.com/questions/11748682/telescoping-constructor
method which returns This (must be This, not name of the class) returns this
  implicitly by default?
  ```
  class Pizza {
    Bool [ cheese, pepperoni, bacon ] = [ fls, fls, fls ];

    This setCheese(Bool b) => cheese = b;
    Self setPepperoni(Bool b) => pepperoni = b;
    Pizza setBacon(Bool b) => bacon = b; // Error
  }

  Pizza().setCheese(tru).setBacon(tru);
  ```
anonymous classes:
  `class {}` should be the type of `{}`
  `class { Int a }` the type of `{ a: 5 }`
  `class { Int i } foo = { i: 5 }`
  can they be generic?
pattern matching:
  should `[ let a ] == [ 0, 1 ]` match? I don't think so.
  should `[ let a ] <= [ 0, 1 ]` match? Yes.
  `arr0 <= arr1` iff arr0 is a prefix of arr1
  `arr0 < arr1` iff arr0 is a proper prefix of arr1
  similarly:
  `{ let a } == { a: 0, b: 0 }` should return false, `{ let a } <= { a: 0, b: 0 }`
  should return true
code when the execution of program is paused
type of function with optional parameters?
generator: the first yield must be called without an argument - it will only
  exist to receive the parameter of next
should `yield` be a function / use function syntax? and other word keywords?
  ```
  None fib(?(Int, Int) yield(Int)) {
    ///
      Wait for `next()`. This is actually correct and solves JS's problem they
      awkwardly patched with function.sent.
      
      Also allows the function to run some computation as soon as generator is
      created.
      
      The type of params of first yield is always ().
    ///
    Int [ a, b ] = await yield() ?? [ 0, 1 ];
    
    for => [ a, b ] = await yield(a) ?? [ b, a + b ];
  }
  
  // Very experimental syntax, needs polishing and lots of syntax sugar:
  fib.StackFrame is Stream<Int>; // ???
  
  Bool called = false;
  
  []type Params() => called ? [ Int ] : [];
  
  // Yay for dependent types in an imperative language!
  (Int, Int) yield(...Params p) {
    return called ? fib.frame.continue(p) : for {}; // Pure speculation.
  }
  
  fib.StackFrame generator(yield);
  
  generator.next(2, 3); // Where and how should this function be defined
  ```
  My head hurts
type of function params that depends on program state
`for await`, `for parallel` or `parallel for`?
error: continue cannot take an argument
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
    at every point in the program, there would be no way to do that modification.
    
    Or maybe destructuring should be considered atomic in this sense?
    
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
a way to call effectful code so that it creates new objects instead of modifying
  existing ones?
  Could solve the same problem lens solve in haskell (for immutable data).
is it true that every valid program is typable?
is chalk sound and complete?
shouldn't 'type template types' be just functions? `class<any>` vs `class(any)pure`
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
unary `^` as bitwise negation?
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
friend classes and friend functions
Number.parse(String str, ?Int base = 10, Bool allowBaseChange = ??) // base == null -> str must be prepended with 0x, 0b, ... ?
should duplicate variables be a warning? eg.
  ```
  mut Int a;
  let *Int p = a; // Will always point to a.
  ```
`fsEntry.trash()` - move to trash `Fentry.delete()`
be sure to correctly handle this: `foo[type T extends Bar<T>]`
it should be possible for a trait to mandate existence of a member
  without mandating its type (or parts of that type, eg. some params)
  ```
    trait Collection {
      static const type Args; // ??? This is ugly. can it be done better?
      
      forEach(...Args args) -> {}
    }
  ```
in traits, it must be possible to delegate everything to classes, even
  initialization of variables (ie. no 'uninitialized member' error)
`try { ... } catch ?IOError e;` does not have a block that is executed only if error,
a way to assume something about this, eg. in methods, that subclasses must provide
observable - optionally batch changes
  ```
    class C {
      observable pub Int a; // Most conservative aproach,
      pub Int b; // `b` cannot e be observed.
    }
    
    class C -> Observable { // Little less conservative aproach.
      pub Int a;
      pub Int b;
    }
    
    class C { // Liberal aproach, convinient, but will it be slow?
      pub Int a;
      pub Int b;
    }
    
    mut C c(), d();
    
    Observable o(false); // Signature: `Observable(bool batchEventsDefault)`.
    
    o.observe(true, c, d); // `observe(bool batchEvents = batchEventsDefault, ...T observed)`.
    
    [ c.a, c.b, d.a, d.b ] = 4.map(_ => 1);
    
    // o.on((e, Reflect.Field(C) field) {})
    
    o.on(([](e, Reflect.Field(?)) changes) {
      // ...
    });
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
`class Car -> Vehicle {}`
  `let i : Int where i : Prime and i : Even`? visually, this looks confusing,
  mistyped conditional operator.
`get` and `ret` vs `get` and `inget`? or just `get(Key key, ?Value default = null, bool insert = false)`
`Set(Int)` - set of all integers?
haskell-like function declarations?
  mut fact(0) => 1;
  mut fact(n) => n * fact(n - 1);
chalk should mandate little endian, and `<< 1` (or `<<< 1`, to make it different?)
  should be the same as `/ 2` (that is `<<` and `>>` should be reversed as opposed
  to other languages)
chalk's logic / typesystem as I imagine it now seems not to support talking about
  or proving things about how variables change. For example, that a variable
  always increases. inadequate
`Int64` mutable, `I64` immutable - avoids memory allocation
stlib function `nextGteMultiple(number n, number multipleOf)`
there should be two newlines between imports and code. Thats because there
  can be one newline between imports that makes it harder to see where they end.
`'` for simple strings, `"` for strings with formatting, eg. "Tau is ${Math.tau}"
some (all upstream?) branches should be readonly with the exception of pull requests
`import "path" as ModuleName`, `import "path" as { foo, bar }`
IDE: display errors in scrollbars too, in editor and tree view and all other error-containing windows
IDE: different shortcutws for open definition in this tab and open definition in new tab
prove that: for each program (as defined abstractly by the spec, ie. eg.
  a set of modules) there is a string that represents that program, and each string
  that conforms to chalk grammar represents a valid program
version control: as many commits should be reversible as possible
version control:
  correct:
  ```
  - import { PageModeUtils } from '#services/pageMode';
  + import { *PageMode, *PageModeUtils } from '#services/pageMode';
  ```

  wrong:
  ```
  - import { PageModeUtils } from '#services/pageMode';
  + import { PageMode*, PageMode*Utils } from '#services/pageMode';
  ```

  even better (if text formatting is avaiable, use at least one of green/red,
  bold/strikethrough for insertions/deletions):
  ```
  import { +PageMode, +PageModeUtils } from '#services/pageMode';
  ```
  
  3 display options:

  0. just a single file with insertions and deletions
  1. two files, right is the new file with additions, left is old file with deletions
  2. two files, right is the new file with additions, left is file with both
```
import { Var, PlusNode } from 'spec';
import { Program } from 'compiler';

Promise foo(Folder f) {
  Program p(path => f.readFile(Path(path))); // Or just Program(f) in this specific case.
  
  await p.load('./main.chalk');
  
  Var var = p['main'].getVariable('o').rename('a'); // Or `p['main']['o']`.
  
  for let occurence of var.occurences() {
    occurence.replaceBy(PlusNode(a, a));
  }
  
  p.run();
  
  // Only saves files that changed.
  ignore p.save(); // OK
  
  p.save(); // Comptime error: p.save can erturn 'Error: write function not provided.'
  
  assertOK ignore p.save(); // Comptime error: p.save can throw at runtime
}
```
support fixpoints of arbitrary functions, not just types, if well-defined?
  ```
  foo() relation {
    bar(Int x) => x * x;

    return bar(Self); // Same as `bar(bar(bar(bar(...))))`
  }

  0 in foo; // True.
  1 in foo; // True.
  2 in foo; // False.

  // Or:
  foo() relation {
    bar(Int x) => -x;

    return bar(Self);
  }

  0 in foo; // True.
  Int == foo; // ???.
  ```
I need a syntax for side effect types.
  should all functions be pure by default?
  `fn Int -> Int` / `let Int -> Int` - pure function (?)
  `fn {infer} Int -> Int` - infer all side effect types
  `fn Int -> Int {infer}` - alternative
  `{ _: (Main a, Args b) -> Return, a: Even x -> Odd y where y > x }` (`Even x -> Odd y > x`?)
  `{ _: (Main a, Args b) -> Return, a: Even x -> Odd y, else: infer }`
  ` { a: Even x -> Odd y, else: infer } (Main a, Args b) -> Return`
  
  (possible) examples:
  `let Int -> Int = a => a` // yes?
  `let Int a -> Int => a` // no?
  `fn Int -> Int = a => a` // no?
  `fn Int a -> Int => a` // yes?
`import folder.File` imports folder/file.chalk? Problems: extensions
  `import { folder: File }`
  `import folder.{ foo, bar }` name of file missing
  `import folder.File{ foo, bar }` ugly, no longer a proper destructuring
  `import Foo from folder.file`
  all of this is ugly
there should be two classes of type errors:
  "Cannot verify type correctness of expression", when a compiler cannot infer
  a valid type, but cannot prove the code is invalid
  "Cannot use expression of type X where Y is required", when a compiler can
  prove there is an error (and maybe even produce an example)
have both `Set` and `EqSet` - the latter uses equality, requires its
  elements won't become equal
this should typecheck out of the box (a bit of pseudocode):
  ```
  let arr: [][]Int where Ex a, b of _ st. _[a][b] = 7;
  let arr = foo();
  
  let a, b = null, null;
  
  arr.forEach((line, y) => line.forEach((e, x) => e = 7 and a, b = x, y));
  
  assert a, b not null;
  ```
have syntax for `for str in textStream is not None:` (depython the syntax though)
Chalk should have `&&`, `||` and `? :`, ChalkScript should have `and`, `or` and `(if?) then else`
  also, Chalk should have ints that are fully class like, ChalkScript should have primitive ints?
underscore `_` can appear anywhere in the source code with no meaning
  to enable indentation without compiler complaining about whitespace?
  ```
    case _5: blah();
    case 10: bloh();
  ```
this should be a valid program that provably returns two:
  ```
    Fn foo(): 2 {
      s = 0;
      
      Proc add(n Int) {
        s += 1 / 2 ** n.
        
        Add(n + 1).
      }
      
      Add(0)
      
      return s;
    }
  ```
  althought it would probably be a good idea to have separate types
  for functions which might not terminate in finite time.
  a problem with infinite semantics like this: it might work if `s` is Real,
  (ie. eg. a set of rationals)
  but if `s` is rational, than its computer representation does not have
  a limit, even though the numerical value approaches 2.
language variant to consider:
  A fragment of type system where each type can only be bounded by other types
  (from either direction.)
  I have a hunch that would greatly simplify the typing system, but at the
  cost of losing the ability to eg. say
  `Let T be such that for all x of T, x ++ 'a' is T`.
Gradual typing that allows no types at all.
Two modes for the type system:
  strict - errors unless programs is provenly well-typed
  lenient
what should `{ Never a }` be?
  0. `Never`? That is the zeroth intuitive thing that comes to mind.
  1. Type of objects that do not have the property `a`?
  2. A type such that `{ a: string, b: string } & { b: Never }` equals `{ String a }`
what about real time / asymptotic guarantees?
  some constructs that error if a certain algorithm is not provenly within certain
  bounds (before/after optimization)
binary, maybe also hexadecimal and octal numbers should be little endian? `Int8Max = 0b000000001 - 1`
should the compiler warn if branching condition can be resolved at comptime
  because of local value whose type allows values that could change the condition?
compiler: mark parts of code as used, warn if such marks are in code for too long?
  ```
  //@ used by 17. 4. 2019
  const x; // Error: const x is not used and it's past 17. 4. 2019
  ```
  Date in little endian must be hardcoded into the grammar, mixed-endian will not be supported.
duplicate code warning
suppress duplicate code warning in duplicated and deprecated code?
`deprecated` function keyword? `Null foo() deprecated {}`
```
  find<type T>([]T arr, (T) -> Bool predicate) =>
    for let t : arr { predicate(t) && break t }; // If not found, returns null.
```
version control - let people request privileges, to eg. create branches, create
  a specific branch, view private repos/branches etc
types of repos:
  public repo
  private repo - its name is visible, but its contents aren't
  hidden repo - completely hidden
console in debugger must be able to inspect all, including private, variables?
import sort order:
  0. libraries
  1. absolute paths
  2. relative paths
  
  each group should be ordered alphabetically by path, and names in object
  destructuring should too
both `Folder.unlink(path)` and `Folder.delete(path)` (or `Folder.unlink(path)` and `FsItem.delete()`)
pub restrictions:
  ```
  // Function that can only be called with even numbers unless the caller is foo itself or bar
  foo(Int pub Even x) trusts bar {}
  ```
  a function must be public to have pub-restricted arguments functions not in class
  scope are always public. Parameters that do not have a public restriction
  have the same public and private type.
  Public restriction must be a subtype of the private type.
IDE: temporary tab: double click or something to turn it into a permanent tab
IDE: list of named scopes (ie. classes, functions, etc) the caret is in at the bottom
  of the window (or somewhere else) (`Main > main > Vue.extend > methods`)
debugger: select target - Chalk Abstract Machine / a target architecture
  so that programs can be stepped per CPU instruction / other unit of code in target architecture
IDE: search should have different background color when match count is to more
  than one, one, zero
IDE: optional sounds?
IDE: suggestions tooltip should contain grayed out text with `Ctrl + ↑ ↓`
traits can contain field, but implementing classes must redeclare them
Version control: should branch names be unique per project or per project * point in time?
should enum.values an array, a tuple or a set?
should?
  ```
    class Tuple(type ...Args) = Array[Object] arr where {
      arr.length == Args.length;
      All Nat n < arr.length: arr.get(i) is Args.get(i);
    }
  ```
terminology: if A is B, A() is direct instance of A and instance of B?
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
discard `unsafe` keyword, anything potentially unsafe must be provably safe
`T t = undefined` should not be unsafe code, it should just error if variable is
  - written to if not known whether defined
  - read if possibly still undefined
a type can implement Nullable, save space if optional
function binding operator?
`|=` and `|-` operators for logicians?
  unfortunately, one already exists, the other duplicates the grammar:
  `a |= b` equals `a = a | b` and `a |- b` equals `a | (-b)`
  what about `|==` and `|--`?
should explicit proofs (ie. compiler doesn't infer any relations between
  statements, the whole proof is provided by the programmer) look like this?
  ```
    class Nat : Add, Mul, Ord {
      ?Nat p; // predecessor

      new(_p) {}

      axiom timesZeroIsZero = All Nat n: n * Nat() == Nat();
      
      axiom induction(
        prop Prop,
        Prop(0) baseProof, All Nat n { All Nat m < n: Prop(m) } -> Prop(n)
      ) => All Nat n: Prop(n);
    }

    let zero = Nat()
    let one = Nat(Nat())
    let two = Nat(Nat(Nat()))

    prop evenOrOdd(Nat n) => Exists Nat m: n == two * m | n == two * m + one;
    
    conjecture allNatEvenOrOdd = All Nat n: evenOrOdd(n);
    
    let base = evenOrOdd(zero) by zero == two * zero by timesZeroIsZero; // Proofs run backwards, this is ugly

    let step = All Nat n {
      All Nat m < n: evenOrOdd(m)
    } ->
      evenOrOdd(m) by TODO
    
    allNatEvenOrOdd by induction(evenOrOdd, base, step);
  ```
  ```
  // Let's make the proofs run forwards
  
  from timesZeroIsZero: zero == two * zero; then: let base evenOrOdd(zero);
  
  from timesZeroIsZero: zero == two * zero; then:
    let base evenOrOdd(zero);
  
  from timesZeroIsZero {
    zero == two * zero;
    
    then {
      let base evenOrOdd(zero)
    }
  }
  ```
compiler flags
  there should be almost none. every setting that a program needs should be part
  of that program - ie. specified in a file, not passed to the compiler
  
  program directives: --no-infinities, --no-excluded-middle, --axiom-of-choice
generic values
destructor should be called `destroy`, and in ChalkScript, it should the the
  user's responsibility to call it if it is not a noop. When the last ref to
  a variable is overwritten, `destroy` should also be called by the language,
  so it must be idempotent
`final trait T trusts This {}` - trusts the entire module?
`foo{ A : type optionalGenericParams : B }[ C : type MandatoryGenericParams : D](RuntimeParams params)`?
type coertion operator (`!!!`?) should not need the target type, just the fact that
  a conversion should happen, together with `T() => expr!!!`, does the trick
`[i:j]T` type of array of T with at least i (inclusive) and at most j (exclusive) elements?
website/embeddable IDE: support tabs
  on the main page, have examples in tabs starting with hello-world.cks
maybe `arr[0]` should not be valid syntax? `[]` only for generics?
maybe `arr[0, 1, 2]` should be supported?
maybe `arr[0..1]` should be supported? (slices vs views?)
since for every type variable, there is a lowercased variable that is a set,
  and vice versa, it should be required that letter cases are consistent
  ```
    let t = int; // Ok
    let t = Int; // Error
    let T = int; // Error
    let T = Int; // Ok
  ```
block strings?
  """
    This is a block string.
    Should it end with a newline?
    
    Or should all newlines be ignored? (Preferred, I think.)
  """
`class Set[type X] { ... }`, `T[A, B, C]` generics syntax
`pub class (T a, U, b)` syntax for classes that are also tuples?
null and conditionals:
  `a ?: b`   vs    `a ?? b`
  `a &&? b`        `a &&: b`
  `a ||? b`        `a ||: b`
  `a ?? b : c`     `a ?: b : c`
  I prefer the left version, it makes more sense, since null-proof member access
  is `?.` and not `:.`.
`[]Magma(T).leftJoin(?T t)`, `[]Semigroup(T).join(?T t) -> ?T`, `[]Monoid(T) -> T`
should string literals be allowed to span multiple lines? The newline would be ignored.
special types `I` and `B` that only exist in ChalkScript, value types of Int and Bool
rename `assume` to `invariant`, `require`, `where` or `axiom`?
`"String templates: $variableName, ${Math.tau}"`
  must be pure
  only avaiable in double quotes?
Types must start with uppercase and non-type variables with lowercase letter
`(A_0, ..., A_n)` equals `{ (a_0, ..., a_n), a_i of A_i }` iff every `A_i` is inhabited?
`( Int, Int )` is a pair of types, `((Int, Int))` is the type of pairs of ints?
  `{{ a: String }}` a type of objects with public String property `a`
`Object.fields` / `Object.members`
Block returns last statement, function must return explicitly
Behavior of a program that compiles must be completely specified by source code.
  What are compiler options like ffastmath in gcc must be part of source code.
  Compiler options can only mess with levels of optimization, perhaps also with
  what is a valid program and what not (eg. enabling new, experimental syntax),
  never with semantics.
compiler should warn if a file is never imported
  if too many files, just write "foo, bar, baz and 216 other files not imported"
multiline string:
```
  """
    Abc // this is not a comment, it's part of the string (I guess?)
    
   asdf // compile time error, not indented enough
  """
```
algebraic data types? (`data D = A Int | B Int Int`)
  should they be merged with enums?
  ```
  enum Tree {
    Leaf Int,
    Leaf Tree Tree Int;
  }
  ```
  they should be sugar for `final trait D {} class A : D {} class`
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
should this be valid chalk?
  ```
    static let AllowedArgType = () => {
      mut foo = { Null, Bool, Nat, Int, String, Float, File, Folder };
      
      return let ret where ret in foo or finite ret and ret subset of some x in foo;
      
      return let ret where ret in foo | finite ret & ret subset of some x in foo;
      
      return let ret where ret in foo | finite ret & ret subset of ex x in foo;
    }
```
what about type of object that doesn't have to have a property, but if it has
  it, it is of certain type? `{{ Int a, Int|undefined b }}`
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
  in source code
runtime vs dynamic, and comptime vs runtime type? I prefer dynamic and static.
class cannot be instantiated if it has no fields
```
// Pointers to fields?

class A {
  B b;
}

class B {
  C c;
}

class C {
  Int foo;
}

A::B::C foo = c;
*A::B::C pA = A(); // ?
A::B::*C pF = foo; // ?

pA == 6;
C().pF == 6;
```
pointers:
  ```
  = assign
  := assign to a pointer
  ::= etc. or maybe in reverse?
  ```
compiler must warn/error if it cannot prove comptime code terminates
  and maybe an indicator of progress (eg. in CLI) could be automatically
  derived from the proof of termination
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
`(3.5).fraction == 0.5`, `(3.5).whole == 3`, `(-1.2).frac == 0.8`?
starting stack shouldn't be any special from other stacks (of other threads,
  coroutines maybe)?
pools as hierarchical collections of threads
  - resource management
  - ability to move couroutines, threads and pools between pools
promise/coroutine cancellation
why does async have to be explicit (`Promise<T>` instead of just `T`)?
  because otherwise every function invocation would possibly block,
  which opens too much problems with race conditions.
  and it would remove the difference between calling and waiting,
  and just calling.
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
```
> chalk
Version `0.5.16`. Try `chalk.help()`. // ?Version is colored, `chalk.help()` is underlined and clickable
// Blinking cursor of REPL
```
should global REPL variables be allowed to be mutable? upside: easier hacking,
  downside: the code, after being saved, might not be valid chalk
  Or the save() function will have to make these globals members of Main,
  which might not be a bad idea.
  Or have a flag for this, `--mutableGlobals`.
Every flag must have a help page.
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
  i/*why tf is this legal js*/+=1;
  ```
`trust` keyword to stop unsafe from spreading, compiler can ignore with `--notrust`
  no - see George Washington's quote
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
should it be possible to deallocate part of memory?
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
`(folder|file).persistent is Bool`
```
  Folder(
    [ ( 'a', [ ( 'b', [] ) ] ),
      ( 'b.png', Buffer('b64', 'iVBORw0KGgoAAAANSUhEUgAAASoAAAFjCAYAA...') )
    ]
  )
```
`chalk pkg` - should version masks be used at all?
replace `chalk install` and `chalk update` with `chalk pkg install` and `chalk pkg update`?
it should be possible and easy to have multiple packages in the same repo (I think)
  how should this work. (relevant to design of ?package.json?)
  probably make a new name for that file to avoid conflict with npm
`debug.log()` that magically works, `debug` doesn't need to be passed in parameters
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
type is NOT a value, type is a property of a variable
  EDIT: uh, no, types are first class. Did I mean "type of a variable"?
`a and b`, where `a: A` and `b: B` should have type `undefined` if `not A <: Bool`,
  (subtype relation) else it should have type `?B`, not `Opt[b]`. If anyone wants
  to get `Opt<B>` out of `a and b`, they can use `a and Opt(b)` instead.
out formats - web, chalk (eg. c to chalk), (appimage?, exe?, elf?, own format?)
creating a new instance should be `Type.new(...)` or just `new(...)` instead of `Type(...)`.
  The latter has the syntax of a function that returns a type
chalk: only allow identity `===` if it is provable that `===` is expressible/computable using
  something else?
nice syntax instead of where clauses?
  https://www.reddit.com/r/ProgrammingLanguages/comments/jtwyxu/dependent_type_systems/
lets say sets compare their elements using structural equality, that seems preferable
  now if mutable elements are allowed, and one element becomes structurally equal to
  another of the same set, what now?
  it seems to me sets should either use identity instead of equality, or should
  only be capable of containing elements that are constant while in the set
  how do other languages solve this?
use `=` for equality, use destructuring `asn a = foo()` for reassignment
type errors: https://www.reddit.com/r/ProgrammingLanguages/comments/jtxbdj/soliciting_ideas_on_generating_good_compiler/
english - like proofs?
  ```
    Define foo(a: Nat): Int => a.
    
    Let x be a foo(42).
    
    Informally, this entire paragraph is a comment because it begins
    with the word informally.
    
    Informal section:
    
    Bla bla. End of section.
    
    Suppose x is negative: {
      Every a such that a equals foo(42) is positive.
      
      A contradiction.
    }
    
    X is not negative.
    
    Qed.
  ```
  
  I am concerned that using `informally` as a keyword might lead to unintentional
  humor because a mathematician still might wish to use formal, but natural language.
  
  other examples:
  ```
    Let foo take (x of int, string t and int t) to string {
      Return 'asdf'.
    }
    
    Let foo take (x of int, string t, and int t) to string 'asdf'.
    Let foo take (x of int, string t, int t) to string, t ++ string(x).
    Let foo take x of int, string t, int t to string, t ++ string(x). // Enable parenthesis-less tuples? I'd rather not
    Let foo take x of int, string t and int t to string, t ++ string(x).
  ```
in chalk, an equivalent of this TS code should work:
 ```   
    export type Pattern<Node extends AstNode<Node>> = (
        CharClass
      | Text
      | Before<Node>
      | After<Node>
      | And<Node>
      | Or<Node>
      | Not<Node>
      | Maybe<Node>
      | Repeat<Node>
      | Equals<Node, typeof AstNode, ANode>
      | EqualsArr<Node, typeof AstNode, ANode>
      | Pattern<Node>[]
    );

    type RemoveEquals<T extends Pattern<ANode>> =
      T extends Equals<ANode, typeof AstNode, ANode> | EqualsArr<ANode, typeof AstNode, ANode> ? never
      : T extends (infer P)[] ? RemoveEquals<P> : T;
 ```
it should be possible for rest parameters to have a type `String|Object[]` even though
  string is not an array
ChalkScript should probably have both primitive `int32` and class-based `Int32`
  
people should be allowed to specify their own axioms / models of the world,
  because there are legitimate uses (ie. if I control the local network,
  I may guarantee something about it), but it should impossible to not notice
  if this is used, because of how dangerous it is
  eg. if the axioms are contradictory, i guess everything should typecheck
`collection.some/exists|all` should have a default argument in case it's a collection of bools
`foo(a: Never): Never {}` must be a valid function - even though the body does not contain
  an infinite loop, it still cannot return because it cannot be called
class constructor should be able to return any value and it should be ignored
named ordered return values? `const [ a, b ] = foo()` & `const { x: a, y: b } = foo()` both valid?
make it possible to refer to shadowed variables using scope name
enumeration should be `(Int index?, T t): R`
regex syntax:
  whitespace: ignored
  alphanum: itself
  `\d*` d decimal, `\xh*`, `\oO`, `\bB`: a utf8 character
  `[: ... ]` before?
  `[ ... :]` after?
  `... & ...` and
  `... | ...` or
  `! ...` not
  `()` non-matching group
  `(=x: ... )` named matching group
  `(=x[]: ... )` named matching array group
  `\s` - either `\n` or `\32` (space) (or `\t`)
  `* ...` repetition
  `+ ...` repetition
  `{min, max} ...` repetition
  perhaps: `\nt` the same as `[\n\t]`?
there should be a type `PFloat` - precise float. Denormalized floats etc.
??? `type` should not be an instance of itself, because it should be possible to have
  a function (eg. `(t: type): type`) whose return value is ...
  Note: Was I looking for `type - { type }`?
syntax that makes predicates return false instead of type error if argumets are
  outside its domain? like `a in 3` is error, `a ^in 3` is False?
  or maybe `a in 3 <-> a in [ 0, 1, 2]`?
`mut a: Int` a mutable variable pointing to immutable integer, `let a: mut Int` immutable
  variable pointing to mutable integer?
be careful about implementing `range(from, to)` - enable both half-open intervals if `from > to`, and make sure it's intuitive
something-like-markdown to html/json
`|` is sugar for `Or[]` and `or()` (or should that be one function?) and `?` for `Null |`
  should `|/` be sugar for `Either[]` and `?/` for `Opt`?
`import foo/bar.orl` the same as `import foo/`
names in (import) paths should be restricted to `a-zA-Z(a-zA-Z0-9\-)*[^\-|].[allowed extensions]`
```
mut a = (Int, Int, Int).arraySlice(0, 1).expand(2)

a.expand(1); // error

mut a = (Int, int, bool).arraySlice(0, 1).expand(2) // should this work?
```
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

chalk tutorial // The same as the web tutorial (?)

chalk load

// all commands where appropriate: accept both path to file and chalk expression
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
`(1 * 2 ^ 100) / 2 ^ 100` should equal 1
maybe tuples really should use `;` instead of `,`
  `{ a; b; c; }` returns `c`
  `( a; b; c; )` returns, well, `( a; b; c; )`
`class Set [ All type T ] {} == Set[Int] & Set[String] & ...` ???
iteration and destructuring: should it use `=`, `<=` or should it be possible
  to use both? given that `[ a ] <= foo()` equals `[ a, ... ] = foo()` equals `[ a, ..._ ] = foo()`,
  it should use `=`. should it silently ignore unfitting destructurings, or should it error?
`e -: eArr` and `eArr :- e` array push / unshift operators?
  concatenation already has a special syntax: `[ e, ...eArr ]`
function definitions before function body may actually be a good idea
  in case the type of the function spans several lines or more
`HashArray`?
`map.setDefault(5); map.get(nonExistingKey) == 5`
`Reflect.reachable(a: A, b: B)` - returns whether there is a directed path from a to b
```
  mut t = null;
  
  foo(a = x => x) {
    t = null and return asn t = a;
    
    return t = a;
  }
  
  foo();
  foo(); // Should return what? the function is the same. But the same function with different closures should return false, right? should return false?
```
all programs must work the same no matter how the condition of `if known T` is evaluated
regular types like `T = (Int, T)` are also computable, should they
  also be values (in addition to classes)?
trust should be inherited by nested classes / functions
`class static A {}` for a class with all members static?
  also `class pub` & `class pub static` (but not `class static pub`)
`throw ProgrammerError('The only error with a string message', more, data)`
a type is an instance of the value `type`
  this is perfectly valid code (assuming a suitable definition of `Foo`)
  ```
    import Asdf as { Foo }
    
    let l : Foo = type;
  ```
  also there should be a global type `Any` (or something) whose definition is `type|Object`
    or perhaps all classes should be instances of `Object` as well?
  also I should probably rethink "types are PascalCase". maybe all should be lowercase,
  because it is perfectly valid to have a variable that can contain both types and
  nontypes, and it's also perfectly valid to use types in ways not typical for types
  (eg. as nonterminals in a grammar).
variables must not differ only in letter case
for a class $c$, `set(c)` should equal `c`
  does that mean that `type` should equal `set[any]`? also, should there be a difference
  between a class and its constructors?
  should this be valid? `class c { new() {} } let () -> c foo = c; let x : foo = c()`
probably types except classes should not be values.
  else this would be weird: `(Int | Text) === (Int | Text) // Any result is weird`
  returning true would mean that even types that were constructed in different ways
  (think `A|B|C` & associativity) are identical. returning false means there are
  equal types with distinct addresses. In any way, equality on classes is computable
  (and should functions be classes?), while equality on types in general is not.
this should be parseable, right? `if (a) b = c else d;`
  support both `if (cond) expr else expr` and `if cond { exprList } else { exprList }`?
chalk should not have abstract keyword for methods - is the body there? then it's not abstract
if traits can contain member variables, they should be declarable without initializers,
  and initializing should be comptime-verifiable responsibility of implementing classes
`Map[ExactKey, Value]`, `MapL[KeyLowerBound, Value]`, `MapU[KeyUpperBound, Value]`
IDE: suggested code should be colored just like actual code
a way to insert an element to an array / linked list at a position such that
  if the array was sorted with an order defined by `fn`, then the element will
  be inserted such that the new array will still be sorted.
  `enum StrictEq { lesser, equal, greater }` (also perhaps `enum Eq { incomparable(false, false), greater(false, true), lesser(true, false), equal(true, true); isLesser, isGreater }`)
  Maybe `Array[E].push(element: E, fn: null | (E, E) => StrictEq)`
  Maybe `Array.pushMany(element: []E, fn: ...)`
`for --; condition; post {}` and `for init; condition; -- {}`?
issues: polling. With options to treat committers and the general public differently.
signature of forEach and similar functions should conform to `key, value` order, not
  `value, key` as in JavaScript
implication/logical operators: `->`, `<-`, `<->`. (or `><`, or just plain `=`)
  (fon operator? iF and ONly if)
  Their negated versions?, version A: `!>` , `<!`, `<!>`.
  Their negated versions?, version B: `/>` , `</`, `</>`.
  Their negated versions?, version C: `!->` , `<-!` or `!<-`, `<-!->`.
  The negated versions should probably be omitted, since they are easily expressible
  on other ways.
chalk vs chalkscript: `&&` vs `and`, `? :` vs `then else`, `<>` vs `def`?
  ```
    def a() => null;
    
    <> a() => null;
  ```
  I like it.
Should unrelated classes be able to define an ad-hoc is-a relationship?
  eg:
  ```
    class PushdownAutomaton { ... }
    
    class FiniteAutomaton is PushdownAutomaton {
      ...;
      
      toPushdownAutomaton(): PushdownAutomaton => ...;
    }
    
    FiniteAutomaton f = foo();
    
    PushdownAutomaton p = f; // Converted?
  ```
  This seems weird, but perhaps something like that would be appreciated in the math version?
style: all comments should be on their own line.
any function declarations must immediately precede the definition of the function
  ie. there musn't be anything between a function declaration and its definition
use `@` for enreferencing? and perhaps `^` for dereferencing (if not for xor or exp)
  or `$`
classes should be able to become instances of traits.
  also, controversial vocab choice: classes should extend interfaces,
  values should implement interfaces
  (with this choice of terms "classes should be able to implement traits")
  if not implement, then what?
https://github.com/millsp/ts-toolbelt
`This` implicit constant parameter that points to a value's class
regerex: think about this test case:
  ```
    S = (A & XX (A & X) XX)
    
    X = [^]
    
    A = X X X
  ```
  make sure it is not interpreted as `S = ((A & XXX) XX) & (XX (A & XXX))`
`let x: A <: B;` means that the type of `x` is a supertype of a and a subtype of `B`.
  what about `>A & <B` instead? or `A -< B`?
user-defined comptime errors (if a comptime code throws)
user-defined comptime type errors - eg. `if known x is not Prime`
  this would enable shifting errors that would surely happen at runtime
  to comptime iff the compiler can figure that out
the return type should be inferred here (in chalk):
  ```
    function visited(p: Pattern<ANode>, s: GDfaStack) {
      if (s === null) return false;
      
      return p === s[0] || visited(p, s[1]);
    }
  ```
`Nat n = n / 2 + 2` should compile, `Nat n = n ** 2 / 2` should probably be a syntax error,
  `Nat n = (n ** 2) / 2` should be an error unless in a nondeterministic context
language version with no addresses and no side effects?
`foo(this: Restricted)` or `foo{ this: Restricted }()`?
  the latter, I believe
there should be assert in stlib, and probably even in the global scope (what else would
  you name `assert`, exactly?) The assert should do runtime validations
  even in production builds - no undefined behavior
there should be IdSet and EqSet, and IdMap and EqMap
  should there by a special syntax for them? `{ a, b }` is an IdSet, `{= =}` is EqSet?
  or `{= =}` and `{=== ===}`? but that's too long
  `=` equality, `===` identity
`known a is Prime then t() else f()` - `t()` is only executed if it is known at compile time
  that `a` is `Prime`, else `f()` is executed
```
  fn asdf {
    a: Some T<Int, // Implicit generic param
    b: Bool >>> !b,
    
    where a is Prime -> b
  } (
    arg: <C,
  ) >> R = Ret[T, 42] // Implicit definition of R to equal Ret[T, 42]? or perhaps `let R = Ret[...]`?
    where compatible(R, T, 11)
  { // On a new line iff function head definition spans multiple lines. But on the same line if no return type specified.
    foo();
    
    return bar();
  }
```
`fn name [generic params] { side effects } (runtime params) { body }`
```
  fn a { a }() => a += 1; // `{ a }` means "infer side effects".
  fn a() => a += 1; // Error.
```
compilation: not every error should be presented as a type error
a method is a function whose this parameter is bound to a value
allowing arbitrary types as values would necessarily make
type `class` should be part of the language, because equality between class types is decidable
  that would make `set[class]` usable in practical programming, unline `set[type]`
how does the time evolution operator (or change operator) `>>>` compare to ctl*?
`class ValueError<type T> : Error { T value; this(T _value) {} }`
should it be possible for an intersection of a (user-defined) class type and a function type
  to be nonempty?
  ```
    fn foo() {
      read let i = 0;
      
      return () => { i += 1; i }
    }
    
    let f = foo();
    f.i // 0
    
    f();
    f.i // 1
  ```
  I guess it should
`allPub`, `allStatic` keywords for classes?
  or no `allPub` or equivalent, and `namespace` instead of `allStatic class`?
definition of multiple variables? there are two options:
  Option 0: `Int a, b, c;` or `let a, b, c : Int`
  Option 1: `(Int, Int, Int) a, b, c;` or `let a, b, c : (Int, Int, Int)`
  option 1 leads to `type T = (Int, Int) where _[0] < _[1]; T a, b = ( 0, 1 );`
  and `assert/assume a, b : T` (other alternative: `T[a, b]`)
both `int` and `Int`, but `int` musn't be used in generic functions because `int | Int`
  would cause problems.
precise types vs type hints: (syntax not important)
  `Int i` - i can contain value v iff v is an Int.
  `<:Int i` - if i can contain value v, v is an Int.
  `>:Int i` - if v is an Int, i can contain v.
  In the latter two examples, the type of i is unspecified (similar to `let i`),
  it is merely restricted, and it is the compiler's job to infer it.
  alternative syntax proposals:
  `Int i`, `<Int i`, `>Int i`
  `Int i`, `<Int i`, `Int< i`
  `Int i`, `:Int i`, `Int: i`
  `Int i`, `?:Int i`, `Int:? i`
functions exported from `/-.oprola` should be callable by other processes
quaternions in standard library
references: it would be nice if there were references to portions of String and Buffer,
  but I do not want a situation like in Rust that reference is its own type different from `*String`
underscore for unused function parameters
`arr.subarrays(sub => sub.length mod 2 = 0)` iterates all subarrays,
  also `subsets` for sets and something for not-necessarily contiguous sub(sequences?)
infinite semantics: an infinite function returns value v nondeterministically
  iff there exists a subset of states that the run produces such that
  the limit of such states is v, TODO this can be corrected
  `mut x = false; for { asn x = not x } return x` returns both true and false
semantics of improper programs (the "debugging", not "standard" semantics):
  `if (undefined) { a() } else { b() }` runs both `a()` and `b()`.
regerex: there should be escape sequences only, no escape chars: `a\da` is not `a[0-9]a`,
  it is "Error, unknown sequece \da". Whitespace is ignored. `a \digit a` is `a[0-9]a`.
  don't have one-digit sequences, it's ugly.
  `!(asdf)` is anything by `asdf`, `!\digit` is a nondigit. no `\Digit` or `\notDigit`
`Array[T]` / `Collection[T]` `umap((t: T) => Array[T])` that returns flattened array of returned arrays
trait can declare variables?
import path should be able to contain numbers, but there musn't be a hyphen between
  two digits, and there must be a hyphen between (in that order) a letter and a digit
  hyphen in fron of letter means import uses uppercase
  `import A as { b }` same as `import A.b`
  `import A as { b: c }` same as `import A.b as c`
  no `import *` or `import A.*`!
there should be a way of talking about computational costs, and give real-time
  guarantees
do have some stlib method that iterates all n-tuples of booleans, all subsets, etc
should immports require semicolon? I'm leaning towards no.
should the dot `.` followed by an empty line (or by `\n`) be a valid expression separator?
  Should the empty string be a valid expression separator? Whether or not followed by empty line?
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
should assignment use some other operator than `=`?
conjectures
Array should not have `.join(str)` because an array has nothing to do with strings
  unless it is an array of strings. String could have `join`, `"a".join([ 0, 1, 2]) == 0a1a2`
  but array could have split: `[ 0, 1, 2 ].split(1) == [ [ 0 ], [ 1 ] ]`
  should it be `"asdf".split('a')` (consistent with JS, inconsistent with Chalk's join)
    or `"a".split("asdf")` (opposite)?
abandon array syntax in favor of `Array(0, 1, 2)`? also `arr(3)` vs `arr.get(3)`?
https://soc.me/languages/type-annotations
`if a { b } else { c }` instead of ternary operator? and maybe `and`, `or` and `not` instead of `&&`, `||` and `!`?
if `C` is class, should a new instance be created with `C()` or `c()`? The former looks
  like it should return a type
try catch block should be able to catch explicit type casts, and explicit
  type casts should only be allowed inside try catch (or with a default value)
  or even better: stlib function `cast(Object o, type T, T default) => [o is T ? o : default]`
  such function could be used like `cast(n, Even | Error, MyError())`
  try catch would then catch MyError just with the standard semantics
array literal syntax for allocating array with certain capacity? eg. `[ 6 | ]`
  of `[ 0, 1, 2 ,... 42 ]` for a 3-element array with capacity 42? and `[ ...42 ]`
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
compiler option: output code even if there are errors, by default false
  if corrupted code is reached at runtime, program could panick or something.
  no undefined behavior should be allowed
temporal logic problems:
  if a value of a variable changes, should formulas containing the variable change
  their meaning too, or should they retain it?
  (the )
  I think both options are self-consistent, but which should be chosen? Or both
  (with different syntax)
  To consider: Changing likely cannot be simulated by unchanging formulas,
  unchanging formulas can be simulated by adding another variable and not changing
  that one.
totality checker should be able to reject this, but handle it if ints are replaced with nats:
  ```
    static bool IsPowerHelper(int n, int b, int m) {
      if (n == b) return true;
      if (n < b) return false;

      return IsPowerHelper(n, b * m, m);
    }
  ```
compiler option to error if the types used are undecidable?
  this would restrict the language to some subset of types that are decidable
```
class A {
  Int n = 10;
  
  Null foo() {
    Int m = n; // which n?
    Int n = 20;
  }
```
should there be both `+=` and `+:=`?
implicit argument conversions?
  ```
    // Without conversion: `foo([ 'a' ])`, with conversion: `foo('a')`.
    foo(Text[] arr implicit Text t => [ t ]) -> Text | null => arr[0]
  ```
  this would make `implicit` a keyword?
  multiple implicit clauses for the same parameter should be allowed
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
`.chs` for ChalkScript? And `.ch`, `.chdoc`
warning: named variable of value type used as argument? You probably wanted
  a pointer type.
a separate pointer type for pointers that are not dereferenced? Used eg.
  in constructors so that there can be variables with cyclic references
`[ let a(), let b, asn c ] <= arr` checks whether `arr.length` is at least 3
  and the zeroth element of `arr` is equal to the value produced by the default
  constructor of the type of elements of `arr`, and if so, assigns `arr[1]`
  to a new variable `b` and `arr[2]` to an existing variable `c`. Returns
  true iff the condition was true.
  What should happen to `b` and `c` if this expression is not part of `&&`?
  `b` could be reasonably expected to be `null`, but I guess many people
  could expect `c` not to be affected by this:
  `[ asn x ] <= [] && print("I will never happen.");`, but be affected by
  `[ asn x ] <= [];`
  Perhaps assigning null in case of no match is the correct behavior in all cases.
  If someone doesn't want to affect `x` in case of no match, they can use other
  access modifier - `&&` creates a new scope, the original variable will be shadowed.
make `Int` a type of all integers (like `Nat` is the type of all naturals),
  and use `I32`/`I64`/other?
should `anInt + 1` be `?Int`? with the possibility of a module- or function-wide
  flag that would make `+`, `-` and `*` wrap-around by default?
`enum X { ... }` shorthand for `pub class X : Enum { ... }`
for every field `f` of type `T` of a class `C`, `C.f is T pure(C)`
optimization - guess necessary stack size of simple recursive functions?
`[ ..a ]` view, `[ .!a ]` or `[ ...a ]` or `[ ....a ]` slice?
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
traits should be just tyntax sugar for anonymous object types? no, they should have identity
package manager search by tags, languages, similar packages
`trait T { foo(T&Bar this); }`
error modes: eager/lazy - reports unless can prove code correct / only reports if an error is definitely detected
chalk frozen / exactLayout keyword to prevent compiler from rearranging object members in memory (should only work on indivodual objects/only on classes? exact[37b] to allow lengths that arent multiples of (32?)
if some function overloads overlap, it should not be an error, but it should be
  provably true that the implementations are equivalent, and it should be possible
  to instruct the compiler to prefer one implementation to others
warn if expression containing a non-constant could be replaced by a constant
unary move operator `=<<`
is 3 a (bottom) type?
  types are sets
  `Int.map a => 2 * a` is a set (and a type), should terminate in finite time
  `Var` type qualifier usable inside classes that means "mutable iff `this` is mutable"
  Just like unary types are sets, tuples are n-ary types
nand !&, nor !| ?
"well-typed" compiler option, means that types of variables completely specify
  programmer's intent, and therefore any value of a variable's type can be used
  when reading that value. Eg a funtion whose return type is Int can return any
  integer, no matter its implementation. A compiler could simply replace calls
  of such function with the number 0.
All side effects of a function must be part of the functions type
should isomorphic types be equal? Eg all bottom types?
every value should be an instance of exactly one class.
  If a variable has type T, should it mean that its value is of type T always or just anytime it is accessed? (In spec, define access as read or write)
  Ie. can a location be assigned a value of a type that is not compatible with all types of variables that point to it, if there are no accesses of that variable?
  `T|_T` types - what should assignment to var with this type do? No conversion from the source, I guess.
  `(_T)` - value type
alternate syntax for switch? just replace `?` and `:` with something else
  ```
    value ? 0 : 'a' ? 1 : 'b' ? 7 : 'c' ? _ : 'error;
  ```
value types: assignment should destruct a variable and call a constructor?
a name for the intersection of types of all variables containing value V - restriction type?
rendered spec: check button "Display"/"Hide" ++ " all proofs", and button for each proof
chalk should be first-order expressively complete
provably true/false = provable/disprovable, provenly true/false = proven/disproven
any program whose runtime behavior is as defined (if reasonably possible,
  with pretty lenient definition of 'defined') should be typable in chalk
type of values a variable can contain and type the compiler can assume an expression
  will have should not be the same - when modifying variables, this becomes clear. Maybe use type casts for the latter?
`(++)(a, b, c)` same as `a ++ b ++ c`
IDE: visually show size of backtracking buffer with gray total size and green used size, red pointer to current position (or just decrease used size?)
IDE drag IDE tab to browser tab and vice versa
compilation: when using colored/structured (eg. json) output, don't prepend error warning
  messages with "Error"/"Warning"/other, use colors/an enum for that
`RefSet`, `RefMap` that use reference equality instead of `Object.equals`
recursive proofs?
chalkdb: think about how to do proper validation when data can change
  proper pagination includes that going to the next page cannot result in a row
  being missed because a previous row was deleted
gui: have variables / constants like `primaryBackgroundColor`, which the user can set,
  so that all apps can be switched to dark theme at once, and are consistent
there should be `Nat128` and `Int128`, and also
  `type Uid128 = String x matching '[0-4]\B \B\B\B\B \B\B\B\B \B\B\B\B \B\B\B\B \B\B\B\B'`
  (where `\B` is a placeholder for `[0-9a-zA-Z*+]`)
  and ChalkDb should store `Uid128` in 128 bits
this type trickery should be valid:
  ```
    type ConstructType() {
      type T = trait {};
      
      for Tmp : [ trait { Int a }, trait { String b } ] {
        T &= Tmp;
      }
      
      return T;
    }
    
    { trait { Int a, String b } } T = ConstructType();
  ```
`import 2 asdf` vs `import ../../asdf`? I dislike `.` and `..` folders
`debug` variables that do not cause "Unused code" error, but make the IDE
  print out its contents:
  ```
    const Animation animation = AtTime(0)
      .transition(15 's')
  ```
enum values need not be written with their enum name iff they are expected
  in the expression?
  ```
    enum TimeUnit { sec, min, hour, day, week, ... }
    
    getMillis(Int i, Time unit) => ...;
    
    getMillis(15, sec); // Ok.
  ```
  I remember being pretty furious about a similar feature from C++ though... wonder why,
  no clear memories.
periodic threads
!! >> structured concurrency << !! or, as the author here calls them, nurseries:
  https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/
  or should just every promise be guaranteed to be awaited? (like the "tame goto")?
  I prefer the latter.
`foo(<|Int i) -> <|Int => i * 2` shorthand for `foo[All type A <| Int, Ex type B <| Int](A i) -> B => i * 2`?
breakable named if? every block should be nameable
stlib should have a function that iterates all boolean n-tuples in the order that corresponds
  to natural number increments (little endina: 000, 100, 010, 110, 001, ...)
problem: T.equals must be computable, and thats bad for classes like Nat and ZFCSet.
  maybe they shouldn't be classes, byt pure types?
  a solution for these particular types might be:
  ```
  class Nat {
    *Nat predecessor;
    
    static equals(Nat a, Nat b) => a.predecessor == b.predecessor;
  }
  
  class Set<T> {
    T element;
    Set<T> elements;
    
    static equals(Set a, Set b) => a.has(b.element) && b.has(a.element)
      && a.elements.every(a => b.has(a)) && b.elements.every(b => a.has(b));
    
    has(T) => ...
    
    every(Bool(T)) => ...
  }
  ```
  However, I'm unsure if there is always a workaround.
`move(dest, source)` - moves source to dest (and assigns null to source?)
reserve the keyword `UNSAFE_TYPE_CAST`
`fn foo(a, b) ...` should be a syntax sugar for `fn foo((a, b)) ...`
allow library-wide configuration in project.json?
  ```
    libraries: {
      typescript: [
        "4.0.3": {
          compilerOptions: { ... },
        },
      ],
    },
  ```
create an easy syntax for switching between mutating an object
  and making a copy. Eg `a.increment()` vs `a...increment()`?
type classes, let a class implement a trait in multiple ways,
  including with renamed members
  eg. a trait Field should be able to implement the trait Group
  twice (however, zero is not a part of the multiplicative group,
  should excluding certain instances be allowed? (restricting the
  type of `this` should be allowed in methods.))
  a better example: class Nat should be able to implement
  PartialOrder in the standard way, and also by divisibility.
  Anyone should be able to define their custom orders on things
it should be possible to restrict the type of `this` in methods
  `div(this: ~0, divisor: This) => ...`
perhaps use `>>` for lambda expressions, so that you can use
  `=>` for implication and `->` for functions (or vice versa)
  ```
    Int => Int
    Int -> Int  // ✓
    
    i > 3 -> i > 2
    i > 3 => i > 2  // ✓
    
    x >> x * 2  // ✓
    x .. x * 2
    
    All n: Nat >> n in Even | n in Odd;
    All n: Nat .. n in Even | n in Odd;  // ✓
  ```
```
  enum RangeType { open, closed, closedOpen, openClosed }
  
  class ranges Range<All T<: Order> {
    this(min, max, type = RangeType.closedOpen) >> ...;
    
    Range<int> implements Iterable<int>;
  }
```
similar to the limit state of ITTMs
  function call-else for defining a value if a function does not terminate?
    this is too general - it would solve its own halting problem
  ```
    prd foo() >> foo()
    
    foo() undef null == null;
  ```
```
  trait Vehicle { move(); }
  trait Named { name: Text; }
  
  class Car {
    implements Vehicle; // Specifies interface of objects
    static implements Named; // Specifies interface of class
    
    static name = "Clarntswough";
    
    move() {}
  }
  
  trait Field {
    trait FieldElement
      implements CommutativeGroup as { op: add },
      FieldElement - zero implements CommutativeGroup as { op: mul };
    
    zero: FieldElement;
    one: FieldElement;
  }
```
instead of "asdf ${val}", use "asdf \(val)"?
