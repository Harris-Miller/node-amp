const mm = require('music-metadata');
const { ipcMain } = require('electron');
const Track = require('../../models/track');

ipcMain.on('get-all-track-info-from-db', event => {
  Track.fetchAll().then(results => {
    event.sender.send('newtracks', results.toJSON());
  });
});

function parseMetaDataFromFile(filepath) {
  return mm.parseFile(filepath)
    .then(metadata => ({ filepath, tags: metadata.common, format: metadata.format }));
}

function addTrackToDb(trackObj) {
  console.log(trackObj);
  return Track.forge(trackObj, { hasTimestamps: true }).save();
}

// function updateTrackInDb({ filepath, format, tags }) {
//   return Track.where({ filepath }).update({ format, tags });
// }

// async function doesTrackExistInDb(filepath) {
//   const doesIt = await Track.query({ filepath }).fetch({ columns: ['filepath'] }).then(Boolean);
//   return doesIt;
// }

function processFile(filepath) {
  // return parseMetaDataFromFile(filepath)
  //   .then(trackObj => (doesTrackExistInDb ? updateTrackInDb(trackObj) : addTrackToDb(trackObj)))
  //   .then(dbObj => dbObj.toJSON());

  return parseMetaDataFromFile(filepath)
    .then(addTrackToDb)
    .then(dbObj => dbObj.toJSON());
}

module.exports = {
  parseMetaDataFromFile,
  addTrackToDb,
  processFile
};
