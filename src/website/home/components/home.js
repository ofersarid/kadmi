import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device/index';
import { firestoreConnect } from 'react-redux-firebase';
import cx from 'classnames';
import { compose } from 'redux';
import { selectors as collectionSelectors } from '/src/cms/collections';
import { CATEGORIES } from '/src/website/constants';
import { home } from '../types';
import styles from './styles.scss';
import Category from './category';

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
