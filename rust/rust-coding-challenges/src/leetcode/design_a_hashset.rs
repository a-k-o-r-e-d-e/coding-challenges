/**
 * Design a HashSet without using any built-in hash table libraries.
 *
 * Implement MyHashSet class:
 *      void add(key) Inserts the value key into the HashSet.
 *      bool contains(key) Returns whether the value key exists in the HashSet or not.
 *      void remove(key) Removes the value key in the HashSet. If key does not exist in the HashSet, do nothing.
 *
 * Example 1:

Input
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output
[null, null, null, true, false, null, true, null, false]

Explanation
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // return True
myHashSet.contains(3); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // return True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // return False, (already removed)


Constraints:

0 <= key <= 106
At most 104 calls will be made to add, remove, and contains.

*/
const NUM_OF_BUCKETS: usize = 1000;
const NEW_VEC: Vec<i32> = Vec::new();
struct MyHashSet {
    buckets: [Vec<i32>; NUM_OF_BUCKETS],
}

/**
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl MyHashSet {
    fn new() -> Self {
        Self {
            buckets: [NEW_VEC; NUM_OF_BUCKETS],
        }
    }

    fn add(&mut self, key: i32) {
        if !self.contains(key) {
            let bucket= self.get_bucket_mut(key);

            bucket.push(key);
        }
    }

    fn remove(&mut self, key: i32) {
        if self.contains(key) {
            let bucket = self.get_bucket_mut(key);
            bucket.retain(|x| x != &key);
        }
    }

    fn contains(&self, key: i32) -> bool {
        let bucket: &Vec<i32> = self.get_bucket(key);

        if bucket.is_empty() {
            return false;
        }

        bucket.contains(&key)
    }

    fn hashing_func(&self, key: i32) -> usize {
        (key as usize) % NUM_OF_BUCKETS
    }

    fn get_bucket_mut(&mut self, key: i32) -> &mut Vec<i32> {
        let hash_res = self.hashing_func(key);
        let bucket: &mut Vec<i32> = self.buckets[hash_res].as_mut();

        bucket
    }

    fn get_bucket(&self, key: i32) -> &Vec<i32> {
        let hash_res = self.hashing_func(key);
        let bucket: &Vec<i32> = self.buckets[hash_res].as_ref();

        bucket
    }
}

/*
 * Your MyHashSet object will be instantiated and called as such:
 * let obj = MyHashSet::new();
 * obj.add(key);
 * obj.remove(key);
 * let ret_3: bool = obj.contains(key);
 */
pub fn run_demo() {
 let mut hash_set = MyHashSet::new();

 hash_set.add(1);
 hash_set.add(2);

 println!("{}", hash_set.contains(1)); // true
 println!("{}", hash_set.contains(3)); // false (Not found)

 hash_set.add(2);
 println!("{}", hash_set.contains(2)); // true

 hash_set.remove(2);
 println!("{}", hash_set.contains(2)); // false (Already removed)
}