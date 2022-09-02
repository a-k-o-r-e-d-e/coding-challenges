/**
 * Implement a preOrder function, which has 1 parameter: 
 *      a pointer to the root of a binary tree.
 * 
 * It must print the values in the tree's preorder traversal as a single line of space-separated values.
 * 
 * Input Format
 *      Our test code passes the root node of a binary tree to the preOrder function.
 * 
 * Constraints
 *      1 <= Nodes in the tree <= 500
 * 
 * Output Format
 *      Print the tree's preorder traversal as a single line of space-separated values.
 * 
 * Sample Input

        1
        \
        2
            \
            5
            /  \
        3    6
            \
            4  


 * Sample Output
 *      1 2 5 3 4 6 
 * 
 * */

/// Node class
class Node<T> {
  data: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

// Binary Search Tree class
class BinarySearchTree<T> {
  private root: Node<T> | null = null;

  /// helper method which creates a new node to be inserted and calls insertNode
  insert(data: T) {
    // Creating a node and initialising with data
    let newNode = new Node(data);

    // If root is null, then node will be made the tree root
    if (this.root === null) {
      this.root = newNode;
    } else {
      /// find the correct position in the tree and add the node
      this.insertNode(this.root, newNode);
    }
  }

  // Method to insert a node in a tree
  // it moves over the tree to find the location to insert a node with the given data
  private insertNode(node: Node<T>, newNode: Node<T>) {
    /// If data is less than the node, data is moved to left subtree
    if (newNode.data < node.data) {
      /// if the left is null insert node here
      if (node.left === null) {
        node.left = newNode;
      } else {
        /// if left is not null,
        /// recursively call insertNode until null is found
        this.insertNode(node.left, newNode);
      }
    } else {
      // if data is greater than the node, move data to right subtree
      if (node.right === null) {
        /// if right is null insert node here
        node.right = newNode;
      } else {
        /// if right is not null,
        /// recursively call insertNode until null is found
        this.insertNode(node.right, newNode);
      }
    }
  }

  // performs preorder traversal of a tree
  // Algorithm for preorder traversal
  //    - Visit the root
  //    - Traverse the left subtree i.e perform preorder on left subtree
  //    - Traverse the right subtree i.e perform preorder on right subtree
  preorder(node: Node<T> | null): string {
    if (node !== null) {
      return (
        node.data + " " + this.preorder(node.left) + this.preorder(node.right)
      );
      //   console.log(node.data);
      //   this.preorder(node.left);
      //   this.preorder(node.right);
    } else {
      return "";
    }
  }

  getRootNode(): Node<T> | null {
    return this.root;
  }
}

/// here just to Solve - Duplicate identifier error in TypeScript
export {};

function preOrderTest(input: number[]) {
  const BST = new BinarySearchTree<number>();
  for (let i = 0; i < input.length; i++) {
    BST.insert(Number(input[i]));
  }

  // console.log(inputsArr);
  // console.log(BST.getRootNode());
  console.log(BST.preorder(BST.getRootNode()));
}

preOrderTest([1, 2, 5, 3, 6, 4]);
preOrderTest([1, 14, 3, 7, 4, 5, 15, 6, 13, 10, 11, 2, 12, 8, 9]);
