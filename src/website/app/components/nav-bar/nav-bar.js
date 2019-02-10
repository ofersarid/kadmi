import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Device from '/src/cms/device';
import styles from './styles.scss';
import { Call } from 'styled-icons/material/Call';
import { MoreVert } from 'styled-icons/material/MoreVert';
import { Button } from '/src/cms/elements';
import { trackClick } from '/src/analytics';
import { hashHistory } from 'react-router';
import { navBar } from '../../types';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { selectors as collectionSelectors } from '/src/cms/collections';
import { CATEGORIES } from '/src/website/constants';
import logoText from './logoText.svg';

const DropMenu = (
  <ul>
    {CATEGORIES.map(cat => (
      <li key={cat.label}>{cat.label}</li>
    ))}
  </ul>
);

const NavBar = props => (
  <div className={cx(styles.navBar)} >
    <Button className={styles.logoContainer} onClick={() => hashHistory.push('website')}>
      {props.generalAssets && (
        <Fragment >
          <img src={props.generalAssets.logo} className={styles.logoImg} />
          <img src={logoText} className={cx(styles.logoText, styles[`logoText-${props.deviceType}`])} />
        </Fragment >
      )}
    </Button >
    <div >
      <Button
        className={cx(styles.btn, props.deviceType !== 'mobile' && styles.noClick)}
        onClick={() => {
          document.location.href = 'tel:972509013034';
          trackClick('user', 'click', 'call-button');
        }}
      >
        <Call className={cx(styles.phone, styles[`phone-${props.deviceType}`])} />
        <div className={cx(styles[`number-${props.deviceType}`])} >050-901-3034</div >
      </Button >
      <Button
        justIcon
        menu={DropMenu}
      >
        <MoreVert />
      </Button>
    </div >
  </div >
);

NavBar.propTypes = navBar;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  generalAssets: collectionSelectors.settings(state).generalAssets,
});

export default compose(
  connect(mapStateToProps, {}),
  firestoreConnect(['settings']),
)(NavBar);
