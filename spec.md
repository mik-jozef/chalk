# Chalk programming language
This is the specification of the Chalk programming language.

> Notes like this one are here to make the specification clearer, provide examples
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

This specification is a ChalkDoc document. You can view the source [here](TODO).

> TODO this specification isn't YET a ChalkDoc document, but it will be.
> For now, markdown is a good approximation.

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

Every composite type can be created by a finite series of compositions of [[type
constructor]]s, namely the [[type union constructor]], the [[type intersection
constructor]] and the [[function type constructor]].

> However, not all applications of these type constructors result in a composite
> type. An example is the union of an atomic type with itself.

Composite types have [[The types class, trait and type|the type `type`]].

> TODO is it bad that if `T` is an atomic type, `*T` or `T()` are composite types?
> Maybe a different name would be more appropriate? "Derived types", maybe?
> 
> Also, "atomic type" isn't exactly ideal either, since it means something
> completely different to a C++ programmer. "Base type"?

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
If `A` is a type, the pointer type to `A` is a type.

A pointer to function type `A(...rest)` is denoted by `A*(...rest)`, a pointer to
other types is denoted by `*A`.

### Type modifiers
> TODO What is `const ?mut Type`? More generally, what is `const A|mut B`?

### The *is* relation
The *is* relation is a binary relation between types. It is the smallest relation
such that:

0. It is a partial order, that is, for all types `A`, `B`, `C`:
   0. `A` is `A` ('is' is reflexive)
   1. `A` is `B` and `B` is `A` implies `A` equals `B` ('is' is anti-symmetric)
   2. `A` is `B` and `B` is `C` implies `A` is `C` ('is' is transitive)

1. For all types `A`, `B`, `C`, `D`:
   0. `A` equals `class`, `trait` or `type` implies `A` is `type`
   1. `A` extends `B` implies `A` is `B`
   2. `A` is `B` implies `*A` is `*B`
   3. [[`None`]] is `A`
   4. `A|B` is `B|A` is `A|B`
   5. `A&B` is `B&A` is `A&B`
   6. `A` is `A|B`
   7. `A&B` is `A`
   8. `A` is `C` and `B` is `C` implies `A|B` is `C`
   9. `A` is `B|D` and `A` is `C|D` implies `A` is `(B&C)|D`

> TL;DR 4-7: type unions and intersections behave as you would probably expect.

> TODO do these rules specify what I had in mind? Are they complete and minimal?

### Type conversions
`T(...rest)` to `Null(...rest)`
`T` to `*T`
`*T` to `T`

> TODO type conversions (this section)

> TODO this must be a valid piece of code.
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

### Type templates
> TODO type templates (this section)

## Modules
Modules are TODO.

> TODO What ARE modules? They aren't files, because I don't want this specification
> to dictate how they are stored, they could also be database entries or contents
> of HTML tags and the specification shouldn't care.

### Source code representation
Modules must be encoded as valid UTF-8 without byte order mask.

### Types of modules
#### Chalk modules
Starts with an optional [[comment]], then continue with [[declaration]]s.

Files with `.chalk` extension contain exactly one chalk module.

#### Chalkdoc modules

Files with `.chalkdoc` extension contain exactly one chalkdoc module.

> TODO am I sure about this? `.chalkdoc` files would be similar to markdown,
> with code in `{{}}`.

#### TODO what about JavaScript, Haskell, C, and HTML modules? Yes, I'm crazy!
And yes, they should be able to import and export between each other, call each
others' functions, etc.

> Maybe, if one day I really add this, This section should be renamed to "Other
> modules", with links to separate documents about these languages.

### Expressions
An expression is called a terminating expression if it returns [[`None`]].

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
Unless a module explicitly imports the file `"std/global.chalk"`, the first import
of that module will implicitly be import of all (variables/identifiers?) from
that file.

### Declarations
[[Type declaration]]s in all [[scope]]s and [[variable declarations]] in
[[module scope|module]], [[class scope|class]] or [[trait scope]] are visible
even before they are defined. [[Variable declaration]]s in [[function scope]] are
only visible after they are defined.

#### Documentation comments
##### Identifiers (and scope?)
Type identifiers must start with an uppercase, other lowercase.

###### Keywords
Keyword is a string that cannot be an identifier

```
export []String keywords =
    [ "auto", "assume", "await", "break", "case", "catch", "class", "comptime"
    , "const", "continue", "default", "enum", "export", "final", "for", "friend"
    , "function", "get", "import", "is", "mut", "own", "pub", "return", "set"
    , "shared", "static", "switch", "throw", "trait", "try", "type", "yield"
    ];
```

> TODO display list of keywords

###### The blank identifier
##### Exports
> libexport? a way to distinguish internal and external exports in a library

#### Class templates
##### Enums
#### Trait templates
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

TODO should bitwise and, or, xor and bitshift operators really be part of
     the language?

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
##### Break expressions
##### Continue expressions
#### Switch expressions
#### Function calls
#### Operators
#### The return expression (TODO maybe this should be under Functions)

### Functions
Functions that don't return [[None]] or [[Null]] must return with a [[return statement]].

> Should function values be mutable?

#### Methods (TODO should this be part of Modules/Declarations/Classes?)
#### Generator functions
#### Async functions
#### Lambda functions

## Reflection
> TODO this should not be its own chapter. Reflection is partly stl, partly
> compiler magic to comply stl's spec.

## Semantics (program initialization and execution) (should this be its own chapter?)
### Program initialization (This looks like it could be its own chapter)
#### Order of evaluation (of declarations)
> What about limited support to recursively defined variables, like this:
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
> Safe code is deterministic, and corresponds to subset of Chalk that should be
> TODO (something like: generally used - ie. don't use unsafe code unless you have
> a really good reason).

Program is safe if every `unsafe` code is provably safe.

#### Unsafe keyword
### Concurency (+ semantics?)
##### Async functions
##### Threads
##### Goroutines?

## Scopes

## Bytecode

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
