///
/// The number of goals achieved by two football teams in matches in a league is given in the form of two lists.
/// For each match of team B, compute the total number of matches of team A where team A has scored less than or equal to the number of goals scored ny team B in that match.
///
/// Example
/// teamA = [1, 2, 3]
/// teamB = [2, 4]
///    Team A has played three matches and has scored teamA = [1, 2, 3] goals in each match respectively.
///    Team B has played two matches and has scored teamB = [2, 4] goals in each match respectively.
///    For 2 goals scored by team B in its first match, team A has 2 matches with scores 1 and 2.
///    For 4 goals scored by team B in its second match, team A has 3 matches with scores 1, 2 and 3.
///    Hence the answer is [2, 3]
///
/// Function Description
///    counts has the following parameters
/// @param team_a : first array of positive integers
/// @param team_a : second array of positive integers
/// @returns {number[]}
///
fn counts(mut team_a: Vec<i32>, team_b: Vec<i32>) -> Vec<isize> {
    team_a.sort();

    let mut result = vec![];

    // let mut cache = HashMap::new();

    for value in team_b {
        let mut bound: isize = -1;
        let mut left = 0;
        let mut right = team_a.len() - 1;
        while left <= right {
            let mid = left + ((right - left) / 2);

            if team_a[mid] <= value {
                bound = mid as isize;

                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        result.push(bound + 1);
    }

    result
}

pub fn run_demo() {
    let ans = counts(vec![1, 2, 3], vec![2, 4]);
    println!("{:?}", ans)
}
