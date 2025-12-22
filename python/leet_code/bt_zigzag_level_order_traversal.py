"""
 * Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. 
 * (i.e., from left to right, then right to left for the next level and alternate between).
 * 
 * Example 1:
 *     3
 *   /    \
 *  9      20
 *        /   \
 *       15    7
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[20,9],[15,7]]
 * 
 * Example 2:
 * Input: root = [1]
 * Output: [[1]]
 * 
 * Example 3:
 * Input: root = []
 * Output: []
 * 
 * Constraints:
 * The number of nodes in the tree is in the range [0, 2000].
 * -100 <= Node.val <= 100
 """

from typing import List, Optional

# Definition for a binary tree node.
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right


class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # This function uses Breadth-First Search (BFS) to traverse the tree level by level.
        # It maintains a queue for the current level's nodes and toggles a direction flag
        # at each depth to determine if the values should be added left-to-right or right-to-left.
        if root is None:
            return []
        
        # Initialize queue with root for BFS traversal
        queue = [root]
        ans = []
        # Direction flag: 1 for left-to-right, -1 for right-to-left
        dir = 1

        while len(queue) > 0:
            # Capture the number of nodes at the current level
            queueLen = len(queue)
            level = []

            # Iterate through all nodes at the current level
            for i in range(queueLen):
                curr = queue[i]
                level.append(curr.val)

                # Enqueue left and right children for the next level
                if curr.left is not None:
                    queue.append(curr.left)
                
                if curr.right is not None:
                    queue.append(curr.right)

            # Add the current level to the answer, reversing if needed using slicing
            ans.append(level[::dir])
            # Remove the processed nodes from the queue
            queue = queue[queueLen:]
            # Toggle the direction for the next level
            dir *= -1
        
        return ans