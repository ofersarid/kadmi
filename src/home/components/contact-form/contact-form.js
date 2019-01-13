import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { send } from 'emailjs-com';
import styles from './styles.scss';
import { deviceOrientation, deviceType } from '/src/device/selectors';
import { TextInput, CheckBox } from '/src/elements/form-elements';
import Toaster from '/src/elements/toaster';
import types from '../../types';

class ContactForm extends PureComponent {
  constructor(props) {
    super(props);
    this.initialState = {
      name: '',
      phone: '',
      type: 'business', // 'business' | 'private
      showConfirmation: false,
    };
    this.state = this.initialState;
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

  render() {
    const { type, showConfirmation, name, phone } = this.state;
    const { deviceType } = this.props;
    return (
      <div className={cx(styles.contactForm, styles[deviceType])} >
        <TextInput
          placeholder="שם"
          cn={cx(styles.marginLeft, styles.textInput, styles[`input-text-${deviceType}`])}
          onChange={val => this.setState({ name: val })}
        />
        <TextInput
          placeholder="נייד"
          cn={cx(styles.marginLeft, styles.textInput, styles[`input-text-${deviceType}`])}
          onChange={val => this.setState({ phone: val })}
        />
        <div className={cx(styles.row, styles[`row-${deviceType}`])} >
          <label className={cx(styles.marginLeft)} >אני לקוח- </label >
          <CheckBox
            cn={cx(styles.marginLeft, styles[`check-box-${deviceType}`])} checked={type === 'private'}
            onChange={() => this.setState({ type: 'private' })} >פרטי
          </CheckBox >
          <CheckBox
            cn={cx(styles.marginLeft, styles[`check-box-${deviceType}`])} checked={type === 'business'}
            onChange={() => this.setState({ type: 'business' })} >עסקי
          </CheckBox >
        </div >
        <button
          className={cx('ripple', styles.submit, styles[`send-button-${deviceType}`])}
          onClick={() => {
            const templateParams = {
              'name': name,
              'phone': phone,
              'type': type === 'business' ? 'עסקי' : 'פרטי',
            };
            send('my_gmail', 'lead-from-website', templateParams, 'user_fg2fM2XobeIW7nmIjcPKY')
              .then(response => {
                this.showConfirmation();
              }, error => {
                console.log('FAILED...', error);
              });
          }}
        >
          חזור אלי
        </button >
        <Toaster show={showConfirmation} type="warning" >
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
