

#   `keyof` in TypeScript: Type-Safe Property Access Made Easy

When working with complex JavaScript objects, how often have you second-guessed whether a key exists or not? TypeScript offers a powerful solution: the `keyof` operator. In this post, we’ll break down what `keyof` does, how it's different from using an object directly, and how you can leverage it with generics to build safer, smarter code.

---

##  What Is `keyof` in TypeScript?

In TypeScript, the `keyof` operator lets you extract the **keys of a type** as a **union of string literals**. This might sound technical, but it’s extremely useful. It’s like telling TypeScript, *“Hey, give me a list of all valid keys for this object type.”*

Here’s a simple example:

```ts
const account = {
  username: "",
  email: "",
  password: "",
  role: "",
};

type TAccount = typeof account;
// Equivalent to:
// { username: string; email: string; password: string; role: string }

type TAccountKeys = keyof TAccount;
// Result: "username" | "email" | "password" | "role"
```

Notice how we passed the **type** (`typeof account`) to `keyof`, not the object itself. That’s an important distinction—`keyof` works on types, **not** on object instances.

---

##  Why Use `keyof`?

Using `keyof` comes with a number of advantages:

*  **Type safety**: Ensures only valid keys are accessed.
*  **Narrowing and constraining types**: Prevents bugs by catching incorrect property names at compile time.
*  **Reusability**: Works well with generics to create flexible utility functions.
* **Self-documenting code**: Makes your functions' expected input more obvious.

---

## `keyof` + Generics = Type-Safe Magic

One of the most powerful patterns is using `keyof` inside a generic function. Let’s say you want to get a property from an object dynamically, but you want TypeScript to protect you from typos or invalid keys.

Here’s how you can do it:

```ts
function getProp<T, K extends keyof T>(obj: T, prop: K) {
  return obj[prop];
}

const account = {
  username: "xyz",
  email: "xyz@gmail.com",
  password: "12344$#Djfkjf",
  role: "admin"
};

console.log(getProp(account, "email")); 
// Output: "xyz@gmail.com"
```

This simple function ensures:

* `prop` must be a valid key of `obj`
* The return type is inferred correctly (e.g., `string` in this case)
* Compile-time errors catch any misspellings or invalid keys

---

## 🚫 What Happens If You Don't Use `keyof`?

Without `keyof`, you lose the ability to restrict your access to only valid keys. This increases the chance of runtime errors, especially when working with dynamic keys or large interfaces. TypeScript won’t help you much if you just pass in raw strings.

```ts
function getUnsafeProp(obj: any, prop: string) {
  return obj[prop]; // no type safety!
}
```

You get no autocomplete, no validation, and a higher risk of bugs.

---

##  Final 

The `keyof` operator might seem like a small feature, but it packs a powerful punch when it comes to **writing maintainable, scalable, and bug-resistant TypeScript code**. Whether you're accessing properties dynamically, building generic utilities, or validating API responses, `keyof` ensures you're always on safe ground.

---


# `null`, `never`, and `unknown`

---

# Understanding `null`, `never`, and `unknown` in TypeScript

When writing TypeScript, you're likely to come across some special types like `null`, `never`, and `unknown`. While they might look simple, they each serve unique purposes and help you write safer, more precise code.

In this post, we’ll break them down with examples and show when—and why—you should use them.

---

##  `null`: Absence of a Value

The `null` type represents **intentional absence** of any object value. It’s a valid value that means “nothing here.”

### Example:

```ts
let userName: string | null = null;

userName = "Alice"; // now it has a value
```

### When to Use:

* When you expect a value to be **optionally absent**
* When dealing with APIs or databases that might return `null`

>  Pro Tip: Use `strictNullChecks` in your `tsconfig.json` to ensure TypeScript doesn’t silently accept `null` where it shouldn’t.

---

##  `never`: The Type That Should Never Happen

The `never` type represents **values that never occur**. A function that **throws an error** or **never finishes execution** will have a return type of `never`.

### Example:

```ts
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```

### When to Use:

* For functions that **never return**
* As part of exhaustive checks in switch statements:

```ts
type Shape = "circle" | "square";

function getArea(shape: Shape) {
  switch (shape) {
    case "circle":
      return 3.14;
    case "square":
      return 1;
    default:
      const _exhaustive: never = shape; // Ensures all cases are handled
  }
}
```

>  `never` is useful to **prevent unhandled cases** and catch logic errors during development.

---

##  `unknown`: The Safe `any`

The `unknown` type is similar to `any`, but **safer**. You can assign anything to a variable of type `unknown`, but you **can’t use it** until you **narrow it** or **type-check it**.

### Example:

```ts
let value: unknown;

value = 5;
value = "hello";
value = true;

// TypeScript won’t let you do this directly:
console.log(value.toUpperCase()); // ❌ Error

// You must check the type first:
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅
}
```

### When to Use:

* When you’re **not sure about the type**, such as parsing data from APIs or external sources
* When you want to **enforce validation** before using a variable

> `unknown` is a **type-safe** alternative to `any` that encourages proper checks before usage.

---

##  Recap: When to Use Each

| Type      | Description                        | Use Case                             |
| --------- | ---------------------------------- | ------------------------------------ |
| `null`    | Intentionally no value             | Optional values, empty states        |
| `never`   | No possible value                  | Functions that throw or never return |
| `unknown` | Value exists but type is not known | Safer dynamic data, external input   |

---

##  Final 

These three types—`null`, `never`, and `unknown`—may look simple, but they’re incredibly powerful when used correctly. They allow TypeScript to be precise and expressive, helping you build **bug-free and type-safe applications**.

Whether you’re validating user input, handling API responses, or writing defensive code, understanding these types will make your TypeScript skills sharper and your codebase stronger.






