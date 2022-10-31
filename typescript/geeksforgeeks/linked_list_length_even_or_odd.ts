/**
 * Given a linked list of size N, 
 * your task is to complete the function isLengthEvenOrOdd() which contains head of the linked list and check whether the length of linked list is even or odd.
 * 
 * Input:
 *      The input line contains T, denoting the number of testcases. Each testcase contains two lines. the first line contains N(size of the linked list). the second line contains N elements of the linked list separated by space.
 * 
 * Output:
 *      For each testcase in new line, print "even"(without quotes) if the length is even else "odd"(without quotes) if the length is odd.
 * 
 * User Task:
 *      Since this is a functional problem you don't have to worry about input, you just have to  complete the function isLengthEvenOrOdd() which takes head of the linked list as input parameter and returns 0 if the length of the linked list is even otherwise returns 1.
 * 
 * Constraints:
 *      1 <= T <= 100
 *      1 <= N <= 103
 *      1 <= A[i] <= 103
 * 
 * 
 * Example 1:
 *      Input:
 *          9 4 3
 *      Output:
 *          Odd
 * 
 * Example 2:
 *      Input:
 *          12 52 10 47 95 0
 *      Output:
 *          Even
 * 
 * Explanation:
 *      Testcase 1: The length of linked list is 3 which is odd.
 *      Testcase 2: The length of linked list is 6 which is even.
 */
// LINKED LIST NODE
class Node {
    data: any;
    next: Node|null;
  constructor(x: any, next?: Node|null) {
    this.data = x;
    this.next = next == undefined ? null : next;
  }
}

// Function should return 0 if length is even else return 1
// Our solution is to make a pass through the list, keeping track of if the length is even or odd
  function isLengthEvenOrOdd(head: Node|null){
    let is_even = true;
    while (head){
        head = head.next;
        is_even = !is_even;
    }

    return is_even ? 0 : 1;
  }

  let list_a = new Node(1, new Node(4, new Node(3)));
  let list_b = new Node(12, new Node(52, new Node(10, new Node(47, new Node(95, new Node(0))))));


  console.log(isLengthEvenOrOdd(list_a));
  console.log(isLengthEvenOrOdd(list_b));

export {}