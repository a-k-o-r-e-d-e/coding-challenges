/**
 * A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.
 * Construct a deep copy of the list.
 * The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node.
 * Both the next and random pointer of the new nodes should point to new nodes in the copied list
 * such that the pointers in the original list and copied list represent the same list state.
 * None of the pointers in the new list should point to nodes in the original list.
 *
 * For example, if there are two nodes X and Y in the original list, where X.random --> Y,
 * then for the corresponding two nodes x and y in the copied list, x.random --> y.
 *
 * Return the head of the copied linked list.
 *
 * The linked list is represented in the input/output as a list of n nodes.
 * Each node is represented as a pair of [val, random_index] where:
 *      val: an integer representing Node.val
 *      random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
 *
 * Your code will only be given the head of the original linked list.
 *
 *
 * Example 1:
 *      Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
 *      Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
 *
 *
 * Example 2:
 *      Input: head = [[1,1],[2,1]]
 *      Output: [[1,1],[2,1]]
 *
 *
 * Example 3:
 *      Input: head = [[3,null],[3,0],[3,null]]
 *      Output: [[3,null],[3,0],[3,null]]
 *
 *
 * Constraints:
 *      0 <= n <= 1000
 *      -104 <= Node.val <= 104
 *      Node.random is null or is pointing to some node in the linked list.
 *
 */

// Definition for Node.
class Node {
  val: number;
  next: Node | null;
  random: Node | null;
  constructor(val?: number, next?: Node, random?: Node) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}

/**
 * Our solution is to interweave the create copies of the nodes, and interweave them with the original nodes
 * given a list A->B->C
 * after interweaving te copies it becomes A->A'->B->B'->C->C'
 * 
 * once we have interweave the copies, we are sure that the copies always follow the original, 
 * hence if A has a random to C, we are certain that C' is directly after C.
 * hence we make a pass at the list, attaching the random
 */
function copyRandomList(head: Node | null): Node | null {
  /// interweave copies
  {
    let curr_node = head;
    while (curr_node) {
      let copy = new Node(curr_node.val, curr_node.next ?? undefined);
      curr_node.next = copy;
      curr_node = copy.next;
    }
  }

//   printList(head);
  /// put up random pointers
  {
    let curr_node = head;
    while (curr_node) {
        let curr_copy = curr_node.next!;
        if (curr_node.random) {
            curr_copy.random = curr_node.random.next
        }
        curr_node = curr_copy.next;
    }
    
  }

  /// pull out the copies
  let copy_list_dummy_head = new Node(-1);
  {
    let curr_node = head;
    let copy_list_node = copy_list_dummy_head;
    while (curr_node) {
        let copy = curr_node.next!;
        copy_list_node.next = copy;
        copy_list_node = copy_list_node.next;
        curr_node.next = copy.next
        curr_node = copy.next;
    }
  }

  printList(copy_list_dummy_head.next);
  return copy_list_dummy_head.next;
}

function printList(head: Node | null): void {
  let curr_node = head;
  let arr = [];
  while (curr_node) {
    arr.push(curr_node.val);
    curr_node = curr_node.next;
  }

  console.log(arr);
}

let list_a = new Node(1, new Node(5, new Node(9)));

copyRandomList(list_a);

export {};
