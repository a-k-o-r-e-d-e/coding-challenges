/**
 * You are given the head of a linked list.
 * Delete the middle node, and return the head of the modified linked list.
 * The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing,
 * where ⌊x⌋ denotes the largest integer less than or equal to x.
 *
 * For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.
 *
 * Example 1:
 * Input: head = [1,3,4,7,1,2,6]
 * Output: [1,3,4,1,2,6]
 * Explanation:
 * The above array represents the given linked list.
 * Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
 * We return the new list after removing this node.
 *
 * Example 2:
 * Input: head = [1,2,3,4]
 * Output: [1,2,4]
 * Explanation:
 * The above figure represents the given linked list.
 * For n = 4, node 2 with value 3 is the middle node, which is marked in red.
 *
 * Example 3:
 * Input: head = [2,1]
 * Output: [2]
 * Explanation:
 * The above figure represents the given linked list.
 * For n = 2, node 1 with value 1 is the middle node, which is marked in red.
 * Node 0 with value 2 is the only node remaining after removing node 1.
 *
 * Constraints:
 * The number of nodes in the list is in the range [1, 105].
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

fn delete_middle(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    if let None = head.as_ref().unwrap().next {
        return None;
    }

    let mut cl = head.as_ref().unwrap().next.as_ref().unwrap().next.clone();
    let mut fast_pointer = cl.as_deref_mut();
    let mut slow_pointer = head.as_deref_mut();

    while let Some(fast_node) = fast_pointer {
        if let Some(next) = fast_node.next.as_mut() {
            fast_pointer = next.next.as_deref_mut();
            if let Some(slow_node) = slow_pointer {
            slow_pointer = slow_node.next.as_deref_mut();
        }
        } else {
            fast_pointer = None;
        }

        
    }

    if let Some(slow_node) = slow_pointer {
        // Update the next field if it's not None
        if let Some(mut next_node) = slow_node.next.take() {
            slow_node.next = next_node.next.take();
        }
    }

    return head;
}

fn print_list(head: Option<Box<ListNode>>) {
    let mut list: Vec<i32> = vec![];

    let mut pointer = head.clone();

    while let Some(val) = pointer.as_deref() {
        list.push(val.val.clone());
        pointer = val.next.clone();
    }

    println!("{:?}", list);
}

pub fn run_demo() {
    let list_a = Some(Box::new(ListNode {
        val: 1,
        next: Some(Box::new(ListNode {
            val: 3,
            next: Some(Box::new(ListNode {
                val: 4,
                next: Some(Box::new(ListNode {
                    val: 7,
                    next: Some(Box::new(ListNode {
                        val: 1,
                        next: Some(Box::new(ListNode {
                            val: 2,
                            next: Some(Box::new(ListNode::new(6))),
                        })),
                    })),
                })),
            })),
        })),
    }));

    let list_b = Some(Box::new(ListNode {
        val: 1,
        next: Some(Box::new(ListNode {
            val: 2,
            next: Some(Box::new(ListNode {
                val: 3,
                next: Some(Box::new(ListNode ::new(4))),
            })),
        })),
    }));

    let list_c = Some(Box::new(ListNode {
        val: 2,
        next: Some(Box::new(ListNode::new(1))),
    }));

    let list_d = Some(Box::new(ListNode ::new(5)));

    let list_e = Some(Box::new(ListNode {
        val: 1,
        next: Some(Box::new(ListNode {
            val: 3,
            next: Some(Box::new(ListNode {
                val: 4,
                next: Some(Box::new(ListNode {
                    val: 7,
                    next: Some(Box::new(ListNode {
                        val: 1,
                        next: Some(Box::new(ListNode {
                            val: 2,
                            next: Some(Box::new(ListNode { val: 6, next: Some(Box::new(ListNode::new(2))) })),
                        })),
                    })),
                })),
            })),
        })),
    }));

    let list_f = Some(Box::new(ListNode {
        val: 1,
        next: Some(Box::new(ListNode {
            val: 3,
            next: Some(Box::new(ListNode {
                val: 4,
                next: Some(Box::new(ListNode {
                    val: 7,
                    next: Some(Box::new(ListNode {
                        val: 1,
                        next: Some(Box::new(ListNode {
                            val: 2,
                            next: Some(Box::new(ListNode { val: 6, next: Some(Box::new(ListNode { val: 8, next: Some(Box::new(ListNode::new(2))) })) })),
                        })),
                    })),
                })),
            })),
        })),
    }));

    // print_list(list_a);
    print_list(delete_middle(list_a));
    print_list(delete_middle(list_b));
    print_list(delete_middle(list_c));
    print_list(delete_middle(list_d));
    print_list(delete_middle(list_e));
    print_list(delete_middle(list_f));
}
