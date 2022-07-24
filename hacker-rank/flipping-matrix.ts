/*
 * Complete the 'flippingMatrix' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY matrix as parameter.
 */
/*
    Sample Input
 * 112 42 83 119
 * 56 125 56 49
 * 15 78 101 43
 * 62 98 114 108

    Sample Output
 *  414

*/

function flippingMatrix(matrix: number[][]): number {
  // Explanation of solution
  // To get the maximal,
  // we switch each member of the topleft quadrant with the max value that can switch places with it
  // For each position, we check which quadrant has the max value.
  // There can only be 4 quadrants

  const arrSize = matrix.length;
  const quadrantSize = arrSize / 2;
  let sum = 0;

  for (let rowIndex = 0; rowIndex < quadrantSize; rowIndex++) {
    for (let colIndex = 0; colIndex < quadrantSize; colIndex++) {
      const topLeftQuadrantValue = matrix[rowIndex][colIndex];
      const topRightQuadrantValue =
        matrix[rowIndex][arrSize - 1 - colIndex];
      const bottomLeftQuadrantValue =
        matrix[arrSize - 1 - rowIndex][colIndex];
      const bottomRightQuadrantValue =
        matrix[arrSize - 1 - rowIndex][arrSize - 1 - colIndex];

      // Store the max value in the top left quadrant
      const maxValue = Math.max(
        topLeftQuadrantValue,
        topRightQuadrantValue,
        bottomLeftQuadrantValue,
        bottomRightQuadrantValue
      );
      console.log("top Left Quadrant", topLeftQuadrantValue);
      console.log("top Right Quadrant", topRightQuadrantValue);
      console.log("Bottom Left Quadrant", bottomLeftQuadrantValue);
      console.log("Bottom Right Quadrant", bottomRightQuadrantValue);
      console.log("max Value", maxValue);
      matrix[rowIndex][colIndex] = maxValue;
      sum += maxValue;
    }
  }

  return sum;
}
// 112 42 83 119
// 56 125 56 49
// 15 78 101 43
// 62 98 114 108

// 414

console.log(
  flippingMatrix([
    [112, 42, 83, 119],
    [56, 125, 56, 49],
    [15, 78, 101, 43],
    [62, 98, 114, 108],
  ])
);

function flipColumn(matrix: number[][], colIndex: number): number[][] {
  const arrSize = matrix.length;

  const midPoint = Math.floor(arrSize / 2);

  for (let i = 0; i < midPoint; i++) {
    let temp = matrix[i][colIndex];
    matrix[i][colIndex] = matrix[i + midPoint][colIndex];
    matrix[i + midPoint][colIndex] = temp;
  }

  return matrix;
}

function flipRow(matrix: number[][], rowIndex: number): number[][] {
  const arrSize = matrix.length;

  const midPoint = Math.floor(arrSize / 2);

  for (let i = 0; i < midPoint; i++) {
    let temp = matrix[rowIndex][i];
    matrix[rowIndex][i] = matrix[rowIndex][i + midPoint];
    matrix[rowIndex][i + midPoint] = temp;
  }

  return matrix;
}
