use std::{cell::RefCell, collections::HashMap, rc::Rc};

/**
 * Given the root of a binary tree, return all duplicate subtrees.
 * For each kind of duplicate subtrees, you only need to return the root node of any one of them.
 * Two trees are duplicate if they have the same structure with the same node values.
 *
 * Example 1:
 *              1
 *            /   \
 *           2     3
 *         /      /   \
 *        4      2      4
 *              /
 *             4
 *
 *  Input: root = [1,2,3,4,null,2,4,null,null,4]
 *  Output: [[2,4],[4]]
 *
 *
 * Example 2:
 *              2
 *            /    \
 *          1        1
 *
 *  Input: root = [2,1,1]
 *  Output: [[1]]
 *
 *
 * Example 3:
 *              2
 *            /   \
 *          2       2
 *        /       /
 *       3       3
 *
 *  Input: root = [2,2,2,3,null,3,null]
 *  Output: [[2,3],[3]]
 *
 *
 * Constraints:
 *      The number of the nodes in the tree will be in the range [1, 5000]
 *      -200 <= Node.val <= 200
 */
#[derive(Debug, PartialEq, Eq)]
struct TreeNode {
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
type TreeNodeArr = Vec<Option<Rc<RefCell<TreeNode>>>>;
pub type TreeNodeOption = Option<Rc<RefCell<TreeNode>>>;

mod BruteForceSolution {
    use super::{TreeNodeArr, TreeNodeOption};
    use crate::leetcode::find_duplicate_subtrees::HashMap;

    /** Brute force solution has time complexity of O(n) */
    fn find_duplicate_subtrees_brute_force(root: TreeNodeOption) -> TreeNodeArr {
        let mut result: TreeNodeArr = Vec::new();
        post_order_brute_force(&root, &mut HashMap::new(), &mut result);
        return result;
    }

    fn post_order_brute_force(
        root: &TreeNodeOption,
        map: &mut HashMap<String, i32>,
        result: &mut TreeNodeArr,
    ) -> String {
        match root {
            None => return String::from("#"),
            Some(currentNode) => {
              
                let currentNode = currentNode.as_ref().borrow();

                let serial = format!(
                    "{},{},{}",
                    currentNode.val,
                    post_order_brute_force(&currentNode.left, map, result),
                    post_order_brute_force(&currentNode.right, map, result)
                );

                let serialCount = map.entry(serial.to_owned()).or_insert(0);
                *serialCount += 1;

                if Some(&(2 as i32)) == map.get(&serial) {
                    result.push(root.to_owned());
                }
                return serial;
            }
        }
    }

    pub fn run_demo(
        input_tree_1: TreeNodeOption,
        input_tree_2: TreeNodeOption,
        input_tree_3: TreeNodeOption,
    ) {
        println!("Brute force Solution");
        println!(
            "input tree 1 solution: \n{:?}",
            find_duplicate_subtrees_brute_force(input_tree_1)
        );

        println!(
            "input tree 2 solution: \n{:?}",
            find_duplicate_subtrees_brute_force(input_tree_2)
        );

        println!(
            "input tree 3 solution: \n{:?}",
            find_duplicate_subtrees_brute_force(input_tree_3)
        );
    }
}

mod UsingSerialIdSolution {
    use std::collections::HashMap;

    use super::{TreeNodeArr, TreeNodeOption};

    static  mut CUR_ID: i32 = 1;

    fn find_duplicate_subtrees_using_serial_ids(root: TreeNodeOption) -> TreeNodeArr {
        let mut serialToIdMap: HashMap<String, i32> = HashMap::new();
        let mut idToCountMap: HashMap<i32, i32> = HashMap::new();
        let mut res: TreeNodeArr = Vec::new();
        post_order_using_serial_ids(&root, &mut serialToIdMap, &mut idToCountMap, &mut res);
        return res;
    }

