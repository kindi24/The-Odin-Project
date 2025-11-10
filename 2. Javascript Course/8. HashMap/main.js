import { HashMap } from './hashmap.js';

const testMap = new HashMap(); // capacity 16, load factor 0.75

console.log("--- Γεμίζουμε το HashMap ---");
testMap.set('apple', 'red');
testMap.set('banana', 'yellow');
testMap.set('carrot', 'orange');
testMap.set('dog', 'brown');
testMap.set('elephant', 'gray');
testMap.set('frog', 'green');
testMap.set('grape', 'purple');
testMap.set('hat', 'black');
testMap.set('ice cream', 'white');
testMap.set('jacket', 'blue');
testMap.set('kite', 'pink');
testMap.set('lion', 'golden');

console.log(`Length: ${testMap.length()}`); // 12
console.log(`Capacity: ${testMap.capacity}`); // 16
console.log(`Load Factor: ${testMap.length() / testMap.capacity}`); // 0.75

testMap.set('apple', 'green apple');
testMap.set('lion', 'silver lion');

console.log(`Value of 'apple': ${testMap.get('apple')}`); // green apple
console.log(`New Length: ${testMap.length()}`); // 12

console.log("\n--- Resize ---");
testMap.set('moon', 'silver');

console.log(`New Length: ${testMap.length()}`); // 13
console.log(`New Capacity: ${testMap.capacity}`); // 32
console.log(`Load Factor: ${testMap.length() / testMap.capacity}`); // 0.40625
console.log(`Value of 'moon': ${testMap.get('moon')}`); // silver

console.log("\n--- Trying Other Methods ---");
console.log(`The key 'carrot' exists? ${testMap.has('carrot')}`); // true
console.log(`The key 'sun' exists? ${testMap.has('sun')}`); // false
console.log(`Remove 'hat' ${testMap.remove('hat')}`); // true
console.log(`Length after Remove: ${testMap.length()}`); // 12
console.log(`Keys:`, testMap.keys());
/* 
Keys: [
  'moon',     'carrot',
  'frog',     'banana',
  'grape',    'ice cream',
  'jacket',   'kite',
  'elephant', 'apple',
  'dog',      'lion'
]
*/
console.log(`Values:`, testMap.values());
/* 
Values: [
  'silver', 'orange',
  'green',  'yellow',
  'purple', 'white',
  'blue',   'pink',
  'gray',   'green apple',
  'brown',  'silver lion'
]
*/
console.log(`Entries:`, testMap.entries());
/* 
Entries: [
  [ 'moon', 'silver' ],
  [ 'carrot', 'orange' ],
  [ 'frog', 'green' ],
  [ 'banana', 'yellow' ],
  [ 'grape', 'purple' ],
  [ 'ice cream', 'white' ],
  [ 'jacket', 'blue' ],
  [ 'kite', 'pink' ],
  [ 'elephant', 'gray' ],
  [ 'apple', 'green apple' ],
  [ 'dog', 'brown' ],
  [ 'lion', 'silver lion' ]
]
*/

console.log("\n--- Clear ---");
testMap.clear();
console.log(`Length after Clear: ${testMap.length()}`); // 0
console.log(`Entries after Clear:`, testMap.entries()); // []

