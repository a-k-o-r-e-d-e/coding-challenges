/**
 * 
 * Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
 * 
 * Example 1:
 *              3
 *            /    \
 *           9      20    
 *        /   \    /   \
 *     null  null 15    7
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
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
 * -1000 <= Node.val <= 1000
 */

/**
 * Definition for a binary tree node.
 */
  
  class TreeNode {
      val: number
      left: TreeNode | null
      right: TreeNode | null
      constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.left = (left===undefined ? null : left)
          this.right = (right===undefined ? null : right)
      }
  }
 

function levelOrder(root: TreeNode | null): number[][] {
    if (!root) {
        return []
    }

    let parentArr = [root];
    let result:number[][] = []
    while (parentArr.length > 0) {
        let level = []
        let childArr = [];
        for (let i =0; i<parentArr.length; i++) {
            let curr = parentArr[i];
            level.push(curr.val)
            if (curr.left) {
                childArr.push(curr.left);
            }

            if (curr.right) {
                childArr.push(curr.right)
            }
        }
        result.push(level);
        parentArr = childArr
    }

    return result;
};

const driverCode = () => {
    let root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);

    console.log(levelOrder(root));
}

export {}