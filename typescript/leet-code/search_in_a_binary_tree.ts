/**
 * You are given the root of a binary search tree (BST) and an integer val.
 * Find the node in the BST that the node's value equals val and return the subtree rooted with that node.
 * If such a node does not exist, return null.
 *
 *
 * Example 1:
 *                  4
 *                 /  \
 *                2    7
 *               / \
 *              1   3
 * Input: root = [4,2,7,1,3], val = 2
 * Output: [2,1,3]
 *
 * Example 2:
 *                  4
 *                 /  \
 *                2    7
 *               / \
 *              1   3
 * Input: root = [4,2,7,1,3], val = 5
 * Output: []
 *
 *
 * Constraints:
 * The number of nodes in the tree is in the range [1, 5000].
 * 1 <= Node.val <= 107
 * root is a binary search tree.
 * 1 <= val <= 107
 */

/** Definition for a binary tree node. */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function searchBSTIterative(
  root: TreeNode | null,
  val: number
): TreeNode | null {
  while (root && root.val !== val) {
    if (val < root.val) {
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return root;
}

function searchBSTRecursive(
  root: TreeNode | null,
  val: number
): TreeNode | null {

    if (!root) {
        return null
    } else if (root.val == val) {
        return root;
    } else if (val < root.val) {
        return searchBSTRecursive(root.left, val);
    } else {
        return searchBSTRecursive(root.right, val);
    }
}

function run_demo() {
  let tree_a = new TreeNode(
    4,
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(7)
  );

  console.log(searchBSTIterative(tree_a, 2));
  console.log(searchBSTIterative(tree_a, 5));
}

run_demo();

export {};
