/***
 * 
 * Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
 * 
 * Example 1:
 *      Input: head = [1,2,2,1]
 *      Output: true
 * 
 * Example 2:
 *      Input: head = [1,2]
 *      Output: false
 * 
 * Constraints:
 *      The number of nodes in the list is in the range [1, 105].
 *      0 <= Node.val <= 9
 * 
 */

/* class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

    class ListNode {
      val: number
      next: ListNode | null
      constructor(val?: number, next?: ListNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.next = (next===undefined ? null : next)
      }
  }

function isPalindrome(head: ListNode | null): boolean {
    if (head == null) {
        return false;
    }
    
    let nodes:number[] = [];
    
    while (head != null) {
        nodes.push(head.val);
        head = head.next;
    }
    
    if (nodes.length == 1) {
        return true;
    } else if (nodes.length == 2 ) {
        if (nodes[0] == nodes[1]) {
            return true;
        } else {
            return false;
        }
        
    }
    
    const lastIndex = nodes.length-1;
    for (let i = lastIndex; i >= 0; i--) {
        if (nodes[i] !== nodes[lastIndex -i]) {
            return false;
        }
    }
    
    return true;
};

// function convertArrayToLinkedList(arr: number[]) : ListNode|null{
//   let head: ListNode| null = null;

//   if (arr.length > 0) {
//     head = new ListNode(arr[0], null);
//   } else {
//     return head;
//   }

//   let next = head.next;
//   for (let i = 1; i < arr.length ; i++) {
//     next = 
//   }
  
//   return head;
// }