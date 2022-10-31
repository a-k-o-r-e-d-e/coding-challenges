// Definition for node.
class Node {
  val: number;
  prev: Node | null;
  next: Node | null;
  child: Node | null;
  constructor(val?: number, prev?: Node, next?: Node, child?: Node) {
    this.val = val === undefined ? 0 : val;
    this.prev = prev === undefined ? null : prev;
    this.next = next === undefined ? null : next;
    this.child = child === undefined ? null : child;
  }
}

type NNode = Node | null;
/** 
 * Our solution is to use a recursive function called 'flatten_child'
 * flatten_child loops through the list, returning the head and tail of the flattenned child
 * when it encouters a node with a child, it recursively flattens the child list. 
 * the head and tail of the returned flattened child list are then used to add the flattened list in place
 */
function flatten(head: Node | null): Node | null {
    if (!head) {
        return null;
    }

    [head] = flatten_child(head);

    return head;
}

/** Recursively flattens the child list, returning its head and tail */
function flatten_child(head: Node): [Node, Node] {
  let curr_node: Node = head;

  while (curr_node.next || curr_node.child) {
    let curr_head_next = curr_node.next;

    // if node has child, recursively flatten it 
    if (curr_node.child) {
      let [flattened_child_head, flattened_child_tail] = flatten_child(
        curr_node.child
      );

      // add the flattened child in place to the list 
      curr_node.next = flattened_child_head;
      flattened_child_head.prev = curr_node;
      if (curr_head_next) {
        curr_head_next.prev = flattened_child_tail;
      }
      flattened_child_tail.next = curr_head_next;
      curr_node.child = null;
    }

    if (curr_head_next) {
      curr_node = curr_head_next;
    }
  }

  return [head, curr_node];
}


export {};
