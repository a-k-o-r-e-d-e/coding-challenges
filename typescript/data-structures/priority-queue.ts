/**
 *  A priority queue is a priority based work-list of elements.
 *
 * The queue allows adding elements, and removing them again in priority order.
 * The same object can be added to the queue more than once.
 * There is no specified ordering for objects with the same priority
 * (where the `comparison` function returns zero).
 *
 * Operations which care about object equality, [contains] and [remove],
 * use [===] for testing equality.
 */
abstract class PriorityQueueContract<E> {
  /**Number of elements in the queue */
  public abstract get length(): number;

  /** Whether the queue is empty.*/
  public abstract get isEmpty(): boolean;

  /** Whether the queue has any elements. */
  public abstract get isNotEmpty(): boolean;

  /** Checks if [object] is in the queue.
   *
   * Returns true if the element is found.
   *
   * Uses the [Object.==] of elements in the queue to check
   * for whether they are equal to [object].
   * Equal objects objects must have the same priority
   * according to the [comparison] function.
   * That is, if `a == b` then `comparison(a, b) == 0`.
   * If that is not the case, this check might fail to find
   * an object.
   */
  public abstract contains(object: E): boolean;

  /**  Adds element to the queue.
   *
   * The element will become the next to be removed by [removeFirst]
   * when all elements with higher priority have been removed.
   */
  public abstract add(element: E): void;

  /** Adds all [elements] to the queue.*/
  public abstract addAll(elements: Iterable<E>): void;

  /** Returns the next element that will be returned by [removeFirst].
   *
   * The element is not removed from the queue.
   *
   * The queue must not be empty when this method is called.
   */
  public abstract get first(): E;

  /** Removes and returns the element with the highest priority.
   *
   * Repeatedly calling this method, without adding element in between,
   * is guaranteed to return elements in non-decreasing order as, specified by
   * [comparison].
   *
   * The queue must not be empty when this method is called.
   */
  public abstract removeFirst(): E;

  /** Removes an element of the queue that compares equal to [element].
   *
   * Returns true if an element is found and removed,
   * and false if no equal element is found.
   *
   * If the queue contains more than one object equal to [element],
   * only one of them is removed.
   *
   * Uses the [Object.==] of elements in the queue to check
   * for whether they are equal to [element].
   * Equal objects objects must have the same priority
   * according to the [comparison] function.
   * That is, if `a == b` then `comparison(a, b) == 0`.
   * If that is not the case, this check might fail to find
   * an object.
   */
  public abstract remove(element: E): boolean;

  /** Removes all the elements from this queue and returns them.
   *
   * The returned iterable has no specified order.
   */
  public abstract removeAll(): Iterable<E>;

  /** Removes all the elements from this queue. */
  public abstract clear(): void;

  /** Returns a list of the elements of this queue in priority order.
   *
   * The queue is not modified.
   *
   * The order is the order that the elements would be in if they were
   * removed from this queue using [removeFirst].
   */
  public abstract toList(): Array<E>;
}

/** Heap based priority queue.
 *
 * The elements are kept in a heap structure,
 * where the element with the highest priority is immediately accessible,
 * and modifying a single element takes
 * logarithmic time in the number of elements on average.
 *
 * - The [add] and [removeFirst] operations take amortized logarithmic time,
 *   O(log(n)), but may occasionally take linear time when growing the capacity
 *   of the heap.
 * - The [addAll] operation works as doing repeated [add] operations.
 * - The [first] getter takes constant time, O(1).
 * - The [clear] and [removeAll] methods also take constant time, O(1).
 * - The [contains] and [remove] operations may need to search the entire
 *   queue for the elements, taking O(n) time.
 * - The [toList] operation effectively sorts the elements, taking O(n*log(n))
 *   time.
 * - The [toUnorderedList] operation copies, but does not sort, the elements,
 *   and is linear, O(n).
 * - The [toSet] operation effectively adds each element to the new set, taking
 *   an expected O(n*log(n)) time.
 */
class HeapPriorityQueue<E> implements PriorityQueueContract<E> {
  /** Initial capacity of a queue when created, or when added to after a
   * [clear].
   *
   * Number can be any positive value. Picking a size that gives a whole
   * number of "tree levels" in the heap is only done for aesthetic reasons.
   */
  private static readonly initialCapacity = 7;

  readonly comparator: Comparator<E>;

  /**Array Implementation of a heap */
  private queue: Array<E | null> = Array<E | null>(
    HeapPriorityQueue.initialCapacity
  ).fill(null);

  /**
   * Number of elements in queue.
   *
   * The heap is implemented in the first [_length] entries of [_queue].
   */
  private _length = 0;

  /**
   * Modification count.
   * Used to detect concurrent modifications during iteration.
   */
  private modificationCount = 0;

  constructor(comparator: Comparator<E>) {
    this.comparator = comparator;
  }

