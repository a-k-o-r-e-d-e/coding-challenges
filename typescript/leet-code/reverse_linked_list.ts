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
  class ListNode {
      val: number
      next: ListNode | null
      constructor(val?: number, next?: ListNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.next = (next===undefined ? null : next)
      }
  }
 
// Our solution is to iteratively move the current node to head
// this gives us a solution with O(n) time and O(1) space
function reverseList(head: ListNode | null): ListNode | null {
    if (!head){
        return head;
    }

    let prevNode = head;

    while (prevNode.next) {
        /// Move current node to head
        let currNode = prevNode.next;
        prevNode.next = currNode.next;
        currNode.next = head;
        head = currNode;
    }
    return head;
};

let listA = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);

let listB = new ListNode(1, new ListNode(2));

let listC = new ListNode(1);

reverseList(listC);

export {}