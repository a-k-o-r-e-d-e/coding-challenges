/**
 * Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas.
 * The guards have gone and will come back in h hours.
 * Koko can decide her bananas-per-hour eating speed of k.
 * Each hour, she chooses some pile of bananas and eats k bananas from that pile.
 * If the pile has less than k bananas,
 * she eats all of them instead and will not eat any more bananas during this hour.
 * Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
 *
 * Return the minimum integer k such that she can eat all the bananas within h hours.
 *
 *
 * Example 1:
 * Input: piles = [3,6,7,11], h = 8
 * Output: 4
 *
 *
 * Example 2:
 * Input: piles = [30,11,23,4,20], h = 5
 * Output: 30
 *
 *
 * Example 3:
 * Input: piles = [30,11,23,4,20], h = 6
 * Output: 23
 *
 *
 * Constraints:
 * 1 <= piles.length <= 104
 * piles.length <= h <= 109
 * 1 <= piles[i] <= 109
 */

function minEatingSpeed(piles: number[], h: number): number {
  // the minimum integer k is between the length of the array of piles and the max bannana in a pile
  // find max number
  let max_banana = Math.max(...piles);

  let [left, right] = [1, max_banana];

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    let hours_spent = 0;

    for (let i = 0; i < piles.length; i++) {
      hours_spent += Math.ceil(piles[i] / mid);
    }

    // console.log("Left: ", left, "; Right: ", right, "; Mid: ", mid, "; Hours Spent: ", hours_spent);

    if (hours_spent <= h) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

function run_demo() {
  console.log(minEatingSpeed([3, 6, 7, 11], 8));
  console.log(minEatingSpeed([30, 11, 23, 4, 20], 5));
  console.log(minEatingSpeed([30, 11, 23, 4, 20], 6));
  console.log(minEatingSpeed([805306368, 805306368, 805306368], 1000000000));
}

run_demo();
