import React from 'react';
import PropTypes from 'prop-types';
import Album from '@material-ui/icons/Album';
import styles from './styles.css';
import { fileShape } from '../../../types';

// TODO: move this function to a better location
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

const AlbumCover = ({ tags }) => {
  // TODO: support multiple pictures
  const albumImage = tags && tags.picture && Array.isArray(tags.picture) && tags.picture.length
    ? `data:${tags.picture[0].data.format};base64,${uint8ToBase64(Uint8Array.from(tags.picture[0].data.data))}`
    : null;

  // let albumImage = null;

  // if (tags && tags.picture && Array.isArray(tags.picture) && tags.picture.length) {
  //   // const buffer = String.fromCharCode.apply(null, tags.picture[0].data.data);
  //   const stringBuffer = tags.picture[0].data.data.map(String.fromCharCode.call(null, ... ))
  //   const stringBuffer = new TextDecoder('utf8').decode(Uint8Array.from(tags.picture[0].data.data));
  //   const b64 = btoa(stringBuffer);
  //   albumImage = `data:${tags.picture[0].data.format};base64,${b64}`;
  // }

  return (
    <div className={styles.container}>
      {albumImage
        ? <img className={styles.albumImage} src={albumImage} alt="Album Cover" />
        : <div className={styles.missing}><Album /></div>
      }
    </div>
  );
};

AlbumCover.propTypes = {
  tags: PropTypes.shape(fileShape)
};

AlbumCover.defaultProps = {
  tags: null
};

export default AlbumCover;
