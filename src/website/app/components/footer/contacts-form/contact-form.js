import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device';
import autoBind from 'auto-bind';
import { compose } from 'redux';
import { UserInput } from '/src/cms/elements';
import Button from '/src/cms/elements/button';
import { validatePhone, toTitleCase } from '/src/cms/utils';
import { createContact } from './actions';
import { contactForm } from '../../types';
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
    this.validatedFields = ['email'];
    this.nameRef = React.createRef();
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
    this.nameRef.current.hideValidation();
    this.phoneRef.current.hideValidation();
  }

  render() {
    const { name, email, message, isValid, phone } = this.state;
    const { onSend, onSuccess } = this.props;
    return (
      <div className={styles.formContainer}>
        <UserInput
          placeholder="שם"
          onChange={value => this.onChange({
            name: toTitleCase(value),
          })}
          value={name}
          label="Name"
          min={1}
          getRef={this.nameRef}
        />
        <UserInput
          placeholder="דואל"
          onChange={value => this.onChange({
            email: value,
          })}
          value={email}
          label="Email"
          min={1}
          getRef={this.emailRef}
        />
        <UserInput
          placeholder="טלפון"
          onChange={value => this.onChange({
            phone: value,
          })}
          value={phone}
          label="Phone"
          min={1}
          getRef={this.emailRef}
        />
        <UserInput
          placeholder="Tell us about it..."
          onChange={value => this.onChange({
            message: value,
          })}
          value={message}
          label="Message"
          type="multi-line"
          optional
        />
        <Button
          stretch
          color="green"
          className={styles.sendBtn}
          disable={!isValid}
          onClick={() => {
            onSend();
            this.props.createContact(name, email, message).then(() => {
              onSuccess();
              this.clearForm();
            });
          }}
        >
          SEND
        </Button>
      </div>
    );
  }
}

ContactForm.propTypes = contactForm;

const mapStateToProps = (state, ownProps) => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

const mapDispatchToProps = (dispatch) => ({
  createContact: (...props) => dispatch(createContact(...props)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ContactForm);
