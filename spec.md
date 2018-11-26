# Chalk programming language
This is the specification of the Chalk programming language.

> Notes like this one are added to make the specification clearer, provide examples
> or for other informative purposes. However, they are are not part of the
> specification.

> Links to websites of other languages.
> 
> * [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)
> * [Zig](https://github.com/zig-lang/zig)
> * [Python](https://www.python.org/)
> * [C++](https://cppreference.com/)
> * [D](https://dlang.org/)
> * [Rust](https://www.rust-lang.org)
> * [Go](https://golang.org/)
> * [Ada](http://www.adaic.org/)
> * [Haskell](https://www.haskell.org/)

> TODO This spec is a work in progress.
> That means it contains TODO notes, like this one. When the specifications is
> finished, the TODO notes must all be removed.
> 
> Your feedback is welcome. For simple typos (or formatting issues) I'll appreciate
> a pull request.

{{ToC}}

## Type system and TODO the entities that live in chalk-space

### Values
A *value* is either a [[type]], a [[type template]], or an [[object]].

> Informally, a value is anything that can be inside a variable.

Every value has a [[type]] and an [[interface]].

### Types
A *type* is either an [[atomic type]] or a [[composite type]]. Every type is
a [[value]].

#### Atomic types
An *atomic type* is either [[The types class, trait and type|the type `class`]],
[[The types class, trait and type|the type `trait`]], [[The types class, trait
and type|the type `type`]], a [[class]], or a [[trait]].

##### The types class, trait and type
The types *class*, *trait* and *type* are the three types that are defined in
this specification, instead of being declared in the source code. They have the
type `type`.

> TODO can (and should) the type `type` be defined as `class|trait`?

#### Composite types
A *composite type* is a type that is not [[atomic type|atomic]]. Composite types
are composed from one or more atomic types.

Every composite type can be created by a series of compositions of [[type
constructor]]s, namely the [[type union constructor]], the [[type intersection
constructor]] and the [[function type constructor]].

Composite types have [[The types class, trait and type|the type `type`]].

> However, not all applications of these type constructors result in a composite
> type. An example is the union of an atomic type with itself.

> TODO is it bad that if `T` is an atomic type, `*T` or `T()` are composite types?
> Maybe a different name would be more appropriate?

> TODO is `type` a good choice for the type of function types?

##### Type union constructor
If `A` and `B` are types, the *type union* of `A` and `B`, denoted by `A|B`, is
a type.

##### Type intersection constructor
If `A` and `B` are types, the *type intersection* of `A` and `B`, denoted by
`A&B`, is a type.

##### Function type constructor
If `R` and `P0`, ..., `Pn-1` for a natural `n` are types, the function type created
from these types, denoted by `R(P0, P1, ..., Pn-1)`, is a type.

> Zero is a natural number. `R()` is a type, distinct from `R`.

> `R` can be a function type. For example, `Int(Int)(Int)` is the type of functions
> that accept single parameter Int and return functions that accept a single
> parameter Int and return an Int.

#### Pointer types
If `A` is a type, the pointer type to `A`, denoted by `*A`, is a type.

### Type modifiers
> TODO What is `const ?mut Type`? More generally, what is `const A|mut B`?

### The *is* relation
The *is* relation is a binary relation between types. It is a partial order, that
is, for all types `A`, `B`, `C`:

1. `A` is `A` ('is' is reflexive)
2. `A` is `B` and `B` is `A` implies `A` equals `B` ('is' is anti-symmetric)
3. `A` is `B` and `B` is `C` implies `A` is `C` ('is' is transitive)

For all types `T`:
 - `T` is `class` iff `T` equals `class`
 - `T` is `trait` iff `T` equals `trait`
 - `T` is `type` iff `T` equals `class`, `trait` or `type`
 - for all classes `C`, `T` is `C` iff `T` equals `C`

 - `T|T` is `T`
 - `T&T` is `T`
 - 

For all class and trait types `T`, `T` is `A` if `T` extends `A`.

`T()` is `Null()`

> This is a valid piece of code.
> ```
> class B {}
> 
> trait T {
>   Null foo();
> }
> 
> class A : T {
>   B foo() {}
> }
> ```

### Common type
If `A` and `B` are types, the common type `C` of `A` and `B` is the most specific
TODO define 'most specific' type such that `A` is `C` and `B` is `C`.

### Type conversions

### Type templates

## Modules
### TODO this header name
#### Source code representation
#### Chalkdoc
#### Expressions

### Modules
Start with an optional [[comment]], then continue with [[declaration]]s.

### Comments
Single line comments start with `//`. Multiple line comments start and end with
`///`.

> Unlike in many other languages, comments cannot appear anywhere inside
> the source code. For example, they cannot be inside an expression.
>
> This is fine:
> ```
> a = b; // An assignment
> ```
> 
> This isn't:
> ```
> a = foo("a long", // Illegal comment
>     "function call");
> ```

### Imports
#### Default import

### Declarations
[[Type declaration]]s in all [[scope]]s and [[variable declarations]] in
[[module scope|module]], [[class scope|class]] or [[trait scope]] are visible
even before they are defined. [[Variable declaration]]s in [[function scope]] are
only visible after they are defined.

#### Documentation comments
##### Identifiers (and scope?)
Type identifiers must start with an uppercase, other lowercase.

###### Keywords
###### The blank identifier
##### Exports
> libexport? a way to distinguish internal and external exports in a library

#### Classes
##### Enums
#### Traits
#### Functions
#### Variables

### Literals
#### (Simple? Constant?) literals
##### Numbers (TODO divide between integer and floating point?)
##### Strings
#### Composite literals (they create new value each time they are evaluated)
##### Arrays
##### Tuples
##### Objects
#### Type literals (they create only one value)
##### Class literals
> Should `this = null`; be supported? Eg. for numeric overflow
##### Enum literals
##### Anonymous class literals
##### Trait literals
##### Function literals

### Operators
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

TODO string, array, tuple, (or collection) concatenation operator `++`
TODO what about wrapping operators `+%, -%, *%`?

Operators that are not syntactic sugar:

| Example     | Operator      | Return type
| -------     | --------      | -----------
| `a; b`      | Sequential    | Type of `b`
| `a.b`       | Member access | Type of `b`
| `a?.b`      | Member access | Type of `b` or `Null`
| `a && b`    | Logical and   | `Bool` if `b` is `Bool`, else `Null`.
| `a \|\| b`  | Logical or    | `Bool` if `b` is `Bool`, else `Null`.
| `a ? b : c` | Conditional   | Common type of `b` and `c`

The first operand of [[conditional]], [[logical and]] and [[logical or]] operators
must be `Bool`.

#### Member access operator
##### Methods
#### The 'is' operator

### Code blocks/Expressions (and control flow?) (and scope?)
[[Code block]] returns the last [[expression]].

#### Smart typing (TODO why is it here?)
#### Conditionals
#### For loops
##### Break expression
##### Continue expression
#### Switch expressions
#### Function calls
#### Operators
#### Terminating statements (return, break, continue, anything that returns None)

### Functions
Functions that don't return [[None]] or [[Null]] must return with a [[return statement]].

> Should function values be mutable?

#### Methods (TODO should this be part of Modules/Declarations/Classes?)
#### Generator functions
#### Async functions
#### Lambda functions

## Generics

## Reflection (TODO should this be its own chapter? Or just part of Standard library)

## Semantics (program initialization and execution) (should this be its own section?)
### Program initialization
#### Order of evaluation
> What about limited support to recursively defined variables, liek this:
> ```
> X a = X(b);
> X b = X(a);
> ```

### Interface (set of values accessible using member access moderator)
#### Interface of class, trait and type
Contains `type`. (Ie. for all values v, `v.type` is valid.)
#### Interface of union types
> This is a valid peice of code:
> ```
> class C {}
> class D {}
> 
> trait T {
>   Null foo();
> }
> 
> class A : T {
>   C foo() {}
> }
> 
> class B : T {
>   D foo() {}
> }
> 
> Null main() {
>   A|B var = Math.randBool() ? A() : B();
>   
>   C|D ret = var.foo(); // This must compile
> }
> ```


### Compile-time code execution
### Safe code
Safe code is deterministic, and corresponds to subset of Chalk that should be
TODO (something like: generally used - ie. don't use unsafe code unless you have
a really good reason).

Program is safe if every `unsafe` code is provably safe.

#### Unsafe keyword
### Concurency (+ semantics?)
##### Async functions
##### Threads
##### Goroutines?

## Scopes


## Standard library
### Default import
### Well-known types
#### Arrays
[[Array]]s have arbitrary, dynamic length.

### Regex
### Float
> What about strict vs optimized Float math? Floating Point Operations (Zig)
> Maybe functions (or blocks of code, entire module, or entire program)
> could be specified to use strict if needed, else something like ffastmath
> would be used
#### The import() function
