/**
 * In the world of Dota2, there are two parties: the Radiant and the Dire.
 * The Dota2 senate consists of senators coming from two parties.
 * Now the Senate wants to decide on a change in the Dota2 game.
 * The voting for this change is a round-based procedure.
 * In each round, each senator can exercise one of the two rights:
 * Ban one senator's right: A senator can make another senator lose all his rights in this and all the following rounds.
 * Announce the victory: If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and decide on the change in the game.
 *
 * Given a string senate representing each senator's party belonging.
 * The character 'R' and 'D' represent the Radiant party and the Dire party.
 * Then if there are n senators, the size of the given string will be n.
 *
 * The round-based procedure starts from the first senator to the last senator in the given order.
 * This procedure will last until the end of voting.
 * All the senators who have lost their rights will be skipped during the procedure.
 *
 * Suppose every senator is smart enough and will play the best strategy for his own party.
 * Predict which party will finally announce the victory and change the Dota2 game.
 * The output should be "Radiant" or "Dire".
 *
 * Example 1:
 * Input: senate = "RD"
 * Output: "Radiant"
 * Explanation:
 * The first senator comes from Radiant and he can just ban the next senator's right in round 1.
 * And the second senator can't exercise any rights anymore since his right has been banned.
 * And in round 2, the first senator can just announce the victory since he is the only guy in the senate who can vote.
 *
 *
 * Example 2:
 * Input: senate = "RDD"
 * Output: "Dire"
 * Explanation:
 * The first senator comes from Radiant and he can just ban the next senator's right in round 1.
 * And the second senator can't exercise any rights anymore since his right has been banned.
 * And the third senator comes from Dire and he can ban the first senator's right in round 1.
 * And in round 2, the third senator can just announce the victory since he is the only guy in the senate who can vote.
 *
 *
 * Constraints:
 * n == senate.length
 * 1 <= n <= 104
 * senate[i] is either 'R' or 'D'.
 */
use std::collections::VecDeque;

fn predict_party_victory_brute_force(senate: String) -> String {
    // Loop through the string to get the number of senators for each party
    // Keep track of the count of the senators in each group
    // also keep a track of the pending banned senators of each group
    // Pending banned means the senators that have been banned but not yet implemented
    // When the senator of one party bans the senator of another party,
    // we decrement the count of the other party and increment their banned count.
    // for each unbanned senator, we first check if that party has any pending banned members
    // if yes, we ban the current senator and move on to the next senator,
    // else if no, we check if the current party can declare victory,
    // A victory can occur
    //     - if the current index is greater than n,
    //     - The party has no umplemented ban
    //     - The other party has no other senator left
    //
    // Note: Use 'B' to signify banned senator

    let mut r_senator_count = 0;
    let mut d_senator_count = 0;
    let mut r_pending_bans = 0;
    let mut d_pending_bans = 0;

    let mut chars: Vec<char> = vec![];

    for ch in senate.chars() {
        chars.push(ch);
        if ch == 'R' {
            r_senator_count += 1;
        } else {
            d_senator_count += 1;
        }
    }

    let mut i = 0;
    let n = chars.len();
    let mut res = String::new();

    loop {
        let idx = i % n;
        let curr_char = chars[idx];

        if curr_char == 'R' {
            r_senator_count += 1;
            // Check if pending bans exists
            if r_pending_bans > 0 {
                // If yes, ban current char and move on to next
                chars[idx] = 'B';
                r_pending_bans -= 1;
                continue;
            }

            // we check if the current party can declare victory,
            if d_senator_count - d_pending_bans <= 0 {
                res = "Radiant".to_string();
                break;
            }

            // Ban a Dire senator
            d_pending_bans += 1;
        } else if curr_char == 'D' {
            d_senator_count += 1;
            // Check if pending bans exists
            if d_pending_bans > 0 {
                // If yes, ban current char and move on to next
                chars[idx] = 'B';
                d_pending_bans -= 1;
                continue;
            }

            // we check if the current party can declare victory,
            if r_senator_count - r_pending_bans <= 0 {
                res = "Dire".to_string();
                break;
            }

            // Ban a Dire senator
            r_pending_bans += 1;
        }

        i += 1;
    }

    return res;
}

fn predict_party_victory_queue_solution(senate: String) -> String {
    // We will use a two queue approach.
    // Recall, each senator has a position to exercise their right.
    // The ones to the left have an earlier turn than the ones to the right.
    // rad is queue that holds all positions of active senators in "Radiant"
    // dir is queue that holds all positions of active senators in "Dire".
    // Active being that they still have the right to vote.
    // Our queue will be ordered so that the senators with earlier voting power come first (to the left of the queue).
    // To goal is to have the earliest senator of each queue fight each other to see who gets to eliminate the other depending on their position.
    // Obviously, the one with the earlier position will win.
    // The loser is removed from the queue since they are no longer active.
    // The winner will go to the end of the queue for the next round.
    // We keep doing this until one queue is empty which means there are no more senators on the team.
    let (mut rad_queue, mut dir_queue) = (VecDeque::new(), VecDeque::new());
    let mut n = senate.len();

    // Add all senators to their respective queues using their index
    for (i, ch) in senate.char_indices() {
        if ch == 'R' {
            rad_queue.push_back(i);
        } else {
            dir_queue.push_back(i);
        }
    }

    // use increasing n to keep track of position
    while !rad_queue.is_empty() && !dir_queue.is_empty() {
        // Only "winner" gets to stays in their queue
        if rad_queue.pop_front().unwrap() < dir_queue.pop_front().unwrap() {
            n += 1;
            rad_queue.push_back(n);
        } else {
            n += 1;
            dir_queue.push_back(n)
        }
    }

    return if rad_queue.is_empty() {
        "Dire".to_string()
    } else {
        "Radiant".to_string()
    };
}

pub fn run_demo() {
    // println!("{}", predict_party_victory_brute_force("RD".to_string()));
    // println!("{}", predict_party_victory_brute_force("RDD".to_string()));
    // println!("{}", predict_party_victory_brute_force("D".to_string()));
    // println!("{}", predict_party_victory_brute_force("R".to_string()));

    println!("{}", predict_party_victory_queue_solution("RD".to_string()));
    println!(
        "{}",
        predict_party_victory_queue_solution("RDD".to_string())
    );
    println!("{}", predict_party_victory_queue_solution("D".to_string()));
    println!("{}", predict_party_victory_queue_solution("R".to_string()));
}
