/**
 * A teacher asks the class to open their books to a page number. 
 * A student can either start turning pages from the front of the book or from the back of the book. 
 * They always turn pages one at a time. 
 * When they open the book, page 1 is always on the right side:
 *      | |1|
 * 
 * When they flip page 1, they see pages 2 and 3. 
 * Each page except the last page will always be printed on both sides. 
 * The last page may only be printed on the front, given the length of the book. 
 * If the book is n pages long, and a student wants to turn to page p, 
 * what is the minimum number of pages to turn? They can start at the beginning or the end of the book.
 * 
 * Given n and p, find and print the minimum number of pages that must be turned in order to arrive at page p.
 * 
 * Example
 *      n = 5
 *      p = 3
 * 
 *      | |1| -> |2|3| -> |4|5|
 * 
 * Using the illustration above, if the student wants to get to page 3, 
 * they open the book to page 1, flip 1 page and they are on the correct page. 
 * If they open the book to the last page, page 5, they turn 1 page and are at the correct page. 
 * Return 1.
 * 
 * Function Description
 * Complete the pageCount function.
 * pageCount has the following parameter(s):
 *      int n: the number of pages in the book
 *      int p: the page number to turn to
 * Returns
 *      int: the minimum number of pages to turn
 * 
 * Constraints
 *      1 <= n <= 10^5
 *      1 <= p <= n
 */

/**
 * after some observation, the number of flips from the front is given by ceil((p-1)/2)
 * from the back, if the n (length of the book) is even, it is also given by ceil((n-1)/2)
 * else if n is odd , number of flips is given by floor((n-p)/2)
 *  */ 
 function pageCount(n: number, p: number): number {
    
    if (p == 1 || p == n) {
        return 0;
    }

    // if (p % 2 != 0 && p === n-1){
    //     return 0;
    // }

    const frontFlip = Math.ceil((p-1)/2);
    const backFlip = n % 2 == 0 ? Math.ceil((n-p)/2) : Math.floor((n-p)/2);

    return Math.min(frontFlip, backFlip);
}

console.log(pageCount(5, 3)); // 1
console.log(pageCount(5, 4)); // 1
console.log(pageCount(12, 4)); // 2
console.log(pageCount(15, 8)); // 4
console.log(pageCount(15, 7)); // 3