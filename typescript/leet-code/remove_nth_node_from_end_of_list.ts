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
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

type NullableNode = ListNode | null;
/**
 * Our solution is to maintain two pointers, a fast and a slow Pointer
 * We maintain a distance equal to n between the two pointers, 
 * such that once the fastPointer is at the end of the list, 
 * then the slow pointer must be at the node just before the nth node.
 * We then delete the nth node, 
 * we need to be at the node before the nth node because it is a singly linked list and there is no way of going back
 * 
 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (head == null) {
    return null;
  }

  let fastPointer: NullableNode = head,
    slowPointer: NullableNode = head;
  let fastPointerCounter = 0;

  while (fastPointer != null) {
    slowPointer = slowPointer!.next;

    fastPointerCounter += 1;
    fastPointer = fastPointer.next;

    /// once there the fastPoninter is n+1 distance from head
    /// we reset the slowPointer to head
    // this ensures that there is the slow pointer is n distance from the fastpointer
    if (fastPointerCounter == n+1) {
        slowPointer = head;
    }
  }

  /// handle edge cases
  if (fastPointerCounter == 1) {
    return null;
  } else if (fastPointerCounter == n) {
    return head.next;
  }

  /// delete the nth node 
  let nthNodeFromBehind = slowPointer!.next;
  slowPointer!.next = nthNodeFromBehind!.next; 

  return head;
}

export {};

let listA = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));

removeNthFromEnd(listA, 2);