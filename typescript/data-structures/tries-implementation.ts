/**
 * Tries are an ordered tree-like data structure efficient in handling programming problems related to strings.
 * It is also called a Prefix Tree or a Digital tree.
 * 
 * Tries are used in dictionary word searches, spell-checking and in search engines by making auto-suggestions.
 * Some properties are necessary to maintain the overall efficiency of a trie, they include:
 *  - A trie is always a set of linked nodes with an empty root node.
 *  - Each node represents a unique alphabet.
 *  - Each node can point to null or other children nodes.
 *  - The depth of a trie depends on the longest word that it stores.
 *  - Tries to provide the same path for words that share a common prefix.
 *  - The size of a trie depends on the number of alphabets (i.e. the child nodes), and the number of child nodes in a trie depends upon the total number of values possible.
 * 
 * For example, in English, there are 26 letters so the number of unique nodes cannot exceed 26.
 * Likewise, in Bengali with 50 letters would have 50 unique nodes.
 * 
 * 
 * Implementing Tries in JavaScript
 * Every node in a trie represents an alphabet.
 * A typical node in a trie consists of three data members:
 *  - char: This stores the character that the node is supposed to contain.
 *  - children[ ]: An array that consists of pointers to children nodes. The size of this array depends on the number of alphabets. All are set to null.
 *  - isEndWord: A flag to indicate the end of a word. It is set to false by default and is only updated when words end during insertion.


 */

