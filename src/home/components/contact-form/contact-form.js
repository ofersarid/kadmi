import React, { PureComponent } from 'react';
import cx from 'classnames';
import { send } from 'emailjs-com';
import styles from './styles.scss';
import { TextInput, CheckBox } from '../../../components/form-elements';

class ContactForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      type: 'business', // 'business' | 'private
    };
  }

  render() {
    const { type } = this.state;
    return (
      <div className={cx(styles.contactForm)} >
        <TextInput placeholder="שם" cn={`${styles.marginLeft} ${styles.textInput}`} />
        <TextInput placeholder="נייד" cn={`${styles.marginLeft} ${styles.textInput}`} />
        <label className={styles.marginLeft} >אני לקוח- </label >
        <CheckBox cn={styles.marginLeft} checked={type === 'private'} onChange={() => this.setState({ type: 'private' })} >פרטי</CheckBox >
        <CheckBox cn={styles.marginLeft} checked={type === 'business'} onChange={() => this.setState({ type: 'business' })} >עסקי</CheckBox >
        <button
          className={cx('ripple', styles.submit)}
          onClick={() => {
            const templateParams = {
              'reply_to': 'miri.srd@gmail.com',
              'from_name': 'miri sarid',
              'message_html': 'message_html_value',
            };
            send('gmail', 'template_PiqJi4LV', templateParams, 'user_G5XidPOIQwVxbe1dVDS1Q')
              .then(response => {
                console.log('SUCCESS!', response.status, response.text);
              }, error => {
                console.log('FAILED...', error);
              });
          }}
        >
          שלח
        </button >
      </div >
    );
  }
}

export default ContactForm;
