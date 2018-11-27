TODO some (most?) warnings could be required by the spec.

### Errors

### Warnings
Unnecessary composite type (`??T`, `T&T`, `A|B` if `A is B`)

The canonical zero/one/two-element enum is `None`/`Null`/`Bool`. (If someine
defines their own zero/one/two-element enum)

Empty class.

Class with just one member.

Unused variable.

Compile time known condition. (For *conditional*, *and* and *or* operators, and
for loop conditions)

Enforce class contents order: variables, methods, nested classes.

Unsafe code is safe.

Any piece of code that provably has no side effects must produce a warning.

Duplicate extends, import, friend

### Other
Behavior of a program that compiles must be completely specified by source code.
What are compiler options like ffastmath in gcc must be part of source code.
Compiler options can only mess with levels of optimization, what is a valid program
and what not (eg. enabling new, experimental syntax), never with semantics.
