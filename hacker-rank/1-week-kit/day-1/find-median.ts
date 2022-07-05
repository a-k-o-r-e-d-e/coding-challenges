function findMedian(arr: number[]): number {
    // Write your code here
    const sortedArr = arr.sort((a, b) => a-b);
    const arrLength = sortedArr.length;

    return sortedArr[Math.floor(arrLength/2)];
}

console.log(findMedian([5, 3, 1, 2, 4]));