use std::cell::RefCell;
use std::collections::VecDeque;
/**
 * Given the root of a binary tree, imagine yourself standing on the right side of it,
 * return the values of the nodes you can see ordered from top to bottom.
 *
 * Example 1:
 *                  1
 *                /   \
 *               2     3
 *                \     \
 *                 5     4
 * Input: root = [1,2,3,null,5,null,4]
 * Output: [1,3,4]
 *
 * Example 2:
 *                  1
 *                    \
 *                     3
 * Input: root = [1,null,3]
 * Output: [1,3]
 *
 * Example 3:
 * Input: root = []
 * Output: []
 *
 * Constraints:
 * The number of nodes in the tree is in the range [0, 100].
 * -100 <= Node.val <= 100
 */
use std::rc::Rc;

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

fn right_side_view(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
    let mut result: Vec<i32> = Vec::new();

    match root {
        None => result,
        Some(head) => {
            let mut queue: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::from([head.clone()]);
            result.push(head.borrow().val);
            while !queue.is_empty() {
                let queue_len = queue.len();
                for _ in 0..queue_len {
                    let curr_head = queue.pop_front().unwrap();

                    match curr_head.borrow().left.clone() {
                        None => {}
                        Some(left) => queue.push_back(left.clone()),
                    };

                    match curr_head.borrow().right.clone() {
                        None => {}
                        Some(right) => queue.push_back(right.clone()),
                    };
                }
                if !queue.is_empty() {
                    let right_tail = queue.back().unwrap().borrow();
                result.push(right_tail.val.clone());
                }
                
            }
            return result;
        }
    }
}

pub fn run_demo() {
    let tree_a = Some(Rc::new(RefCell::new(TreeNode {
        val: 1,
        left: Some(Rc::new(RefCell::new(TreeNode {
            val: 2,
            left: None,
            right: Some(Rc::new(RefCell::new(TreeNode::new(5)))),
        }))),
        right: Some(Rc::new(RefCell::new(TreeNode {
            val: 3,
            left: None,
            right: Some(Rc::new(RefCell::new(TreeNode::new(4)))),
        }))),
    })));

    let tree_b = Some(Rc::new(RefCell::new(TreeNode {
        val: 1,
        left: None,
        right: Some(Rc::new(RefCell::new(TreeNode::new(3)))),
    })));

    let tree_c:Option<Rc<RefCell<TreeNode>>> = None;
    let tree_d = Some(Rc::new(RefCell::new(TreeNode {
        val: 1,
        left: Some(Rc::new(RefCell::new(TreeNode {
            val: 2,
            left: None,
            right: Some(Rc::new(RefCell::new(TreeNode::new(5)))),
        }))),
        right: Some(Rc::new(RefCell::new(TreeNode {
            val: 3,
            left: Some(Rc::new(RefCell::new(TreeNode { val: 2, left: None, right: Some(Rc::new(RefCell::new(TreeNode::new(5)))) }))),
            right: Some(Rc::new(RefCell::new(TreeNode::new(4)))),
        }))),
    })));

    println!("{:?}", right_side_view(tree_a));
    println!("{:?}", right_side_view(tree_b));
    println!("{:?}", right_side_view(tree_c));
    println!("{:?}", right_side_view(tree_d));
}
