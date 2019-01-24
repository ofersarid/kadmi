import React from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device/index';
import cx from 'classnames';
import { compose } from 'redux';
import { category } from '../types';
import styles from './styles.scss';

const Category = props => {
  return (
    <div className={cx(styles.category, styles[`category${props.id}`])} >
      <div className={cx('img', styles.img)} style={{ backgroundImage: `url(${props.bgImg})` }}/>
      <label className={cx(styles.label, styles[`title-${props.deviceType}`])}>{props.label}</label>
    </div >
  );
};

Category.propTypes = category;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

export default compose(
  connect(mapStateToProps, {}),
)(Category);
