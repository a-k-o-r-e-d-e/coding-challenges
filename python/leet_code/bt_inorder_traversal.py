"""
   Given the root of a binary tree, return the inorder traversal of its nodes' values.
  
  Example 1:
   Input: root = [1,null,2,3]
   Output: [1,3,2]
  Explanation:
       1
        \  
         2
        / \
      3       

      
 Example 2:
   Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
   Output: [4,2,6,5,7,1,3,9,8]

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
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if root is None:
            return []
        
        return [*self.inorderTraversal(root.left), root.val, *self.inorderTraversal(root.right)]

class IterativeSolution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        ans = []
        s = []
        curr = root

        while curr is not None or len(s) > 0:
            # Reach the left most Node of the curr Node
            while curr is not None:
                # Push node on stack 
                # before traversing node's left subtree
                s.append(curr)
                curr = curr.left
            
            # curr must be NULL at this point
            curr = s.pop()
            ans.append(curr.val)

            # we have visited the node and its
            # left subtree. Now, it's right
            # subtree's turn
            curr = curr.right
        
        return ans