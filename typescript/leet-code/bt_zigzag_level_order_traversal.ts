/**
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
 */

function zigzagLevelOrder(root: TreeNode | null): number[][] {
   // This function uses Breadth-First Search (BFS) to traverse the tree level by level.
   // It maintains a queue for the current level's nodes and toggles a 'reverse' flag
   // at each depth to determine if the values should be added left-to-right or right-to-left.
   if (!root){
    return []
   } 

   // Initialize queue with root for BFS traversal
   let queue = [root] 
   const ans = [];
   // Flag to determine if the current level should be reversed
   let reverse = false

   while (queue.length > 0) {
        const level = []
        // Capture the number of nodes at the current level
        const queueLen = queue.length;

        // Iterate through all nodes at the current level
        for (let i = 0; i<queueLen; i++) {
            const curr = queue[i]
            level.push(curr.val)

            // Enqueue left and right children for the next level
            if (curr.left) {
                queue.push(curr.left)
            }

            if (curr.right){
                queue.push(curr.right)
            }
        }

        // Add the current level to the answer, reversing if needed
        ans.push(reverse ? level.reverse(): level)

        // Remove the processed nodes from the queue
        queue = queue.slice(queueLen)
        // Toggle the reverse flag for the next level
        reverse = !reverse
   }

   return ans
};