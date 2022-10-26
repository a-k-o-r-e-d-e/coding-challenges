/**
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 *
 * Example 1:
 *      1 -> 2 -> 3 -> 4 -> 5
 *                |
 *      5 -> 4 -> 3 -> 2 -> 1
 *  Input: head = [1,2,3,4,5]
 *  Output: [5,4,3,2,1]
 *
 * Example 2:
 *      1 -> 2
 *         |
 *      2 -> 1
 *  Input: head = [1,2]
 *  Output: [2,1]
 *
 * Example 3:
 *  Input: head = []
 *  Output: []
 *
 * Constraints:
 *      The number of nodes in the list is the range [0, 5000].
 *      -5000 <= Node.val <= 5000
 *
 */

// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode { val, next: None }
    }

    fn some_and_boxed(val: i32) -> Node {
        return Some(Box::new(ListNode::new(val)));
    }
}

type Node = Option<Box<ListNode>>;

// Our solution is to iteratively move the current node to head
// this gives us a solution with O(n) time and O(1) space
fn reverse_list(head: Node) -> Node {
    let (mut head, mut curr) = (None, head);
    while let Some(mut node) = curr {
        curr = node.next;
        node.next = head;
        head = Some(node)
    }
    println!("{:?}", head);
    return head;
}

pub fn run_demo() {
    let list_a = Some(Box::new(ListNode {
        val: 1,
        next: Some(Box::new(ListNode {
            val: 2,
            next: Some(Box::new(ListNode {
                val: 3,
                next: Some(Box::new(ListNode {
                    val: 4,
                    next: ListNode::some_and_boxed(5),
                })),
            })),
        })),
    }));

    let list_b = Some(Box::new(ListNode {
        val: 1,
        next: ListNode::some_and_boxed(2),
    }));

    let list_c = Some(Box::new(ListNode::new(1)));

    reverse_list(list_a);
    reverse_list(list_b);
    reverse_list(list_c);
}
