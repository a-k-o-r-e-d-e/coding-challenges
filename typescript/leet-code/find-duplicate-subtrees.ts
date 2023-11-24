/**
 * Given the root of a binary tree, return all duplicate subtrees.
 * For each kind of duplicate subtrees, you only need to return the root node of any one of them.
 * Two trees are duplicate if they have the same structure with the same node values.
 *
 * Example 1:
 *              1
 *            /   \
 *           2     3
 *         /      /   \
 *        4      2      4
 *              /
 *             4
 *
 *  Input: root = [1,2,3,4,null,2,4,null,null,4]
 *  Output: [[2,4],[4]]
 *
 *
 * Example 2:
 *              2
 *            /    \
 *          1        1
 *
 *  Input: root = [2,1,1]
 *  Output: [[1]]
 *
 *
 * Example 3:
 *              2
 *            /   \
 *          2       2
 *        /       /
 *       3       3
 *
 *  Input: root = [2,2,2,3,null,3,null]
 *  Output: [[2,3],[3]]
 *
 *
 * Constraints:
 *      The number of the nodes in the tree will be in the range [1, 5000]
 *      -200 <= Node.val <= 200
 */
/**
 * Definition for a binary tree node.
 * */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

type TreeNodeArr = Array<TreeNode | null>;

/** Brute force solution has time complexity of O(n) */
function findDuplicateSubtreesBruteForce(root: TreeNode | null): TreeNodeArr {
  let result: TreeNodeArr = [];
  postOrderBruteForce(root, new Map<string, number>(), result);
  return result;
}

function postOrderBruteForce(
  currentNode: TreeNode | null,
  map: Map<string, number>,
  result: TreeNodeArr
): string {
  if (currentNode == null) return "#";
  let serial: string =
    currentNode.val +
    "," +
    postOrderBruteForce(currentNode.left, map, result) +
    "," +
    postOrderBruteForce(currentNode.right, map, result);
  let serialCount = map.get(serial);

  if (serialCount) {
    map.set(serial, ++serialCount);
  } else {
    map.set(serial, 1);
  }

  if (map.get(serial) == 2) result.push(currentNode);
  return serial;
}

let curId = 1;

function findDuplicateSubtreesUsingSerialIds(
  root: TreeNode | null
): TreeNodeArr {
  let serialToIdMap = new Map<string, number>();
  let idToCountMap = new Map<number, number>();
  let res: TreeNodeArr = [];
  postOrderUsingSerialIds(root, serialToIdMap, idToCountMap, res);
  return res;
}

function postOrderUsingSerialIds(
  root: TreeNode | null,
  serialToIdMap: Map<string, number>,
  idToCountMap: Map<number, number>,
  result: TreeNodeArr
): number {
  if (root == null) return 0;
  let leftId = postOrderUsingSerialIds(
    root.left,
    serialToIdMap,
    idToCountMap,
    result
  );
  let rightId = postOrderUsingSerialIds(
    root.right,
    serialToIdMap,
    idToCountMap,
    result
  );

  let curSerial = leftId + "," + root.val + "," + rightId;
  let serialId = serialToIdMap.get(curSerial) ?? curId;

  if (serialId == curId) curId++;

  serialToIdMap.set(curSerial, serialId);

  idToCountMap.set(serialId, (idToCountMap.get(serialId) ?? 0) + 1);

  if (idToCountMap.get(serialId) === 2) result.push(root);
  return serialId;
}

let inputTree1 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4)),
  new TreeNode(3, new TreeNode(2, new TreeNode(4)), new TreeNode(4))
);
let inputTree2 = new TreeNode(2, new TreeNode(1), new TreeNode(1));
let inputTree3 = new TreeNode(
  2,
  new TreeNode(2, new TreeNode(3)),
  new TreeNode(2, new TreeNode(3))
);
console.log("Brute force Solution");
console.log(
  "input tree 1 solution: \n",
  findDuplicateSubtreesBruteForce(inputTree1)
);

console.log(
  "input tree 2 solution: \n",
  findDuplicateSubtreesBruteForce(inputTree2)
);

console.log(
  "input tree 3 solution: \n",
  findDuplicateSubtreesBruteForce(inputTree3)
);

console.log("Serial ID Solution");
console.log(
  "input tree 1 solution: \n",
  findDuplicateSubtreesUsingSerialIds(inputTree1)
);

console.log(
  "input tree 2 solution: \n",
  findDuplicateSubtreesUsingSerialIds(inputTree2)
);

console.log(
  "input tree 3 solution: \n",
  findDuplicateSubtreesUsingSerialIds(inputTree3)
);

export {}