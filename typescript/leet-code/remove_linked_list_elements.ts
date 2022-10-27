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
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

type Node = ListNode | null;
/**
 * My solution is to loop through the list and remove any node where node.val == val 
 * To effectively handle the edge case where the head needs to be deleted too 
 * we use a dummy head as the start of the loop.
 */
function removeElements(head: Node, val: number): Node {
  let dummy_head = new ListNode(-1, head);
  let prev_node = dummy_head;
  while (prev_node.next) {
    let curr_node: ListNode = prev_node.next;
    if (curr_node.val == val) {
      prev_node.next = curr_node.next;
    } else {
      prev_node = prev_node.next;
    }
  }
  console.log(dummy_head.next);
  return dummy_head.next;
}

let list_a = new ListNode(
  1,
  new ListNode(
    2,
    new ListNode(
      6,
      new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))
    )
  )
);

let list_b = null;

let list_c = new ListNode(7, new ListNode(7, new ListNode(7, new ListNode(7))));

removeElements(list_a, 6);
removeElements(list_b, 1)
removeElements(list_c, 7)
export {};
