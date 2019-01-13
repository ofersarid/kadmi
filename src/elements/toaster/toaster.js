import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { deviceType, deviceOrientation } from '/src/device/selectors';
import noop from 'lodash/noop';
import types from './types';
import styles from './styles.scss';

const Toaster = props => (
  <div
    className={cx(props.onClick && `ripple waves-effect ${styles.button}`, styles.toaster, props.show && styles.show, styles[props.type])}
    onClick={props.onClick ? props.onClick : noop}
  >
    {props.children}
  </div >
);

Toaster.propTypes = types;

Toaster.defaultProps = {
  show: false,
  type: 'error',
};

const mapStateToProps = state => ({
  deviceType: deviceType(state),
  deviceOrientation: deviceOrientation(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
