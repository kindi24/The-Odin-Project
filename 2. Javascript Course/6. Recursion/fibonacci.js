console.log("This was printed recursively");

function fibs(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];

    const arr = [0, 1];

    for (let i = 2; i < n; i++) {
        arr.push(arr[i-1] + arr[i-2]);
    }

    return arr;
}

function fibsRec(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const arr = fibsRec(n-1);
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);

    return arr;
}

console.log(fibs(8)); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(fibsRec(8)); // [0, 1, 1, 2, 3, 5, 8, 13]