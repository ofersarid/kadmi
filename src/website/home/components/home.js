import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device/index';
import { firestoreConnect } from 'react-redux-firebase';
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

export const CATEGORIES = [{
  label: 'דקים',
  bgImg: decks,
  route: 'decks'
}, {
  label: 'חוץ',
  bgImg: outdoor,
  route: 'outdoors'
}, {
  label: 'פרגולות',
  bgImg: pergolas,
  route: 'pergolas'
}, {
  label: 'פנים',
  bgImg: indoor,
  route: 'indoors'
}, {
  label: 'חידוש',
  bgImg: renewals,
  route: 'renewals'
}];

const Home = props => {
  return (
    <Fragment >
      <div className={cx(styles.home)} >
        <div className={cx(styles.gridContainer, styles[`gridContainer-${props.deviceType}`])} >
          {CATEGORIES.map((item, i) => (
            <Category
              key={item.route}
              label={item.label}
              bgImg={item.bgImg}
              index={i}
              route={item.route}
            />
          ))}
        </div >
      </div >
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
  firestoreConnect(['settings']),
)(Home);
