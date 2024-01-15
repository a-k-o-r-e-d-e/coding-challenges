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

fn min_eating_speed(piles: Vec<i32>, h: i32) -> i32 {
    // the minimum integer k is between the length of the array of piles and the max bannana in a pile

    // find max number
    let max_bannana = *piles.iter().max().unwrap();

    let (mut left, mut right) = (1, max_bannana);

    // use binary search to efficiently find the lowest speed.
    while left <= right {
        let mid = left + ((right - left) / 2);

        let hours_req: i64 = piles
            .iter()
            .map(|&pile| (pile as f64 / mid as f64).ceil() as i64)
            .sum();

        if hours_req <= h as i64{
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    left
}

pub fn run_demo() {
    println!("{}", min_eating_speed(vec![3, 6, 7, 11], 8));
    println!("{}", min_eating_speed(vec![30, 11, 23, 4, 20], 5));
    println!("{}", min_eating_speed(vec![30, 11, 23, 4, 20], 6));

    println!(
        "{}",
        min_eating_speed(vec![805306368, 805306368, 805306368], 1000000000)
    );
}