  private elementAt(index: number): E {
    return this.queue[index]!;
  }

  add(element: E): void {
    this.modificationCount++;
    this._add(element);
  }

  addAll(elements: Iterable<E>): void {
    var modified = 0;
    for (let element of elements) {
      modified = 1;
      this._add(element);
    }
    this.modificationCount += modified;
  }

  clear(): void {
    this.modificationCount++;
    this.queue = [];
    this._length = 0;
  }

  contains(object: E): boolean {
    return this._locate(object) >= 0;
  }

  get first(): E {
    if (this._length == 0) throw Error("No element");
    return this.elementAt(0);
  }

  get isEmpty(): boolean {
    return this._length === 0;
  }

  get isNotEmpty(): boolean {
    return this._length != 0;
  }

  get length(): number {
    return this._length;
  }

  remove(element: E): boolean {
    let index = this._locate(element);
    if (index < 0) return false;
    this.modificationCount++;
    let last = this.removeLast();
    if (index < this.length) {
      let comp = this.comparator(last, element);
      if (comp <= 0) {
        this.bubbleUp(last, index);
      } else {
        this.bubbleDown(last, index);
      }
    }
    return true;
  }

  /**
   * Removes all the elements from this queue and returns them.
   * The returned iterable has no specified order.
   * The operation does not copy the elements,
   * but instead keeps them in the existing heap structure,
   * and iterates over that directly.
   */
  removeAll(): Iterable<E> {
    this.modificationCount++;
    let result = this.queue;
    let length = this.length;
    this.queue = [];
    this._length = 0;

    return result.slice(0, length) as E[];
  }

  removeFirst(): E {
    if (this.length == 0) throw Error("No element in queue");
    this.modificationCount++;
    let result = this.elementAt(0);
    var last = this.removeLast();
    if (this.length > 0) {
      this.bubbleDown(last, 0);
    }
    return result;
  }

  toList(): Array<E> {
    return this._toUnorderedList().sort(this.comparator);
  }

  private _toUnorderedList(): Array<E> {
    return Array.from({ length: this.length }, (_, i) => this.elementAt(i));
  }

  /** Returns some representation of the queue.
   *
   * The format isn't significant, and may change in the future.
   */
  toString(): string {
    // for (let i = 0; i < this.length; i++) {
    //   console.log(this.queue[i]);
    // }
    return this.queue.slice(0, this.length).toString();
  }

  /**
   * Add element to the queue.
   * Grows the capacity if the backing list is full.
   */
  private _add(element: E): void {
    if (this.length == this.queue.length) this.grow();
    this.bubbleUp(element, this._length++);
  }

  /**
   * Find the index of an object in the heap.
   *
   * Returns -1 if the object is not found.
   *
   * A matching object, `o`, must satisfy that
   * `comparison(o, object) == 0 && o == object`.
   */
  private _locate(object: E): number {
    if (this.length == 0) return -1;
    // Count positions from one instead of zero. This gives the numbers
    // some nice properties. For example, all right children are odd,
    // their left sibling is even, and the parent is found by shifting
    // right by one.
    // Valid range for position is [1.._length], inclusive.
    let position = 1;
    // Pre-order depth first search, omit child nodes if the current
    // node has lower priority than [object], because all nodes lower
    // in the heap will also have lower priority.
    do {
      var index = position - 1;
      var element = this.elementAt(index);
      var comp = this.comparator(element, object);
      if (comp <= 0) {
        if (comp == 0 && element == object) return index;
        // Element may be in subtree.
        // Continue with the left child, if it is there.
        var leftChildPosition = position * 2;
        if (leftChildPosition <= this.length) {
          position = leftChildPosition;
          continue;
        }
      }
      // Find the next right sibling or right ancestor sibling.
      do {
        while (position % 2 !== 0) {
          // While position is a right child, go to the parent.
          position >>= 1;
        }
        // Then go to the right sibling of the left-child.
        position += 1;
      } while (position > this.length); // Happens if last element is a left child.
    } while (position != 1); // At root again. Happens for right-most element.
    return -1;
  }

  private removeLast(): E {
    let newLength = this.length - 1;
    let last = this.elementAt(newLength);
    this.queue[newLength] = null;
    this._length = newLength;
    return last;
  }

  /**
   * Place [element] in heap at [index] or above.
   *
   * Put element into the empty cell at `index`.
   * While the `element` has higher priority than the
   * parent, swap it with the parent.
   */
  private bubbleUp(element: E, index: number): void {
    while (index > 0) {
      let parentIndex = Math.trunc((index - 1) / 2);
      var parent = this.elementAt(parentIndex);
      if (this.comparator(element, parent) > 0) break;
      this.queue[index] = parent;
      index = parentIndex;
    }
    this.queue[index] = element;
  }

