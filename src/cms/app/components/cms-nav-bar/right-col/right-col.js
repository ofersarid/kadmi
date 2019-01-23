import React from 'react';
import { connect } from 'react-redux';
import { Globe } from 'styled-icons/fa-solid/Globe';
import Button from '/src/cms/elements/button';
import { rightCol } from '../../../types';
import Device from '/src/cms/device';
import Auth from '/src/cms/auth';
import { LogOut } from 'styled-icons/boxicons-regular/LogOut';
import { hashHistory } from 'react-router';
import styles from './styles.scss';

const RightCol = props => (
  <ul className={styles.rightCol} >
    <li className={styles.clientId}>Client-Id: omerkadmi.co.il</li>
    <li >
      <Button
        color="black-invert"
        linkTo="home"
        className={styles.btn}
        justIcon={props.isMobile}
      >
        <Globe />
        {!props.isMobile && <div >Website</div >}
      </Button >
    </li >
    <li >
      <Button
        color="black-invert"
        className={styles.btn}
        justIcon={props.isMobile}
        onClick={() => {
          props.logOut().then(() => {
            hashHistory.push('login');
          });
        }}
      >
        <LogOut />
        {!props.isMobile && <div >Log Out</div >}
      </Button >
    </li >
  </ul >
);

RightCol.propTypes = rightCol;

const mapStateToProps = state => ({
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(Auth.actions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightCol);
