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
  let frontPointer: NullableNode = head,
    backPointer: NullableNode = head;
  let listCounter = 0;

  /// once there the fastPoninter is n+1 distance from head
  // we move the fastPointer to be n nodes from the slowPointer / head
  // this ensures that there is the slow pointer is n distance from the fastpointer
  for (let i = 0; i <= n; i++) {
    if (frontPointer) {
      frontPointer = frontPointer!.next;
      listCounter += 1;
    }
  }

  while (frontPointer) {
    backPointer = backPointer!.next;

    listCounter += 1;
    frontPointer = frontPointer.next;
  }

  console.log("List Length:: ", listCounter)

  /// handle edge cases
  if (listCounter == 1 || listCounter == n) {
    return head!.next;
  }

  /// At this point backPointer is now at the (n-1)th node
  /// delete the nth node
  console.log(backPointer);
  backPointer!.next = backPointer!.next!.next;

  return head;
}

export {};

let listA = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);

let listB = new ListNode(1);

removeNthFromEnd(listA, 2);
removeNthFromEnd(listB, 1)
