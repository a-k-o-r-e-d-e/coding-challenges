/**
 * Given the root of a binary tree, imagine yourself standing on the right side of it,
 * return the values of the nodes you can see ordered from top to bottom.
 *
 * Example 1:
 *                  1
 *                /   \
 *               2     3
 *                \     \
 *                 5     4
 * Input: root = [1,2,3,null,5,null,4]
 * Output: [1,3,4]
 *
 * Example 2:
 *                  1
 *                    \
 *                     3
 * Input: root = [1,null,3]
 * Output: [1,3]
 *
 * Example 3:
 * Input: root = []
 * Output: []
 *
 * Constraints:
 * The number of nodes in the tree is in the range [0, 100].
 * -100 <= Node.val <= 100
 */

import { ArrayQueue } from "../data-structures/queue-implementation";

/** Definition for a binary tree node.*/
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

function rightSideView(root: TreeNode | null): number[] {
  if (!root) {
    return [];
  }

  let queue = new ArrayQueue<TreeNode>([root]);
  let result = [];

  while (!queue.isEmpty) {
    let right_tail = queue.peekBack();
    result.push(right_tail.val);

    const queueLength = queue.length;

    for (let i = 0; i < queueLength; i++) {
      let curr_head = queue.dequeue();
      if (curr_head.left) {
        queue.enqueue(curr_head.left);
      }

      if (curr_head.right) {
        queue.enqueue(curr_head.right);
      }
    }
  }

  return result;
}

function run_demo() {
  let tree_a = new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(4))
  );
  let tree_b = new TreeNode(1, null, new TreeNode(3));
  let tree_c = new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(5)),
    new TreeNode(3, new TreeNode(2, null, new TreeNode(5)), new TreeNode(4))
  );

  console.log(rightSideView(tree_a));
  console.log(rightSideView(tree_b));
  console.log(rightSideView(null));
  console.log(rightSideView(tree_c));
}

run_demo();

export {};
