/**
 * There are n cities. Some of them are connected, while some are not.
 * If city a is connected directly with city b, and city b is connected directly with city c,
 * then city a is connected indirectly with city c.
 *
 * A province is a group of directly or indirectly connected cities and no other cities outside of the group.
 *
 * You are given an n x n matrix isConnected
 * where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.
 * Return the total number of provinces.
 *
 *
 * Example 1:
 *          1 -- 2
 *             3
 * Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
 * Output: 2
 *
 *
 * Example 2:
 *              1    2
 *                3
 * Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
 * Output: 3
 *
 *
 * Constraints:
 * 1 <= n <= 200
 * n == isConnected.length
 * n == isConnected[i].length
 * isConnected[i][j] is 1 or 0.
 * isConnected[i][i] == 1
 * isConnected[i][j] == isConnected[j][i]
 *
 */

function findCircleNumBruteForce(isConnected: number[][]): number {
  let provinces: Set<number>[] = [];
  let city_provinces: number[] = [];
  let province_count = isConnected.length;

  // more efficient to initialise arrays in one for loop.
  for (let k = 0; k < isConnected.length; k++) {
    provinces.push(new Set());
    provinces[k].add(k);
    city_provinces.push(k);
  }

  for (let i = 0; i < isConnected.length; i++) {
    for (let j = i + 1; j < isConnected.length; j++) {
      if (isConnected[i][j] == 1 && city_provinces[i] != city_provinces[j]) {
        // add city j to city i province.
        // merge the provinces.

        let province_i = city_provinces[i];
        let province_j = city_provinces[j];

        // Update city_provinces for moved cities
        for (let city of provinces[province_j]) {
          city_provinces[city] = province_i;
          provinces[province_i].add(city);
        }

        provinces[j].clear();
        province_count--;
      }
    }
  }

  return province_count;
}

function findCircleNumDFS(isConnected: number[][]): number {
  let visited = new Array(isConnected.length).fill(false);
  let province_count = 0;

  for (let city = 0; city < isConnected.length; city++) {
    if (visited[city] == false) {
      province_count++;
      dfs(city, isConnected, visited);
    }
  }

  return province_count;
}

function dfs(city: number, graph: number[][], visited: boolean[]) {
  visited[city] = true;

  for (
    let neighbor = 0;
    neighbor < graph[city].length;
    neighbor++
  ) {
    if (graph[city][neighbor] === 1 && visited[neighbor] == false) {
      dfs(neighbor, graph, visited);
    }
  }
}

function run_demo() {
  let array_a = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ];

  let array_b = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

//   console.log(findCircleNumBruteForce(array_a));
//   console.log(findCircleNumBruteForce(array_b));

 console.log(findCircleNumDFS(array_a));
  console.log(findCircleNumDFS(array_b));

}

run_demo();
