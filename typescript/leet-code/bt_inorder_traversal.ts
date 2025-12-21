/**
 * Given the root of a binary tree, return the inorder traversal of its nodes' values.
 * 
 * Example 1:
 *  Input: root = [1,null,2,3]
 *  Output: [1,3,2]
 * Explanation:
 *      1
 *       \  
 *        2
 *       / \
 *     3       
 *
 *
 * Example 2:
 *  Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
 *  Output: [4,2,6,5,7,1,3,9,8]
 *
 *  Explanation:
 *      1
 *     / \
 *    2   3
 *   / \   \
 *  4   5   8
 *     / \   \
 *    6   7   9
 * 
 * 
 * Example 3:
 * Input: root = []
 * Output: []
 *
 * Example 4:
 * Input: root = [1]
 * Output: [1]
 * 
 * 
 * Constraints:
 * The number of nodes in the tree is in the range [0, 100].
 * -100 <= Node.val <= 100
 * 
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function inorderTraversal_recursive(root: TreeNode | null): number[] {
    if (!root) {
        return []
    }

    return [...inorderTraversal_recursive(root.left), root.val, ...inorderTraversal_recursive(root.right)]
};

function inorderTraversal_iterative(root: TreeNode | null): number[] {
    let ans = []
    let stack = []
    let curr = root;

    while (curr !== null || stack.length > 0) {
        // Reach the left most Node of the curr Node
        while (curr !== null ) {
            // Push node on stack 
            // # before traversing node's left subtree
            stack.push(curr)
            curr = curr.left
        }

        // curr must be NULL at this point
        curr = stack.pop()!
        ans.push(curr.val)

        // # we have visited the node and its
        // # left subtree. Now, it's right
        // # subtree's turn
        curr = curr.right
    }

    return ans;
};