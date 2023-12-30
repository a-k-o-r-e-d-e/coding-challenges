/**
 * You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and walls (represented as '+').
 * You are also given the entrance of the maze,
 * where entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are initially standing at.
 *
 * In one step, you can move one cell up, down, left, or right.
 * You cannot step into a cell with a wall, and you cannot step outside the maze.
 * Your goal is to find the nearest exit from the entrance.
 * An exit is defined as an empty cell that is at the border of the maze. The entrance does not count as an exit.
 *
 * Return the number of steps in the shortest path from the entrance to the nearest exit, or -1 if no such path exists.
 *
 *
 * Example 1:
 * Input: maze = [["+","+",".","+"],
 *                [".",".",".","+"],
 *                ["+","+","+","."]],
 *        entrance = [1,2]
 * Output: 1
 * Explanation:
 * There are 3 exits in this maze at [1,0], [0,2], and [2,3].
 * Initially, you are at the entrance cell [1,2].
 * - You can reach [1,0] by moving 2 steps left.
 * - You can reach [0,2] by moving 1 step up.
 * It is impossible to reach [2,3] from the entrance.
 * Thus, the nearest exit is [0,2], which is 1 step away.
 *
 *
 * Example 2:
 * Input: maze = [["+","+","+"],
 *                [".",".","."],
 *                ["+","+","+"]],
 *        entrance = [1,0]
 *
 * Output: 2
 * Explanation:
 * There is 1 exit in this maze at [1,2].
 * [1,0] does not count as an exit since it is the entrance cell.
 * Initially, you are at the entrance cell [1,0].
 * - You can reach [1,2] by moving 2 steps right.
 * Thus, the nearest exit is [1,2], which is 2 steps away.
 *
 *
 * Example 3:
 * Input: maze = [[".","+"]], entrance = [0,0]
 * Output: -1
 * Explanation: There are no exits in this maze.
 *
 *
 * Constraints:
 * maze.length == m
 * maze[i].length == n
 * 1 <= m, n <= 100
 * maze[i][j] is either '.' or '+'.
 * entrance.length == 2
 * 0 <= entrancerow < m
 * 0 <= entrancecol < n
 * entrance will always be an empty cell.
 *
 *
 */
struct Solution {}

impl Solution {
    fn nearest_exit(maze: Vec<Vec<char>>, entrance: Vec<i32>) -> i32 {
        let mut maze = maze;

        let (rows, cols) = (maze.len(), maze[0].len());

        // we treat the maze as a graph and transverse the graph using BFS or DFS.
        // store the steps of getting to cell in the queue element
        // note only empty cells are inserted into the queue
        let mut queue = vec![(entrance[0] as usize, entrance[1] as usize)];

        // mark the entrance as visted by marking it as a wall
        maze[entrance[0] as usize][entrance[1] as usize] = '+';

        let mut steps = 0;

        let directions: [[i32; 2]; 4] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

        while !queue.is_empty() {
            // we take or record a step before checking the directions for the node that we at (in the queue)
            steps += 1;

            // because the queue size continuously changes as we check for the other nodes,
            // which can lead to infinite loops or undue termination of the for-loop.
            let mut temp = vec![];

            // Check every node at the current stop
            for (u,v) in queue {

                for direction in directions {
                    let (x, y) = (u as i32 + direction[0], v as i32 + direction[1]);

                    // check if this direction is out of bounds
                    if x < 0 || x >= rows as i32 || y < 0 || y >= cols as i32 {
                        continue;
                    }

                    let (x, y) = (x as usize, y as usize);

                    // check if this direction is a wall
                    if maze[x][y] == '+' {
                        continue;
                    }

                    // At this point, we have established that this direction is empty, not visited
                    // if it is at the boundary, we arrived at the exit,
                    // by design this is also the first exit we encounter so must be the nearest by steps
                    if x == 0 || x == rows - 1 || y == 0 || y == cols - 1 {
                        return steps;
                    }

                    // Otherwise, we change this direction as visited and put into the queue to check at the next step.
                    maze[x][y] = '+';
                    temp.push((x, y));
                }
            }

            queue = temp;
        }

        // If all the possible nodes and directions checked but no exits found, return -1.
        return -1;
    }
}

pub fn run_demo() {
    let maze_a = vec![
        vec!['+', '+', '.', '+'],
        vec!['.', '.', '.', '+'],
        vec!['+', '+', '+', '.'],
    ];
    let entrance_a = vec![1, 2];

    let maze_b = vec![
        vec!['+', '+', '+'],
        vec!['.', '.', '.'],
        vec!['+', '+', '+'],
    ];
    let entrance_b = vec![1, 0];

    let maze_c = vec![vec!['.', '+']];
    let entrance_c = vec![0, 0];

    println!("Running Examples");
    println!("{}", Solution::nearest_exit(maze_a, entrance_a));
    println!("{}", Solution::nearest_exit(maze_b, entrance_b));
    println!("{}", Solution::nearest_exit(maze_c, entrance_c));
}
