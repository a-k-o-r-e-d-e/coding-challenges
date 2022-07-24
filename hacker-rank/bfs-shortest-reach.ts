// Queue class
class Queue<T> {
  // Array is used to implement a Queue
  private items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length == 0;
  }

  printQueue(): void {
    console.log(this.items);
  }
}

/*
 * Complete the 'bfs' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 *  4. INTEGER s
 */

function bfs(
  noOfNodes: number,
  noOfEdges: number,
  edges: number[][],
  startingNode: number
): number[] {
  let adjList = new Map<number, number[]>();

  let distances = Array(noOfNodes).fill(-1);
  distances[startingNode - 1] = 0;

  // Add vertices
  for (let i = 0; i < noOfNodes; i++) {
    adjList.set(i, []);
  }

  // Add edges
  for (let k = 0; k < noOfEdges; k++) {
    let [u, v] = edges[k];
    // get the list for vertex v and put the vertex w denoting edge between v and w
    adjList.get(u)?.push(v);

    // Since graph is undirected, add an edge from w to v also
    adjList.get(v)?.push(u);
  }

  /// proper breadth first search starts here
  /// create the visited object, stores nodes that have been visited
  let visited = new Map<number, boolean>();

  let queue = new Queue<number>();

  // add the starting node to the queue
  visited.set(startingNode, true);
  queue.enqueue(startingNode);

  // loop while queue is empty
  while (!queue.isEmpty()) {
    // get the element from the queue
    let getQueueElement = queue.dequeue()!;

    // passing the current vertex to the callback function
    // console.log(getQueueElement);

    // get the adjacent list for the current vertex
    let get_list = adjList.get(getQueueElement)!;
    // console.log("Adj List", get_list);
    // loop through the list and add the element to the
    // queue if it is not processed yet
    for (let i = 0; i < get_list?.length; i++) {
      let child = get_list[i];

      if (!visited.get(child)) {
        visited.set(child, true);
        queue.enqueue(child);
        const distanceToParent = distances[getQueueElement - 1];
        if (distanceToParent != -1) {
          distances[child - 1] = distanceToParent + 6;
        }
      }
    }
  }

  distances.splice(startingNode - 1, 1);
  return distances;
}

console.log(bfs(5, 3, [[1, 2], [1, 3], [3, 4]], 1));
console.log(bfs(4, 2, [[1, 2], [1, 3]], 1));
console.log(bfs(3, 1, [[2, 3]], 2));