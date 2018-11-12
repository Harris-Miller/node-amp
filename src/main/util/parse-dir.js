const path = require('path');
const fs = require('fs');

const SUPPORTED_FILE_EXTENSIONS = [
  'aiff',
  'aifc',
  'ape',
  'asf',
  'flac',
  'mp2',
  'mp3',
  'mp4',
  'm4a',
  'aac',
  'ogg',
  'wav',
  'wma'
];

const rExtenstions = new RegExp(`\.(${SUPPORTED_FILE_EXTENSIONS.join('|')})$`);

function parseDir(dir) {
  const items = fs.readdirSync(dir);

  const musicFiles = items
    .filter(item => rExtenstions.test(path.extname(item)))
    .map(item => path.join(dir, item));

  const folders = items.filter(item => fs.statSync(path.join(dir, item)).isDirectory());

  if (folders.length) {
    return musicFiles.concat(...folders.map(folder => parseDir(path.join(dir, folder))));
  }

  return musicFiles;
}

module.exports = parseDir;
