import PropTypes from 'prop-types';

export const tagShape = {
  album: PropTypes.string,
  artist: PropTypes.string,
  artists: PropTypes.arrayOf(PropTypes.string),
  bpm: PropTypes.string,
  comment: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.string,
  disK: PropTypes.shape({
    no: PropTypes.number,
    of: PropTypes.number
  }),
  encodedby: PropTypes.string,
  genre: PropTypes.arrayOf(PropTypes.string),
  grouping: PropTypes.string,
  isrc: PropTypes.arrayOf(PropTypes.string),
  key: PropTypes.string,
  pictures: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.array,
    description: PropTypes.string,
    format: PropTypes.string,
    type: PropTypes.string
  })),
  track: PropTypes.shape({
    no: PropTypes.number,
    of: PropTypes.number
  }),
  year: PropTypes.number
};

export const formatShape = {
  bitrate: PropTypes.number,
  codecProfile: PropTypes.string,
  dataformat: PropTypes.string,
  duration: PropTypes.number,
  encoder: PropTypes.string,
  lossless: PropTypes.bool,
  numberofChannels: PropTypes.number,
  sampleRate: PropTypes.number,
  tagTypes: PropTypes.arrayOf(PropTypes.string)
};

export const fileShape = {
  filepath: PropTypes.string,
  format: PropTypes.shape(formatShape),
  tags: PropTypes.shape(tagShape)
};
