import React from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device/index';
import { selectors as collectionSelectors } from '/src/cms/collections';
import { compose } from 'redux';
import { aboutPageTypes } from '../types';
import styles from './styles.scss';

const AboutPage = props => {
  return (
    <div
      className={styles.pageWrap}
      dangerouslySetInnerHTML={{ __html: props.settings.generalAssets ? props.settings.generalAssets.aboutMe : '' }}
    />
  );
};

AboutPage.propTypes = aboutPageTypes;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  settings: collectionSelectors.settings(state),
});

export default compose(
  connect(mapStateToProps, {}),
)(AboutPage);
