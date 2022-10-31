/**
 * You are given two non-empty linked lists representing two non-negative integers. 
 * The digits are stored in reverse order, and each of their nodes contains a single digit. 
 * Add the two numbers and return the sum as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 * 
 * Example 1:
 *      2 -> 4 -> 3
 *      5 -> 6 -> 4
 *      ------------
 *      7 -> 0 -> 8
 * 
 *      Input: l1 = [2,4,3], l2 = [5,6,4]
 *      Output: [7,0,8]
 *      Explanation: 342 + 465 = 807.
 * 
 * 
 * Example 2:
 *      Input: l1 = [0], l2 = [0]
 *      Output: [0]
 * 
 * 
 * Example 3:
 *      Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 *      Output: [8,9,9,9,0,0,0,1]
 * 
 * 
 * Constraints:
 *      The number of nodes in each linked list is in the range [1, 100].
 *      0 <= Node.val <= 9
 *      It is guaranteed that the list represents a number that does not have leading zeros.
 * 
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
 * Our solution is to create a new list for the sum
 * we then loop through both list getting the sum and carry over,
 * we use add the sum value as a node in the sum_list
 */
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
      let sum_list_dummy_head = new ListNode(-1);
    let sum_list_curr = sum_list_dummy_head;
    // instantiate carry over to 0
    let carry_over = 0;
    while (l1 || l2){
        let new_node_val : number;
        if (l1 && l2) {
            [new_node_val, carry_over] = sumNumber(l1!.val, l2!.val, carry_over);
        } else if (!l1 && l2) {
            [new_node_val, carry_over] = sumNumber(l2.val, carry_over);
        } else {
            // at this point we know l1 is non-null and l2 is null
            [new_node_val, carry_over] = sumNumber(l1!.val, carry_over);
        }
        // console.log("val: ", new_node_val, " carr over: ", carry_over);
        let node = new ListNode(new_node_val);
        sum_list_curr.next = node;
        sum_list_curr = sum_list_curr.next;
        if (l1) {
            l1 = l1.next;
        }

        if (l2) {
            l2 = l2.next;
        }
    }

    // handle the case where we are done with the addition but we still have a carry over
    if (carry_over != 0) {
        sum_list_curr.next = new ListNode(carry_over);
    }
    console.log(sum_list_dummy_head.next);
    return sum_list_dummy_head.next;
};

// utility function to perform the addition
function sumNumber(num1: number, num2: number, carry_over = 0) : [number, number] {
    let sum = num1 + num2 + carry_over;
    if (sum > 9) {
        carry_over = 1;
        sum = sum % 10;
    } else {
        carry_over = 0;
    }

    return [sum, carry_over];
}


function demo_1() {
  let list1 = new ListNode(2, new ListNode(4, new ListNode(3)));
  let list2 = new ListNode(5, new ListNode(6, new ListNode(4)));

  addTwoNumbers(list1, list2);
}

function demo_2() {
    addTwoNumbers(new ListNode(0), new ListNode(0));
}

function demo_3() {
  let list1 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))))));;
  let list2 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))));

  addTwoNumbers(list1, list2);
}

demo_1(); // 1->1->2->3->4->4
demo_2(); // []
demo_3(); // [0]

export {}