/**
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
 mod non_recursive_solution {
    use super::OptNode;
  pub fn is_palidrome(mut head: OptNode) -> bool {
    if head.is_none() {
      return false;
    }

    let mut values: Vec<i32> = Vec::new();

    while let Some(node) = head {
      values.push(node.val);
      head = node.next;
    }

    if values.len() == 1 {
      return true;
    }

    let last_index = values.len()-1;
    for i in (1..=last_index).rev() {
      if values[i] != values[last_index - i] {
        return false;
      }
    }

    return true;
}

 }

pub fn run_demo () {
  let list = Some(Box::new(ListNode{val: 1, next: Some(Box::new(ListNode::new(2)))}));

  let ans = non_recursive_solution::is_palidrome(list.clone());
  let recursive_ans = resursive_solution::is_palindrome(list);

  println!("[1,2] is palidrome: \nNonrecursive solution:: {} \nrecursive solution:: {}\n", ans, recursive_ans);

  let list = Some(Box::new(ListNode{val: 1, next: Some(Box::new(ListNode{val: 2, next: Some(Box::new(ListNode { val: 2, next: Some(Box::new(ListNode::new(1))) }))}))}));

  let ans = non_recursive_solution::is_palidrome(list.clone());
  let recursive_ans = resursive_solution::is_palindrome(list);

  println!("[1,2,2,1] is palidrome: \nNonrecursive solution:: {} \nrecursive solution:: {}", ans, recursive_ans);
}


//Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
  pub val: i32,
  pub next: Option<Box<ListNode>>
}

impl ListNode {
  #[inline]
  fn new(val: i32) -> Self {
    ListNode {
      next: None,
      val
    }
  }
}

type OptNode = Option<Box<ListNode>>;

mod resursive_solution {
    use super::OptNode;

  pub fn is_palindrome(head: OptNode) -> bool {
    let mut stack = Vec::new();
    push_to_stack(&head, &mut stack);
    check(&head, &mut stack)
  }

  fn check (node: &OptNode, stack: &mut Vec<i32>) -> bool{
    match node.as_ref() {
      None => stack.is_empty(),
      Some(n) => stack.pop() == Some(n.val) && check(&n.next, stack),
    }
  }

  fn push_to_stack(node: &OptNode, stack: &mut Vec<i32>) {
    if let Some(n) = node.as_ref() {
      stack.push(n.val);
      push_to_stack(&n.next, stack);
    }
  }
}