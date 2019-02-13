import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Device from '/src/cms/device';
import styles from './styles.scss';
import autoBind from 'auto-bind';
import { Mail } from 'styled-icons/material/Mail';
import { Button } from '/src/cms/elements';
import Toaster from '/src/cms/elements/toaster';
// import { trackClick } from '/src/analytics';
import { footer } from '../../types';
import ContactForm from './contacts-form/contact-form';

class Footer extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      showContactForm: false,
      showSuccess: true,
      showSending: false,
    };
  }

  hideToast() {
    clearTimeout(this.timeOut);
    this.setState({ showSuccess: false });
  }

  showSuccess() {
    this.setState({ showSuccess: true, showSending: false });
    this.timeOut = setTimeout(() => {
      this.hideToast();
      this.closeForm();
    }, 8000);
  }

  showSending() {
    this.setState({ showSending: true });
  }

  toggleContactForm() {
    const { showContactForm } = this.state;
    this.setState({ showContactForm: !showContactForm });
  }

  closeForm() {
    this.setState({ showContactForm: false });
  }

  render() {
    const { showContactForm, showSuccess, showSending } = this.state;
    return (
      <div className={cx(styles.footer, showContactForm && styles.showContactForm)} >
        <div className={styles.footerTop} >
          <Button
            className={styles.btn}
            onClick={this.toggleContactForm}
            stretch
          >
            <Mail className={cx(styles.mail)} />
          </Button >
        </div >
        <ContactForm onSend={this.showSending} onSuccess={this.showSuccess} />
        <Toaster show={showSending} type="warning" className={styles.toaster} >
          שולח...
        </Toaster >
        <Toaster show={showSuccess} onClick={this.hideToast} type="success" className={styles.toaster} >
          קבלתי תודה !
        </Toaster >
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
