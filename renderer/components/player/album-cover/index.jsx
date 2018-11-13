import React from 'react';
import PropTypes from 'prop-types';
import Album from '@material-ui/icons/Album';
import styles from './styles.css';
import { fileShape } from '../../../types';

const AlbumCover = ({ tags }) => {
  // TODO: support multiple pictures
  const albumImage = tags && tags.picture && Array.isArray(tags.picture) && tags.picture.length
    ? tags.picture[0].src
    : null;

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
