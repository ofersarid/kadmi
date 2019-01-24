import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device/index';
import cx from 'classnames';
import { compose } from 'redux';
import { home } from '../types';
import styles from './styles.scss';
import pergolas from './pergolas.jpg';
import outdoor from './outdoor.jpg';
import indoor from './indoor.jpg';
import decks from './decks.jpg';
import renewals from './renewals.jpg';
import Category from './category';

const CATEGORRIES = [{
  label: 'דקים',
  bgImg: decks,
}, {
  label: 'חוץ',
  bgImg: outdoor,
}, {
  label: 'פרגולות',
  bgImg: pergolas,
}, {
  label: 'פנים',
  bgImg: indoor,
}, {
  label: 'חידוש',
  bgImg: renewals,
}];

const Home = props => {
  return (
    <Fragment >
      <div className={cx(styles.home)}>
        <div className={cx(styles.gridContainer, styles[`gridContainer-${props.deviceType}`])} >
          {CATEGORRIES.map((item, i) => <Category key={item.label} label={item.label} bgImg={item.bgImg} id={i} />)}
        </div >
      </div>
    </Fragment >
  );
};

Home.propTypes = home;

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
