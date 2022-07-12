"use strict";

/*
 Given pointers to the heads of two sorted linked lists, merge them into a single, sorted linked list. Either head pointer may be null meaning that the corresponding list is empty.

 Example
    headA refers to 1->3->7->Null 
    headB refers to 1->2->Null 

 The new list is 1->1->2->3->7
*/

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
function mergeLists(head1: any, head2: any): any {
    if (!head1) return head2
    if (!head2) return head1
    
    if(head1.data < head2.data){
        return {"data": head1.data, "next": mergeLists(head1.next, head2)}
    }else{
        return {"data": head2.data, "next": mergeLists(head1, head2.next)} 
    }
}


