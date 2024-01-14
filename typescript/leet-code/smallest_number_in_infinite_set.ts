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
import PriorityQueue from "../data-structures/priority-queue";

class SmallestInfiniteSet {
    private added_back_set: Set<number>;
    private smallest_in_seq: number;
    private min_heap: PriorityQueue<number>;
    constructor() {
        this.added_back_set = new Set<number>();
        this.smallest_in_seq = 1;
        this.min_heap = new PriorityQueue((a, b) => a-b);
    }

    popSmallest(): number {
        if (this.min_heap.isNotEmpty) {
            let smallest = this.min_heap.removeFirst();
            this.added_back_set.delete(smallest);
            return smallest;
        } else {
            this.smallest_in_seq +=1;
            return this.smallest_in_seq -1;
        }
    }

    addBack(num: number): void {
        if (num < this.smallest_in_seq && !this.added_back_set.has(num)) {
            this.min_heap.add(num);
            this.added_back_set.add(num);
        }
    }
}

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * var obj = new SmallestInfiniteSet()
 * var param_1 = obj.popSmallest()
 * obj.addBack(num)
 */

function run_demo() {
    let infinite_set = new SmallestInfiniteSet();
    
    infinite_set.addBack(2);
    console.log(infinite_set.popSmallest());
    console.log(infinite_set.popSmallest());
    console.log(infinite_set.popSmallest());

    infinite_set.addBack(1);
    console.log(infinite_set.popSmallest());
    console.log(infinite_set.popSmallest());
    console.log(infinite_set.popSmallest());
}

run_demo();