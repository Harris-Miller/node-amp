/* eslint-disable filenames/match-regex */
const btoa = require('btoa');

function uint8ToBase64(u8Arr) {
  const CHUNK_SIZE = 0x8000; // arbitrary number
  let index = 0;
  const { length } = u8Arr;
  let result = '';
  let slice;
  while (index < length) {
    slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK_SIZE;
  }
  return btoa(result);
}

module.exports = uint8ToBase64;
