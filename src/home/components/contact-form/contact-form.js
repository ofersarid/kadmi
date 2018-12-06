import React from 'react';
import cx from 'classnames';
import { send } from 'emailjs-com';
import styles from './styles.scss';
import { TextInput, CheckBox } from '../../../components/form-elements';

const ContactForm = () => (
  <div className={cx(styles.contactForm)} >
    <TextInput placeholder="שם" cn={`${styles.marginLeft} ${styles.textInput}`} />
    <TextInput placeholder="דוא״ל" cn={`${styles.marginLeft} ${styles.textInput}`} />
    <label className={styles.marginLeft} >מתעניין ב- </label >
    <CheckBox cn={styles.marginLeft} >
      פרגולה
    </CheckBox >
    <CheckBox cn={styles.marginLeft} >
      דק
    </CheckBox >
    <CheckBox cn={styles.marginLeft} >
      ריהוט גן
    </CheckBox >
    <CheckBox cn={styles.marginLeft} >
      ריהוט פנים
    </CheckBox >
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
    </button>
  </div >
);

export default ContactForm;
