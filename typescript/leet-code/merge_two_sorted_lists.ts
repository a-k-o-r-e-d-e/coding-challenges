/**
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists in a one sorted list.
 * The list should be made by splicing together the nodes of the first two lists.
 * Return the head of the merged linked list.
 *
 * Example 1:
 *          A: 1->2->4
 *          B: 1->3->4
 *          sorted: 1->1->2->3->4->4
 *
 *      Input: list1 = [1,2,4], list2 = [1,3,4]
 *      Output: [1,1,2,3,4,4]
 *
 *
 * Example 2:
 *      Input: list1 = [], list2 = []
 *      Output: []
 *
 *
 * Example 3:
 *      Input: list1 = [], list2 = [0]
 *      Output: [0]
 *
 * Constraints:
 *      The number of nodes in both lists is in the range [0, 50].
 *      -100 <= Node.val <= 100
 *      Both list1 and list2 are sorted in non-decreasing order.
 *
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

type Node = ListNode|null;
/**
 * Our solution is to loop through the two list at the same time, 
 * comparing each node of both lists, the node with the minimum val is popped pushed unto to the merged list
 * 
 */
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (!list1 || !list2) {
    if (!list1) {
      return list2;
    }

    if (!list2) {
      return list1;
    }
    return null;
  }

  let merged_list_head = new ListNode(
    list1.val < list2.val ? list1.val : list2.val
  );
  let mergedListCurr: Node = merged_list_head;

  while (list1 || list2) {
    let node: Node;
    if (!list1 && list2) {
      node = new ListNode(list2.val);
      list2 = list2.next;
    } else if (!list2 && list1) {
      node = new ListNode(list1.val);
      list1 = list1.next;
    } else {
        let val:number;

        if (list1!.val < list2!.val) {
            val = list1!.val;
            list1 = list1!.next;
        } else {
            val = list2!.val;
            list2 = list2!.next;
        }
        node = new ListNode(val);
    }

    mergedListCurr!.next = node;
    if (mergedListCurr) {
      mergedListCurr = mergedListCurr.next;
    }

  }
  console.log(merged_list_head.next);
  return merged_list_head.next;
}

function demo_1() {
  let list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
  let list2 = new ListNode(1, new ListNode(3, new ListNode(4)));

  mergeTwoLists(list1, list2);
}

function demo_2() {
   console.log(mergeTwoLists(null, null));
}

function demo_3() {
  let list1 = null;
  let list2 = new ListNode(0);

  console.log(mergeTwoLists(list1, list2));
}

demo_1(); // 1->1->2->3->4->4
demo_2(); // []
demo_3(); // [0]

export {};
