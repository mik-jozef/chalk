## Module
?Comment moduleDoc
`[]Import` imports
`[]Definition` definitions

## Comment
ChalkDoc comment

## Import
Identifier|ObjectDest import
Expr From

## Definition = ClassTemplate|TraitTemplate|Function|Variable|Destructuring

## Expr = Literal|lIdentifier|Type|Operator|Definition|CodeBlock|Switch|ForLoop|Break|Continue|FunctionCall|Return

## Identifier
`?_(a-z|A-Z)*(a-z|A-Z|0-9) except keywords` name

## Destructuring = ObjectDest|ArrayDest|TupleDest

## ObjectDest
`[](?Type, Identifier, ?(Identifier|Destructuring))` rhs
Expr lhs;

## ArrayDest
?Type type
`[]?(?Type, ?(Identifier|Destructuring))` rhs
Expr lhs

## TupleDest
`[](Type, ?(Identifier|Destructuring))` rhs
Expr lhs

## Type
AtomicType|UnionType|IntersectionType|TypeMemberAccess type

## TypeMemberAccess
Type
Identifier
// note see parser.mjs in simple interpreter

## AtomicType
Identifier name
`[]Expr` params

## UnionType
`[]Expr` types

## IntersectionType
`[]Expr` types

## ClassTemplate
?Comment doc
?Identifier name
`[](Type, ?(Identifier, ?Expr))` params
`[]Definition` contents

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

## Variable
?Comment doc
Type type
?Identifier name
?Expr init

## Literal = Number|String|Array|Tuple|Object|Set

## Number
`?(0b|0o|0x)(1-9)*(0-9)?(.+0-9)?(e?-(1-9)*(0-9))` number

## String
`"*[^"]"` string

## Array
`[]Expr` elements

## Tuple
`[]Expr` elements

## Object
`[](Identifier, Expr)` entries/keyValPairs/elements/?

## Set
`[]Expr` elements

## Operator
TODO Operator, including MemberAccess

## CodeBlock
`[](Expr|Comment)` contents

## Switch
?Expr cond
`[](Expr, Expr|CodeBlock)` cases

## ForLoop
?Identifier name
`?(Expr, ?(Expr, ?Expr))` head
CodeBlock body

## Break
?Identifier name
?Expr expr

## Continue
?Identifier name
?Expr expr

## FunctionCall
Expr function
`[]Expr` params
?Expr spread (?)

## Return
?Expr value

## Await
?Expr value

## ChalkDoc
TODO ChalkDoc


```
  Module = ImportList ExprList
  ImportList = _ | Import ImportList
  Import = import Value from String ; | import String as Value ;
  ExprList = _ | Expr | Expr ; ExprList
  Expr = 
  Value = Identifier | Array | Tuple | Object | Set
  Array = [ ExprCommaList ]
  Tuple = ( ExprCommaList )
  Set = { ExprCommaList }
  ExprCommaList = _ | Expr | Expr , ExprCommaList
  Object = { ObjectPropList }
  ObjectPropList = Identifier : Expr MComma | Identifier : Expr , ObjectPropList
  MComma = _ | ,
  Identifier = LIdentifier | UIdentifier
  LIdentifier = [az][azAZ09]*
  UIdentifier = [AZ][azAZ09]*
  String = " StringT* ([^\\"$] | \" | \n)* " | ' ([^'\\] | \' | \n) '
  StringT = [^"$]* ($ Identifier | $ { Expr })
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
```
