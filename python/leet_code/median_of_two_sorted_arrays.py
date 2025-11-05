'''
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
The overall run time complexity should be O(log (m+n)).
 
Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
 
Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 
Constraints:
  nums1.length == m
  nums2.length == n
  0 <= m <= 1000
  0 <= n <= 1000
  1 <= m + n <= 2000
  -106 <= nums1[i], nums2[i] <= 106
'''

import math
from typing import List


def find_median_sorted_arrays_bruteForce(nums1: List[int], nums2: List[int]):
    total_len = len(nums1) + len(nums2)

    
    half = math.ceil((total_len/2))-1
    mid1 = half
    mid2 = mid1+1 if total_len % 2 == 0 else mid1

    arr1_pointer = 0
    arr2_pointer = 0
    merged_arr = []

    for i in range (0, mid2+1):
        # Check if arr1Pointer is out of bounds AND arr2Pointer is in bounds
        if arr1_pointer >= len(nums1) and arr2_pointer < len(nums2):
            # Only arr2Val is available
            merged_arr.append(nums2[arr2_pointer])
            arr2_pointer+=1

        # Check if arr2Pointer is out of bounds AND arr1Pointer is in bounds
        elif arr2_pointer >= len(nums2) and arr1_pointer < len(nums1):
            # Only arr1Val is available
            merged_arr.append(nums1[arr1_pointer])
            arr1_pointer+=1

        # Compare nums1[arr1Pointer] and nums2[arr2Pointer] and append the smaller one.
        elif nums1[arr1_pointer] < nums2[arr2_pointer]:
            merged_arr.append(nums1[arr1_pointer])
            arr1_pointer+=1
        else :
            merged_arr.append(nums2[arr2_pointer])
            arr2_pointer+=1

    median = (merged_arr[mid1] + merged_arr[mid2])/2

    return median or 0


'''
# This function efficiently finds the median of two sorted arrays using a binary search approach.
# The goal is to virtually merge the two arrays and find the middle element(s) in O(log(min(m, n))) time complexity.
# It works by finding the correct partition lines in both arrays such that all elements
# to the left of the partition are less than or equal to all elements to the right of the partition.
'''
def find_median_sorted_arrays_binary_search(nums1: List[int], nums2: List[int]):
    # Ensure array A is always the shorter array to optimize the binary search range (log(min(m, n)))
    A, B = nums1, nums2
    total = len(nums1) + len(nums2)
    half = total // 2

    # Swap A and B if B is shorter than A to maintain the optimization invariant
    if len(B) < len(A):
        A, B = B, A

    # Log (min (m, n))
    # --- Binary Search Logic on the Shorter Array A ---
    # Initialize the binary search window for array A
    left, right = 0, len(A) -1

    while True:
        # Calculate the middle index for A's partition (binary search mid-point)
        i = (left+right) // 2 # Index i is for array A
        # Calculate the corresponding index j for B's partition
        # This formula ensures that the total elements on the left side (i+1 + j+1) always equals 'half'
        j = half - i - 2 # Index j is for array B

        # Determine the boundary values for the partition on array A
        # Use negative infinity if index is out of bounds (effectively treating missing elements as smallest possible)
        Aleft = A[i] if i >= 0 else float('-inf')
        Aright = A[i+1] if (i+1) < len(A) else float('inf')

        # Determine the boundary values for the partition on array B
        # Use negative infinity/positive infinity if index is out of bounds
        Bleft = B[j] if j >= 0 else float('-inf')
        Bright = B[j+1] if (j+1) < len(B) else float('inf')

        # Partition is correct
        if Aleft <= Bright and Bleft <= Aright:
            # if odd
            if total % 2:
                return min(Aright, Bright)
            # even
            return (max(Aleft, Bleft) + min(Aright, Bright))/2
        elif Aleft > Bright: 
            right = i-1
        else :
            left = i+1
