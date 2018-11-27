# Old notes
This file contains notes that are duplicates, rejected, no longer relevant, unclear
or already part of the spec. I do not want to delete them, though, so I place
them here.

Update: as I started to move all here, incorporating valid ones to the spec,
I quickly realized that moving all notes here is a waste of time. So not all
notes that will end up in the spec will also end up here, just those that have
to be significantly reformulated.


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

##### just one type for functions
Note: ???

##### Letter case of first letter of identifiers
Types must start with uppercase and non-type variables with lowercase letter,
so `Foo<a> b` is unambiguously declaration and `foo<a> b` is an error (cannot
convert Bool to Number)

Note: part of the spec.

##### `?` confusion
Shouldn't `?` be a type modifier instead of a type?
It should be a type, because `??T` is a valid type, eg type of.
`[ T(), null ][foo()]`.
TODO how to distingush first- and second-level `null`?

Note: No, because `?T == Null|T`. There is no difference between `?T` and `??T`,
though the latter should be a warning

##### what is `const ?mut Type`?
Note: I dunno. Moved the question to the spec.

##### `class` and `trait` types
`class` and `trait` are types, (the only provided by the language itself?),
`class X is class`

Note: part of the spec.

##### arrays with arbitrary length
Note: part of the spec.

##### should error handling be part of RegeRex?
Note: moved to regex.chalk

##### `Enum<T>`
```
class X : Enum<Int> { a: 1, b: 3, c: 7, d: 15 }
```

Note: That brings all the trouble of dependent types, rejected.

##### `{} is Enum<Object>`
Note: 1. see `Enum<T>`, 2. there is `Object.fields` and `Object.members`

##### merge `class` and `Object`?
Note: Noooo! WTF? `Set<class>` is a set of classes, `Set<Object>` is a set of
instances of classes

##### `Set<T>` is just `Map<T, Null>`
Note: maybe. moved to a comment in temp.chalk

##### Generic function with `Null`
if a generic function has parameter instantiated to `Null`, should the parameter
be removed?

Note: No, the parameter still appears in function body. Why did I even write this?

##### Backtick for generics
backtick instead of `<`, `>` for generics? would conflict with markdown, looks slighly weird
```
Set`Int` a;
class Map`type K, type V` {}
Set<Int> a;
class Map<type K, type V> {}
```

Note: No.

##### Autoconversion of Optional to Bool?
Note: `Optional<T>` was deprecated in favor of `?T == Null|T`.
Conditions can use `t is Null`to get a boolean.

##### `typeof(t)`
```
type T = foo();
T a;
typeof(a) == T // true;
```

Note: rejected. every value has member `type`

##### Block returns last statement, function must return explicitly
Note: part of the spec.

##### do not have different types of arrays - I'm looking at std::vector
Note: yes.

##### Function pointers
They should be just pointers to Function class, no special treatment from compiler.

Note: yes.

##### no out-of-class function definitions
Note: yes.

##### String should implement Buffer
Node: I'm not sure, left a comment in temp.chalk

##### Questions about types:
1. Is there a one-to-one correspondence between type constructors (eg. `A|B`)
   and types?
   - Not a good idea: take `A|A` or `(A&B)|C` and `(A|C)&(B|C)`. If there was such
     a bijection, there would also probably have to be nontrivial type conversions
     to get around it.
2. Are classes and traits types, or is there just a one-to-one correspondence
   between them and their corresponding types?
   - I'll go with class are types, and if something breaks down, I'll change that.
3. How to handle `A|*A`? Dum dum duuuum.
   1. Make it an error.
   2. Use the other order for assignment, ie. `=` assigns a value, `:=` a pointer,
      `::=` pointer to pointer, etc.
      
      This is the opposite of the order I had in mind because of \<del>generics\</>
      a flawed argument involving generics. But now that I think about it, this
      is probably the correct order. However, it means pointers should be initialized
      with `:=`, which ... I wouldn't expect.
      
      Original, flawed argument: in `class<T>`, `=` would assign the pointer, so
      if `T == *A`, `=` would still assign to pointer. Yeah, but of different depth.

Notes:
1. No, eg. `A|A` should equal `A` and `(A&B)|C` should equal `(A|C)&(B|C)`. Part
   of the spec.
2. Part of the spec.
2. I'll go with 2.

##### Some proofs about types
> Eg. Some proofs:
> 0. ``
> 1. `(A&B)|C` equals `(A|C)&(B|C)`
>    - `A&B` is `A` is `A|C`
>    - `C` is `A|C`
>    - `(A&B)|C` is `A|C`
> 
>    - `A&B` is `B` is `B|C`
>    - `C` is `B|C`
>    - `(A&B)|C` is `B|C`
> 
>    - `((A&B)|C)|((A&B)|C)` is `(A|C)&(B|C)`
>    - `(A&B)|C` is `((A&B)|C)|((A&B)|C)` is `(A|C)&(B|C)`
> 
>    - `(A|C)&(B|C)` is `A|C`
>    - `(A|C)&(B|C)` is `B|C`
>    - `(A|C)&(B|C)` is `(A&B)|C`
> 
> 2. `A|None` is `A`
>    - `A` is `A`
>    - `None` is `A`
>    - `A|None` is `A`
> 3. `A&None` is `None` - trivial
> 4. `A` is `C` implies `A|B` is `C|B`
>    - `A` is `C` is `C|B`
>    - `B` is `C|B`
>    - `A|B` is `C|B`
> 5. `A&B` is `A|B`
>    - `A&B` is `A` is `A|B`
>    - `A&B` is `B` is `A|B`
>    - `A&B` is `A|B`
> 6. `(A&B)|C` is `(B&A)|C`
>    - `A&B` is `B&A` is `(B&A)|C`
>    - `C` is `(B&A)|C`
>    - `(A&B)|C` is `(B&A)|C`
> 7. `(A|B)|C` is `A|(B|C)`
>    - `A` is `A|(B|C)`
>    - `B` is `B|C` is `A|(B|C)`
>    - `A|B` is `A|(B|C)`
>    - `C` is `B|C` is `A|(B|C)`
>    - `(A|B)|C` is `A|(B|C)`
> 8. `(A&B)&C` is `A&(B&C)`
>    - `(A&B)&C` is `A&B` is `A`
>    - `(A&B)&C` is `A&B` is `B`
>    - `(A&B)&C` is `C`
>    - `(A&B)&C` is `B&C`
>    - `(A&B)&C` is `A&(B&C)`

Note I made this to make sure the rules of 'is' relation are sane and complete.
Now I don't need it.































