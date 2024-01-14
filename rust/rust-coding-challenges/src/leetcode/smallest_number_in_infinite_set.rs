/**
 * You have a set which contains all positive integers [1, 2, 3, 4, 5, ...].
 * 
 * Implement the SmallestInfiniteSet class:
 * SmallestInfiniteSet() Initializes the SmallestInfiniteSet object to contain all positive integers.
 * int popSmallest() Removes and returns the smallest integer contained in the infinite set.
 * void addBack(int num) Adds a positive integer num back into the infinite set, if it is not already in the infinite set.
 * 
 * Example 1:
 * Input
 * ["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
 * [[], [2], [], [], [], [1], [], [], []]
 * 
 * Output
 * [null, null, 1, 2, 3, null, 1, 4, 5]
 * 
 * Explanation
 * SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
 * smallestInfiniteSet.addBack(2);    // 2 is already in the set, so no change is made.
 * smallestInfiniteSet.popSmallest(); // return 1, since 1 is the smallest number, and remove it from the set.
 * smallestInfiniteSet.popSmallest(); // return 2, and remove it from the set.
 * smallestInfiniteSet.popSmallest(); // return 3, and remove it from the set.
 * smallestInfiniteSet.addBack(1);    // 1 is added back to the set.
 * smallestInfiniteSet.popSmallest(); // return 1, since 1 was added back to the set and is the smallest number, and remove it from the set.
 * smallestInfiniteSet.popSmallest(); // return 4, and remove it from the set.
 * smallestInfiniteSet.popSmallest(); // return 5, and remove it from the set.
 * 
 * 
 * Constraints:
 * 1 <= num <= 1000
 * At most 1000 calls will be made in total to popSmallest and addBack.
 */

 use std::collections::{HashSet, BinaryHeap};
 use std::cmp::Reverse;

 /**
  * Use a smallest variable to keep track of the smallest number in the continuous part of the infinite range.
Use a combination of HashSet and BinaryHeap for tracking the values added back.

Please note that Rust BinaryHeap is a max-heap by default so we use Reverse to turn it to a min-heap. 
see https://doc.rust-lang.org/std/collections/struct.BinaryHeap.html#min-heap 
  */

 struct SmallestInfiniteSet {
    added_back_set: HashSet<i32>,
    smallest_in_seq: i32,
    min_heap: BinaryHeap<Reverse<i32>>
}


/** 
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl SmallestInfiniteSet {

    fn new() -> Self {
        return Self {
            smallest_in_seq: 1,
            added_back_set: HashSet::new(),
            min_heap: BinaryHeap::new()
        };
    }
    
    fn pop_smallest(&mut self) -> i32 {
        if let Some(num) = self.min_heap.pop() {
            self.added_back_set.remove(&num.0);
            return num.0;
        } else {
        self.smallest_in_seq += 1;
        return self.smallest_in_seq -1;
        }
    }
    
    fn add_back(&mut self, num: i32) {
        if num < self.smallest_in_seq &&  !self.added_back_set.contains(&num) {
            self.min_heap.push(Reverse(num));
            self.added_back_set.insert(num);
        }   
    }
}

/** 
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * let obj = SmallestInfiniteSet::new();
 * let ret_1: i32 = obj.pop_smallest();
 * obj.add_back(num);
 */


 pub fn run_demo() {
     let mut obj = SmallestInfiniteSet::new();
     obj.add_back(2);
  println!("{}", obj.pop_smallest());
  println!("{}", obj.pop_smallest());
  println!("{}", obj.pop_smallest());
  obj.add_back(1);
  println!("{}", obj.pop_smallest());
  println!("{}", obj.pop_smallest());
  println!("{}", obj.pop_smallest());
     
 }