/**
 * We are given an array asteroids of integers representing asteroids in a row.
 * For each asteroid, the absolute value represents its size,
 * and the sign represents its direction (positive meaning right, negative meaning left).
 * Each asteroid moves at the same speed.
 *
 * Find out the state of the asteroids after all collisions.
 * If two asteroids meet, the smaller one will explode.
 * If both are the same size, both will explode.
 * Two asteroids moving in the same direction will never meet.
 *
 * Example 1:
 * Input: asteroids = [5,10,-5]
 * Output: [5,10]
 * Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
 *
 *
 * Example 2:
 * Input: asteroids = [8,-8]
 * Output: []
 * Explanation: The 8 and -8 collide exploding each other.
 *
 *
 * Example 3:
 * Input: asteroids = [10,2,-5]
 * Output: [10]
 * Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
 *
 *
 * Constraints:
 * 2 <= asteroids.length <= 104
 * -1000 <= asteroids[i] <= 1000
 * asteroids[i] != 0
 */
use std::cmp::Ordering;

fn asteroid_collision(mut asteroids: Vec<i32>) -> Vec<i32> {
    // Using two Stacks, 1 for postives asteroids, the second for negatives asteroids
    // loop through the asteroids in reverse fashion
    // if the curr asteroid is negative, push ontop of the negative stack and continue to the next coming asteroid
    // else if current asteoid is positive, pop the last recent negative asteroid, if none, push current asteroid onto the positive stack and continue to next coming asteroid
    // Compare the strength current asteroid and the last recent negative asteroid.
    // if equal destroy both by doing nothing ,
    // if current asterioid is weaker than last negative asteroid, destroy current asteroid and push negative asteroid back ontop of its stack
    // else if  curr asteroid is greater than negative asteroid, destroy negative asteroid and push asteroid back into the astoid array

    let mut positives = vec![];
    let mut negatives = vec![];

    while let Some(curr_asteroid) = asteroids.pop() {
        if curr_asteroid.is_negative() {
            negatives.push(curr_asteroid);
            continue;
        }

        let Some(negative_asteroid) = negatives.pop() else {
            positives.push(curr_asteroid);
            continue;
        };

        // At this point we are certain, the curr asteriod is postive and we have gotten a negative asteroid from the negative stack
        match (curr_asteroid).cmp(&negative_asteroid.abs()) {
            Ordering::Equal => {}
            Ordering::Less => {
                negatives.push(negative_asteroid);
            }
            Ordering::Greater => asteroids.push(curr_asteroid),
        }
    }

    positives.append(&mut negatives);
    positives.reverse();
    return positives;

    // Loop through the asteroids
    for i in 0..asteroids.len() {
        let asteroid = asteroids[i];

        if positives.is_empty() {
            positives.push(asteroid);
            continue;
        }
        // peek the top of the stack
        while let Some(top_asteriod) = positives.last() {
            if (asteroid.is_negative() && top_asteriod.is_negative())
                || (asteroid.is_positive() && top_asteriod.is_positive())
                || (top_asteriod.is_negative())
            {
                // if the current asteroid and the top of the stack are moving in the same direction
                // push new asteriod ontop of the stack
                positives.push(asteroid);
                break;
            } else {
                if top_asteriod.abs() == asteroid.abs() {
                    // both are of the same size else, both will explode
                    positives.pop();
                    break;
                } else if top_asteriod.abs() > asteroid.abs() {
                    // if the top of the stack is larger than the new asteroid, destroy new curr asteroid
                    break;
                } else {
                    // destroy asteroid at the top of the stack
                    positives.pop();
                    if positives.is_empty() {
                        positives.push(asteroid);
                        break;
                    }
                }
            }
        }
    }

    return positives;
}

pub fn run_demo() {
    println!("{:?}", asteroid_collision(vec![5, 10, -5]));
    println!("{:?}", asteroid_collision(vec![8, -8]));
    println!("{:?}", asteroid_collision(vec![10, 2, -5]));
    println!("{:?}", asteroid_collision(vec![-2, -1, 1, 2]));
    println!("{:?}", asteroid_collision(vec![1, -2, -2, -2]));
    println!("{:?}", asteroid_collision(vec![1, -1, -2, -2]));
}
