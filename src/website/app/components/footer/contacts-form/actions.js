import { send } from 'emailjs-com';
import EMAIL_JS from '/emailJS.config';

export const createContact = (name, email, message, phone) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const contacts = firestore.collection('contacts');

    /* Store Contact */
    return contacts.where('email', '==', email).get().then(snapshot => {
      const id = snapshot.docs[0] ? snapshot.docs[0].id : null;
      if (id) {
        return contacts.doc(id).update({
          title: name,
          email,
          phone,
        });
      }
      return contacts.add({
        title: name,
        email,
        phone,
      }).then(() => {
        /* Send email to desk */
        const deskParams = {
          'email': email,
          'from_name': name,
          'message_html': message,
          'phone': phone,
        };
        return send(EMAIL_JS.SERVICE_ID, EMAIL_JS.TEMPLATES.CONTACT, deskParams, EMAIL_JS.USER_ID);
      });
    });
  };
};
