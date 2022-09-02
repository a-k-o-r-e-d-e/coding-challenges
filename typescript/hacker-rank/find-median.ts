/*
* The median of a list of numbers is essentially its middle element after sorting.
* The same number of elements occur after it as before.
* Given a list of numbers with an odd number of elements, find the median

* Example
    arr = [5, 3, 1, 2, 4];
    The sorted array arr' = [1, 2, 3, 4, 5]. 
    The middle element and median is 3

*   findMedian has the following parameters
        - int arr[n]: an unsorted array of intergers
    
*   Returns
        - int: the median of the array

*   Constraints
        1 <= n <= 1000001
        n is odd
        -10000 <= arr[i] <= 100000
*/


function findMedian(arr: number[]): number {
    // Write your code here
    const sortedArr = arr.sort((a, b) => a-b);
    const arrLength = sortedArr.length;

    return sortedArr[Math.floor(arrLength/2)];
}

console.log(findMedian([5, 3, 1, 2, 4]));