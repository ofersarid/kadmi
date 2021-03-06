import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { hashHistory } from 'react-router';
import autoBind from 'auto-bind';
import Device from '/src/cms/device';
import { UserInput } from '/src/cms/elements';
import { Dialog } from '/src/cms/elements/dialog';
import Auth from '/src/cms/auth';
import { Fingerprint } from 'styled-icons/boxicons-regular/Fingerprint';
import { validateEmail } from '/src/cms/utils';
import styles from './styles.scss';
import gobFace from './gob-face.svg';

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  updateState(updatedProps) {
    const newState = Object.assign({}, this.state, updatedProps);
    this.setState(newState);
  }

  redirectAfterLogin() {
    hashHistory.push('/cms');
  }

  componentDidUpdate(prevProps) {
    const { uid } = this.props;
    if (uid && !prevProps.uid) {
      this.redirectAfterLogin();
    }
  }

  render() {
    const { email, password } = this.state;
    const { logIn, authError, uid, deviceType } = this.props;
    return (
      <div className={styles.logInPage} >
        <img src={gobFace} className={cx(styles.logo, styles[`logo-${deviceType}`])}/>
        <Dialog
          header={(
            <Fragment >
              <Fingerprint />
              <div >Goblins CMS / Login</div >
            </Fragment >
          )}
          actions={[{
            label: 'Login',
            onClick: () => {
              return logIn(this.state);
            },
            color: 'green',
            triggerOnEnter: true,
          }]}
          onClose={() => {
            hashHistory.push(uid ? '/cms' : '/home');
          }}
          errorMsg={authError ? authError.message : null}
          className={cx(styles.dialog, styles[`dialog-${deviceType}`])}
        >
          <UserInput
            placeholder="Email"
            onChange={val => this.updateState({ email: val })}
            value={email}
            validateWith={validateEmail}
            className={cx(styles.input, styles[`input-${deviceType}`])}
            onEnterKeyPress={() => logIn(this.state).then(this.redirectAfterLogin)}
          />
          <UserInput
            placeholder="Password"
            onChange={val => this.updateState({ password: val })}
            value={password}
            type="password"
            min={4}
            max={12}
            className={cx(styles.input, styles[`input-${deviceType}`])}
            onEnterKeyPress={() => logIn(this.state).then(this.redirectAfterLogin)}
          />
        </Dialog >
      </div >
    );
  }
}

LoginPage.propTypes = Auth.types.login;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  authError: Auth.selectors.authError(state),
  working: Auth.selectors.working(state),
  uid: Auth.selectors.uid(state),
});

const mapDispatchToProps = dispatch => ({
  logIn: (...props) => dispatch(Auth.actions.logIn(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
