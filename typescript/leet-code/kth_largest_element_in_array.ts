/**
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 *
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * Can you solve it without sorting?
 *
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 *
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 *
 * Constraints:
 * 1 <= k <= nums.length <= 105
 * -104 <= nums[i] <= 104
 */

import PriorityQueue from "../data-structures/priority-queue";

function findKthLargest(nums: number[], k: number): number {
    let heap = new PriorityQueue<number>((a,b) => b-a);

    for (let num of nums) {
        heap.add(num);
    }

    for (let i = 1; i<k; i++) {
        heap.removeFirst();
    }


    return heap.first;
};

function run_demo() {
    let array_a = [3, 2, 1, 5, 6, 4];
    let array_b = [3, 2, 3, 1, 2, 4, 5, 5, 6];

    console.log(findKthLargest(array_a, 2));
    console.log(findKthLargest(array_b, 4));
}

run_demo();