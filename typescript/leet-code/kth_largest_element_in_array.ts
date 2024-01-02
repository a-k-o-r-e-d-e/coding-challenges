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

function findKthLargest_PriorityQueueSolution(
  nums: number[],
  k: number
): number {
  let heap = new PriorityQueue<number>((a, b) => b - a);

  for (let num of nums) {
    heap.add(num);
  }

  for (let i = 1; i < k; i++) {
    heap.removeFirst();
  }

  return heap.first;
}

function findKthLargest_QuickSelectSolution(nums: number[], k: number): number {
  return quick_select(nums, 0, nums.length - 1, nums.length - k);
}

function quick_select(arr: number[], low: number, high: number, k: number) {
    if (low === high ) {
        return arr[low];
    }
  // find partition
  let pivotIndex = _partition(arr, low, high);

  /**
   * Use pivotIndex as the seperater. If k is smaller than the length of the
   * right side of the array, the target is in the right side of the array.
   * If k is larger, the target is in the left side of the array.
   */

  // if partition value is equal to the kth position,
  // return value at k.
  if (pivotIndex === k) {
    return arr[pivotIndex];
  }

  // if partition value is greater than kth position,
  // search right side of the array.
  else if (k < pivotIndex) {
    return quick_select(arr, low, pivotIndex -1, k);
  }

  // if partition value is less than kth position,
  // search left side of the array.
  else {
    return quick_select(arr, pivotIndex+1, high, k);
  }
}

function swap(arr: number[], i: number, j: number) {
  [arr[j], arr[i]] = [arr[i], arr[j]];
}

// partition function similar to quick sort
// Considers last element as pivot and adds
// elements with less value to the left and
// high value to the right and also changes
// the pivot position to its respective position
// in the final array.
function _partition(arr: number[], start: number, end: number) {
  /**
   * Use the last element as pivot for simplicity. Randomized pivot
   * is a better way to avoid worst case where the the largest or the smallest
   * element is always selected.
   */
  const pivot = arr[end];
  let i = start;
  let j = end - 1;
  // move all numbers smaller than pivot to the left and larger to the right
  while (i <= j) {
    while (arr[i] < pivot) {
      i += 1;
    }
    while (arr[j] > pivot) {
      j -= 1;
    }
    if (i <= j) {
      swap(arr, i, j);
      i += 1;
      j -= 1;
    }
  }
  // Swap pivot value to the position so that all numbers larger than pivot value
  // is on the right, and smaller on the left.
  swap(arr, i, end);
  // return the final index where the pivot value is.
  return i;
}

function run_demo() {
  let array_a = [3, 2, 1, 5, 6, 4];
  let array_b = [3, 2, 3, 1, 2, 4, 5, 5, 6];

  console.log(findKthLargest_QuickSelectSolution(array_a, 2));
  console.log(findKthLargest_QuickSelectSolution(array_b, 4));
}

run_demo();
