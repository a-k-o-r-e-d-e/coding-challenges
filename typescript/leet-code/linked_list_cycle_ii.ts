/**
 * Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.
 * There is a cycle in a linked list, if there is some node in the list that can be reached again by continuously following the next pointer.
 * Internally, pos is used to denote the index of the node that tail's next pointer is connected to.
 * Note that pos is not passed as a parameter.
 *
 * Do not modify the linked list.
 *
 * Example 1:
 *      Input: head = [3,2,0,-4], pos = 1
 *      Output: true
 *      Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
 *
 * Example 2:
 *      Input: head = [1,2], pos = 0
 *      Output: true
 *      Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
 *
 *
 * Example 3:
 *      Input: head = [1], pos = -1
 *      Output: false
 *      Explanation: There is no cycle in the linked list.
 *
 * Constraints:
 *      The number of the nodes in the list is in the range [0, 104].
 *      -105 <= Node.val <= 105
 *      pos is -1 or a valid index in the linked-list.
 *
 * Follow up: Can you solve it using O(1) (i.e. constant) memory?
 */

// * Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function detectCycle(head: ListNode | null): ListNode | null {
  //   if (!head) {
  //     return null;
  //   }

  let slowPointer = head;
  let fastPointer = head;

  while (fastPointer && fastPointer.next) {
    fastPointer = fastPointer.next.next;
    slowPointer = slowPointer!.next;
    if (fastPointer == slowPointer) {
      break;
    }
  }

  if (!fastPointer || !fastPointer.next) {
    return null;
  }

  while (head != slowPointer) {
    slowPointer = slowPointer!.next;
    head = head!.next;
  }
  return head;
}

let sampleList1 = new ListNode(
  3,
  new ListNode(2, new ListNode(0, new ListNode(4)))
);
let sampleList2 = new ListNode(1, new ListNode(2));
let sampleList3 = new ListNode(1);

console.log(detectCycle(sampleList1)); // true
console.log(detectCycle(sampleList2)); // true
console.log(detectCycle(sampleList3)); // false

export {};