    fn post_order_using_serial_ids(
        root: &TreeNodeOption,
        serialToIdMap: &mut HashMap<String, i32>,
        idToCountMap: &mut HashMap<i32, i32>,
        result: &mut TreeNodeArr,
    ) -> i32 {
        match root {
            None => return 0,
            Some(currentNode) => {
                let currentNode = currentNode.as_ref().borrow();
                let leftId =
                    post_order_using_serial_ids(&currentNode.left, serialToIdMap, idToCountMap, result, );
                let rightId =
                    post_order_using_serial_ids(&currentNode.right, serialToIdMap, idToCountMap, result,);

                let cur_serial = format!("{},{}.{}", leftId, currentNode.val, rightId);

                unsafe {
                  let serial_id = serialToIdMap.get(&cur_serial).get_or_insert(&CUR_ID).to_owned();

                if serial_id == CUR_ID {
                    CUR_ID = CUR_ID + (1 as i32);
                };

                serialToIdMap.insert(cur_serial.to_owned(), serial_id.to_owned());

                let id_count = idToCountMap.entry(serial_id.to_owned()).or_insert(0);
                *id_count += 1;

                if idToCountMap.get(&serial_id) == Some(&(2 as i32)) {
                    result.push(root.to_owned());
                };
                return serial_id.to_owned();
                }
                

            }
        }
    }

    pub fn run_demo(
        input_tree_1: TreeNodeOption,
        input_tree_2: TreeNodeOption,
        input_tree_3: TreeNodeOption,
    ) {
        println!("Serial ID Solution");
        println!(
            "input tree 1 solution: \n{:?}",
            find_duplicate_subtrees_using_serial_ids(input_tree_1)
        );

        println!(
            "input tree 2 solution: \n{:?}",
            find_duplicate_subtrees_using_serial_ids(input_tree_2)
        );

        println!(
            "input tree 3 solution: \n{:?}",
            find_duplicate_subtrees_using_serial_ids(input_tree_3)
        );
    }
}

pub fn run_demo() {
    let input_tree_1: TreeNodeOption = Some(Rc::new(RefCell::new(TreeNode {
        val: 1,
        left: Some(Rc::new(RefCell::new(TreeNode {
            val: 2,
            left: Some(Rc::new(RefCell::new(TreeNode::new(4)))),
            right: None,
        }))),
        right: Some(Rc::new(RefCell::new(TreeNode {
            val: 3,
            left: Some(Rc::new(RefCell::new(TreeNode {
                val: 2,
                left: Some(Rc::new(RefCell::new(TreeNode::new(4)))),
                right: None,
            }))),
            right: Some(Rc::new(RefCell::new(TreeNode::new(4)))),
        }))),
    })));

    let input_tree_2: TreeNodeOption = Some(Rc::new(RefCell::new(TreeNode {
        val: 2,
        left: Some(Rc::new(RefCell::new(TreeNode::new(1)))),
        right: Some(Rc::new(RefCell::new(TreeNode::new(1)))),
    })));

    let input_tree_3: TreeNodeOption = Some(Rc::new(RefCell::new(TreeNode {
        val: 2,
        left: Some(Rc::new(RefCell::new(TreeNode {
            val: 2,
            left: Some(Rc::new(RefCell::new(TreeNode::new(3)))),
            right: None,
        }))),
        right: Some(Rc::new(RefCell::new(TreeNode {
            val: 2,
            left: Some(Rc::new(RefCell::new(TreeNode::new(3)))),
            right: None,
        }))),
    })));

    BruteForceSolution::run_demo(input_tree_1, input_tree_2, input_tree_3)
}

struct  Solution{}

impl Solution {
    pub fn find_duplicate_subtrees(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Option<Rc<RefCell<TreeNode>>>> {
             let mut result: TreeNodeArr = Vec::new();
        Solution::post_order(&root, &mut HashMap::new(), &mut result);
        return result;
    }

    pub fn post_order(
        root: &TreeNodeOption,
        map: &mut HashMap<String, i32>,
        result: &mut TreeNodeArr,
    ) -> String {
        match root {
            None => return String::from("#"),
            Some(currentNode) => {
              
                let currentNode = currentNode.as_ref().borrow();

                let serial = format!(
                    "{},{},{}",
                    currentNode.val,
                    Solution::post_order(&currentNode.left, map, result),
                    Solution::post_order(&currentNode.right, map, result)
                );

                let serialCount = map.entry(serial.to_owned()).or_insert(0);
                *serialCount += 1;

                if Some(&(2 as i32)) == map.get(&serial) {
                    result.push(root.to_owned());
                }
                return serial;
            }
        }
    }

}