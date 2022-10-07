use std::collections::HashMap;

/**
 * Given two arrays of strings list1 and list2, find the common strings with the least index sum.
 * A common string is a string that appeared in both list1 and list2.

A common string with the least index sum is a common string such that if it appeared at list1[i] and list2[j] then i + j should be the minimum value among all the other common strings.

Return all the common strings with the least index sum. Return the answer in any order.

Example 1:
    Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]
    Output: ["Shogun"]
    Explanation: The only common string is "Shogun".

Example 2:
    Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KFC","Shogun","Burger King"]
    Output: ["Shogun"]
    Explanation: The common string with the least index sum is "Shogun" with index sum = (0 + 1) = 1.

Example 3:
    Input: list1 = ["happy","sad","good"], list2 = ["sad","happy","good"]
    Output: ["sad","happy"]
    Explanation: There are three common strings:
        "happy" with index sum = (0 + 1) = 1.
        "sad" with index sum = (1 + 0) = 1.
        "good" with index sum = (2 + 2) = 4.
        The strings with the least index sum are "sad" and "happy".


Constraints:
    1 <= list1.length, list2.length <= 1000
    1 <= list1[i].length, list2[i].length <= 30
    list1[i] and list2[i] consist of spaces ' ' and English letters.
    All the strings of list1 are unique.
    All the strings of list2 are unique.
 */
fn find_restaurant(list1: Vec<String>, list2: Vec<String>) -> Vec<String> {
    let mut hash_map = HashMap::new();

    for (idx, val) in list1.iter().enumerate() {
        hash_map.insert(val, (idx, false));
    }

    let mut min_index = usize::MAX;
    for (idx, val) in list2.iter().enumerate() {
        if let Some(x) = hash_map.get_mut(val) {
            x.0 += idx;
            x.1 = true;
            if x.0 < min_index {
                min_index = x.0;
            }
        }
    }

    hash_map.retain(|_, v| v.0 == min_index && v.1 == true);
    hash_map.into_keys().map(|x| x.to_string()).collect()
}

pub fn run_demo() {
    let ans = find_restaurant(
        vec![
            String::from("Shogun"),
            String::from("Tapioca Express"),
            String::from("Burger King"),
            String::from("KFC"),
        ],
        vec![
            String::from("Piatti"),
            String::from("The Grill at Torrey Pines"),
            String::from("Hungry Hunter Steakhouse"),
            String::from("Shogun"),
        ],
    );
    println!("{:?}", ans); // ["Shogun"]

    let ans = find_restaurant(
        vec![
            String::from("Shogun"),
            String::from("Tapioca Express"),
            String::from("Burger King"),
            String::from("KFC"),
        ],
        vec![
            String::from("KFC"),
            String::from("Shogun"),
            String::from("Burger King"),
        ],
    );
    println!("{:?}", ans); // ["Shogun"]

    let ans = find_restaurant(
        vec![
            String::from("happy"),
            String::from("sad"),
            String::from("good"),
        ],
        vec![
            String::from("sad"),
            String::from("happy"),
            String::from("good"),
        ],
    );
    println!("{:?}", ans) // ["sad","happy"]

}
