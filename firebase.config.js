import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Initialize Firebase
export const config = {
  apiKey: "AIzaSyDwFtjUxXOom9VHkVVPXYV5MIViHaXfcy4",
  authDomain: "kadmi-website.firebaseapp.com",
  databaseURL: "https://kadmi-website.firebaseio.com",
  projectId: "kadmi-website",
  storageBucket: "kadmi-website.appspot.com",
  messagingSenderId: "168939886920",
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
