import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Device from '/src/cms/device';
import styles from './styles.scss';
import autoBind from 'auto-bind';
import { Mail } from 'styled-icons/material/Mail';
import { Button } from '/src/cms/elements';
// import { trackClick } from '/src/analytics';
import { footer } from '../../types';

class Footer extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      showContactForm: false,
    };
  }

  toggleContactForm() {
    const { showContactForm } = this.state;
    this.setState({ showContactForm: !showContactForm });
  }

  render() {
    const { showContactForm } = this.state;
    return (
      <div className={cx(styles.footer, showContactForm && styles.showContactForm)} >
        <div className={styles.footerTop}>
          <Button
            className={styles.btn}
            onClick={this.toggleContactForm}
            stretch
          >
            <Mail className={cx(styles.mail)} />
          </Button >
        </div >
      </div >
    );
  }
}

Footer.propTypes = footer;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
