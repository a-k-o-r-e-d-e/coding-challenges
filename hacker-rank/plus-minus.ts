/**
 * Given an array of integers, calculate the ratios of its elements that are positive, negative, and zero.
 * Print the decimal value of each fraction on a new line with 6 places after the decimal.
 * 
 * Note: This challenge introduces precision problems.
 * The test cases are scaled to six decimal places, though answers with absolute error of up to 10^(-4) are acceptable.
 * 
 * Example:
 *      arr = [1, 1, 0, -1, -1]
 *  There are n = 5 elements, two positive, two negative and one zero.
 *  Their ratios are 2/5=0.400000, 2/5=0.400000 and 1/5 = 0.200000. 
 *  Results are printed as:
 *      0.400000
 *      0.400000
 *      0.200000
 * 
 * Function Description
 * plusMinus has the following parameter(s):
 *      int arr[n]: an array of integers
 * Output
 *      Print the ratios of positive, negative and zero values in the array. 
 *      Each value should be printed on a separate line with 6 digits after the decimal. 
 *      The function should not return a value.
 * 
*/

function plusMinus(arr: number[]): void {
    const arraySize = arr.length;
    let negativeCount : number = 0, positiveCount : number = 0, zeroCount: number = 0;
    
    arr.forEach((value => {
        if (value > 0) {
            positiveCount++
        } else if (value < 0) {
            negativeCount++;
        } else {
            zeroCount++;
        }
    }))
    
    
    
    console.log((positiveCount/arraySize).toPrecision(6));
    console.log((negativeCount/arraySize).toPrecision(6));
    console.log((zeroCount/arraySize).toPrecision(6));
}

///prints
/// 0.375000
/// 0.375000
/// 0.250000 
plusMinus([1, 2, 3, -1, -2, -3, 0, 0]);