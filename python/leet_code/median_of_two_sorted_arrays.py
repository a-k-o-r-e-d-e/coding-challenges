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