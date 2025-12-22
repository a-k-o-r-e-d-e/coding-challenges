"""
   Given the root of a binary tree, return the preorder traversal of its nodes' values.
  
  Example 1:
   Input: root = [1,null,2,3]
   Output: [1,2,3]
  Explanation:
       1
        \  
         2
        / \
      3       

      
 Example 2:
   Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
   Output: [1,2,4,5,6,7,3,8,9]

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
 """

from typing import List, Optional

# Definition for a binary tree node.
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right

class RecursiveSolution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:

        if root is None:
            return []
        
        return [root.val, *self.preorderTraversal(root.left), *self.preorderTraversal(root.right)]
    
class IterativeSolution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        """
        // Create an empty stack and push root node to stack. 
        // Do the following while is not empty. 
        //  Pop an item from the stack and print it. 
        //  Push right child of a popped item to stack 
        //  Push left child of a popped item to stack
        // The right child is pushed before the left child to make sure that the left subtree is processed first.
        """
        
        if root is None:
            return []
        
        stack = [root]
        ans = []

        while len(stack) > 0:
            curr = stack.pop()
            ans.append(curr.val)

            if curr.right is not None:
                stack.append(curr.right)

            if curr.left is not None:
                stack.append(curr.left)
            
        return ans
