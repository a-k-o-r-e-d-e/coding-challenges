/**
 * In a linked list of size n, where n is even,
 * the ith node (0-indexed) of the linked list is known as the twin of the (n-1-i)th node, if 0 <= i <= (n / 2) - 1.
 *
 * For example, if n = 4, then node 0 is the twin of node 3, and node 1 is the twin of node 2.
 * These are the only nodes with twins for n = 4.
 * The twin sum is defined as the sum of a node and its twin.
 *
 * Given the head of a linked list with even length,
 * return the maximum twin sum of the linked list.
 *
 *
 * Example 1:
 * Input: head = [5,4,2,1]
 * Output: 6
 * Explanation:
 * Nodes 0 and 1 are the twins of nodes 3 and 2, respectively. All have twin sum = 6.
 * There are no other nodes with twins in the linked list.
 * Thus, the maximum twin sum of the linked list is 6.
 *
 *
 * Example 2:
 * Input: head = [4,2,2,3]
 * Output: 7
 * Explanation:
 * The nodes with twins present in this linked list are:
 * - Node 0 is the twin of node 3 having a twin sum of 4 + 3 = 7.
 * - Node 1 is the twin of node 2 having a twin sum of 2 + 2 = 4.
 * Thus, the maximum twin sum of the linked list is max(7, 4) = 7.
 *
 *
 * Example 3:
 * Input: head = [1,100000]
 * Output: 100001
 * Explanation:
 * There is only one node with a twin in the linked list having twin sum of 1 + 100000 = 100001.
 *
 *
 * Constraints:
 * The number of nodes in the list is an even integer in the range [2, 105].
 * 1 <= Node.val <= 105
 */
// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }
}

fn pair_sum(mut head: Option<Box<ListNode>>) -> i32 {
    // find mid point of linked list
    // reverse 2nd half of linkedlist using a stack
    // iterate through the 2 halfs of the list, calculating each twin sum and storing the max

    // In rust, it more efficient to store the values in an array use indexes to get the twins

    // find mid point of linked list
    let mut stack = vec![];

    while let Some(boxed) = head {
        stack.push(boxed.val);
        head = boxed.next;
    }

    println!("Reverse Stack: {:?}", stack);

    // iterate through the 2 halfs of the list, calculating each twin sum and storing the max
    let mut max_sum = i32::MIN;
    let n = stack.len();
    for i in 0..n/2 {
        let twin_sum = stack[i] + stack[n - 1 - i];
        max_sum = std::cmp::max(max_sum, twin_sum);
    }   

    println!("Max Sum: {}", max_sum);
    return max_sum;
}

pub fn run_demo() {
    let list = Some(Box::new(ListNode {
        val: 5,
        next: Some(Box::new(ListNode {
            val: 4,
            next: Some(Box::new(ListNode {
                val: 2,
                next: Some(Box::new(ListNode::new(1))),
            })),
        })),
    }));

    pair_sum(list);

    let list = Some(Box::new(ListNode {
        val: 4,
        next: Some(Box::new(ListNode {
            val: 2,
            next: Some(Box::new(ListNode {
                val: 2,
                next: Some(Box::new(ListNode::new(3))),
            })),
        })),
    }));

    pair_sum(list);

    let list = Some(Box::new(ListNode {
        val: 1,
        next: Some(Box::new(ListNode::new(100000))),
    }));

    pair_sum(list);
}
