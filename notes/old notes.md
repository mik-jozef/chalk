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

0. Always `true` - Floats are `null` instead of `NaN`, so this is against that
   standard. (TODO replace 'that' with that standard's name (no internet ATM (more parentheses)))
   Also, the reasoning that `NaN` shouldn't equal `NaN` applies to `null`, ie.
   unknown value shouldn't be confident that it equals other unknown value.
   Personally, I'm very much against this option.
1. Always `false` - consistent with that standard (parentheses! (TODO)), but I
   think this is going too far, see third option.
2. False unless it has the same address in memory, ie. is the same variable.
   This would technically also be against ((())), but:
   3.0 it's a very special case not likely to cause problems (prove me wrong),
   3.1 in this case, I believe it's justified, it's the standard that is wrong.
       An unknown value cannot know whether it is the same value as another
       unknown value, but it definitely is the same as itself,
   3.2 it would be consistent with how equality is checked in case of non-null
       values. `Object.equals` returns true if the arguments have the same address
       and calls `ParamType.equals` otherwise.
   The only downside I see is that this is the most complicated option, and
   might be confusing to those who don't know about it, but I like this one the most.

Note: pick 2.


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
Note: I'm not sure, left a comment in temp.chalk

##### Questions about types:
0. Is there a one-to-one correspondence between type constructors (eg. `A|B`)
   and types?
   - Not a good idea: take `A|A` or `(A&B)|C` and `(A|C)&(B|C)`. If there was such
     a bijection, there would also probably have to be nontrivial type conversions
     to get around it.
1. Are classes and traits types, or is there just a one-to-one correspondence
   between them and their corresponding types?
   - I'll go with class are types, and if something breaks down, I'll change that.
2. How to handle `A|*A`? Dum dum duuuum.
   0. Make it an error.
   1. Use the other order for assignment, ie. `=` assigns a value, `:=` a pointer,
      `::=` pointer to pointer, etc.
      
      This is the opposite of the order I had in mind because of \<del>generics\</>
      a flawed argument involving generics. But now that I think about it, this
      is probably the correct order. However, it means pointers should be initialized
      with `:=`, which ... I wouldn't expect.
      
      Original, flawed argument: in `class<T>`, `=` would assign the pointer, so
      if `T == *A`, `=` would still assign to pointer. Yeah, but of different depth.

Notes:
0. No, eg. `A|A` should equal `A` and `(A&B)|C` should equal `(A|C)&(B|C)`. Part
   of the spec.
1. Part of the spec.
2. I'll go with 1.

##### Some proofs about types
> Eg. Some proofs:
> 0. `(A&B)|C` equals `(A|C)&(B|C)`
>    - `A&B` is `A` is `A|C`
>    - `C` is `A|C`
>    - `(A&B)|C` is `A|C` is `(A|C)|None`
> 
>    - `A&B` is `B` is `B|C`
>    - `C` is `B|C`
>    - `(A&B)|C` is `B|C` is `(B|C)|None`
> 
>    - `(A&B)|C` is `((A|C)&(B|C))|None` is `(A|C)&(B|C)`
> or (how exactly did this work?):
>    - `((A&B)|C)|((A&B)|C)` is `(A|C)&(B|C)`
>    - `(A&B)|C` is `((A&B)|C)|((A&B)|C)` is `(A|C)&(B|C)`
> 
>    - `(A|C)&(B|C)` is `A|C`
>    - `(A|C)&(B|C)` is `B|C`
>    - `(A|C)&(B|C)` is `(A&B)|C`
> 
> 1. `A|None` is `A`
>    - `A` is `A`
>    - `None` is `A`
>    - `A|None` is `A`
> 2. `A&None` is `None` - trivial
> 3. `A` is `C` implies `A|B` is `C|B`
>    - `A` is `C` is `C|B`
>    - `B` is `C|B`
>    - `A|B` is `C|B`
> 4. `A&B` is `A|B`
>    - `A&B` is `A` is `A|B`
>    - `A&B` is `B` is `A|B`
>    - `A&B` is `A|B`
> 5. `(A&B)|C` is `(B&A)|C`
>    - `A&B` is `B&A` is `(B&A)|C`
>    - `C` is `(B&A)|C`
>    - `(A&B)|C` is `(B&A)|C`
> 6. `(A|B)|C` is `A|(B|C)`
>    - `A` is `A|(B|C)`
>    - `B` is `B|C` is `A|(B|C)`
>    - `A|B` is `A|(B|C)`
>    - `C` is `B|C` is `A|(B|C)`
>    - `(A|B)|C` is `A|(B|C)`
> 7. `(A&B)&C` is `A&(B&C)`
>    - `(A&B)&C` is `A&B` is `A`
>    - `(A&B)&C` is `A&B` is `B`
>    - `(A&B)&C` is `C`
>    - `(A&B)&C` is `B&C`
>    - `(A&B)&C` is `A&(B&C)`

Note I made this to make sure the rules of 'is' relation are sane and complete.
Now I don't need it.

##### Replace "common type of `A` nad `B`" with `A|B`
Note: yes

##### Can (and should) the type `type` be defined as `class|trait`?
Note: No, because instances of `class|trait` should be instances of `class` or
`trait`, and that is not true about all instances of `type`

##### Is `type` a good choice for the type of function types?
Should function types even have a type?

Note: I don't see why it wouldn't be.

##### The `?` and `??` operators
From the operator table:
| `?a`        | `Optional.hasValue(a)`    | (`a` must be `Optional`)

Note: `?` deprecated in favor of `a is Null`..

##### The `;` operator
Note: semicolon is a part of code block grammar, not an operator

##### Terms that need to be defined
value, instance, object

Note: done

##### Rejected operators, part 1
| Bit manipulation operators | Their methods | Trait
| ---- | ---- | ----
| `a <<= b`   | `a.shl(b)`         | (must be `Int`)
| `a >>= b`   | `a.shr(b, true)`   | (must be `Int`)
| `a >>>= b`  | `a.shr(b, false)`  | (must be `Int`)
| `a &= b`    | `a.bitwiseAnd(b)`  | (must be `Int`)
| `a \|= b`   | `a.bitwiseOr(b)`   | (must be `Int`)
| `a ^= b`    | `a.bitwiseXor(b)`  | (must be `Int`)
| `a << b`    | `Int.shiftLeft(a, b)`        | (must be `Int`)
| `a >> b`    | `Int.shiftRight(a, b, true)`  | (must be `Int`)
| `a >>> b`   | `Int.shriftRight(a, b, false)` | (must be `Int`)
| `a & b`     | `Int.bitwiseAnd(a, b)` | (must be `Int`)
| `a \| b`    | `Int.bitwiseOr(a, b)`  | (must be `Int`)
| `a ^ b`     | `Int.bitwiseXor(a, b)` | (must be `Int`)

Maybe one of `>>`, `>>>` should be deprecated in favor of `<<` with negative argument?

Note: Regarding bit manipulation operators, I don't think they are common enough
to deserve their own operator. I could still add them later if I change my mind,
or use the operators for something else.

##### Rejected operators, part 2
| Null unwrap operator | Their methods | Trait
| ----               | ----          |
| `??a`       | `Null.getValue(a)`     | (`a` must be `Optional`)

Note:
Those that would sacrifice program reliability for performance deserve neither
performance nor reliability.
 - George Washington

Why would I add a way to ignore the type system?

##### First class fields?
https://stackoverflow.com/questions/670734/c-pointer-to-class-data-member
```
class C {
 Int a, b;
}

C c;

static C:Int f = a;
c:f = 3; // ?

C:Int f = c.a;

f = 3; // ?
```

Note: A TODO about in the code static class field was added to spec, with the
static keyword removed, since the in the code non-static version seems to be
just an ordinary pointer to `Int`.

##### Should `R()` be `R(A)`?
Use case: `forEach(Null(T elem, Int index))` called with `Null(T)`

Note: yes.

##### Should a type template be a value?
Note: yes.

##### Other name for primitive types? kinds, basic types, ...
Note: no. Kinds is especially not appropriate for `type`, which is a type of
itself.

##### What are modules?
TODO What ARE modules? They aren't files, because I don't want this specification
to dictate how they are stored, they could also be database entries or contents
of HTML tags and the specification shouldn't care.

Note: Modules are classes. problem solved.

##### Should type templates be renamed
... to something like "Higher-order types", "Parametrized
types" or similar, and the name "type templates" be left to either instances of
parametrized types or the expression that defines a parametrized type?

Note: No.

##### Should there be some restrictions on module location resulution?
Yes, as mentioned in a TODO about 'path'.

##### What is `class is class` (because of generics, eg. `Set<class>()`)
Note: false, because `class.type == type` and `type` is not `class`

##### Maybe rename the `is` relation to `extends`?
Note: No.

##### Standard library should contain complex numbers and quaternions
Note: Yes, added to spec.

##### Disallow module-wide (mutable) state in libraries? or totally?
Note: Totally. No global state can be mutable.

##### Globaler variables are visible even before their declaration
... but function can be only called after their definition
```
Null foo() {
  Int bar() => a;

  bar(); // error

  Int a;

  bar(); // ok
}
```

Note: No. Just move the function definition down. Functions are visible even
before being declared.

##### Can function types have default parameters? or just function values?
Note: they cannot.

##### Does every value have an address? Or do only variables have them?
Note: Every value must have an address. Some pointers point to values that aren't
in a value-type variable.

##### Do objects have interface?
Note: Yes. Interface is where the member access operator gets values from.

##### Are classes types, or is there just a bijection between classes and class types?
Note: classes are types. There's no redundancy. There's a bijection between class
templates and class template definitions.

##### Should `All` and `Exists` be keywords? And should they be uppercase?
They are types, so I guess no and yes.
```
all RegularLanguage l, exists Nat n, all Nat m, Word w: m > n && w.length > m --> exists Word a, b, c: w = a ++ b ++ c && all Nat i: belongs(a ++ pow(b, i) ++ c, l);

All RegularLanguage l, Exists Nat n, All Nat m, Word w: m > n && w.length > m --> Exists Word a, b, c: w = a ++ b ++ c && All Nat i: belongs(a ++ pow(b, i) ++ c, l);

All RegularLanguage l, Exists Nat n, All Nat m, Word w:
  m > n && w.length > m
    --> Exists Word a, b, c:
      w = a ++ b ++ c && All Nat i: belongs(a ++ pow(b, i) ++ c, l);
```

Note: Added as TODO to spec

##### Should the notion of a type constructor be scrapped...
...in favor of just talking about types themselves, not their constructors?

Note: No. I didn't find an elegant way to rephrase the requirement that every
type must be a result of finite series of compositions of type constructors.









































