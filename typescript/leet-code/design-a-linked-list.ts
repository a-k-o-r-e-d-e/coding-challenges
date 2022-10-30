/**
 * Design your implementation of the linked list. You can choose to use a singly or doubly linked list.
 * A node in a singly linked list should have two attributes: val and next.
 *  val is the value of the current node, and next is a pointer/reference to the next node.
 * If you want to use the doubly linked list, you will need one more attribute prev to indicate the previous node in the linked list.
 * Assume all nodes in the linked list are 0-indexed.
 *
 * Implement the MyLinkedList class:
 *      MyLinkedList() Initializes the MyLinkedList object.
 *      int get(int index) Get the value of the indexth node in the linked list. If the index is invalid, return -1.
 *      void addAtHead(int val) Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 *      void addAtTail(int val) Append a node of value val as the last element of the linked list.
 *      void addAtIndex(int index, int val) Add a node of value val before the indexth node in the linked list. If index equals the length of the linked list, the node will be appended to the end of the linked list. If index is greater than the length, the node will not be inserted.
 *      void deleteAtIndex(int index) Delete the indexth node in the linked list, if the index is valid.
 *
 * Example 1:
 * Input
 *      ["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
 *      [[], [1], [3], [1, 2], [1], [1], [1]]
 *
 * Output
 *      [null, null, null, null, 2, null, 3]
 *
 * Explanation
 *      MyLinkedList myLinkedList = new MyLinkedList();
 *      myLinkedList.addAtHead(1);
 *      myLinkedList.addAtTail(3);
 *      myLinkedList.addAtIndex(1, 2);    // linked list becomes 1->2->3
 *      myLinkedList.get(1);              // return 2
 *      myLinkedList.deleteAtIndex(1);    // now the linked list is 1->3
 *      myLinkedList.get(1);              // return 3
 *
 *
 * Constraints:
 *      0 <= index, val <= 1000
 *      Please do not use the built-in LinkedList library.
 *      At most 2000 calls will be made to get, addAtHead, addAtTail, addAtIndex and deleteAtIndex.
 *
 */

abstract class LinkedList {
  protected abstract head?: MyListNode;

  constructor() {}

  abstract get(index: number): number;

  abstract addAtHead(val: number): void;

  abstract addAtTail(val: number): void;

  abstract addAtIndex(index: number, val: number): void;

  abstract deleteAtIndex(index: number): void;

  printList() {
    let list = [];
    let curr = this.head;
    while (curr) {
      list.push(curr.val);
      curr = curr.next;
    }

    console.log(list.reverse());
  }
}

class MySinglyLinkedList extends LinkedList {
  protected head?: MyListNode;

  constructor() {
    super();
  }

  get(index: number): number {
    let curr = this.head;
    for (let i = 0; i < index; ++i) {
      if (!curr) {
        return -1;
      }
      curr = curr.next;
    }

    return !curr ? -1 : curr.val;
  }

  addAtHead(val: number): void {
    let node = new MyListNode(val);
    node.next = this.head;
    this.head = node;
  }

  addAtTail(val: number): void {
    let node = new MyListNode(val);
    if (!this.head) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
  }

  addAtIndex(index: number, val: number): void {
    if (index == 0) {
      this.addAtHead(val);
    } else {
      let node = new MyListNode(val);
      let indexPrev = this.getIndexPrev(index);
      if (!indexPrev) {
        return;
      }
      let nodeAtIndex = indexPrev?.next;
      indexPrev.next = node;
      node.next = nodeAtIndex;
    }
  }

  deleteAtIndex(index: number): void {
    if (index == 0) {
      this.head = this.head?.next;
    } else {
      let indexPrev = this.getIndexPrev(index);
      if (!indexPrev) {
        return;
      }
      let nodeAtIndex = indexPrev.next;
      indexPrev.next = nodeAtIndex?.next;
    }
  }

  private getIndexPrev(index: number): MyListNode | undefined {
    let curr = this.head;
    for (let i = 0; i < index - 1; ++i) {
      if (!curr) {
        return;
      }
      curr = curr.next;
    }
    return curr;
  }
}

class MyListNode {
  val: number;
  next?: MyListNode;
  prev?: MyListNode;

  constructor(val: number) {
    this.val = val;
  }
}

class MyDoublyLinkedList extends LinkedList {
  protected head?: MyListNode;

  constructor() {
    super();
  }

  get(index: number): number {
    let curr = this.head;
    for (let i = 0; i < index; ++i) {
      if (!curr) {
        return -1;
      }
      curr = curr.next;
    }

    return !curr ? -1 : curr.val;
  }

  addAtHead(val: number): void {
    let new_head = new MyListNode(val);
    if (!this.head) {
      this.head = new_head;
    } else {
      let curr_head = this.head;
      curr_head.prev = new_head;
      new_head.next = curr_head;
      this.head = new_head;
    }
  }

