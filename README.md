# 🔥 burning-brackets.js 🔥

burning-brackets.js is a javascript utility library for simplifying code. It will shorten commonly used code and remove unnecessarily nested brackets.

### Example:
```javascript
let array = ['Remove_all', 'these_underscores'];

array = array.all.replaceAll('_', ' '); // ['Remove all', 'these underscores']

// old way:
array = array.map(entry => entry.replaceAll('_', ' '));
```

## Installation
```html
<script src="https://ilijazm.github.io/burning-brackets-js/burning-brackets.min.js"></script>
```

## Getting Started

burning-brackets.js will help you to create more out of less nested brackets. Commonly used code that could be simplified is:

### Making a change to all entries in an array

##### Without burning-brackets-js
```javascript
let array = ["this is some text", "that should be written", "using capital characters"];

array = array.map(item => item.toUpperCase()); // ["THIS IS SOME TEXT", "THAT SHOULD BE WRITTEN", "USING CAPITAL CHARACTERS"]
```

##### With burning-brackets-js
```javascript
let array = ["this is some text", "that should be written", "using capital characters"];

array = array.all.toUpperCase(); // ["THIS IS SOME TEXT", "THAT SHOULD BE WRITTEN", "USING CAPITAL CHARACTERS"]
```

### Creating a for loop

##### Without burning-brackets-js
```javascript
for (let i = 0; i < 10; i++) {
    console.log('i = ' + i);
}
```

##### With burning-brackets-js
```javascript
10..for(i => console.log('i = ' + i));
```

### Getting a random element

##### Without burning-brackets-js
```javascript
const array = ['🐈', '🐔', '🐤', '🐖'];

const random = array[Math.floor(Math.random() * array.length)];
```

##### With burning-brackets-js
```javascript
['🐈', '🐔', '🐤', '🐖'].random;
```

### Getting a random number

##### Without burning-brackets-js
```javascript
Math.floor(Math.random() * 10); // getting a random number between 0 and 9
```

##### With burning-brackets-js
```javascript
10..random;
```

## Documentation

