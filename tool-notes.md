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

TODO found in comments
 - should also disable some warnings eg. unused variable, (and mention that
   it those warnings were disabled if they were detected?)


### Other
Behavior of a program that compiles must be completely specified by source code.
What are compiler options like ffastmath in gcc must be part of source code.
Compiler options can only mess with levels of optimization, what is a valid program
and what not (eg. enabling new, experimental syntax), never with semantics.

### Chalk compiler should be able to
Publish stats about compiling times (percentage spent on parsing, theorem proving,
generating binaries, downloading dependencies, running comptime code, optimizing;
avaiable as granularly as possible).

Do code coverage and tests.

Format source code.

Autofix simple errors.

Interpret (run) code.

Run source code deterministically? (optional control over thread scheduler, faking
filesystem, time and other inputs)

### Optimizations

Optimize `Int sum(0); Int i : a { sum += 2 * i };`
to `Int sum(0); Int i : a { sum += i }; sum *= 2;`

Also see: https://stackoverflow.com/questions/53452713/why-is-2-i-i-faster-than-2-i-i

#### Have a complete system for algebraic manipulations





































