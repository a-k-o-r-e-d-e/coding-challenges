import PriorityQueue from "../data-structures/priority-queue";

/***
 * You are given an m x n binary matrix mat of 1's (representing soldiers) and 0's (representing civilians).
 * The soldiers are positioned in front of the civilians.
 * That is, all the 1's will appear to the left of all the 0's in each row.
 *
 * A row i is weaker than a row j if one of the following is true:
 *      The number of soldiers in row i is less than the number of soldiers in row j.
 *      Both rows have the same number of soldiers and i < j.
 *
 * Return the indices of the k weakest rows in the matrix ordered from weakest to strongest.
 *
 * Example 1:
 *  Input: mat =
 *      [[1,1,0,0,0],
 *      [1,1,1,1,0],
 *      [1,0,0,0,0],
 *      [1,1,0,0,0],
 *      [1,1,1,1,1]],
 *  k = 3
 *  Output: [2,0,3]
 *  Explanation:
 *  The number of soldiers in each row is:
 *      - Row 0: 2
 *      - Row 1: 4
 *      - Row 2: 1
 *      - Row 3: 2
 *      - Row 4: 5
 * The rows ordered from weakest to strongest are [2,0,3,1,4].
 *
 * Example 2:
 * Input: mat =
 *      [[1,0,0,0],
 *      [1,1,1,1],
 *      [1,0,0,0],
 *      [1,0,0,0]],
 * k = 2
 * Output: [0,2]
 * Explanation:
 * The number of soldiers in each row is:
 *      - Row 0: 1
 *      - Row 1: 4
 *      - Row 2: 1
 *      - Row 3: 1
 * The rows ordered from weakest to strongest are [0,2,3,1].
 *
 * Constraints:
 *      m == mat.length
 *      n == mat[i].length
 *      2 <= n, m <= 100
 *      1 <= k <= m
 *      matrix[i][j] is either 0 or 1.
 *
 */

function kWeakestRowsBruteForce(mat: number[][], k: number): number[] {
  let soldiersCountArr: [number, number][] = [];

  const rowLen = mat.length;
  const colLen = mat[0].length;

  for (let rowIndex = 0; rowIndex < rowLen; ++rowIndex) {
    // console.log(row)
    let row = mat[rowIndex];
    let rowSoldiersCount = 0;
    for (let colIndex = 0; colIndex < row.length; ++colIndex) {
      if (row[colIndex] != 1) {
        rowSoldiersCount = colIndex;
        break;
      }

      if (colIndex == colLen - 1) {
        rowSoldiersCount = colIndex + 1;
        break;
      }
    }
    soldiersCountArr.push([rowIndex, rowSoldiersCount]);
  }

  // console.log(soldiersCountArr);
  soldiersCountArr.sort((a, b) => a[1] - b[1]);
  // console.log(soldiersCountArr);
  const results = soldiersCountArr.slice(0, k).map((turple) => turple[0]);
  // console.log(results);
  return results;
}

/// Improved using binary search
function kWeakestRowsBinarySearch(mat: number[][], k: number): number[] {
  let soldiersCountArr: [number, number][] = [];

  const rowLen = mat.length;

  for (let rowIndex = 0; rowIndex < rowLen; ++rowIndex) {
    // console.log(row)
    let row = mat[rowIndex];
    let rowSoldiersCount = getRowSoldiersCount(row);
    soldiersCountArr.push([rowIndex, rowSoldiersCount]);
  }

  // console.log(soldiersCountArr);
  soldiersCountArr.sort((a, b) => a[1] - b[1]);
  // console.log(soldiersCountArr);
  const results = soldiersCountArr.slice(0, k).map((turple) => turple[0]);
  console.log(results);
  return results;
}

interface SoldierCount {
  rowIndex: number;
  count: number;
}
// Improved using priority queue and binary search
function kWeakestRowsPriorityQueue(mat: number[][], k: number): number[] {
  let priorityQueue: PriorityQueue<SoldierCount> =
    new PriorityQueue<SoldierCount>(function (a, b) {
      if (a.count == b.count) {
        return a.rowIndex - b.rowIndex;
      } else {
        return a.count - b.count;
      }
    });

  const rowLen = mat.length;

  for (let rowIndex = 0; rowIndex < rowLen; ++rowIndex) {
    // console.log(row)
    let row = mat[rowIndex];
    let rowSoldiersCount = getRowSoldiersCount(row);
    // console.log("row Index: ", rowIndex, " count: ", rowSoldiersCount);
    let soldierCount: SoldierCount = {
      rowIndex: rowIndex,
      count: rowSoldiersCount,
    };
    priorityQueue.add(soldierCount);
  }

  // priorityQueue.toString();

  let result: number[] = [];
  for (let i = 0; i < k; ++i) {
    result.push(priorityQueue.removeFirst()!.rowIndex);
  }

  console.log(result);
  return result;
}

function getRowSoldiersCount(row: number[]): number {
  if (row[0] == 0) {
    return 0;
  }

  if (row[row.length - 1] == 1) {
    return row.length;
  }

  let left = 0;
  let right = row.length - 1;

  while (right >= left) {
    let mid = left + Math.floor((right - left) / 2);

    if (row[mid] == 1) {
      left = mid + 1;
      continue;
    } else if (row[mid] == 0) {
      if (row[mid - 1] == 1) {
        return mid;
      } else {
        right = mid - 1;
      }
    }
  }

  return row.length;
}

// [2, 0, 3]
kWeakestRowsPriorityQueue(
  [
    [1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  3
);

// [0, 2]
kWeakestRowsPriorityQueue(
  [
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  2
);

// [1, 0]
kWeakestRowsPriorityQueue(
  [
    [1, 0],
    [0, 0],
    [1, 0],
  ],
  2
);
