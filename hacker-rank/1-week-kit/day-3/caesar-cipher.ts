/*
 Julius Caesar protected his confidential information by encrypting it using a cipher.
 Caesar's cipher shifts each letter by a number of letters.
 If the shift takes you past the end of the alphabet, just rotate back to the front of the alphabet.
 In the case of a rotation by 3, w, x, y and z would map to z, a, b and c.

 Example
 Original alphabet:      abcdefghijklmnopqrstuvwxyz
 Alphabet rotated +3:    defghijklmnopqrstuvwxyzabc

 Complete the caesarCipher function below.

 caesarCipher has the following parameter(s):
    string s: cleartext
    int k: the alphabet rotation factor

 Returns
    string: the encrypted string

*/

/*
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

function caesarCipher(s: string, k: number): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseAlpabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let encryptedResult = "";
  const cachedEncryption: any = {};

  for (let i = 0; i < s.length; i++) {
    const isUpperCase = uppercaseAlpabet.includes(s[i]);
    const currentChar = s[i].toLowerCase();
    if (!alphabet.includes(currentChar)) {
      encryptedResult += currentChar;
      continue;
    }

    if (cachedEncryption[currentChar]) {
      encryptedResult += isUpperCase ? cachedEncryption[currentChar].toUpperCase() :cachedEncryption[currentChar];
      continue;
    }

    const indexInAlphabet = alphabet.indexOf(currentChar);
    const currentEncryption = alphabet[(indexInAlphabet + k) % 26];
    encryptedResult += isUpperCase ? currentEncryption.toUpperCase() : currentEncryption;
  }
  return encryptedResult;
}

console.log(caesarCipher("middle-Outz", 2)); // okffng-Qwvb
