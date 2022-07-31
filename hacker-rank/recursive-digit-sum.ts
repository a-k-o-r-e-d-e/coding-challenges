/*
 We define super digit of an integer x using the following rules:

 Given an integer, we need to find the super digit of the integer.
    - If x has only 1 digit, then its super digit is x.
    - Otherwise, the super digit of x is equal to the super digit of the sum of the digits of x.
 For example, the super digit of 9875 will be calculated as:
    super_digit(9875)   	9+8+7+5 = 29 
	super_digit(29) 	2 + 9 = 11
	super_digit(11)		1 + 1 = 2
	super_digit(2)		= 2  

 Example
 n = 9875
 k = 4


 The number  is created by concatenating the string   times so the initial .

    superDigit(p) = superDigit(9875987598759875)
                  9+8+7+5+9+8+7+5+9+8+7+5+9+8+7+5 = 116
    superDigit(p) = superDigit(116)
                  1+1+6 = 8
    superDigit(p) = superDigit(8)
 All of the digits of p sum to 116. The digits of 116 sum to 8. 8 is only one digit, so it is the super digit.
*/

/*
 * Complete the 'superDigit' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING n: a string representation of an integer
 *  2. INTEGER k: the times to concatenate n to make p
 * 
 * Returns
 *  int: the super digit of n repeated k times
 */

function superDigit(n: string, k: number): number {
    // Write your code here
    // n = n.repeat(k);
    if (n.length == 1 && k == 1) {
        return Number(n);
    }

    let sum = [...n].reduce((a, b) => BigInt(a) + BigInt(b), BigInt(0));

    sum *= BigInt(k);
    return superDigit(sum.toString(), 1);
}

console.log(superDigit('9875', 4)); // 8
console.log(superDigit('148', 3)); // 3
console.log(superDigit('123', 3)); // 9
