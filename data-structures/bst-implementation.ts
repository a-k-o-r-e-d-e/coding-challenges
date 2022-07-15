/// Implementing a Binary search tree in Typescript

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

  // Helper function that calls the removeNode with the given data
  remove(data: T) {
    /// root is re-initialized with the root of the modified tree
    this.root = this.removeNode(this.root, data);
  }

  private removeNode(node: Node<T> | null, key: T): Node<T> | null {
    /// if the root is null then the tree is empty
    if (node == null) {
      return null;
    } else if (key < node.data) {
      /// if that to be deleted is less than the root data then move to left subtree
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.data) {
      // if the data to be deleted is greater than the root data then move to the right subtree
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // if the data is similar to the root's data then delete this node
      if (node.left === null && node.right === null) {
        /// deleting node with no children
        node = null;
        return node;
      }

      /// deleting node with one children
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }

      /// Deleting node with two children
      /// minimum node of the right sub tree is stored in aux
      let aux = this.findMinNode(node.right);
      node.data = aux.data;

      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }

  /// finds the minimum node in the tree
  /// searching starts from the given node
  findMinNode(node: Node<T>): Node<T> {
    /// if the left of a node is null, then curent node must be the minimun node
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  /// finds the maximum node in the tree
  /// searching starts from the given node
  findMaxNode(node: Node<T>): Node<T> {
    /// if the left of a node is null, then curent node must be the minimun node
    if (node.right === null) {
      return node;
    } else {
      return this.findMinNode(node.right);
    }
  }

  getRootNode(): Node<T> | null {
    return this.root;
  }

  // performs inorder traversal of a tree
  // Algorithm for inorder traversal
  //    - Traverse the left subtree i.e perform inorder on left subtree
  //    - Visit the root
  //    - Traverse the right subtree i.e perform inorder on right subtree
  inorder(node: Node<T> | null) {
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }

  // performs preorder traversal of a tree
  // Algorithm for preorder traversal
  //    - Visit the root
  //    - Traverse the left subtree i.e perform preorder on left subtree
  //    - Traverse the right subtree i.e perform preorder on right subtree
  preorder(node: Node<T> | null) {
    if (node !== null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  // Performs postorder traversal of a tree
  // Algorithm for postorder
  //    - Traverse the left subtree i.e perform postorder on left subtree
  //    - Traverse the right subtree i.e perform postorder on right subtree
  //    - Visit the root
  postorder(node: Node<T> | null) {
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }

  /// search for a node with given data
  search(node: Node<T> | null, data: T): Node<T> | null {
    // if trees is empty return null
    if (node === null) {
      return null;
    } else if (data < node.data) {
      // if data is less than node's data, move to left subtree
      return this.search(node.left, data);
    } else if (data > node.data) {
      // if data is greater than node's data, move to right subtree
      return this.search(node.right, data);
    } else {
      /// at this point, data must be equal to the node's data, return node
      return node;
    }
  }
}

// Testing Implementation
let BST = new BinarySearchTree<number>();

// inserting nodes to the binary search tree
BST.insert(15);
BST.insert(25);
BST.insert(10);
BST.insert(7);
BST.insert(22);
BST.insert(17);
BST.insert(13);
BST.insert(5);
BST.insert(9);
BST.insert(27);

//          15
//         /  \
//        10   25
//       / \   / \
//      7  13 22  27
//     / \    /
//    5   9  17

let root = BST.getRootNode();

// prints 5 7 9 10 13 15 17 22 25 27
BST.inorder(root);

// removing node with no children
BST.remove(5);

//          15
//         /  \
//        10   25
//       / \   / \
//      7  13 22  27
//       \    /
//        9  17

root = BST.getRootNode();

// prints 7 9 10 13 15 17 22 25 27
BST.inorder(root);

// removing node with one child
BST.remove(7);

//          15
//         /  \
//        10   25
//       / \   / \
//      9  13 22  27
//            /
//           17

root = BST.getRootNode();

// prints 9 10 13 15 17 22 25 27
BST.inorder(root);

// removing node with two children
BST.remove(15);

//          17
//         /  \
//        10   25
//       / \   / \
//      9  13 22  27

root = BST.getRootNode();

console.log("Inorder traversal");
// prints 9 10 13 17 22 25 27
BST.inorder(root);

console.log("Post Order traversal");
BST.postorder(root);

console.log("Pre Order traversal");
BST.preorder(root);

/// added just to Solve - Duplicate identifier error in TypeScript
export {};
