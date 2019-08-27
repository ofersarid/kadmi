import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Device from '/src/cms/device';
import autoBind from 'auto-bind';
import { Call } from 'styled-icons/material/Call';
import { Menu } from 'styled-icons/boxicons-regular/Menu';
import { Button } from '/src/cms/elements';
import { trackClick } from '/src/analytics';
import { hashHistory } from 'react-router';
import { navBar, dropMenu } from '../../types';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { selectors as collectionSelectors } from '/src/cms/collections';
import { CATEGORIES } from '/src/website/constants';
import Routes from '/src/routes';
import styles from './styles.scss';
import logoText from './logoText.svg';

const DropMenu = ({ pathname, menuBtn }) => (
  <ul className={styles.menu} >
    {CATEGORIES.map(cat => (
      <li key={cat.label} >
        <Button
          stretch
          linkTo={cat.route}
          textColor={pathname === cat.route ? '#cac664' : 'white'}
          onClick={() => {
            menuBtn.current.click();
          }}
        >
          {cat.label}
          {/* {cat.icon} */}
        </Button >
      </li >
    ))}
    <li >
      <Button
        stretch
        linkTo="/website/about"
        textColor={pathname === '/website/about' ? '#cac664' : 'white'}
        onClick={() => {
          menuBtn.current.click();
        }}
      >
        אודות
      </Button >
    </li >
  </ul >
);

class NavBar extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.menuBtn = React.createRef();
  }

  render() {
    const { generalAssets, deviceType, pathname } = this.props;
    return (
      <div className={cx(styles.navBar)} >
        <Button className={styles.logoContainer} onClick={() => hashHistory.push('website')} >
          {generalAssets && (
            <Fragment >
              <img src={generalAssets.logo} className={styles.logoImg} />
              <img src={logoText} className={cx(styles.logoText, styles[`logoText-${deviceType}`])} />
            </Fragment >
          )}
        </Button >
        <div className={styles.left} >
          <Button
            className={cx(styles.btn, deviceType !== 'mobile' && styles.noClick)}
            justIcon
            onClick={() => {
              document.location.href = 'tel:0509013034';
              trackClick('user', 'click', 'call-button');
            }}
          >
            <Call className={cx(styles.phone)} />
            <div className={cx(styles.number)} >050-901-3034</div >
          </Button >
          <Button
            justIcon
            className={styles.more}
            tip={<DropMenu pathname={pathname} menuBtn={this.menuBtn} />}
            tipAnimation="perspective"
            interactive
            getRef={this.menuBtn}
          >
            <Menu />
          </Button >
        </div >
      </div >
    );
  }
}

NavBar.propTypes = navBar;

DropMenu.propTypes = dropMenu;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  generalAssets: collectionSelectors.settings(state).generalAssets,
  pathname: Routes.selectors.pathname(state)
});

export default compose(
  connect(mapStateToProps, {}),
  firestoreConnect(['settings'])
)(NavBar);
