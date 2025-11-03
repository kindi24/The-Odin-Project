function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const sorted = [];
    let half = Math.round(arr.length/2);
    const left = mergeSort(arr.slice(0, half));
    const right = mergeSort(arr.slice(half, arr.length));

    while (left.length >= 1 && right.length >= 1){
        if (left[0] < right[0]) sorted.push(left.shift());
        else sorted.push(right.shift());
    }

    while (left.length >= 1){
        sorted.push(left.shift());
    }

    while (right.length >= 1){
        sorted.push(right.shift());
    }

    return sorted;
}

console.log(mergeSort([])); // []
console.log(mergeSort([73])); // [73]
console.log(mergeSort([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(mergeSort([105, 79, 100, 110])); // [79, 100, 105, 110]