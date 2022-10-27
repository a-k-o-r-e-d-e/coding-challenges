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
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}


/**
 * Our solution is to create two sublists.
 *  an even sublist and a odd sublist
 * we then loop through the list, keeping track of
 *    - if the current index is even or not
 *    - the end of the even sub list
 *    - the end of the odd sub list
 * when we are on a node with an even index, we move the end of the even sublist to the current node
 * when we are on a node with an even index, we move the the node to the end of the odd_sub_list
 */
function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head;
  }

  let odd_list_end = head;
  let even_list_end = head.next;

  let is_odd_index = false;

  while (even_list_end.next) {
    is_odd_index = !is_odd_index;
    if (is_odd_index) {
      /// Move current node to odd_list_end
      let curr_node = even_list_end.next;
      even_list_end.next = curr_node.next; /// this effectively deletes the node from its current position
      // next 3 lines move the node to the end of the odd list
      curr_node.next = odd_list_end.next;
      odd_list_end.next = curr_node;
      // node is now the new end of the odd list
      odd_list_end = curr_node;
    } else {
      // this is an even index
      // so we move the end of the end list forward
      even_list_end = even_list_end.next;
    }

    // console.log("even_pointer", even_list_end);
  }
  // console.log(head);
  return head;
}

let list_a = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);

let list_b = new ListNode(
  2,
  new ListNode(
    1,
    new ListNode(
      3,
      new ListNode(5, new ListNode(6, new ListNode(4, new ListNode(7))))
    )
  )
);

oddEvenList(list_a); // [1,3,5,2,4]
oddEvenList(list_b); // [2,3,6,7,1,5,4]

export {};
