use std::collections::HashSet;
/**
 * There are n cities. Some of them are connected, while some are not.
 * If city a is connected directly with city b, and city b is connected directly with city c,
 * then city a is connected indirectly with city c.
 *
 * A province is a group of directly or indirectly connected cities and no other cities outside of the group.
 *
 * You are given an n x n matrix isConnected
 * where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.
 * Return the total number of provinces.
 *
 *
 * Example 1:
 *          1 -- 2
 *             3  
 * Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
 * Output: 2
 *
 *
 * Example 2:
 *              1    2
 *                3 
 * Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
 * Output: 3
 *
 *
 * Constraints:
 * 1 <= n <= 200
 * n == isConnected.length
 * n == isConnected[i].length
 * isConnected[i][j] is 1 or 0.
 * isConnected[i][i] == 1
 * isConnected[i][j] == isConnected[j][i]
 *
 */

fn find_circle_num(is_connected: Vec<Vec<i32>>) -> i32 {
    let mut provinces: Vec<HashSet<usize>> = Vec::new();
    let mut city_provinces: Vec<usize> = Vec::new();
    let mut province_count = is_connected.len();

    // more efficient to initialise arrays in one for loop.
    for i in 0..is_connected.len() {
        provinces.push(HashSet::new());
        provinces[i].insert(i.clone());
        city_provinces.push(i.clone());
    }

    for i in 0..is_connected.len() {
        for j in i + 1..is_connected[i].len() {
            let connection = is_connected[i][j];
            if connection == 1 && city_provinces[i] != city_provinces[j] {
                // add city j to city i province.
                // merge the provinces.

                let province_i = city_provinces[i];
                let province_j = city_provinces[j];

                  // Update city_provinces for moved cities
                for city in provinces[province_j].clone() {
                    city_provinces[city] = province_i;
                    provinces[province_i].insert(city);
                }

                provinces[j].clear();
                province_count -= 1;
            }
        }
    }

    return province_count as i32;
}

pub fn run_demo() {
    let array_a = vec![vec![1,1,0],vec![1,1,0],vec![0,0,1]];
    let array_b = vec![vec![1,0,0],vec![0,1,0],vec![0,0,1]];

    println!("{}", find_circle_num(array_a));
    println!("{}", find_circle_num(array_b));
}
