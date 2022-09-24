/**
 * Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
 *  Symbol       Value
 *  I             1
 *  V             5
 *  X             10
 *  L             50
 *  C             100
 *  D             500
 *  M             1000
 *
 * For example,
 *      2 is written as II in Roman numeral, just two ones added together.
 *      12 is written as XII, which is simply X + II.
 *      The number 27 is written as XXVII, which is XX + V + II.
 *
 * Roman numerals are usually written largest to smallest from left to right.
 * However, the numeral for four is not IIII. Instead, the number four is written as IV.
 * Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX.
 * There are six instances where subtraction is used:
 *      I can be placed before V (5) and X (10) to make 4 and 9.
 *      X can be placed before L (50) and C (100) to make 40 and 90.
 *      C can be placed before D (500) and M (1000) to make 400 and 900.
 *
 * Given a roman numeral, convert it to an integer.
 */

function romanToInt(s: string): number {
  let tokens: string[] = [];
  for (let index = s.length-1; index >= 0; index--) {
    let value = s[index];
    // console.log(value);
    tokens.push(value);
  }

  let result = 0;
//   console.log(tokens);
  while (tokens.length > 0) {
    const token = tokens.pop()!;
    let nextToken = tokens[tokens.length - 1];
    // console.log("Current token :: ", token);
    switch (token) {
      case "I":
        if ((nextToken === "V") || (nextToken === "X")) {
            nextToken = tokens.pop()!;
            if (nextToken === 'V') {
                /// i.e we have 'IV'
                result += 4;
            } else {
                /// next token must be x then , i.e we have 'IX' 
                result += 9;
            }
        } else {
            result += 1;
        }
        break;
      case "V":
        result += 5;
        break;
      case "X":
        if (nextToken === "L" || nextToken === "C") {
          nextToken = tokens.pop()!;
          if (nextToken === "L") {
            /// i.e we have 'XL'
            result += 40;
          } else {
            /// next token must be C then , i.e we have 'XC'
            result += 90;
          }
        } else {
          result += 10;
        }
        break;
      case "L":
        result += 50;
        break;
      case "C":
        if (nextToken === "D" || nextToken === "M") {
          nextToken = tokens.pop()!;
          if (nextToken === "D") {
            /// i.e we have 'CD'
            result += 400;
          } else {
            /// next token must be M then , i.e we have 'CM'
            result += 900;
          }
        } else {
          result += 100;
        }
        break;
      case "D":
        result += 500;
        break;
      case "M":
        result += 1000;
        break;
    }
  }
  return result;
}

console.log(romanToInt("IV")); // 4
console.log(romanToInt("MCDLXXVI")); // 1476

