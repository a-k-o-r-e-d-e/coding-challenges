/**
 * Given the root of a binary tree, return the preorder traversal of its nodes' values.
 * 
 * Example 1:
 *  Input: root = [1,null,2,3]
 *  Output: [1,2,3]
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
 *  Output: [1,2,4,5,6,7,3,8,9]
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

function preorderTraversal_recursive(root: TreeNode | null): number[] {
    if (!root) {
        return []
    }

    return [root.val, ...preorderTraversal_recursive(root.left), ...preorderTraversal_recursive(root.right)]
};


// Create an empty stack and push root node to stack. 
// Do the following while is not empty. 
//  Pop an item from the stack and print it. 
//  Push right child of a popped item to stack 
//  Push left child of a popped item to stack
// The right child is pushed before the left child to make sure that the left subtree is processed first.
function preorderTraversal_iterative(root: TreeNode | null): number[] {
    if (!root) {
        return []
    }

    let stack = [root]
    let ans =[]

    while (stack.length > 0){
        let curr = stack.pop()!;
        ans.push(curr.val)

        if (curr.right){
            stack.push(curr.right)
        }

        if (curr.left){
            stack.push(curr.left)
        }
    }

    return ans
}