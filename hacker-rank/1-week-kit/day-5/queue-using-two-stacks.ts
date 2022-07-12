"use strict";

/* 

 A queue is an abstract data type that maintains the order in which elements were added to it,
 allowing the oldest elements to be removed from the front and new elements to be added to the rear.
 This is called a First-In-First-Out (FIFO) data structure because the first element added to the queue
 (i.e., the one that has been waiting the longest) is always the first one to be removed.

 A basic queue has the following operations:
    - Enqueue: add a new element to the end of the queue.
    - Dequeue: remove the element from the front of the queue and return it.
 
 In this challenge, you must first implement a queue using two stacks.
 Then process q queries, where each query is one of the following 3 types:
    "1, x": Enqueue element x into the end of the queue.
    "2": Dequeue the element at the front of the queue.
    "3": Print the element at the front of the queue.


 Input Format
 The first line contains a single integer, q, denoting the number of queries.
 Each line i of the q subsequent lines contains a single query in the form described in the problem statement above.
 All three queries start with an integer denoting the query type,
 but only query 1 is followed by an additional space-separated value, x, denoting the value to be enqueued.

 Output Format
 For each query of type 3, print the value of the element at the front of the queue on a new line.

 Example
 "
  10
  1 42
  2
  1 14
  3
  1 28
  3
  1 60
  1 78
  2
  2
 "

 Sample Output
    14
    14
*/

console.log("*****Using an Array*****");
/// Was able to achieve this using one array
function solutionUsingAnArray(input: string) {
  let commands = input.split("\n").slice(1);
  let stack: string[] = [];
  //   console.log("Entries", commands);

  commands.forEach((command) => {
    command = command.trim();
    if (command === "2") {
      // Pop top of the queue
      stack.shift();
    } else if (command == "3") {
      // Peek top of the queue
      console.log(stack[0]);
    } else {
      /// if length of query is more than 1, then it must be an enquue command
      let value = command.split(" ")[1];
      stack.push(value);
    }
  });
}

solutionUsingAnArray(
  "10 \n1 42 \n2 \n1 14 \n3 \n1 28 \n3 \n1 60 \n1 78 \n2 \n2"
);

console.log("*****Using 2 Stacks*****");
class QueueUsing2Stacks<T> {
  #stack1: Stack<T> = new Stack();
  #stack2: Stack<T> = new Stack();

  isEmpty(): boolean {
    return this.#stack1.isEmpty() && this.#stack2.isEmpty();
  }

  size(): number {
    return this.#stack1.size() + this.#stack2.size();
  }

  enqueue(value: T): void {
    this.#stack1.push(value);
    // this.#stack1.printOut("Stack 1");
    // this.#stack2.printOut("Stack 2");
  }

  dequeue(): T | undefined {
    this.#moveStack();
    // console.log("Dequeue Called!!!*******************");
    // this.#stack1.printOut("Stack 1");
    // this.#stack2.printOut("Stack 2");
    return this.#stack2.pop();
  }

  front(): T | undefined {
    this.#moveStack();

    return this.#stack2.peek();
  }

  #moveStack() {
    if (this.#stack2.isEmpty()) {
      while (!this.#stack1.isEmpty()) {
        this.#stack2.push(this.#stack1.pop()!);
      }
    }
  }
}

class Stack<T> {
  #array: T[] = [];

  isEmpty(): boolean {
    return this.#array.length == 0;
  }

  size(): number {
    return this.#array.length;
  }

  push(value: T): void {
    this.#array.push(value);
  }

  pop(): T | undefined {
    return this.#array.pop();
  }

  peek(): T | undefined {
    if (!this.isEmpty()) {
      return this.#array[this.size() - 1];
    }
  }

  printOut(name: string) {
    console.log(`Print ${name} called:: `, this.#array);
  }
}

function solutionUsing2Stacks(input: string) {
  let commands = input.split("\n").slice(1);
  let queue = new QueueUsing2Stacks<string>();
  //   console.log("Entries", commands);

  commands.forEach((command) => {
    command = command.trim();
    if (command === "2") {
      // Pop top of the queue
      queue.dequeue();
    } else if (command == "3") {
      // Peek top of the queue
      console.log(queue.front());
    } else {
        // At this point  it must be an enqueue command
      let value = command.split(" ")[1];
    //   console.log("Enqueue Command", command);
    //   console.log("Value to Push", value);
      queue.enqueue(value);
    }
  });
}

solutionUsing2Stacks(
  "10 \n1 42 \n2 \n1 14 \n3 \n1 28 \n3 \n1 60 \n1 78 \n2 \n2"
);
