/**
 * Definition for singly-linked list.
 * */

 class ListNode {
     val: number
     next: ListNode | null
     constructor(val?: number, next?: ListNode | null) {
         this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
     }
}
 

function middleNodeBruteForce(head: ListNode | null): ListNode | null {
  if (head == null || head.next == null) {
    return head;
  }

  let leadingPointer = head.next;

  if (leadingPointer.next == null) {
    return leadingPointer;
  }

  leadingPointer = leadingPointer.next;

  if (leadingPointer.next == null) {
    return head.next;
  }

  let trailingPointer: ListNode | null = head;

  while (true) {
    trailingPointer = trailingPointer!.next;
    if (leadingPointer.next == null) {
      return trailingPointer!;
    }

    leadingPointer = leadingPointer.next;
    if (leadingPointer.next == null) {
      return trailingPointer!.next;
    }
    leadingPointer = leadingPointer.next;
  }
}

function middleNodeImproved(head: ListNode | null): ListNode | null {
  
   if (head == null) {
     return head;
   }

   let fastPointer: ListNode | null = head;
   let slowPointer = head;

   while (fastPointer != null && fastPointer.next != null) {
     slowPointer = slowPointer.next!;
     fastPointer = fastPointer.next.next;
   }

   return slowPointer;
}

export {}