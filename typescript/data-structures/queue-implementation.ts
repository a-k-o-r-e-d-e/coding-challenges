/// Implementing a Queue in Typescript

/** Queue Implemented using an array underneath */
export class ArrayQueue<T> {
  public constructor(private elements: T[] = [], private head: number = 0) {}

  public enqueue(element: T): void {
    this.elements.push(element);
  }

  public dequeue(): T {
    const item = this.elements[this.head];
    this.head++;

    if (this.isEmpty) {
      this.resetQueue();
    }

    return item;
  }

  public peekFront(): T {
    return this.elements[this.head];
  }

  public peekBack(): T {
    return this.elements[this.elements.length - 1];
  }

  public get length(): number {
    return this.elements.length - this.head;
  }

  public get isEmpty(): boolean {
    return this.length === 0;
  }

  private resetQueue(): void {
    this.head = 0;
    this.elements = [];
  }

  printQueue(): void {
    console.log(this.elements);
  }
}

// Function to generate binary numbers
function generatePrintBinary(n: number) {
  // create an empty queue of strings
  var queue = new ArrayQueue<string>();

  // Enqueue the first binary number
  queue.enqueue("1");

  // This loop is like BFS of a tree with 1 as root
  while (n-- > 0) {
    // print the front of the queue
    var s1 = queue.dequeue()!;
    console.log(s1);

    // store s1 before changing it
    var s2 = s1;

    /// append "0" to s1 and enqueue it
    queue.enqueue(s1 + "0");

    // Append "1" to s2 and enqueue it.
    // Note that s2 contains the previous front
    queue.enqueue(s2 + "1");
  }
}

// calling the above function
// prints [1 10 11 100 101]
// generatePrintBinary(5);

// Our Original Queue makes use of an Array
// This method can be quite expensive so lets try to an implement an array without having to call shift()
type Node<T> = {
  data: T;
  next?: Node<T>;
};
/** Queue Implemented using a linked list underneath */
export class LinkedListQueue<T> {
  private head?: Node<T>;
  private tail?: Node<T>;
  length = 0;

  enqueue(data: T) {
    this.length++;
    const node = { data, next: undefined };
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    this.tail!.next = node;
    this.tail = node;
  }

  peek(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    return this.head.data;
  }

  deque() {
    this.length--;
    if (!this.head) {
      return;
    }

    const node = this.head;
    this.head = this.head.next;
    node.next = undefined;
  }

  isEmpty(): boolean {
    return this.length == 0;
  }

  printQueue(): void {
    // Start from the head
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.data);
      currentNode = currentNode.next;
    }
  }
}
