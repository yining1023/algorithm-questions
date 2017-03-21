535. Encode and Decode TinyURL

TinyURL is a URL shortening service where you enter a URL such as https://leetcode.com/problems/design-tinyurl and it returns a short URL such as http://tinyurl.com/4e9iAk.

Design the encode and decode methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.

Hide Company Tags Amazon Google Uber Facebook
Hide Tags Hash Table Math
Hide Similar Problems (M) Design TinyURL

// no need to over-complicate things, thinking it's like encode decode strings list to a string
// building some map relations between longUrl and shortUrl! => hash map, 2 objects, check if the code is taken or not

/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
// My first solution produces short URLs like http://tinyurl.com/0, http://tinyurl.com/1, etc, in that order.
// the index in the url array is the shortUrl, use the index to get the element which is the longUrl
// var urls = [];
// var encode = function(longUrl) {
//     urls.push(longUrl);
//     return "http://tinyurl.com/" + (urls.length - 1);// it's index, not the element
// };

// /**
//  * Decodes a shortened URL to its original URL.
//  *
//  * @param {string} shortUrl
//  * @return {string}
//  */
// var decode = function(shortUrl) {
//     let index = shortUrl.split('/')[shortUrl.split('/').length - 1];
//     return urls[index];
// };

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */

// Using increasing numbers as codes like that is simple but has some disadvantages, which the below solution fixes:

// If I'm asked to encode the same long URL several times, it will get several entries. That wastes codes and memory.
// People can find out how many URLs have already been encoded. Not sure I want them to know.
// People might try to get special numbers by spamming me with repeated requests shortly before their desired number comes up.
// Only using digits means the codes can grow unnecessarily large. Only offers a million codes with length 6 (or smaller). Using six digits or lower or upper case letters would offer (10+26*2)6 = 56,800,235,584 codes with length 6.
// The following solution doesn't have these problems. It produces short URLs like http://tinyurl.com/KtLa2U, using a random code of six digits or letters. If a long URL is already known, the existing short URL is used and no new entry is generated.

// need two objects!!! one from url to code, one from code to url! because you cannot use a value to loopup keys
var urlToCode = {},
    codeToUrl = {};

// have a function to generate 6 random digit code
function getRandomCode(len) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let results = '';
    for (let i = 0; i < len; i++) {
        results += alphabet[Math.floor(Math.random() * 62)];
    }
    return results;
}

var encode = function(longUrl) {
    // check if already has a code for it, but the below code could be merge later
    // if (urlToCode[longUrl] !== undefined) return "http://tinyurl.com/" + urlToCode[longUrl];

    while (urlToCode[longUrl] === undefined) {
        let code = getRandomCode(6);
        if (codeToUrl[code] === undefined) {// check if the code is taken!
            codeToUrl[code] = longUrl;
            urlToCode[longUrl] = code;
        }
    }
    return "http://tinyurl.com/" + urlToCode[longUrl];
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */


var decode = function(shortUrl) {
    let code = shortUrl.split("/")[shortUrl.split("/").length - 1];
    return codeToUrl[code];
};

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */
