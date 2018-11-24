# Chalk programming language
This is the specification of the Chalk programming language.

> Notes like this one are not part of the spec.

## Type system

### Types
#### Classes
##### Enums
#### Traits
#### Composite types
##### Type unions
##### Type intersections
##### Tuples
##### Functions
#### Pointers

### Type modifiers

### Common type

### The 'is' relation

## Modules
### TODO this header name
#### Source code representation
#### Chalkdoc
#### Expressions

### Comments

### Imports
#### Default import

### Declarations
##### Identifiers (and scope?)
###### Keywords
###### The blank identifier
##### Exports
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
##### Anonymous class literals
##### Trait literals
##### Function literals

### Operators
#### Member access operator
##### Methods
#### The 'is' operator

### Code blocks/Expressions (and control flow?) (and scope?)
#### Smart typing (TODO why is it here?)
#### Conditionals
#### For loops
#### Switch expressions
#### Function calls
#### Operators
#### Terminating statements (return, break, continue, anything that returns None)

### Functions
#### Methods (TODO should this be part of Modules/Declarations/Classes?)
#### Generator functions
#### Async functions
#### Lambdas

## Generics

## Reflection (TODO should this be its own chapter? Or just part of Standard library)

## Semantics (program initialization and execution)
### Program initialization
#### Order of evaluation
### Interface (set of values accessible using member access moderator)
### Compile-time code execution
### Safe code
#### Unsafe keyword

### Concurency (+ semantics?)
##### Async functions
##### Threads
##### Goroutines?

## Scopes


## Standard library
### Default import
### Well-known types
