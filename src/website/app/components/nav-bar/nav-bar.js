import React from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device';
import styles from './styles.scss';
import { navBar } from '../../types';

const NavBar = () => (
  <div className={styles.navBar} >NavBar</div >
);

NavBar.propTypes = navBar;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
