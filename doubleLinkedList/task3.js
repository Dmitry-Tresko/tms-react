class Node {
    constructor(data) {
        this.data = data;

        this.previous = null;
        this.next = null;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(value) {
        if (!this.head) {
            const newNode = new Node(value);

            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this._addToNode(this.tail, value);

        return this;
    }

    _addToNode(parentNode, value) {
        if (!parentNode.next) {
            const node = new Node(value);

            parentNode.next = node;
            node.previous = parentNode;
            this.tail = node;

            return;
        }

        this._addToNode(parentNode.next, value);
    }

    getNode(value) {
        let currentNode = this.head;

        while (currentNode.data != value) {
            if (currentNode.next == null) {
                console.log(`No "${value}" node found in list`);
                return;
            }

            currentNode = currentNode.next;
        }

        return currentNode;
    }

    traverse(order = true) {
        if (order) {
            return this._printStartToEnd(this.head);
        }

        return this._printEndToStart(this.tail);
    }

    _printStartToEnd(node) {
        if (!node) {
            return '';
        }

        const arrow = node === this.head ? '' : '->';

        return `${arrow} ${node.data} ${this._printStartToEnd(node.next)}`;
    }

    _printEndToStart(node) {
        if (!node) {
            return '';
        }

        const arrow = node === this.tail ? '' : '->';

        return `${arrow} ${node.data} ${this._printEndToStart(node.previous)}`;
    }

    addAfter(value, parentNode) {
        const newNode = new Node(value);
        const nextNode = parentNode.next;

        parentNode.next = newNode;
        nextNode.previous = newNode;

        newNode.next = nextNode;
        nextNode.previous = parentNode;

        return this;
    }

    delete(value) {
        let currentNode = this.head;

        while (currentNode.data != value) {
            if (currentNode.next == null) {
                console.log(`No "${value}" node found in list`);
                return;
            }

            currentNode = currentNode.next;
        }

        if (currentNode.previous == null) {
            this.head = currentNode.next;
            this.head.previous = null;

            return this;
        }

        if (currentNode.next == null) {
            this.tail = currentNode.previous;
            this.tail.next = null;

            return this;
        }

        const previousNode = currentNode.previous;
        const nextNode = currentNode.next;

        currentNode.previous = null;
        currentNode.next = null;

        previousNode.next = nextNode;
        nextNode.previous = previousNode;

        return this;
    }

    isExist(value) {
        let currentNode = this.head;

        while (currentNode.data != value) {
            if (currentNode.next === null)
                return false;

            currentNode = currentNode.next;
        }

        return true;
    }
}

const dll = new DoubleLinkedList();

dll.add(1).add(4).add(10).add(5);
console.log(`Default list: ${dll.traverse()}`);