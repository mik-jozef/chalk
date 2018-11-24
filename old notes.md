# Old notes
This file contains notes that are duplicates, rejected, no longer relevant
or already part of the spec. I do not want to delete them, though, so I place
them here.


##### `Optional.isNull()` or `a is Null`
Note: the latter. `Optional<T>` deprecated in favor of `?T == Null|T`

##### compiler - make it error to compare value with null, because it is always false
Note: not needed - this is just a special case of warning about compile time
known branching

##### `void` and `noreturn` types
Note: deprecated in favor of `Null` and `None` types

##### Return type of conditional operator
If the type of either second or third operand of conditional operator is `noreturn`,
then the type of the return value and both operands must be `noreturn`.
If the type of either second or third operand of conditional operator is `void`,
then the type of the return value is also `void`.
If the types of the second and third operands are the same, then the type of return
value is also of the same type.
Else the return type of conditional operator is class X : All Traits Shared By Both.

Note: new rules - the return type of `c ? a : b` is the common type of `a` and `b`.

##### What should `null == null` be?
Options:

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

Note: pick 3.


##### rename `noreturn` to `Empty`?
Note: renamed to `None`

##### main returns noreturn
Note: duplicate
























