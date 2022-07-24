// Given five positive integers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers.
//Then print the respective minimum and maximum values as a single line of two space-separated long integers.

function miniMaxSum(arr: number[]): void {
  let sum: number = 0,
    maxValue = Number.NEGATIVE_INFINITY,
    minValue = Number.POSITIVE_INFINITY;

  arr.forEach((value) => {
    sum += value;
    if (value > maxValue) {
      maxValue = value;
    }
     if (value < minValue) {
      minValue = value;
    }
  });

  const minSum = sum - maxValue;
  const maxSum = sum - minValue;

  console.log(`${minSum} ${maxSum}`);
}

miniMaxSum([1, 3, 5, 7, 9]); // 16 24
