"use strict";

/* 

 Implement a simple text editor.
 The editor initially contains an empty string, S.

 Perform Q operations of the following 4 types:
    - 1: append(W) - Append string W to the end of S.
    - 2: delete(k) - Delete the last k characters of S.
    - 3: print(k) - Print the kth character of S.
    - 4: undo() - Undo the last (not previously undone) operation of type 1 or 2, reverting S to the state it was in prior to that operation.


 Example
  S = 'abcde'
  ops = ['1 fg', '3 6', '2 5', '4', '3 7', '4', '3 4' ]

    operation
    index   S       ops[index]  explanation
    -----   ------  ----------  -----------
    0       abcde   1 fg        append fg
    1       abcdefg 3 6         print the 6th letter - f
    2       abcdefg 2 5         delete the last 5 letters
    3       ab      4           undo the last operation, index 2
    4       abcdefg 3 7         print the 7th characgter - g
    5       abcdefg 4           undo the last operation, index 0
    6       abcde   3 4         print the 4th character - d

 The results should be printed as:
    f
    g
    d
*/

function simpleTextEditor(operations: string[]) {
  let outputString = "";
  let undoStack: string[] = [];

  operations.forEach((operation) => {
    let [command, value] = operation.split(" ");
    // console.log("Command & Value", command, value);
    // console.log("String before command", outputString)
    if (command == "4") {
      if (undoStack.length > 0) {
        outputString = undoStack.pop()!;
      }
    } else {
      if (command == '1' || command == '2') {
        undoStack.push(outputString);
      }

      if (command == "3") {
        console.log(outputString.charAt(Number(value)-1));
      } else if (command == "2") {
        outputString = outputString.slice(0, outputString.length - Number(value));
      } else if (command == "1") {
        /// Command must be 1 at this point
        outputString += value.trim();
      }
    }
    // console.log("String After command", outputString);
    // console.log("Undo Stack", undoStack);
  });
}

simpleTextEditor(['1 fg', '3 1', '2 5', '4', '3 2', '4', '3 0' ]);
console.log("*****************************")
// simpleTextEditor(['1 abc', '3 3', '2 3', '1 xy', '3 2', '4', '4', '3 2' ]);