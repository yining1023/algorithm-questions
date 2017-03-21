271. Encode and Decode Strings

Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Machine 1 (sender) has the function:

string encode(vector<string> strs) {
  // ... your code
  return encoded_string;
}
Machine 2 (receiver) has the function:
vector<string> decode(string s) {
  //... your code
  return strs;
}
So Machine 1 does:

string encoded_string = encode(strs);
and Machine 2 does:

vector<string> strs2 = decode(encoded_string);
strs2 in Machine 2 should be the same as strs in Machine 1.

Implement the encode and decode methods.

Note:
The string may contain any possible characters out of 256 valid ascii characters. Your algorithm should be generalized enough to work on any possible characters.
Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.
Do not rely on any library method such as eval or serialize methods. You should implement your own encode/decode algorithm.
Hide Company Tags Google
Hide Tags String
Hide Similar Problems (E) Count and Say (H) Serialize and Deserialize Binary Tree


// 最开始我想能不能在每一个字符串中间加个空格把它们连起来，然后再按空格来隔开，
// 但是这种方法的问题是原来的一个字符串中如果含有空格，那么还原的时候就会被分隔成两个字符串，

// 所以我们必须还要加上长度的信息，我们的加码方法是***长度+"/"+字符串****，
// 比如对于"a","ab","abc"，我们就变成"1/a2/ab3/abc"，
// 那么我们解码的时候就有规律可寻，先寻找"/"，然后之前的就是要取出的字符个数，从“/"后取出相应个数即可，
// 以此类推直至没有"/"了，这样我们就得到高清无码的字符串集了
// 最开始我想能不能在每一个字符串中间加个空格把它们连起来，然后再按空格来隔开，
// 但是这种方法的问题是原来的一个字符串中如果含有空格，那么还原的时候就会被分隔成两个字符串，

// 所以我们必须还要加上长度的信息，我们的加码方法是***长度+"/"+字符串****，
// 比如对于"a","ab","abc"，我们就变成"1/a2/ab3/abc"，
// 那么我们解码的时候就有规律可寻，先寻找"/"，然后之前的就是要取出的字符个数，从“/"后取出相应个数即可，
// 以此类推直至没有"/"了，这样我们就得到高清无码的字符串集了
/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function(strs) {
    let res = "";
    for (let i = 0; i < strs.length; i++) {
        res = res.concat(strs[i].length + "/" + strs[i]);
    }
    return res;
};

/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
var decode = function(s) {
    let res = [];
    let i = 0;// i is the pointer
    while (i < s.length) {
        // use indexOf to find the "/" position in the string starts from i
        let found = s.indexOf("/", i);// starts from i, find the index for "/"
        // parseInt
        let len = parseInt(s.substring(i, found));//might be 15, two digit,so has to use
        // substr!!!!!(start_index, length)!!!!
        // substring(start_index, end_index)!!
        res.push(s.substr(found + 1, len));
        i = found + len + 1;// i move on
    }
    return res;
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */


/* Mock Interview */
var encode = function(strings) {
  let seperator = '/';
  for (let i = 0; i < strings.length - 1; i++) {
    encodedStr += strings[i].length + seperator + strings[i];
  }
  encodedStr += strings[strings.length - 1];
  return encodedStr;
}

var decode = function(encodedStr) {
  let results = [];
  let i = 0, leng = 0;
  while (i < encodedStr.length) {
    if (encodedStr[i] === '/') {
      results.push(encodedStr.substr(i + 1, leng));
      i += leng;
      leng = 0;
    } else {
      leng = leng * 10 + encodedStr[i];
    }
    i++;
  }
  return results;
}

// 10/aaaaabbbbb 50/def, 11