export default class Test {

    constructor() {
        this.calculator = {
            add: function(n1, n2) {
                return n1 + n2;
            },
            subtract: function(n1, n2) {
                return n1 - n2;
            },
            multiply: function(n1, n2) {
                return n1 * n2;
            },
            divide: function(n1, n2) {
                if (n2 === 0) {
                return "Cannot divide by zero";
                }
                return n1 / n2;
            }
        };
    }

    capitalize(value) {
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    }

    reverseString(value) {
        return value.split("").reverse().join("");
    } 

    caesarCipher(str, shift) {
        shift = shift % 26;
        let result = "";

        for(let i = 0; i < str.length; i++) {
            let char = str[i];
            let charCode = char.charCodeAt(0);

            if (charCode >= 65 && charCode <= 90) {
                let newCharCode = ((charCode - 65 + shift) % 26) + 65;
                result += String.fromCharCode(newCharCode);
            }
            else if (charCode >= 97 && charCode <= 122) {
                let newCharCode = ((charCode - 97 + shift) % 26) + 97;
                result += String.fromCharCode(newCharCode);
            }
            else result += char;
        }

        return result;
    }

    analyzeArray(ar) {
        let size = ar.length
        let sum = ar[0];
        let max = ar[0];
        let min = ar[0];

        for(let i = 1; i < size; i++) {
            sum += ar[i];
            if(ar[i] > max) max = ar[i];
            if(min > ar[i]) min = ar[i];
        }

        let avg = sum / size;

        return ["average: " + avg + ",\nmin: " + min + ",\nmax: " + max + ",\nlength: " + size];
    }
}