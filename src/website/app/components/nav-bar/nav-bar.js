import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Device from '/src/cms/device';
import styles from './styles.scss';
import { Call } from 'styled-icons/material/Call';
import { Button } from '/src/cms/elements';
import { trackClick } from '/src/analytics';
import { navBar } from '../../types';
import logo from './logo.png';

const NavBar = props => (
  <div className={styles.navBar} >
    <img src={logo} />
    <div >
      <Button
        className={styles.btn}
        onClick={() => {
          document.location.href = 'tel:972509013034';
          trackClick('user', 'click', 'call-button');
        }}
      >
        <Call className={cx(styles.phone, styles[`phone-${props.deviceType}`])} />
        <div className={cx(styles[`number-${props.deviceType}`])}>050-901-3034</div >
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
