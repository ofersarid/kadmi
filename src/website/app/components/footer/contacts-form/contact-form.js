import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Device from '/src/cms/device';
import autoBind from 'auto-bind';
import { compose } from 'redux';
import { UserInput } from '/src/cms/elements';
import Button from '/src/cms/elements/button';
import { validatePhone, toTitleCase, validateEmail } from '/src/cms/utils';
import { createContact } from './actions';
import { contactForm } from '../../../types';
import styles from './styles.scss';

class ContactForm extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
      isValid: false,
    };
    this.defaultState = this.state;
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.phoneRef = React.createRef();
  }

  componentDidUpdate() {
    this.validate();
  }

  validate() {
    const { name, phone } = this.state;
    const isValid = name.length > 0 && validatePhone(phone);
    this.setState({ isValid });
  }

  onChange(change) {
    this.setState(Object.assign({}, this.state, change));
  }

  clearForm() {
    this.setState(this.defaultState);
    if (!this.unmounting) {
      this.nameRef.current.hideValidation();
      this.emailRef.current.hideValidation();
      this.phoneRef.current.hideValidation();
    }
  }

  componentWillUnmount() {
    this.unmounting = true;
  }

  render() {
    const { name, email, message, isValid, phone } = this.state;
    const { onSend, onSuccess, deviceType, isMobile } = this.props;
    return (
      <div className={cx(styles.formContainer, styles[`formContainer-${deviceType}`])}>
        <UserInput
          placeholder="שם"
          onChange={value => this.onChange({
            name: toTitleCase(value),
          })}
          value={name}
          min={1}
          getRef={this.nameRef}
          rtl
          className={styles[`singleLine-${deviceType}`]}
        />
        <UserInput
          placeholder="דואל"
          onChange={value => this.onChange({
            email: value,
          })}
          value={email}
          min={1}
          getRef={this.emailRef}
          validateWith={validateEmail}
          rtl
          className={styles[`singleLine-${deviceType}`]}
        />
        <UserInput
          placeholder="טלפון"
          onChange={value => this.onChange({
            phone: value.replace(/\D/g, ''),
          })}
          value={phone}
          min={1}
          getRef={this.phoneRef}
          validateWith={validatePhone}
          rtl
          className={styles[`singleLine-${deviceType}`]}
        />
        {!isMobile && (
          <UserInput
            placeholder="כמה מילים..."
            onChange={value => this.onChange({
              message: value,
            })}
            value={message}
            type="multi-line"
            optional
            rtl
            stretch
          />
        )}
        <Button
          stretch
          color="#cac664"
          textColor="white"
          className={styles.sendBtn}
          disable={!isValid}
          onClick={() => {
            onSend();
            this.props.createContact(name, email, message, phone).then(() => {
              onSuccess();
              this.clearForm();
            });
          }}
        >
          שלח
        </Button>
      </div>
    );
  }
}

ContactForm.propTypes = contactForm;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  isMobile: Device.selectors.isMobile(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

const mapDispatchToProps = (dispatch) => ({
  createContact: (...props) => dispatch(createContact(...props)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ContactForm);
