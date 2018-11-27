TODO ChalkDoc, Literal

## Module
?Comment moduleDoc
`[]Import` imports
`[]Declaration` declarations

## Comment
ChalkDoc comment

## Import
Identifier|ObjectDest import
Expr From

## Declaration == ClassTemplate|TraitTemplate|Function|Variable|Destructuring

## Expr == Literal|Identifier|Operator|Declaration|CodeBlock|Switch|ForLoop|Break|Continue|FunctionCall|Return

## Identifier
String name - `?_(a-z|A-Z)[](a-z|A-Z|0-9)` except keywords

## Destructuring == ObjectDest|ArrayDest|TupleDest

## ObjectDest
`[](?Type, Identifier, ?Identifier)` rhs
Expr lhs;

## ArrayDest
?Type type
`[](?Type, Identifier)` rhs
Expr lhs

## TupleDest
`[](Type, Identifier)` rhs
Expr lhs

## Type
AtomicType|TypeUnion|TypeIntersection|MemberAccess type

## AtomicType
Identifier name
`[]Expr` params

## TypeUnion
`[]Expr` types

## TypeIntersection
`[]Expr` types

## ClassTemplate
?Comment doc
?Identifier name
`[](Type, ?(Identifier, ?Expr))` params
`[]Declaration` contents

## TraitTemplate
?Comment doc
?Identifier name
`[](Type, ?(Identifier, ?Expr))` params
`[]ClassTemplate|TraitTemplate|Function` contents

## Function
?Comment doc
?Type returnType
?Identifier name
`[](Type, ?(Identifier, ?Expr))` params
`[](Identifier, ?[]Expr)` memberInit
`[]Expr` body

END
## Variable
?Comment doc
Type type
Identifier name
?Expression init

## Literal|Identifier|Operator|Declaration|CodeBlock|Switch|ForLoop|Break|Continue|FunctionCall|Return|MemberAccess