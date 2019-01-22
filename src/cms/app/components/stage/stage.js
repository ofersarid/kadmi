import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Routes from '/src/routes';
import Device from '/src/cms/device';
import styles from './styles.scss';
import { stage } from '../../types';
import { compose } from 'redux';
import { withRouter } from 'react-router';

const Stage = props => (
  <div
    className={cx(
      styles.stage,
      props.isCMS && styles.stageAdmin)}
  >
    {props.children}
  </div >
);

Stage.propTypes = stage;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  isCMS: Routes.selectors.isCMS(state),
});

export default compose(
  connect(mapStateToProps, {}),
  withRouter,
)(Stage);
