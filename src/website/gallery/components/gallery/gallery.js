import React from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styles from './styles.scss';
import { gallery } from '../../types';

const Gallery = () => (
  <div className={styles.gallery} >Gallery</div >
);

Gallery.propTypes = gallery;

Gallery.deafultProps = {
  list: [],
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

export default compose(
  connect(mapStateToProps, {}),
  firestoreConnect(props => ([{
    collection: props.collection,
  }])),
)(Gallery);
