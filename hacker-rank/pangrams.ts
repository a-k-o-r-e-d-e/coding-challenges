/**
 * A pangram is a string that contains every letter of the alphabet. 
 * Given a sentence determine whether it is a pangram in the English alphabet. 
 * Ignore case. Return either pangram or not pangram as appropriate.
 * 
 * Example
 *      s = "the quick brown fox jumps over the lazy dog"
 * The string contains all letters in the English alphabet, so return pangram.
 * 
 * Function Description
 * pangrams has the following parameter(s):
 *      string s: a string to test
 * Returns
 *      string: either pangram or not pangram
 * Input Format
 *      A single line with string .
 * Constraints
 *      0 < length of s <= 10^3
 *      Each character of a, a[i] is an element of {a-z, A-Z, space}, 
 */


 function pangrams(s: string): string {
    // const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let lettersFound: {[letter:string]: boolean} = {};
    s = s.replace(/\s+/g, "");
    s = s.toLowerCase();

    for (let i = 0; i < s.length; i++) {
        const currentLetter = s[i];
        if (!lettersFound[currentLetter]) {
            lettersFound[currentLetter] = true;
        }
    }
    // console.log(s);
    // console.log(lettersFound);
    return Object.keys(lettersFound).length == 26 ? "pangram" : "not pangram";
}

console.log(pangrams("the quick brown fox jumps over the lazy dog")); // pangram
console.log(pangrams("  We proMMMMptly judged  antique ivory buckles for the next prize   ")); // pangram
console.log(pangrams("We promptly judged antique ivory buckles for the prize")); // not pangram (The string lacks an x.)
console.log(pangrams("WwmdRukNYPMFBxYFPVtZrzs FAktokrLtdPyVRWCyqSHaqjttuhYNXpwnzwoXDC AdKRP AWwEamzQlOT EweNHXGkYrgJJwzErXvkiYIGOK goZXDYecGz oPHaxcZZC Z ktcXTnPFeuPQgQqoJS LZtk nOA zXc QyDseEIHVueKlgZVcQhgc hNHCQJS NXqvz EIOrqfPcBaXHDmWCHKMufyLXBQPVROdnlWDICRO qUNaVNP I fJAoEK saAnGbE pXvQW nd bitUAdJoIkbhPkwiKVUxpgV NsDCpwztiCXliMHrOEicnEsVc uIiai hLRqwFVeeHQzXXqVgUmNcqc TdHCztGUXwnzFGIPdYNZhfFKPQuUI ynSWARRzzwlRlzL JxsljNx YGfagQnP g VMImbbBNiOjNqtFb ODtQK DxNIfqggIzXgP eGMS kcnelJ kOTAG tSwcSlyMp xVjLZigPdsR yilXJyDa SKGOj yWEROeKfnPE iSFZwHPj ZPwKdllGxEdtpKwTMcB Yuus JgyWdYHj snl HrFqRgVDgVPAh X PBRAkR EwpdMYrlgI QKUnRBfKLwV yXKKGbMkIRIYN dqzaYvIQM vt yvuaGntYHEgEJb TNoPvslu htYlZXayqTlcNclvSOoMyfiTWehzhs W wanyMaAYijgxubvDINMlqHblbjLSJCvCpfvqaWHy qwG lLciwkkuu o NoSTWbytadyGuTRznISvCQhFMtrdqveTmcc mcKNPGowUGBLPmONplkUwZeu N p apQLbHLFSIt vkOcFlSMYZdaZy PzfbRPLTHy gAFo PLRItTAOfuWITfyIzUBc F GEXzyMZHXRpnpxQ NV Cl PIBRgkNNKQTVgGkTNbojQqm VvomeAxXDppIWm I KqyX CTA nt JTSsOH M mKzfGwsT LjXPVYzcJFdVWqkFRNm"));