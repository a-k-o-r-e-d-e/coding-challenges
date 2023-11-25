/**
 * Consider all the leaves of a binary tree, from left to right order,
 * the values of those leaves form a leaf value sequence.
 *
 *                          3
 *                         / \
 *                        5    1
 *                      / |    | \
 *                     6  2    9  8
 *                       / \
 *                      7   4
 *
 * For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).
 * Two binary trees are considered leaf-similar if their leaf value sequence is the same.
 * Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.
 *
 * Example 1:
 *                  3                           3
 *                /   \                       /   \
 *               5      1                    5      1
 *             /  \     /\                  / \     /\
 *            6    2   9  8                6   7   4  2
 *                / \                                / \
 *               7   4                              9   8
 *
 * Input:
 *      root1 = [3,5,1,6,2,9,8,null,null,7,4],
 *      root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
 * Output: true
 *
 *
 * Example 2:
 *                  1                           1
 *                /   \                       /   \
 *               2     3                     3     2
 * Input:
 *      root1 = [1,2,3],
 *      root2 = [1,3,2]
 * Output: false
 *
 *
 * Constraints:
 * The number of nodes in each tree will be in the range [1, 200].
 * Both of the given trees will have values in the range [0, 200].
 */

/*** Definition for a binary tree node. */
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

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  // for two trees to be leaf similar, they dont need to have the same structure but they must have the name number of leave nodes.

  let tree1_stack: TreeNode[] = [root1!];
  let tree2_stack: TreeNode[] = [root2!];

  while (tree1_stack.length > 0 || tree2_stack.length > 0) {
    let tree1_leaf_val = getNextLeafNode(tree1_stack);
    let tree2_leaf_val = getNextLeafNode(tree2_stack);

    if (tree1_leaf_val === tree2_leaf_val) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

function getNextLeafNode(stack: TreeNode[]): number | null {
  while (stack.length > 0) {
    let curr_node = stack.pop()!;
    if (curr_node.left || curr_node.right) {
      if (curr_node.left) {
        stack.push(curr_node.left);
      }

      if (curr_node.right) {
        stack.push(curr_node.right);
      }
      continue;
    } else {
      /// we know we are at a leaf node of tree_1
      return curr_node.val;
    }
  }

  return null;
}

function run_demo() {
  let tree_a = new TreeNode(
    3,
    new TreeNode(
      5,
      new TreeNode(6),
      new TreeNode(2, new TreeNode(7), new TreeNode(4))
    ),
    new TreeNode(1, new TreeNode(9), new TreeNode(8))
  );

  let tree_b = new TreeNode(
    3,
    new TreeNode(
      5,
      new TreeNode(6),
      new TreeNode(7)
    ),
    new TreeNode(1, new TreeNode(4), new TreeNode(2,  new TreeNode(9), new TreeNode(8)))
  );

  let tree_c = new TreeNode(
    1,
    new TreeNode(
      2
    ),
    new TreeNode(3)
  );

  let tree_d = new TreeNode(1, new TreeNode(3), new TreeNode(2));

  console.log(leafSimilar(tree_a, tree_b));
  console.log(leafSimilar(tree_c, tree_d));
}

run_demo()
