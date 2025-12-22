"""
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
 """

# Definition for a binary tree node.
from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class RecursiveSolution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if root is None:
            return []

        return [*self.postorderTraversal(root.left), *self.postorderTraversal(root.right), root.val]

class IterativeSolution:
    """
    Postorder traversal using two stacks.
        Push root to first stack.
        Loop until first stack is not empty
            Pop a node from first stack and push it to second stack
            Push left and right children of the popped node to first stack
        Print contents of second stack
    """
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if root is None:
            return []
        
        stack1 = [root]
        stack2 = []

        while len(stack1) > 0:
            curr = stack1.pop()

            stack2.append(curr.val)

            if curr.left is not None:
                stack1.append(curr.left)
            
            if curr.right is not None:
                stack1.append(curr.right)
                
        stack2.reverse()
        return stack2
