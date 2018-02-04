```
JS      https://developer.mozilla.org/bm/docs/Web/JavaScript
Zig     https://github.com/zig-lang/zig
Python  https://www.python.org/
C++     https://cppreference.com
D       https://dlang.org/
Rust    https://www.rust-lang.org
Go      https://golang.org/
```

TODO
Optional.isNull();
error on `?~Type`
Object.shrink() - shrinks all members, eg. unused memory in dynamic arrays
compiler - make it error to compare value with null, because it is always false
import "x" using allocator?
[]String x(reservedSpace);
String,Buffer,Array:Viewable|Viewer; Viewer.view();
assert array length >= 0
arrays with arbitrary length
enum with just one variable generates a warning
enforce class contents order: enum values, variables, methods, nested classes
block returns last statement, function must return explicitly
import() function that dynamically loads code, not part of global namespace
do not have different types of arrays - I'm looking at std::vector
Function pointer is simply a pointer to Function class, no special treatment from compiler
no out-of-class function definitions
it is an error if class members and class member initialization order is different
functions are hoisted
promises
generate warning if unsafe code is safe
program is safe if every `unsafe` code is provably safe
string implements Buffer
main returns noreturn
array.size, not array length
class Defer - runs functions when destructed
json support
settings that limit what compiler can do at compile time (can it write to files?
  can it access the internet?)
default, aggresively enforced code style
html library for gui, chalk to webasm
division accepts maybe numbers and returns maybe number, can return a number if
  denominator is provably not null
warn on TODO comments
reflection of modules
continue is not allowed in type switch
optimizations - range for should be compiled to iterator, foreach in tree should be converted from
  recursive to loop and inlined
warning or error if multiple declarations in the same expression?
Add compiler warning "useless trait type". Plenty of Java devs will do `Set x = HashSet()`
Ptr, UniquePtr, SharedPtr, (MarkSweepPtr?)
functions must explicitly return, other blocks of code return the last expression
class Class - used in reflection, const and not copyable
online repl that can also handle directory uploads of whole projects
repl requires three newlines to eval
`return { code block; }` is error?
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
debugger
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
hot deployment of code, lazy loading?
unsafe `Pointer.to<Type>(Int address)`, `Pointer.add<T>(Ptr<T>, Int i)`
no semicolon after function / class declaration
function can specify assumptions about its inputs, if those assumptions are not
  met, any resulting potential undefined behaviour must be proven safe at the
  calling site
varargs? both runtime and generic
correct order of evaluation of module-wide and member variables that depend on each other
  cycles are error
names cannot contain underscore; use `camelCase`
utf8 by default (or only)
replace constructor call with constructed object if there are no side effects and
  its binary representation is known
do not allow copy elision where it's not guaranteed if constructor has side effects
only identifiers exported from `index.chalk` (or `main.chalk`) are guaranteed to
  be preserved by compilation
If every function self-invocation is the last executed expression, that function
  will be converted to a loop
a way to unresolve a promise if it is still just waiting in event loop?
cancellable promises, can stop async functions, threads
enforce order of keywords - pub static
first-classish types?
what about gpu programming?
generate hidden classes that are return type of generator functions that use `yield`
variables - replace trait type with class type if known at compile time
function bind operator?
for-else?
ufcs?
documentation: allow notes that popup on underlined pieces of text, only use this
  when someone who would not gain any info from reading it knows he doesn't have
  to read it (this pretty much restricts its use for definitions)
inline assembly?
array of number should be a number
append operator `~`?
`Object...` for variadic parameters, `T...` for variadic templates, `T[n]` and
  `T.length` supported
code coverage analyzer as part of compiler
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
explicit type parameter cannot be called Self
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
unify properties, getters+setters and functions? optional (or prohobited?)
  parentheses in function call without arguments?



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


chalk run main.cpp # runs interpreter
chalk run .
chalk eval "noreturn main() { /* ... */ }"
chalk eval "2 + 3"
chalk repl
chalk translate file.js out.elf --noStyleFormat
chalk install regerex npm/react-router
chalk publish . patch/minor/major
chalk debug out.elf
chalk fix file.chalk # first formats code? and interactively offers automatic fixes to errors
chalk help
chalk help ERRCODE # prints detailed help for error ERRCODE


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

class T {}  - definition
T           - generic declaration
T : T1 T2   - generic declaration
T         a - polymorphic type
T : T1 T2 a - polymorphic type

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

class X {
  const Bool b;
  
  /* ... */
}

class X<Bool b> = bake<Bool>(X); // Would be insanely cool if `bake` didn't need compiler magic
```