/// TrieNode Implemented using an array to store the children.
class TrieNodeUsingArray {
  char: string;
  children: TrieNodeUsingArray[] | null[] = Array(26).fill(null);
  isEndWord = false;
  constructor(char: string) {
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

class TrieUsingArrays {
  root = new TrieNodeUsingArray("");

  getIndex(t: string) {
    return t.charCodeAt(0) - "a".charCodeAt(0);
  }

  // Function to insert a key into the Trie
  insertkey(key: string | null) {
    if (key == null) {
      return;
    }

    key = key.toLowerCase();
    let currentNode = this.root;
    let index = 0;

    // Strore the character index
    // Iterate the trie with the given character index
    // if the index points to null
    // simply create a TrieNode and go down a level
    for (let level = 0; level < key.length; level++) {
      index = this.getIndex(key[level]);

      if (currentNode.children[index] == null) {
        currentNode.children[index] = new TrieNodeUsingArray(key[level]);
        console.log(String(key[level]) + " inserted");
      }
      currentNode = currentNode.children[index]!;
    }

    /// mark the end character as a leaf node
    currentNode.markAsLeaf();
    console.log("'" + key + "' inserted");
  }

  /// Function to search a given key in Trie
  search(key: string): boolean {
    if (key == null) {
      return false;
    }

    key = key.toLowerCase();
    let currentNode = this.root;
    let index = 0;

    // Iterate the Trie with given character index
    // If it is null at any point then we stop and return null
    // We will return true if only will reach leafNode and have tranversed the Trie based on the length of the key
    for (let level = 0; level < key.length; level++) {
      index = this.getIndex(key[level]);
      if (currentNode.children[index] == null) {
        return false;
      }
      currentNode = currentNode.children[index]!;
    }
    if (currentNode != null && currentNode.isEndWord) {
      return true;
    }
    return false;
  }

  delete(key: string) {
    if (this.root == null || key == null) {
      console.log("Null key or Empty Trie Error");
      return;
    }

    this.deleteHelper(key, this.root, key.length, 0);
  }

  /// helper function
  private hasNoChildren(currentNode: TrieNodeUsingArray) {
    currentNode.children.forEach((child) => {
      if (child != null) {
        return false;
      }
    });
    return true;
  }

  /// recursive delete helper function
  private deleteHelper(
    key: string,
    currentNode: TrieNodeUsingArray | null,
    length: number,
    level: number
  ): boolean {
    let deletedSelf = false;

    if (currentNode == null) {
      console.log("Key does not exist");
      return deletedSelf;
    }

    // Base Case: if we have reached the node which points to the end of the key
    if (level == length) {
      /// if there are no nodes ahead of this node, then we can delete it
      if (this.hasNoChildren(currentNode)) {
        currentNode == null;
        deletedSelf = true;
      }

      // If there are nodes ahead of the currentNode in this path
      // Then we cannot delete currentNode. We simply unmark this as leaf
      else {
        currentNode.unMarkAsLeaf();
        deletedSelf = false;
      }
    } else {
      let childNode = currentNode.children[this.getIndex(key[level])];
      let childDeleted = this.deleteHelper(key, childNode, length, level + 1);
      if (childDeleted) {
        /// Making children pointer also null: since child is deleted;
        currentNode.children[this.getIndex(key[level])] = null;

        // if currentNode is leaf node that means that current node is part of another key
        // Hence, we cannot delete this node and its parent path nodes
        if (currentNode.isEndWord) {
          deletedSelf = false;
        } else if (this.hasNoChildren(currentNode) == false) {
          // If childNode is deleted but currentNode ahs more children
          // Then currentNode must be part of another key
          // Hence we cannot delete currentNode
          deletedSelf = false;
        } else {
          // Else we can delete currentNode
          currentNode = null;
          deletedSelf = true;
        }
      } else {
        deletedSelf = false;
      }
    }
    return deletedSelf;
  }


} /// Close class

// Input keys (use only 'a' through 'z' and lower case)
let keys = ["the", "a", "there", "answer", "any", "by", "bye", "their", "abc"];

let trie = new TrieUsingArrays();

console.log("Keys to Insert: ");
console.log(keys);
/// construct Trie
keys.forEach((key) => {
  trie.insertkey(key);
});


/// TrieNode Implemented using a Map to store the children.
class TrieNodeUsingMap {
  char: string|null;
  children = new Map<string, TrieNodeUsingMap>();
  isEndWord = false;
  constructor(char: string|null) {
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

class TrieUsingMap {
  root = new TrieNodeUsingMap(null);
  
  insert(word: string) {
    let current = this.root;
    /// Iterate throigh all the characters of the word
    for (let character of word) {
      // if node doesn't have the current character as child, insert it
      if (current.children.get(character) === undefined) {
        current.children.set(character, new TrieNodeUsingMap(character)); 
      }

      // move down, to the next character
      current = current.children.get(character)!;
    }

    // mark the last inserted character as end of the word
    current.isEndWord = true;
  }

  search(word: string) {
    let current = this.root;
    
    // iterate through all the characters of the word
    for (let character of word) {
      if (current.children.get(character)=== undefined) {
        /// could not find this character in sequence return false
        return false;
      }
      // move down, to match the next character;
      current = current.children.get(character)!;
    }
    // found all charactersm return true if last character is end of a word
    return current.isEndWord;
  }

  delete(key: string) {
    if (this.root == null || key == null) {
      console.log("Null key or Empty Trie Error");
      return;
    }

    this.deleteHelper(key, this.root, key.length, 0);
  }

  /// helper function
  private hasNoChildren(currentNode: TrieNodeUsingMap) {
    return currentNode.children.size === 0;
  }

  /// recursive delete helper function
  private deleteHelper(
    key: string,
    currentNode: TrieNodeUsingMap | undefined | null,
    length: number,
    level: number
  ): boolean {
    let deletedSelf = false;

    if (!currentNode) {
      console.log("Key does not exist");
      return deletedSelf;
    }

    // Base Case: if we have reached the node which points to the end of the key
    if (level == length) {
      /// if there are no nodes ahead of this node, then we can delete it
      if (this.hasNoChildren(currentNode)) {
        currentNode == null;
        deletedSelf = true;
      }

      // If there are nodes ahead of the currentNode in this path
      // Then we cannot delete currentNode. We simply unmark this as leaf
      else {
        currentNode.unMarkAsLeaf();
        deletedSelf = false;
      }
    } else {
      let childNode = currentNode.children.get(key[level]);
      let childDeleted = this.deleteHelper(key, childNode, length, level + 1);
      if (childDeleted) {
        /// delete pointer to children: since child is deleted;
        currentNode.children.delete(key[level]);

        // if currentNode is leaf node that means that current node is part of another key
        // Hence, we cannot delete this node and its parent path nodes
        if (currentNode.isEndWord) {
          deletedSelf = false;
        } else if (this.hasNoChildren(currentNode) == false) {
          // If childNode is deleted but currentNode ahs more children
          // Then currentNode must be part of another key
          // Hence we cannot delete currentNode
          deletedSelf = false;
        } else {
          // Else we can delete currentNode
          currentNode = null;
          deletedSelf = true;
        }
      } else {
        deletedSelf = false;
      }
    }
    return deletedSelf;
  }

}


const trieUsingMap = new TrieUsingMap();

console.log("***** Implememtation using Maps ************")
// insert few words
trieUsingMap.insert("CAT");
trieUsingMap.insert("DOG");

// search something
console.log(trieUsingMap.search("MAT")); // false
console.log(trieUsingMap.search("DOG")) // true


export {}