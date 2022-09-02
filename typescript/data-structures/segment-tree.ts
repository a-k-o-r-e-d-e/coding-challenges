/**
 * In computer science, a segment tree, also known as a statistic tree, is a tree data structure used for storing information about intervals, or segments.
 * It allows querying which of the stored segments contain a given point.
 * It is, in principle, a static structure; that is, it's a structure that cannot be modified once it's built.
 * A similar data structure is the interval tree.
 *
 * A segment tree for a set I of n intervals uses O(n log n) storage and can be built in O(n log n) time.
 * Segment trees support searching for all the intervals that contain a query point in time O(log n + k), k being the number of retrieved intervals or segments.
 *
 *  */

class SegmentTree {
  private tree: number[];
  private readonly inputArrSize;

  constructor(arr: number[]) {
    this.tree = new Array(2 * arr.length).fill(0);
    this.inputArrSize = arr.length;
    this.buildTree(arr);
  }


  /**
   * The parent always has its less index than its children, 
   * so we just process all the nodes in decreasing order, calculating the value of the parent node. 
   * If the code inside the build function to calculate parents seems confusing, then you can see this code. 
   * It is equivalent to that inside the build function. 
   *        tree[i]=tree[2*i]+tree[2*i+1]
   */
  private buildTree(arr: number[]) {
    const arrSize = arr.length;
    // insert leaf nodes in the tree
    for (let i = 0; i < arrSize; i++) {
      this.tree[arrSize + i] = arr[i];
    }

    // calculate parent and build tree
    for (let i = arrSize - 1; i > 0; --i) {
      // For index i , the left child will be at (2 * i) and the right child will be at (2*i + 1) index.
      // So the values at nodes at (2 * i) and (2*i + 1) are combined at i-th node to construct the tree.
      this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
    }
  }

  updateTreeNode(index: number, value: number) {
    // set value at index
    this.tree[index + this.inputArrSize] = value;
    index = index + this.inputArrSize;

    // move upwards and update parents
    for (let i = index; i > 1; i >>= 1) {
      this.tree[i >> 1] = this.tree[i] + this.tree[i ^ 1];
    }
  }

  // function to get sum of interval (start, end)
  /**
   * 
   * The idea behind the query function is whether we should include an element in the sum or whether we should include its parent. 
   * Consider that L is the left border of an interval and R is the right border of the interval [L,R). 
   * It is clear that if L is odd, then it means that it is the right child of its parent and our interval includes only L and not the parent. 
   * So we will simply include this node to sum and move to the parent of its next node by doing L = (L+1)/2. 
   * Now, if L is even, then it is the left child of its parent and the interval includes its parent also unless the right borders interfere. 
   * Similar conditions are applied to the right border also for faster computation. 
   * We will stop this iteration once the left and right borders meet.
   * 
   */
  query(left: number, right: number) {
    let result = 0;

    // loop to find the sum in the range
    for (
      left += this.inputArrSize, right += this.inputArrSize;
      left < right;
      left >>= 1, right >>= 1
    ) {
        // if left is odd, then it means that it is the right child of its parent and our interval includes only L and not the parent. 
        if ((left & 1) > 0) {
            result += this.tree[left++]
        }

        if ((right & 1) > 0) {
            result += this.tree[--right];
        }
    }

    return result;
  }
}


console.log("****Driver Code*****");

const inputArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const segTree = new SegmentTree(inputArr);

// print the sum in range(1,2) index-based
console.log(segTree.query(1, 3));

// modify element at 2nd index
segTree.updateTreeNode(2, 1);

// print the sum in range(1,2) index-based
console.log(segTree.query(1, 3));

export {}