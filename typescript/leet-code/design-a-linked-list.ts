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
class MyLinkedList {
  private head?: ListNode;

  constructor() {}

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
    let node = new ListNode(val);
    node.next = this.head;
    this.head = node;
  }

  addAtTail(val: number): void {
    let node = new ListNode(val);
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
        this.addAtHead(val)
    } else {
        let node = new ListNode(val);
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

  private getIndexPrev(index: number): ListNode | undefined {
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

class ListNode {
  val: number;
  next?: ListNode;

  constructor(val: number) {
    this.val = val;
  }
}


function example_demo1() {
  //  Your MyLinkedList object will be instantiated and called as such:
  let myLinkedList = new MyLinkedList();
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


function example_demo2() {
  let myLinkedList = new MyLinkedList();
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

function example_demo3 () {
    let myLinkedList = new MyLinkedList();
myLinkedList.addAtIndex(0, 10); // linked list becomes 10
myLinkedList.printList();
myLinkedList.addAtIndex(0, 20); // linked list becomes 20->10
myLinkedList.printList();
myLinkedList.addAtIndex(1, 30); // linked list becomes 20->30->10
myLinkedList.printList();
console.log(myLinkedList.get(0)); // return 20
}

example_demo3()

export {};
