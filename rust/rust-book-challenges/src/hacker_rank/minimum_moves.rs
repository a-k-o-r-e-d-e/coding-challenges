///
/// There are two arrays of integers, arr1 and arr2.
/// One move is defined as an increment or decrement of one element in an array.
/// Determine the minimum number of moves to match arr1 with arr2. No reordering of the digits is allowed
///
/// Example
///  arr1 = [123, 543]
///  arr2 = [321, 279]
///
///    Match arr1[0] = 123 with arr2[0]=321
///      - Increment 1 twice to get 3 (2 moves)
///      - Decrement 3 twice to get 1 (2 moves)
///      - 4 moves are needed to match 123 with 321
///    Match arr1[1]=543 with arr2[1]=279
///      - Decrement 5 three times to get 2 (3 moves)
///      - Increment 4 three times to get 7 (3 moves)
///      - Increment 3 six times to get 9 (6 moves)
///      - 12 moves are needed to match 543 with 279
///    16 total moves are needed to match the arrays arr1 and arr2
///
/// Function Description
///    minimumMoves has the following parmas
///
/// @param arr1 - array to modify
/// @param arr2 - array to match
/// @returns {number} - count of moves
///
pub fn minimum_moves(arr1: Vec<i32>, arr2: Vec<i32>) -> i32 {
    let mut count: i32 = 0;

    for i in 0..arr1.len() {
        let num1_str = arr1[i].to_string();
        let num2_str = arr2[i].to_string();

        for k in 0..num1_str.len() {
            let num1: i32 = num1_str[k..k + 1].parse().unwrap();
            let num2: i32 = num2_str[k..k + 1].parse().unwrap();
            count += i32::abs(num1 - num2);
        }
    }

    count.into()
}
