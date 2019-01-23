import React from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device';
import { ParallaxProvider } from 'react-scroll-parallax';
import styles from './styles.scss';
import { websiteMainContainer } from '../../types';
import NavBar from '../nav-bar/nav-bar';

const WebsiteMainContainer = props => (
  <ParallaxProvider >
    <Device />
    <div className={styles.mainContainer} >
      <NavBar />
      <div className={styles.stage} >{props.children}</div >
    </div >
  </ParallaxProvider >
);

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

WebsiteMainContainer.propTypes = websiteMainContainer;

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteMainContainer);
