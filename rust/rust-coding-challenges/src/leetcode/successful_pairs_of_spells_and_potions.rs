/**
 * You are given two positive integer arrays spells and potions, of length n and m respectively, 
 * where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.
 * 
 * You are also given an integer success. 
 * A spell and potion pair is considered successful if the product of their strengths is at least success.
 * Return an integer array pairs of length n 
 * where pairs[i] is the number of potions that will form a successful pair with the ith spell.
 * 
 * 
 * Example 1:
 * Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
 * Output: [4,0,3]
 * Explanation:
 * - 0th spell: 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
 * - 1st spell: 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
 * - 2nd spell: 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
 * Thus, [4,0,3] is returned.
 * 
 * 
 * Example 2:
 * Input: spells = [3,1,2], potions = [8,5,8], success = 16
 * Output: [2,0,2]
 * Explanation:
 * - 0th spell: 3 * [8,5,8] = [24,15,24]. 2 pairs are successful.
 * - 1st spell: 1 * [8,5,8] = [8,5,8]. 0 pairs are successful. 
 * - 2nd spell: 2 * [8,5,8] = [16,10,16]. 2 pairs are successful. 
 * Thus, [2,0,2] is returned.
 * 
 * 
 * Constraints:
 * n == spells.length
 * m == potions.length
 * 1 <= n, m <= 105
 * 1 <= spells[i], potions[i] <= 105
 * 1 <= success <= 1010
 */

 fn successful_pairs(spells: Vec<i32>, mut potions: Vec<i32>, success: i64) -> Vec<i32> {
        let mut result = vec![];
        // sort the potions array.
        potions.sort_unstable();
        let potions_size = potions.len();
        // iterate through the spells array
        for spell in spells {
            // using binary search, get the index if the first element of the potions array whose product with the spell is  success.
            let mut left:i32 = 0;
            let mut right:i32 = (potions.len()-1) as i32;
            let mut atleast_one_success:bool = false;

            while left <= right {
                let mid = (left + right) / 2;

                if (spell as i64 * (potions[mid as usize] as i64)) >= success {
                    right = mid -1;
                    atleast_one_success = true;
                } else {
                    left = mid +1;
                }
            }

            
            if !atleast_one_success {
                result.push(0);
            } else {
                result.push((potions_size as i32)-left);
            }
        }
        
        
        return result;
    }

    pub fn run_demo() {
        println!("{:?}", successful_pairs(vec![5,1,3], vec![1,2,3,4,5], 7));
        println!("{:?}", successful_pairs(vec![3,1,2], vec![8,5,8], 16));
        println!("{:?}", successful_pairs(vec![15,8,19], vec![38,36,23], 328));
    }