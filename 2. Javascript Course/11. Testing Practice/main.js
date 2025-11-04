import Test from "./test.js";

const test = new Test();

console.log(test.capitalize("name")); // Name
console.log(test.reverseString("name")); // eman
console.log(test.calculator.add(5,2)); // 7
console.log(test.calculator.subtract(9,4)); // 5
console.log(test.calculator.divide(6,3)); // 2
console.log(test.calculator.divide(1,0)); // Cannot divide by zero
console.log(test.calculator.multiply(7,8)); // 56
console.log(test.caesarCipher("xyz", 3)); // abc
console.log(test.caesarCipher("HeLLo", 6)); // NkRRu
console.log(test.caesarCipher("Hello, World!", 4)); // Lipps, Asvph!

const resultArray = test.analyzeArray([1,8,3,4,2,6]);
console.log("resultArray == {\n" + resultArray + "\n};"); // resultArray == { average: 4, min: 1, max: 8, length: 6 };