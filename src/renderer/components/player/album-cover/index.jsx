import React from 'react';
import PropTypes from 'prop-types';
import Album from '@material-ui/icons/Album';
import styles from './styles.css';

const AlbumCover = ({ tags }) => {
  const albumImage = tags && tags.image && tags.image.data
    ? `data:image/png;base64,${tags.image.data.toString('base64')}`
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
  tags: PropTypes.shape()
};

AlbumCover.defaultProps = {
  tags: null
};

export default AlbumCover;
