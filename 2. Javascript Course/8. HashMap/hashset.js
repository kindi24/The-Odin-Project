class HashSet {

    static DUMMY_VALUE = true;
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.map = new HashMap(initialCapacity, loadFactor); 
    }

    add(key) {
        this.map.set(key, HashSet.DUMMY_VALUE);
    }

    has(key) {
        return this.map.has(key);
    }

    remove(key) {
        return this.map.remove(key);
    }

    length() {
        return this.map.length();
    }

    clear() {
        this.map.clear();
    }

    keys() {
        return this.map.keys();
    }
}