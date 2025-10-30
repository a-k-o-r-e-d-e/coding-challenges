/**
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
 * The overall run time complexity should be O(log (m+n)).
 *
 * Example 1:
 * Input: nums1 = [1,3], nums2 = [2]
 * Output: 2.00000
 * Explanation: merged array = [1,2,3] and median is 2.
 *
 * Example 2:
 * Input: nums1 = [1,2], nums2 = [3,4]
 * Output: 2.50000
 * Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 *
 * Constraints:
 *  nums1.length == m
 *  nums2.length == n
 *  0 <= m <= 1000
 *  0 <= n <= 1000
 *  1 <= m + n <= 2000
 *  -106 <= nums1[i], nums2[i] <= 106
 */

function findMedianSortedArrays_bruteForce(
  nums1: number[],
  nums2: number[]
): number {
  const total_len = nums1.length + nums2.length;

  const half = Math.ceil(total_len / 2) - 1;
  let mid1 = half;
  let mid2 = total_len % 2 == 0 ? mid1 + 1 : mid1;

  let arr1Pointer = 0;
  let arr2Pointer = 0;
  let mergedArr = [];

  for (let i = 0; i <= mid2; i++) {
    if (arr1Pointer >= nums1.length && arr2Pointer < nums2.length) {
      mergedArr[i] = nums2[arr2Pointer];
      arr2Pointer++;
    } else if (arr2Pointer >= nums2.length && arr1Pointer < nums1.length) {
      mergedArr[i] = nums1[arr1Pointer];
      arr1Pointer++;
    } else if (nums1[arr1Pointer] < nums2[arr2Pointer]) {
      mergedArr[i] = nums1[arr1Pointer];
      arr1Pointer++;
    } else {
      mergedArr[i] = nums2[arr2Pointer];
      arr2Pointer++;
    }
  }

  // console.log(`Mid1: ${mid1} ## Mid2: ${mid2}`)
  // console.log("Array", mergedArr)
  const median = (mergedArr[mid1] + mergedArr[mid2]) / 2;

  return median || 0;
}


function findMedianSortedArrays_binarySearch(
  nums1: number[],
  nums2: number[]
): number {
  let [A, B] = [nums1, nums2];
  let total = nums1.length + nums2.length;
  let half = Math.floor(total / 2);

  if (B.length < A.length) {
    [A, B] = [B, A];
  }

  let [left, right] = [0, A.length - 1];

  while (true) {
    let i = Math.floor((left + right) / 2);
    let j = half - i - 2;

    let Aleft = i >= 0 ? A[i] : Number.NEGATIVE_INFINITY;
    let Aright = i + 1 < A.length ? A[i + 1] : Number.POSITIVE_INFINITY;

    let Bleft = j >= 0 ? B[j] : Number.NEGATIVE_INFINITY;
    let Bright = j + 1 < B.length ? B[j + 1] : Number.POSITIVE_INFINITY;

    // Partition is correct
    if (Aleft <= Bright && Bleft <= Aright) {
      // Odd
      if (total % 2 !== 0) {
        console.log(`Aleft: ${Aright}, Bright: ${Bright}`);
        return Math.min(Aright, Bright);
      }

      // Even
      return (Math.max(Aright, Bleft) + Math.min(Aright, Bright)) / 2;
    } else if (Aleft > Bright) {
      right = i - 1;
    } else {
      left = i + 1;
    }
  }
}