  /**
   * Place [element] in heap at [index] or above.
   *
   * Put element into the empty cell at `index`.
   * While the `element` has lower priority than either child,
   * swap it with the highest priority child.
   */
  private bubbleDown(element: E, index: number): void {
    let rightChildIndex = index * 2 + 2;
    while (rightChildIndex < this.length) {
      let leftChildIndex = rightChildIndex - 1;
      let leftChild = this.elementAt(leftChildIndex);
      let rightChild = this.elementAt(rightChildIndex);
      let comp = this.comparator(leftChild, rightChild);
      let minChildIndex: number;
      let minChild: E;
      if (comp < 0) {
        minChild = leftChild;
        minChildIndex = leftChildIndex;
      } else {
        minChild = rightChild;
        minChildIndex = rightChildIndex;
      }
      comp = this.comparator(element, minChild);
      if (comp <= 0) {
        this.queue[index] = element;
        return;
      }
      this.queue[index] = minChild;
      index = minChildIndex;
      rightChildIndex = index * 2 + 2;
    }
    var leftChildIndex = rightChildIndex - 1;
    if (leftChildIndex < this.length) {
      var child = this.elementAt(leftChildIndex);
      var comp = this.comparator(element, child);
      if (comp > 0) {
        this.queue[index] = child;
        index = leftChildIndex;
      }
    }
    this.queue[index] = element;
  }

  /**
   * Grows the capacity of the list holding the heap.
   *
   * Called when the list is full.
   */
  private grow(): void {
    let newCapacity = this.queue.length * 2 + 1;
    if (newCapacity < HeapPriorityQueue.initialCapacity)
      newCapacity = HeapPriorityQueue.initialCapacity;
    let newQueue = Array<E | null>(newCapacity).fill(null);

    for (let index in this.queue) {
      newQueue[index] = this.queue[index];
    }

    this.queue = newQueue;
  }
}

type Comparator<E> = (a: E, b: E) => number;
// class PriorityQueue<T> {
//   private readonly top = 0;
//   private heap: T[] = [];
//   private comparator: Comparator<T>;

//   constructor(comparator: Comparator<T>) {
//     this.comparator = comparator;
//   }

//   size() {
//     return this.heap.length;
//   }

//   isEmpty() {
//     return this.size() == 0;
//   }

//   peak() {
//     if (!this.isEmpty()) {
//       return this.heap[this.top];
//     }
//   }

//   add(...values: T[]) {
//     values.forEach((value) => {
//       this.heap.push(value);
//       this.bubbleUp();
//     });
//     return this.size();
//   }

//   pop() {
//     const poppedValue = this.peak();
//     const bottom = this.size() - 1;
//     if (bottom > this.top) {
//       this.swap(this.top, bottom);
//     }
//     this.heap.pop();
//     this.sinkDown();
//     return poppedValue;
//   }

//   replace(value: T) {
//     const replacedvalue = this.peak();
//     this.heap[this.top];
//     value;
//     this.sinkDown();
//     return replacedvalue;
//   }

//   printQueue() {
//     console.log(this.heap);
//   }

//   private greater(i: number, j: number): boolean {
//     return this.comparator(this.heap[i], this.heap[j]) > 0;
//   }

//   private swap(i: number, j: number) {
//     const temp = this.heap[i];
//     this.heap[i] = this.heap[j];
//     this.heap[j] = temp;
//   }

//   private bubbleUp() {
//     let node = this.size() - 1;
//     while (node > this.top && this.greater(node, this.parentIndex(node))) {
//       this.swap(node, this.parentIndex(node));
//       node = this.parentIndex(node);
//     }
//   }

//   private sinkDown() {
//     let currentNodeIndex = this.top;
//     while (
//       (this.leftChildIndex(currentNodeIndex) < this.size() &&
//         this.greater(
//           this.leftChildIndex(currentNodeIndex),
//           currentNodeIndex
//         )) ||
//       (this.rightChildIndex(currentNodeIndex) < this.size() &&
//         this.greater(this.rightChildIndex(currentNodeIndex), currentNodeIndex))
//     ) {
//       let indexOfMaxChild =
//         this.rightChildIndex(currentNodeIndex) < this.size() &&
//         this.greater(
//           this.rightChildIndex(currentNodeIndex),
//           this.leftChildIndex(currentNodeIndex)
//         )
//           ? this.rightChildIndex(currentNodeIndex)
//           : this.leftChildIndex(currentNodeIndex);
//       this.swap(currentNodeIndex, indexOfMaxChild);
//       currentNodeIndex = indexOfMaxChild;
//     }
//   }

//   private parentIndex(i: number) {
//     return ((i + 1) >>> 1) - 1;
//   }

//   private leftChildIndex(i: number) {
//     return (i << 1) + 1;
//   }

//   private rightChildIndex(i: number) {
//     return (i + 1) << 1;
//   }
// }

export default HeapPriorityQueue;
