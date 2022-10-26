/**
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.
 *
 * Example 1:
 *      1 -> 2 -> 3 -> 4 -> 5
 *                |
 *      1 -> 2 -> 3 ------> 5
 *
 *  Input: head = [1,2,3,4,5], n = 2
 *  Output: [1,2,3,5]
 *
 *
 * Example 2:
 *  Input: head = [1], n = 1
 *  Output: []
 *
 *
 * Example 3:
 *      Input: head = [1,2], n = 1
 *      Output: [1]
 *
 * Constraints:
 * The number of nodes in the list is sz.
 *      1 <= sz <= 30
 *      0 <= Node.val <= 100
 *      1 <= n <= sz
 *
 * Follow up: Could you do this in one pass?
 */

//Definition for singly-linked list.
// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
struct ListNode {
  pub val: i32,
  pub next: Option<Box<ListNode>>
}

impl ListNode {
  #[inline]
  fn new(val: i32) -> Self {
    ListNode {
      next: None,
      val
    }
  }

  fn some_and_boxed(val: i32) -> Node {
        return Some(Box::new(ListNode::new(val)));
    }
}

type Node = Option<Box<ListNode>>;
/**
 * Our solution is to maintain two pointers, a fast and a slow Pointer
 * We maintain a distance equal to n between the two pointers,
 * such that once the fastPointer is at the end of the list,
 * then the slow pointer must be at the node just before the nth node.
 * We then delete the nth node,
 * we need to be at the node before the nth node because it is a singly linked list and there is no way of going back
 *
 */
fn remove_nth_from_end(head: Node, n: i32) -> Node {
  let mut dummy_head = Box::new(
    ListNode{
      val: -1,
      next: head,
    }
  );

  let (mut front_pointer, mut back_pointer) = (dummy_head.clone(), dummy_head.as_mut());

  // once there the fastPoninter is n+1 distance from head
  // we move the fastPointer to be n nodes from the slowPointer / head
  // this ensures that there is the slow pointer is n distance from the fastpointer
  for _ in 0..n {
    front_pointer = front_pointer.next.unwrap();
  }

  while let Some(front_node) = front_pointer.next {
    back_pointer = back_pointer.next.as_mut().unwrap();

    front_pointer = front_node;
  }

  // At this point backPointer is now at the (n-1)th node
  // delete the nth node
  back_pointer.next = back_pointer.next.as_mut().unwrap().next.clone();

  println!("{:?}", dummy_head.next);

  return dummy_head.next;
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


let list_b = Some(Box::new(ListNode::new(1)));

remove_nth_from_end(list_a, 2);
remove_nth_from_end(list_b, 1);
}