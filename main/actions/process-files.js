const mm = require('music-metadata');
const { ipcMain } = require('electron');
const Track = require('../../models/track');
const uint8ToBase64 = require('../util/uint8-to-base64');

ipcMain.on('get-all-track-info-from-db', event => {
  Track.fetchAll().then(results => {
    event.sender.send('newtracks', results.toJSON());
  });
});


function parseMetaDataFromFile(filepath) {
  return mm.parseFile(filepath)
    .then(({ common: tags, format }) => {
      // base64 pictures
      if (tags.picture && Array.isArray(tags.picture) && tags.picture.length) {
        tags.picture = tags.picture.map(pictureObj => {
          // console.log(pictureObj);
          pictureObj.src = `data:${pictureObj.format};base64,${uint8ToBase64(pictureObj.data)}`;
          delete pictureObj.data;
          return pictureObj;
        });
      }

      return { filepath, tags, format };
    });
}

function addTrackToDb(trackObj) {
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
