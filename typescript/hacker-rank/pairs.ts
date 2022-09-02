/*
 * Complete the 'pairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function pairs(target: number, arr: number[]): number {
    // Write your code here
    arr = arr.sort((a, b) => a-b);
    let pairsCount = 0;
    for (let i = 0; i < arr.length-1; i++) {
        for (let k = i+1; k < arr.length; k++) {
            const diff = arr[k] - arr[i];
            if (diff == target) {
                pairsCount ++;
            }

            if (diff > target) {
                break;
            }
        }
    }

    return pairsCount;
}

console.log(pairs(1, [1, 2, 3, 4]));