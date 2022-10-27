/**
* Given the head of a singly linked list,
* group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.
*
* The first node is considered odd, and the second node is even, and so on.
*
* Note that the relative order inside both the even and odd groups should remain as it was in the input.
*
* You must solve the problem in O(1) extra space complexity and O(n) time complexity.
*
* Example 1:
*      1 -> 2 -> 3 -> 4 -> 5
*              |
*      1 -> 3 -> 5 -> 2 -> 4
*
*  Input: head = [1,2,3,4,5]
*  Output: [1,3,5,2,4]
*
*
* Example 2:
*      2 -> 1 -> 3 -> 5 -> 6 -> 4 -> 7
*                  |
*      2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4
*
* Input: head = [2,1,3,5,6,4,7]
* Output: [2,3,6,7,1,5,4]
*
*
* Constraints:
*      The number of nodes in the linked list is in the range [0, 104].
*      -106 <= Node.val <= 106
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
 * Our solution is to create two sublists.
 *  an even sublist and a odd sublist
 * 
 * we then loop through the list, keeping track of
 *    - if the current index is even or not
 *    - the end of the even sub list
 *    - the end of the odd sub list
 * when we are on a node with an even index, we add it to the end of the even sublist
 * when we are on a node with an even index, we add it to the end of the odd_sub_list
 * 
 * when we are done looping,
 * we attach the even sublist to the end of the odd sub list
 * and return the head of the odd sublist as our new head;
 */
fn odd_even_list(mut head: Node) -> Node {
    let mut odd_dummy_head = ListNode::new(-1);
    let mut even_dummy_head = ListNode::new(-1);
    let mut odd_curr_node = &mut odd_dummy_head;
    let mut even_curr_node = &mut even_dummy_head;

    let mut is_even_index = false; 

    while let Some(mut curr_node) = head {
        head = curr_node.next.take();

        if is_even_index {
            even_curr_node.next = Some(curr_node);
            even_curr_node = even_curr_node.next.as_mut().unwrap();
        } else {
            odd_curr_node.next = Some(curr_node);
            odd_curr_node = odd_curr_node.next.as_mut().unwrap();
        }
        is_even_index = !is_even_index;
    }

    odd_curr_node.next = even_dummy_head.next;
    println!("{:?}", odd_dummy_head.next);
    return odd_dummy_head.next;
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
        val: 2,
        next: Some(Box::new(ListNode {
            val: 1,
            next: Some(Box::new(ListNode {
                val: 3,
                next: Some(Box::new(ListNode {
                    val: 5,
                    next: Some(Box::new(ListNode {
                        val: 6,
                        next: Some(Box::new(ListNode {
                            val: 4,
                            next: ListNode::some_and_boxed(7),
                        })),
                    })),
                })),
            })),
        })),
    }));

    odd_even_list(list_a); // [1,3,5,2,4]
    odd_even_list(list_b); // [2,3,6,7,1,5,4]
}
