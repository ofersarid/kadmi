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
import { selectors as collectionSelectors } from '/src/cms/collections';

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
  const resolveBgImage = category => {
    switch (category) {
      case 'decks':
        return props.settings.generalAssets.decksCover;
      case 'outdoors':
        return props.settings.generalAssets.outdoorsCover;
      case 'pergolas':
        return props.settings.generalAssets.pergolasCover;
      case 'indoors':
        return props.settings.generalAssets.indoorsCover;
      case 'renewals':
        return props.settings.generalAssets.renewalsCover;
    }
  };
  return props.settings.generalAssets ? (
    <Fragment >
      <div className={cx(styles.home)} >
        <div className={cx(styles.gridContainer, styles[`gridContainer-${props.deviceType}`])} >
          {CATEGORIES.map((item, i) => (
            <Category
              key={item.route}
              label={item.label}
              bgImg={resolveBgImage(item.route)}
              index={i}
              route={item.route}
            />
          ))}
        </div >
      </div >
    </Fragment >
  ) : null;
};

Home.propTypes = home;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  settings: collectionSelectors.settings(state),
});

export default compose(
  connect(mapStateToProps, {}),
  firestoreConnect(['settings']),
)(Home);
