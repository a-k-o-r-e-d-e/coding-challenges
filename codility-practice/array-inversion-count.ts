/**
 * An array A consisting of N integers is given.
 * An inversion is a pair of indexes (P, Q) such that P < Q and A[Q] < A[P].
 *
 * Write a function:
 *      function solution(A);
 *  that computes the number of inversions in A, or returns −1 if it exceeds 1,000,000,000.
 *
 * For example, in the following array:
 *      A[0] = -1   A[1] = 6
 *      A[2] = 3    A[3] =  4
 *      A[4] = 7    A[5] = 4
 * there are four inversions:
 *  (1,2)  (1,3)  (1,5)  (4,5)
 * so the function should return 4.
 *
 * Write an efficient algorithm for the following assumptions:
 *      - N is an integer within the range [0..100,000];
 *      - each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].
 */

function bruteForceInversionCount(arr: number[]): number {
  if (arr.length === 0 || arr.length === 1) {
    return 0;
  }

  let count = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        count += 1;
      }
      if (count > 1000000000) {
        return -1;
      }
    }
  }
  return count;
}

console.log(bruteForceInversionCount([-1, 6, 3, 4, 7, 4])); // 4

console.log("****Binary Indexed Tree Inversion Count");
class BinaryIndexedTree {
  private readonly MAX_SIZE = 100000;
  private BITree: number[];
  private readonly sizeofOriginalArray;

  constructor(size: number) {
    this.sizeofOriginalArray = size;

    /// Initialise BITree[] as 0
    // starting from one because the root of a BIT is always 0 or null
    this.BITree = new Array(size + 1).fill(0);
  }

  // Updates a node in the Binary Index Tree (BITree) at the given index in Bitree.
  // The given value is added to BITree[i] and keeps updating the next node till the next node index is greater than array size
  // the index of the next node is gotten by perfoming a 'and' operation on the twos compliment of the current index,
  // the result of this is then added to the original index
  // in JS this can be achieved with index += index & (-index) :: recall that the twos compliment of a number is its negative value
  updateBIT(index: number, val: number) {
    // index in BITree[] is 1 more than the index in arr[]
    index = index + 1;

    /// tranverse all ancestors and add val
    while (index <= this.sizeofOriginalArray) {
      /// add 'val' to the current node of BITree
      this.BITree[index] += val;

      // update index to that of the next node to update
      index += index & -index;
    }
  }

  // Returns the sum of arr[0...index].
  // This functions assumes that the array is preprocessed
  // and partial sums of array element are stored in BITree[]
  getSum(index: number) {
    let sum = 0; // initialize result

    // index in BITree[] is 1 more than the index in arr[]
    index = index + 1;

    /// Tranverse ancestors of BITree[index]
    while (index > 0) {
      // Add current element of BITree to sum
      sum += this.BITree[index];

      // move index to the parent node
      // note the index of the parent node is gotten by flipping the value of the rightmost set bit
      /// eg index =1; binary rep = 0001, flip rightmost set bit = 0000 = 0
      // eg index = 6; binary rep = 0110, flip rightmost set bit = 0100 = 6
      index -= index & -index;
    }

    return sum;
  }
}

// Converts an array to an array with values from 1 to n
// and relative order of smaller & greater elements remains the same.
// For example, {7, -90, 100, 1} is converted to {3, 1, 4, 2}
function convert(arr: number[]) {
  // Create a copy of arr[] in temp
  // and sort the temp array in increasing order
  let temp = arr.slice();
  temp.sort((a, b) => a - b);

//   console.log("Temp:: ", temp);

  // tranverse all array elements
  for (let i = 0; i < arr.length; i++) {
    // lowerBound() returns pointer to the first element greater than or equal to arr[i]
    arr[i] = lowerBound(temp, 0, arr.length, arr[i]) + 1;
  }
}

function lowerBound(arr: number[], low: number, high:number, element:number): number {
  while (low < high) {
    let middle = low + Math.floor((high - low) / 2);
    if (element > arr[middle]) {
        low = middle+1;
    } else {
        high = middle;
    }
  }
  return low;
}

/// returns inversion count
function inversionCountUsingBIT(arr: number[]) {
    let invCount = 0;

    // Convert arr[] to an array with values from 1 to n
    // and relative order of smaller and greater elements remains same.
    // for example, {7, -90, 100, 1} is converted to {3, 1, 4, 2}
    convert(arr);

    // console.log(arr);

    // Create a BIT with size equal to array size
    let BIT = new BinaryIndexedTree(arr.length);

    /// traverse all elements from the right
    for (let i = arr.length-1; i >= 0; i--) {
        /// Get the count of elements smaller than arr[i]
        const currentSum = BIT.getSum(arr[i]-1);
        invCount += currentSum;

        if (invCount > 1000000000){
            return -1;
        }

        /// update current element to BIT
        BIT.updateBIT(arr[i], 1);
    }

    return invCount;
}

console.log(inversionCountUsingBIT([-1, 6, 3, 4, 7, 4])); // 4
console.log(inversionCountUsingBIT([7, -90, 100, 1])); // 3