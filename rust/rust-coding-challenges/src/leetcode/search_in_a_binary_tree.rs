use std::rc::Rc;
use std::cell::RefCell;
/**
 * You are given the root of a binary search tree (BST) and an integer val.
 * Find the node in the BST that the node's value equals val and return the subtree rooted with that node.
 * If such a node does not exist, return null.
 * 
 * 
 * Example 1:
 *                  4
 *                 /  \
 *                2    7
 *               / \
 *              1   3
 * Input: root = [4,2,7,1,3], val = 2
 * Output: [2,1,3]
 * 
 * Example 2:
 *                  4
 *                 /  \
 *                2    7
 *               / \
 *              1   3
 * Input: root = [4,2,7,1,3], val = 5
 * Output: []
 * 
 * 
 * Constraints:
 * The number of nodes in the tree is in the range [1, 5000].
 * 1 <= Node.val <= 107
 * root is a binary search tree.
 * 1 <= val <= 107
 */

 // Definition for a binary tree node.
#[derive(Debug, PartialEq, Eq)]
pub struct TreeNode {
  pub val: i32,
  pub left: Option<Rc<RefCell<TreeNode>>>,
  pub right: Option<Rc<RefCell<TreeNode>>>,
}

impl TreeNode {
  #[inline]
  pub fn new(val: i32) -> Self {
    TreeNode {
      val,
      left: None,
      right: None
    }
  }
}

struct Solution {

}

impl Solution {
    pub fn search_bst(root: Option<Rc<RefCell<TreeNode>>>, val: i32) -> Option<Rc<RefCell<TreeNode>>> {
        match root {
            None => None,
            Some(node) => {
                match Rc::try_unwrap(node) {
                Ok(refcell) => {
                    // you can do refcell.into_inner here
                    let mut tree_node = refcell.into_inner();

                    // println!("Tree Node val:: {}", tree_node.val);

                    if tree_node.val == val {
                    return Some(Rc::new(RefCell::new(tree_node)));
                } else if  val < tree_node.val {
                    return  Solution::search_bst(tree_node.left.take(), val);
                } else {
                    return  Solution::search_bst(tree_node.right.take(), val);
                }
                },
                Err(_) => {
                    println!("An Error Occured because of RC");
                    return None;
                }
            }
                
            }
        }
    }
}

pub fn run_demo() {
    let tree_a = Some(Rc::new(RefCell::new(TreeNode {
        val: 4,
        left: Some(Rc::new(RefCell::new(TreeNode { val: 2, left: Some(Rc::new(RefCell::new(TreeNode::new(1)))), right: Some(Rc::new(RefCell::new(TreeNode::new(3)))) }))),
        right: Some(Rc::new(RefCell::new(TreeNode::new(7))))
    })));

    let tree_b = Some(Rc::new(RefCell::new(TreeNode {
        val: 4,
        left: Some(Rc::new(RefCell::new(TreeNode { val: 2, left: Some(Rc::new(RefCell::new(TreeNode::new(1)))), right: Some(Rc::new(RefCell::new(TreeNode::new(3)))) }))),
        right: Some(Rc::new(RefCell::new(TreeNode::new(7))))
    })));

    println!("{:?}", Solution::search_bst(tree_a, 2));
    println!("{:?}", Solution::search_bst(tree_b, 5));

}