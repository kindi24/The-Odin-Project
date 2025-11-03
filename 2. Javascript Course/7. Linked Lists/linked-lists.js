import Node from "./node.js"

export default class LinkedList {

    constructor() {
        this.listHead = null;
    }

    append(value) {
        if (this.listHead == null) {
            this.prepend(value);
        } else {
            let temp = this.listHead;

            while(temp.nextNode != null) {
                temp = temp.nextNode;
            }

            temp.nextNode = new Node(value);
        }
    }

    prepend(value) {
        const newNode = new Node(value);
        newNode.nextNode = this.listHead; 
        this.listHead = newNode;          
    }

    size() {
        let counter = 0;
        let temp = this.listHead;
        
        while(temp != null) {
            temp = temp.nextNode; 
            counter++;
        }

        return counter;
    }

    head() {
        return this.listHead;
    }

    tail() {
        let temp = this.listHead;

        if (temp === null) return null;

        while(temp.nextNode != null) {
            temp = temp.nextNode;
        }

        return temp;
    }

    at(index){
        let temp = this.listHead;

        for(let i = 0; i < index; i++) {
            if (temp === null) return "There is no node with this index";
            temp = temp.nextNode;
        }

        if (temp === null) return "There is no node with this index";
        return temp;
    }

    pop() {
        if (this.listHead === null) return; 

        if (this.listHead.nextNode === null) {
            this.listHead = null;
            return;
        }

        let current = this.listHead;
        let previous = null;

        while(current.nextNode != null) {
            previous = current;
            current = current.nextNode;
        }

        previous.nextNode = null;
    }

    contains(value) {
        let temp = this.listHead;

        while(temp != null) {
            if(temp.value === value) {
                return true;
            }
            temp = temp.nextNode;
        }

        return false;
    }

    find(value) {
        let counter = 0;
        let temp = this.listHead;

        while(temp != null) {
            if(temp.value === value) {
                return counter;
            }
            temp = temp.nextNode;
            counter++;
        }

        return null;
    }

    toString() {
        let temp = this.listHead;
        let stringList = ""; 

        while(temp != null) {
            stringList += `( ${temp.value} )`; 
            
            if (temp.nextNode != null) {
                stringList += " -> ";
            }
            
            temp = temp.nextNode; 
        }

        return stringList + " -> null";
    }

    insertAt(value, index) {
        if (index === 0 || this.listHead === null) {
            this.prepend(value);
            return;
        }

        let current = this.listHead;
        let previous = null;
        let counter = 0;

        while (current !== null && counter < index) {
            previous = current;
            current = current.nextNode;
            counter++;
        }
        
        const newNode = new Node(value);
        if (previous !== null) {
            previous.nextNode = newNode;
            newNode.nextNode = current;
        }
    }

    removeAt(index) {
        if (this.listHead == null) return "List is empty";

        if (index === 0) {
            this.listHead = this.listHead.nextNode;
            return;
        }

        let current = this.listHead;
        let previous = null;

        for(let i = 0; i < index; i++) {
            previous = current;
            current = current.nextNode;

            if(current == null) return "There is no item for this index";
        }
        
        previous.nextNode = current.nextNode;
    }
}