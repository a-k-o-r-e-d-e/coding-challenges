// Given two positive integers, compute their quotient, 
// using only the addition, subtraction, and shifting operators.
// Hint: Relate x/y to (x - y)/y.

// A brute-force approach is to iteratively subtract y from x until what remains is less than y. 
// The number of such subtractionsis exactly the quotient, x/y, and the remainder is the term that's less than y.
// The complexity of the brute-force approach is very high, e.g., when y = 1and x = 231 -1, it will take 231 -1iterations.

// A better approach isto try and get more work done in each iteration. 
// For example, we can compute the largest k such that 
// 2ky (2 raised to the power of k) < x,subtract 2ky from x,and add 2k to the quotient.
// For example, if x = (1011)base2 and y = (10)base2, then k = 2, since 2 X 22 < 11 and 2 X 23 > 11. 
// We subtract (1000)base2 from (1011)base2 to get (11)base2, 
// add 2k = 22 = (100)base2 to the quotient, and continue by updating x to (11)base2.

// The advantage of using 2ky isthatitcan be compute<d very efficiently usingshifting,
// and x is at least halved in each iteration. 

// A better way to find the largest k in each iteration is to recognize that it keeps decreasing. 
// Therefore, instead of testing in each iteration whether 2°y,2ly,22y,... is less than or equal to x, 
// after we initially find the largest k such that 2ky < x, 
// in subsequent iterations we test 2^(k-1)y,2^(k~2)>y,2^(k~3)y,... with x

function divide (x: number, y: number) : number {
    let result: number = 0, power: number = 32;
    let yPower = y << power;
    while (x >= y) {
        while (yPower > x) {
            yPower >>>= 1;
            --power;
        }

        result += 1 << power;
        x -= yPower;
    }

    return result;
}

console.log("Divide 11 by 5 gives ::", divide(33, 5));