export class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity).fill(null);
        this.loadFactor = loadFactor;
        this.size = 0;
        this.capacity = initialCapacity;
    }

    hash(key) {
        if (typeof key !== 'string') {
            throw new Error("HashMap keys must be strings.");
        }
        let hashCode = 0;
        const primeNumber = 31;
        
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity; 
        }

        return hashCode;
    }

    _checkBounds(index) {
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds: " + index);
        }
    }

    _findKeyIndices(key) {
        const bucketIndex = this.hash(key);
        this._checkBounds(bucketIndex);

        const bucket = this.buckets[bucketIndex];
        if (!bucket) {
            return null;
        }

        for (let pairIndex = 0; pairIndex < bucket.length; pairIndex++) {
            if (bucket[pairIndex][0] === key) {
                return { bucketIndex, pairIndex };
            }
        }
        return null;
    }

    set(key, value) {
        if (this.size / this.capacity >= this.loadFactor) {
            this._resize();
        }

        const indices = this._findKeyIndices(key);

        if (indices) {
            this.buckets[indices.bucketIndex][indices.pairIndex][1] = value;
        } else {
            const bucketIndex = this.hash(key);
            this._checkBounds(bucketIndex);

            if (!this.buckets[bucketIndex]) {
                this.buckets[bucketIndex] = [];
            }

            this.buckets[bucketIndex].push([key, value]);
            this.size++;
        }
    }
    get(key) {
        const indices = this._findKeyIndices(key);
        
        if (indices) {
            return this.buckets[indices.bucketIndex][indices.pairIndex][1];
        }
        return null;
    }

    has(key) {
        return this._findKeyIndices(key) !== null;
    }

    remove(key) {
        const indices = this._findKeyIndices(key);
        
        if (indices) {
            this.buckets[indices.bucketIndex].splice(indices.pairIndex, 1);
            this.size--;
            return true;
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    keys() {
        const allKeys = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const pair of bucket) {
                    allKeys.push(pair[0]);
                }
            }
        }
        return allKeys;
    }

    values() {
        const allValues = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const pair of bucket) {
                    allValues.push(pair[1]);
                }
            }
        }
        return allValues;
    }

    entries() {
        const allEntries = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                allEntries.push(...bucket);
            }
        }
        return allEntries;
    }

    _resize() {
        const oldEntries = this.entries();
        
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;

        console.log(`\n*** New Capacity: ${this.capacity} ***\n`);

        for (const [key, value] of oldEntries) {
            this.set(key, value);
        }
    }
}