use std::cell::RefCell;
use std::rc::Rc;

/**
 * Consider all the leaves of a binary tree, from left to right order,
 * the values of those leaves form a leaf value sequence.
 *
 *                          3
 *                         / \
 *                        5    1
 *                      / |    | \
 *                     6  2    9  8
 *                       / \
 *                      7   4
 *
 * For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).
 * Two binary trees are considered leaf-similar if their leaf value sequence is the same.
 * Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.
 *
 * Example 1:
 *                  3                           3
 *                /   \                       /   \
 *               5      1                    5      1
 *             /  \     /\                  / \     /\
 *            6    2   9  8                6   7   4  2
 *                / \                                / \
 *               7   4                              9   8
 *
 * Input:
 *      root1 = [3,5,1,6,2,9,8,null,null,7,4],
 *      root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
 * Output: true
 *
 *
 * Example 2:
 *                  1                           1
 *                /   \                       /   \
 *               2     3                     3     2
 * Input:
 *      root1 = [1,2,3],
 *      root2 = [1,3,2]
 * Output: false
 *
 *
 * Constraints:
 * The number of nodes in each tree will be in the range [1, 200].
 * Both of the given trees will have values in the range [0, 200].
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
            right: None,
        }
    }
}

struct Solution {}

impl Solution {
    pub fn leaf_similar(
        root1: Option<Rc<RefCell<TreeNode>>>,
        root2: Option<Rc<RefCell<TreeNode>>>,
    ) -> bool {
        match (root1, root2) {
            (Some(tree1), Some(tree2)) => {
                let mut tree1_stack = Vec::from([tree1.clone()]);
                let mut tree2_stack = Vec::from([tree2.clone()]);

                while !tree1_stack.is_empty() || !tree2_stack.is_empty() {
                    let tree1_leaf = Solution::get_next_leaf_val(tree1_stack.as_mut());
                    let tree2_leaf = Solution::get_next_leaf_val(tree2_stack.as_mut());

                    match (tree1_leaf, tree2_leaf) {
                        (Some(tree1_val), Some(tree2_val)) => {
                            if tree1_val == tree2_val {
                                continue;
                            } else {
                                return false;
                            };
                        }
                        _ => return false,
                    }
                }

                return true;
            }
            _ => false,
        }
    }

    fn get_next_leaf_val(stack: &mut Vec<Rc<RefCell<TreeNode>>>) -> Option<i32> {
        while !stack.is_empty() {
            let node = stack.pop().unwrap();
            if node.borrow().left.is_some() || node.borrow().right.is_some() {
                match node.borrow().left.clone() {
                    None => {}
                    Some(left) => stack.push(left.clone()),
                }

                match node.borrow().right.clone() {
                    None => {}
                    Some(right) => stack.push(right.clone()),
                }

                continue;
            } else {
                return Some(node.borrow().val.clone());
            }
        }
        return None;
    }
}

pub fn run_demo() {
    let tree_a = Some(Rc::new(RefCell::new(TreeNode {
        val: 3,
        left: Some(Rc::new(RefCell::new(TreeNode {
            val: 5,
            left: Some(Rc::new(RefCell::new(TreeNode::new(6)))),
            right: Some(Rc::new(RefCell::new(TreeNode {
                val: 2,
                left: Some(Rc::new(RefCell::new(TreeNode::new(7)))),
                right: Some(Rc::new(RefCell::new(TreeNode::new(4)))),
            }))),
        }))),
        right: Some(Rc::new(RefCell::new(TreeNode {
            val: 1,
            left: Some(Rc::new(RefCell::new(TreeNode::new(9)))),
            right: Some(Rc::new(RefCell::new(TreeNode::new(8)))),
        }))),
    })));

    let tree_b = Some(Rc::new(RefCell::new(TreeNode {
        val: 3,
        left: Some(Rc::new(RefCell::new(TreeNode {
            val: 5,
            left: Some(Rc::new(RefCell::new(TreeNode::new(6)))),
            right: Some(Rc::new(RefCell::new(TreeNode::new(7)))),
        }))),
        right: Some(Rc::new(RefCell::new(TreeNode {
            val: 1,
            left: Some(Rc::new(RefCell::new(TreeNode::new(4)))),
            right: Some(Rc::new(RefCell::new(TreeNode {
                val: 2,
                left: Some(Rc::new(RefCell::new(TreeNode::new(9)))),
                right: Some(Rc::new(RefCell::new(TreeNode::new(8)))),
            }))),
        }))),
    })));

    let tree_c = Some(Rc::new(RefCell::new(
        TreeNode{
            val: 1,
            left: Some(Rc::new(RefCell::new(TreeNode::new(2)))),
            right: Some(Rc::new(RefCell::new(TreeNode::new(3)))),
        }
    )));

    let tree_d = Some(Rc::new(RefCell::new(
        TreeNode{
            val: 1,
            left: Some(Rc::new(RefCell::new(TreeNode::new(3)))),
            right: Some(Rc::new(RefCell::new(TreeNode::new(2)))),
        }
    )));

    println!("{}", Solution::leaf_similar(tree_a, tree_b));
    println!("{}", Solution::leaf_similar(tree_c, tree_d));
}
