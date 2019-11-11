{{{
  import AST from "./ast.chalk";
}}}

# Chalk programming language
This is the specification of the [[[Chalk]]] programming language.

> Notes like this one are here to make the specification clearer, provide examples
> or for other informative purposes. However, they are are not part of the
> specification.

> Links to websites of other programming languages.
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
> 
> That means it contains TODO notes, like this one. When the specification is
> finished, the TODO notes must all be removed.
> 
> Your feedback is welcome. For simple typos (or formatting issues) I'll appreciate
> a pull request.

This specification is a ChalkDoc document. You can view the source [here](TODO).

> TODO This specification isn't YET a ChalkDoc document, but it will be.
> For now, Markdown is a good approximation.

> TODO Link to the source.

{{{document.tableOfContents}}}

> TODO Maybe ToC should be inserted automatically

## Values
A *[[[value]]]* is either a type, a kind, an object, or a type template.

> Informally, a value is anything that can be inside a variable.

> TODO Should kinds be types?

Every value is an [[[instance]]] of a type and has an interface. A value
has a [[[target address]]] when it is an instance of a pointer type.

> TODO make a nice picture of types

{{{
  final trait Value {
    Type instanceof;
    Interface interface;
    ?Address target;
    
    All: target == null <-> this is Ptr<?>;
  }
}}}

### Types
A *[[[type]]]* is either a base type, a derived type or type template type. Every
type is an instance of a primitive type.

{{{
  final trait Type {
    
  }
}}}

#### Base types
A *[[[base type]]]* is either a primitive type, a class type, or a trait
type.

##### Primitive types
A [[[primitive type]]] is one of the four (distinct) types *[[[the type class|
class]]]*, *[[[the type trait|trait]]]*, *[[[the type type|type]]]* and *[[[the
type any|any]]]*. They are instances of the type `any`.

