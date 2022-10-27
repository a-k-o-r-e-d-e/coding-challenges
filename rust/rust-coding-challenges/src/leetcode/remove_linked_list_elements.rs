/**
 * Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.
 *
 * Example 1:
 *      1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6
 *                  |
 *      1 -> 2 -> 3 -> 4 -> 5
 *
 * Input: head = [1,2,6,3,4,5,6], val = 6
 * Output: [1,2,3,4,5]
 *
 *
 * Example 2:
 *
 * Input: head = [], val = 1
 * Output: []
 *
 *
 * Example 3:
 *      7 -> 7 -> 7 -> 7
 * Input: head = [7,7,7,7], val = 7
 * Output: []
 *
 *
 * Constraints:
 *      The number of nodes in the list is in the range [0, 104].
 *      1 <= Node.val <= 50
 *      0 <= val <= 50
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
        ListNode { next: None, val }
    }

    fn some_and_boxed(val: i32) -> Node {
        return Some(Box::new(ListNode::new(val)));
    }
}

type Node = Option<Box<ListNode>>;

/**
 * My solution is to loop through the list and remove any node where node.val == val
 * To effectively handle the edge case where the head needs to be deleted too
 * we use a dummy head as the start of the loop.
 */
fn remove_elements(head: Node, val: i32) -> Node {
    let mut dummy_head = Box::new(ListNode {
        val: -1,
        next: head,
    });

    let mut prev_node = dummy_head.as_mut();
    while let Some(curr_node) = prev_node.next.as_ref() {
        if curr_node.val == val {
            prev_node.next = prev_node.next.as_mut().unwrap().next.take();
        } else {
            prev_node = prev_node.next.as_mut().unwrap();
        }
    }

    println!("{:?}", dummy_head.next);
    return dummy_head.next;
}

fn remove_elements_efficient_solution(
    mut head: Option<Box<ListNode>>,
    val: i32,
) -> Option<Box<ListNode>> {
    let mut ptr = &mut head;

    loop {
        match ptr {
            None => break,

            Some(node) if node.val == val => {
                *ptr = node.next.take();
            }
            Some(node) => {
                ptr = &mut node.next;
            }
        }
    }

    head
}

pub fn run_demo() {
    let list_a = Some(Box::new(ListNode {
        val: 1,
        next: Some(Box::new(ListNode {
            val: 2,
            next: Some(Box::new(ListNode {
                val: 6,
                next: Some(Box::new(ListNode {
                    val: 3,
                    next: Some(Box::new(ListNode {
                        val: 4,
                        next: Some(Box::new(ListNode {
                            val: 5,
                            next: ListNode::some_and_boxed(6),
                        })),
                    })),
                })),
            })),
        })),
    }));

    let list_b = None;

    let list_c = Some(Box::new(ListNode {
        val: 7,
        next: Some(Box::new(ListNode {
            val: 7,
            next: Some(Box::new(ListNode {
                val: 7,
                next: ListNode::some_and_boxed(7),
            })),
        })),
    }));

    remove_elements(list_a, 6);
    remove_elements(list_b, 1);
    remove_elements(list_c, 7);
}
