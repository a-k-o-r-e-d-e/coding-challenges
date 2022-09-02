class BinaryIndexedTree {
  private readonly MAX_SIZE = 100000;
  private BITree: number[];
  private readonly sizeofOriginalArray;

  constructor(arr: number[]) {

    this.sizeofOriginalArray = arr.length;

    /// Initialise BITree[] as 0
    // starting from one because the root of a BIT is always 0 or null
    this.BITree = new Array(arr.length+1).fill(0);

    /// Store the actual values in BITree[]
    // using the updateBIT() method
    for (let i = 0; i < arr.length; i++) {
      this.updateBIT(i, arr[i]);
    }
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

/// test code
let freq = [2, 1, 1, 3, 2, 3, 4, 5, 6, 7, 8, 9];
const BIT = new BinaryIndexedTree(freq);

console.log("Sum of elements in arr[0..5]" + " is " + BIT.getSum(5));

// Let use test the update operation 
// Update BIT for above change in arr[] 
BIT.updateBIT(3, 6);

// Find sum after the value is updated 
console.log("Sum of elements in arr[0..5]" + " is " + BIT.getSum(5));

export {}