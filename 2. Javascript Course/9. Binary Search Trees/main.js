// Class Node
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


const cleanArray = (array) => {
  const uniqueArray = [...new Set(array)];
  uniqueArray.sort((a, b) => a - b);
  return uniqueArray;
};

const buildTree = (array) => {
  const sortedArray = cleanArray(array);
  if (sortedArray.length === 0) {
    return null;
  }

  // Find the middle element to make it the root
  const mid = Math.floor(sortedArray.length / 2);
  const root = new Node(sortedArray[mid]);

  // Recursively build the left and right subtrees
  root.left = buildTree(sortedArray.slice(0, mid));
  root.right = buildTree(sortedArray.slice(mid + 1));

  return root;
};


// Class Tree
class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(value) {
    const newNode = new Node(value);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value === current.data) {
        console.log(`Value ${value} already exists. Insertion skipped.`);
        return;
      }
      
      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  _minValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  deleteItem(value) {
    this.root = this._deleteRec(this.root, value);
  }

  _deleteRec(root, value) {
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = this._deleteRec(root.left, value);
    } else if (value > root.data) {
      root.right = this._deleteRec(root.right, value);
    } else {
      // Case a: Node with only one child or no child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      // Case b: Node with two children
      const temp = this._minValueNode(root.right);
      
      root.data = temp.data;

      root.right = this._deleteRec(root.right, temp.data);
    }
    return root;
  }

  find(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.data) {
        return current;
      }
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error("A callback function is required for levelOrderForEach.");
    }
    if (this.root === null) return;

    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  _depthFirstForEach(node, callback, order) {
    if (node === null) return;

    if (order === 'pre') callback(node);
    this._depthFirstForEach(node.left, callback, order);
    if (order === 'in') callback(node);
    this._depthFirstForEach(node.right, callback, order);
    if (order === 'post') callback(node);
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error("A callback function is required for inOrderForEach.");
    }
    this._depthFirstForEach(this.root, callback, 'in');
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error("A callback function is required for preOrderForEach.");
    }
    this._depthFirstForEach(this.root, callback, 'pre');
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error("A callback function is required for postOrderForEach.");
    }
    this._depthFirstForEach(this.root, callback, 'post');
  }

  height(value) {
    const startNode = this.find(value);
    if (startNode === null) return null;

    const _calcHeight = (node) => {
      if (node === null) {
        return -1;
      }
      return 1 + Math.max(_calcHeight(node.left), _calcHeight(node.right));
    }

    return _calcHeight(startNode);
  }

  depth(value) {
    let current = this.root;
    let edges = 0;
    while (current !== null) {
      if (value === current.data) {
        return edges;
      }
      edges++;
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  _getHeightDiff(node) {
    if (node === null) return -1;
    return 1 + Math.max(this._getHeightDiff(node.left), this._getHeightDiff(node.right));
  }
  
  isBalanced() {
    return this._checkBalance(this.root);
  }

  _checkBalance(node) {
    if (node === null) return true;

    const leftHeight = this._getHeightDiff(node.left);
    const rightHeight = this._getHeightDiff(node.right);
    const heightDiff = Math.abs(leftHeight - rightHeight);

    // Check current node's balance AND recursively check subtrees' balance
    if (heightDiff <= 1 && this._checkBalance(node.left) && this._checkBalance(node.right)) {
      return true;
    }

    return false;
  }

  rebalance() {
    const elements = [];
    this.inOrderForEach(node => elements.push(node.data)); 
    this.root = buildTree(elements);
  }

  prettyPrint() {
    prettyPrint(this.root);
  }
}

const generateRandomArray = (size, max = 100) => {
  return Array.from({length: size}, () => Math.floor(Math.random() * max));
};

console.log("======================================");
console.log("Driver Script");
console.log("======================================");

const initialArray = generateRandomArray(15, 100);
const bst = new Tree(initialArray); 

console.log("\n### 1. Original Tree ###");
console.log("Original Data (Sorted and Unique):", cleanArray(initialArray));
bst.prettyPrint();

console.log("\n### 2. Balance Check (Initial) ###");
const initialBalance = bst.isBalanced();
console.log(`Is the tree balanced? ${initialBalance ? 'YES' : 'NO'}`);
const rootData = bst.root ? bst.root.data : 'Κενό Δέντρο';
console.log(`Root Height (${rootData}): ${bst.height(rootData)}`);


console.log("\n### 3. Tree Crossings ###");
const printTraversal = (methodName) => {
    const results = [];
    try {
        bst[methodName](node => results.push(node.data));
        console.log(`- ${methodName}:`, results.join(', '));
    } catch(e) {
        console.log(`- ${methodName}: (Error: Not given callback)`);
    }
};

printTraversal('levelOrderForEach');
printTraversal('preOrderForEach');
printTraversal('postOrderForEach');
printTraversal('inOrderForEach');

console.log("\n### 4. Test Find, Height, Depth ###");
const cleanedArr = cleanArray(initialArray);
if (cleanedArr.length > 0) {
    const testValue = cleanedArr[0];
    const foundNode = bst.find(testValue);
    console.log(`Find node with value ${testValue}: ${foundNode ? 'Found' : 'Not Found'}`);
    console.log(`Node Height ${testValue}: ${bst.height(testValue)}`);
    console.log(`Node Depth ${testValue}: ${bst.depth(testValue)}`);
}

console.log("\n### 5. Unbalancing ###");

bst.insert(101);
bst.insert(105);
bst.insert(120);
bst.insert(150);
bst.prettyPrint();

console.log("\n### 6. Balance Control (Unbalanced) ###");
const unbalancedCheck = bst.isBalanced();
console.log(`Is the tree balanced? ${unbalancedCheck ? 'YES' : 'NO'}`);


console.log("\n### 7. Rebalancing ###");
bst.rebalance();
bst.prettyPrint();

console.log("\n### 8. Balance Control (Balanced) ###");
const rebalancedCheck = bst.isBalanced();
console.log(`Is the tree balanced? ${rebalancedCheck ? 'YES' : 'NO'}`);

console.log("\n### 9. Tree Crossings (After Rebalance) ###");
printTraversal('levelOrderForEach');
printTraversal('preOrderForEach');
printTraversal('postOrderForEach');
printTraversal('inOrderForEach');
console.log("======================================");