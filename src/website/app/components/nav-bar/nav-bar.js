import React from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device';
import styles from './styles.scss';
import { Call } from 'styled-icons/material/Call';
import { Button } from '/src/cms/elements';
import { navBar } from '../../types';
import logo from './logo.png';

const NavBar = () => (
  <div className={styles.navBar} >
    <img src={logo} />
    <div >
      <Button
        className={styles.btn}
      >
        <Call className={styles.phone}/>
        <div>050-901-3034</div>
      </Button >
    </div >
  </div >
);

NavBar.propTypes = navBar;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
