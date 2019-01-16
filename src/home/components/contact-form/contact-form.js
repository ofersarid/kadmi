import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { send } from 'emailjs-com';
import styles from './styles.scss';
import { deviceOrientation, deviceType } from '/src/device/selectors';
import { TextInput } from '/src/elements/form-elements';
import Toaster from '/src/elements/toaster';
import { trackClick } from '/src/analytics';
import types from '../../types';
import loader from './three-dots.svg';

class ContactForm extends PureComponent {
  constructor(props) {
    super(props);
    this.initialState = {
      name: '',
      phone: '',
      // type: 'business', // 'business' | 'private
      showConfirmation: false,
      showActivity: false,
      isValid: false,
    };
    this.state = this.initialState;
  }

  componentDidUpdate(prevProps, prevState) {
    const { name, phone } = this.state;
    if (name !== prevState.name || phone !== prevState.phone) {
      this.validate();
    }
  }

  showConfirmation() {
    this.setState({ showConfirmation: true });
    setTimeout(() => {
      this.setState({ showConfirmation: false });
      this.resetForm();
    }, 5000);
  }

  resetForm() {
    this.setState(this.initialState);
  }

  validate() {
    const { name, phone } = this.state;
    const isValid = name.length > 1 && phone.length >= 9;
    this.setState({ isValid });
  }

  render() {
    const { showConfirmation, name, phone, isValid, showActivity } = this.state;
    const { deviceType, deviceOrientation } = this.props;
    return (
      <div className={cx(styles.contactForm, styles[deviceType], styles[`${deviceType}-${deviceOrientation}`])} >
        <TextInput
          placeholder="שם"
          cn={cx(styles.marginLeft, styles.textInput, styles[`input-text-${deviceType}`])}
          onChange={val => this.setState({ name: val })}

        />
        <TextInput
          placeholder="נייד"
          cn={cx(styles.marginLeft, styles.textInput, styles[`input-text-${deviceType}`])}
          onChange={val => this.setState({ phone: val.replace(/\D/g, '') })}
          value={phone}
        />
        {/* <div className={cx(styles.row, styles[`row-${deviceType}`])} > */}
        {/* <label className={cx(styles.marginLeft)} >אני לקוח- </label > */}
        {/* <CheckBox */}
        {/* cn={cx(styles.marginLeft, styles[`check-box-${deviceType}`])} checked={type === 'private'} */}
        {/* onChange={() => this.setState({ type: 'private' })} >פרטי */}
        {/* </CheckBox > */}
        {/* <CheckBox */}
        {/* cn={cx(styles.marginLeft, styles[`check-box-${deviceType}`])} checked={type === 'business'} */}
        {/* onChange={() => this.setState({ type: 'business' })} >עסקי */}
        {/* </CheckBox > */}
        {/* </div > */}
        <button
          className={cx('ripple', styles.submit, styles[`send-button-${deviceType}`])}
          disabled={!isValid}
          onClick={() => {
            this.resetForm();
            this.setState({ showActivity: true });
            const templateParams = {
              'name': name,
              'phone': phone,
              // 'type': type === 'business' ? 'עסקי' : 'פרטי',
            };
            trackClick('user', 'click', 'send-contact-form');
            send('my_gmail', 'lead-from-website', templateParams, 'user_fg2fM2XobeIW7nmIjcPKY')
              .then(response => {
                this.setState({ showActivity: false });
                this.showConfirmation();
              }, error => {
                console.log('FAILED...', error);
              });
          }}
        >
          חזור אלי
        </button >
        <Toaster show={showActivity} type="warning" >
          <div >שולח</div >
          <img src={loader} className={styles.loader} />
        </Toaster >
        <Toaster show={showConfirmation} type="success" >
          קבלתי, תודה !
        </Toaster >
      </div >
    );
  }
}

ContactForm.propTypes = types;

const mapStateToProps = state => ({
  deviceType: deviceType(state),
  deviceOrientation: deviceOrientation(state),
});

export default connect(mapStateToProps, {})(ContactForm);
