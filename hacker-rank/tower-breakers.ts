/*
Two players are playing a game of Tower Breakers! 
Player 1 always moves first, and both players always play optimally.
The rules of the game are as follows:

 - Initially there are n towers.
 - Each tower is of height m.
 - The players move in alternating turns.
 - In each turn, a player can choose a tower of height x and reduce its height to y, where 1<=y<x and y evenly divides x.
 - If the current player is unable to make a move, they lose the game.

 Given the values of n and m, determine which player will win. 
 If the first player wins, return 1. Otherwise, return 2.
*/



/*
 So basically, there are two cases here. 
 Both cases rely heavily on the idea that an even number of towers (say 2n) can be thought of as a collection of n pairs of towers.

 CASE 1) If there are an even number of towers Player 1 will go first,
  and Player 2 will basically copy player 1. 
  Whatever player 1 does to a tower, 
  player 2 will do the exact same thing to the other tower belonging to the same pair. 
  In this case Player 2 will always win.

 CASE 2) If there are an odd number of towers Player 1 will go first, 
 and simply destroy any single tower by setting it equal to 1. 
 Now we again have the same situation from CASE 1 
 but this time the roles of both players have been reversed. 
 In this case Player 1 will always win.
 Finally, there is also the trivial case where n does not matter because m = 1. In this case Player 2 will obviously always win.
*/

/*
 * Complete the 'towerBreakers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 */

function towerBreakers(n: number, m: number): number {
  // if height == 1, the game is immediately over => p.1 has no moves; p.2 wins
  // if towers are divisible by 2, => 2 mimics p.1's moves; p.2 wins
  if (n % 2 == 0 || m == 1) return 2;
  else {
    // otherwise, if towers is odd, p.1 can take the first tower down to 1, 
    // effectively making themselves p.2 and the tower numbers even,
    // which means they are now in the position to mimic the original p.2's moves for the remaining towers
    // and win the game => the original p.1 wins
    return 1;
  }
}


console.log(towerBreakers(2, 5)) // 2
console.log(towerBreakers(1, 4)) // 1