/**
 * Two children, Lily and Ron, want to share a chocolate bar.
 * Each of the squares has an integer on it.
 * Lily decides to share a contiguous segment of the bar selected such that:
 *      The length of the segment matches Ron's birth month, and,
 *      The sum of the integers on the squares is equal to his birth day.
 *      Determine how many ways she can divide the chocolate.
 *
 * Example
 *      s = [2, 2, 1, 3, 2]
 *      d = 4
 *      m = 2
 *  Lily wants to find segments summing to Ron's birth day, d = 4 with a length equalling his birth month, m = 2.
 *  In this case, there are two segments meeting her criteria: [2, 2] and [1, 3].
 *
 * Function Description
 * Complete the birthday function.
 * birthday has the following parameter(s):
 *      int s[n]: the numbers on each of the squares of chocolate
 *      int d: Ron's birth day
 *      int m: Ron's birth month
 *
 * Returns
 *      int: the number of ways the bar can be divided
 *
 * Constraints
 *      1 <= n <= 100
 *      1 <= s[i] <= 5, where (0<=i<n)
 *      1 <= d <= 31
 *      1 <= m <= 12
 */

function birthdayBruteForce(s: number[], d: number, m: number): number {
  let sum = 0;
  let sumArr: number[] = [0];

  /// compute and store the sum of 0...i in the (i+1)th element of sumArr
  for (let val of s) {
    sum += val;
    sumArr.push(sum);
  }
  // console.log(sumArr)
  let subArrCount = 0;

  for (let i = m; i < sumArr.length; i++) {
    /// (sumArr[i] - sumArr[i-m]) gives us the sum of the segment with length m
    if (sumArr[i] - sumArr[i - m] == d) {
      // console.log(sumArr[i], sumArr[i-m])
      subArrCount += 1;
    }
  }
  return subArrCount;
}

console.log(birthdayBruteForce([2, 2, 1, 3, 2], 4, 2)); // 2
console.log(birthdayBruteForce([1, 1, 1, 1, 1], 3, 2)); // 0
console.log(birthdayBruteForce([4], 4, 1)); // 1

console.log("*** Sliding Window Solution ***");
function birthdaySlidingWindow(s: number[], d: number, m: number): number {
  let start = 0,
    end = 0,
    currSum = 0,
    count = 0;

  while (end < s.length) {
    // console.log(end);
    currSum += s[end];
    const segLength = end - start + 1;
    if (segLength < m) {
      end++;
    }

    /// if window or segment length is equal to m
    if (segLength === m) {
      if (currSum === d) {
        count++;
      }
      currSum -= s[start];
      start++;
      end++;
    }
  }

  return count;
}

console.log(birthdaySlidingWindow([2, 2, 1, 3, 2], 4, 2)); // 2
console.log(birthdaySlidingWindow([1, 1, 1, 1, 1], 3, 2)); // 0
console.log(birthdaySlidingWindow([4], 4, 1)); // 1


console.log("*** Segment Tree Solution ***");

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
  


function birthdaySegmentTreeSolution(s: number[], d: number, m: number): number {

    if (s.length === 1) {
        if (s[0] === d && m === 1){
            return 1;
        }
    }

    const segTree = new SegmentTree(s);
    let count = 0;


  for (let i = m; i < s.length+1; i++) {
    /// (sumArr[i] - sumArr[i-m]) gives us the sum of the segment with length m
    // console.log("Indexes:: ",i-m, i)
    // console.log("Sum:: ", segTree.query(i-m, i))
    if (segTree.query(i-m, i) === d) {
      count += 1;
    }
  }
    return count;
  }
  
//   console.log(birthdaySegmentTreeSolution([2, 2, 1, 3, 2], 4, 2)); // 2
//   console.log(birthdaySegmentTreeSolution([1, 1, 1, 1, 1], 3, 2)); // 0
//   console.log(birthdaySegmentTreeSolution([4], 4, 1)); // 1
  console.log(birthdaySegmentTreeSolution([2, 5, 1, 3, 4, 4, 3, 5, 1, 1, 2, 1, 4, 1, 3, 3, 4, 2, 1], 18, 7)); // 1
  