  addAtTail(val: number): void {
    if (!this.head) {
      this.addAtHead(val);
    } else {
      let node = new MyListNode(val);
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      node.prev = curr;
      curr.next = node;
    }
  }

  addAtIndex(index: number, val: number): void {
    if (index == 0) {
      this.addAtHead(val);
    } else {
      let prevNode = this.getPrevNode(index);
      // console.log(nodeAtIndex);
      if (!prevNode) {
        return;
      }
      let nodeAtIndex = prevNode?.next;
      // let prevNode = nodeAtIndex.prev;
      if (!prevNode) {
        this.addAtHead(val);
      }
        else {
        let new_node = new MyListNode(val);
        new_node.next = nodeAtIndex;
        new_node.prev = prevNode;
        prevNode.next = new_node;
        if (nodeAtIndex)
        nodeAtIndex.prev = new_node;
      }
    }
  }

  private deleteAtHead(): void {
    this.head = this.head?.next;
    if (this.head) {
      this.head.prev = undefined;
    }
  }

  deleteAtIndex(index: number): void {
    if (index == 0) {
      this.deleteAtHead();
    } else {
      let nodeAtIndex = this.getNodeAtIndex(index);
      if (!nodeAtIndex) {
        return;
      }

      let prev_node = nodeAtIndex.prev;
      let next_node = nodeAtIndex.next;

      if (!prev_node) {
        this.deleteAtHead();
      } else if (!next_node) {
        // delete at tail
        prev_node.next = next_node;
      } else {
        prev_node.next = next_node;
        next_node.prev = prev_node;
      }
    }
  }

  private getNodeAtIndex(index: number): MyListNode | undefined {
    let curr = this.head;
    for (let i = 0; i < index; i++) {
      if (!curr) {
        return;
      }
      curr = curr.next;
    }
    return curr;
  }

  private getPrevNode(index: number): MyListNode | undefined {
    let curr = this.head;
    for (let i = 0; i < index - 1; ++i) {
      if (!curr) {
        return;
      }
      curr = curr.next;
    }
    return curr;
  }

  printList() {
    let list = [];
    let curr = this.head;
    while (curr) {
      list.push(curr.val);
      curr = curr.next;
    }

    console.log(list);
  }
}

function example_demo1(myLinkedList: LinkedList) {
  //  Your MyLinkedList object will be instantiated and called as such:
  myLinkedList.addAtHead(1);
  myLinkedList.addAtTail(3);
  myLinkedList.printList();
  myLinkedList.addAtIndex(1, 2); // linked list becomes 1->2->3
  myLinkedList.printList();
  console.log(myLinkedList.get(1)); // return 2
  myLinkedList.deleteAtIndex(0); // now the linked list is 1->3
  myLinkedList.printList();
  console.log(myLinkedList.get(0)); // return 3
}

function example_demo2(myLinkedList: LinkedList) {
  myLinkedList.addAtHead(1);
  myLinkedList.addAtTail(3);
  myLinkedList.printList();
  myLinkedList.addAtIndex(1, 2); // linked list becomes 1->2->3
  myLinkedList.printList();
  console.log(myLinkedList.get(1)); // return 2
  myLinkedList.deleteAtIndex(0); // now the linked list is 1->3
  myLinkedList.printList();
  console.log(myLinkedList.get(0)); // return 3
}

function example_demo3(myLinkedList: LinkedList) {
  myLinkedList.addAtIndex(0, 10); // linked list becomes 10
  myLinkedList.printList();
  myLinkedList.addAtIndex(0, 20); // linked list becomes 20->10
  myLinkedList.printList();
  myLinkedList.addAtIndex(1, 30); // linked list becomes 20->30->10
  myLinkedList.printList();
  console.log(myLinkedList.get(0)); // return 20
}

function example_demo4(myLinkedList: LinkedList) {
  myLinkedList.addAtHead(7); // linked list becomes 7
  myLinkedList.addAtHead(2); // linked list becomes 2->7
  myLinkedList.addAtHead(1); // linked list becomes 1->2->7
  myLinkedList.printList();
  myLinkedList.addAtIndex(3, 0); // linked list becomes 1->2->7->0
  myLinkedList.printList();
  myLinkedList.deleteAtIndex(2); // linked list becomes 1->2->0
  myLinkedList.printList();
  myLinkedList.addAtHead(6); // linked list becomes 6->1->2->0
  myLinkedList.printList();
  myLinkedList.addAtTail(4); // linked list becomes 6->1->2->0->4
  myLinkedList.printList();
  console.log(myLinkedList.get(4)); // return 4
  myLinkedList.addAtIndex(5, 0); // linked list becomes 6->1->2->0->4->0
  myLinkedList.printList();
  myLinkedList.addAtHead(6); // linked list becomes 6->6->1->2->0->4->0
  myLinkedList.printList();
}


example_demo3(new MyDoublyLinkedList());

export {};
