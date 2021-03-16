# 🔥 burning-brackets.js 🔥

burning-brackets.js is a javascript utility library for simplifying code. It will shorten commonly used code and remove unnecessarily nested brackets.

### typeOf

`typeOf` is an extension for the already existing `typeof` but with more distinctions between types.
See the differences here:

```javascript
typeof null; // 'object'.
typeOf(null); // 'null'
```

```javascript
class MyClass {}

typeof MyClass; // 'function'
typeOf(MyClass); // 'class'
```

```javascript
typeof []; // 'object'
typeOf([]); // 'array'
```
