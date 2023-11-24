/**
 * Given the root of a binary tree, return its maximum depth.
 * A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 *
 * Example 1:
 *                      3
 *                    /   \
 *                   9     20
 *                        /  \
 *                      15     7
 * Input: root = [3,9,20,null,null,15,7]
 * Output: 3
 *
 * Example 2:
 *                      1
 *                       \
 *                         2
 * Input: root = [1,null,2]
 * Output: 2
 *
 * Constraints:
 * The number of nodes in the tree is in the range [0, 104].
 * -100 <= Node.val <= 100
 *
 */

/**
 * Definition for a binary tree node.*/
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

function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    let maxChildBranch = Math.max(maxDepth(root.left), maxDepth(root.right));

    return 1 + maxChildBranch;
}

function runDemo() {
    let treeA = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    let treeB = new TreeNode(1, null, new TreeNode(2));

    console.log(maxDepth(treeA));
    console.log(maxDepth(treeB));
}

runDemo();

export {};
