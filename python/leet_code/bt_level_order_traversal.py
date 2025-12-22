"""
 
 Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
 
  Example 1:
               3
             /    \
            9      20    
         /   \    /   \
      null  null 15    7
  Input: root = [3,9,20,null,null,15,7]
  Output: [[3],[9,20],[15,7]]
 
  Example 2:
    Input: root = [1]
    Output: [[1]]
 
  Example 3:
    Input: root = []
    Output: []
 
  Constraints:
  The number of nodes in the tree is in the range [0, 2000].
    -1000 <= Node.val <= 1000
 
"""

# Definition for a binary tree node.
from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if (root is None):
            return []
        
        parent_arr = [root]
        result = []

        while len(parent_arr) > 0:
            level = []
            child_arr = []

            for i in range(len(parent_arr)):
                curr = parent_arr[i]
                level.append(curr.val)

                if curr.left is not None:
                    child_arr.append(curr.left)

                if curr.right is not None:
                    child_arr.append(curr.right)

            
            result.append(level)
            parent_arr = child_arr
        

        return result
    

