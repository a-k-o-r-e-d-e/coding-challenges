// Given a square matrix, calculate the absolute difference between the sums of its diagonals.
// For example, the square matrix arr is shown below
// 1 2 3
// 4 5 6
// 9 8 9

// The left-to-right diagonal = 1 + 5 + 9 = 15. 
// The right to left diagonal = 3 + 5 + 9 = 17.
// Their absolute difference is |15-17| = 2.

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr: number[][]): number {
    // Write your code here
    const arrSize = arr.length;
    let leftDiagonalSum = 0;
    let rightDiagonalSum = 0;

    for (let i = 0; i < arrSize; i++) {
        leftDiagonalSum += arr[i][i];
        rightDiagonalSum += arr[arrSize-i-1][i];
    }

    return Math.abs(leftDiagonalSum-rightDiagonalSum);
}

console.log(diagonalDifference([[11, 2, 4], [4, 5, 6], [10, 8, -12]])); // 15