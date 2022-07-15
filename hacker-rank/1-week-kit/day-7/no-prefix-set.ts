/**
 * There is a given list of strings where each string contains only lowercase letters from a-j, inclusive.
 * The set of strings is said to be a GOOD SET if no string is a prefix of another string.
 * In this case, print GOOD SET. Otherwise, print BAD SET on the first line followed by the string being checked.
 * Note If two strings are identical, they are prefixes of each other.
 *
 * Example
 *  words = ['abcd', 'bcd', 'abcde', 'bcde']
 *  Here 'abcd' is a prefix of 'abcde' and 'bcd' is a prefix of 'bcde'.
 *  Since 'abcde' is tested first, print
 *      BAD SET
 *      abcde
 *
 *  words = ['ab', 'bc', 'cd']
 *  No string is a prefix of another so print
 *      GOOD SET
 *
 * Function Description
 *  noPrefix has the following parameter(s)
 *      - string words[n]: an array of strings
 *  Prints
 *      - string(s): either GOOD SET or BAD SET on one line followed by the word on the next line.
 *          No return value is expected.
 */
console.log("*********************Brute Force Solution*********************")
function noPrefixBruteForce(words: string[]): void {
  // Write your code here

  for (let i = 0; i < words.length; i++) {
    const curentWord = words[i];
    for (let j = i - 1; j >= 0; j--) {
      if (curentWord.startsWith(words[j]) || words[j].startsWith(curentWord)) {
        console.log("BAD SET");
        console.log(curentWord);
        return;
      }
    }
  }

  console.log("GOOD SET");
}

// Prints
// BAD SET
// abcde
noPrefixBruteForce(["abcd", "bcd", "abcde", "bcde"]);

// Prints
// GOOD SET
noPrefixBruteForce(["ab", "bc", "cd"]);

// BAD SET
// aacghgh
noPrefixBruteForce(["aab", "aac", "aacghgh", "aabghgh"]);

console.log("*********************Solution Using Trie*********************")
/// TrieNode Implemented using a Map to store the children.
class TrieNode {
  char: string | null;
  children = new Map<string, TrieNode>();
  isEndWord = false;
  constructor(char: string | null) {
    this.char = char;
  }

  // Function to mark the currentNode as leaf
  markAsLeaf() {
    this.isEndWord = true;
  }

  // Function to unMark the currentNode as Leaf
  unMarkAsLeaf() {
    this.isEndWord = false;
  }
}

class Trie {
  root = new TrieNode(null);

  /// Boolean returned signifies if prefix exist
  checkIfPrefixExistOrInsert(word: string): boolean {
    let current = this.root;
    /// Iterate throigh all the characters of the word
    for (let i = 0; i < word.length; i++) {
      const character = word[i];
      let childNode = current.children.get(character);
      
    if (current.isEndWord || (i == word.length-1 && childNode != undefined)) {
      return true;
    }

      // if node doesn't have the current character as child, insert it
      if (childNode === undefined) {
        current.children.set(character, new TrieNode(character));
      }

      // move down, to the next character
      current = current.children.get(character)!;
    }

    // mark the last inserted character as end of the word
    current.isEndWord = true;
    return false;
  }

  search(word: string) {
    let current = this.root;

    // iterate through all the characters of the word
    for (let character of word) {
      if (current.children.get(character) === undefined) {
        /// could not find this character in sequence return false
        return false;
      }
      // move down, to match the next character;
      current = current.children.get(character)!;
    }
    // found all charactersm return true if last character is end of a word
    return current.isEndWord;
  }
}

function noPrefixUsingTrie(words: string[]): void {
  // Write your code here

  const trie = new Trie();

  for (let i = 0; i < words.length; i++) {
    const curentWord = words[i];
    if (trie.checkIfPrefixExistOrInsert(curentWord)) {
      console.log("BAD SET");
      console.log(curentWord);
      return;
    }
  }

  console.log("GOOD SET");
}


// Prints
// BAD SET
// abcde
noPrefixUsingTrie(["abcd", "bcd", "abcde", "bcde"]);

// Prints
// GOOD SET
noPrefixUsingTrie(["ab", "bc", "cd"]);

// BAD SET
// aacghgh
noPrefixUsingTrie(["aab", "aac", "aacghgh", "aabghgh"]);
