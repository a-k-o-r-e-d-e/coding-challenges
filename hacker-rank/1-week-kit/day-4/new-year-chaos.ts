/* 

 It is New Year's Day and people are in line for the Wonderland rollercoaster ride.
 Each person wears a sticker indicating their initial position in the queue from 1 to n.
 Any person can bribe the person directly in front of them to swap positions, but they still wear their original sticker.
 One person can bribe at most two others.

 Determine the minimum number of bribes that took place to get to a given queue order.
 Print the number of bribes, 
 or, if anyone has bribed more than two people, print Too chaotic.


 Example

 q = [1, 2, 3, 5, 4, 6, 7, 8]

 If person 5 bribes person 4, the queue will look like this: [1, 2, 3, 5, 4, 6, 7, 8].
 Only 1 bribe is required. Print 1.

 q = [4, 1, 2, 3]
 Person  had to bribe  people to get to the current position. Print Too chaotic.

*/

/*
 Since the limitation is "no more than two bribes",
 we simply maintain a window of expected sticker values of size 3:
    - the sticker value we expect if no bribes occurred
    - the sticker value we expect if one bribe occurred
    - the sticker value we expect if two bribes occurred
 
 We create a list to represent the window, expected = [1,2,3]

 We then iterate through through the line of people, q.
    - if q[i] equals expected[0], no bribes occurred.
    - else if q[i] equals expected[1], increment bribes by 1
    - else if q[i] equals expected[2], increment bribes by 2
    - else a larger bribed occurred; print "Too chaotic" and return

 Be sure to update expected at each iteration:
    - at the beginning, append the next expected value, expected[2]+1
    - If no bribes occurred, remove expected[0]
    - If one bribe occurred, remove expected[1]
    - If two bribes occurred, remove expected[2]

 Here's an example:
    # q = [3,1,4,6,2,5]
    # e = [1,2,3]
    #  q[0]==3==e[2], bribes+=2, e.append(3+1), e.pop(2); e = [1,2,4]
    #  q[1]==1==e[0], bribes+=0, e.append(4+1), e.pop(0); e = [2,4,5]
    #  q[2]==4==e[1], bribes+=1, e.append(5+1), e.pop(1); e = [2,5,6]
    #  q[3]==6==e[2], bribes+=2, e.append(6+1), e.pop(2); e = [2,5,7]
    #  q[4]==2==e[0], bribes+=0, e.append(7+1), e.pop(0); e = [5,7,8]
    #  q[5]==5==e[0], bribes+=0, e.append(8+1), e.pop(0); e = [7,8,9]
*/

function minimumBribes(q: number[]): void {
  let expected = [1, 2, 3];
  let bribes = 0;

  for (let i = 0; i < q.length; i++) {
    if (q[i] === expected[0]) {
      // no bribes occured
      expected.push(expected[2] + 1);
      expected.splice(0, 1);
    } else if (q[i] === expected[1]) {
      // One bribe occured
      bribes += 1;
      expected.push(expected[2] + 1);
      expected.splice(1, 1);
    } else if (q[i] === expected[2]) {
        /// Two Bribes Occured
        bribes += 2;
        expected.push(expected[2]+1);
        expected.splice(2, 1); 
    } else {
        // a larger bribed occurred; print "Too chaotic" and return
        console.log("Too chaotic");
        return;
    }
  }

  console.log(bribes);
}

// minimumBribes([1, 2, , 5, 4, 6, 7, 8]); // 1
// minimumBribes([4, 1, 2, 3]); // Too chaotic

minimumBribes([1, 2, 5, 3, 7, 8, 6, 4]); // 1
