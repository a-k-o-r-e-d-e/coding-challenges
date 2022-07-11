/*
 Given an array of n distinct integers,
 transform the array into a zig zag sequence by permuting the array elements.
 A sequence will be called a zig zag sequence 
 if the first k elements in the sequence are in increasing order 
 and the last k elements are in decreasing order,
 where k = (n+1)/2 . 

 Example.
 a = [2,3,5,1,4]

 Now if we permute the array as [1,2,5,4,3], the result is a zig zag sequence.

 Constraints
 1 <= n <= 10000 (n is always odd)
*/


function findZigZagSequence(arr: number[]){
    arr.sort((a, b) => a-b);

    const arrSize = arr.length;

    let mid = Math.floor((arrSize)/2);
    let temp = arr[mid];
    arr[mid] = arr[arrSize - 1];
    arr[arrSize - 1] = temp;

    let st = mid + 1;
    let ed = arrSize - 2;
    while(st <= ed){
        temp = arr[st];
        arr[st] = arr[ed];
        arr[ed] = temp;
        st = st + 1;
        ed = ed - 1;
    }
    console.log(arr);
}

findZigZagSequence([1, 2, 3, 4, 5, 6, 7]); /// [1, 2, 3, 7, 6, 5, 4]