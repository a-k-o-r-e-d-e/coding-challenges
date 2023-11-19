/// Implementing a Graph in Typescript
import { ArrayQueue } from "./queue-implementation";

// create a graph class
class Graph<T> {
  private noOfVertices: number;
  private adjList = new Map<T, T[]>();

  constructor(noOfVertices: number) {
    this.noOfVertices = noOfVertices;
  }

  addVertex(v: T) {
    // initialize the adjacent list with an empty array
    this.adjList.set(v, []);
  }

  addEdge(v: T, w: T) {
    // get the list for vertex v and put the vertex w denoting edge between v and w
    this.adjList.get(v)?.push(w);

    // Since graph is undirected, add an edge from w to v also
    this.adjList.get(w)?.push(v);
  }

  // prints the vertex and adjavency list
  printGraph() {
    // get all the vertices
    let get_keys = this.adjList.keys();

    // iterate over the vertices
    for (var i of get_keys) {
      /// get the corresponding adjacency list for the vertex
      let get_values = this.adjList.get(i)!;
      let conc = "";

      // iterate over the adjacency list
      // concentrate the values into a string
      for (var j of get_values) {
        conc += j + "";
      }

      /// print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }

  bfs(startingNode: T) {
    /// create the visited object, stores nodes that have been visited
    let visited = new Map<T, boolean>();

    let queue = new ArrayQueue<T>();

    // add the starting node to the queue
    visited.set(startingNode, true);
    queue.enqueue(startingNode);

    // loop while queue is empty
    while (!queue.isEmpty()) {
      // get the element from the queue
      let getQueueElement = queue.dequeue()!;

      // passing the current vertex to the callback function
      console.log(getQueueElement);

      // get the adjacent list for the current vertex
      let get_list = this.adjList.get(getQueueElement)!;

      // loop through the list and add the element to the
      // queue if it is not processed yet
      for (let i = 0; i < get_list?.length; i++) {
        let child = get_list[i];

        if (!visited.get(child)) {
          visited.set(child, true);
          queue.enqueue(child);
        }
      }
    }
  }

  dfs(startingNode: T) {
    let visitedNodes = new Map<T, boolean>();

    this.DFSUtil(startingNode, visitedNodes);
  }

  /// Recursive function which proceeds and explore
  /// all the adjacent vertex of the vertex with which it is called
  DFSUtil(vert: T, visited: Map<T, boolean>) {
    visited.set(vert, true);
    console.log(vert);

    let get_neighbours = this.adjList.get(vert) ?? [];

    for (let i = 0; i < get_neighbours.length; i++) {
      let get_elem = get_neighbours[i];
      if (!visited.get(get_elem)) {
        this.DFSUtil(get_elem, visited);
      }
    }
  }
}

// Using the above implemented graph class
var g = new Graph(6);
var vertices = ["A", "B", "C", "D", "E", "F"];

// adding vertices
for (var i = 0; i < vertices.length; i++) {
  g.addVertex(vertices[i]);
}

// adding edges
g.addEdge("A", "B");
g.addEdge("A", "D");
g.addEdge("A", "E");
g.addEdge("B", "C");
g.addEdge("D", "E");
g.addEdge("E", "F");
g.addEdge("E", "C");
g.addEdge("C", "F");

// prints all vertex and
// its adjacency list
// A -> B D E
// B -> A C
// C -> B E F
// D -> A E
// E -> A D F C
// F -> E C
g.printGraph();

// prints
// BFS
// A B D E C F
console.log("***************BFS***************");
g.bfs("A");

// prints
// DFS
// A B C E D F
console.log("***************DFS***************");
g.dfs("A");

/// here just to Solve - Duplicate identifier error in TypeScript
export {};
