/**
   Given the root of a binary tree, return the postorder traversal of its nodes' values.
  
  Example 1:
   Input: root = [1,null,2,3]
   Output: [3,2,1]
  Explanation:
       1
        \  
         2
        / \
      3       

      
 Example 2:
   Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
   Output: [4,6,7,5,2,9,8,3,1]

   Explanation:
       1
      / \
     2   3
    / \   \
   4   5   8
       / \   \
      6   7   9
  
  
  Example 3:
  Input: root = []
   Output: []

  Example 4:
   Input: root = [1]
   Output: [1]
  
  
  Constraints:
  The number of nodes in the tree is in the range [0, 100].
  -100 <= Node.val <= 100 
 */

function postorderTraversal_recursive(root: TreeNode | null): number[] {
  if (!root) {
    return [];
  }

  return [
    ...postorderTraversal_recursive(root.left),
    ...postorderTraversal_recursive(root.right),
    root.val,
  ];
}

/**
Postorder traversal using two stacks.
    Push root to first stack.
    Loop until first stack is not empty
        Pop a node from first stack and push it to second stack
        Push left and right children of the popped node to first stack
    Print contents of second stack
*/
function postorderTraversal_iterative(root: TreeNode | null): number[] {
    if (!root) {
        return []
    }

    let stack1 = [root]
    let stack2 = []

    while (stack1.length > 0) {
        const curr = stack1.pop()!

        stack2.push(curr.val)

        if (curr.left) {
            stack1.push(curr.left)
        }

        if (curr.right) {
            stack1.push(curr.right)
        }
    }

    return stack2.reverse()
};