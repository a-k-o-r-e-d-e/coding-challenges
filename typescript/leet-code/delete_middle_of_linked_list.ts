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

/** Definition for singly-linked list.  */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function deleteMiddle(head: ListNode | null): ListNode | null {
  if (!head!.next) {
    return null;
  }

  let fastPointer = head!.next.next;
  let slowPointer: ListNode | null = head;

  while (fastPointer && fastPointer.next) {
    fastPointer = fastPointer.next.next;
    slowPointer = slowPointer!.next!;
  }

  slowPointer!.next = slowPointer!.next!.next;

  return head;
}

function printList(head: ListNode | null): void {
  let list = [];
  while (head) {
    list.push(head.val);
    head = head.next;
  }

  console.log("List:: ", list);
}

let listA = new ListNode(
  1,
  new ListNode(
    3,
    new ListNode(
      4,
      new ListNode(7, new ListNode(1, new ListNode(2, new ListNode(6))))
    )
  )
);
let listB = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
let listC = new ListNode(2, new ListNode(1));
let listD = new ListNode(5);

printList(deleteMiddle(listA));
printList(deleteMiddle(listB));
printList(deleteMiddle(listC));
printList(deleteMiddle(listD));

export {};
