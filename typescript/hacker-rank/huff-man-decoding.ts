// abstract class Node {
//   frequency: number;
//   data?: string;
//   left?: Node;
//   right?: Node;

//   constructor(freq: number) {
//     this.frequency = freq;
//   }

//   /// compares on the frequency
//   compareTo(tree: Node): number {
//     return this.frequency - tree.frequency;
//   }
// }

// class HuffmanLeaf extends Node {
//   constructor(freq: number, val: string) {
//     super(freq);
//     this.data = val;
//   }
// }

// class HuffmanNode extends Node {
//   constructor(left: Node, right: Node) {
//     super(left.frequency + right.frequency);
//     this.left = left;
//     this.right = right;
//   }
// }

// class QueueElement<T> {
//   element: T;
//   priority: number;

//   constructor(element: T, priority: number) {
//     this.element = element;
//     this.priority = priority;
//   }
// }

// class PriorityQueue<T> {
//   private items: QueueElement<T>[] = [];

//   enqueue(element: T, priority: number) {
//     let queueElement = new QueueElement(element, priority);
//     let contain = false;

//     for (let i = 0; i < this.items.length; i++) {
//       if (this.items[i].priority > queueElement.priority) {
//         this.items.splice(i, 0, queueElement);
//         contain = true;
//         break;
//       }
//     }

//     // If the input element has the highest priority, push it to the end of the queue
//     if (!contain) {
//       this.items.push(queueElement);
//     }
//   }

//   /*returns the element removed from the priority queue*/
//   dequeue() {
//     return this.items.shift();
//   }

//   /// returns the highest priority queue element without removing it
//   front() {
//     if (!this.isEmpty()) {
//       return this.items[0];
//     }
//   }

//   /* returns the lowest priority queue element without removing it. */
//   rear() {
//     if (!this.isEmpty()) {
//       return this.items[this.items.length - 1];
//     }
//   }

//   isEmpty() {
//     return this.items.length === 0;
//   }

//   printQueue() {
//     let queueString = "";
//     for (let node of this.items) {
//       queueString += node.element + " ";
//     }

//     return queueString;
//   }

//   size() {
//     return this.items.length;
//   }
// }

// // input is an array of frequencies, indexed by character code
// function buildTree(input: string) {

//     // we will assume that all our characters will have
//     // code less than 256, for simplicity
//     const charFreqs: number[]  = Array(256).fill(0);

//     // read each character and record the frequencies
//     for (let c of input.split(''))
//             charFreqs[c]++;


//   // let trees = new PriorityQueue<Node>();
//   let trees = new EfficientPriorityQueue<Node>(
//     {comparator: (a: Node, b: Node) => a.frequency > b.frequency}
//   );

//   /// initially we have a forest of leaves,
//   // One for each non-empty character
//   for (let i = 0; i < charFreqs.length; i++) {
//     if (charFreqs[i] > 0) {
//       trees.push(new HuffmanLeaf(charFreqs[i], String(i)));
//     }
//   }

//   // loop until there is only one tree left
//   while (trees.size() > 1) {
//     // two trees with least frequency
//     let a = trees.pop()!;
//     let b = trees.pop()!;

//     // Push into new node and re-insert into queue
//     trees.push(new HuffmanNode(a, b));
//   }

//   return trees.pop();
// }

// export {};
