/**
 * Given the head of a linked list, rotate the list to the right by k places.
 *
 * Example 1:
 *                  1->2->3->4->5
 *      rotate 1:   5->1->2->3->4
 *      rotate 2:   4->5->1->2->3
 *
 *      Input: head = [1,2,3,4,5], k = 2
 *      Output: [4,5,1,2,3]
 *
 *
 * Example 2:
 *                  0->1->2
 *      rotate 1:   2->1->0
 *      rotate 2:   1->2->0
 *      rotate 3:   0->1->2
 *      rotate 4:   2->1->0
 *
 *      Input: head = [0,1,2], k = 4
 *      Output: [2,0,1]
 *
 *
 * Constraints:
 *      The number of nodes in the list is in the range [0, 500].
 *      -100 <= Node.val <= 100
 *      0 <= k <= 2 * 109
 */

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
 * Our solution is to push the members of the list to a stack
 * once this is done, we create a new list, 
 * we pop the stack k times, adding val to the head of the rotated list.
 * the remaining members of the stack are then added to the tail of the rotated lkist.
 * 
 * To reduce the number of rotations, we make k = k%list_length.
 * This also ensures that k is less than the number of elements in the stack
 */
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head || k == 0) {
    return head;
  }

  let stack: number[] = [];
  let curr: Node = head;
  while (curr) {
    stack.push(curr.val);
    curr = curr.next;
  }

  console.log("stack: ", stack);
  /// perform a modulo division, reduces the number of rotation we need to perform
  /// as rotating a list of 5 elements 6 times is the same as rotating it once.
  // hence rotating k times is the same as rotating (length%k) times
  k = k % stack.length;
  console.log("new k: ", k)
  if (k == 0) {
    return head;
  }
  let rotated_list: Node = null;
  for (let i = 0; i < k; i++) {
    rotated_list = addAtHead(stack.pop()!, rotated_list);
  }

  if (stack.length > 0) {
    /// get tail pointer of rotated_list
    let tail = rotated_list!;
    while (tail.next) {
      tail = tail.next;
    }

    for (let i = 0; i < stack.length; i++) {
      let node = new ListNode(stack[i]);
      tail.next = node;
      tail = tail.next;
    }
  }
  
  return rotated_list;
}

function addAtHead(val: number, head: Node): ListNode {
  let node = new ListNode(val);
  node.next = head;
  head = node;
  return head;
}

let list_a = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);
let list_b = new ListNode(0, new ListNode(1, new ListNode(2)));

let list_c = new ListNode(4, new ListNode(5, new ListNode(6)))

rotateRight(list_a, 2);
rotateRight(list_b, 4);
rotateRight(list_b, 0);
rotateRight(new ListNode(1), 1)

export {};
