import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Device from '/src/cms/device';
import styles from './styles.scss';
import { websiteMainContainer } from '../../types';
import NavBar from '../nav-bar/nav-bar';
import Footer from '../footer/footer';

const WebsiteMainContainer = props => (
  <Fragment >
    <Device />
    <div className={styles.mainContainer} >
      <NavBar />
      <div className={styles.stage} >{props.children}</div >
      <Footer />
    </div >
  </Fragment >
);

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

WebsiteMainContainer.propTypes = websiteMainContainer;

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['settings']),
)(WebsiteMainContainer);
