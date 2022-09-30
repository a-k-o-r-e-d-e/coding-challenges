/**
 * The number of goals achieved by two football teams in matches in a league is given in the form of two lists.
 * For each match of team B, compute the total number of matches of team A where team A has scored less than or equal to the number of goals scored ny team B in that match.
 * 
 * Example
 * teamA = [1, 2, 3]
 * teamB = [2, 4]
 *    Team A has played three matches and has scored teamA = [1, 2, 3] goals in each match respectively.
 *    Team B has played two matches and has scored teamB = [2, 4] goals in each match respectively.
 *    For 2 goals scored by team B in its first match, team A has 2 matches with scores 1 and 2.
 *    For 4 goals scored by team B in its second match, team A has 3 matches with scores 1, 2 and 3.
 *    Hence the answer is [2, 3]
 * 
 * Function Description
 *    counts has the following parameters
 * @param teamA : first array of positive integers
 * @param teamB : second array of positive integers
 * @returns {number[]}
 */
function counts(teamA: number[], teamB: number[]): number[] {
  teamA.sort((a, b) => a - b);
  let result: number[] = [];

  let cache: { [score: number]: number } = {};

  for (let value of teamB) {
    if (cache[value]) {
      result.push(cache[value]);
    } else {
      let bound = -1;
      let left = 0,
        right = teamA.length - 1;

      while (left <= right) {
        let mid = left + (right - left) / 2;

        if (teamA[mid] <= value) {
          bound = mid;

          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      let count = bound+1;
      result.push(count);
      cache[value] = count;
    }
  }

  return result;
}

console.log(counts([1,2,3], [2,4]));