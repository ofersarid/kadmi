import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device/index';
import cx from 'classnames';
import { compose } from 'redux';
import types from '../types';
import styles from './styles.scss';

const Home = props => {
  return (
    <Fragment >
      <div className={styles.home}>
        <div className={cx(styles.gridContainer, styles[`gridContainer-${props.deviceType}`])} >
          <div className={cx(styles.category, styles.category1)} >
            <title className={styles.title}>דקים</title>
          </div >
          <div className={cx(styles.category, styles.category2)} >
            <title className={styles.title}>פרגולות</title>
          </div >
          <div className={cx(styles.category, styles.category3)} >
            <title className={styles.title}>פנים</title>
          </div >
          <div className={cx(styles.category, styles.category4)} >
            <title className={styles.title}>חוץ</title>
          </div >
          <div className={cx(styles.category, styles.category5)} >
            <title className={styles.title}>שיפוץ</title>
          </div >
        </div >
      </div>
    </Fragment >
  );
};

Home.propTypes = types;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  // events: selectors.filteredOrderedList(state, 'events'),
});

export default compose(
  connect(mapStateToProps, {}),
  // firestoreConnect(() => ([{
  //   collection: 'events',
  //   orderBy: ['dateTime', 'desc'],
  //   where: [['active', '==', true]],
  // }])),
)(Home);