##### Class types
A *[[[class type]]* (or *class*) is an instance of the type `class`.

A class type can [[extends|extend]] one or more trait types. Every class
type extends the type `Any`.

###### Modules
A *[[[module]]]* is a class type that subtypes the trait `Module`.

##### Trait types
A *[[[trait type]]]* (or *trait*) is an instance of the type `trait`.

A trait type can extend zero or more trait types. Every trait type
extends the trait `Any`.

#### Derived types
A *[[[derived type]]]* is a type that is not a base type or a type template
type. Derived types are derived from one or more base types or type templates.

Every derived type can be created by a finite series of compositions of
[[[type constructor]]]s, namely the union type constructor, the intersection
type constructor, the function type constructor, the pointer type constructor
and the template instantiation constructor.

> However, not all applications of these type constructors result in a
> derived type. An example is the [[union type|union]] of a base type
> with itself.

Applications of function type constructor and pointer type constructor
with distinct arguments result in distinct types.

Every type that is a base type, a function type or a pointer type
is either a base type, a function type or a pointer type.

Derived types are instances of the type `type`.

> TODO What about first class member variables?
> 
> ```
> class C { Int a, b }
>
> C::Int i = C::a;
> 
> C()::i // equals C().a
> ```

##### Union type constructor
If `A` and `B` are types, the *[[[union type]]]* of `A` and `B`, denoted by
`A|B`, is a type.

##### Intersection type constructor
If `A` and `B` are types, the *[[[intersection type]]]* of `A` and `B`,
denoted by `A&B`, is a type.

##### Function type constructor
If `R` and `P0`, ..., `Pn` for a natural `n` are types, the function type
created from these types, denoted by `R(P0, ..., Pn-1)`, is a type.

> Zero is a natural number. `R()` is a type.

`R` is said to be the [[[return type]]] of instances of `R(...)`.

> The return type can be a function type. For example, `Int(Int)(Int)` is
> the type of functions that accept a single `Int` parameter and
> return functions that accept a single `Int` parameter and return an `Int`.

##### Pointer type constructor
If `A` is a type, the *[[[pointer type]]]* to `A` is a type.

A pointer type to a function type `A(...)` is denoted by `A*(...)`,
a pointer type to other types is denoted by `*A`.

##### Template instantiation constructor
> TODO Template instantiation constructor

#### Type template types (TODO a better name, perhaps?)
A [[[type template type]]] is a type whose instances are type templates.

If `T` is the type [[the type class|class]], [[the type trait|trait]] or [[the type
type|type]], and `T0` to `Tn` is a list of n types, `T<T0, ..., Tn>`
is a type template type.

Every type template type is an instance of the type `any`.

#### Type modifiers (Alternative name: Type qualifiers/Qualified types)
`const`/`mut`/both, `immut`, `export`, maybe `libexport`.

> TODO What is `const ?mut Type`? More generally, what is `const A|mut B`?

> TODO Type with or without a type modifier is a qualified type. (?)

#### The *subtypes* relation
The *[[[subtypes relation|subtypes|subtypes]]]* relation is a binary relation
between types. It is the smallest relation such that:

0. It is a partial order, that is, for all types `A`, `B`, `C`:
   0. `A` subtypes `A` ('subtypes' is reflexive)
   1. `A` subtypes `B` and `B` subtypes `A` implies `A` equals `B` ('subtypes' is anti-symmetric)
   2. `A` subtypes `B` and `B` subtypes `C` implies `A` subtypes `C` ('subtypes' is transitive)

1. For all types `A`, `B`, `C`, `D`:
   0. `A` equals a primitive type implies `A` subtypes [[the type type|`any`]]
   1. `A` extends `B` implies `A` subtypes `B`
   2. `A` subtypes `B` implies `*A` subtypes `*B` // TODO This might be wrong, see AssignProblem
   3. `A|B` subtypes `B|A` subtypes `A|B`
   4. `A&B` subtypes `B&A` subtypes `A&B`
   5. `A` subtypes `A|B`// TODO This might be wrong, see AssignProblem
   6. `A&B` subtypes `A`
   7. `A` subtypes `C` and `B` subtypes `C` implies `A|B` subtypes `C`
   8. `A` subtypes `B|D` and `A` subtypes `C|D` implies `A` subtypes `(B&C)|D`
   9. `D(..., []A)` subtypes `D(...)`
   10. `D(..., []A)` subtypes `D(..., A, []A)`
   11. `A` subtypes `B` or `B` subtypes `Null|None` implies `A(...)` is `B(...)`
   12. `B` subtypes `A` or `B` subtypes `Null|None` implies `D(..., A, ...)` is `D(..., B, ...)`
   13. `A(...)` subtypes `A(..., B)`
   14. [[`None`]] subtypes `A`
   15. `A` is a class type and `A` does not subtype `B` implies `A&B` is [[`None`]]
   16. TODO, see TL;DR section

> TL;DR for 1.:
> 0-2: read that
> 3-8: [[union type|union]] and [[intersection type|intersection]] types behave
>   as you would probably expect
> 9-12: if any call to function of type `A` is type correct as a call
>   to function of type `B`, `A` subtypes `B`
> 13-14: read that
> 15-TODO: if the type `A&B` cannot possibly have any instances, it is `None`

> TODO Are these rules reasonable? Are they complete and minimal?

> TODO These rules do not prohibit certain types that should be distinct from
> actually being distinct. That is yet to be specified.

> TODO AssignProblem: How to prevent `A` from being assignable to `*(A|B)`?

> TODO This must be a valid piece of code.
> 
> ```
> class B {}
> 
> trait T {
>   Null foo();
> }
> 
> class A : T {
>   B foo() => B()
> }
> 
> // A.foo implements T.foo, even though their return types are different
> ```

> TODO Should explicitly extending the trait `Module` be prohibited?
> If not, should it be possible to import modules that are explicitly classes?

### Type templates
A [[[type template]]] is a function from one or more values to a type.

A type template can be a [[[class template]]] or a [[[trait template]]],
depending on whether it returns a class type or a trait type, respectively.

All types produced by distinct type templates are distinct. Distinct
arguments to a type template produce distinct types.

> TODO According to this, in
> 
> ```
> Int a, b;
> 
> *class<Int> A = C<a>;
> *class<Int> B = C<b>;
> ```
> 
> `A` and `B` are distinct types. That's wrong. Should parameters be restricted
> to enums, Ints, (floats, strings) and types?

A [[class template|class]] ([[trait template|trait]]) template with parameters
`P0` to `Pn` is an instance of `class<P0, ..., Pn-1>` (`trait<P0, ..., Pn-1>`).

### Type conversions
Instances of certain types can be converted to instances of different
types, according to rules specified in this section.

> TODO Maybe this section should be somewhere under Semantics, not here.

> Type conversions do not modify values, they produce new values instead.
> 
> TODO Maybe this note should be somewhere else, and be more general, because
> values are never modified, right? Just replaced by newer 'versions'.

#### Pointer enreference
An instance of type `T` with address `adr` can convert to an instance
of type `*T` with target address `adr`.

#### Pointer dereference
An instance of type `*T` with target address `adr` can convert to
an instance of type `T` TODO.

> TODO Should I specify that only the shortest possible conversions happen,
> or should I embrace the chaos of nondeterminism knowing that spurious type
> conversions won't have any observable effect?

> TODO It also needs to be specified precisely to what values values can convert,
> otherwise the nondeterminism would become a bit annoying.

#### Integer widening
Instances of type `Int8` can convert to instances of type `Int16`, `Int16` to
`Int32` and `Int32` to `Int64`.

> TODO specify that `x` can only convert to `x`, not eg. `x + 1`.

#### Integer narrowing
Instances of type `Int64` can convert to instances of type `?Int32`, `Int32` to
`?Int16` and `Int16` to `?Int8`.

> TODO specify that `x` can only convert to `x`, or `null` `x` is too big, not
> eg. `x + 1`.

#### Null conversions
If a type `T` subtypes [[`Nullable`]], `T.null` and [[`null`]] can convert between
each other.

#### Array type loosening (TODO better name, maybe?)
An array whose type is `[]None` can convert to an empty array of any
type.

### Objects
An *[[[object]]]* is a value that is not a type template and is an
instance of a type that is not a primitive type.

### Interface
An [[[interface]]] of a value `v` is a function from a set of names to
a set of values, denoted `v.arg` for an argument `arg`.

> TODO to set of triples (modifiers, type, value)?

Values that belong to an interface of `v` are called [[[member values]]]
of `v` or [[[members]]] of `v`.

For every value `v`, `v.type` equals the type `v` is an instance of.

> TODO member variables, member types, member functions (methods)
> Ideally, these terms doen't need to be defined, because they will coincide with
> variables, types, functions, ... etc. That are also member values.

#### Interface of primitive types
Domain of the interfaces of primitive types contains exactly the names
`type` and `name`.

For the types [[the type class|class]], [[the type trait|trait]], [[the type
type|type]] and [[the type any|any]], `x.name` equals the [[`String`]] `"class"`,
`"trait"`, `"type"` and `"any"`, respectively.

#### Interface of class and trait types
If the types `A` extends `B`, for every name `n` in the domain of `B`

A trait type cannot have a member function named `new`.

> Can it have a member function variable `new`?

If a type `A` [[[extends]]] `B`, ...

> TODO inheritance

#### Interface of union and intersection types
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

#### Interface of function types

#### Interface of pointer types
The interface of pointer types is empty.

#### Interface of type templates
The interface of a type produced by a type template `T` is TODO.

The interface of a type template is TODO.

#### Interface of type template types

### Functions
A [[[function]]] is a set of function overloads.

A [[[function overload]]] is an expression with a scope/context? and a list of parameters.

Functions that don't return [[`None`]] or [[`Null`]] must return with a return expression.

> TODO Every possible code path must end with a return expression unless it is
> provably never visited.

> Should function values be mutable?

#### Generator functions
#### Async functions

#### Expressions
An [[[expression]]] is either an operator, a variable, a code block,
a function call, or [[[void expression]]].

> TODO Why did I include void expressions? Aren't empty code blocks good enough?

##### Expression modifiers (or Qualified expressions?)
`shared`, `const`?, `immut`?, `return`?, `await`, `yield`?

#### Scope
A [[[scope]]] is a set of expressions with a set of names.

> TODO Really?

A scope has a parent scope when it is not a module scope.

Module scope
> TODO Should modules be scopes?

#### Parameters
> TODO Default arguments. Types and declarations cannot have them, just functions
> themselves.

> TODO should this section exist? Or should default parameters just define multiple
> functions?

> A function is [[[pure]]] when it has no side effects, and its return value
> depends only on its arguments and immutable [[local variable|nonlocal]]
> variables.

## Syntax
This section specifies how Chalk programs are represented in text form.

A [[[program definition]]] is a set of module definitions.

> TODO a program is a set of module definitions with all variables resolved?

A program is [[[well-formatted]]] when it matches exactly the grammar of the
language. TODO

> Convention about the grammar: all nonterminals start and end with a non-whitespace
> character, except for the starting one.

### Module definitions
A [[[module definition]]] is a valid UTF-8 string without byte order mark that
is accepted by the Chalk grammar.

> TODO or maybe grammars of other languages.

> This specification doesn't dictate how module definitions are stored. They can
> be files, database entries, contents of HTML tags, or anything else, as long
> as they are a piece of text. How software tools choose what to consider a Chalk
> source code is up to them.
>
> It is recommended to use the `.chalk` and `.chalkdoc` file extensions for files
> that contain exactly a Chalk module defition and ChalkDoc module definition,
> respectively.

Every module definition has a corresponding path that is unique for that
module definition.

A [[[path]]] is an instance of [[`String`]].

> It is recommended that path corresponds to file path relative to program root
> folder in case module definitions are stored as files in a file system.

> TODO, path, path resolution, normalization, etc.

Paths that start with `stlib` are reserved for modules of the standard
library.

#### Chalk modules
Starts with an optional comment, then continues with definitions.

> Every module should start with a comment that provides useful information about
> the module. This information might be automatically extracted from the source
> code by documentation generators.

All definitionss directly in a module definition must be immutable.
They are visible everywhere in the [[module definition|module]].

##### Syntax
{{{```
export []Expr chalkModule =
    [ Maybe([ StartSpace(), Match(Comment, "moduleDoc"), Space("\n\n") ])
    , Repeat(
        [ StartSpace(), Match(Import, "imports") ],
        [ Space("\n"), Maybe(Space("\n")) ],
      ),
    , Space("\n\n"),
    , Repeat(
        [ StartSpace()
        , OneOf(
            [ [ Match(ClassDefinition, "definitions") ]
            , [ Match(TraitDefinition, "definitions") ]
            , [ Match(FunctionDefinition, "definitions") ]
            , [ Match(VariableDefinition, "definitions")
              , Space("")
              , Text(";")
              ]
            , [ Match(ObjectDestructuring, "definitions",
                  { typed: Destructuring.Typed.never }
                )
              , Space("")
              , Text(";")
              ]
            ]
          )
        , Space("\n")
        ],
        [ StartSpace(), Space("\n") ],
      )
    ];
}}}```

#### ChalkDoc modules
A [[[ChalkDoc module definition]]] is TODO

##### Syntax
{{{```
export []Expr chalkDocModule = []; // TODO
}}}```

#### TODO What about JavaScript, Haskell, C, and HTML/XML modules? Yes, I'm crazy!
And yes, they should be able to import and export between each other, call each
others' functions, etc.

> Maybe, if one day I really add this, This section should be renamed to "Other
> module types", with links to separate documents about these languages.

### Comments
Comments have two forms. They can either start with `//` and end with the end
of the line, or they can start and end with `///`.

Contents of comments are formatted in ChalkDoc.

> TODO should comments be able to contain code?
>
> ```
> ///
> Tau equals 2 \* Pi, or { 2 * Pi }.
> ///
> const Float Tau = 2 * Pi;
> ```
>
> If yes, should the code be able to contain `///`?

> Unlike in many other languages, comments cannot appear anywhere inside
> the source code. For example, they cannot be inside a variable definition.
>
> This is fine: `Int a = 0; // A comment`
> 
> This isn't: `Int /// Illegal comment /// a = 0;`

#### Syntax
{{{```
export []Expr comment =
    [ Text("//")
    , OneOf(
        [ [ Ahead([ Not("/") ])
          , Space(" ")
          , Match(ChalkDoc, "comment", { multiline: false })
          ]
        , [ Text("/")
          , Space("\n")
          , Match(ChalkDoc, "comment", { multiline: true })
          , StartSpace()
          , Text("///")
          ]
        ],
      )
    ];
}}}```

### Imports
[[[Imports]]] make exported TODO variables/identifiers? from other modules visible in
their module definition.

#### Syntax
{{{```
export []Expr import =
    [ Text("import")
    , Space(" ")
    , OneOf(
        [ [ Match(Identifier, "imports") ]
        , [ Match(ObjectDestructuring, "imports",
              { type: Destructuring.Typed.never }
            )
          ]
        ]
      )
    , Space(" ")
    , Text("from")
    , Space(" ")
    , Match(Expression, "path", { type: "stlib/global.chalk/String" })
    , Space("")
    , Text(";")
    ];
}}}```

#### Default import
Unless a [[module definition|module]] explicitly imports the file `stlib/global.chalk`,
the first import of that [[module definition|module]] will implicitly be
import of all (TODO variables/identifiers?) from that file.

> TODO should this section be here?

### Definitions

There are 5 types of definitions: [[class template defition|Class]] and trait
template definitions, function definitions, variable definitions and
destructuring.

[[class template definition|Class]] and trait template definitions in all scopes and variable definitions in
[[module scope|module]], [[class scope|class]] or trait scope are visible
even before they are defined. Variable definitions in function scope are
only visible after they are defined.

> TODO documentation comments

> Documentation comments should provide useful information about the definitions.
> They might be automatically extracted from the source code by documentation
> generators.

#### Syntax
{{{```
export []Expr definition =
    [ Or(
        [ Match(ClassTemplateDefinition, "definition") ]
        [ Match(TraitTemplateDefinition, "definition") ]
        [ Match(FunctionDefinition, "definition") ]
        [ Match(VariableDefinition, "definition") ]
        [ Match(Destructuring, "definition") ]
      ),
    ];
}}}```

#### Identifiers (and scope?)
An [[[identifier]]] is a UTF-8 string that matches `(a-z|A-Z)*(a-z|A-Z|0-9)` and is
not a keyword.

> TODO Regex grammar might change, but it should be readable to anyone who knows
> regexes. Note like with types, modifiers (like the Kleene star) are on the left.

An identifier represents a name. Distinct identifiers represent distinct names.

> TODO unless they are renamed in imports.

Type identifiers must start with an uppercase, other lowercase.

##### Syntax
{{{```
export enum IdentifierType { upperCase, lowerCase, both }

String abcLo = "abcdefghijklmnopqrstuvwxyz";
String abcUp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
String abcBoth = abcLo ++ abcUo;
String abcNum = abcBoth ++ "0123456789";

export []Expr identifierLowerCase =
    [ And(
        [ Not(Or(keywords.map(a => [ Text(a) ]))) ],
        [ Or(abcLo), Repeat(Or(abcNum)) ]
      )
    ];

export []Expr identifierUpperCase =
    [ And(
        [ Not(Or(keywords.map(a => [ Text(a) ]))) ],
        [ Or(abcUp), Repeat(Or(abcNum)) ]
      )
    ];

export []Expr identifierBoth =
    [ And(
        [ Not(Or(keywords.map(a => [ Text(a) ]))) ],
        [ Or(abcBoth), Repeat(Or(abcNum)) ]
      )
    ];
}}}```

##### Keywords
A [[[keyword]]] is a UTF-8 string that cannot be an identifier.

> ```
>   [ "All", "any", "auto", "assume", "await", "break", "case", "catch", "class"
>   , "comptime", "const", "continue", "default", "enum", "Exists", "export"
>   , "final", "for", "friend", "function", "get", "immut", "import", "is", "mut"
>   , "own", "pub", "return", "set", "shared", "static", "switch", "throw", "trait"
>   , "try", "type", "yield"
>   ];
> ```

{{{
  // Or should the last expression be returned? Or something else? Just an idea.
  document.write("List of keywords: " + AST.keywords.map(a => "`" + a + "`").join(", "));
}}}

> TODO Should "any", "class", "trait" and "type" be keywords?
> If not, should it be possible to define classes if someone overwrites the "class"
> identifier?

> TODO After the language is finished, remove all unused keywords.

> It is advisable for text editors and IDEs to display keywords using a differenct
> col
> 
> Other parts of code that ought to be colored are:
> 0. The word "from" from import/export declarations.

#### Exports
> TODO Keyword libexport? A way to distinguish internal and external exports
> in a library

#### Class template definitions
> Should `this = null`; be supported? Eg. for numeric overflow

##### Enums

#### Trait template definitions
#### Function definitions
##### Lambda functions
#### Variable definitions

### Expressions
An [[[expression]]] is TODO.

An expression is called a [[[terminating expression]]] when its return type is [[`None`]].

### Literals
Literals create new value each time they are evaluated.

> TODO am I sure about this?

#### Numbers (TODO divide between integer and floating point?)
#### Strings
#### Arrays
#### Tuples
#### Objects
#### Sets

### Operators
| Example     | Sugar for          | Trait
| -------     | ---------          | -----
| `a += b`    | `a.add(b)`         | Number
| `a -= b`    | `a.sub(b)`         | Number
| `a *= b`    | `a.mul(b)`         | Number
| `a /= b`    | `a.div(b)`         | Number
| `a %= b`    | `a.mod(b)`         | Number
| `a **= b`   | `a.pow(b)`         | Number // Or `a ^= b`
| `a + b`     | `Number.add(a, b)` | Number
| `a - b`     | `Number.sub(a, b)` | Number
| `a * b`     | `Number.mul(a, b)` | Number
| `a / b`     | `Number.div(a, b)` | Number
| `a % b`     | `Number.mod(a, b)` | Number
| `a ** b`    | `Number.pow(a, b)` | Number // Or `a ^ b`
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
| `a ?: b`    | `Null.getValue(a, b)`     | (no restriction)
| `a ++ b`    | ??                        | // String | Array | Tuple | (Collection?) concatenation operator

Maybe, but probably not:
| `a +% b`    | ??                     | (must be `Int`)
| `a -% b`    | ??                     | (must be `Int`)
| `a *% b`    | ??                     | (must be `Int`) // Wrapping operators

Maybe, and maybe not syntactic sugar:
| `a ||= b`   | ??                     |
| `a &&= b`   | ??                     |

Operators that are not syntactic sugar:

| Example     | Operator      | Return type
| -------     | --------      | -----------
| `a.b`       | Member access | Type of `b`
| `a?.b`      | Member access | Type of `b` or `Null`
| `a && b`    | Logical and   | `Bool` if `b` is `Bool`, else `Null`. // Why not type of `b` or `null`?
| `a \|\| b`  | Logical or    | `Bool` if `b` is `Bool`, else `Null`. // Why not type of `b` or `null`?
| `a ? b : c` | Conditional   | Union of types of `b` and `c`
| `a is T`    | Is operator   | `Bool`

The first operand of conditional, logical and and logical or operators
must be `Bool`.

> TODO the `is` operator.

#### Member access operator
#### The 'is' operator
The expression `a is B` returns `true` when `a.type` subtypes `B`.

> Informally, `a is B` is `true` if it would make sense to assign the value
> `a` to a variable of type `B`.

#### Assignment
> `=` assigns value, `:=` assigns pointer, `::=` assigns pointer to pointer, etc.

#### Precedence
> TODO Not sure if this should be defined or result from the grammar.

> TODO How should this be parsed?
>
> ```
> x && a = b + c = d * e;
> 
> x && (a = (b + (c = (d * e))));
> ```

unary: `.`, `?.`, `[]`, `!`

assignRight: =, +=, -=, \*=, /=, %=, \*\*=, ||=, &&=

await: `await`

pow: **

mul: \*, \*%, /

add: +, -, +%, -%

mod: %

concat: ++

compare: <=>

relation: <, >, <=, >=, is

equal: ==, !=

and: &&

or: ||

qmark: ?: or ??, ? : // incomparable

assignLeft: =, +=, -=, \*=, /=, %=, \*\*=

word: const, immut, yield, yield*/yieldAll, return, break

TODO comptime?



### Code blocks/Expressions (and control flow?) (and scope?)
[[[Code block]]] returns the last expression.

#### Smart typing (TODO why is it here?)
#### Conditionals
#### For loops
##### Break expressions
##### Continue expressions
#### Switch expressions
#### Function calls
#### Operators
#### The return expression (TODO maybe this should be under Functions)

## Reflection
> TODO This should not be its own chapter. Reflection is partly stl, partly
> compiler magic to comply stl's spec.

## Semantics (program initialization and execution) (should this be its own chapter?)
### Program initialization (This looks like it could be its own chapter)
#### Order of evaluation (of definitions)
> What about limited support to recursively defined variables, like this:
> ```
> X a = X(b);
> X b = X(a);
> ```

### Compile-time code execution
### Safe code
> Safe code is deterministic, and corresponds to subset of Chalk that should be
> TODO (something like: generally used - ie. don't use unsafe code unless you have
> a really good reason).

Program is safe if every `unsafe` code is provably safe.

#### Unsafe keyword
### Concurency (+ semantics?)
#### Async functions
#### Threads
#### Goroutines?

## Scopes

## Bytecode

## Standard library
### Default import
### Well-known types
#### None, Null and Bool
The types `None`, `Null` and `Bool` must be defined in `stlib/global.chalk` as
follows:

```
export enum None {}
export enum Null { null }
export enum Bool { false, true } // What about tt/ff? Or something wit the same character length tru/fls, yea/nay true/nope
```

#### Array
[[[Array]]]s have arbitrary, dynamic length.
#### Tuple

#### Regex
#### Ints
#### Float
#### Complex // TODO a better name?
#### Quaternion // TODO a better name?
> What about strict vs optimized Float math? Floating Point Operations (Zig)
> Maybe functions (or blocks of code, entire module, or entire program)
> could be specified to use strict if needed, else something like ffastmath
> would be used
#### The import function

## Definitions
{{Definitions}}
