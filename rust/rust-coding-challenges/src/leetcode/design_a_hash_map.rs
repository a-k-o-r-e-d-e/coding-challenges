/**
 * Design a HashMap without using any built-in hash table libraries.

Implement the MyHashMap class:

MyHashMap() initializes the object with an empty map.
void put(int key, int value) inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
int get(int key) returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
void remove(key) removes the key and its corresponding value if the map contains the mapping for the key.


Example 1:

Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]

Explanation
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]


Constraints:

0 <= key, value <= 106
At most 104 calls will be made to put, get, and remove.
*/
const NUM_OF_BUCKETS: usize = 1000;
const NEW_BUCKET: Bucket = Vec::new();

struct HashMapElement {
    key: i32,
    val: i32,
}

impl HashMapElement {
    fn new(key: i32, val: i32) -> Self {
        Self { key, val }
    }
}

type Bucket = Vec<HashMapElement>;

struct MyHashMap {
    buckets: [Bucket; NUM_OF_BUCKETS],
}

/**
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl MyHashMap {
    fn new() -> Self {
        Self {
            buckets: [NEW_BUCKET; NUM_OF_BUCKETS],
        }
    }

    fn put(&mut self, key: i32, value: i32) {
        let bucket = self.get_bucket_mut(key);
        let index = bucket.iter().position(|x| x.key == key);
        match index {
            None => bucket.push(HashMapElement::new(key, value)),
            Some(i) => {
                let element = bucket.get_mut(i).unwrap();
                element.val = value
            }
        }
        
    }

    fn get(&self, key: i32) -> i32 {
        let bucket = self.get_bucket(key);
        let index = self.get_index(bucket, key);
        match index {
            None => return -1,
            Some(i) => {
                let element = bucket.get(i).unwrap();
                return element.val;
            }
        }
    }

    fn remove(&mut self, key: i32) {
        if self.contains(key) {
            let bucket = self.get_bucket_mut(key);
            bucket.retain(|x| x.key != key);
        }
    }

    fn contains(&self, key: i32) -> bool {
        let bucket = self.get_bucket(key);

        if bucket.is_empty() {
            return false;
        }

        match self.get_index(bucket, key) {
            None => return false,
            Some(_) => return true,
        }
    }

    fn hashing_func(&self, key: i32) -> usize {
        (key as usize) % NUM_OF_BUCKETS
    }

    fn get_bucket_mut(&mut self, key: i32) -> &mut Bucket {
        let hash_res = self.hashing_func(key);
        let bucket = self.buckets[hash_res].as_mut();

        bucket
    }

    fn get_bucket(&self, key: i32) -> &Bucket {
        let hash_res = self.hashing_func(key);
        let bucket = self.buckets[hash_res].as_ref();

        bucket
    }

    fn get_index(&self, bucket: &Bucket, key: i32) -> Option<usize> {
        let index = bucket.iter().position(|x| x.key == key);

        return index;
    }
}

pub fn run_demo() {
    let mut hash_map = MyHashMap::new();
    hash_map.put(1, 1); // The map is now [[1,1]]
    hash_map.put(2, 2); // The map is now [[1,1], [2,2]]
    println!("{}", hash_map.get(1)); // return 1, The map is now [[1,1], [2,2]]
    println!("{}", hash_map.get(3)); // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
    hash_map.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
    println!("{}", hash_map.get(2)); // return 1, The map is now [[1,1], [2,1]]
    hash_map.remove(2); // remove the mapping for 2, The map is now [[1,1]]
    println!("{}", hash_map.get(2)); // return -1 (i.e., not found), The map is now [[1,1]]
}
