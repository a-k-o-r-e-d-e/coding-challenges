class QueueElement<T> {
  element: T;
  priority: number;

  constructor(element: T, priority: number) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue<T> {
  items: QueueElement<T>[] = [];

  enqueue(element: T, priority: number) {
    let queueElement = new QueueElement(element, priority);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > queueElement.priority) {
        this.items.splice(i, 0, queueElement);
        contain = true;
        break;
      }
    }

    // If the input element has the highest priority, push it to the end of the queue
    if (!contain) {
      this.items.push(queueElement);
    }
  }

  /*returns the element removed from the priority queue*/
  dequeue() {
    return this.items.shift();
  }

  /// returns the highest priority queue element without removing it
  front() {
    if (!this.isEmpty()) {
      return this.items[0];
    }
  }

  /* returns the lowest priority queue element without removing it. */
  rear() {
    if (!this.isEmpty()) {
      return this.items[this.items.length - 1];
    }
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printQueue() {
    let queueString = "";
    for (let node of this.items) {
      queueString += node.element + " ";
    }

    return queueString;
  }
}

class EfficientPriorityQueue<T> {
  private readonly top = 0;
  private heap: T[] = [];
  private comparator: (a: T, b: T) => boolean;

  constructor({
    comparator = (a: T, b: T) => a > b,
  }: {
    comparator: (a: T, b: T) => boolean;
  }) {
    this.comparator = comparator;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() == 0;
  }

  peak() {
    if (!this.isEmpty()) {
      return this.heap[this.top];
    }
  }

  push(...values: T[]) {
    values.forEach((value) => {
      this.heap.push(value);
      this.bubbleUp();
    });
    return this.size();
  }

  pop() {
    const poppedValue = this.peak();
    const bottom = this.size() - 1;
    if (bottom > this.top) {
      this.swap(this.top, bottom);
    }
    this.heap.pop();
    this.sinkDown();
    return poppedValue;
  }

  replace(value: T) {
    const replacedvalue = this.peak();
    this.heap[this.top];
    value;
    this.sinkDown();
    return replacedvalue;
  }

  private greater(i: number, j: number) {
    return this.comparator(this.heap[i], this.heap[j]);
  }

  private swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[j]];
  }

  private bubbleUp() {
    let node = this.size() - 1;
    while (node > this.top && this.greater(node, this.parentIndex(node))) {
      this.swap(node, this.parentIndex(node));
      node = this.parentIndex(node);
    }
  }

  private sinkDown() {
    let currentNodeIndex = this.top;
    while (
      (this.leftChildIndex(currentNodeIndex) < this.size() &&
        this.greater(
          this.leftChildIndex(currentNodeIndex),
          currentNodeIndex
        )) ||
      (this.rightChildIndex(currentNodeIndex) < this.size() &&
        this.greater(this.rightChildIndex(currentNodeIndex), currentNodeIndex))
    ) {
      let indexOfMaxChild =
        this.rightChildIndex(currentNodeIndex) < this.size() &&
        this.greater(
          this.rightChildIndex(currentNodeIndex),
          this.leftChildIndex(currentNodeIndex)
        )
          ? this.rightChildIndex(currentNodeIndex)
          : this.leftChildIndex(currentNodeIndex);
      this.swap(currentNodeIndex, indexOfMaxChild);
      currentNodeIndex = indexOfMaxChild;
    }
  }

  private parentIndex(i: number) {
    return ((i + 1) >>> 1) - 1;
  }

  private leftChildIndex(i: number) {
    return (i << 1) + 1;
  }

  private rightChildIndex(i: number) {
    return (i + 1) << 1;
  }
}