- [HTMLElements](#HTMLElements)
- [Loops](#Loops)
- [Array](#Array)
- [String](#String)
- [Insert](#Insert)
- [Conversions](#Conversions)
- [Random](#Random)
- [All](#All)


### HTMLElements

#### HTMLElement.prototype.html
```javascript
element.html
```
Is a shorter version of ``element.innerHTML``

#### HTMLElement.prototype. ( x | y | width | height )
```javascript
element.x
element.y
element.width
element.height
```

Returns the actual dimensions of an element by calling ``HTMLElement.prototype.getBoundingClientRect``

#### HTMLElement.prototype. ( addClass | removeClass | toggleClass | containsClass )

```javascript
element.addClass(className)
element.removeClass(className)
element.toggleClass(className)
element.containsClass(className)
```

Is a shorter version of ``element.classList``

#### HTMLElement.tag & HTMLElement.prototype.setTag

```javascript
element.tag
element.setTag(tagName)
```

This will provide the ability to not only get, but also set the tag name of an element. If you use ``element.tag`` however, the variable ``element`` will no longer point to the right element. To overcome this you must use ``element.setTag``. This will return the proper element.

```javascript
document.query('div').setTag('h1').html += '!';
```

```javascript
document.queryAll('b').all.setTag('p').all.addClass('bold');
```

#### HTMLElement.prototype.query

```javascript
element.query(selectors)
```

Is a shorter version of ``element.querySelector``. It also works on the document.

#### HTMLElement.prototype.queryAll

```javascript
element.queryAll(selectors)
```

Is a shorter version of ``element.querySelectorAll``. It automatically converts the output to an array. It also works on the document.

#### String.prototype.toElement

```javascript
string.toElement()
```

Converts a string to a HTML element.

##### Practical Use Cases

```javascript
document.body.appendChild('<h1>Hello, world!</h1>'.toElement());
```

### Loops

#### Number.prototype.for

```javascript
number.for(fun, steps?)
```

The ``for`` function will iterate from 0 to the number and call the function ``fun``. You can optionally manipulate the steps with the argument ``steps``. It also can iterate to negative values.

##### Practical Use Cases

```javascript
10..for(console.log) // This will print the numbers 0 - 9
```

You can use this function to shorten your code:

```javascript
// Without the utility function
for (let i = 0; i < 10; i++) {
    console.log("i = " + i);
}

// With the utility function
10..for(i => console.log("i = " + i));
```

#### String.prototype.forEach
```javascript
string.forEach(fun)
```

The ``forEach`` function will convert the string into a charArray and then call ``forEach`` on the array.

#### ( Array | String | Number ) .prototype.do

```javascript
array.do(startValue, fun)
string.do(startValue, fun)
number.do(startValue, fun, steps)
```

The ``do`` function will iterate over a given set and then add the return value of the function ``fun`` to the startValue. It basically does similarly to the ``map`` function but instead of putting the return value in a new array it will add everything to one variable.

##### Practical Use Cases

```javascript
// With Array.prototype.map
let content = ["hello", "world"];

let result = content.map(v => {
    return `<div>${v}</div>`;
});

result = result.join("")

console.log(result); // Will return <div>hello</div><div>world</div>
```

```javascript
// With Array.prototype.do
let content = ["hello", "world"];

const result = content.do("", v => {
    return `<div>${v}</div>`;
});

console.log(result); // Will also return <div>hello</div><div>world</div>
```

You can manipulate the return value by adapting the ``startValue``. 

```javascript
10..do("", i => i); // "0123456789"
```

```javascript
10..do(0, i => i); // 45
```

#### ( Array | String | Number ) .prototype.progress

```javascript
array.progress(fun)
string.progress(fun)
number.progress(fun)
```

This will create a loop and call ``fun`` with the following parameters:\

``iv``: The current value of the string or array or the max value of the number.\
``i``: The current index.\
``progress``: The progress between 0 and 1.

##### Practical Use Cases

```javascript
5..progress((maxValue, i, progress) => console.log(progress)); // 0, 0.25, 0.5, 0.75, 1
```

```javascript
['♠', '♣', 'red:', '♥', '♦'].progress((card, i, progress) => {
    if (progress !== 0.5) console.log(card);
}); // ♠, ♣, ♥, ♦
```

### Array

#### Array.first

```javascript
['🐈', '🐔', '🐤', '🐖'].first; // will return '🐈'
```

#### Array.last

```javascript
['🐈', '🐔', '🐤', '🐖'].last; // will return '🐖'
```

#### Array.random

```javascript
['🐈', '🐔', '🐤', '🐖'].random; // Will return a random entry of the array
```

#### Array.prototype.add

```javascript
array.add(...args)
```

Pushes ``args`` into the array. If an argument is an array as well, the content of the array will get joined.

##### Practical Use Cases

```javascript
let a = [];

a.add(1);
a.add(2, 3, 4);
a.add(5, 6, [7, 8, 9]);

// a: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### Array.prototype.copyFrom

```javascript
array.copyFrom(other)
```

This will create a clone of the array ``other``

##### Practical Use Cases

```javascript
const array = ['😁', '😋', '🙄'];
const clone = array;

console.log(array == clone); // true

const real_clone = [].copyFrom(array);

console.log(array == real_clone); // false
```

### String

#### String.prototype.append

```javascript
string.append(str)
```

``append`` will append ``str`` to the string

##### Practical Use Cases

```javascript
"Hello, world".append("!"); // "Hello, world!"
```

#### String.prototype.toClipboard

```javascript
string.toClipboard()
```

This will copy the string to the clients clipboard.

##### Practical Use Cases

```javascript
document.query('#snippet').html.toClipboard()
```

#### String.protoype.replaceEach

```javascript
string.replaceEach(search, replacement)
```

``replaceEach`` is a replacement for ``String.prototype.replaceAll`` because of compatibility issues. ``replacement`` defaults to an empty string.

### Number

#### Number.prototype.minmax
```javascript
number.minmax(min, max)
number.minmax(max)
```

This will set boundaries on the number and return the result.

When only specifiying one parameter, the minimum automatically gets set to 0.

When `max` is smaller than `min`, `min` and `max` get swapped automatically.

```javascript
10..minmax(0, 20);    //10
10..minmax(20, 30);   //20
10..minmax(0, 5);     //5
(-15).minmax(-10, 0); //-10
(-5).minmax(10, 0);   //0
(-5).minmax(-20);     //-5
```

### Insert

#### Array.prototype.insert

```javascript
array.insert(index, element)
```

This will insert ``element`` at ``index``

```javascript
['🍕', '🍟'].insert(1, '🍔'); // ['🍕', '🍔', '🍟']
```

#### String.prototype.insert

```javascript
string.insert(index, element)
```

This will insert ``element`` at ``index``

```javascript
"Hello, !".insert(7, "world"); // Hello, world!
```

### Conversions

#### String.prototype.toArray

```javascript
string.toArray()
```

This will convert the string to a char array.

##### Practical Use Cases

```javascript
'ABCD'.toArray(); // ['A', 'B', 'C', 'D']
```

#### String.asArray

```javascript
string.asArray
```

This will also convert the string to a char array.

##### Practical Use Case

```javascript
'ABCD'.asArray; // ['A', 'B', 'C', 'D']
```

#### Array.asString

```javascript
array.asString
```

This will convert the array to a string without a joint.
If set, it will convert the string into the array.

##### Practical Use Cases

```javascript
['A', 'B', 'C', 'D'].asString; // 'ABCD'
```

```javascript
let array = [];
array.asString = "ABCD";
console.log(array); // ['A', 'B', 'C', 'D']
```

### Random

#### Number.random

```javascript
10..random; // will return a random number between 0 - 9
```

#### String.random

```javascript
"ABCDEFG".random; // will return a random character from the string
```

#### Array.random

```javascript
['🥇', '🥈', '🥉'].random; // will return a random entry from the array
```

### All

```javascript
array.all
```

``all`` will execute the next prototype function or property on all elements of an array. This works similarly to the ``map`` function but it's way shorter.

##### Practical Use Cases

```javascript
// With map
['foo', 'bar'].map(item => item.toUpperCase()); // ['FOO', 'BAR']

// With all
['foo', 'bar'].all.toUpperCase(); // ['FOO', 'BAR']
```

```javascript
['foo', 'hello, world'].all.length; // [3, 12]
```

This also works with self defined prototypes. If you want to define your own properties or prototype functions, make sure you initialize this script after yours.

```javascript
[10, 20, 30].all.random; // [(0 - 9), (0 - 19), (0 - 29))] random values
```

If you set an array using ``all`` you'll change every entry.

```javascript
let a = [1, 2, 3];
a.all = 10;
console.log(a); // [10, 10, 10]
```

##### Further examples
```javascript
['a', 'b', 'c'].all.append('!'); // ['a!', 'b!', 'c!']
```

```javascript
document.queryAll('li a').all.addClass('colored');
```

```javascript
document.queryAll('li a').all.style.all.color = 'red';
```

## Further examples

This will create an unordered list and append this as a html element to the nav.

```javascript
const element = '<ul>' 
	+ ['Home', 'About', 'Pricing'].do('', content => {
		return '<li>' + content + '</li>';
	})
	+ '</ul>';

document.query("nav").appendChild(element.toElement());

/*
 <ul>
    <li>Home</li>
    <li>About</li>
    <li>Pricing</li>
 </ul>
 */
```