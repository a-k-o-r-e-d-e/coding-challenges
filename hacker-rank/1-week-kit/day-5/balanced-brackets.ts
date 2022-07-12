'use strict';

/*

 A bracket is considered to be any one of the following characters: (, ), {, }, [, or ].

 Two brackets are considered to be a matched pair if the an opening bracket (i.e., (, [, or {) occurs to the left of a closing bracket (i.e., ), ], or }) of the exact same type.
 There are three types of matched pairs of brackets: [], {}, and ().

 A matching pair of brackets is not balanced if the set of brackets it encloses are not matched.
 For example, {[(])} is not balanced because the contents in between { and } are not balanced. The pair of square brackets encloses a single, unbalanced opening bracket, (, and the pair of parentheses encloses a single, unbalanced closing square bracket, ].

 By this logic, we say a sequence of brackets is balanced if the following conditions are met:

    It contains no unmatched brackets.
    The subset of brackets enclosed within the confines of a matched pair of brackets is also a matched pair of brackets.

 Given n strings of brackets, determine whether each sequence of brackets is balanced. If a string is balanced, return YES. Otherwise, return NO.

*/

/*
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isBalanced(inputString: string): string {
  if (inputString.length % 2 !== 0) {
    return "NO";
  }

  let stack = [];
  const validOpeningBrackets = "([{";

  // Write your code here
  var len = inputString.length;
  for (var i = 0; i < len; i++) {
    const curentBracket = inputString[i];
    if (validOpeningBrackets.includes(curentBracket)) {
      stack.push(curentBracket);
      continue;
    }

    if (stack.length == 0) {
        return 'NO';
    }
    

    /// then it must be a closing bracket
    /// check if they match
    const lastOpeningBracket = stack[stack.length - 1];
    if (
      (lastOpeningBracket == "[" && curentBracket !== "]") ||
      (lastOpeningBracket == "{" && curentBracket !== "}") ||
      (lastOpeningBracket == "(" && curentBracket !== ")")
    ) {
      return "NO";
    } else if (

      (lastOpeningBracket == "[" && curentBracket == "]") ||
      (lastOpeningBracket == "{" && curentBracket == "}") ||
      (lastOpeningBracket == "(" && curentBracket == ")")
    ) {
      stack.pop();
    }
  }

  return stack.length == 0 ?  "YES" : 'NO';
}

console.log(isBalanced("{[()]}")); /// YES
console.log(isBalanced("{[(])}")); /// NO
console.log(isBalanced("{{[[(())]]}}")); /// YES
console.log('************************************')
console.log(isBalanced("{(([])[])[]}")); /// YES
console.log(isBalanced("{(([])[])[]]}")); /// NO
console.log(isBalanced("{(([])[])[]}[]")); /// YES
console.log('************************************')
console.log(isBalanced('{{)[](}}'));

/// Cleaner solution
function isBalancedCleaner(inputString: string): string {
    if (inputString.length % 2 !== 0) {
      return "NO";
    }

    while (inputString.includes('()') || inputString.includes('[]')|| inputString.includes('{}')) {
        inputString = inputString.replace('()', '');
        inputString = inputString.replace('[]', '');
        inputString = inputString.replace('{}', '');
    }

    return inputString.length == 0 ? 'YES' : 'NO';
}  

console.log(isBalancedCleaner("{[()]}")); /// YES
console.log(isBalancedCleaner("{[(])}")); /// NO
console.log(isBalancedCleaner("{{[[(())]]}}")); /// YES
console.log('************************************')
console.log(isBalancedCleaner("{(([])[])[]}")); /// YES
console.log(isBalancedCleaner("{(([])[])[]]}")); /// NO
console.log(isBalancedCleaner("{(([])[])[]}[]")); /// YES
console.log('************************************')
console.log(isBalancedCleaner('{{)[](}}'));